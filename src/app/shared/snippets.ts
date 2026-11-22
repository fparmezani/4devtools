import { Snippet } from './highlight';

/**
 * Funções de validação publicadas nas páginas dos geradores.
 * Mantidas num só lugar para que o script de teste (scripts/test-snippets) valide
 * exatamente o código exibido no site. String.raw preserva barras invertidas.
 */
const ts = (code: string): Snippet => ({ id: 'ts', label: 'TypeScript / JavaScript', linguagem: 'typescript', code });
const py = (code: string): Snippet => ({ id: 'py', label: 'Python', linguagem: 'python', code });
const cs = (code: string): Snippet => ({ id: 'cs', label: 'C#', linguagem: 'csharp', code });
const java = (code: string): Snippet => ({ id: 'java', label: 'Java', linguagem: 'java', code });

export const SNIPPETS: Record<string, Snippet[]> = {
    cpf: [
        ts(String.raw`export function validarCpf(valor: string): boolean {
  const cpf = valor.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  const digitos = cpf.split('').map(Number);
  const calcularDv = (tamanho: number) => {
    let soma = 0;
    for (let i = 0; i < tamanho; i++) {
      soma += digitos[i] * (tamanho + 1 - i);
    }
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  return calcularDv(9) === digitos[9] && calcularDv(10) === digitos[10];
}`),
        py(String.raw`import re

def validar_cpf(valor: str) -> bool:
    cpf = re.sub(r"\D", "", valor)
    if len(cpf) != 11 or cpf == cpf[0] * 11:
        return False

    digitos = [int(d) for d in cpf]

    def calcular_dv(tamanho: int) -> int:
        soma = sum(digitos[i] * (tamanho + 1 - i) for i in range(tamanho))
        resto = soma % 11
        return 0 if resto < 2 else 11 - resto

    return calcular_dv(9) == digitos[9] and calcular_dv(10) == digitos[10]`),
        cs(String.raw`using System.Linq;
using System.Text.RegularExpressions;

public static class Cpf
{
    public static bool Validar(string valor)
    {
        var cpf = Regex.Replace(valor ?? "", @"\D", "");
        if (cpf.Length != 11 || cpf.Distinct().Count() == 1) return false;

        var digitos = cpf.Select(c => c - '0').ToArray();

        int CalcularDv(int tamanho)
        {
            var soma = 0;
            for (var i = 0; i < tamanho; i++)
                soma += digitos[i] * (tamanho + 1 - i);
            var resto = soma % 11;
            return resto < 2 ? 0 : 11 - resto;
        }

        return CalcularDv(9) == digitos[9] && CalcularDv(10) == digitos[10];
    }
}`),
        java(String.raw`public final class Cpf {

    public static boolean validar(String valor) {
        String cpf = valor == null ? "" : valor.replaceAll("\\D", "");
        if (cpf.length() != 11 || cpf.chars().distinct().count() == 1) return false;

        int[] d = cpf.chars().map(c -> c - '0').toArray();
        return calcularDv(d, 9) == d[9] && calcularDv(d, 10) == d[10];
    }

    private static int calcularDv(int[] d, int tamanho) {
        int soma = 0;
        for (int i = 0; i < tamanho; i++) {
            soma += d[i] * (tamanho + 1 - i);
        }
        int resto = soma % 11;
        return resto < 2 ? 0 : 11 - resto;
    }
}`),
    ],

    cnpj: [
        ts(String.raw`// Aceita o CNPJ numérico e o alfanumérico (letras A-Z nas 12 primeiras posições).
export function validarCnpj(valor: string): boolean {
  const cnpj = valor.toUpperCase().replace(/[^0-9A-Z]/g, '');
  if (!/^[0-9A-Z]{12}\d{2}$/.test(cnpj) || /^(.)\1{13}$/.test(cnpj)) return false;

  // Cada caractere vale (código ASCII - 48): '0'..'9' = 0..9, 'A' = 17, 'B' = 18...
  const valores = cnpj.split('').map((c) => c.charCodeAt(0) - 48);
  const calcularDv = (tamanho: number) => {
    const pesos = tamanho === 12
      ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
      : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const soma = pesos.reduce((acc, peso, i) => acc + valores[i] * peso, 0);
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  return calcularDv(12) === valores[12] && calcularDv(13) === valores[13];
}`),
        py(String.raw`import re

# Aceita o CNPJ numérico e o alfanumérico (letras A-Z nas 12 primeiras posições).
def validar_cnpj(valor: str) -> bool:
    cnpj = re.sub(r"[^0-9A-Z]", "", valor.upper())
    if not re.fullmatch(r"[0-9A-Z]{12}\d{2}", cnpj) or len(set(cnpj)) == 1:
        return False

    # Cada caractere vale (código ASCII - 48): '0'..'9' = 0..9, 'A' = 17, 'B' = 18...
    valores = [ord(c) - 48 for c in cnpj]

    def calcular_dv(tamanho: int) -> int:
        pesos = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] if tamanho == 12 else [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
        soma = sum(v * p for v, p in zip(valores, pesos))
        resto = soma % 11
        return 0 if resto < 2 else 11 - resto

    return calcular_dv(12) == valores[12] and calcular_dv(13) == valores[13]`),
        cs(String.raw`using System.Linq;
using System.Text.RegularExpressions;

// Aceita o CNPJ numérico e o alfanumérico (letras A-Z nas 12 primeiras posições).
public static class Cnpj
{
    private static readonly int[] Pesos1 = { 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };
    private static readonly int[] Pesos2 = { 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };

    public static bool Validar(string valor)
    {
        var cnpj = Regex.Replace((valor ?? "").ToUpperInvariant(), "[^0-9A-Z]", "");
        if (!Regex.IsMatch(cnpj, @"^[0-9A-Z]{12}\d{2}$") || cnpj.Distinct().Count() == 1) return false;

        // Cada caractere vale (código ASCII - 48): '0'..'9' = 0..9, 'A' = 17...
        var valores = cnpj.Select(c => c - '0').ToArray();
        return CalcularDv(valores, Pesos1) == valores[12] && CalcularDv(valores, Pesos2) == valores[13];
    }

    private static int CalcularDv(int[] valores, int[] pesos)
    {
        var soma = pesos.Select((p, i) => valores[i] * p).Sum();
        var resto = soma % 11;
        return resto < 2 ? 0 : 11 - resto;
    }
}`),
        java(String.raw`// Aceita o CNPJ numérico e o alfanumérico (letras A-Z nas 12 primeiras posições).
public final class Cnpj {

    private static final int[] PESOS_1 = {5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2};
    private static final int[] PESOS_2 = {6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2};

    public static boolean validar(String valor) {
        String cnpj = valor == null ? "" : valor.toUpperCase().replaceAll("[^0-9A-Z]", "");
        if (!cnpj.matches("[0-9A-Z]{12}\\d{2}") || cnpj.chars().distinct().count() == 1) return false;

        // Cada caractere vale (código ASCII - 48): '0'..'9' = 0..9, 'A' = 17...
        int[] v = cnpj.chars().map(c -> c - '0').toArray();
        return calcularDv(v, PESOS_1) == v[12] && calcularDv(v, PESOS_2) == v[13];
    }

    private static int calcularDv(int[] v, int[] pesos) {
        int soma = 0;
        for (int i = 0; i < pesos.length; i++) {
            soma += v[i] * pesos[i];
        }
        int resto = soma % 11;
        return resto < 2 ? 0 : 11 - resto;
    }
}`),
    ],

    cnh: [
        ts(String.raw`export function validarCnh(valor: string): boolean {
  const cnh = valor.replace(/\D/g, '');
  if (cnh.length !== 11 || /^(\d)\1{10}$/.test(cnh)) return false;

  const d = cnh.split('').map(Number);
  let soma = 0;
  for (let i = 0; i < 9; i++) soma += d[i] * (9 - i);
  let dv1 = soma % 11;
  let desconto = 0;
  if (dv1 >= 10) {
    dv1 = 0;
    desconto = 2;
  }

  soma = 0;
  for (let i = 0; i < 9; i++) soma += d[i] * (i + 1);
  let dv2 = (soma % 11) - desconto;
  if (dv2 < 0) dv2 += 11;
  if (dv2 >= 10) dv2 = 0;

  return dv1 === d[9] && dv2 === d[10];
}`),
        py(String.raw`import re

def validar_cnh(valor: str) -> bool:
    cnh = re.sub(r"\D", "", valor)
    if len(cnh) != 11 or len(set(cnh)) == 1:
        return False

    d = [int(c) for c in cnh]
    dv1 = sum(d[i] * (9 - i) for i in range(9)) % 11
    desconto = 0
    if dv1 >= 10:
        dv1, desconto = 0, 2

    dv2 = sum(d[i] * (i + 1) for i in range(9)) % 11 - desconto
    if dv2 < 0:
        dv2 += 11
    if dv2 >= 10:
        dv2 = 0

    return dv1 == d[9] and dv2 == d[10]`),
        cs(String.raw`using System.Linq;
using System.Text.RegularExpressions;

public static class Cnh
{
    public static bool Validar(string valor)
    {
        var cnh = Regex.Replace(valor ?? "", @"\D", "");
        if (cnh.Length != 11 || cnh.Distinct().Count() == 1) return false;

        var d = cnh.Select(c => c - '0').ToArray();
        var dv1 = Enumerable.Range(0, 9).Sum(i => d[i] * (9 - i)) % 11;
        var desconto = 0;
        if (dv1 >= 10)
        {
            dv1 = 0;
            desconto = 2;
        }

        var dv2 = Enumerable.Range(0, 9).Sum(i => d[i] * (i + 1)) % 11 - desconto;
        if (dv2 < 0) dv2 += 11;
        if (dv2 >= 10) dv2 = 0;

        return dv1 == d[9] && dv2 == d[10];
    }
}`),
        java(String.raw`public final class Cnh {

    public static boolean validar(String valor) {
        String cnh = valor == null ? "" : valor.replaceAll("\\D", "");
        if (cnh.length() != 11 || cnh.chars().distinct().count() == 1) return false;

        int[] d = cnh.chars().map(c -> c - '0').toArray();
        int soma1 = 0, soma2 = 0;
        for (int i = 0; i < 9; i++) {
            soma1 += d[i] * (9 - i);
            soma2 += d[i] * (i + 1);
        }

        int dv1 = soma1 % 11;
        int desconto = 0;
        if (dv1 >= 10) {
            dv1 = 0;
            desconto = 2;
        }

        int dv2 = soma2 % 11 - desconto;
        if (dv2 < 0) dv2 += 11;
        if (dv2 >= 10) dv2 = 0;

        return dv1 == d[9] && dv2 == d[10];
    }
}`),
    ],

    pis: [
        ts(String.raw`export function validarPis(valor: string): boolean {
  const pis = valor.replace(/\D/g, '');
  if (pis.length !== 11 || /^(\d)\1{10}$/.test(pis)) return false;

  const pesos = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const soma = pesos.reduce((acc, peso, i) => acc + Number(pis[i]) * peso, 0);
  const resto = 11 - (soma % 11);
  const dv = resto >= 10 ? 0 : resto;

  return dv === Number(pis[10]);
}`),
        py(String.raw`import re

def validar_pis(valor: str) -> bool:
    pis = re.sub(r"\D", "", valor)
    if len(pis) != 11 or len(set(pis)) == 1:
        return False

    pesos = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    soma = sum(int(c) * p for c, p in zip(pis, pesos))
    resto = 11 - soma % 11
    dv = 0 if resto >= 10 else resto
    return dv == int(pis[10])`),
        cs(String.raw`using System.Linq;
using System.Text.RegularExpressions;

public static class Pis
{
    private static readonly int[] Pesos = { 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };

    public static bool Validar(string valor)
    {
        var pis = Regex.Replace(valor ?? "", @"\D", "");
        if (pis.Length != 11 || pis.Distinct().Count() == 1) return false;

        var soma = Pesos.Select((p, i) => (pis[i] - '0') * p).Sum();
        var resto = 11 - soma % 11;
        var dv = resto >= 10 ? 0 : resto;
        return dv == pis[10] - '0';
    }
}`),
        java(String.raw`public final class Pis {

    private static final int[] PESOS = {3, 2, 9, 8, 7, 6, 5, 4, 3, 2};

    public static boolean validar(String valor) {
        String pis = valor == null ? "" : valor.replaceAll("\\D", "");
        if (pis.length() != 11 || pis.chars().distinct().count() == 1) return false;

        int soma = 0;
        for (int i = 0; i < 10; i++) {
            soma += (pis.charAt(i) - '0') * PESOS[i];
        }
        int resto = 11 - soma % 11;
        int dv = resto >= 10 ? 0 : resto;
        return dv == pis.charAt(10) - '0';
    }
}`),
    ],

    titulo: [
        ts(String.raw`export function validarTituloEleitor(valor: string): boolean {
  const titulo = valor.replace(/\D/g, '');
  if (titulo.length !== 12) return false;

  const d = titulo.split('').map(Number);
  const uf = d[8] * 10 + d[9];
  if (uf < 1 || uf > 28) return false;

  // SP (01) e MG (02): alguns sistemas trocam o resto 0 por 1. Aceitamos os dois.
  const aceita = (resto: number, digito: number) =>
    digito === (resto === 10 ? 0 : resto) ||
    ((uf === 1 || uf === 2) && resto === 0 && digito === 1);

  let soma = 0;
  for (let i = 0; i < 8; i++) soma += d[i] * (i + 2);
  const resto1 = soma % 11;
  const resto2 = (d[8] * 7 + d[9] * 8 + d[10] * 9) % 11;

  return aceita(resto1, d[10]) && aceita(resto2, d[11]);
}`),
        py(String.raw`import re

def validar_titulo_eleitor(valor: str) -> bool:
    titulo = re.sub(r"\D", "", valor)
    if len(titulo) != 12:
        return False

    d = [int(c) for c in titulo]
    uf = d[8] * 10 + d[9]
    if not 1 <= uf <= 28:
        return False

    # SP (01) e MG (02): alguns sistemas trocam o resto 0 por 1. Aceitamos os dois.
    def aceita(resto: int, digito: int) -> bool:
        esperado = 0 if resto == 10 else resto
        return digito == esperado or (uf in (1, 2) and resto == 0 and digito == 1)

    resto1 = sum(d[i] * (i + 2) for i in range(8)) % 11
    resto2 = (d[8] * 7 + d[9] * 8 + d[10] * 9) % 11
    return aceita(resto1, d[10]) and aceita(resto2, d[11])`),
        cs(String.raw`using System.Linq;
using System.Text.RegularExpressions;

public static class TituloEleitor
{
    public static bool Validar(string valor)
    {
        var titulo = Regex.Replace(valor ?? "", @"\D", "");
        if (titulo.Length != 12) return false;

        var d = titulo.Select(c => c - '0').ToArray();
        var uf = d[8] * 10 + d[9];
        if (uf < 1 || uf > 28) return false;

        // SP (01) e MG (02): alguns sistemas trocam o resto 0 por 1. Aceitamos os dois.
        bool Aceita(int resto, int digito) =>
            digito == (resto == 10 ? 0 : resto) || ((uf == 1 || uf == 2) && resto == 0 && digito == 1);

        var resto1 = Enumerable.Range(0, 8).Sum(i => d[i] * (i + 2)) % 11;
        var resto2 = (d[8] * 7 + d[9] * 8 + d[10] * 9) % 11;
        return Aceita(resto1, d[10]) && Aceita(resto2, d[11]);
    }
}`),
        java(String.raw`public final class TituloEleitor {

    public static boolean validar(String valor) {
        String titulo = valor == null ? "" : valor.replaceAll("\\D", "");
        if (titulo.length() != 12) return false;

        int[] d = titulo.chars().map(c -> c - '0').toArray();
        int uf = d[8] * 10 + d[9];
        if (uf < 1 || uf > 28) return false;

        int soma = 0;
        for (int i = 0; i < 8; i++) {
            soma += d[i] * (i + 2);
        }
        int resto1 = soma % 11;
        int resto2 = (d[8] * 7 + d[9] * 8 + d[10] * 9) % 11;
        return aceita(resto1, d[10], uf) && aceita(resto2, d[11], uf);
    }

    // SP (01) e MG (02): alguns sistemas trocam o resto 0 por 1. Aceitamos os dois.
    private static boolean aceita(int resto, int digito, int uf) {
        int esperado = resto == 10 ? 0 : resto;
        return digito == esperado || ((uf == 1 || uf == 2) && resto == 0 && digito == 1);
    }
}`),
    ],

    renavam: [
        ts(String.raw`export function validarRenavam(valor: string): boolean {
  // RENAVAMs antigos têm 9 dígitos: completamos com zeros à esquerda.
  const renavam = valor.replace(/\D/g, '').padStart(11, '0');
  if (renavam.length !== 11 || /^(\d)\1{10}$/.test(renavam)) return false;

  const pesos = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const soma = pesos.reduce((acc, peso, i) => acc + Number(renavam[i]) * peso, 0);
  const resto = 11 - (soma % 11);
  const dv = resto >= 10 ? 0 : resto;

  return dv === Number(renavam[10]);
}`),
        py(String.raw`import re

def validar_renavam(valor: str) -> bool:
    # RENAVAMs antigos têm 9 dígitos: completamos com zeros à esquerda.
    renavam = re.sub(r"\D", "", valor).zfill(11)
    if len(renavam) != 11 or len(set(renavam)) == 1:
        return False

    pesos = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    soma = sum(int(c) * p for c, p in zip(renavam, pesos))
    resto = 11 - soma % 11
    dv = 0 if resto >= 10 else resto
    return dv == int(renavam[10])`),
        cs(String.raw`using System.Linq;
using System.Text.RegularExpressions;

public static class Renavam
{
    private static readonly int[] Pesos = { 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };

    public static bool Validar(string valor)
    {
        // RENAVAMs antigos têm 9 dígitos: completamos com zeros à esquerda.
        var renavam = Regex.Replace(valor ?? "", @"\D", "").PadLeft(11, '0');
        if (renavam.Length != 11 || renavam.Distinct().Count() == 1) return false;

        var soma = Pesos.Select((p, i) => (renavam[i] - '0') * p).Sum();
        var resto = 11 - soma % 11;
        var dv = resto >= 10 ? 0 : resto;
        return dv == renavam[10] - '0';
    }
}`),
        java(String.raw`public final class Renavam {

    private static final int[] PESOS = {3, 2, 9, 8, 7, 6, 5, 4, 3, 2};

    public static boolean validar(String valor) {
        String renavam = valor == null ? "" : valor.replaceAll("\\D", "");
        // RENAVAMs antigos têm 9 dígitos: completamos com zeros à esquerda.
        renavam = "0".repeat(Math.max(0, 11 - renavam.length())) + renavam;
        if (renavam.length() != 11 || renavam.chars().distinct().count() == 1) return false;

        int soma = 0;
        for (int i = 0; i < 10; i++) {
            soma += (renavam.charAt(i) - '0') * PESOS[i];
        }
        int resto = 11 - soma % 11;
        int dv = resto >= 10 ? 0 : resto;
        return dv == renavam.charAt(10) - '0';
    }
}`),
    ],

    rg: [
        ts(String.raw`// Regra usada pelo RG de São Paulo (SSP-SP). Outros estados têm regras próprias.
export function validarRgSp(valor: string): boolean {
  const rg = valor.toUpperCase().replace(/[^0-9X]/g, '');
  if (!/^\d{8}[\dX]$/.test(rg)) return false;

  const soma = rg
    .slice(0, 8)
    .split('')
    .reduce((acc, c, i) => acc + Number(c) * (i + 2), 0);
  const resto = 11 - (soma % 11);
  const dv = resto === 10 ? 'X' : resto === 11 ? '0' : String(resto);

  return dv === rg[8];
}`),
        py(String.raw`import re

# Regra usada pelo RG de São Paulo (SSP-SP). Outros estados têm regras próprias.
def validar_rg_sp(valor: str) -> bool:
    rg = re.sub(r"[^0-9X]", "", valor.upper())
    if not re.fullmatch(r"\d{8}[\dX]", rg):
        return False

    soma = sum(int(c) * (i + 2) for i, c in enumerate(rg[:8]))
    resto = 11 - soma % 11
    dv = "X" if resto == 10 else "0" if resto == 11 else str(resto)
    return dv == rg[8]`),
        cs(String.raw`using System.Linq;
using System.Text.RegularExpressions;

// Regra usada pelo RG de São Paulo (SSP-SP). Outros estados têm regras próprias.
public static class RgSp
{
    public static bool Validar(string valor)
    {
        var rg = Regex.Replace((valor ?? "").ToUpperInvariant(), "[^0-9X]", "");
        if (!Regex.IsMatch(rg, @"^\d{8}[\dX]$")) return false;

        var soma = rg.Take(8).Select((c, i) => (c - '0') * (i + 2)).Sum();
        var resto = 11 - soma % 11;
        var dv = resto == 10 ? 'X' : resto == 11 ? '0' : (char)('0' + resto);
        return dv == rg[8];
    }
}`),
        java(String.raw`// Regra usada pelo RG de São Paulo (SSP-SP). Outros estados têm regras próprias.
public final class RgSp {

    public static boolean validar(String valor) {
        String rg = valor == null ? "" : valor.toUpperCase().replaceAll("[^0-9X]", "");
        if (!rg.matches("\\d{8}[\\dX]")) return false;

        int soma = 0;
        for (int i = 0; i < 8; i++) {
            soma += (rg.charAt(i) - '0') * (i + 2);
        }
        int resto = 11 - soma % 11;
        char dv = resto == 10 ? 'X' : resto == 11 ? '0' : (char) ('0' + resto);
        return dv == rg.charAt(8);
    }
}`),
    ],

    cartao: [
        ts(String.raw`// Algoritmo de Luhn (ISO/IEC 7812): confere só o dígito verificador.
export function validarCartao(valor: string): boolean {
  const numero = valor.replace(/\D/g, '');
  if (numero.length < 13 || numero.length > 19) return false;

  let soma = 0;
  let dobrar = false;
  for (let i = numero.length - 1; i >= 0; i--) {
    let n = Number(numero[i]);
    if (dobrar) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    soma += n;
    dobrar = !dobrar;
  }

  return soma % 10 === 0;
}`),
        py(String.raw`import re

# Algoritmo de Luhn (ISO/IEC 7812): confere só o dígito verificador.
def validar_cartao(valor: str) -> bool:
    numero = re.sub(r"\D", "", valor)
    if not 13 <= len(numero) <= 19:
        return False

    soma = 0
    for i, c in enumerate(reversed(numero)):
        n = int(c)
        if i % 2 == 1:
            n *= 2
            if n > 9:
                n -= 9
        soma += n
    return soma % 10 == 0`),
        cs(String.raw`using System.Linq;
using System.Text.RegularExpressions;

// Algoritmo de Luhn (ISO/IEC 7812): confere só o dígito verificador.
public static class Cartao
{
    public static bool Validar(string valor)
    {
        var numero = Regex.Replace(valor ?? "", @"\D", "");
        if (numero.Length < 13 || numero.Length > 19) return false;

        var soma = numero.Reverse()
            .Select((c, i) =>
            {
                var n = c - '0';
                if (i % 2 == 1)
                {
                    n *= 2;
                    if (n > 9) n -= 9;
                }
                return n;
            })
            .Sum();

        return soma % 10 == 0;
    }
}`),
        java(String.raw`// Algoritmo de Luhn (ISO/IEC 7812): confere só o dígito verificador.
public final class Cartao {

    public static boolean validar(String valor) {
        String numero = valor == null ? "" : valor.replaceAll("\\D", "");
        if (numero.length() < 13 || numero.length() > 19) return false;

        int soma = 0;
        boolean dobrar = false;
        for (int i = numero.length() - 1; i >= 0; i--) {
            int n = numero.charAt(i) - '0';
            if (dobrar) {
                n *= 2;
                if (n > 9) n -= 9;
            }
            soma += n;
            dobrar = !dobrar;
        }
        return soma % 10 == 0;
    }
}`),
    ],
};
