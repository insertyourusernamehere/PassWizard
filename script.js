const generateButton = document.getElementById('generate');
const copyButton = document.getElementById('copy');
const passwordField = document.getElementById('password');
const lengthInput = document.getElementById('length');
const errorText = document.getElementById('error-text');


// Function to generate a random password
function generatePassword() {
    const length = parseInt(lengthSlider.value);
    const currentValue = document.getElementById('current-value');
    currentValue.textContent = length;
    
    if (length > 16) {
        const confirmMessage = 'Password length is too long. Do you want to reduce it to 15 characters?';
        const confirmResult = confirm(confirmMessage);

        if (!confirmResult) {
            return;
        }

        lengthSlider.value = 15;
        lengthValue.textContent = 15;
    }


    const includeUppercase = document.querySelector('input[name="includeUppercase"]').checked;
    const includeNumbers = document.querySelector('input[name="includeNumbers"]').checked;
    const includeSpecialChars = document.querySelector('input[name="includeSpecialChars"]').checked;    

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

function updateslidervalue() {
    const length = parseInt(lengthSlider.value);
    const currentValue = document.getElementById('current-value');
    currentValue.textContent = length;
}

copyButton.addEventListener('click', copyPassword);