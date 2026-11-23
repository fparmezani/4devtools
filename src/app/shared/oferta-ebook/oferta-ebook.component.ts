import { Component, HostBinding, Inject, Input, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Filme curto do ebook "C# Moderno Sem Medo" dentro dos artigos e tutoriais.
 *
 * A animação é toda em CSS (loop de 16s, sem JavaScript e sem clique do usuário). O banner inteiro é um link.
 *
 * - `lateral`: coluna à direita (só aparece a partir de 1200px, ver o `d-xl-block` no template da página).
 * - `inline`: bloco no meio do texto, em todas as larguras.
 *
 * Preço, textos e link ficam todos aqui, para trocar a oferta em um lugar só.
 */
@Component({
    selector: 'app-oferta-ebook',
    templateUrl: './oferta-ebook.component.html',
    styleUrls: ['./oferta-ebook.component.css'],
})
export class OfertaEbookComponent {
    @Input() variante: 'lateral' | 'inline' = 'inline';
    /** Identifica o artigo de origem, vai para a UTM e para o evento do Analytics. */
    @Input() campanha = 'artigo';

    /** O `sticky` precisa estar no elemento do componente, que é filho direto da coluna. */
    @HostBinding('class.oe-host-lateral') get hostLateral(): boolean {
        return this.variante === 'lateral';
    }

    readonly precoDe = 'R$ 79,90';
    readonly preco = 'R$ 27,90';

    readonly vantagens = [
        'Perguntas reais de entrevista .NET',
        'Resposta-modelo para cada uma',
        'Exemplos em C# moderno',
        'Garantia incondicional de 7 dias',
    ];

    readonly blocos = [
        'Fundamentos de C#',
        'POO na prática',
        'Coleções e LINQ',
        'Async/await',
        'ASP.NET Core e APIs',
        'EF Core e banco',
        'Testes, Git e qualidade',
        'Live coding',
    ];

    private readonly base = 'https://sales.fernandoparmezani.com.br/csharp-sem-medo/';

    constructor(@Inject(PLATFORM_ID) private platformId: object) {}

    get url(): string {
        const q = `utm_source=4devtools&utm_medium=oferta-${this.variante}&utm_campaign=${encodeURIComponent(this.campanha)}`;
        return `${this.base}?${q}`;
    }

    get rotulo(): string {
        return `Conhecer o ebook C# Moderno Sem Medo, de ${this.precoDe} por ${this.preco}`;
    }

    registrarClique(): void {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        const gtag = (window as any).gtag;
        if (typeof gtag === 'function') {
            gtag('event', 'oferta_ebook_clique', {
                variante: this.variante,
                campanha: this.campanha,
            });
        }
    }
}
