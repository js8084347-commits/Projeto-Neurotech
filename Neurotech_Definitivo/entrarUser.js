document.addEventListener('DOMContentLoaded', () => {

    const formulario = document.getElementById('meuFormulario');
    const inputEmail = document.getElementById('email');
    const inputSenha = document.getElementById('senha');
    const erroEmail = document.getElementById('emailErro');
    const statusLogin = document.getElementById('statusentrada');

    // Lista de e-mails válidos (exemplo para simulação)
    const emailsRegistrados = [
        "teste@gmail.com",
        "usuario@neurotech.com",
        "admin@gmail.com"
    ];

    // Mostrar erro SOMENTE no e-mail
    function mostrarErroEmail(mensagem) {
        erroEmail.textContent = mensagem;
        inputEmail.classList.add('invalido');
        inputEmail.classList.remove('valido');
    }

    // Limpar erro do e-mail
    function limparErroEmail() {
        erroEmail.textContent = '';
        inputEmail.classList.remove('invalido');
        inputEmail.classList.add('valido');
    }

    // Validação do e-mail
    function validarEmail() {
        const email = inputEmail.value.trim();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === '') {
            mostrarErroEmail('Por favor, preencha o e-mail.');
            return false;
        }

        if (!regex.test(email)) {
            mostrarErroEmail('Insira um e-mail válido.');
            return false;
        }

        limparErroEmail();
        return true;
    }

    // Validação em tempo real (somente e-mail)
    inputEmail.addEventListener('input', validarEmail);

    // Envio do formulário
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailOk = validarEmail();

        // Senha NÃO tem validação — apenas pega o valor
        const senha = inputSenha.value;

        if (!emailOk) {
            statusLogin.textContent = 'Corrija o e-mail antes de continuar.';
            statusLogin.classList.add('erro');
            statusLogin.classList.remove('sucesso');
            return;
        }

        // Verificar se o e-mail existe
        if (!emailsRegistrados.includes(inputEmail.value.trim())) {
            statusLogin.textContent = 'E-mail não encontrado. Verifique e tente novamente.';
            statusLogin.classList.add('erro');
            statusLogin.classList.remove('sucesso');
            return;
        }

        // Login bem-sucedido
        statusLogin.textContent = 'Login realizado com sucesso!';
        statusLogin.classList.add('sucesso');
        statusLogin.classList.remove('erro');
    });

});

const senhaInput = document.getElementById('senhaLogin');
const toggleSenha = document.getElementById('toggleSenha');

toggleSenha.addEventListener('click', () => {
    const tipo = senhaInput.getAttribute('type') === 'password' ? 'text' : 'password';
    senhaInput.setAttribute('type', tipo);

    // Alterna o ícone
    toggleSenha.textContent = tipo === 'password' ? '👁' : '︶';
});
