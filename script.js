const generateButton = document.getElementById('generate');
const copyButton = document.getElementById('copy');
const passwordField = document.getElementById('password');
const lengthInput = document.getElementById('length');
const errorText = document.getElementById('error-text');

// Function to generate a random password
function generatePassword() {
    const length = parseInt(lengthInput.value);

    if (length > 15) {
        const confirmMessage = 'Password length is too long. Do you want to reduce it to 15 characters?';
        const confirmResult = confirm(confirmMessage);
        
        if (!confirmResult) {
            return;
        }
        
        lengthInput.value = 15;
    }

    const includeUppercase = document.getElementById('includeUppercase').value === 'true';
    const includeNumbers = document.getElementById('includeNumbers').value === 'true';
    const includeSpecialChars = document.getElementById('includeSpecialChars').value === 'true';

    const charset = 'abcdefghijklmnopqrstuvwxyz' +
        (includeUppercase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '') +
        (includeNumbers ? '0123456789' : '') +
        (includeSpecialChars ? '!@#$%^&*()_+[]{}|;:,.<>?~' : '');

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
    }

    return password;
}

// Function to copy the generated password to the clipboard
function copyPassword() {
    passwordField.select();
    document.execCommand('copy');

    window.getSelection().removeAllRanges();

    copyButton.innerText = 'Copied';
    
    setTimeout(() => {
        copyButton.innerText = 'Copy Password';
    }, 1500);
}

// Function to display an error message
function showError(message) {
    errorText.textContent = message;
    errorText.style.color = 'red';
    setTimeout(() => {
        errorText.textContent = '';
    }, 3000);
}

// Function to generate and display a password on page load
function generateOnLoad() {
    const password = generatePassword();
    if (password) {
        passwordField.value = password;
    }
}

// Add an event listener to call the generateOnLoad function when the page loads
window.addEventListener('load', generateOnLoad);

generateButton.addEventListener('click', () => {
    const password = generatePassword();
    if (password) {
        passwordField.value = password;
    }
});

copyButton.addEventListener('click', copyPassword);
