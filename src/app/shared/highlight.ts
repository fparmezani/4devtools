import * as Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-bash';

export type Linguagem = 'typescript' | 'python' | 'csharp' | 'java' | 'markup' | 'sql' | 'bash';

// O Prism não marca variáveis. Depois de palavras-chave, funções e números já terem sido
// reconhecidos, os identificadores que sobram (variáveis, parâmetros, propriedades) viram "variable".
const LINGUAGENS: Linguagem[] = [ 'typescript', 'python', 'csharp', 'java' ];  // só linguagens com variáveis a destacar
for (const lang of LINGUAGENS) {
    if (!(Prism.languages[lang] as Record<string, unknown>)['variable']) {
        Prism.languages.insertBefore(lang, 'operator', { variable: /\b[a-z_][A-Za-z0-9_]*\b/ });
    }
}

export interface Snippet {
    id: string;
    label: string;
    linguagem: Linguagem;
    code: string;
    /** HTML com <span class="token ..."> gerado pelo Prism (no build/pré-render e no navegador). */
    html?: string;
}

/** Aplica destaque de sintaxe. Roda igual no Node (pré-render) e no navegador. */
export function destacar(snippets: Snippet[]): Snippet[] {
    return snippets.map((s) => ({
        ...s,
        html: Prism.highlight(s.code, Prism.languages[s.linguagem], s.linguagem),
    }));
}
