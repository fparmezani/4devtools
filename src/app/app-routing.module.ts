import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GerarCpfComponent } from './components/gerar-cpf/gerar-cpf.component';
import { GerarCnpjComponent } from './components/gerar-cnpj/gerar-cnpj.component';
import { GerarPessoaComponent } from './components/gerar-pessoa/gerar-pessoa.component';
import { GerarCartaodecreditoComponent } from './components/gerar-cartaodecredito/gerar-cartaodecredito.component';
import { ContatoComponent } from './shared/contato/contato.component';
import { TermoUsoComponent } from './shared/termo-uso/termo-uso.component';
import { PoliticaPrivacidadeComponent } from './shared/politica-privacidade/politica-privacidade.component';
import { SobreComponent } from './shared/sobre/sobre.component';
import { VersaoComponent } from './shared/versao/versao.component';
import { GerarCnhComponent } from './components/gerar-cnh/gerar-cnh.component';
import { GerarPisPasepComponent } from './components/gerar-pispasep/gerar-pispasep.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { GeradorCpfComponent } from './Views/gerador-cpf/gerador-cpf.component';
import { GerarNomeComponent } from './components/gerar-nome/gerar-nome.component';
import { GerarRenavamComponent } from './components/gerar-renavam/gerar-renavam.component';
import { GerarEnderecoComponent } from './components/gerar-endereco/gerar-endereco.component';
import { GerarSenhaComponent } from './components/gerar-senha/gerar-senha.component';
import { GerarTelefoneComponent } from './components/gerar-telefone/gerar-telefone.component';
import { GerarTituloEleitorComponent } from './components/gerar-titulo-eleitor/gerar-titulo-eleitor.component';
import { GeradorCnpjComponent } from './Views/gerador-cnpj/gerador-cnpj.component';
import { GeradorCnhComponent } from './Views/gerador-cnh/gerador-cnh.component';
import { BuyMeACoffeComponent } from './shared/buy-me-a-coffe/buy-me-a-coffe.component';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';
import { CpfComponent } from './blog/cpf/cpf.component';
import { CnpjComponent } from './blog/cnpj/cnpj.component';
import { CartaodecreditoComponent } from './blog/cartaodecredito/cartaodecredito.component';
import { RenavamComponent } from './blog/renavam/renavam.component';
import { TituloeleitorComponent } from './blog/tituloeleitor/tituloeleitor.component';
import { CnsComponent } from './blog/cns/cns.component';
import { PispasepComponent } from './blog/pispasep/pispasep.component';
import { BitcoinComponent } from './components/bitcoin/bitcoin.component';
import { AihComponent } from './blog/aih/aih.component';
import { WhatsappComponent } from './components/whatsapp/whatsapp.component';
import { TelegramComponent } from './components/telegram/telegram.component';
import { GerarRgComponent } from './components/gerar-rg/gerar-rg.component';
import { JwtDecoderComponent } from './components/jwt-decoder/jwt-decoder.component';

import { TutoriaisIndiceComponent } from './tutoriais/indice/tutoriais-indice.component';
import { TutorialLgpdComponent } from './tutoriais/dados-de-teste-lgpd/dados-de-teste-lgpd.component';
import { TutorialCnpjAlfanumericoComponent } from './tutoriais/cnpj-alfanumerico/cnpj-alfanumerico.component';
import { TutorialAngularComponent } from './tutoriais/validar-cpf-cnpj-angular/validar-cpf-cnpj-angular.component';
import { TutorialFakerComponent } from './tutoriais/massa-de-dados-faker-python/massa-de-dados-faker-python.component';
import { TutorialMascarasComponent } from './tutoriais/mascaras-javascript/mascaras-javascript.component';
import { TutorialPlaywrightComponent } from './tutoriais/playwright-dados-gerados/playwright-dados-gerados.component';
import { HomeComponent } from './shared/home/home.component';
import { TUTORIAIS } from './tutoriais/tutoriais.data';

const seo = (title: string, description: string, noindex = false) => ({ seo: { title, description, noindex } });

const TUTORIAL_COMPONENTES: Record<string, Type<unknown>> = {
    'dados-de-teste-lgpd': TutorialLgpdComponent,
    'cnpj-alfanumerico': TutorialCnpjAlfanumericoComponent,
    'validar-cpf-cnpj-angular': TutorialAngularComponent,
    'massa-de-dados-faker-python': TutorialFakerComponent,
    'mascaras-javascript': TutorialMascarasComponent,
    'playwright-dados-gerados': TutorialPlaywrightComponent,
};

