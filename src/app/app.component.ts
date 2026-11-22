import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { SeoService } from './services/seo.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.css' ],
})
export class AppComponent {
    public constructor(
        private titleService: Title,
        seo: SeoService,
        @Inject(PLATFORM_ID) private platformId: object
    ) {
        seo.init();
    }

    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }

    AcceptCookie() {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        const cookieContainer = document.querySelector('.cookie-container');
        cookieContainer?.classList.remove('active');
        localStorage.setItem('cookieAccepted', 'true');
    }
}
