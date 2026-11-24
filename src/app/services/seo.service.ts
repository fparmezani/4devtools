import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

export const SITE_URL = 'https://www.4devtools.com';
const SITE_NAME = '4DevTools';
const JSON_LD_ID = 'seo-jsonld';

/** Data exibida nos artigos e tutoriais ("Atualizado/Publicado em 22 de novembro de 2026"). */
const DATA_CONTEUDO = '2026-11-22';

const AUTOR = {
    '@type': 'Person',
    '@id': `${SITE_URL}/#autor`,
    name: 'Fernando Parmezani',
    url: `${SITE_URL}/sobre`,
    image: `${SITE_URL}/assets/images/foto-criador.jpg`,
    jobTitle: 'Desenvolvedor de software',
    sameAs: [
        'https://fernandoparmezani.com.br',
        'https://github.com/fparmezani',
        'https://www.linkedin.com/in/fparmezani',
    ],
};

const SITE = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    description: 'Geradores de documentos brasileiros e dados fictícios para testes de software, com o cálculo explicado e funções de validação.',
    inLanguage: 'pt-BR',
    publisher: { '@id': AUTOR['@id'] },
};

/** Imagem de compartilhamento (1200x630) por página; as demais usam a imagem padrão. */
const IMAGENS: Record<string, string> = {
    '/gerar-cpf': 'CPF', '/blog/cpf': 'CPF',
    '/gerar-cnpj': 'CNPJ', '/blog/cnpj': 'CNPJ',
    '/gerar-cnh': 'CNH',
    '/gerar-pispasep': 'pispasep', '/blog/pispasep': 'pispasep',
    '/gerar-titulo-eleitor': 'titulo-eleitor', '/blog/tituloeleitor': 'titulo-eleitor',
    '/gerar-renavam': 'renavam', '/blog/renavam': 'renavam',
    '/gerar-rg': 'RG',
    '/gerar-cartaodecredito': 'cartaocredito', '/blog/cartaocredito': 'cartaocredito',
    '/blog/cns': 'CNS',
    '/blog/aih': 'aih',
    '/gerar-pessoa': 'pessoa',
    '/gerar-nome': 'nomes',
    '/gerar-endereco': 'endereco',
    '/gerar-telefone': 'telefone',
    '/gerar-senha': 'senha',
    '/jwt-decoder': 'jwt',
    '/whatsapp': 'whatsapp',
    '/telegram': 'telegram',
    '/tutoriais/dados-de-teste-lgpd': 'tutorial-lgpd',
    '/tutoriais/cnpj-alfanumerico': 'tutorial-cnpj-alfanumerico',
    '/tutoriais/validar-cpf-cnpj-angular': 'tutorial-angular-validacao',
    '/tutoriais/massa-de-dados-faker-python': 'tutorial-python-faker',
    '/tutoriais/mascaras-javascript': 'tutorial-mascaras-javascript',
    '/tutoriais/playwright-dados-gerados': 'tutorial-playwright',
};

interface SeoData {
    title: string;
    description: string;
    noindex?: boolean;
}