const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomeComponent, data: seo('Geradores de CPF, CNPJ e dados de teste para desenvolvedores', 'Gere CPF, CNPJ (inclusive alfanumérico), CNH, PIS, RENAVAM e outros dados fictícios para testes, com cálculo explicado e validação em TypeScript, Python, C# e Java.') },
    { path: 'dashboard', component: DashboardComponent, data: seo('Cotações do Dólar, Euro e Bitcoin hoje', 'Acompanhe as cotações diárias do dólar americano, do euro e do bitcoin em reais e converta valores na hora.', true) },
    { path: 'gerar-cpf', component: GeradorCpfComponent, data: seo('Gerador de CPF válido para testes', 'Gere números de CPF válidos, com ou sem máscara e por estado, para testar sistemas e formulários. Dados fictícios, só para desenvolvimento.') },
    { path: 'gerar-rg', component: GerarRgComponent, data: seo('Gerador de RG para testes', 'Gere números de RG no formato de SP com dígito verificador (0 a 9 ou X). Entenda por que o RG varia por estado, a nova CIN e veja funções de validação.') },
    { path: 'gerar-cnpj', component: GeradorCnpjComponent, data: seo('Gerador de CNPJ válido para testes (numérico e alfanumérico)', 'Gere CNPJs válidos no formato tradicional ou no novo formato alfanumérico, com ou sem pontuação. Veja o cálculo passo a passo e funções de validação em TypeScript, Python, C# e Java.') },
    { path: 'gerar-pessoa', component: GerarPessoaComponent, data: seo('Gerador de Pessoa fictícia para testes', 'Gere dados completos de pessoas fictícias (nome, CPF, RG, endereço, telefone e e-mail) para popular bancos de dados de teste.') },
    { path: 'gerar-cartaodecredito', component: GerarCartaodecreditoComponent, data: seo('Gerador de Cartão de Crédito para testes', 'Gere números de cartão de crédito fictícios que passam no algoritmo de Luhn para testar checkouts e validações. Não servem para compras.') },
    { path: 'gerar-cnh', component: GeradorCnhComponent, data: seo('Gerador de CNH válida para testes', 'Gere números de CNH (Carteira Nacional de Habilitação) com dígitos verificadores válidos para testar sistemas. Dados fictícios.') },
    { path: 'gerar-pispasep', component: GerarPisPasepComponent, data: seo('Gerador de PIS/PASEP para testes', 'Gere números de PIS/PASEP/NIT válidos, com ou sem máscara, para testar cadastros de RH e folha de pagamento. Dados fictícios.') },
    { path: 'gerar-nome', component: GerarNomeComponent, data: seo('Gerador de Nomes brasileiros', 'Gere nomes completos brasileiros aleatórios para preencher cadastros e massas de teste sem usar dados de pessoas reais.') },
    { path: 'gerar-renavam', component: GerarRenavamComponent, data: seo('Gerador de RENAVAM válido para testes', 'Gere números de RENAVAM com dígito verificador válido para testar sistemas de veículos, seguros e despachantes. Dados fictícios.') },
    { path: 'gerar-endereco', component: GerarEnderecoComponent, data: seo('Gerador de Endereço brasileiro para testes', 'Gere endereços brasileiros com CEP, logradouro, bairro, cidade e estado para testar formulários e integrações de CEP.') },
    { path: 'gerar-senha', component: GerarSenhaComponent, data: seo('Gerador de Senha forte', 'Gere senhas fortes e aleatórias com um clique e copie direto para a área de transferência. Veja também boas práticas de segurança de senhas.') },
    { path: 'gerar-telefone', component: GerarTelefoneComponent, data: seo('Gerador de Telefone para testes', 'Gere números de telefone brasileiros fictícios com DDD e nono dígito para testar cadastros e validações. Entenda o formato dos números.') },
    { path: 'gerar-titulo-eleitor', component: GerarTituloEleitorComponent, data: seo('Gerador de Título de Eleitor para testes', 'Gere números de Título de Eleitor com dígitos verificadores válidos por estado para testar sistemas. Dados fictícios.') },

    { path: 'contato', component: ContatoComponent, data: seo('Contato', 'Fale com o 4DevTools para tirar dúvidas, sugerir novas ferramentas ou propor parcerias.') },
    { path: 'termo-de-uso', component: TermoUsoComponent, data: seo('Termos de Uso', 'Termos de uso do 4DevTools: regras de utilização das ferramentas e dos dados fictícios gerados para testes de software.') },
    { path: 'politica-de-privacidade', component: PoliticaPrivacidadeComponent, data: seo('Política de Privacidade', 'Saiba como o 4DevTools trata dados, cookies e anúncios, em conformidade com a LGPD.') },
    { path: 'sobre', component: SobreComponent, data: seo('Sobre o 4DevTools', 'Conheça o 4DevTools: ferramentas gratuitas para desenvolvedores e testadores gerarem dados fictícios brasileiros.') },
    { path: 'versao', component: VersaoComponent, data: seo('Histórico de versões', 'Veja o histórico de versões e as novidades de cada atualização do 4DevTools.') },
    { path: 'buy-me-a-coffe', component: BuyMeACoffeComponent, data: seo('Apoie o 4DevTools', 'Ajude a manter o 4DevTools gratuito e com novas ferramentas para a comunidade de desenvolvedores.') },

    /*BLOG */
    { path: 'blog/cpf', component: CpfComponent, data: seo('CPF: o que é, para que serve e como consultar', 'Entenda o que é o CPF, para que serve, como tirar, como consultar a situação cadastral e por que ele está virando o número único do cidadão.') },
    { path: 'blog/cnpj', component: CnpjComponent, data: seo('CNPJ: o que é, quem precisa e como funciona', 'Entenda o que é o CNPJ, quem precisa ter, como o número é formado, o que muda com o CNPJ alfanumérico e como consultar uma empresa.') },
    { path: 'blog/cartaocredito', component: CartaodecreditoComponent, data: seo('Número do cartão de crédito: o que significa cada parte', 'Entenda o que indicam os dígitos do cartão, para que servem CVV e validade, por que o cartão virtual tem outro número e como evitar golpes.') },
    { path: 'blog/renavam', component: RenavamComponent, data: seo('RENAVAM: o que é, onde encontrar e para que serve', 'Entenda o que é o RENAVAM, onde encontrá-lo no CRLV, para que é usado e qual a diferença entre RENAVAM, placa e chassi.') },
    { path: 'blog/tituloeleitor', component: TituloeleitorComponent, data: seo('Título de Eleitor: o que é, quem precisa e como funciona', 'Veja quem é obrigado a votar, como tirar ou transferir o título, para que serve a quitação eleitoral e como o número é formado.') },
    { path: 'blog/cns', component: CnsComponent, data: seo('Cartão Nacional de Saúde (CNS): o que é e como usar', 'Entenda o que é o Cartão do SUS, como consultar o número no Meu SUS Digital, para que ele serve e o que muda com o uso do CPF.') },
    { path: 'blog/pispasep', component: PispasepComponent, data: seo('PIS/PASEP: o que é, como consultar e quem recebe o abono', 'Entenda a diferença entre PIS e PASEP, onde consultar o seu número e quais são as regras do abono salarial.') },
    { path: 'blog/aih', component: AihComponent, data: seo('AIH: o que é a Autorização de Internação Hospitalar', 'Entenda o que é a AIH do SUS, quando ela é emitida, como funciona o processo de internação e para que servem os seus dados.') },


    /*TUTORIAIS */
    { path: 'tutoriais', component: TutoriaisIndiceComponent, data: seo('Tutoriais para desenvolvedores', 'Guias práticos sobre validação de CPF e CNPJ, CNPJ alfanumérico, máscaras, dados de teste, Faker, Playwright e LGPD, com código testado.') },
    ...TUTORIAIS.map((t) => ({ path: 'tutoriais/' + t.slug, component: TUTORIAL_COMPONENTES[t.slug], data: seo(t.titulo, t.resumo) })),

    /*LINK */
    { path: 'jwt-decoder', component: JwtDecoderComponent, data: seo('JWT Decoder: decodifique e valide tokens JWT online', 'Decodifique e valide tokens JWT online. Veja header, payload e expiração do token direto no navegador, sem enviar dados a servidores.') },
    { path: 'whatsapp', component: WhatsappComponent, data: seo('Gerador de Link para WhatsApp', 'Crie links diretos para conversas no WhatsApp com mensagem pré-definida, prontos para usar em sites, redes sociais e anúncios.') },
    { path: 'telegram', component: TelegramComponent, data: seo('Gerador de Link para Telegram', 'Crie links diretos para conversas no Telegram, prontos para compartilhar em sites e redes sociais.') },

    //Wild Card Route for 404 request
    {
        path: '**',
        pathMatch: 'full',
        component: PagenotfoundComponent,
        data: seo('Página não encontrada', 'A página que você procura não existe no 4DevTools.', true),
    },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }) ],
    exports: [ RouterModule ],
})
export class AppRoutingModule {}
