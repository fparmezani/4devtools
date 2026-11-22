/**
 * Gera a saída no formato Build Output API v3 da Vercel (.vercel/output) a partir
 * do pré-render do Angular. Assim o roteamento fica sob nosso controle, sem o
 * fallback de SPA do preset "Angular" (que respondia 200 para qualquer URL):
 *
 *  - /pagina/          -> 308 para /pagina
 *  - /pagina           -> dist/.../pagina/index.html (páginas pré-renderizadas)
 *  - arquivos estáticos -> servidos normalmente
 *  - qualquer outra URL -> 404.html com status 404
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist', '4DevTools', 'browser');
const OUT = path.join(ROOT, '.vercel', 'output');
const STATIC = path.join(OUT, 'static');

const routes = fs
    .readFileSync(path.join(ROOT, 'prerender-routes.txt'), 'utf8')
    .split(/\r?\n/)
    .map((r) => r.trim())
    .filter((r) => r && r !== '/');

fs.copyFileSync(path.join(DIST, 'index.original.html'), path.join(DIST, '404.html'));

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(STATIC, { recursive: true });
fs.cpSync(DIST, STATIC, { recursive: true });

const overrides = {};
for (const route of routes) {
    const file = `${route.slice(1)}/index.html`;
    if (!fs.existsSync(path.join(STATIC, file))) {
        throw new Error(`Rota pré-renderizada sem HTML: ${route}`);
    }
    overrides[file] = { path: route.slice(1), contentType: 'text/html; charset=utf-8' };
}

const config = {
    version: 3,
    routes: [
        { src: '^/(.+?)/+$', status: 308, headers: { Location: '/$1' } },
        { handle: 'filesystem' },
        { src: '^/.*$', dest: '/404.html', status: 404 },
    ],
    overrides,
};

fs.writeFileSync(path.join(OUT, 'config.json'), JSON.stringify(config, null, 2));
console.log(`Build Output API: ${routes.length + 1} páginas, 404 em /404.html`);
