// Sample data
const sampleUsers = [
    {
        id: 1,
        username: "rohit_captain",
        displayName: "Rohit Sharma",
        bio: "Mumbai Indians Captain 🏏 | Team India | Cricket lover",
        profilePic: "https://via.placeholder.com/100/4A90E2/FFFFFF?text=R",
        isVerified: true,
        verseCoins: 15000,
        followers: 125000,
        following: 89,
        posts: 247
    },
    {
        id: 2,
        username: "tech_priya",
        displayName: "Priya Sharma",
        bio: "Frontend Developer | React enthusiast | Coffee addict ☕",
        profilePic: "https://via.placeholder.com/100/E91E63/FFFFFF?text=P",
        isVerified: false,
        verseCoins: 1250,
        followers: 892,
        following: 234,
        posts: 67
    },
    {
        id: 3,
        username: "bollywood_fan",
        displayName: "Arjun Kapoor",
        bio: "Bollywood updates 🎬 | Movie reviews | SRK forever ❤️",
        profilePic: "https://via.placeholder.com/100/FF9800/FFFFFF?text=A",
        isVerified: true,
        verseCoins: 8500,
        followers: 45000,
        following: 156,
        posts: 389
    }
];

const samplePosts = [
    {
        id: 1,
        userId: 1,
        content: "What a match! 🏏 Mumbai Indians fighting till the end. That's the spirit we need! #MumbaiIndians #IPL2025 #CricketLove",
        image: "https://via.placeholder.com/400x250/4A90E2/FFFFFF?text=Cricket+Match",
        likes: 12500,
        comments: 890,
        shares: 234,
        verseMeter: 85,
        timestamp: "2h ago",
        hashtags: ["MumbaiIndians", "IPL2025", "CricketLove"]
    },
    {
        id: 2,
        userId: 2,
        content: "Just finished building my first React Native app! 📱 The learning curve was steep but totally worth it. Next goal: adding AI features! #ReactNative #AppDevelopment #TechJourney",
        image: "",
        likes: 156,
        comments: 23,
        shares: 45,
        verseMeter: 67,
        timestamp: "4h ago",
        hashtags: ["ReactNative", "AppDevelopment", "TechJourney"]
    },
    {
        id: 3,
        userId: 3,
        content: "Shah Rukh Khan's new movie trailer is out! 🔥 The king is back with another blockbuster. Can't wait for the release! #ShahRukhKhan #Bollywood #KingKhan",
        image: "https://via.placeholder.com/400x250/E91E63/FFFFFF?text=Movie+Trailer",
        likes: 8900,
        comments: 567,
        shares: 890,
        verseMeter: 92,
        timestamp: "6h ago",
        hashtags: ["ShahRukhKhan", "Bollywood", "KingKhan"]
    }
];

// Page Management
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId + '-page').classList.add('active');
    
    // Load content for specific pages
    if (pageId === 'home') {
        loadFeed();
    } else if (pageId === 'profile') {
        loadProfile();
    } else if (pageId === 'explore') {
        loadExplore();
    }
}

// Auth Functions
function showLoginForm() {
    document.querySelector('.tab-btn').classList.add('active');
    document.querySelectorAll('.tab-btn')[1].classList.remove('active');
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
}

function showSignupForm() {
    document.querySelectorAll('.tab-btn').classList.remove('active');
    document.querySelectorAll('.tab-btn')[asset:1].classList.add('active');
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
}

function login(event) {
    event.preventDefault();
    // Simulate login
    alert('Welcome to BharatVerse! 🎉');
    showPage('home');
}

function signup(event) {
    event.preventDefault();
    // Simulate signup
    alert('Account created! Welcome to BharatVerse! 🚀');
    showPage('home');
}

