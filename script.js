const passwordDisplay = document.getElementById('passwordDisplay');
const lengthInput = document.getElementById('length');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const generateButton = document.getElementById('generateButton');
const copyButton = document.getElementById('copyButton');
const strengthIndicator = document.getElementById('strengthIndicator');
const strengthText = document.getElementById('strengthText');
const lengthValueDisplay = document.getElementById('lengthValue');

const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

lengthInput.addEventListener('input', () => {
    lengthValueDisplay.textContent = lengthInput.value;
});

generateButton.addEventListener('click', () => {
    const length = +lengthInput.value;
    const includeUppercase = uppercaseCheckbox.checked;
    const includeLowercase = lowercaseCheckbox.checked;
    const includeNumbers = numbersCheckbox.checked;
    const includeSymbols = symbolsCheckbox.checked;

    const password = generatePassword(
        length,
        includeUppercase,
        includeLowercase,
        includeNumbers,
        includeSymbols
    );
    passwordDisplay.value = password;
    updateStrengthMeter(password);
});

// Update strength meter on input change as well (e.g. if user types in password field, though it's readonly now)
// passwordDisplay.addEventListener('input', () => {
//     updateStrengthMeter(passwordDisplay.value);
// });

function updateStrengthMeter(password) {
    let score = 0;
    if (!password) {
        strengthIndicator.style.width = '0%';
        strengthText.textContent = '';
        strengthIndicator.className = 'strength-indicator-bar'; // Reset class
        return;
    }

    // Criteria for strength
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    let strength = '';
    let barClass = 'strength-indicator-bar';

    switch (score) {
        case 0:
        case 1:
        case 2:
            strength = 'Weak';
            strengthIndicator.style.width = '33%';
            barClass += ' weak';
            break;
        case 3:
        case 4:
            strength = 'Medium';
            strengthIndicator.style.width = '66%';
            barClass += ' medium';
            break;
        case 5:
        case 6:
            strength = 'Strong';
            strengthIndicator.style.width = '100%';
            barClass += ' strong';
            break;
        default:
            strength = '';
            strengthIndicator.style.width = '0%';
            break;
    }
    strengthIndicator.className = barClass;
    strengthText.textContent = strength;
}

copyButton.addEventListener('click', () => {
    if (passwordDisplay.value) {
        passwordDisplay.select();
        document.execCommand('copy');
        alert('Password copied to clipboard!');
    } else {
        alert('Generate a password first!');
    }
});

function generatePassword(length, uppercase, lowercase, numbers, symbols) {
    let availableChars = '';
    let generatedPassword = '';

    if (uppercase) availableChars += uppercaseChars;
    if (lowercase) availableChars += lowercaseChars;
    if (numbers) availableChars += numberChars;
    if (symbols) availableChars += symbolChars;

    if (availableChars.length === 0) {
        alert('Please select at least one character type.');
        return '';
    }

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * availableChars.length);
        generatedPassword += availableChars[randomIndex];
    }

    return generatedPassword;
}