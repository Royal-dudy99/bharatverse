// BharatVerse Advanced Features - Complete Implementation
let currentLanguage = 'en';
let currentUser = {
    id: 1,
    username: 'your_username',
    displayName: 'Your Name',
    bio: 'Cricket lover 🏏 | Coding addict | #TeamIndia',
    profilePic: 'https://via.placeholder.com/120/333/FFFFFF?text=You',
    location: 'Mumbai, India',
    verseCoins: 2500,
    posts: 247,
    synced: 1200,
    syncing: 890,
    isVerified: false
};

let isVoiceRecording = false;
let voiceTimer = null;
let voiceStartTime = 0;

// Sample data with more realistic content
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
    },
    {
        id: 4,
        username: "virat.kohli",
        displayName: "Virat Kohli",
        bio: "RCB | Team India | Fitness enthusiast 💪",
        profilePic: "https://via.placeholder.com/100/FF5722/FFFFFF?text=V",
        isVerified: true,
        verseCoins: 25000,
        followers: 200000,
        following: 45,
        posts: 456
    },
    {
        id: 5,
        username: "deepikapadukone",
        displayName: "Deepika Padukone", 
        bio: "Actor | Producer | Mental Health Advocate 🌟",
        profilePic: "https://via.placeholder.com/100/9C27B0/FFFFFF?text=D",
        isVerified: true,
        verseCoins: 30000,
        followers: 180000,
        following: 78,
        posts: 234
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
        hashtags: ["MumbaiIndians", "IPL2025", "CricketLove"],
        isLiked: false
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
        hashtags: ["ReactNative", "AppDevelopment", "TechJourney"],
        isLiked: false
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
        hashtags: ["ShahRukhKhan", "Bollywood", "KingKhan"],
        isLiked: true
    },
    {
        id: 4,
        userId: 4,
        content: "Training session complete! 💪 Pushing harder every day. The grind never stops. See you at the next match! #Fitness #Cricket #NeverSettle",
        image: "https://via.placeholder.com/400x250/FF5722/FFFFFF?text=Training",
        likes: 15600,
        comments: 1200,
        shares: 567,
        verseMeter: 95,
        timestamp: "1h ago",
        hashtags: ["Fitness", "Cricket", "NeverSettle"],
        isLiked: false
    },
    {
        id: 5,
        userId: 5,
        content: "Mental health is just as important as physical health. Take time for yourself, practice self-care, and remember you're not alone 💖 #MentalHealthMatters #SelfCare",
        image: "",
        likes: 9800,
        comments: 445,
        shares: 334,
        verseMeter: 88,
        timestamp: "3h ago",
        hashtags: ["MentalHealthMatters", "SelfCare"],
        isLiked: false
    }
];

const sampleChats = [
    {
        id: 1,
        userId: 1,
        name: "Rohit Sharma",
        profilePic: "https://via.placeholder.com/40/4A90E2/FFFFFF?text=R",
        lastMessage: "Great match today! 🏏",
        lastMessageTime: "2h",
        isOnline: true,
        messages: [
            { id: 1, senderId: 1, content: "Hey! Great match today! 🏏", timestamp: "10:30 AM", type: "text" },
            { id: 2, senderId: 'me', content: "Thanks! It was intense till the last ball! 💪", timestamp: "10:32 AM", type: "text" },
            { id: 3, senderId: 1, content: "Your performance was outstanding! 👏", timestamp: "10:35 AM", type: "text" },
            { id: 4, senderId: 'me', content: "Team effort! Everyone played their part 🙌", timestamp: "10:37 AM", type: "text" }
        ]
    },
    {
        id: 2,
        userId: 2,
        name: "Priya Sharma",
        profilePic: "https://via.placeholder.com/40/E91E63/FFFFFF?text=P",
        lastMessage: "Check out my new app!",
        lastMessageTime: "1d",
        isOnline: false,
        messages: [
            { id: 1, senderId: 2, content: "Hey! I just launched my new React app", timestamp: "Yesterday 3:45 PM", type: "text" },
            { id: 2, senderId: 'me', content: "That's amazing! Congratulations 🎉", timestamp: "Yesterday 4:12 PM", type: "text" },
            { id: 3, senderId: 2, content: "Thanks! Want to collaborate on the next one?", timestamp: "Yesterday 4:15 PM", type: "text" }
        ]
    },
    {
        id: 3,
        userId: 3,
        name: "Arjun Kapoor",
        profilePic: "https://via.placeholder.com/40/FF9800/FFFFFF?text=A",
        lastMessage: "🎬 New movie review is up!",
        lastMessageTime: "6h",
        isOnline: true,
        messages: [
            { id: 1, senderId: 3, content: "🎬 New movie review is up on my profile!", timestamp: "11:15 AM", type: "text" },
            { id: 2, senderId: 'me', content: "Will definitely check it out!", timestamp: "11:20 AM", type: "text" }
        ]
    }
];

