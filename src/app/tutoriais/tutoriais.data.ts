export interface Tutorial {
    slug: string;
    titulo: string;
    resumo: string;
    tema: string;
    /** Miniatura em src/assets/images (1280x720). */
    imagem: string;
}

/** Lista única dos tutoriais: usada nas rotas, na página /tutoriais e no bloco "Outros tutoriais". */
export const TUTORIAIS: Tutorial[] = [
    {
        slug: 'dados-de-teste-lgpd',
        titulo: 'Dados de teste e LGPD: guia prático para desenvolvedores',
        resumo: 'O que a LGPD diz sobre usar dados reais em homologação e como trabalhar com dados sintéticos, cópias anonimizadas e logs mascarados.',
        tema: 'LGPD',
        imagem: 'assets/images/tutorial-lgpd.webp',
    },
    {
        slug: 'cnpj-alfanumerico',
        titulo: 'CNPJ alfanumérico: como adaptar o seu sistema',
        resumo: 'Roteiro para adaptar banco de dados, validação, máscaras, formulários e integrações ao CNPJ com letras, e como testar.',
        tema: 'CNPJ',
        imagem: 'assets/images/tutorial-cnpj-alfanumerico.webp',
    },
    {
        slug: 'validar-cpf-cnpj-angular',
        titulo: 'Como validar CPF e CNPJ no Angular com Reactive Forms',
        resumo: 'Validadores reutilizáveis de CPF e CNPJ, mensagens de erro claras e testes unitários com Jasmine.',
        tema: 'Angular',
        imagem: 'assets/images/tutorial-angular-validacao.webp',
    },
    {
        slug: 'massa-de-dados-faker-python',
        titulo: 'Massa de dados de teste com Python e Faker (pt_BR)',
        resumo: 'Gere milhares de clientes e empresas fictícios com CPF e CNPJ válidos, em CSV ou direto no banco.',
        tema: 'Python',
        imagem: 'assets/images/tutorial-python-faker.webp',
    },
    {
        slug: 'mascaras-javascript',
        titulo: 'Máscaras de CPF, CNPJ, telefone e CEP em JavaScript, sem bibliotecas',
        resumo: 'Funções pequenas e testadas para formatar campos enquanto a pessoa digita, e o HTML certo para o celular.',
        tema: 'JavaScript',
        imagem: 'assets/images/tutorial-mascaras-javascript.webp',
    },
    {
        slug: 'playwright-dados-gerados',
        titulo: 'Testes de formulário com Playwright e dados gerados',
        resumo: 'Automatize o teste de um cadastro gerando um CPF válido a cada execução e cobrindo os casos de erro.',
        tema: 'Testes',
        imagem: 'assets/images/tutorial-playwright.webp',
    },
];
