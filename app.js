// BharatVerse - Advanced Social Media Platform
// Version: 1.0.0

// Global State Management
const BharatVerse = {
    currentUser: {
        id: 'current_user',
        username: 'your_username',
        displayName: 'Your Name',
        email: 'you@bharatverse.com',
        bio: 'Cricket lover 🏏 | Coding addict | #TeamIndia',
        profilePic: 'https://via.placeholder.com/120/333/FFFFFF?text=You',
        coverPic: 'https://via.placeholder.com/800x200/1e3a8a/FFFFFF?text=Your+Cover',
        location: 'Mumbai, India',
        website: '',
        isVerified: false,
        verseCoins: 2500,
        followers: 892,
        following: 234,
        posts: 47,
        joinDate: '2025-01-15',
        lastActive: Date.now()
    },
    currentLanguage: 'en',
    isVoiceRecording: false,
    voiceTimer: null,
    voiceStartTime: 0,
    theme: 'dark',
    posts: [],
    users: [],
    messages: [],
    notifications: [],
    stories: [],
    isOnline: true
};

// Sample Data
const sampleUsers = [
    {
        id: 1,
        username: 'rohit_captain',
        displayName: 'Rohit Sharma',
        email: 'rohit@bharatverse.com',
        bio: 'Mumbai Indians Captain 🏏 | Team India | Making cricket dreams come true',
        profilePic: 'https://via.placeholder.com/120/4A90E2/FFFFFF?text=R',
        coverPic: 'https://via.placeholder.com/800x200/1e3a8a/FFFFFF?text=Cricket+Champion',
        location: 'Mumbai, India',
        website: 'https://rohitsharma.com',
        isVerified: true,
        verseCoins: 15000,
        followers: 2500000,
        following: 456,
        posts: 1247,
        joinDate: '2023-01-15',
        lastActive: Date.now() - 300000
    },
    {
        id: 2,
        username: 'tech_priya',
        displayName: 'Priya Sharma',
        email: 'priya@bharatverse.com',
        bio: 'Frontend Developer | React Expert | Building the future 💻',
        profilePic: 'https://via.placeholder.com/120/E91E63/FFFFFF?text=P',
        coverPic: 'https://via.placeholder.com/800x200/ec4899/FFFFFF?text=Code+Creator',
        location: 'Bangalore, India',
        website: 'https://priyatech.dev',
        isVerified: false,
        verseCoins: 8500,
        followers: 45600,
        following: 1234,
        posts: 567,
        joinDate: '2023-03-22',
        lastActive: Date.now() - 600000
    },
    {
        id: 3,
        username: 'bollywood_arjun',
        displayName: 'Arjun Kapoor',
        email: 'arjun@bharatverse.com',
        bio: 'Bollywood Updates 🎬 | Movie Reviews | SRK Forever ❤️',
        profilePic: 'https://via.placeholder.com/120/FF9800/FFFFFF?text=A',
        coverPic: 'https://via.placeholder.com/800x200/f59e0b/FFFFFF?text=Bollywood+Buzz',
        location: 'Mumbai, India',
        website: 'https://bollywoodwitharju.com',
        isVerified: true,
        verseCoins: 12000,
        followers: 890000,
        following: 234,
        posts: 2145,
        joinDate: '2023-02-10',
        lastActive: Date.now() - 180000
    },
    {
        id: 4,
        username: 'virat_king',
        displayName: 'Virat Kohli',
        email: 'virat@bharatverse.com',
        bio: 'RCB Captain 👑 | Team India | Fitness Freak 💪',
        profilePic: 'https://via.placeholder.com/120/FF5722/FFFFFF?text=V',
        coverPic: 'https://via.placeholder.com/800x200/dc2626/FFFFFF?text=Cricket+King',
        location: 'Delhi, India',
        website: 'https://viratkohli.com',
        isVerified: true,
        verseCoins: 25000,
        followers: 3200000,
        following: 123,
        posts: 934,
        joinDate: '2023-01-05',
        lastActive: Date.now() - 900000
    },
    {
        id: 5,
        username: 'deepika_style',
        displayName: 'Deepika Padukone',
        email: 'deepika@bharatverse.com',
        bio: 'Actor | Producer | Mental Health Advocate 🌟',
        profilePic: 'https://via.placeholder.com/120/9C27B0/FFFFFF?text=D',
        coverPic: 'https://via.placeholder.com/800x200/7c3aed/FFFFFF?text=Bollywood+Star',
        location: 'Mumbai, India',
        website: 'https://deepikapadukone.com',
        isVerified: true,
        verseCoins: 18000,
        followers: 2800000,
        following: 89,
        posts: 1456,
        joinDate: '2023-01-20',
        lastActive: Date.now() - 120000
    }
];

