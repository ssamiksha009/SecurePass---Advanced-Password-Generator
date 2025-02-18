document.addEventListener("DOMContentLoaded", () => {
    const passwordInput = document.getElementById("password");
    const copyBtn = document.getElementById("copyBtn");
    const generateBtn = document.getElementById("generateBtn");
    const lengthSlider = document.getElementById("lengthSlider");
    const lengthValue = document.getElementById("lengthValue");
    const strengthBar = document.getElementById("strengthBar");
    const strengthText = document.getElementById("strengthText");
    const historyList = document.getElementById("historyList");
    const darkModeToggle = document.getElementById("darkModeToggle");

    const options = {
        uppercase: document.getElementById("uppercase"),
        lowercase: document.getElementById("lowercase"),
        numbers: document.getElementById("numbers"),
        symbols: document.getElementById("symbols"),
        avoidAmbiguous: document.getElementById("avoidAmbiguous"),
    };

    lengthSlider.addEventListener("input", () => {
        lengthValue.textContent = lengthSlider.value;
    });

    generateBtn.addEventListener("click", generatePassword);
    copyBtn.addEventListener("click", copyToClipboard);
    darkModeToggle.addEventListener("click", toggleDarkMode);

    function generatePassword() {
        const charset = {
            uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            lowercase: "abcdefghijklmnopqrstuvwxyz",
            numbers: "0123456789",
            symbols: "!@#$%^&*()_-+=<>?/[]{}|",
            ambiguous: "O0lI1",
        };

        let validChars = "";
        Object.keys(options).forEach(option => {
            if (options[option].checked) {
                validChars += charset[option];
            }
        });

        if (options.avoidAmbiguous.checked) {
            validChars = validChars.replace(/[O0lI1]/g, "");
        }

        let password = "";
        for (let i = 0; i < lengthSlider.value; i++) {
            password += validChars.charAt(Math.floor(Math.random() * validChars.length));
        }

        passwordInput.value = password;
        updateStrength(password);
        addToHistory(password);
    }

    function updateStrength(password) {
        let strength = 0;
        if (password.length > 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        const colors = ["red", "orange", "yellow", "green", "darkgreen"];
        strengthBar.style.background = colors[strength];
        strengthText.textContent = ["Weak", "Weak", "Medium", "Strong", "Very Strong"][strength];
    }

    function copyToClipboard() {
        passwordInput.select();
        document.execCommand("copy");
        alert("Password Copied!");
    }

    function addToHistory(password) {
        const li = document.createElement("li");
        li.innerHTML = `${password} <button class='copy-history' onclick='copyText("${password}")'>📋</button>`;
        historyList.prepend(li);
    }

    function toggleDarkMode() {
        document.body.classList.toggle("dark-mode");
    }
});

function copyText(text) {
    navigator.clipboard.writeText(text);
    alert("Copied: " + text);
}
