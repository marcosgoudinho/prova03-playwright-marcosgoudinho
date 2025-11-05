// src/scenarios/bobs-registration.spec.ts
import { test, expect } from '@playwright/test';
import { ai } from '@zerostep/playwright'; // Alterado para o novo import

const REGISTRATION_URL = 'https://sso.bobs.com.br/auth/realms/bobs/login-actions/registration?client_id=portal&tab_id=bRhY8x2kde8';

test.describe('Formulário de Registro Bob\'s', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(REGISTRATION_URL);
  });

  test('Caso 1: Deve permitir o preenchimento e tentativa de registro com dados válidos', async ({ page }) => {
    
    await page.getByLabel('Nome completo').fill('Usuario Teste');
    await page.getByLabel('E-mail').fill('usuario.teste@example.com');
    await page.getByLabel('Celular').fill('11987654321');
    await page.getByLabel('Senha', { exact: true }).fill('SenhaSegura123!');
    await page.getByLabel('Confirmar Senha').fill('SenhaSegura123!');
    await page.getByLabel('CPF').fill('12345678900'); 
    
    await page.locator('#termsAndConditions').check();
    
    await page.getByRole('button', { name: 'Registrar' }).click();

    await expect(page).toHaveURL(/.*?login.*?|.*?success.*?|.*?error.*?/, { timeout: 10000 }); 
  });
  test('Caso 2: Deve mostrar erros de validação ao enviar formulário vazio', async ({ page }) => {
    
    await page.getByRole('button', { name: 'Registrar' }).click();
    await expect(page.locator('#kc-full-name-error')).toHaveText('Nome completo é obrigatório');
    await expect(page.locator('#kc-email-error')).toHaveText('Email é obrigatório');
    await expect(page.locator('#kc-phone-error')).toHaveText('Celular é obrigatório');
    await expect(page.locator('#kc-password-error')).toHaveText('Senha é obrigatório');
    await expect(page.locator('#kc-password-confirm-error')).toHaveText('Confirmação de Senha é obrigatório');
    await expect(page.locator('#kc-cpf-error')).toHaveText('CPF é obrigatório');
    await expect(page.locator('#kc-terms-error')).toHaveText('Você deve concordar com os termos');
  });

  // --- Caso 3 reescrito com o novo padrão ---
  test('Caso 3: Deve registrar um novo usuário utilizando Zerostep AI', async ({ page, test }) => {
    // O novo padrão requer que 'page' e 'test' sejam passados
    const aiArgs = { page, test };

    // O beforeEach já faz o 'goto', então a primeira linha não é mais necessária

    await ai('preencha o campo "Nome completo" com "Meu Nome"', aiArgs);
    await ai('preencha o campo "E-mail" com "meuemail@zerostep.ai"', aiArgs);
    await ai('preencha o campo "Celular" com "11912345678"', aiArgs);
    await ai('preencha o campo "Senha" com "Zerostep123!"', aiArgs);
    await ai('preencha o campo "Confirmar Senha" com "Zerostep123!"', aiArgs);
    await ai('preencha o campo "CPF" com "00000000000"', aiArgs);
    await ai('clique no checkbox "Li e concordo com os Termos de Uso e Política de Privacidade."', aiArgs);
    await ai('clique no botão "Registrar"', aiArgs);

    await ai('verifique se a URL mudou para uma página de login ou sucesso', aiArgs);
  });

});
