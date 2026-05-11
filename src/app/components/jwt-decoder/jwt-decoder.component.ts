import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import * as copy from 'copy-to-clipboard';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-jwt-decoder',
    templateUrl: './jwt-decoder.component.html',
})
export class JwtDecoderComponent {
    jwtToken: string = '';
    header: any = null;
    payload: any = null;
    signature: string = '';
    isValid: boolean = false;
    isExpired: boolean = false;
    expiresAt: Date | null = null;
    error: string = '';

    constructor(private meta: Meta, private title: Title, private toastr: ToastrService) {
        this.title.setTitle('JWT Decoder e Validator — Decodifique e valide tokens JWT online | 4DevTools');
        this.meta.addTags([
            {
                name: 'description',
                content: 'Decodifique e valide tokens JWT online gratuitamente. Visualize o header, payload e verifique a expiração do seu token JWT de forma rápida e segura.',
            },
            { name: 'author', content: 'Fernando Parmezani' },
            {
                name: 'keywords',
                content: 'jwt decoder, jwt validator, decodificar jwt, validar jwt, json web token, jwt online, jwt payload, jwt header, token jwt',
            },
        ]);
    }

    private base64UrlDecode(str: string): string {
        const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
        return atob(padded);
    }

    decodificar() {
        this.header = null;
        this.payload = null;
        this.signature = '';
        this.isValid = false;
        this.isExpired = false;
        this.expiresAt = null;
        this.error = '';

        const token = this.jwtToken.trim();
        if (!token) {
            this.error = 'Cole um token JWT no campo acima para decodificar.';
            return;
        }

        const parts = token.split('.');
        if (parts.length !== 3) {
            this.error = 'Token JWT inválido: o token deve conter exatamente 3 partes separadas por ponto (header.payload.signature).';
            return;
        }

        try {
            this.header = JSON.parse(this.base64UrlDecode(parts[0]));
        } catch {
            this.error = 'Erro ao decodificar o header do token. Verifique se o token está correto.';
            return;
        }

        try {
            this.payload = JSON.parse(this.base64UrlDecode(parts[1]));
        } catch {
            this.error = 'Erro ao decodificar o payload do token. Verifique se o token está correto.';
            return;
        }

        this.signature = parts[2];
        this.isValid = true;

        if (this.payload.exp) {
            this.expiresAt = new Date(this.payload.exp * 1000);
            this.isExpired = this.expiresAt < new Date();
        }
    }

    limpar() {
        this.jwtToken = '';
        this.header = null;
        this.payload = null;
        this.signature = '';
        this.isValid = false;
        this.isExpired = false;
        this.expiresAt = null;
        this.error = '';
    }

    copiarHeader() {
        copy(JSON.stringify(this.header, null, 2));
        this.toastr.success('Header copiado!');
    }

    copiarPayload() {
        copy(JSON.stringify(this.payload, null, 2));
        this.toastr.success('Payload copiado!');
    }

    formatarJson(obj: any): string {
        return JSON.stringify(obj, null, 2);
    }

    getExpDisplay(): string {
        if (!this.expiresAt) return '';
        return this.expiresAt.toLocaleString('pt-BR');
    }

    getIatDisplay(): string {
        if (!this.payload?.iat) return '';
        return new Date(this.payload.iat * 1000).toLocaleString('pt-BR');
    }
}