const samplePosts = [
    {
        id: 1,
        userId: 1,
        content: "What an incredible match! 🏏 Mumbai Indians showing the true spirit of never giving up. Every ball counts, every run matters. That's cricket for you! #MumbaiIndians #IPL2025 #CricketLove #NeverGiveUp",
        media: [
            {
                type: 'image',
                url: 'https://via.placeholder.com/500x300/4A90E2/FFFFFF?text=Cricket+Victory',
                caption: 'Victory celebration at Wankhede!'
            }
        ],
        likes: 45670,
        comments: 2340,
        shares: 1890,
        verseMeter: 94,
        timestamp: Date.now() - 7200000,
        hashtags: ['MumbaiIndians', 'IPL2025', 'CricketLove', 'NeverGiveUp'],
        location: 'Wankhede Stadium, Mumbai',
        isLiked: false,
        isShared: false,
        isSaved: false,
        privacy: 'public'
    },
    {
        id: 2,
        userId: 2,
        content: "Just shipped a new React component library! 🚀 Open source and built with TypeScript. The developer experience is incredible! #ReactJS #OpenSource #TypeScript #WebDevelopment",
        media: [
            {
                type: 'image',
                url: 'https://via.placeholder.com/500x300/E91E63/FFFFFF?text=Code+Screenshot',
                caption: 'Clean, modern component architecture'
            }
        ],
        likes: 1567,
        comments: 234,
        shares: 456,
        verseMeter: 78,
        timestamp: Date.now() - 14400000,
        hashtags: ['ReactJS', 'OpenSource', 'TypeScript', 'WebDevelopment'],
        location: 'Bangalore, India',
        isLiked: true,
        isShared: false,
        isSaved: true,
        privacy: 'public'
    },
    {
        id: 3,
        userId: 3,
        content: "BREAKING: Shah Rukh Khan's new film 'Pathaan 2' trailer drops tomorrow! 🔥 The King is back with another blockbuster. #ShahRukhKhan #Pathaan2 #Bollywood #KingKhan",
        media: [
            {
                type: 'image',
                url: 'https://via.placeholder.com/500x300/FF9800/FFFFFF?text=Movie+Poster',
                caption: 'Pathaan 2 - The legend continues'
            }
        ],
        likes: 23450,
        comments: 3456,
        shares: 5678,
        verseMeter: 96,
        timestamp: Date.now() - 21600000,
        hashtags: ['ShahRukhKhan', 'Pathaan2', 'Bollywood', 'KingKhan'],
        location: 'Mumbai, India',
        isLiked: true,
        isShared: true,
        isSaved: false,
        privacy: 'public'
    },
    {
        id: 4,
        userId: 4,
        content: "Morning training session complete! 💪 Discipline is the bridge between goals and accomplishment. #Fitness #Cricket #MorningMotivation #NeverSettle",
        media: [],
        likes: 67890,
        comments: 4567,
        shares: 2345,
        verseMeter: 92,
        timestamp: Date.now() - 3600000,
        hashtags: ['Fitness', 'Cricket', 'MorningMotivation', 'NeverSettle'],
        location: 'Delhi, India',
        isLiked: false,
        isShared: false,
        isSaved: true,
        privacy: 'public'
    },
    {
        id: 5,
        userId: 5,
        content: "Mental health is just as important as physical health. 🧠💚 Remember: it's okay to not be okay, and it's okay to ask for help. #MentalHealthMatters #YouAreNotAlone #SelfCare",
        media: [],
        likes: 89543,
        comments: 6789,
        shares: 12345,
        verseMeter: 98,
        timestamp: Date.now() - 10800000,
        hashtags: ['MentalHealthMatters', 'YouAreNotAlone', 'SelfCare'],
        location: 'Mumbai, India',
        isLiked: true,
        isShared: true,
        isSaved: true,
        privacy: 'public'
    }
];

const trendingHashtags = [
    { tag: 'IPL2025', posts: 234567, growth: '+45%' },
    { tag: 'BharatVerse', posts: 156789, growth: '+89%' },
    { tag: 'CricketFever', posts: 98765, growth: '+23%' },
    { tag: 'Bollywood', posts: 87654, growth: '+12%' },
    { tag: 'TechIndia', posts: 76543, growth: '+67%' },
    { tag: 'MakeInIndia', posts: 65432, growth: '+34%' }
];

// Language Translations
const translations = {
    en: {
        'BharatVerse': 'BharatVerse',
        'Make Your Verse Go Viral': 'Make Your Verse Go Viral',
        'Login': 'Login',
        'Sign Up': 'Sign Up',
        'Your Story': 'Your Story',
        'What\'s on your verse today?': 'What\'s on your verse today?',
        'Photo': 'Photo',
        'Video': 'Video',
        'Voice': 'Voice',
        'Location': 'Location',
        'Live': 'Live',
        'Verses': 'Verses',
        'Syncing': 'Syncing',
        'Synced': 'Synced',
        'VerseCoins': 'VerseCoins',
        'Edit Profile': 'Edit Profile',
        'Sync': 'Sync',
        'Message': 'Message',
        'Trending in India': 'Trending in India',
        'Who to Sync': 'Who to Sync',
        'See All': 'See All',
        'Explore BharatVerse': 'Explore BharatVerse',
        'Continue with Google': 'Continue with Google',
        'Continue with Microsoft': 'Continue with Microsoft',
        'Enter BharatVerse': 'Enter BharatVerse',
        'Create Account': 'Create Account'
    },
    hi: {
        'BharatVerse': 'भारतवर्स',
        'Make Your Verse Go Viral': 'अपना वर्स वायरल करें',
        'Login': 'लॉगिन',
        'Sign Up': 'साइन अप',
        'Your Story': 'आपकी स्टोरी',
        'What\'s on your verse today?': 'आज आपके वर्स में क्या है?',
        'Photo': 'फोटो',
        'Video': 'वीडियो',
        'Voice': 'आवाज़',
        'Location': 'स्थान',
        'Live': 'लाइव',
        'Verses': 'वर्स',
        'Syncing': 'सिंकिंग',
        'Synced': 'सिंक्ड',
        'VerseCoins': 'वर्सकॉइन',
        'Edit Profile': 'प्रोफाइल संपादित करें',
        'Sync': 'सिंक',
        'Message': 'संदेश',
        'Trending in India': 'भारत में ट्रेंडिंग',
        'Who to Sync': 'किसे सिंक करें',
        'See All': 'सभी देखें',
        'Explore BharatVerse': 'भारतवर्स एक्सप्लोर करें',
        'Continue with Google': 'Google से जारी रखें',
        'Continue with Microsoft': 'Microsoft से जारी रखें',
        'Enter BharatVerse': 'भारतवर्स में प्रवेश करें',
        'Create Account': 'खाता बनाएं'
    }
};