// Language translations
const translations = {
    en: {
        "BharatVerse": "BharatVerse",
        "Make Your Verse Go Viral": "Make Your Verse Go Viral",
        "Login": "Login",
        "Sign Up": "Sign Up",
        "Username or Email": "Username or Email",
        "Password": "Password",
        "Login to BharatVerse": "Login to BharatVerse",
        "Join BharatVerse": "Join BharatVerse",
        "Your Story": "Your Story",
        "What's on your verse today?": "What's on your verse today?",
        "Photo": "Photo",
        "Video": "Video",
        "Voice": "Voice",
        "Location": "Location",
        "Trending in India": "Trending in India",
        "Who to Sync": "Who to Sync",
        "Sync": "Sync",
        "Messages": "Messages",
        "Search conversations...": "Search conversations...",
        "Type a message...": "Type a message...",
        "Verses": "Verses",
        "Reels": "Reels",
        "Saved": "Saved",
        "Tagged": "Tagged",
        "Synced": "Synced",
        "Syncing": "Syncing",
        "VerseCoins": "VerseCoins",
        "Cricket lover 🏏 | Coding addict | #TeamIndia": "Cricket lover 🏏 | Coding addict | #TeamIndia",
        "Mumbai, India": "Mumbai, India",
        "Explore BharatVerse": "Explore BharatVerse",
        "Search posts, people, hashtags...": "Search posts, people, hashtags...",
        "For You": "For You",
        "Cricket": "Cricket",
        "Bollywood": "Bollywood",
        "Tech": "Tech",
        "Music": "Music",
        "Food": "Food",
        "Travel": "Travel"
    },
    hi: {
        "BharatVerse": "भारतवर्स",
        "Make Your Verse Go Viral": "अपना वर्स वायरल करें",
        "Login": "लॉगिन",
        "Sign Up": "साइन अप",
        "Username or Email": "उपयोगकर्ता नाम या ईमेल",
        "Password": "पासवर्ड",
        "Login to BharatVerse": "भारतवर्स में लॉगिन करें",
        "Join BharatVerse": "भारतवर्स जॉइन करें",
        "Your Story": "आपकी स्टोरी",
        "What's on your verse today?": "आज आपके वर्स में क्या है?",
        "Photo": "फोटो",
        "Video": "वीडियो",
        "Voice": "आवाज़",
        "Location": "स्थान",
        "Trending in India": "भारत में ट्रेंडिंग",
        "Who to Sync": "किसे सिंक करें",
        "Sync": "सिंक",
        "Messages": "संदेश",
        "Search conversations...": "बातचीत खोजें...",
        "Type a message...": "संदेश लिखें...",
        "Verses": "वर्स",
        "Reels": "रील्स",
        "Saved": "सेव्ड",
        "Tagged": "टैग्ड",
        "Synced": "सिंक्ड",
        "Syncing": "सिंकिंग",
        "VerseCoins": "वर्सकॉइन",
        "Cricket lover 🏏 | Coding addict | #TeamIndia": "क्रिकेट प्रेमी 🏏 | कोडिंग के दीवाने | #टीमइंडिया",
        "Mumbai, India": "मुंबई, भारत",
        "Explore BharatVerse": "भारतवर्स एक्सप्लोर करें",
        "Search posts, people, hashtags...": "पोस्ट, लोग, हैशटैग खोजें...",
        "For You": "आपके लिए",
        "Cricket": "क्रिकेट",
        "Bollywood": "बॉलीवुड",
        "Tech": "टेक",
        "Music": "संगीत",
        "Food": "खाना",
        "Travel": "यात्रा"
    }
};

