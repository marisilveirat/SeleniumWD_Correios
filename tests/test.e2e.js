import { expect, browser, $ } from '@wdio/globals';

describe('Explore login correios', () => {

  beforeEach(async () => {
    await browser.url('https://cas.correios.com.br/login?service=https://meucorreios.correios.com.br/auth');
  });

  it('Senha inválida site Correios', async () => {
    await $('#username').setValue('marisilveirat');
    await $('#password').setValue('suasenha123');
    await $('button=ENTRAR').click();

    await expect($('.msg')).toBeDisplayed()
    await expect($('.msg')).toHaveText('Usuário ou senha inválidos.');
  });

  it('Recuperação de senha - invalidando regra de senhas', async () => {
    await $('a[href="https://meucorreios.correios.com.br/esqueciSenha"]').click();

    await $('button.btn-pre[value="PF"]').click();

    await $('#idCorreios').setValue('marisilveirat');

    await $('#nome').setValue('Mariana Silveira');

    await $('#maeDesconhecida').click();

    await $('#dataNascimento').setValue('1999-01-13'); // Formato ISO correto

    await $('#novaSenha').setValue('1');

    await $('#btn-prosseguir').click();

    await $('#btn-prosseguir').click();

    const ErroCaracteres = $('.mensagem.legenda');
    await ErroCaracteres.waitForDisplayed({ timeout: 5000 });   
    await expect(await ErroCaracteres.getText()).toContain("");
  });

  it('Credenciais vazias', async () => {
    await $('button=ENTRAR').click();
    const campo = await $('#username');
    const isValid = await campo.getProperty('validity');
    console.log(isValid.valueMissing); // true se campo obrigatório está vazio

  });

});



