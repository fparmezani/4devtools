export class Endereco
{
    bairro: string = ""
    cep: string = ""
    cidade: string = ""
    complemento: string = ""
    estado: string = ""
    estadoSigla: string = ""
    logradouro: string = ""
    numero: string = ""
}

export class CartaoCredito{
    numero : string= "";
    cvv : string = "";
    dataExpiracao : string = "";
}

export class Pessoa{
    
    altura: string = "";
    celular: string = "";
    
    cpf:  string = "";
    cnh: string = "";
    renavan :string = "";
    pispasep :string="";
    cartaodecredito : CartaoCredito = new CartaoCredito();

    dataNascimento: string = "";
    email: string = "";
    endereco : Endereco = new Endereco();
    mae: string = "";
    nome: string = "";
    pai: string = "";
    peso: string = "";
    rg: string = "";
    senha: string = "";
    signo: string = "";
    site: string = "";
    telefone: string = "";
    tipoSanguineo: string = "";
    usuario: string = "";

}

export class ObjetoPessoa {
    limit: string = '';
    type: string = '';
    values: Pessoa = new Pessoa();
}


// altura: "1.63"
// celular: "(65) 94572-3530"
// cpf: "652.406.482-80"
// dataNascimento: "01/02/1999"
// email: "luiz@luiz.com.br"
// endereco: {cep: '89203-887', logradouro: 'Amazonas', complemento: 'Fazenda 7', numero: 1315, bairro: 'Boa Vista', …}
// mae: "ALINE RIBEIRO MARQUES"
// nome: "JOSE RIBEIRO MARQUES"
// pai: "JOAO CARDOSO MARQUES"
// peso: 79
// rg: "mt-39.993.329"
// senha: "kP8*l*7b7"
// signo: "Aquários"
// site: "http://pizzaria-autentica.com.br"
// telefone: "(65) 80501-9866"
// tipoSanguineo: " B−"
// usuario: "jose-ribeiro-marques"