// Page Management
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show/hide navbar based on page
    const navbar = document.getElementById('main-navbar');
    if (pageId === 'login') {
        navbar.style.display = 'none';
    } else {
        navbar.style.display = 'flex';
    }
    
    // Show selected page
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Load content for specific pages
    switch(pageId) {
        case 'home':
            loadFeed();
            break;
        case 'profile':
            loadProfile();
            break;
        case 'explore':
            loadExplore();
            break;
        case 'chat':
            loadChatList();
            break;
        case 'create':
            initCreatePost();
            break;
    }
}

// Language Toggle
function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'hi' : 'en';
    const langBtn = document.getElementById('lang-text');
    langBtn.textContent = currentLanguage === 'en' ? '🇮🇳 हिन्दी' : '🇬🇧 English';
    
    updateLanguage();
}

function updateLanguage() {
    document.querySelectorAll('[data-en]').forEach(element => {
        const key = element.getAttribute('data-en');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            if (element.tagName.toLowerCase() === 'input') {
                element.placeholder = translations[currentLanguage][key];
            } else {
                element.textContent = translations[currentLanguage][key];
            }
        }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-placeholder-' + currentLanguage + ']').forEach(element => {
        const placeholder = element.getAttribute('data-placeholder-' + currentLanguage);
        if (placeholder) {
            element.placeholder = placeholder;
        }
    });
}

// Auth Functions
function showLoginForm() {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs[0].classList.add('active');
    tabs[1].classList.remove('active');
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
}

function showSignupForm() {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs[0].classList.remove('active');
    tabs[1].classList.add('active');
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
}

function login(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    // Simulate login process
    showLoadingMessage('Logging you in...');
    setTimeout(() => {
        showSuccessMessage('Welcome back to BharatVerse! 🎉');
        showPage('home');
        updateUserInterface();
    }, 1000);
}

function signup(event) {
    event.preventDefault();
    
    // Simulate signup process  
    showLoadingMessage('Creating your account...');
    setTimeout(() => {
        showSuccessMessage('Welcome to BharatVerse! Your account is ready! 🚀');
        showPage('home');
        updateUserInterface();
    }, 1000);
}

function updateUserInterface() {
    // Update current user avatar in various places
    const userAvatars = document.querySelectorAll('#current-user-avatar');
    userAvatars.forEach(avatar => {
        avatar.style.backgroundImage = `url('${currentUser.profilePic}')`;
    });
    
    // Update username displays
    const usernames = document.querySelectorAll('#current-username');
    usernames.forEach(username => {
        username.textContent = currentUser.displayName;
    });
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
                <div class="user-avatar" style="background-image: url('${user.profilePic}')" onclick="viewUserProfile(${user.id})"></div>
                <div class="post-user-info">
                    <div class="post-username">
                        ${user.displayName}
                        ${user.isVerified ? '<span class="post-verified">✓</span>' : ''}
                    </div>
                    <div class="post-time">${post.timestamp}</div>
                </div>
                <button class="post-menu-btn" onclick="showPostMenu(${post.id})">
                    <i class="fas fa-ellipsis-h"></i>
                </button>
            </div>
            <div class="post-content">${post.content}</div>
            ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image" onclick="openImageModal('${post.image}')">` : ''}
            <div class="verse-meter-container">
                <div class="verse-meter-label">
                    <span>VerseMeter: ${post.verseMeter}%</span>
                    ${post.verseMeter > 80 ? '🔥' : post.verseMeter > 60 ? '📈' : '💫'}
                </div>
                <div class="verse-meter">
                    <div class="verse-meter-fill" style="width: ${post.verseMeter}%"></div>
                </div>
            </div>
            <div class="post-actions">
                <button class="post-action ${post.isLiked ? 'liked' : ''}" onclick="likePost(${post.id})">
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
        if (post.isLiked) {
            post.likes -= 1;
            post.isLiked = false;
        } else {
            post.likes += 1;
            post.isLiked = true;
            
            // Visual feedback
            createLikeAnimation(event.target);
        }
        
        // Update VerseMeter based on engagement
        post.verseMeter = Math.min(100, post.verseMeter + 1);
        
        loadFeed(); // Reload to show updated likes
    }
}

