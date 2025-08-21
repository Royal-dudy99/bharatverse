// Basic BharatVerse Functions
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show/hide navbar
    const navbar = document.getElementById('main-navbar');
    if (pageId === 'login') {
        navbar.style.display = 'none';
    } else {
        navbar.style.display = 'flex';
    }
    
    // Show selected page
    document.getElementById(pageId + '-page').classList.add('active');
}

function showLoginForm() {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs[0].classList.add('active');
    tabs[1].classList.remove('active');
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
}

function showSignupForm() {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.classList.remove('active');
    tabs[1].classList.add('active');
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
}

function login(event) {
    event.preventDefault();
    alert('Welcome to BharatVerse! 🎉');
    showPage('home');
}

function signup(event) {
    event.preventDefault();
    alert('Account created! Welcome to BharatVerse! 🚀');
    showPage('home');
}

function sendMessage(event) {
    if (event && event.key !== 'Enter') return;
    
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    const messagesContainer = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.innerHTML = `
        <div class="message-content">${message}</div>
        <div class="message-time">Now</div>
    `;
    
    messagesContainer.appendChild(messageElement);
    input.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showCreateModal() {
    alert('Create post feature coming soon! ✍️');
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    showPage('login');
});
