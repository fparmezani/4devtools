import { Component, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SITE_URL } from '../../services/seo.service';

interface Crumb {
    label: string;
    /** Caminho absoluto no site. Vazio no item atual (a própria página). */
    path: string;
}

const JSON_LD_ID = 'breadcrumb-jsonld';

/**
 * Trilha de navegação (Home > Seção > Página) com marcação BreadcrumbList.
 * Os rótulos vêm do `data.seo.title` da rota, então não há lista paralela para manter.
 * Roda também no pré-render: o HTML estático já sai com a trilha e o JSON-LD.
 */
@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent implements OnDestroy {
    crumbs: Crumb[] = [];
    private sub: Subscription;

    constructor(private router: Router, @Inject(DOCUMENT) private document: Document) {
        this.sub = this.router.events
            .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
            .subscribe((e) => this.update(e.urlAfterRedirects));
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    private update(url: string): void {
        const path = url.split(/[?#]/)[0].replace(/\/+$/, '');
        const title = this.seoTitle(this.router.routerState.snapshot.root);

        // Home e páginas sem rota conhecida (404) não mostram trilha.
        if (!path || !title) {
            this.crumbs = [];
            this.writeJsonLd();
            return;
        }

        const segments = path.split('/').filter(Boolean);
        const crumbs: Crumb[] = [{ label: 'Home', path: '/' }];
        if (segments[0] === 'tutoriais' && segments.length > 1) {
            crumbs.push({ label: 'Tutoriais', path: '/tutoriais' });
        }
        // Nos artigos do blog o título é longo ("CPF: o que é, ..."); a trilha usa só o assunto.
        const label = segments[0] === 'blog' ? title.split(':')[0] : title;
        crumbs.push({ label, path: '' });

        this.crumbs = crumbs;
        this.writeJsonLd(path);
    }

    private seoTitle(route: ActivatedRouteSnapshot): string | undefined {
        let title: string | undefined;
        let current: ActivatedRouteSnapshot | null = route;
        while (current) {
            title = (current.data && current.data['seo'] && current.data['seo'].title) || title;
            current = current.firstChild;
        }
        return title;
    }

    private writeJsonLd(currentPath?: string): void {
        const existing = this.document.getElementById(JSON_LD_ID);
        if (!this.crumbs.length) {
            existing?.remove();
            return;
        }
        const script = existing || this.document.createElement('script');
        script.id = JSON_LD_ID;
        script.setAttribute('type', 'application/ld+json');
        script.textContent = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: this.crumbs.map((c, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: c.label,
                item: SITE_URL + (c.path || currentPath || '/'),
            })),
        });
        if (!existing) {
            this.document.head.appendChild(script);
        }
    }
}
