// Obtendo os elementos do formulário
const emailI = document.getElementById("email");
const passwordI = document.getElementById("password");
const confirmPasswordI = document.getElementById("confirmPassword");
const firstNameI = document.getElementById("firstName");
const lastNameI = document.getElementById("lastName");
const birthDateI = document.getElementById("birthDate");

const registerBtn = document.getElementById("btnRegister");
const errorMessage = document.getElementById("error-message");

var error = '';

// Função para registrar o usuário
function register() {
    const email = emailI.value;
    const password = passwordI.value;
    const confirmPassword = confirmPasswordI.value;
    const firstName = firstNameI.value;
    const lastName = lastNameI.value;
    const birthDate = birthDateI.value;

    // Validações
    if (firstName.length < 2) {
        displayError("O primeiro nome tem que conter pelo menos 2 caracteres.");
        return;
    }
    if (lastName.length < 2) {
        displayError("O último nome tem que conter pelo menos 2 caracteres.");
        return;
    }
    if (password.length < 6) {
        displayError("A sua senha deve ter pelo menos 6 caracteres.");
        return;
    }

    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
        displayError("As senhas não coincidem.");
        return;
    }

    // Validação de senha forte
    const passwordValidation = validatePassword(password);
    if (passwordValidation.length > 0) {
        displayError(`Erro na senha: ${passwordValidation.join(', ')}`);
        return;
    }

    // Criação do objeto usuário    
    const user = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate
    };

    // Recuperando e armazenando os usuários no localStorage
    let registeredUsers = JSON.parse(localStorage.getItem("users")) ?? [];
    registeredUsers.push(user);
    localStorage.setItem("users", JSON.stringify(registeredUsers));

    // Sucesso no registro (opcional, você pode adicionar mais lógica aqui)
    console.log("Usuário registrado com sucesso!");

    window.location.href = "../Login/Login.html"
}

// Função para exibir a mensagem de erro
function displayError(message) {
    errorMessage.innerText = message;
}

// Função para validar a senha
function validatePassword(password) {
    const errors = [];

    // Validação dos critérios de senha
    const passwordChecks = {
        uppercase: { regex: /[A-Z]/, description: 'Pelo menos uma letra maiúscula' },
        lowercase: { regex: /[a-z]/, description: 'Pelo menos uma letra minúscula' },
        digit: { regex: /[0-9]/, description: 'Pelo menos um dígito' },
        special: { regex: /[^A-Za-z0-9]/, description: 'Pelo menos um símbolo especial' },
        length: { test: pw => pw.length >= 8, description: 'A senha deve ter pelo menos 8 caracteres' }
    };

    // Checando os critérios
    for (const [key, { regex, test, description }] of Object.entries(passwordChecks)) {
        const isValid = test ? test(password) : regex.test(password);
        if (!isValid) {
            errors.push(description);
        }
    }

    return errors;
}

// Função para validar a data
function validateDate(dateString) {
    const date = new Date(dateString);
    return !isNaN(date.getTime()); // Verifica se a data é válida
}

// Função para redirecionar para a página inicial
function GotoHomepage() {
    window.location.href = "http://127.0.0.1:3000/home page/home.html";
}

