// src/scenarios/bobs-registration.spec.ts
import { test, expect } from '@playwright/test';
import { zerostep } from 'zerostep';

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

  test('Caso 3: Deve registrar um novo usuário utilizando Zerostep AI', async ({ page }) => {
    await zerostep(page).goto('o formulário de registro do Bob\'s');
    
    await zerostep(page).type('Meu Nome', 'Nome completo');
    await zerostep(page).type('meuemail@zerostep.ai', 'E-mail');
    await zerostep(page).type('11912345678', 'Celular');
    await zerostep(page).type('Zerostep123!', 'Senha');
    await zerostep(page).type('Zerostep123!', 'Confirmar Senha');
    await zerostep(page).type('00000000000', 'CPF'); 
    await zerostep(page).click('Li e concordo com os Termos de Uso e Política de Privacidade.'); 
    await zerostep(page).click('Registrar');

    await zerostep(page).expect('a URL deve mudar para a página de login ou uma página de sucesso');
  });

});