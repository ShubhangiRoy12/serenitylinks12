// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    if (!email || !password) {
        alert('Please enter email and password');
        return;
    }

    // Validate against stored users from localStorage
    const savedUsers = JSON.parse(localStorage.getItem('serenityUsers') || '[]');
    const user = savedUsers.find(u => u.email === email && u.password === password);

    if (user || password === 'demo') { // allow demo mode
        localStorage.setItem('serenityUser', JSON.stringify(user || { email, name: 'Demo User' }));

        // Show loading overlay
        document.getElementById('loadingOverlay').style.display = 'flex';

        setTimeout(() => {
            window.location.href = 'homepage/homepage.html';
        }, 1500);
    } else {
        alert('Invalid email or password.');
    }
});

// Toggle password visibility
function togglePasswordVisibility() {
    const pwdInput = document.getElementById('password');
    const icon = document.querySelector('.toggle-password i');
    if (pwdInput.type === 'password') {
        pwdInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        pwdInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Show forgot Password modal
function showForgotPassword() {
    document.getElementById('forgotPasswordModal').classList.add('active');
}

// Hide forgot Password modal
function hideForgotPassword() {
    document.getElementById('forgotPasswordModal').classList.remove('active');
}

// Dummy social login handlers
function socialLogin(provider) {
    alert(`Social login with ${provider} is not implemented in this demo.`);
}

// Quick Demo login handler
function quickDemo() {
    localStorage.setItem('serenityUser', JSON.stringify({ email: 'demo@demo.com', name: 'Demo User' }));
    window.location.href = 'homepage/homepage.html';
}

// Support message actions (placeholders)
function showSupportResources() {
    alert('Showing support resources...');
}

function closeSupportMessage() {
    document.getElementById('supportTemplate').style.display = 'none';
}
