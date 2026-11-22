import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

export const SITE_URL = 'https://www.4devtools.com';
const SITE_NAME = '4DevTools';

interface SeoData {
    title: string;
    description: string;
    noindex?: boolean;
}

/**
 * Define título, description, canonical, robots e Open Graph de cada página
 * a partir do `data.seo` da rota. Roda no navegador e no pré-render (SSR),
 * então cada HTML gerado já sai com as tags corretas.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
    constructor(
        private router: Router,
        private title: Title,
        private meta: Meta,
        @Inject(DOCUMENT) private document: Document
    ) {}

    init(): void {
        this.router.events
            .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
            .subscribe((e) => this.apply(e.urlAfterRedirects));
    }

    private apply(url: string): void {
        const data = this.deepestSeo(this.router.routerState.snapshot.root);
        if (!data) {
            return;
        }

        const path = url.split(/[?#]/)[0].replace(/\/+$/, '');
        const canonical = SITE_URL + path;
        const fullTitle = `${data.title} | ${SITE_NAME}`;

        this.title.setTitle(fullTitle);
        this.setSingleTag('name', 'description', data.description);
        this.setSingleTag('name', 'author', 'Fernando Parmezani');
        this.setSingleTag('name', 'robots', data.noindex ? 'noindex, follow' : 'index, follow');
        this.setSingleTag('property', 'og:title', fullTitle);
        this.setSingleTag('property', 'og:description', data.description);
        this.setSingleTag('property', 'og:url', canonical);
        this.setSingleTag('property', 'og:type', 'website');
        this.setSingleTag('property', 'og:site_name', SITE_NAME);
        this.setSingleTag('property', 'og:locale', 'pt_BR');
        this.setCanonical(canonical);
    }

    private deepestSeo(route: ActivatedRouteSnapshot): SeoData | undefined {
        let seo: SeoData | undefined;
        let current: ActivatedRouteSnapshot | null = route;
        while (current) {
            seo = (current.data && current.data['seo']) || seo;
            current = current.firstChild;
        }
        return seo;
    }

    /** Remove duplicatas (componentes antigos também adicionam tags) e grava uma só. */
    private setSingleTag(attr: 'name' | 'property', key: string, content: string): void {
        const selector = `${attr}="${key}"`;
        this.meta.getTags(selector).forEach((tag) => this.meta.removeTagElement(tag));
        this.meta.addTag({ [attr]: key, content } as any);
    }

    private setCanonical(href: string): void {
        let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
        if (!link) {
            link = this.document.createElement('link');
            link.setAttribute('rel', 'canonical');
            this.document.head.appendChild(link);
        }
        link.setAttribute('href', href);
    }
}
