import { test, expect } from '@playwright/test';

test.describe('Formulário de candidatura - Cenário de sucesso', () => {
  test('Deve preencher todos os campos obrigatórios e enviar com sucesso', async ({ page }) => {
    await page.goto('https://jobs.quickin.io/agrosys/apply?job_id=690a2eecaf5ea200139168df');

    await page.fill('input[name="full_name"]', 'Alexandrinho na Moral');
    await page.fill('input[name="date_of_birth"]', '2003-03-22');
    await page.selectOption('select[name="disability"]', 'None');
    await page.fill('input[name="intended_salary"]', '5000');
    await page.fill('input[name="email"]', 'alexandre.moral@example.com');
    await page.fill('input[name="phone"]', '+55 48 999998888');
    
    await page.selectOption('select[name="country"]', 'Brazil');
    await page.fill('input[name="state"]', 'Santa Catarina');
    await page.fill('input[name="city"]', 'Içara');
    await page.fill('input[name="neighborhood"]', 'Centro');
    await page.fill('input[name="address"]', 'Rua Exemplo, 123');
    await page.fill('input[name="zip_code"]', '88801-000');

    await page.fill('textarea[name="qualifications_summary"]', 'Tenho experiência em desenvolvimento full-stack e …');
    await page.fill('textarea[name="languages"]', 'Português (nativo), Inglês (intermediário)');
    
    const filePath = 'tests/files/curriculo_teste.pdf';
    await page.setInputFiles('input[type="file"]', filePath);

    await page.check('input[name="on_site_available"][value="Yes"]');

    await page.click('button[type="submit"]');

    await expect(page.locator('text=Obrigado pela sua candidatura')).toBeVisible({ timeout: 10000 });
  });
});
