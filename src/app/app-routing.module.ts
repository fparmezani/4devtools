import { NgModule } from '@angular/core';
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
import { EthereumComponent } from './blog/ethereum/ethereum.component';
import { AihComponent } from './blog/aih/aih.component';
import { OqueeBitcoinComponent } from './blog/oqueebitcoin/oqueebitcoin.component';
import { WhatsappComponent } from './components/whatsapp/whatsapp.component';
import { TelegramComponent } from './components/telegram/telegram.component';
import { GerarRgComponent } from './components/gerar-rg/gerar-rg.component';
import { JwtDecoderComponent } from './components/jwt-decoder/jwt-decoder.component';

const seo = (title: string, description: string, noindex = false) => ({ seo: { title, description, noindex } });

const routes: Routes = [
    { path: '', redirectTo: 'gerar-cnpj', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, data: seo('Cotações do Dólar, Euro e Bitcoin hoje', 'Acompanhe as cotações diárias do dólar americano, do euro e do bitcoin em reais e converta valores na hora.', true) },
    { path: 'gerar-cpf', component: GeradorCpfComponent, data: seo('Gerador de CPF válido para testes', 'Gere números de CPF válidos, com ou sem máscara e por estado, para testar sistemas e formulários. Dados fictícios, só para desenvolvimento.') },
    { path: 'gerar-rg', component: GerarRgComponent, data: seo('Gerador de RG para testes', 'Gere números de RG com dígito verificador para testar cadastros e validações em sistemas. Dados fictícios para desenvolvedores e QA.') },
    { path: 'gerar-cnpj', component: GeradorCnpjComponent, data: seo('Gerador de CNPJ válido para testes', 'Gere números de CNPJ válidos, com ou sem pontuação, para testar sistemas, APIs e formulários. Dados fictícios para desenvolvedores e testadores.') },
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
    { path: 'blog/cpf', component: CpfComponent, data: seo('CPF: o que é, como funciona e como é calculado', 'Entenda o que é o CPF, para que serve e como são calculados os dígitos verificadores do Cadastro de Pessoa Física.') },
    { path: 'blog/cnpj', component: CnpjComponent, data: seo('CNPJ: o que é e como funciona', 'Entenda o que é o CNPJ, como é formado o número do Cadastro Nacional da Pessoa Jurídica e como validá-lo.') },
    { path: 'blog/cartaocredito', component: CartaodecreditoComponent, data: seo('Número do cartão de crédito: como funciona', 'Entenda como é formado o número do cartão de crédito, o que indica cada parte e como funciona a validação pelo algoritmo de Luhn.') },
    { path: 'blog/renavam', component: RenavamComponent, data: seo('RENAVAM: o que é e para que serve', 'Entenda o que é o RENAVAM, onde encontrá-lo no documento do veículo e como funciona o seu dígito verificador.') },
    { path: 'blog/tituloeleitor', component: TituloeleitorComponent, data: seo('Título de Eleitor: o que é e como é formado', 'Entenda o que é o Título de Eleitor, como é formado o seu número e o que significam os dígitos verificadores.') },
    { path: 'blog/cns', component: CnsComponent, data: seo('Cartão Nacional de Saúde (CNS): o que é', 'Entenda o que é o Cartão Nacional de Saúde (Cartão SUS), para que serve e como é formado o número do CNS.') },
    { path: 'blog/pispasep', component: PispasepComponent, data: seo('PIS/PASEP: o que é e como funciona', 'Entenda o que é o PIS/PASEP, a diferença entre eles, o NIT e como é calculado o dígito verificador.') },
    { path: 'blog/oqueebitcoin', component: OqueeBitcoinComponent, data: seo('O que é Bitcoin e como funciona', 'Entenda o que é o Bitcoin, como funciona a blockchain e a mineração da criptomoeda mais conhecida do mundo.') },
    { path: 'blog/ethereum', component: EthereumComponent, data: seo('O que é Ethereum e como funciona', 'Entenda o que é o Ethereum, para que servem os contratos inteligentes e qual a diferença em relação ao Bitcoin.') },
    { path: 'blog/aih', component: AihComponent, data: seo('AIH: o que é a Autorização de Internação Hospitalar', 'Entenda o que é a AIH (Autorização de Internação Hospitalar) do SUS, para que serve e como é formado o seu número.') },

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
