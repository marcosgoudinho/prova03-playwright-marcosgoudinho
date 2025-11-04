import { test, expect } from '@playwright/test';

test.describe('Formulário de candidatura - Cenário de erro', () => {
  test('Deve exibir erros ao enviar sem preencher os campos obrigatórios', async ({ page }) => {
    await page.goto('https://jobs.quickin.io/agrosys/apply?job_id=690a2eecaf5ea200139168df');

    // Tenta enviar sem preencher nada
    await page.click('button[type="submit"]');

    // Verifica erros para cada campo obrigatório
    await expect(page.locator('text=Nome completo é obrigatório')).toBeVisible();
    await expect(page.locator('text=Data de nascimento é obrigatória')).toBeVisible();
    await expect(page.locator('text=Salário pretendido é obrigatório')).toBeVisible();
    await expect(page.locator('text=E-mail é obrigatório')).toBeVisible();
    await expect(page.locator('text=Telefone é obrigatório')).toBeVisible();
    await expect(page.locator('text=Envie o seu currículo')).toBeVisible();
    await expect(page.locator('text=Você possui disponibilidade para atuação presencial')).toBeVisible();
  });
});