// Post Functions
function loadFeed() {
    const container = document.getElementById('posts-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    samplePosts.forEach(post => {
        const user = sampleUsers.find(u => u.id === post.userId);
        if (!user) return;
        
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <div class="post-header">
                <div class="user-avatar" style="background-image: url('${user.profilePic}')"></div>
                <div class="post-user-info">
                    <div class="post-username">
                        ${user.displayName}
                        ${user.isVerified ? '<span class="post-verified">✓</span>' : ''}
                    </div>
                    <div class="post-time">${post.timestamp}</div>
                </div>
            </div>
            <div class="post-content">${post.content}</div>
            ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image">` : ''}
            <div class="verse-meter-container">
                <div class="verse-meter-label">VerseMeter: ${post.verseMeter}%</div>
                <div class="verse-meter">
                    <div class="verse-meter-fill" style="width: ${post.verseMeter}%"></div>
                </div>
            </div>
            <div class="post-actions">
                <button class="post-action" onclick="likePost(${post.id})">
                    <i class="fas fa-heart"></i> ${formatNumber(post.likes)}
                </button>
                <button class="post-action" onclick="commentPost(${post.id})">
                    <i class="fas fa-comment"></i> ${formatNumber(post.comments)}
                </button>
                <button class="post-action" onclick="sharePost(${post.id})">
                    <i class="fas fa-share"></i> ${formatNumber(post.shares)}
                </button>
                <button class="post-action" onclick="savePost(${post.id})">
                    <i class="fas fa-bookmark"></i>
                </button>
            </div>
        `;
        
        container.appendChild(postElement);
    });
}

function likePost(postId) {
    const post = samplePosts.find(p => p.id === postId);
    if (post) {
        post.likes += 1;
        loadFeed(); // Reload to show updated likes
        
        // Visual feedback
        const button = event.target.closest('.post-action');
        button.classList.add('liked');
        setTimeout(() => button.classList.remove('liked'), 1000);
    }
}

function commentPost(postId) {
    alert('Comment feature coming soon! 💬');
}

function sharePost(postId) {
    alert('Post shared to your Verse! 🔄');
}

function savePost(postId) {
    alert('Post saved! 📌');
}

// Chat Functions
function openChat(userId) {
    const chatItems = document.querySelectorAll('.chat-item');
    chatItems.forEach(item => item.classList.remove('active'));
    event.target.closest('.chat-item').classList.add('active');
    
    // Load chat messages for this user
    loadChatMessages(userId);
}

function loadChatMessages(userId) {
    const messagesContainer = document.getElementById('chat-messages');
    if (!messagesContainer) return;
    
    // Sample messages
    const messages = [
        { sender: 'received', content: 'Hey! Great match today! 🏏', time: '10:30 AM' },
        { sender: 'sent', content: 'Thanks! It was intense till the last ball! 💪', time: '10:32 AM' },
        { sender: 'received', content: 'Your performance was outstanding! 👏', time: '10:35 AM' },
        { sender: 'sent', content: 'Team effort! Everyone played their part 🙌', time: '10:37 AM' }
    ];
    
    messagesContainer.innerHTML = '';
    
    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.sender}`;
        messageElement.innerHTML = `
            <div class="message-content">${message.content}</div>
            <div class="message-time">${message.time}</div>
        `;
        messagesContainer.appendChild(messageElement);
    });
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function sendMessage(event) {
    if (event && event.type === 'keypress' && event.key !== 'Enter') return;
    
    const input = document.getElementById('message-input');
    if (!input || !input.value.trim()) return;
    
    const messagesContainer = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.className = 'message sent';
    messageElement.innerHTML = `
        <div class="message-content">${input.value}</div>
        <div class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
    `;
    
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    input.value = '';
    
    // Simulate reply after 2 seconds
    setTimeout(() => {
        const replyElement = document.createElement('div');
        replyElement.className = 'message received';
        replyElement.innerHTML = `
            <div class="message-content">That's awesome! 🔥</div>
            <div class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
        `;
        messagesContainer.appendChild(replyElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 2000);
}

// Profile Functions
function loadProfile() {
    // Generate some sample posts for profile
    const postGrid = document.querySelector('.post-grid');
    if (!postGrid) return;
    
    postGrid.innerHTML = '';
    
    for (let i = 0; i < 12; i++) {
        const gridPost = document.createElement('div');
        gridPost.className = 'grid-post';
        gridPost.innerHTML = `<i class="fas fa-image" style="font-size: 24px; opacity: 0.5;"></i>`;
        gridPost.onclick = () => alert('Post details coming soon!');
        postGrid.appendChild(gridPost);
    }
}

// Explore Functions
function loadExplore() {
    const exploreGrid = document.querySelector('.explore-grid');
    if (!exploreGrid) return;
    
    exploreGrid.innerHTML = '';
    
    // Generate sample explore items
    const categories = ['Cricket 🏏', 'Bollywood 🎬', 'Tech 💻', 'Food 🍕', 'Travel ✈️', 'Music 🎵'];
    
    for (let i = 0; i < 20; i++) {
        const exploreItem = document.createElement('div');
        exploreItem.className = 'explore-item';
        const category = categories[i % categories.length];
        exploreItem.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: linear-gradient(45deg, #3b82f6, #ec4899); color: white; font-weight: bold;">
                ${category}
            </div>
        `;
        exploreItem.onclick = () => alert(`Exploring ${category} content!`);
        exploreGrid.appendChild(exploreItem);
    }
}

// Utility Functions
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function showCreateModal() {
    alert('Create post feature coming soon! ✍️');
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Start with login page
    showPage('login');
    
    // Add some startup animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Add some interactive features
document.addEventListener('click', function(e) {
    // Add ripple effect to buttons
    if (e.target.matches('button') || e.target.closest('button')) {
        const button = e.target.matches('button') ? e.target : e.target.closest('button');
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to send message in chat
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const activeInput = document.querySelector('#message-input:focus');
        if (activeInput) {
            sendMessage();
        }
    }
    
    // ESC to close modals (future feature)
    if (e.key === 'Escape') {
        // Close any open modals
    }
});

// Add scroll animations
function animateOnScroll() {
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
        const rect = post.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            post.style.opacity = '1';
            post.style.transform = 'translateY(0)';
        }
    });
}

window.addEventListener('scroll', animateOnScroll);

// Dark/Light mode toggle (future feature)
function toggleTheme() {
    document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
}

// Load saved theme
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
}

// Add real-time features simulation
function simulateRealTimeUpdates() {
    setInterval(() => {
        // Simulate new notifications
        const notificationCount = Math.floor(Math.random() * 5);
        if (notificationCount > 0) {
            // Add notification badge (future feature)
        }
        
        // Simulate live user counts
        const onlineUsers = Math.floor(Math.random() * 1000) + 500;
        // Update online user count (future feature)
        
    }, 30000); // Every 30 seconds
}

// Start real-time simulation
simulateRealTimeUpdates();

// Add voice message recording simulation
function startVoiceRecording() {
    alert('🎤 Voice recording started! (Feature coming soon)');
    // Future: Implement actual voice recording
}

function stopVoiceRecording() {
    alert('🎤 Voice recording stopped!');
    // Future: Process and send voice message
}

// Add camera/photo capture simulation
function capturePhoto() {
    alert('📷 Photo capture coming soon!');
    // Future: Implement camera integration
}

// Add video call simulation
function startVideoCall() {
    alert('📹 Video call feature coming soon!');
    // Future: Implement WebRTC video calling
}

// Add location sharing simulation
function shareLocation() {
    alert('📍 Location sharing coming soon!');
    // Future: Implement geolocation
}

// Performance monitoring
function trackPerformance() {
    // Monitor page load times
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`BharatVerse loaded in ${loadTime}ms`);
    });
    
    // Monitor user interactions
    let interactionCount = 0;
    document.addEventListener('click', () => {
        interactionCount++;
        if (interactionCount % 10 === 0) {
            console.log(`User has made ${interactionCount} interactions`);
        }
    });
}

trackPerformance();

// Add error handling
window.addEventListener('error', (e) => {
    console.error('BharatVerse Error:', e.error);
    // Future: Send error reports to analytics
});

// Add offline support detection
window.addEventListener('online', () => {
    console.log('BharatVerse: Back online! 🌐');
    // Future: Sync offline actions
});

window.addEventListener('offline', () => {
    console.log('BharatVerse: Working offline 📱');
    // Future: Enable offline mode
});

console.log('🚀 BharatVerse initialized successfully!');
console.log('💫 Make Your Verse Go Viral!');
