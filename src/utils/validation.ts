// src/utils/validation.ts
/**
 * Utilitários para validação de dados
 * Este arquivo contém funções para validar formatos de dados específicos
 * como CPF, telefone, etc.
 */

/**
 * Valida se um CPF possui formato válido
 * @param cpf - CPF a ser validado
 * @returns Booleano indicando se o CPF é válido
 */
export function validateCPF(cpf: string): boolean {
  // Regex para o formato XXX.XXX.XXX-XX ou sem formatação
  const cpfFormatRegex = /^(\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/;

  // Verifica formato básico
  if (!cpfFormatRegex.test(cpf)) {
    return false;
  }

  // Remove caracteres não numéricos
  const cleanCPF = cpf.replace(/[^\d]/g, '');

  // Verifica se todos os dígitos são iguais (CPF inválido, mas com formato correto)
  if (/^(\d)\1+$/.test(cleanCPF)) {
    return false;
  }

  // Validação do primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }

  let remainder = sum % 11;
  const digit1 = remainder < 2 ? 0 : 11 - remainder;

  if (parseInt(cleanCPF.charAt(9)) !== digit1) {
    return false;
  }

  // Validação do segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }

  remainder = sum % 11;
  const digit2 = remainder < 2 ? 0 : 11 - remainder;

  if (parseInt(cleanCPF.charAt(10)) !== digit2) {
    return false;
  }

  return true;
}

/**
 * Valida se um telefone possui o formato (XX) XXXXX-XXXX
 * @param phone - Telefone a ser validado
 * @returns Booleano indicando se o telefone tem formato válido
 */
export function validatePhone(phone: string): boolean {
  // Expressão regular para o formato (XX) XXXXX-XXXX
  const phoneRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/;
  return phoneRegex.test(phone);
}

/**
 * Formata um CPF adicionando pontuação padrão
 * @param cpf - CPF sem formatação (apenas números)
 * @returns CPF formatado (XXX.XXX.XXX-XX)
 */
export function formatCPF(cpf: string): string {
  const cleanCPF = cpf.replace(/[^\d]/g, '');

  if (cleanCPF.length !== 11) {
    return cpf; // Retorna original se não tiver 11 dígitos
  }

  return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

/**
 * Formata um telefone para o padrão (XX) XXXXX-XXXX
 * @param phone - Telefone sem formatação (apenas números)
 * @returns Telefone formatado
 */
export function formatPhone(phone: string): string {
  const cleanPhone = phone.replace(/[^\d]/g, '');

  if (cleanPhone.length !== 11) {
    return phone; // Retorna original se não tiver 11 dígitos
  }

  return cleanPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}
