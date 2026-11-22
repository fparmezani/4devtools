import { Component } from '@angular/core';
import { TUTORIAL } from 'src/app/shared/tutorial-snippets';

@Component({
    selector: 'app-tutorial-mascaras-javascript',
    templateUrl: './mascaras-javascript.component.html',
})
export class TutorialMascarasComponent {
    readonly t = TUTORIAL;
}