// Utility Functions
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function formatTime(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}m`;
    return 'now';
}

function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    toast.innerHTML = `
        <span class="toast-icon">${icons[type]}</span>
        <span class="toast-message">${message}</span>
    `;
    
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    
    container.appendChild(toast);
    
    setTimeout(() => {
        if (container.contains(toast)) {
            container.removeChild(toast);
        }
    }, duration);
}

// Theme Management
function toggleTheme() {
    BharatVerse.theme = BharatVerse.theme === 'dark' ? 'light' : 'dark';
    document.body.classList.toggle('dark-theme', BharatVerse.theme === 'dark');
    
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        themeIcon.className = BharatVerse.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    showToast(`Switched to ${BharatVerse.theme} theme`, 'success');
}

// Language Management
function toggleLanguage() {
    BharatVerse.currentLanguage = BharatVerse.currentLanguage === 'en' ? 'hi' : 'en';
    const langIcon = document.getElementById('lang-icon');
    if (langIcon) {
        langIcon.textContent = BharatVerse.currentLanguage === 'en' ? '🇮🇳' : '🇬🇧';
    }
    
    updateLanguageElements();
    showToast(`Language: ${BharatVerse.currentLanguage === 'en' ? 'English' : 'हिन्दी'}`, 'success');
}

function updateLanguageElements() {
    const elements = document.querySelectorAll('[data-en]');
    elements.forEach(element => {
        const key = element.getAttribute('data-en');
        const translation = translations[BharatVerse.currentLanguage]?.[key];
        if (translation) {
            if (element.tagName.toLowerCase() === 'input' || element.tagName.toLowerCase() === 'textarea') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        }
    });
}

// Page Management
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    const navbar = document.getElementById('main-navbar');
    if (pageId === 'login') {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }
    
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    switch(pageId) {
        case 'home':
            loadHomeFeed();
            loadStories();
            loadRightSidebar();
            break;
        case 'explore':
            loadExploreContent();
            break;
        case 'create':
            initializeCreatePost();
            break;
        case 'messages':
            loadMessagesList();
            break;
        case 'profile':
            loadUserProfile();
            break;
    }
}

// Authentication Functions
function showAuthForm(formType) {
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    forms.forEach(form => form.classList.remove('active'));
    
    if (formType === 'login') {
        tabs[0].classList.add('active');
        document.getElementById('login-form').classList.add('active');
    } else {
        tabs[1].classList.add('active');
        document.getElementById('signup-form').classList.add('active');
    }
}

function handleAuth(event, type) {
    event.preventDefault();
    
    showToast('Logging you in...', 'info');
    
    setTimeout(() => {
        updateUserInterface();
        showToast(`Welcome to BharatVerse! 🎉`, 'success');
        showPage('home');
    }, 1000);
}

function loginWithProvider(provider) {
    showToast(`Connecting with ${provider}...`, 'info');
    
    setTimeout(() => {
        updateUserInterface();
        showToast(`Successfully logged in with ${provider}! 🎉`, 'success');
        showPage('home');
    }, 1500);
}

function togglePassword(button) {
    const input = button.previousElementSibling;
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

function updateUserInterface() {
    // Update profile pictures
    const profilePics = document.querySelectorAll('#nav-profile-pic, #user-avatar-small, #create-user-avatar, #profile-avatar');
    profilePics.forEach(pic => {
        pic.src = BharatVerse.currentUser.profilePic;
    });
    
    // Update names
    const nameElements = document.querySelectorAll('#create-username, #profile-display-name');
    nameElements.forEach(element => {
        element.textContent = BharatVerse.currentUser.displayName;
    });
    
    // Update VerseCoins
    const coinElements = document.querySelectorAll('#versecoins-balance, #profile-versecoins');
    coinElements.forEach(element => {
        element.textContent = formatNumber(BharatVerse.currentUser.verseCoins);
    });
}

// Home Feed Functions
function loadHomeFeed() {
    const container = document.getElementById('posts-container');
    if (!container) return;
    
    container.innerHTML = '';
    BharatVerse.posts = [...samplePosts];
    
    BharatVerse.posts.forEach(post => {
        const user = sampleUsers.find(u => u.id === post.userId);
        if (user) {
            const postElement = createPostElement(post, user);
            container.appendChild(postElement);
        }
    });
}

function createPostElement(post, user) {
    const postEl = document.createElement('div');
    postEl.className = 'post';
    postEl.innerHTML = `
        <div class="post-header">
            <img class="post-user-avatar" src="${user.profilePic}" alt="${user.displayName}" onclick="viewUserProfile(${user.id})">
            <div class="post-user-info">
                <div class="post-user-name">
                    ${user.displayName}
                    ${user.isVerified ? '<i class="fas fa-check-circle verified-badge"></i>' : ''}
                </div>
                <div class="post-username">@${user.username}</div>
                <div class="post-time">${formatTime(post.timestamp)}</div>
            </div>
            <button class="post-menu-btn" onclick="showPostMenu(${post.id})">
                <i class="fas fa-ellipsis-h"></i>
            </button>
        </div>
        
        <div class="post-content">${post.content}</div>
        
        ${post.media && post.media.length > 0 ? 
            `<img class="post-media" src="${post.media[0].url}" alt="${post.media[0].caption || 'Post image'}" onclick="openMediaModal('${post.media.url}')">` 
            : ''}
        
        <div class="verse-meter-container">
            <div class="verse-meter-label">
                <span>VerseMeter: ${post.verseMeter}%</span>
                <span>${post.verseMeter > 90 ? '🔥' : post.verseMeter > 70 ? '📈' : '💫'}</span>
            </div>
            <div class="verse-meter">
                <div class="verse-meter-fill" style="width: ${post.verseMeter}%"></div>
            </div>
        </div>
        
        <div class="post-actions">
            <button class="post-action ${post.isLiked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
                <i class="fas fa-heart"></i>
                <span>${formatNumber(post.likes)}</span>
            </button>
            <button class="post-action" onclick="showComments(${post.id})">
                <i class="fas fa-comment"></i>
                <span>${formatNumber(post.comments)}</span>
            </button>
            <button class="post-action ${post.isShared ? 'shared' : ''}" onclick="sharePost(${post.id})">
                <i class="fas fa-share"></i>
                <span>${formatNumber(post.shares)}</span>
            </button>
            <button class="post-action ${post.isSaved ? 'saved' : ''}" onclick="savePost(${post.id})">
                <i class="fas fa-bookmark"></i>
            </button>
        </div>
    `;
    
    return postEl;
}

function loadStories() {
    const container = document.getElementById('stories-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Add sample stories
    sampleUsers.slice(0, 5).forEach(user => {
        const storyEl = document.createElement('div');
        storyEl.className = 'story-item';
        storyEl.innerHTML = `
            <div class="story-avatar" style="background-image: url('${user.profilePic}')"></div>
            <span class="story-username">${user.displayName.split(' ')[0]}</span>
        `;
        storyEl.onclick = () => viewStory(user.id);
        container.appendChild(storyEl);
    });
}

function loadRightSidebar() {
    // Load trending hashtags
    const trendingContainer = document.getElementById('trending-list');
    if (trendingContainer) {
        trendingContainer.innerHTML = '';
        trendingHashtags.slice(0, 6).forEach(trend => {
            const trendEl = document.createElement('div');
            trendEl.className = 'trending-item';
            trendEl.innerHTML = `
                <div>
                    <div class="trending-hashtag">#${trend.tag}</div>
                    <div class="trending-count">${formatNumber(trend.posts)} Verses</div>
                </div>
                <div class="trending-growth">${trend.growth}</div>
            `;
            trendEl.onclick = () => searchHashtag(trend.tag);
            trendingContainer.appendChild(trendEl);
        });
    }
    
    // Load sync suggestions
    const syncContainer = document.getElementById('sync-suggestions-list');
    if (syncContainer) {
        syncContainer.innerHTML = '';
        sampleUsers.slice(0, 3).forEach(user => {
            const suggestionEl = document.createElement('div');
            suggestionEl.className = 'sync-suggestion-item';
            suggestionEl.innerHTML = `
                <div class="sync-user-info">
                    <img class="sync-user-avatar" src="${user.profilePic}" alt="${user.displayName}">
                    <div>
                        <div class="sync-user-name">${user.displayName}</div>
                        <div class="sync-user-handle">@${user.username}</div>
                    </div>
                </div>
                <button class="sync-btn" onclick="syncUser(${user.id})">Sync</button>
            `;
            syncContainer.appendChild(suggestionEl);
        });
    }
    
    // Load cricket widget
    loadCricketWidget();
}

function loadCricketWidget() {
    const cricketContainer = document.getElementById('live-cricket');
    if (cricketContainer) {
        cricketContainer.innerHTML = `
            <div class="match-teams">
                <span>MI: 165/4</span>
                <span class="match-vs">vs</span>
                <span>RCB: 45/2</span>
            </div>
            <div class="match-status">RCB need 121 runs from 10 balls</div>
        `;
    }
}

// Post Interaction Functions
function toggleLike(postId) {
    const post = BharatVerse.posts.find(p => p.id === postId);
    if (post) {
        post.isLiked = !post.isLiked;
        post.likes += post.isLiked ? 1 : -1;
        post.verseMeter = Math.min(100, post.verseMeter + (post.isLiked ? 1 : -1));
        
        // Create heart animation
        if (post.isLiked) {
            createHeartAnimation(event.target);
        }
        
        loadHomeFeed(); // Refresh to show updated numbers
        showToast(post.isLiked ? 'Post liked! ❤️' : 'Like removed', 'success', 1000);
    }
}

function createHeartAnimation(button) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.fontSize = '24px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    
    const rect = button.getBoundingClientRect();
    heart.style.left = rect.left + 'px';
    heart.style.top = rect.top + 'px';
    
    document.body.appendChild(heart);
    
    heart.animate([
        { transform: 'translateY(0px) scale(1)', opacity: 1 },
        { transform: 'translateY(-100px) scale(1.5)', opacity: 0 }
    ], {
        duration: 1000,
        easing: 'ease-out'
    }).addEventListener('finish', () => heart.remove());
}

function sharePost(postId) {
    const post = BharatVerse.posts.find(p => p.id === postId);
    if (post) {
        post.shares += 1;
        post.verseMeter = Math.min(100, post.verseMeter + 2);
        loadHomeFeed();
        showToast('Post shared successfully! 🔄', 'success');
    }
}

function savePost(postId) {
    const post = BharatVerse.posts.find(p => p.id === postId);
    if (post) {
        post.isSaved = !post.isSaved;
        loadHomeFeed();
        showToast(post.isSaved ? 'Post saved! 📌' : 'Post unsaved', 'success', 1000);
    }
}

function showComments(postId) {
    showToast('Comments feature coming soon! 💬', 'info');
}

function showPostMenu(postId) {
    showToast('Post menu coming soon! ⚙️', 'info');
}

// Create Post Functions
function initializeCreatePost() {
    const textarea = document.getElementById('post-content');
    const charCount = document.getElementById('char-count');
    const publishBtn = document.getElementById('publish-btn');
    
    if (textarea && charCount) {
        textarea.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count;
            
            // Update publish button state
            if (publishBtn) {
                if (count > 0) {
                    publishBtn.classList.add('active');
                } else {
                    publishBtn.classList.remove('active');
                }
            }
            
            // Change color based on character count
            if (count > 1800) {
                charCount.style.color = '#ef4444';
            } else if (count > 1600) {
                charCount.style.color = '#f59e0b';
            } else {
                charCount.style.color = 'var(--text-muted)';
            }
        });
    }
    
    // Load trending hashtags
    loadTrendingHashtags();
}

function loadTrendingHashtags() {
    const container = document.getElementById('trending-hashtags');
    if (container) {
        container.innerHTML = '';
        trendingHashtags.slice(0, 6).forEach(trend => {
            const chip = document.createElement('button');
            chip.className = 'hashtag-chip';
            chip.textContent = `#${trend.tag}`;
            chip.onclick = () => addHashtag(trend.tag);
            container.appendChild(chip);
        });
    }
}

