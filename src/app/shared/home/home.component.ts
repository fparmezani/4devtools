import { Component } from '@angular/core';

interface Ferramenta {
    rota: string;
    nome: string;
    descricao: string;
    /** Miniatura em src/assets/images (1280x720). */
    imagem: string;
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent {
    readonly documentos: Ferramenta[] = [
        { rota: '/gerar-cpf', nome: 'Gerador de CPF', descricao: 'CPF válido, com ou sem máscara e por estado, com o cálculo dos dígitos explicado.', imagem: 'assets/images/CPF.webp' },
        { rota: '/gerar-cnpj', nome: 'Gerador de CNPJ', descricao: 'CNPJ numérico ou no novo formato alfanumérico, com validação em 4 linguagens.', imagem: 'assets/images/CNPJ.webp' },
        { rota: '/gerar-cnh', nome: 'Gerador de CNH', descricao: 'Número de registro da CNH com dígitos verificadores corretos.', imagem: 'assets/images/CNH.webp' },
        { rota: '/gerar-pispasep', nome: 'Gerador de PIS/PASEP', descricao: 'PIS, PASEP, NIS ou NIT válidos para sistemas de RH e folha.', imagem: 'assets/images/pispasep.webp' },
        { rota: '/gerar-titulo-eleitor', nome: 'Gerador de Título de Eleitor', descricao: 'Inscrição eleitoral válida por estado, com a tabela de códigos de UF.', imagem: 'assets/images/titulo-eleitor.webp' },
        { rota: '/gerar-renavam', nome: 'Gerador de RENAVAM', descricao: 'RENAVAM com dígito verificador para seguradoras, locadoras e frotas.', imagem: 'assets/images/renavam.webp' },
        { rota: '/gerar-rg', nome: 'Gerador de RG', descricao: 'RG no formato de SP, com dígito de 0 a 9 ou X.', imagem: 'assets/images/RG.webp' },
        { rota: '/gerar-cartaodecredito', nome: 'Gerador de Cartão de Crédito', descricao: 'Números que passam no algoritmo de Luhn, com validade e CVV, para testar checkouts.', imagem: 'assets/images/cartaocredito.webp' },
    ];

    readonly cadastros: Ferramenta[] = [
        { rota: '/gerar-pessoa', nome: 'Gerador de Pessoa', descricao: 'Cadastro fictício completo: nome, CPF, RG, CNS, endereço, telefone e cartão.', imagem: 'assets/images/pessoa.webp' },
        { rota: '/gerar-nome', nome: 'Gerador de Nomes', descricao: 'Nomes completos brasileiros para massas de teste.', imagem: 'assets/images/nomes.webp' },
        { rota: '/gerar-endereco', nome: 'Gerador de Endereço', descricao: 'Endereços com CEP, logradouro, bairro, cidade e estado.', imagem: 'assets/images/endereco.webp' },
        { rota: '/gerar-telefone', nome: 'Gerador de Telefone', descricao: 'Celulares com DDD e nono dígito.', imagem: 'assets/images/telefone.webp' },
    ];

    readonly utilitarios: Ferramenta[] = [
        { rota: '/jwt-decoder', nome: 'JWT Decoder', descricao: 'Decodifique e confira tokens JWT direto no navegador.', imagem: 'assets/images/jwt.webp' },
        { rota: '/gerar-senha', nome: 'Gerador de Senha', descricao: 'Senhas fortes e aleatórias com um clique.', imagem: 'assets/images/senha.webp' },
        { rota: '/whatsapp', nome: 'Link para WhatsApp', descricao: 'Links diretos para conversas, com mensagem pronta.', imagem: 'assets/images/whatsapp.webp' },
        { rota: '/telegram', nome: 'Link para Telegram', descricao: 'Links diretos para conversas no Telegram.', imagem: 'assets/images/telegram.webp' },
    ];
}
