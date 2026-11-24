import { AfterViewInit, Directive, ElementRef, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';

const JSON_LD_ID = 'faq-jsonld';

/**
 * Gera o JSON-LD FAQPage a partir do próprio bloco de perguntas frequentes
 * (<details><summary>Pergunta</summary><p>Resposta</p></details>).
 * Assim o texto exibido e os dados estruturados nunca ficam diferentes.
 * Roda também no pré-render, então o HTML estático já sai com o JSON-LD.
 */
@Directive({ selector: '[appFaqSchema]' })
export class FaqSchemaDirective implements AfterViewInit, OnDestroy {
    constructor(private el: ElementRef<HTMLElement>, @Inject(DOCUMENT) private document: Document) {}

    ngAfterViewInit(): void {
        const limpar = (t: string | null | undefined) => (t || '').replace(/\s+/g, ' ').trim();
        const perguntas = Array.from(this.el.nativeElement.querySelectorAll('details'))
            .map((d) => ({
                pergunta: limpar(d.querySelector('summary')?.textContent),
                resposta: Array.from(d.querySelectorAll('p')).map((p) => limpar(p.textContent)).join(' '),
            }))
            .filter((q) => q.pergunta && q.resposta);

        if (!perguntas.length) {
            return;
        }

        const dados = {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: perguntas.map((q) => ({
                '@type': 'Question',
                name: q.pergunta,
                acceptedAnswer: { '@type': 'Answer', text: q.resposta },
            })),
        };

        const existente = this.document.getElementById(JSON_LD_ID);
        const script = existente || this.document.createElement('script');
        script.id = JSON_LD_ID;
        script.setAttribute('type', 'application/ld+json');
        script.textContent = JSON.stringify(dados);
        if (!existente) {
            this.document.head.appendChild(script);
        }
    }

    ngOnDestroy(): void {
        this.document.getElementById(JSON_LD_ID)?.remove();
    }
}