function addHashtag(hashtag) {
    const textarea = document.getElementById('post-content');
    if (textarea) {
        const currentValue = textarea.value;
        const newValue = currentValue + (currentValue ? ' ' : '') + `#${hashtag}`;
        textarea.value = newValue;
        
        // Trigger input event to update character count
        textarea.dispatchEvent(new Event('input'));
        textarea.focus();
    }
}

function publishPost() {
    const textarea = document.getElementById('post-content');
    const content = textarea?.value.trim();
    
    if (!content) {
        showToast('Please write something for your verse!', 'error');
        return;
    }
    
    // Create new post
    const newPost = {
        id: Date.now(),
        userId: 'current_user',
        content: content,
        media: [],
        likes: 0,
        comments: 0,
        shares: 0,
        verseMeter: Math.floor(Math.random() * 20) + 10,
        timestamp: Date.now(),
        hashtags: extractHashtags(content),
        location: BharatVerse.currentUser.location,
        isLiked: false,
        isShared: false,
        isSaved: false,
        privacy: 'public'
    };
    
    // Add to posts array
    BharatVerse.posts.unshift(newPost);
    BharatVerse.currentUser.posts += 1;
    BharatVerse.currentUser.verseCoins += 10; // Earn coins for posting
    
    // Clear form
    if (textarea) {
        textarea.value = '';
        document.getElementById('char-count').textContent = '0';
    }
    
    showToast('Your verse is now live! 🚀', 'success');
    showPage('home');
}