function createLikeAnimation(element) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.fontSize = '24px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    
    const rect = element.getBoundingClientRect();
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

function commentPost(postId) {
    showInfoMessage('💬 Comment feature coming soon!');
}

function sharePost(postId) {
    const post = samplePosts.find(p => p.id === postId);
    if (post) {
        post.shares += 1;
        post.verseMeter = Math.min(100, post.verseMeter + 2);
        showSuccessMessage('Post shared to your Verse! 🔄');
        loadFeed();
    }
}

function savePost(postId) {
    showSuccessMessage('Post saved to your collection! 📌');
}

function viewUserProfile(userId) {
    const user = sampleUsers.find(u => u.id === userId);
    if (user) {
        showInfoMessage(`Viewing ${user.displayName}'s profile`);
    }
}

// Create Post Functions
function initCreatePost() {
    const textarea = document.querySelector('.post-textarea');
    const charCount = document.getElementById('char-count');
    
    if (textarea && charCount) {
        textarea.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count;
            
            // Change color based on character count
            if (count > 450) {
                charCount.style.color = '#ef4444';
            } else if (count > 400) {
                charCount.style.color = '#f59e0b';
            } else {
                charCount.style.color = 'rgba(255,255,255,0.6)';
            }
        });
    }
}

function publishPost() {
    const textarea = document.querySelector('.post-textarea');
    const content = textarea.value.trim();
    
    if (!content) {
        showErrorMessage('Please write something for your verse!');
        return;
    }
    
    // Simulate post creation
    const newPost = {
        id: samplePosts.length + 1,
        userId: currentUser.id,
        content: content,
        image: "", // Could be set if image was uploaded
        likes: 0,
        comments: 0,
        shares: 0,
        verseMeter: Math.floor(Math.random() * 20) + 10, // Random starting meter
        timestamp: "now",
        hashtags: extractHashtags(content),
        isLiked: false
    };
    
    samplePosts.unshift(newPost); // Add to beginning of array
    currentUser.posts += 1;
    
    showSuccessMessage('Your verse is now live! 🚀');
    textarea.value = '';
    document.getElementById('char-count').textContent = '0';
    
    showPage('home');
}

function extractHashtags(content) {
    const hashtagRegex = /#\w+/g;
    return content.match(hashtagRegex) || [];
}

function selectPhoto() {
    document.getElementById('photo-input').click();
}

function selectVideo() {
    document.getElementById('video-input').click();
}

function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            showMediaPreview(e.target.result, 'image');
        };
        reader.readAsDataURL(file);
    }
}

function handleVideoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            showMediaPreview(e.target.result, 'video');
        };
        reader.readAsDataURL(file);
    }
}

function showMediaPreview(src, type) {
    const preview = document.getElementById('media-preview');
    if (type === 'image') {
        preview.innerHTML = `
            <div class="media-item">
                <img src="${src}" alt="Preview" style="max-width: 100%; border-radius: 10px;">
                <button class="remove-media" onclick="removeMediaPreview()">×</button>
            </div>
        `;
    } else if (type === 'video') {
        preview.innerHTML = `
            <div class="media-item">
                <video src="${src}" controls style="max-width: 100%; border-radius: 10px;"></video>
                <button class="remove-media" onclick="removeMediaPreview()">×</button>
            </div>
        `;
    }
}