/**
 * Define título, description, canonical, robots, Open Graph e JSON-LD de cada página
 * a partir do `data.seo` da rota. Roda no navegador e no pré-render (SSR),
 * então cada HTML gerado já sai com as tags corretas.
 * O BreadcrumbList fica no BreadcrumbComponent e o FAQPage na FaqSchemaDirective.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
    constructor(
        private router: Router,
        private title: Title,
        private meta: Meta,
        @Inject(DOCUMENT) private document: Document
    ) {}

    init(): void {
        this.router.events
            .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
            .subscribe((e) => this.apply(e.urlAfterRedirects));
    }

    private apply(url: string): void {
        const data = this.deepestSeo(this.router.routerState.snapshot.root);
        if (!data) {
            return;
        }

        const path = url.split(/[?#]/)[0].replace(/\/+$/, '');
        const canonical = SITE_URL + (path || '/');
        const fullTitle = `${data.title} | ${SITE_NAME}`;
        const imagem = `${SITE_URL}/assets/images/og/${IMAGENS[path] || '4devtools'}.jpg`;
        const tipo = this.tipoDaPagina(path);

        this.title.setTitle(fullTitle);
        this.setSingleTag('name', 'description', data.description);
        this.setSingleTag('name', 'author', 'Fernando Parmezani');
        this.setSingleTag('name', 'robots', data.noindex ? 'noindex, follow' : 'index, follow');
        this.setSingleTag('property', 'og:title', fullTitle);
        this.setSingleTag('property', 'og:description', data.description);
        this.setSingleTag('property', 'og:url', canonical);
        this.setSingleTag('property', 'og:type', tipo === 'pagina' || tipo === 'home' ? 'website' : 'article');
        this.setSingleTag('property', 'og:site_name', SITE_NAME);
        this.setSingleTag('property', 'og:locale', 'pt_BR');
        this.setSingleTag('property', 'og:image', imagem);
        this.setSingleTag('property', 'og:image:width', '1200');
        this.setSingleTag('property', 'og:image:height', '630');
        this.setSingleTag('property', 'og:image:alt', data.title);
        this.setSingleTag('name', 'twitter:card', 'summary_large_image');
        this.setSingleTag('name', 'twitter:title', fullTitle);
        this.setSingleTag('name', 'twitter:description', data.description);
        this.setSingleTag('name', 'twitter:image', imagem);
        this.setCanonical(canonical);
        this.setJsonLd(data.noindex ? null : this.jsonLd(tipo, canonical, data, imagem));
    }

    private tipoDaPagina(path: string): 'home' | 'artigo' | 'tutorial' | 'pagina' {
        if (!path) return 'home';
        if (path.startsWith('/blog/')) return 'artigo';
        if (path.startsWith('/tutoriais/')) return 'tutorial';
        return 'pagina';
    }

    private jsonLd(tipo: string, url: string, data: SeoData, imagem: string): object {
        const pagina: Record<string, unknown> = {
            '@id': `${url}#pagina`,
            url,
            name: data.title,
            description: data.description,
            inLanguage: 'pt-BR',
            isPartOf: { '@id': SITE['@id'] },
            image: imagem,
        };

        if (tipo === 'artigo' || tipo === 'tutorial') {
            Object.assign(pagina, {
                '@type': tipo === 'tutorial' ? 'TechArticle' : 'Article',
                headline: data.title,
                mainEntityOfPage: url,
                author: { '@id': AUTOR['@id'] },
                publisher: { '@id': AUTOR['@id'] },
                dateModified: DATA_CONTEUDO,
                ...(tipo === 'tutorial' ? { datePublished: DATA_CONTEUDO } : {}),
            });
        } else {
            Object.assign(pagina, {
                '@type': 'WebPage',
                author: { '@id': AUTOR['@id'] },
                ...(tipo === 'home' ? { about: { '@id': SITE['@id'] } } : {}),
            });
        }

        return { '@context': 'https://schema.org', '@graph': [ SITE, AUTOR, pagina ] };
    }

    private setJsonLd(dados: object | null): void {
        const existente = this.document.getElementById(JSON_LD_ID);
        if (!dados) {
            existente?.remove();
            return;
        }
        const script = existente || this.document.createElement('script');
        script.id = JSON_LD_ID;
        script.setAttribute('type', 'application/ld+json');
        script.textContent = JSON.stringify(dados);
        if (!existente) {
            this.document.head.appendChild(script);
        }
    }

    private deepestSeo(route: ActivatedRouteSnapshot): SeoData | undefined {
        let seo: SeoData | undefined;
        let current: ActivatedRouteSnapshot | null = route;
        while (current) {
            seo = (current.data && current.data['seo']) || seo;
            current = current.firstChild;
        }
        return seo;
    }

    /** Remove duplicatas (componentes antigos também adicionam tags) e grava uma só. */
    private setSingleTag(attr: 'name' | 'property', key: string, content: string): void {
        const selector = `${attr}="${key}"`;
        this.meta.getTags(selector).forEach((tag) => this.meta.removeTagElement(tag));
        this.meta.addTag({ [attr]: key, content } as any);
    }

    private setCanonical(href: string): void {
        let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
        if (!link) {
            link = this.document.createElement('link');
            link.setAttribute('rel', 'canonical');
            this.document.head.appendChild(link);
        }
        link.setAttribute('href', href);
    }
}