function extractHashtags(content) {
    const hashtagRegex = /#(\w+)/g;
    const hashtags = [];
    let match;
    while ((match = hashtagRegex.exec(content)) !== null) {
        hashtags.push(match[1]);
    }
    return hashtags;
}

function selectMedia(type) {
    if (type === 'photo') {
        document.getElementById('photo-input')?.click();
    } else if (type === 'video') {
        document.getElementById('video-input')?.click();
    }
}

function handleFileUpload(event, type) {
    const file = event.target.files[0];
    if (file) {
        showToast(`${type === 'image' ? 'Photo' : 'Video'} selected! 📎`, 'success');
        // In a real app, you would upload the file here
    }
}

// Voice Recording Functions
function startVoiceRecording() {
    showModal('voice-modal');
}

function recordVoice() {
    showModal('voice-modal');
}

function showVoiceModal() {
    showModal('voice-modal');
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

function closeVoiceModal() {
    closeModal('voice-modal');
    if (BharatVerse.isVoiceRecording) {
        cancelVoiceRecording();
    }
}

function toggleVoiceRecording() {
    if (BharatVerse.isVoiceRecording) {
        stopVoiceRecording();
    } else {
        startRecording();
    }
}

function startRecording() {
    BharatVerse.isVoiceRecording = true;
    BharatVerse.voiceStartTime = Date.now();
    
    const recordBtn = document.getElementById('record-btn');
    const statusElement = document.getElementById('voice-status');
    
    if (recordBtn) {
        recordBtn.innerHTML = '<i class="fas fa-stop"></i>';
        recordBtn.style.background = '#ef4444';
    }
    
    if (statusElement) {
        statusElement.textContent = 'Recording... Tap to stop';
    }
    
    // Start timer
    BharatVerse.voiceTimer = setInterval(updateVoiceTimer, 1000);
    
    // Enable send button
    const sendBtn = document.querySelector('.voice-control-btn.send-btn');
    if (sendBtn) sendBtn.disabled = false;
    
    showToast('Voice recording started! 🎤', 'info');
}

function stopVoiceRecording() {
    BharatVerse.isVoiceRecording = false;
    clearInterval(BharatVerse.voiceTimer);
    
    const recordBtn = document.getElementById('record-btn');
    const statusElement = document.getElementById('voice-status');
    
    if (recordBtn) {
        recordBtn.innerHTML = '<i class="fas fa-circle"></i>';
        recordBtn.style.background = 'var(--accent-color)';
    }
    
    if (statusElement) {
        statusElement.textContent = 'Recording complete! Send or re-record';
    }
    
    showToast('Voice recorded! 🎵', 'success');
}

function updateVoiceTimer() {
    const elapsed = Math.floor((Date.now() - BharatVerse.voiceStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
    const seconds = (elapsed % 60).toString().padStart(2, '0');
    
    const timerElement = document.getElementById('voice-timer');
    if (timerElement) {
        timerElement.textContent = `${minutes}:${seconds}`;
    }
    
    // Auto-stop after 5 minutes
    if (elapsed >= 300) {
        stopVoiceRecording();
    }
}

function cancelVoiceRecording() {
    BharatVerse.isVoiceRecording = false;
    clearInterval(BharatVerse.voiceTimer);
    
    // Reset UI
    const timerElement = document.getElementById('voice-timer');
    const statusElement = document.getElementById('voice-status');
    const recordBtn = document.getElementById('record-btn');
    const sendBtn = document.querySelector('.voice-control-btn.send-btn');
    
    if (timerElement) timerElement.textContent = '00:00';
    if (statusElement) statusElement.textContent = 'Tap to record';
    if (recordBtn) {
        recordBtn.innerHTML = '<i class="fas fa-circle"></i>';
        recordBtn.style.background = 'var(--accent-color)';
    }
    if (sendBtn) sendBtn.disabled = true;
    
    closeModal('voice-modal');
}

function sendVoiceMessage() {
    if (BharatVerse.isVoiceRecording) {
        stopVoiceRecording();
    }
    
    showToast('Voice message sent! 🎵', 'success');
    closeModal('voice-modal');
    cancelVoiceRecording();
}

// Profile Functions
function loadUserProfile() {
    const user = BharatVerse.currentUser;
    
    // Update profile display
    const elements = {
        'profile-display-name': user.displayName,
        'profile-username-display': `@${user.username}`,
        'profile-bio-display': user.bio,
        'posts-count': formatNumber(user.posts),
        'syncing-count': formatNumber(user.following),
        'synced-count': formatNumber(user.followers),
        'profile-versecoins': formatNumber(user.verseCoins)
    };
    
    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    });
    
    // Update profile pictures
    const profilePic = document.getElementById('profile-avatar');
    if (profilePic) {
        profilePic.src = user.profilePic;
    }
    
    // Update cover photo
    const coverElement = document.getElementById('profile-cover');
    if (coverElement) {
        coverElement.style.backgroundImage = `url('${user.coverPic}')`;
    }
    
    // Load user's posts
    loadProfilePosts();
}

function loadProfilePosts() {
    const container = document.getElementById('profile-posts-grid');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Filter posts by current user
    const userPosts = BharatVerse.posts.filter(post => post.userId === 'current_user');
    
    if (userPosts.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
                <i class="fas fa-plus-circle" style="font-size: 48px; margin-bottom: 16px; opacity: 0.5;"></i>
                <h3>No posts yet</h3>
                <p>Share your first verse to get started!</p>
                <button class="btn btn-primary" onclick="showPage('create')" style="margin-top: 20px;">Create Post</button>
            </div>
        `;
        return;
    }
    
    userPosts.forEach(post => {
        const gridItem = document.createElement('div');
        gridItem.className = 'profile-post-item';
        gridItem.style.cssText = `
            aspect-ratio: 1;
            background: var(--surface-primary);
            border-radius: var(--radius-lg);
            padding: 20px;
            cursor: pointer;
            transition: var(--transition-base);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            border: 1px solid var(--border-color);
        `;
        
        if (post.media && post.media.length > 0) {
            gridItem.style.backgroundImage = `url('${post.media[0].url}')`;
            gridItem.style.backgroundSize = 'cover';
            gridItem.style.backgroundPosition = 'center';
        } else {
            gridItem.innerHTML = `
                <i class="fas fa-quote-left" style="font-size: 24px; opacity: 0.5; margin-bottom: 12px;"></i>
                <p style="font-size: 14px; line-height: 1.4; opacity: 0.8;">${post.content.substring(0, 100)}${post.content.length > 100 ? '...' : ''}</p>
                <div style="margin-top: 12px; font-size: 12px; opacity: 0.6;">
                    <span><i class="fas fa-heart"></i> ${formatNumber(post.likes)}</span>
                    <span style="margin-left: 12px;"><i class="fas fa-comment"></i> ${formatNumber(post.comments)}</span>
                </div>
            `;
        }
        
        gridItem.onclick = () => showPostDetail(post.id);
        container.appendChild(gridItem);
    });
}

function editProfile() {
    showModal('edit-profile-modal');
    
    // Populate form with current data
    const fields = {
        'edit-display-name': BharatVerse.currentUser.displayName,
        'edit-username': BharatVerse.currentUser.username,
        'edit-bio': BharatVerse.currentUser.bio,
        'edit-location': BharatVerse.currentUser.location,
        'edit-website': BharatVerse.currentUser.website
    };
    
    Object.entries(fields).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.value = value;
    });
    
    // Update avatar preview
    const avatarPreview = document.getElementById('edit-avatar-preview');
    if (avatarPreview) {
        avatarPreview.src = BharatVerse.currentUser.profilePic;
    }
    
    // Setup bio character counter
    const bioField = document.getElementById('edit-bio');
    const charCounter = document.getElementById('bio-char-count');
    if (bioField && charCounter) {
        bioField.addEventListener('input', function() {
            charCounter.textContent = this.value.length;
        });
        charCounter.textContent = bioField.value.length;
    }
}

function saveProfileChanges() {
    // Get form values
    const updates = {
        displayName: document.getElementById('edit-display-name')?.value || BharatVerse.currentUser.displayName,
        username: document.getElementById('edit-username')?.value || BharatVerse.currentUser.username,
        bio: document.getElementById('edit-bio')?.value || BharatVerse.currentUser.bio,
        location: document.getElementById('edit-location')?.value || BharatVerse.currentUser.location,
        website: document.getElementById('edit-website')?.value || BharatVerse.currentUser.website
    };
    
    // Update current user
    Object.assign(BharatVerse.currentUser, updates);
    
    // Update UI
    updateUserInterface();
    loadUserProfile();
    closeModal('edit-profile-modal');
    
    showToast('Profile updated successfully! ✨', 'success');
}

function changeAvatar() {
    document.getElementById('avatar-input')?.click();
}

function selectNewAvatar() {
    changeAvatar();
}

function handleAvatarUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            BharatVerse.currentUser.profilePic = e.target.result;
            updateUserInterface();
            
            const avatarPreview = document.getElementById('edit-avatar-preview');
            if (avatarPreview) {
                avatarPreview.src = e.target.result;
            }
            
            showToast('Profile picture updated! 📸', 'success');
        };
        reader.readAsDataURL(file);
    }
}

function switchProfileTab(tab) {
    // Update active tab
    document.querySelectorAll('.profile-tab').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const container = document.getElementById('profile-posts-grid');
    if (!container) return;
    
    switch(tab) {
        case 'posts':
            loadProfilePosts();
            break;
        case 'reels':
            container.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 60px; opacity: 0.6;">📹 Reels coming soon!</div>';
            break;
        case 'media':
            container.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 60px; opacity: 0.6;">🖼️ Media gallery coming soon!</div>';
            break;
        case 'likes':
            container.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 60px; opacity: 0.6;">❤️ Liked posts coming soon!</div>';
            break;
    }
}

// Explore Functions
function loadExploreContent() {
    loadExploreGrid();
    loadExploreFilters();
}

function loadExploreGrid() {
    const container = document.getElementById('explore-grid');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Create diverse explore content
    const exploreCategories = [
        { title: 'Cricket Fever 🏏', color: '#4A90E2', category: 'cricket' },
        { title: 'Bollywood Magic ✨', color: '#E91E63', category: 'bollywood' },
        { title: 'Tech Innovation 💻', color: '#4CAF50', category: 'tech' },
        { title: 'Music Vibes 🎵', color: '#9C27B0', category: 'music' },
        { title: 'Food Paradise 🍕', color: '#FF9800', category: 'food' },
        { title: 'Travel Stories ✈️', color: '#00BCD4', category: 'travel' },
        { title: 'Fitness Goals 💪', color: '#FF5722', category: 'fitness' },
        { title: 'Art & Culture 🎨', color: '#607D8B', category: 'art' }
    ];
    
    exploreCategories.forEach(item => {
        const exploreItem = document.createElement('div');
        exploreItem.className = 'explore-item';
        exploreItem.style.cssText = `
            aspect-ratio: 1.2;
            background: linear-gradient(45deg, ${item.color}, #ec4899);
            border-radius: var(--radius-lg);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            text-align: center;
            padding: 20px;
            cursor: pointer;
            transition: var(--transition-base);
            font-size: var(--font-size-lg);
        `;
        
        exploreItem.textContent = item.title;
        exploreItem.onclick = () => filterExplore(item.category);
        
        exploreItem.addEventListener('mouseenter', () => {
            exploreItem.style.transform = 'scale(1.05)';
        });
        
        exploreItem.addEventListener('mouseleave', () => {
            exploreItem.style.transform = 'scale(1)';
        });
        
        container.appendChild(exploreItem);
    });
}

function loadExploreFilters() {
    // Filters are already in HTML
}

function filterExplore(category) {
    // Update active filter
    document.querySelectorAll('.filter-tab').forEach(tab => tab.classList.remove('active'));
    event.target?.classList.add('active');
    
    showToast(`Exploring ${category} content! 🔍`, 'info');
    
    // In a real app, this would filter the explore grid content
}

// Message Functions
function loadMessagesList() {
    showToast('Messages feature coming soon! 💬', 'info');
}

function startNewMessage() {
    showToast('New message feature coming soon! ✉️', 'info');
}

function joinVoiceRoom() {
    showToast('Voice rooms coming soon! 🎙️', 'info');
}

// Notification Functions
function toggleNotifications() {
    const dropdown = document.getElementById('notifications-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
        if (dropdown.classList.contains('active')) {
            loadNotifications();
        }
    }
}

function loadNotifications() {
    const container = document.getElementById('notifications-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Create sample notifications
    const notifications = [
        { icon: '❤️', message: 'Rohit Sharma liked your post', time: '2m ago', user: sampleUsers[0] },
        { icon: '💬', message: 'Priya Sharma commented on your post', time: '5m ago', user: sampleUsers[1] },
        { icon: '🔄', message: 'Arjun Kapoor shared your post', time: '10m ago', user: sampleUsers[2] },
        { icon: '👤', message: 'Virat Kohli started syncing with you', time: '1h ago', user: sampleUsers[3] },
        { icon: '🎉', message: 'Your post reached 1K likes!', time: '2h ago', user: null }
    ];
    
    notifications.forEach(notif => {
        const notifEl = document.createElement('div');
        notifEl.className = 'notification-item';
        notifEl.style.cssText = `
            display: flex;
            align-items: center;
            padding: 15px 20px;
            border-bottom: 1px solid var(--border-color);
            cursor: pointer;
            transition: var(--transition-base);
        `;
        
        notifEl.innerHTML = `
            ${notif.user ? 
                `<img src="${notif.user.profilePic}" alt="${notif.user.displayName}" style="width: 40px; height: 40px; border-radius: 50%; margin-right: 12px;">` :
                `<div style="width: 40px; height: 40px; border-radius: 50%; background: var(--accent-color); display: flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 18px;">${notif.icon}</div>`
            }
            <div style="flex: 1;">
                <p style="margin-bottom: 4px;">${notif.message}</p>
                <span style="font-size: 12px; color: var(--text-muted);">${notif.time}</span>
            </div>
        `;
        
        notifEl.addEventListener('mouseenter', () => {
            notifEl.style.background = 'var(--surface-primary)';
        });
        
        notifEl.addEventListener('mouseleave', () => {
            notifEl.style.background = 'transparent';
        });
        
        container.appendChild(notifEl);
    });
}

function markAllNotificationsRead() {
    const badge = document.getElementById('notification-badge');
    if (badge) badge.textContent = '0';
    
    showToast('All notifications marked as read! ✅', 'success');
}

// Other Functions
function createStory() {
    showToast('Story creation coming soon! 📸', 'info');
}

function viewStory(userId) {
    const user = sampleUsers.find(u => u.id === userId);
    if (user) {
        showToast(`Viewing ${user.displayName}'s story! 👀`, 'info');
    }
}

function syncUser(userId) {
    const user = sampleUsers.find(u => u.id === userId);
    if (user) {
        showToast(`Now synced with ${user.displayName}! 🔄`, 'success');
        BharatVerse.currentUser.following += 1;
    }
}

function searchHashtag(hashtag) {
    showToast(`Searching for #${hashtag}... 🔍`, 'info');
}

function joinCricketRoom() {
    showToast('Joining CricketVerse room... 🏏', 'info');
}

function earnCoins() {
    showToast('Complete daily challenges to earn VerseCoins! 💰', 'info');
}

function spendCoins() {
    showToast('VerseCoins marketplace coming soon! 🛍️', 'info');
}

function startLiveStream() {
    showToast('Live streaming coming soon! 📡', 'info');
}

function addLocation() {
    showToast('Location tagging coming soon! 📍', 'info');
}

function addPoll() {
    showToast('Poll creation coming soon! 📊', 'info');
}

function schedulePost() {
    showToast('Post scheduling coming soon! ⏰', 'info');
}

function aiEnhance() {
    const textarea = document.getElementById('post-content');
    if (textarea && textarea.value.trim()) {
        showToast('AI enhancement coming soon! ✨', 'info');
    } else {
        showToast('Write some content first!', 'warning');
    }
}

function translatePost() {
    const textarea = document.getElementById('post-content');
    if (textarea && textarea.value.trim()) {
        showToast('Auto-translation coming soon! 🌐', 'info');
    } else {
        showToast('Write some content first!', 'warning');
    }
}

// Click outside to close dropdowns
document.addEventListener('click', (e) => {
    if (!e.target.closest('.notification-btn') && !e.target.closest('#notifications-dropdown')) {
        const dropdown = document.getElementById('notifications-dropdown');
        if (dropdown) dropdown.classList.remove('active');
    }
});

// Initialize App
function initializeApp() {
    // Show loading screen
    const loadingScreen = document.getElementById('loading-screen');
    
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                showPage('login');
            }, 500);
        }
    }, 2000);
    
    // Load saved preferences
    const savedTheme = localStorage.getItem('bharatverse_theme');
    const savedLanguage = localStorage.getItem('bharatverse_language');
    
    if (savedTheme) {
        BharatVerse.theme = savedTheme;
        document.body.classList.toggle('dark-theme', savedTheme === 'dark');
        const themeIcon = document.getElementById('theme-icon');
        if (themeIcon) {
            themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
    
    if (savedLanguage) {
        BharatVerse.currentLanguage = savedLanguage;
        const langIcon = document.getElementById('lang-icon');
        if (langIcon) {
            langIcon.textContent = savedLanguage === 'en' ? '🇮🇳' : '🇬🇧';
        }
        updateLanguageElements();
    }
    
    // Initialize sample data
    BharatVerse.posts = [...samplePosts];
    BharatVerse.users = [...sampleUsers];
    
    // Add event listeners
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.page) {
            showPage(e.state.page);
        }
    });
    
    // Handle hash navigation
    if (window.location.hash) {
        const page = window.location.hash.substring(1);
        if (['home', 'explore', 'create', 'messages', 'profile'].includes(page)) {
            // Auto-login for hash navigation
            setTimeout(() => {
                updateUserInterface();
                showPage(page);
            }, 2500);
        }
    }
}

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);

console.log('🚀 BharatVerse loaded successfully!');
console.log('💫 Ready to make your verse go viral!');
