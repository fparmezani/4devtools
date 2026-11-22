import { Component } from '@angular/core';
import { TUTORIAL } from 'src/app/shared/tutorial-snippets';

@Component({
    selector: 'app-tutorial-massa-de-dados-faker-python',
    templateUrl: './massa-de-dados-faker-python.component.html',
})
export class TutorialFakerComponent {
    readonly t = TUTORIAL;
}
