import { Component, Input } from '@angular/core';
import { destacar, Snippet } from '../highlight';

/** Abas de código com destaque de sintaxe (Prism), usadas nas páginas dos geradores. */
@Component({
    selector: 'app-code-tabs',
    template: `
        <div class="doc-tabs" role="tablist" *ngIf="lista.length > 1">
            <button *ngFor="let s of lista" type="button" role="tab" class="doc-tab"
                [class.active]="s.id === ativo" [attr.aria-selected]="s.id === ativo"
                (click)="ativo = s.id">{{ s.label }}</button>
        </div>
        <pre class="doc-code" [class.doc-code-solo]="lista.length === 1"><code [innerHTML]="atual?.html"></code></pre>
    `,
})
export class CodeTabsComponent {
    lista: Snippet[] = [];
    ativo = 'ts';

    @Input() set snippets(valor: Snippet[]) {
        this.lista = destacar(valor || []);
        this.ativo = this.lista[0]?.id || 'ts';
    }

    get atual(): Snippet | undefined {
        return this.lista.find((s) => s.id === this.ativo);
    }
}