function removeMediaPreview() {
    document.getElementById('media-preview').innerHTML = '';
}

function addHashtag(hashtag) {
    const textarea = document.querySelector('.post-textarea');
    textarea.value += ` #${hashtag}`;
    textarea.focus();
    
    // Update character count
    const event = new Event('input');
    textarea.dispatchEvent(event);
}

function addLocation() {
    showInfoMessage('📍 Location feature coming soon!');
}

function addPoll() {
    showInfoMessage('📊 Poll feature coming soon!');
}

// Voice Recording Functions
function startVoiceRecording() {
    showVoiceModal();
}

function recordVoice() {
    showVoiceModal();
}

function showVoiceModal() {
    document.getElementById('voice-modal').classList.add('active');
}

function toggleVoiceRecording() {
    const recordBtn = document.getElementById('voice-record-toggle');
    const animation = document.getElementById('voice-animation');
    
    if (isVoiceRecording) {
        // Stop recording
        isVoiceRecording = false;
        clearInterval(voiceTimer);
        recordBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        animation.classList.remove('recording');
        showSuccessMessage('Voice recorded! 🎤');
    } else {
        // Start recording
        isVoiceRecording = true;
        voiceStartTime = Date.now();
        recordBtn.innerHTML = '<i class="fas fa-stop"></i>';
        animation.classList.add('recording');
        
        voiceTimer = setInterval(updateVoiceTimer, 1000);
        showInfoMessage('Recording started... 🎤');
    }
}

