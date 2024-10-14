document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('email').addEventListener('input', validateEmail);
    document.getElementById('password').addEventListener('input', validatePassword);
   
    document.getElementById('registerForm').addEventListener('submit', handleRegistration);
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
});

function validateEmail() {
    const email = document.getElementById('email').value;
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const emailError = document.getElementById('emailError');

    if (!emailPattern.test(email)) {
        emailError.textContent = 'Invalid email format.';
    } else {
        emailError.textContent = '';
    }
}

function validatePassword() {
    const password = document.getElementById('password').value;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const passwordError = document.getElementById('passwordError');

    if (!passwordPattern.test(password)) {
        passwordError.textContent = 'Password must be at least 8 characters, 1 number, 1 special character.';
    } else {
        passwordError.textContent = '';
    }
}


function handleRegistration(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === '' || password === '') {
        document.getElementById('registerMessage').textContent = 'Both fields are required.';
        document.getElementById('registerMessage').className = 'error';
        return;
    }

   
    let users = JSON.parse(localStorage.getItem('registeredUsers')) || {};
    if (users[email]) {
        document.getElementById('registerMessage').textContent = 'Email already registered!';
        document.getElementById('registerMessage').className = 'error';
        return;
    }

    users[email] = password;
    localStorage.setItem('registeredUsers', JSON.stringify(users));

    document.getElementById('registerMessage').textContent = 'Registration successful! Please login.';
    document.getElementById('registerMessage').className = 'success';

   
    document.getElementById('registerForm').reset();
}


function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

 
    let users = JSON.parse(localStorage.getItem('registeredUsers')) || {};

    if (!users[email]) {
        document.getElementById('loginMessage').textContent = 'Email not found.';
        document.getElementById('loginMessage').className = 'error';
        return;
    }

    if (users[email] !== password) {
        document.getElementById('loginMessage').textContent = 'Incorrect password.';
        document.getElementById('loginMessage').className = 'error';
        return;
    }

    document.getElementById('loginMessage').textContent = 'Login successful!';
    document.getElementById('loginMessage').className = 'success';

    document.getElementById('loginForm').reset();
}
