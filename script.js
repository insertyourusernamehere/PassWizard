document.addEventListener('DOMContentLoaded', function () {
    const copyButton = document.getElementById('copy');
    const popupContainer = document.getElementById('popupContainer');
    const overlay = document.getElementById('overlay');
    const generateButton = document.getElementById('generate');
    const passwordField = document.getElementById('password');
    const lengthSlider = document.getElementById('lengthSlider');

    //Function to copy and show a small popup
    copyButton.addEventListener('click', function () {
        popupContainer.style.display = 'block';

        // Set a timeout to hide the popup and overlay after 1.5 seconds
        setTimeout(function () {
            hidePopup();
        }, 1500);

        // Copy the generated password to the clipboard
        passwordField.select();
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
    });

    generateButton.addEventListener('click', function () {
        // Generate and display a password
        const password = generatePassword();
        if (password) {
            passwordField.value = password;
        }
    });

    // Function to generate a random password
    function generatePassword() {
        const length = parseInt(lengthSlider.value);
        const currentValue = document.getElementById('current-value');
        currentValue.textContent = length;

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

    // Function to update the slider value dynamically
    function updateslidervalue() {
        const length = parseInt(lengthSlider.value);
        const currentValue = document.getElementById('current-value');
        currentValue.textContent = length;
    }

    // Function to hide the popup and overlay
    function hidePopup() {
        popupContainer.style.display = 'none';
        overlay.style.display = 'none';
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

    // Code block for more option drop menu
    document.getElementById('toggleButton').addEventListener('click', function () {
        const optionsContainer = document.querySelector('.options');
        const arrowIcon = document.getElementById('arrowIcon');

        optionsContainer.style.display = optionsContainer.style.display === 'none' ? 'block' : 'none';

        if (optionsContainer.style.display === 'block') {
            document.getElementById('toggleButton').classList.add('clicked');
        } else {
            document.getElementById('toggleButton').classList.remove('clicked');
        }
    });
});