function updateVoiceTimer() {
    const elapsed = Math.floor((Date.now() - voiceStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
    const seconds = (elapsed % 60).toString().padStart(2, '0');
    
    const timerElement = document.getElementById('voice-timer');
    if (timerElement) {
        timerElement.textContent = `${minutes}:${seconds}`;
    }
    
    // Auto-stop after 5 minutes
    if (elapsed >= 300) {
        toggleVoiceRecording();
    }
}

function cancelVoiceRecording() {
    isVoiceRecording = false;
    clearInterval(voiceTimer);
    document.getElementById('voice-modal').classList.remove('active');
    document.getElementById('voice-timer').textContent = '00:00';
}

function sendVoiceMessage() {
    if (isVoiceRecording) {
        toggleVoiceRecording();
    }
    
    showSuccessMessage('Voice message sent! 🎵');
    document.getElementById('voice-modal').classList.remove('active');
    document.getElementById('voice-timer').textContent = '00:00';
}

// Chat Functions
function loadChatList() {
    const chatList = document.getElementById('chat-list');
    if (!chatList) return;
    
    chatList.innerHTML = '';
    
    sampleChats.forEach(chat => {
        const chatItem = document.createElement('div');
        chatItem.className = 'chat-item';
        chatItem.onclick = () => openChat(chat.id);
        
        chatItem.innerHTML = `
            <div class="user-avatar" style="background-image: url('${chat.profilePic}')"></div>
            <div class="chat-info">
                <div class="chat-name">${chat.name}</div>
                <div class="chat-last-message">${chat.lastMessage}</div>
            </div>
            <div class="chat-time">${chat.lastMessageTime}</div>
        `;
        
        chatList.appendChild(chatItem);
    });
    
    // Auto-open first chat if available
    if (sampleChats.length > 0) {
        setTimeout(() => openChat(sampleChats[0].id), 100);
    }
}

function openChat(chatId) {
    const chat = sampleChats.find(c => c.id === chatId);
    if (!chat) return;
    
    // Update active chat item
    document.querySelectorAll('.chat-item').forEach(item => item.classList.remove('active'));
    event.target.closest('.chat-item').classList.add('active');
    
    // Update chat header
    const chatHeader = document.getElementById('chat-header');
    chatHeader.innerHTML = `
        <div class="user-avatar" style="background-image: url('${chat.profilePic}')"></div>
        <div class="chat-user-info">
            <div class="chat-name">${chat.name}</div>
            <div class="chat-status">${chat.isOnline ? 'Online' : 'Offline'}</div>
        </div>
        <div class="chat-actions">
            <button class="chat-action-btn" onclick="startVoiceCall(${chatId})">
                <i class="fas fa-phone"></i>
            </button>
            <button class="chat-action-btn" onclick="startVideoCall(${chatId})">
                <i class="fas fa-video"></i>
            </button>
        </div>
    `;
    
    // Load messages
    loadChatMessages(chat.messages);
}

function loadChatMessages(messages) {
    const messagesContainer = document.getElementById('chat-messages');
    if (!messagesContainer) return;
    
    messagesContainer.innerHTML = '';
    
    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.senderId === 'me' ? 'sent' : 'received'}`;
        messageElement.innerHTML = `
            <div class="message-content">${message.content}</div>
            <div class="message-time">${message.timestamp}</div>
        `;
        messagesContainer.appendChild(messageElement);
    });
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function handleMessageKeypress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

function sendMessage(messageText) {
    const input = document.getElementById('message-input');
    const message = messageText || input.value.trim();
    
    if (!message) return;
    
    const messagesContainer = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.className = 'message sent';
    messageElement.innerHTML = `
        <div class="message-content">${message}</div>
        <div class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
    `;
    
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    if (input) input.value = '';
    
    // Simulate reply after 2 seconds
    setTimeout(() => {
        const replies = [
            "That's awesome! 🔥",
            "Interesting point! 🤔",
            "I completely agree! 👍",
            "Let me think about that 💭",
            "Thanks for sharing! 😊",
            "That made my day! 😄"
        ];
        
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        const replyElement = document.createElement('div');
        replyElement.className = 'message received';
        replyElement.innerHTML = `
            <div class="message-content">${randomReply}</div>
            <div class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
        `;
        messagesContainer.appendChild(replyElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 2000);
}

function startNewChat() {
    showInfoMessage('Start new chat feature coming soon! 💬');
}

function attachFile() {
    showInfoMessage('File attachment coming soon! 📎');
}

function selectEmoji() {
    showInfoMessage('Emoji picker coming soon! 😊');
}

function startVoiceCall(chatId) {
    showInfoMessage('📞 Voice call feature coming soon!');
}

function startVideoCall(chatId) {
    showInfoMessage('📹 Video call feature coming soon!');
}

// Profile Functions
function loadProfile() {
    updateProfileDisplay();
    loadProfilePosts();
}

function updateProfileDisplay() {
    // Update all profile information
    document.getElementById('profile-name').textContent = currentUser.displayName;
    document.getElementById('profile-username').textContent = `@${currentUser.username}`;
    document.getElementById('profile-bio').textContent = currentUser.bio;
    document.getElementById('profile-location').textContent = currentUser.location;
    
    // Update stats
    document.getElementById('user-posts-count').textContent = formatNumber(currentUser.posts);
    document.getElementById('user-synced-count').textContent = formatNumber(currentUser.synced);
    document.getElementById('user-syncing-count').textContent = formatNumber(currentUser.syncing);
    document.getElementById('user-versecoins').textContent = formatNumber(currentUser.verseCoins);
    
    // Update avatars
    const avatars = document.querySelectorAll('#profile-avatar');
    avatars.forEach(avatar => {
        avatar.style.backgroundImage = `url('${currentUser.profilePic}')`;
    });
}

function loadProfilePosts() {
    const postGrid = document.getElementById('profile-posts-grid');
    if (!postGrid) return;
    
    postGrid.innerHTML = '';
    
    // Filter posts by current user
    const userPosts = samplePosts.filter(post => post.userId === currentUser.id);
    
    userPosts.forEach(post => {
        const gridPost = document.createElement('div');
        gridPost.className = 'grid-post';
        gridPost.onclick = () => showPostDetail(post.id);
        
        if (post.image) {
            gridPost.innerHTML = `<img src="${post.image}" alt="Post" style="width: 100%; height: 100%; object-fit: cover; border-radius: 15px;">`;
        } else {
            gridPost.innerHTML = `
                <div style="padding: 20px; text-align: center;">
                    <i class="fas fa-quote-left" style="font-size: 24px; opacity: 0.5; margin-bottom: 10px;"></i>
                    <p style="font-size: 14px; line-height: 1.4;">${post.content.substring(0, 100)}${post.content.length > 100 ? '...' : ''}</p>
                </div>
            `;
        }
        
        postGrid.appendChild(gridPost);
    });
    
    // Add placeholder posts if not enough
    for (let i = userPosts.length; i < 12; i++) {
        const gridPost = document.createElement('div');
        gridPost.className = 'grid-post';
        gridPost.innerHTML = `<i class="fas fa-plus" style="font-size: 24px; opacity: 0.3;"></i>`;
        gridPost.onclick = () => showPage('create');
        postGrid.appendChild(gridPost);
    }
}

function editProfile() {
    document.getElementById('edit-profile-modal').classList.add('active');
    
    // Populate form with current data
    document.getElementById('edit-name').value = currentUser.displayName;
    document.getElementById('edit-username').value = currentUser.username;
    document.getElementById('edit-bio').value = currentUser.bio;
    document.getElementById('edit-location').value = currentUser.location;
    
    // Setup bio character counter
    const bioTextarea = document.getElementById('edit-bio');
    const charCount = document.getElementById('bio-char-count');
    
    bioTextarea.addEventListener('input', function() {
        charCount.textContent = this.value.length;
    });
    
    charCount.textContent = bioTextarea.value.length;
}

function closeEditProfile() {
    document.getElementById('edit-profile-modal').classList.remove('active');
}

function saveProfile() {
    // Update currentUser object
    currentUser.displayName = document.getElementById('edit-name').value;
    currentUser.username = document.getElementById('edit-username').value;
    currentUser.bio = document.getElementById('edit-bio').value;
    currentUser.location = document.getElementById('edit-location').value;
    
    updateProfileDisplay();
    updateUserInterface();
    closeEditProfile();
    
    showSuccessMessage('Profile updated successfully! ✨');
}

function changeProfilePicture() {
    // In a real app, this would open a file picker
    const colors = ['#4A90E2', '#E91E63', '#FF9800', '#4CAF50', '#9C27B0', '#FF5722'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const initials = currentUser.displayName.split(' ').map(n => n[0]).join('').toUpperCase();
    
    currentUser.profilePic = `https://via.placeholder.com/120/${randomColor.slice(1)}/FFFFFF?text=${initials}`;
    updateProfileDisplay();
    updateUserInterface();
    
    showSuccessMessage('Profile picture updated! 📸');
}

function showProfileTab(tab) {
    // Update active tab
    document.querySelectorAll('.profile-tabs .tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const postGrid = document.getElementById('profile-posts-grid');
    
    switch(tab) {
        case 'posts':
            loadProfilePosts();
            break;
        case 'reels':
            postGrid.innerHTML = '<div style="text-align: center; padding: 50px; opacity: 0.6;">📹 Reels coming soon!</div>';
            break;
        case 'saved':
            postGrid.innerHTML = '<div style="text-align: center; padding: 50px; opacity: 0.6;">📌 Saved posts coming soon!</div>';
            break;
        case 'tagged':
            postGrid.innerHTML = '<div style="text-align: center; padding: 50px; opacity: 0.6;">🏷️ Tagged posts coming soon!</div>';
            break;
    }
}

function showStatModal(stat) {
    let message = '';
    switch(stat) {
        case 'posts':
            message = `You have ${formatNumber(currentUser.posts)} verses! Keep creating! ✍️`;
            break;
        case 'synced':
            message = `${formatNumber(currentUser.synced)} people are synced with you! 👥`;
            break;
        case 'syncing':
            message = `You're syncing with ${formatNumber(currentUser.syncing)} amazing people! 🌟`;
            break;
    }
    showInfoMessage(message);
}

function showVerseCoinsModal() {
    showInfoMessage(`You have ${formatNumber(currentUser.verseCoins)} VerseCoins! 💰 Use them to boost posts, buy exclusive content, and tip creators!`);
}

// Explore Functions
function loadExplore() {
    loadExploreGrid();
}

function loadExploreGrid() {
    const exploreGrid = document.getElementById('explore-grid');
    if (!exploreGrid) return;
    
    exploreGrid.innerHTML = '';
    
    // Create diverse explore content
    const exploreContent = [
        { type: 'cricket', title: 'Cricket Fever 🏏', color: '#4A90E2' },
        { type: 'bollywood', title: 'Bollywood Magic ✨', color: '#E91E63' },
        { type: 'tech', title: 'Tech Innovation 💻', color: '#4CAF50' },
        { type: 'music', title: 'Music Vibes 🎵', color: '#9C27B0' },
        { type: 'food', title: 'Foodie Paradise 🍕', color: '#FF9800' },
        { type: 'travel', title: 'Travel Stories ✈️', color: '#00BCD4' }
    ];
    
    exploreContent.forEach(item => {
        const exploreItem = document.createElement('div');
        exploreItem.className = 'explore-item';
        exploreItem.onclick = () => filterExplore(item.type);
        
        exploreItem.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: linear-gradient(45deg, ${item.color}, #ec4899); color: white; font-weight: bold; text-align: center; padding: 20px;">
                ${item.title}
            </div>
        `;
        
        exploreGrid.appendChild(exploreItem);
    });
}

function filterExplore(category) {
    // Update active category button
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    showInfoMessage(`Exploring ${category} content! 🔍`);
}

// Notification Functions
function toggleNotifications() {
    const dropdown = document.getElementById('notifications-dropdown');
    dropdown.classList.toggle('active');
}

function markAllRead() {
    document.getElementById('notification-count').textContent = '0';
    showSuccessMessage('All notifications marked as read! ✅');
}

// Search Functions
function searchHashtag(hashtag) {
    showInfoMessage(`Searching for ${hashtag}... 🔍`);
}

function syncUser(username) {
    showSuccessMessage(`Now synced with @${username}! 🔄`);
}

// Story Functions
function showCreateStory() {
    showInfoMessage('📸 Story creation coming soon!');
}

function viewStory(userId) {
    const user = sampleUsers.find(u => u.id === userId);
    if (user) {
        showInfoMessage(`Viewing ${user.displayName}'s story! 👀`);
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

function showSuccessMessage(message) {
    showToast(message, 'success');
}

function showErrorMessage(message) {
    showToast(message, 'error');
}

function showInfoMessage(message) {
    showToast(message, 'info');
}

function showLoadingMessage(message) {
    showToast(message, 'loading');
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️',
        loading: '⏳'
    };
    
    toast.innerHTML = `
        <span class="toast-icon">${icons[type]}</span>
        <span class="toast-message">${message}</span>
    `;
    
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0,0,0,0.9);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        backdrop-filter: blur(10px);
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Location sharing
function shareLocation() {
    showInfoMessage('📍 Location sharing coming soon!');
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Start with login page
    showPage('login');
    
    // Add startup animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Add scroll effects to navbar
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('main-navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.notification-btn')) {
            document.getElementById('notifications-dropdown').classList.remove('active');
        }
    });
    
    // Add CSS for toast animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .toast {
            font-family: 'Inter', sans-serif;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .toast-success { border-left: 4px solid #10b981; }
        .toast-error { border-left: 4px solid #ef4444; }
        .toast-info { border-left: 4px solid #3b82f6; }
        .toast-loading { border-left: 4px solid #f59e0b; }
    `;
    document.head.appendChild(style);
});

console.log('🚀 BharatVerse fully loaded!');
console.log('💫 Ready to make your verse go viral!');
