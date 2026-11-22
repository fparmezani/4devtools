import { Linguagem, Snippet } from './highlight';

/**
 * Trechos de código publicados nos tutoriais. Ficam aqui para que possam ser testados
 * fora do Angular (tmp/t). String.raw preserva barras invertidas.
 */
const s = (linguagem: Linguagem, label: string, code: string, id: string = linguagem): Snippet => ({ id, label, linguagem, code });

export const TUTORIAL = {
    // ===== Dados de teste e LGPD =====
    lgpdMascararLog: [
        s('typescript', 'TypeScript', String.raw`// Mostra só o miolo do CPF em logs: 123.456.789-09 -> ***.456.789-**
export function mascararCpf(cpf: string): string {
  const d = cpf.replace(/\D/g, '');
  if (d.length !== 11) return '***';
  return '***.' + d.slice(3, 6) + '.' + d.slice(6, 9) + '-**';
}

// Mostra só o usuário parcial e o domínio: maria.silva@empresa.com -> ma***@empresa.com
export function mascararEmail(email: string): string {
  const [usuario, dominio] = email.split('@');
  if (!usuario || !dominio) return '***';
  return usuario.slice(0, 2) + '***@' + dominio;
}`),
    ],
    lgpdSql: [
        s('sql', 'SQL (PostgreSQL)', String.raw`-- Rode SOMENTE na cópia restaurada em homologação, nunca em produção.
BEGIN;

UPDATE clientes
SET nome       = 'Cliente ' || id,
    email      = 'cliente' || id || '@exemplo.test',
    telefone   = NULL,
    nascimento = date_trunc('year', nascimento)::date,  -- mantém só o ano
    observacao = NULL;

-- Confira antes de confirmar: nenhum e-mail real deve sobrar.
SELECT count(*) FROM clientes WHERE email NOT LIKE '%@exemplo.test';

COMMIT;`),
    ],
    lgpdPython: [
        s('python', 'Python', String.raw`import sqlite3
from faker import Faker

fake = Faker("pt_BR")

conexao = sqlite3.connect("homologacao.db")
cursor = conexao.cursor()

# Troca o CPF real de cada cliente por um CPF gerado, válido e único.
ids = [linha[0] for linha in cursor.execute("SELECT id FROM clientes")]
for id_cliente in ids:
    cursor.execute(
        "UPDATE clientes SET cpf = ?, nome = ? WHERE id = ?",
        (fake.unique.cpf(), fake.name(), id_cliente),
    )

conexao.commit()
conexao.close()`),
    ],

    // ===== CNPJ alfanumérico =====
    cnpjSql: [
        s('sql', 'PostgreSQL', String.raw`-- De BIGINT para texto, recolocando os zeros à esquerda.
ALTER TABLE empresas
  ALTER COLUMN cnpj TYPE char(14) USING lpad(cnpj::text, 14, '0');

-- Opcional: garante formato e maiúsculas no próprio banco.
ALTER TABLE empresas
  ADD CONSTRAINT cnpj_formato CHECK (cnpj ~ '^[0-9A-Z]{12}[0-9]{2}$');`, 'pg'),
        s('sql', 'MySQL', String.raw`-- De BIGINT para texto, recolocando os zeros à esquerda.
ALTER TABLE empresas MODIFY cnpj CHAR(14) NOT NULL;
UPDATE empresas SET cnpj = LPAD(cnpj, 14, '0');`, 'mysql'),
    ],
    cnpjMascara: [
        s('typescript', 'TypeScript', String.raw`// Formata enquanto o usuário digita, aceitando letras: 12ABC34501DE35 -> 12.ABC.345/01DE-35
export function formatarCnpj(valor: string): string {
  const c = valor.toUpperCase().replace(/[^0-9A-Z]/g, '').slice(0, 14);
  return c
    .replace(/^(.{2})(.)/, '$1.$2')
    .replace(/^(.{2})\.(.{3})(.)/, '$1.$2.$3')
    .replace(/^(.{2})\.(.{3})\.(.{3})(.)/, '$1.$2.$3/$4')
    .replace(/^(.{2})\.(.{3})\.(.{3})\/(.{4})(.)/, '$1.$2.$3/$4-$5');
}`),
    ],
    cnpjInput: [
        s('markup', 'HTML', String.raw`<!-- Antes: só números -->
<input type="number" name="cnpj">

<!-- Depois: texto, maiúsculas e tamanho da máscara -->
<input type="text" name="cnpj" maxlength="18"
       autocapitalize="characters" spellcheck="false"
       placeholder="00.000.000/0000-00">`),
    ],

    // ===== Angular =====
    angularValidators: [
        s('typescript', 'documento.validators.ts', String.raw`import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { validarCnpj, validarCpf } from './documentos';

export function cpfValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value as string | null;
    if (!valor) return null; // o "obrigatório" fica com Validators.required
    return validarCpf(valor) ? null : { cpf: true };
  };
}

export function cnpjValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value as string | null;
    if (!valor) return null;
    return validarCnpj(valor) ? null : { cnpj: true };
  };
}`),
    ],
    angularComponent: [
        s('typescript', 'cadastro.component.ts', String.raw`import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cnpjValidator, cpfValidator } from './documento.validators';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
})
export class CadastroComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, cpfValidator()]],
      cnpj: ['', cnpjValidator()],
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);
  }
}`, 'ts'),
        s('markup', 'cadastro.component.html', String.raw`<form [formGroup]="form" (ngSubmit)="salvar()">
  <label for="cpf">CPF</label>
  <input id="cpf" formControlName="cpf" inputmode="numeric" autocomplete="off">

  <p class="erro" *ngIf="form.get('cpf')?.touched && form.get('cpf')?.hasError('required')">
    Informe o CPF.
  </p>
  <p class="erro" *ngIf="form.get('cpf')?.touched && form.get('cpf')?.hasError('cpf')">
    CPF inválido. Confira os números digitados.
  </p>

  <label for="cnpj">CNPJ (opcional)</label>
  <input id="cnpj" formControlName="cnpj" autocapitalize="characters">

  <p class="erro" *ngIf="form.get('cnpj')?.touched && form.get('cnpj')?.hasError('cnpj')">
    CNPJ inválido.
  </p>

  <button type="submit">Salvar</button>
</form>`, 'html'),
    ],
    angularSpec: [
        s('typescript', 'documento.validators.spec.ts', String.raw`import { FormControl } from '@angular/forms';
import { cnpjValidator, cpfValidator } from './documento.validators';

describe('cpfValidator', () => {
  const validar = cpfValidator();

  it('aceita CPF válido, com ou sem máscara', () => {
    expect(validar(new FormControl('123.456.789-09'))).toBeNull();
    expect(validar(new FormControl('12345678909'))).toBeNull();
  });

  it('recusa dígito verificador errado e sequências repetidas', () => {
    expect(validar(new FormControl('123.456.789-10'))).toEqual({ cpf: true });
    expect(validar(new FormControl('111.111.111-11'))).toEqual({ cpf: true });
  });

  it('não valida campo vazio (isso é papel do required)', () => {
    expect(validar(new FormControl(''))).toBeNull();
  });
});

describe('cnpjValidator', () => {
  const validar = cnpjValidator();

  it('aceita CNPJ numérico e alfanumérico', () => {
    expect(validar(new FormControl('11.222.333/0001-81'))).toBeNull();
    expect(validar(new FormControl('12.ABC.345/01DE-35'))).toBeNull();
  });

  it('recusa CNPJ com verificador errado', () => {
    expect(validar(new FormControl('12.ABC.345/01DE-36'))).toEqual({ cnpj: true });
  });
});`),
    ],

    // ===== Faker =====
    fakerInstalar: [
        s('bash', 'Terminal', String.raw`python -m venv .venv
source .venv/bin/activate      # no Windows: .venv\Scripts\activate
pip install faker`),
    ],
    fakerCsv: [
        s('python', 'gerar_clientes.py', String.raw`import csv
from faker import Faker

Faker.seed(42)            # mesma semente = mesmos dados em toda execução
fake = Faker("pt_BR")

colunas = ["nome", "cpf", "email", "telefone", "cep", "cidade", "uf", "nascimento"]

with open("clientes.csv", "w", newline="", encoding="utf-8") as arquivo:
    escritor = csv.DictWriter(arquivo, fieldnames=colunas)
    escritor.writeheader()
    for _ in range(1000):
        escritor.writerow({
            "nome": fake.name(),
            "cpf": fake.unique.cpf(),
            "email": fake.unique.email(),
            "telefone": fake.cellphone_number(),
            "cep": fake.postcode(),
            "cidade": fake.city(),
            "uf": fake.estado_sigla(),
            "nascimento": fake.date_of_birth(minimum_age=18, maximum_age=80).isoformat(),
        })

print("clientes.csv gerado com 1000 linhas")`),
    ],
    fakerEmpresas: [
        s('python', 'gerar_empresas.py', String.raw`import sqlite3
from faker import Faker

Faker.seed(7)
fake = Faker("pt_BR")

conexao = sqlite3.connect("homologacao.db")
conexao.execute("""
    CREATE TABLE IF NOT EXISTS empresas (
        cnpj CHAR(14) PRIMARY KEY,
        razao_social TEXT NOT NULL,
        cidade TEXT,
        uf CHAR(2)
    )
""")

empresas = [
    (fake.unique.cnpj().replace(".", "").replace("/", "").replace("-", ""),
     fake.company(), fake.city(), fake.estado_sigla())
    for _ in range(200)
]
conexao.executemany("INSERT INTO empresas VALUES (?, ?, ?, ?)", empresas)
conexao.commit()

total = conexao.execute("SELECT count(*) FROM empresas").fetchone()[0]
print(f"{total} empresas inseridas")
conexao.close()`),
    ],

    // ===== Máscaras =====
    mascaras: [
        s('typescript', 'mascaras.ts', String.raw`const somenteDigitos = (valor: string) => valor.replace(/\D/g, '');

export function mascaraCpf(valor: string): string {
  return somenteDigitos(valor)
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

export function mascaraCnpj(valor: string): string {
  return somenteDigitos(valor)
    .slice(0, 14)
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
}

export function mascaraTelefone(valor: string): string {
  const d = somenteDigitos(valor).slice(0, 11);
  const comDdd = d.replace(/^(\d{2})(\d)/, '($1) $2');
  // Celular tem 11 dígitos (com o 9 na frente); fixo, 10.
  return d.length === 11
    ? comDdd.replace(/(\d{5})(\d)/, '$1-$2')
    : comDdd.replace(/(\d{4})(\d)/, '$1-$2');
}

export function mascaraCep(valor: string): string {
  return somenteDigitos(valor)
    .slice(0, 8)
    .replace(/(\d{5})(\d)/, '$1-$2');
}`),
    ],
    mascarasUso: [
        s('typescript', 'TypeScript', String.raw`import { mascaraCpf } from './mascaras';

const campo = document.querySelector<HTMLInputElement>('#cpf')!;

campo.addEventListener('input', () => {
  campo.value = mascaraCpf(campo.value);
});

// Ao enviar, mande só os números para o servidor.
function valorParaEnvio(): string {
  return campo.value.replace(/\D/g, '');
}`),
        s('markup', 'HTML', String.raw`<label for="cpf">CPF</label>
<input id="cpf" type="text" inputmode="numeric" maxlength="14"
       autocomplete="off" placeholder="000.000.000-00">`, 'html'),
    ],

    // ===== Playwright =====
    playwrightDados: [
        s('typescript', 'tests/dados.ts', String.raw`// Gera um CPF válido (só números) para cada execução de teste.
export function gerarCpf(): string {
  const d = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
  if (d.every((n) => n === d[0])) return gerarCpf();

  const calcularDv = (base: number[]) => {
    const soma = base.reduce((acc, n, i) => acc + n * (base.length + 1 - i), 0);
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  d.push(calcularDv(d));
  d.push(calcularDv(d));
  return d.join('');
}`),
    ],
    playwrightTeste: [
        s('typescript', 'tests/cadastro.spec.ts', String.raw`import { test, expect } from '@playwright/test';
import { gerarCpf } from './dados';

test.describe('Cadastro de cliente', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cadastro');
  });

  test('aceita um CPF válido', async ({ page }) => {
    await page.getByLabel('Nome').fill('Maria Teste');
    await page.getByLabel('CPF').fill(gerarCpf());
    await page.getByRole('button', { name: 'Salvar' }).click();

    await expect(page.getByText('Cadastro realizado')).toBeVisible();
  });

  const invalidos = [
    { cpf: '123.456.789-10', motivo: 'dígito verificador errado' },
    { cpf: '111.111.111-11', motivo: 'todos os dígitos iguais' },
    { cpf: '123.456', motivo: 'incompleto' },
  ];

  for (const { cpf, motivo } of invalidos) {
    test('recusa CPF com ' + motivo, async ({ page }) => {
      await page.getByLabel('Nome').fill('Maria Teste');
      await page.getByLabel('CPF').fill(cpf);
      await page.getByRole('button', { name: 'Salvar' }).click();

      await expect(page.getByText('CPF inválido')).toBeVisible();
    });
  }
});`),
    ],
    playwrightRodar: [
        s('bash', 'Terminal', String.raw`npx playwright test                 # roda todos os testes
npx playwright test cadastro        # só os arquivos com "cadastro" no nome
npx playwright test --ui            # modo interativo, com linha do tempo
npx playwright show-report          # abre o relatório da última execução`),
    ],
    playwrightConfig: [
        s('typescript', 'playwright.config.ts', String.raw`import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:4200',  // endereço do seu ambiente de testes
  },
  webServer: {
    command: 'npm start',
    url: 'http://localhost:4200',
    reuseExistingServer: true,
  },
});`),
    ],
};
