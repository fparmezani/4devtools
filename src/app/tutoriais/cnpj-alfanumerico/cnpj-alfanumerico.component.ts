import { Component } from '@angular/core';
import { TUTORIAL } from 'src/app/shared/tutorial-snippets';

@Component({
    selector: 'app-tutorial-cnpj-alfanumerico',
    templateUrl: './cnpj-alfanumerico.component.html',
})
export class TutorialCnpjAlfanumericoComponent {
    readonly t = TUTORIAL;
}
