document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById('remember');

    loadSavedCredentials();

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        const remember = rememberCheckbox.checked;

        if (!username || !password) {
            showError('Inserisci nome utente e password');
            return;
        }

        if (remember) {
            saveCredentials(username, password);
        } else {
            clearSavedCredentials();
        }

        saveUserData(username);
        
        window.location.href = 'index.html';
    });

    function saveCredentials(username, password) {
        localStorage.setItem('savedUsername', username);
        localStorage.setItem('savedPassword', password);
        localStorage.setItem('rememberMe', 'true');
    }

    function loadSavedCredentials() {
        const rememberMe = localStorage.getItem('rememberMe');
        
        if (rememberMe === 'true') {
            const savedUsername = localStorage.getItem('savedUsername');
            const savedPassword = localStorage.getItem('savedPassword');
            
            if (savedUsername && savedPassword) {
                usernameInput.value = savedUsername;
                passwordInput.value = savedPassword;
                rememberCheckbox.checked = true;
            }
        }
    }

    function clearSavedCredentials() {
        localStorage.removeItem('savedUsername');
        localStorage.removeItem('savedPassword');
        localStorage.removeItem('rememberMe');
    }

    function saveUserData(username) {
        const userData = {
            username: username,
            nickname: username,
            email: '',
            bio: '',
            status: 'online',
            gender: '',
            avatar: null,
            lastLogin: new Date().toISOString()
        };

        localStorage.setItem('currentUser', JSON.stringify(userData));
        
        if (!localStorage.getItem('userProfile')) {
            localStorage.setItem('userProfile', JSON.stringify(userData));
        }
    }

    function showError(message) {
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #e74c3c;
            background: #fdf2f2;
            border: 1px solid #f5c6cb;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 15px;
            text-align: center;
            font-size: 14px;
        `;

        loginForm.insertBefore(errorDiv, loginForm.firstChild);
        
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }

    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loginForm.dispatchEvent(new Event('submit'));
        }
    });

    usernameInput.focus();
});