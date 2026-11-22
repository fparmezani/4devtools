import { Component, Input } from '@angular/core';
import { TUTORIAIS } from '../tutoriais.data';

/** Grade de cards com os tutoriais. Com [atual], esconde o tutorial que está sendo lido. */
@Component({
    selector: 'app-tutoriais-lista',
    template: `
        <div class="doc-cards">
            <a *ngFor="let t of lista" class="doc-card" [href]="'/tutoriais/' + t.slug">
                <img class="doc-card-img" [src]="t.imagem" width="1280" height="720" loading="lazy" decoding="async"
                    [alt]="'Miniatura do tutorial: ' + t.titulo" />
                <span class="doc-card-tema">{{ t.tema }}</span>
                <strong>{{ t.titulo }}</strong>
                <span>{{ t.resumo }}</span>
            </a>
        </div>
    `,
})
export class TutoriaisListaComponent {
    @Input() atual = '';

    get lista() {
        return TUTORIAIS.filter((t) => t.slug !== this.atual);
    }
}
