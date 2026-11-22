import { Component } from '@angular/core';
import { TUTORIAL } from 'src/app/shared/tutorial-snippets';

@Component({
    selector: 'app-tutorial-dados-de-teste-lgpd',
    templateUrl: './dados-de-teste-lgpd.component.html',
})
export class TutorialLgpdComponent {
    readonly t = TUTORIAL;
}
