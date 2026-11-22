import { Component } from '@angular/core';
import { TUTORIAL } from 'src/app/shared/tutorial-snippets';

@Component({
    selector: 'app-tutorial-playwright-dados-gerados',
    templateUrl: './playwright-dados-gerados.component.html',
})
export class TutorialPlaywrightComponent {
    readonly t = TUTORIAL;
}
