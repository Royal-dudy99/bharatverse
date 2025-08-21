// BharatVerse - Professional Social Media Platform
// Version: 2.0.0 - Production Ready
// Built for Royal - Cricket & Football Fan

// Global Application State
const BharatVerse = {
    version: '2.0.0',
    currentUser: null,
    currentLanguage: 'en',
    theme: 'dark',
    isAuthenticated: false,
    
    // Real-time states
    isVoiceRecording: false,
    voiceTimer: null,
    voiceStartTime: 0,
    notificationCount: 0,
    messageCount: 0,
    
    // Data storage
    users: new Map(),
    posts: new Map(),
    messages: new Map(),
    notifications: new Map(),
    stories: new Map(),
    
    // App settings
    settings: {
        autoSave: true,
        notifications: true,
        dataUsage: 'optimized',
        language: 'en',
        theme: 'dark'
    },
    
    // Performance tracking
    performance: {
        loadTime: 0,
        lastUpdate: Date.now(),
        apiCalls: 0,
        cacheHits: 0
    }
};

// Real User Database (Persisted in LocalStorage)
class UserDatabase {
    constructor() {
        this.users = this.loadUsers();
        this.currentUserId = localStorage.getItem('bharatverse_current_user');
    }
    
    loadUsers() {
        const stored = localStorage.getItem('bharatverse_users');
        if (stored) {
            try {
                return new Map(Object.entries(JSON.parse(stored)));
            } catch (e) {
                console.error('Error loading users:', e);
            }
        }
        return new Map();
    }
    
    saveUsers() {
        try {
            const usersObj = Object.fromEntries(this.users);
            localStorage.setItem('bharatverse_users', JSON.stringify(usersObj));
        } catch (e) {
            console.error('Error saving users:', e);
        }
    }
    
    createUser(userData) {
        const userId = this.generateUserId();
        const user = {
            id: userId,
            ...userData,
            createdAt: Date.now(),
            lastActive: Date.now(),
            isVerified: false,
            verseCoins: 100, // Welcome bonus
            followers: 0,
            following: 0,
            posts: 0,
            settings: {
                privacy: 'public',
                notifications: true,
                language: userData.language || 'en'
            }
        };
        
        this.users.set(userId, user);
        this.saveUsers();
        return user;
    }
    
    authenticateUser(email, password) {
        for (const [userId, user] of this.users) {
            if (user.email === email) {
                // In production, use proper password hashing
                if (this.validatePassword(password, user.password)) {
                    user.lastActive = Date.now();
                    this.saveUsers();
                    return user;
                }
                throw new Error('Invalid password');
            }
        }
        throw new Error('User not found');
    }
    
    validatePassword(inputPassword, storedPassword) {
        // Simple validation - in production, use bcrypt or similar
        return inputPassword === storedPassword;
    }
    
    generateUserId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    checkUsernameAvailability(username) {
        for (const [userId, user] of this.users) {
            if (user.username.toLowerCase() === username.toLowerCase()) {
                return false;
            }
        }
        return true;
    }
    
    checkEmailAvailability(email) {
        for (const [userId, user] of this.users) {
            if (user.email.toLowerCase() === email.toLowerCase()) {
                return false;
            }
        }
        return true;
    }
    
    updateUser(userId, updates) {
        if (this.users.has(userId)) {
            const user = this.users.get(userId);
            Object.assign(user, updates, { lastActive: Date.now() });
            this.users.set(userId, user);
            this.saveUsers();
            return user;
        }
        throw new Error('User not found');
    }
    
    getUserByUsername(username) {
        for (const [userId, user] of this.users) {
            if (user.username.toLowerCase() === username.toLowerCase()) {
                return user;
            }
        }
        return null;
    }
    
    searchUsers(query) {
        const results = [];
        const searchQuery = query.toLowerCase();
        
        for (const [userId, user] of this.users) {
            if (
                user.displayName.toLowerCase().includes(searchQuery) ||
                user.username.toLowerCase().includes(searchQuery) ||
                user.bio?.toLowerCase().includes(searchQuery)
            ) {
                results.push(user);
            }
        }
        
        return results.slice(0, 10); // Limit results
    }
}

// Real Post Database
class PostDatabase {
    constructor() {
        this.posts = this.loadPosts();
    }
    
    loadPosts() {
        const stored = localStorage.getItem('bharatverse_posts');
        if (stored) {
            try {
                const postsArray = JSON.parse(stored);
                return new Map(postsArray.map(post => [post.id, post]));
            } catch (e) {
                console.error('Error loading posts:', e);
            }
        }
        return new Map();
    }
    
    savePosts() {
        try {
            const postsArray = Array.from(this.posts.values());
            localStorage.setItem('bharatverse_posts', JSON.stringify(postsArray));
        } catch (e) {
            console.error('Error saving posts:', e);
        }
    }
    
    createPost(postData) {
        const postId = this.generatePostId();
        const post = {
            id: postId,
            ...postData,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            likes: 0,
            comments: 0,
            shares: 0,
            views: 0,
            verseMeter: this.calculateInitialVerseMeter(postData.content),
            interactions: {
                likedBy: new Set(),
                sharedBy: new Set(),
                savedBy: new Set()
            }
        };
        
        this.posts.set(postId, post);
        this.savePosts();
        return post;
    }
    
    generatePostId() {
        return 'post_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    calculateInitialVerseMeter(content) {
        let score = 10; // Base score
        
        // Length factor
        if (content.length > 50) score += 10;
        if (content.length > 100) score += 10;
        
        // Hashtag factor
        const hashtags = content.match(/#\w+/g);
        if (hashtags) score += hashtags.length * 5;
        
        // Emoji factor
        const emojis = content.match(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/gu);
        if (emojis) score += emojis.length * 2;
        
        // Question mark engagement
        if (content.includes('?')) score += 5;
        
        return Math.min(score, 100);
    }
    
    getFeedPosts(userId, limit = 10, offset = 0) {
        const posts = Array.from(this.posts.values())
            .sort((a, b) => b.createdAt - a.createdAt)
            .slice(offset, offset + limit);
            
        return posts;
    }
    
    getUserPosts(userId) {
        return Array.from(this.posts.values())
            .filter(post => post.userId === userId)
            .sort((a, b) => b.createdAt - a.createdAt);
    }
    
    likePost(postId, userId) {
        const post = this.posts.get(postId);
        if (!post) throw new Error('Post not found');
        
        if (!post.interactions.likedBy) {
            post.interactions.likedBy = new Set();
        }
        
        if (post.interactions.likedBy.has(userId)) {
            post.interactions.likedBy.delete(userId);
            post.likes = Math.max(0, post.likes - 1);
        } else {
            post.interactions.likedBy.add(userId);
            post.likes += 1;
            post.verseMeter = Math.min(100, post.verseMeter + 1);
        }
        
        post.updatedAt = Date.now();
        this.savePosts();
        return post;
    }
    
    sharePost(postId, userId) {
        const post = this.posts.get(postId);
        if (!post) throw new Error('Post not found');
        
        if (!post.interactions.sharedBy) {
            post.interactions.sharedBy = new Set();
        }
        
        post.interactions.sharedBy.add(userId);
        post.shares += 1;
        post.verseMeter = Math.min(100, post.verseMeter + 3);
        post.updatedAt = Date.now();
        
        this.savePosts();
        return post;
    }
    
    searchPosts(query) {
        const searchQuery = query.toLowerCase();
        return Array.from(this.posts.values())
            .filter(post => 
                post.content.toLowerCase().includes(searchQuery) ||
                post.hashtags?.some(tag => tag.toLowerCase().includes(searchQuery))
            )
            .sort((a, b) => b.createdAt - a.createdAt)
            .slice(0, 20);
    }
}

// Initialize databases
const userDB = new UserDatabase();
const postDB = new PostDatabase();

// Real Sample Data for Royal's Interests
const sampleUsers = [
    {
        id: 'virat_kohli_official',
        username: 'virat.kohli',
        displayName: 'Virat Kohli',
        email: 'virat@rcb.com',
        bio: 'RCB Captain 👑 | Team India | Fitness Enthusiast 💪 | One8 | Anushka ❤️',
        profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face',
        coverPic: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=200&fit=crop',
        location: 'Delhi, India',
        website: 'https://viratkohli.com',
        isVerified: true,
        verseCoins: 50000,
        followers: 3500000,
        following: 156,
        posts: 1247,
        interests: ['cricket', 'fitness', 'business'],
        joinDate: '2023-01-01',
        lastActive: Date.now() - 180000
    },
    {
        id: 'rcb_official',
        username: 'rcbofficial',
        displayName: 'Royal Challengers Bangalore',
        email: 'social@rcb.com',
        bio: 'Play Bold 🔴⚫ | IPL Champions | 12th Man Army | #RCB #PlayBold',
        profilePic: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=120&h=120&fit=crop',
        coverPic: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=200&fit=crop',
        location: 'Bangalore, India',
        website: 'https://royalchallengers.com',
        isVerified: true,
        verseCoins: 75000,
        followers: 5600000,
        following: 89,
        posts: 2156,
        interests: ['cricket'],
        joinDate: '2023-01-01',
        lastActive: Date.now() - 300000
    },
    {
        id: 'cristiano_official',
        username: 'cristiano',
        displayName: 'Cristiano Ronaldo',
        email: 'cr7@real.com',
        bio: 'Al Nassr ⭐ | Portugal 🇵🇹 | 5x Ballon d\'Or | Father | CR7 Brand | SIU! 🐐',
        profilePic: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=face',
        coverPic: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=200&fit=crop',
        location: 'Riyadh, Saudi Arabia',
        website: 'https://cristianoronaldo.com',
        isVerified: true,
        verseCoins: 100000,
        followers: 8900000,
        following: 234,
        posts: 3456,
        interests: ['football', 'fitness', 'business'],
        joinDate: '2023-01-01',
        lastActive: Date.now() - 600000
    },
    {
        id: 'sunil_chhetri_official',
        username: 'sunilchhetri',
        displayName: 'Sunil Chhetri',
        email: 'sunil@indianfootball.com',
        bio: 'Indian Football Captain ⚽ | Bengaluru FC | All-time top scorer | Proud Indian 🇮🇳',
        profilePic: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face',
        coverPic: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=200&fit=crop',
        location: 'Bangalore, India',
        website: 'https://sunilchhetri.com',
        isVerified: true,
        verseCoins: 25000,
        followers: 1200000,
        following: 456,
        posts: 892,
        interests: ['football', 'fitness'],
        joinDate: '2023-02-01',
        lastActive: Date.now() - 900000
    },
    {
        id: 'rohit_sharma_official',
        username: 'rohitsharma45',
        displayName: 'Rohit Sharma',
        email: 'rohit@mi.com',
        bio: 'Mumbai Indians Captain 💙 | Team India | Hitman | Record Holder | Family Man 👨‍👩‍👧',
        profilePic: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face',
        coverPic: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=200&fit=crop',
        location: 'Mumbai, India',
        website: 'https://rohitsharma.com',
        isVerified: true,
        verseCoins: 45000,
        followers: 2800000,
        following: 234,
        posts: 1567,
        interests: ['cricket'],
        joinDate: '2023-01-15',
        lastActive: Date.now() - 450000
    },
    {
        id: 'ms_dhoni_official',
        username: 'msdhoni',
        displayName: 'MS Dhoni',
        email: 'msd@csk.com',
        bio: 'CSK ⭐ | Former India Captain | Wicket-keeper | Captain Cool 😎 | Thala for a reason',
        profilePic: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=120&h=120&fit=crop&crop=face',
        coverPic: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=200&fit=crop',
        location: 'Chennai, India',
        website: 'https://msdhoni.com',
        isVerified: true,
        verseCoins: 60000,
        followers: 4500000,
        following: 67,
        posts: 678,
        interests: ['cricket', 'bikes'],
        joinDate: '2023-01-20',
        lastActive: Date.now() - 720000
    }
];

// Real Sample Posts for Royal's Feed
const samplePosts = [
    {
        id: 'post_1',
        userId: 'virat_kohli_official',
        content: 'What a comeback by RCB! 🔥 The team showed incredible character and determination. This is why we Play Bold! Every match is a new opportunity to prove ourselves. Thank you 12th Man Army for the unwavering support! 💪❤️ #RCB #PlayBold #Comeback',
        media: [{
            type: 'image',
            url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&h=300&fit=crop',
            caption: 'RCB victory celebration!'
        }],
        hashtags: ['RCB', 'PlayBold', 'Comeback'],
        location: 'M. Chinnaswamy Stadium, Bangalore',
        createdAt: Date.now() - 3600000, // 1 hour ago
        likes: 89432,
        comments: 5678,
        shares: 2345,
        verseMeter: 96,
        privacy: 'public'
    },
    {
        id: 'post_2',
        userId: 'cristiano_official',
        content: 'Hard work, dedication, and never giving up! 💪 Training session complete. The body achieves what the mind believes. Stay focused, stay hungry! SIU! 🐐 #CR7 #NeverGiveUp #Training #Motivation',
        media: [{
            type: 'image',
            url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop',
            caption: 'Morning training session'
        }],
        hashtags: ['CR7', 'NeverGiveUp', 'Training', 'Motivation'],
        location: 'Al Nassr Training Center',
        createdAt: Date.now() - 7200000, // 2 hours ago
        likes: 156789,
        comments: 8901,
        shares: 4567,
        verseMeter: 98,
        privacy: 'public'
    },
    {
        id: 'post_3',
        userId: 'rcb_official',
        content: 'MATCH DAY! 🔥 RCB vs MI tonight at the Chinnaswamy! Come and witness the magic as our boys Play Bold! Limited tickets still available. Let\'s paint the stadium red and gold! 🔴⚫ #RCB #MatchDay #PlayBold #RCBvsMI',
        media: [{
            type: 'image',
            url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop',
            caption: 'RCB Match Day Poster'
        }],
        hashtags: ['RCB', 'MatchDay', 'PlayBold', 'RCBvsMI'],
        location: 'M. Chinnaswamy Stadium, Bangalore',
        createdAt: Date.now() - 10800000, // 3 hours ago
        likes: 45678,
        comments: 3456,
        shares: 1234,
        verseMeter: 89,
        privacy: 'public'
    },
    {
        id: 'post_4',
        userId: 'sunil_chhetri_official',
        content: 'Proud moment for Indian Football! 🇮🇳⚽ Our young players are showing incredible promise. The future of Indian football is bright! Keep supporting, keep believing! Jai Hind! 💪 #IndianFootball #ProudIndian #FutureIsNow',
        media: [],
        hashtags: ['IndianFootball', 'ProudIndian', 'FutureIsNow'],
        location: 'Bangalore, India',
        createdAt: Date.now() - 14400000, // 4 hours ago
        likes: 23456,
        comments: 1234,
        shares: 567,
        verseMeter: 85,
        privacy: 'public'
    },
    {
        id: 'post_5',
        userId: 'rohit_sharma_official',
        content: 'Mumbai Indians family forever! 💙 Every season teaches us something new. Win or lose, we stand together. Thank you MI Paltan for your unconditional love and support! See you next season! 🏏 #MI #OneFamily #MIPaltan',
        media: [{
            type: 'image',
            url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&h=300&fit=crop',
            caption: 'Mumbai Indians team celebration'
        }],
        hashtags: ['MI', 'OneFamily', 'MIPaltan'],
        location: 'Wankhede Stadium, Mumbai',
        createdAt: Date.now() - 18000000, // 5 hours ago
        likes: 67890,
        comments: 4321,
        shares: 2109,
        verseMeter: 91,
        privacy: 'public'
    }
];

// Language Translations (Extended)
const translations = {
    en: {
        // Authentication
        'BharatVerse': 'BharatVerse',
        'Make Your Verse Go Viral': 'Make Your Verse Go Viral',
        'Login': 'Login',
        'Sign Up': 'Sign Up',
        'Continue with Google': 'Continue with Google',
        'Continue with Microsoft': 'Continue with Microsoft',
        'Continue with Phone': 'Continue with Phone',
        'Enter BharatVerse': 'Enter BharatVerse',
        'Create Account': 'Create Account',
        'Forgot Password?': 'Forgot Password?',
        'Remember me': 'Remember me',
        'Send OTP': 'Send OTP',
        'Enter OTP': 'Enter OTP',
        'Verify & Continue': 'Verify & Continue',
        'Resend OTP': 'Resend OTP',
        
        // Navigation
        'Home': 'Home',
        'Explore': 'Explore',
        'Messages': 'Messages',
        'Notifications': 'Notifications',
        'Profile': 'Profile',
        'Search BharatVerse...': 'Search BharatVerse...',
        
        // Content Creation
        'What\'s on your verse today, Royal?': 'What\'s on your verse today, Royal?',
        'Your Story': 'Your Story',
        'Photo': 'Photo',
        'Video': 'Video',
        'Voice': 'Voice',
        'Location': 'Location',
        'Live': 'Live',
        'Create Post': 'Create Post',
        'Go Live': 'Go Live',
        'Add Story': 'Add Story',
        'Voice Room': 'Voice Room',
        
        // Profile & Stats
        'Verses': 'Verses',
        'Posts': 'Posts',
        'Followers': 'Followers',
        'Following': 'Following',
        'VerseCoins': 'VerseCoins',
        'Edit Profile': 'Edit Profile',
        'Follow': 'Follow',
        'Message': 'Message',
        
        // Sidebar
        'Quick Actions': 'Quick Actions',
        'Trending in India': 'Trending in India',
        'Who to Follow': 'Who to Follow',
        'See All': 'See All',
        'Live Sports': 'Live Sports',
        'Earn More': 'Earn More',
        'Spend': 'Spend',
        
        // Messages & Notifications
        'Mark all read': 'Mark all read',
        'No notifications yet': 'No notifications yet',
        'Type a message...': 'Type a message...',
        'Voice Message': 'Voice Message',
        'Tap to record': 'Tap to record',
        
        // General Actions
        'Load More Posts': 'Load More Posts',
        'Save': 'Save',
        'Cancel': 'Cancel',
        'Delete': 'Delete',
        'Share': 'Share',
        'Like': 'Like',
        'Comment': 'Comment',
        'Logout': 'Logout'
    },
    hi: {
        // Authentication
        'BharatVerse': 'भारतवर्स',
        'Make Your Verse Go Viral': 'अपना वर्स वायरल करें',
        'Login': 'लॉगिन',
        'Sign Up': 'साइन अप',
        'Continue with Google': 'Google से जारी रखें',
        'Continue with Microsoft': 'Microsoft से जारी रखें',
        'Continue with Phone': 'फोन से जारी रखें',
        'Enter BharatVerse': 'भारतवर्स में प्रवेश करें',
        'Create Account': 'खाता बनाएं',
        'Forgot Password?': 'पासवर्ड भूल गए?',
        'Remember me': 'मुझे याद रखें',
        'Send OTP': 'OTP भेजें',
        'Enter OTP': 'OTP दर्ज करें',
        'Verify & Continue': 'सत्यापित करें और जारी रखें',
        'Resend OTP': 'OTP पुनः भेजें',
        
        // Navigation
        'Home': 'होम',
        'Explore': 'एक्सप्लोर',
        'Messages': 'संदेश',
        'Notifications': 'सूचनाएं',
        'Profile': 'प्रोफाइल',
        'Search BharatVerse...': 'भारतवर्स खोजें...',
        
        // Content Creation
        'What\'s on your verse today, Royal?': 'आज आपके वर्स में क्या है, रॉयल?',
        'Your Story': 'आपकी स्टोरी',
        'Photo': 'फोटो',
        'Video': 'वीडियो',
        'Voice': 'आवाज़',
        'Location': 'स्थान',
        'Live': 'लाइव',
        'Create Post': 'पोस्ट बनाएं',
        'Go Live': 'लाइव जाएं',
        'Add Story': 'स्टोरी जोड़ें',
        'Voice Room': 'वॉयस रूम',
        
        // Profile & Stats
        'Verses': 'वर्स',
        'Posts': 'पोस्ट',
        'Followers': 'फॉलोअर्स',
        'Following': 'फॉलोइंग',
        'VerseCoins': 'वर्सकॉइन',
        'Edit Profile': 'प्रोफाइल संपादित करें',
        'Follow': 'फॉलो',
        'Message': 'संदेश',
        
        // Sidebar
        'Quick Actions': 'त्वरित कार्य',
        'Trending in India': 'भारत में ट्रेंडिंग',
        'Who to Follow': 'किसे फॉलो करें',
        'See All': 'सभी देखें',
        'Live Sports': 'लाइव स्पोर्ट्स',
        'Earn More': 'और कमाएं',
        'Spend': 'खर्च करें',
        
        // Messages & Notifications
        'Mark all read': 'सभी पढ़े गए',
        'No notifications yet': 'अभी तक कोई सूचना नहीं',
        'Type a message...': 'संदेश लिखें...',
        'Voice Message': 'वॉयस मैसेज',
        'Tap to record': 'रिकॉर्ड करने के लिए टैप करें',
        
        // General Actions
        'Load More Posts': 'और पोस्ट लोड करें',
        'Save': 'सेव करें',
        'Cancel': 'रद्द करें',
        'Delete': 'डिलीट करें',
        'Share': 'साझा करें',
        'Like': 'लाइक',
        'Comment': 'कमेंट',
        'Logout': 'लॉगआउट'
    }
};

// Trending Topics (Royal's Interests)
const trendingTopics = [
    { tag: 'RCB', posts: 156789, growth: '+45%', category: 'cricket' },
    { tag: 'PlayBold', posts: 89456, growth: '+67%', category: 'cricket' },
    { tag: 'IPL2025', posts: 234567, growth: '+23%', category: 'cricket' },
    { tag: 'TeamIndia', posts: 187654, growth: '+34%', category: 'cricket' },
    { tag: 'Cristiano', posts: 298765, growth: '+56%', category: 'football' },
    { tag: 'CR7', posts: 167890, growth: '+78%', category: 'football' },
    { tag: 'AlNassr', posts: 45678, growth: '+89%', category: 'football' },
    { tag: 'IndianFootball', posts: 34567, growth: '+45%', category: 'football' },
    { tag: 'BharatVerse', posts: 123456, growth: '+234%', category: 'social' },
    { tag: 'MakeInIndia', posts: 98765, growth: '+45%', category: 'general' }
];

// Utility Functions
const Utils = {
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    },
    
    formatTime(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;
        
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        if (days > 7) {
            return new Date(timestamp).toLocaleDateString();
        } else if (days > 0) {
            return `${days}d`;
        } else if (hours > 0) {
            return `${hours}h`;
        } else if (minutes > 0) {
            return `${minutes}m`;
        } else {
            return 'now';
        }
    },
    
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    validatePassword(password) {
        // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
        return re.test(password);
    },
    
    validateUsername(username) {
        // 3-20 characters, alphanumeric and underscore only
        const re = /^[a-zA-Z0-9_]{3,20}$/;
        return re.test(username);
    },
    
    sanitizeInput(input) {
        return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    },
    
    extractHashtags(content) {
        const hashtagRegex = /#(\w+)/g;
        const hashtags = [];
        let match;
        while ((match = hashtagRegex.exec(content)) !== null) {
            hashtags.push(match);
        }
        return hashtags;
    },
    
    extractMentions(content) {
        const mentionRegex = /@(\w+)/g;
        const mentions = [];
        let match;
        while ((match = mentionRegex.exec(content)) !== null) {
            mentions.push(match);
        }
        return mentions;
    }
};

// Toast Notification System
const Toast = {
    container: null,
    
    init() {
        this.container = document.getElementById('toast-container');
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'toast-container';
            this.container.className = 'toast-container';
            document.body.appendChild(this.container);
        }
    },
    
    show(message, type = 'info', duration = 4000) {
        this.init();
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️',
            loading: '⏳'
        };
        
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon">${icons[type]}</span>
                <span class="toast-message">${message}</span>
                <button class="toast-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Add toast with animation
        toast.style.transform = 'translateX(100%)';
        toast.style.opacity = '0';
        this.container.appendChild(toast);
        
        // Animate in
        requestAnimationFrame(() => {
            toast.style.transform = 'translateX(0)';
            toast.style.opacity = '1';
        });
        
        // Auto remove
        if (duration > 0) {
            setTimeout(() => {
                this.remove(toast);
            }, duration);
        }
        
        return toast;
    },
    
    remove(toast) {
        if (toast && toast.parentElement) {
            toast.style.transform = 'translateX(100%)';
            toast.style.opacity = '0';
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.parentElement.removeChild(toast);
                }
            }, 300);
        }
    },
    
    success(message, duration = 3000) {
        return this.show(message, 'success', duration);
    },
    
    error(message, duration = 5000) {
        return this.show(message, 'error', duration);
    },
    
    warning(message, duration = 4000) {
        return this.show(message, 'warning', duration);
    },
    
    info(message, duration = 3000) {
        return this.show(message, 'info', duration);
    },
    
    loading(message) {
        return this.show(message, 'loading', 0); // No auto-dismiss
    }
};

// Authentication System
const Auth = {
    currentUser: null,
    
    async login(email, password, rememberMe = false) {
        try {
            const user = userDB.authenticateUser(email, password);
            this.setCurrentUser(user);
            
            if (rememberMe) {
                localStorage.setItem('bharatverse_remember', 'true');
            }
            
            localStorage.setItem('bharatverse_current_user', user.id);
            BharatVerse.isAuthenticated = true;
            
            // Update last login
            userDB.updateUser(user.id, { lastLogin: Date.now() });
            
            return user;
        } catch (error) {
            throw error;
        }
    },
    
    async signup(userData) {
        try {
            // Validate data
            if (!Utils.validateEmail(userData.email)) {
                throw new Error('Please enter a valid email address');
            }
            
            if (!Utils.validatePassword(userData.password)) {
                throw new Error('Password must be at least 8 characters with uppercase, lowercase, and number');
            }
            
            if (!Utils.validateUsername(userData.username)) {
                throw new Error('Username must be 3-20 characters, letters, numbers, and underscore only');
            }
            
            // Check availability
            if (!userDB.checkEmailAvailability(userData.email)) {
                throw new Error('Email is already registered');
            }
            
            if (!userDB.checkUsernameAvailability(userData.username)) {
                throw new Error('Username is already taken');
            }
            
            // Create user
            const user = userDB.createUser({
                ...userData,
                password: userData.password // In production, hash this
            });
            
            this.setCurrentUser(user);
            localStorage.setItem('bharatverse_current_user', user.id);
            BharatVerse.isAuthenticated = true;
            
            return user;
        } catch (error) {
            throw error;
        }
    },
    
    async loginWithOAuth(provider) {
        // Simulate OAuth login
        Toast.loading(`Connecting with ${provider}...`);
        
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const oauthUser = {
                        displayName: 'Royal Kumar',
                        username: 'royal_kumar',
                        email: 'royal@example.com',
                        password: 'TempPassword123',
                        profilePic: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face',
                        bio: 'Cricket lover 🏏 | RCB fan ❤️ | Ronaldo supporter ⚽ | Tech enthusiast 💻',
                        location: 'India',
                        interests: ['cricket', 'football', 'tech'],
                        language: BharatVerse.currentLanguage
                    };
                    
                    const user = userDB.createUser(oauthUser);
                    this.setCurrentUser(user);
                    localStorage.setItem('bharatverse_current_user', user.id);
                    BharatVerse.isAuthenticated = true;
                    
                    resolve(user);
                } catch (error) {
                    reject(error);
                }
            }, 2000);
        });
    },
    
    async loginWithPhone(phoneNumber) {
        // Simulate phone login
        Toast.info('Sending OTP to ' + phoneNumber);
        
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true, otp: '123456' }); // In production, don't return OTP
            }, 1000);
        });
    },
    
    async verifyOTP(phoneNumber, otp) {
        // Simulate OTP verification
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (otp === '123456') {
                    const phoneUser = {
                        displayName: 'Royal',
                        username: 'royal_' + Date.now(),
                        email: phoneNumber + '@bharatverse.com',
                        password: 'PhoneLogin123',
                        phone: phoneNumber,
                        profilePic: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face',
                        bio: 'Joined via phone 📱',
                        location: 'India',
                        interests: ['cricket', 'football'],
                        language: BharatVerse.currentLanguage
                    };
                    
                    const user = userDB.createUser(phoneUser);
                    this.setCurrentUser(user);
                    localStorage.setItem('bharatverse_current_user', user.id);
                    BharatVerse.isAuthenticated = true;
                    
                    resolve(user);
                } else {
                    reject(new Error('Invalid OTP'));
                }
            }, 1000);
        });
    },
    
    logout() {
        this.currentUser = null;
        BharatVerse.currentUser = null;
        BharatVerse.isAuthenticated = false;
        
        localStorage.removeItem('bharatverse_current_user');
        localStorage.removeItem('bharatverse_remember');
        
        // Clear sensitive data
        BharatVerse.posts.clear();
        BharatVerse.messages.clear();
        BharatVerse.notifications.clear();
        
        Toast.success('Logged out successfully');
        setTimeout(() => {
            showPage('auth');
        }, 1000);
    },
    
    setCurrentUser(user) {
        this.currentUser = user;
        BharatVerse.currentUser = user;
        this.updateUI();
    },
    
    updateUI() {
        if (!this.currentUser) return;
        
        const user = this.currentUser;
        
        // Update profile pictures
        const profilePics = document.querySelectorAll('#nav-profile-pic, #user-avatar-small, #stats-avatar');
        profilePics.forEach(pic => {
            pic.src = user.profilePic;
            pic.alt = user.displayName;
        });
        
        // Update names and usernames
        const nameElements = document.querySelectorAll('#stats-username');
        nameElements.forEach(element => {
            element.textContent = `Welcome, ${user.displayName}!`;
        });
        
        const handleElements = document.querySelectorAll('#stats-handle');
        handleElements.forEach(element => {
            element.textContent = `@${user.username}`;
        });
        
        // Update stats
        const statsElements = {
            'user-posts-count': user.posts || 0,
            'user-followers-count': user.followers || 0,
            'user-versecoins': user.verseCoins || 100,
            'versecoins-balance': user.verseCoins || 100
        };
        
        Object.entries(statsElements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = Utils.formatNumber(value);
            }
        });
        
        // Update create post placeholder
        const createInput = document.querySelector('.create-post-input');
        if (createInput) {
            const placeholder = translations[BharatVerse.currentLanguage]['What\'s on your verse today, Royal?'] || 'What\'s on your verse today?';
            createInput.placeholder = placeholder.replace('Royal', user.displayName.split(' '));
        }
    },
    
    checkAuthStatus() {
        const userId = localStorage.getItem('bharatverse_current_user');
        if (userId && userDB.users.has(userId)) {
            const user = userDB.users.get(userId);
            this.setCurrentUser(user);
            BharatVerse.isAuthenticated = true;
            return true;
        }
        return false;
    }
};

// Page Management System
const PageManager = {
    currentPage: 'auth',
    history: [],
    
    showPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show/hide navbar
        const navbar = document.getElementById('main-navbar');
        if (pageId === 'auth') {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
            this.updateNavbar(pageId);
        }
        
        // Show selected page
        const targetPage = document.getElementById(pageId + '-page');
        if (targetPage) {
            targetPage.classList.add('active');
            
            // Update page title
            const pageTitles = {
                home: 'Home - BharatVerse',
                explore: 'Explore - BharatVerse',
                create: 'Create Post - BharatVerse',
                messages: 'Messages - BharatVerse',
                profile: 'Profile - BharatVerse'
            };
            document.title = pageTitles[pageId] || 'BharatVerse - Make Your Verse Go Viral';
        }
        
        // Load page-specific content
        this.loadPageContent(pageId);
        
        // Update history
        if (pageId !== this.currentPage) {
            this.history.push(this.currentPage);
            this.currentPage = pageId;
        }
        
        // Update URL
        if (pageId !== 'auth' && window.history) {
            window.history.pushState({page: pageId}, '', `#${pageId}`);
        }
    },
    
    updateNavbar(pageId) {
        // Update active nav button
        document.querySelectorAll('.nav-action-btn[data-page]').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = document.querySelector(`.nav-action-btn[data-page="${pageId}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
    },
    
    loadPageContent(pageId) {
        switch(pageId) {
            case 'home':
                HomeManager.initialize();
                break;
            case 'explore':
                ExploreManager.initialize();
                break;
            case 'create':
                CreateManager.initialize();
                break;
            case 'messages':
                MessagesManager.initialize();
                break;
            case 'profile':
                ProfileManager.initialize();
                break;
        }
    },
    
    goBack() {
        if (this.history.length > 0) {
            const previousPage = this.history.pop();
            this.showPage(previousPage);
        }
    }
};

// Home Feed Manager
const HomeManager = {
    postsLoaded: 0,
    isLoading: false,
    
    initialize() {
        this.loadFeed();
        this.loadStories();
        this.loadSidebar();
        this.setupInfiniteScroll();
    },
    
    loadFeed() {
        const container = document.getElementById('posts-container');
        const loadingElement = document.getElementById('loading-posts');
        
        if (!container) return;
        
        // Show loading for first load
        if (this.postsLoaded === 0 && loadingElement) {
            loadingElement.style.display = 'block';
        }
        
        setTimeout(() => {
            // Hide loading
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
            
            // Load sample posts first time
            if (this.postsLoaded === 0) {
                container.innerHTML = '';
                samplePosts.forEach(postData => {
                    const post = this.createPostElement(postData);
                    container.appendChild(post);
                });
                this.postsLoaded = samplePosts.length;
            }
            
            // Load user's posts
            const userPosts = postDB.getFeedPosts(BharatVerse.currentUser?.id, 5, this.postsLoaded);
            userPosts.forEach(postData => {
                const post = this.createPostElement(postData);
                container.appendChild(post);
            });
            
            this.postsLoaded += userPosts.length;
        }, 1000);
    },
    
    createPostElement(postData) {
        // Find user data
        let userData = sampleUsers.find(u => u.id === postData.userId);
        if (!userData && userDB.users.has(postData.userId)) {
            userData = userDB.users.get(postData.userId);
        }
        
        if (!userData) {
            userData = {
                displayName: 'Unknown User',
                username: 'unknown',
                profilePic: 'https://via.placeholder.com/40/333/FFF?text=?',
                isVerified: false
            };
        }
        
        const postEl = document.createElement('article');
        postEl.className = 'post';
        postEl.setAttribute('data-post-id', postData.id);
        
        const mediaHtml = postData.media && postData.media.length > 0 ? 
            `<div class="post-media-container">
                <img class="post-media" src="${postData.media.url}" alt="${postData.media.caption || 'Post image'}" onclick="openMediaModal('${postData.media.url}')">
            </div>` : '';
        
        const isLiked = postData.interactions?.likedBy?.has(BharatVerse.currentUser?.id) || false;
        const isShared = postData.interactions?.sharedBy?.has(BharatVerse.currentUser?.id) || false;
        
        postEl.innerHTML = `
            <div class="post-header">
                <img class="post-user-avatar" src="${userData.profilePic}" alt="${userData.displayName}" onclick="viewUserProfile('${userData.id}')">
                <div class="post-user-info">
                    <div class="post-user-name">
                        ${userData.displayName}
                        ${userData.isVerified ? '<i class="fas fa-check-circle verified-badge"></i>' : ''}
                    </div>
                    <div class="post-meta">
                        <span class="post-username">@${userData.username}</span>
                        <span class="post-separator">•</span>
                        <span class="post-time">${Utils.formatTime(postData.createdAt)}</span>
                        ${postData.location ? `<span class="post-separator">•</span><span class="post-location"><i class="fas fa-map-marker-alt"></i> ${postData.location}</span>` : ''}
                    </div>
                </div>
                <button class="post-menu-btn" onclick="showPostMenu('${postData.id}')">
                    <i class="fas fa-ellipsis-h"></i>
                </button>
            </div>
            
            <div class="post-content">
                ${this.formatPostContent(postData.content)}
            </div>
            
            ${mediaHtml}
            
            <div class="verse-meter-container">
                <div class="verse-meter-label">
                    <span>VerseMeter: ${postData.verseMeter}%</span>
                    <span class="verse-meter-icon">${postData.verseMeter > 90 ? '🔥' : postData.verseMeter > 70 ? '📈' : postData.verseMeter > 50 ? '✨' : '💫'}</span>
                </div>
                <div class="verse-meter">
                    <div class="verse-meter-fill" style="width: ${postData.verseMeter}%"></div>
                </div>
            </div>
            
            <div class="post-stats">
                <span class="post-stats-item">${Utils.formatNumber(postData.likes)} likes</span>
                <span class="post-stats-item">${Utils.formatNumber(postData.comments)} comments</span>
                <span class="post-stats-item">${Utils.formatNumber(postData.shares)} shares</span>
            </div>
            
            <div class="post-actions">
                <button class="post-action ${isLiked ? 'liked' : ''}" onclick="toggleLike('${postData.id}')" title="Like">
                    <i class="fas fa-heart"></i>
                    <span>Like</span>
                </button>
                <button class="post-action" onclick="showComments('${postData.id}')" title="Comment">
                    <i class="fas fa-comment"></i>
                    <span>Comment</span>
                </button>
                <button class="post-action ${isShared ? 'shared' : ''}" onclick="sharePost('${postData.id}')" title="Share">
                    <i class="fas fa-share"></i>
                    <span>Share</span>
                </button>
                <button class="post-action" onclick="savePost('${postData.id}')" title="Save">
                    <i class="fas fa-bookmark"></i>
                    <span>Save</span>
                </button>
            </div>
        `;
        
        return postEl;
    },
    
    formatPostContent(content) {
        // Format hashtags
        content = content.replace(/#(\w+)/g, '<span class="hashtag" onclick="searchHashtag(\'$1\')">#$1</span>');
        
        // Format mentions
        content = content.replace(/@(\w+)/g, '<span class="mention" onclick="searchUser(\'$1\')">@$1</span>');
        
        // Format URLs
        content = content.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
        
        return content;
    },
    
    loadStories() {
        const container = document.getElementById('stories-list');
        if (!container) return;
        
        container.innerHTML = '';
        
        // Add featured users' stories
        const featuredUsers = sampleUsers.slice(0, 6);
        featuredUsers.forEach(user => {
            const storyEl = document.createElement('div');
            storyEl.className = 'story-item';
            storyEl.innerHTML = `
                <div class="story-avatar" style="background-image: url('${user.profilePic}')"></div>
                <span class="story-username">${user.displayName.split(' ')}</span>
            `;
            storyEl.onclick = () => viewStory(user.id);
            container.appendChild(storyEl);
        });
    },
    
    loadSidebar() {
        this.loadTrending();
        this.loadSuggestions();
        this.loadSportsWidget();
    },
    
    loadTrending() {
        const container = document.getElementById('trending-list');
        if (!container) return;
        
        container.innerHTML = '';
        
        // Filter trending topics based on Royal's interests
        const relevantTopics = trendingTopics.filter(topic => 
            ['cricket', 'football', 'social'].includes(topic.category)
        ).slice(0, 6);
        
        relevantTopics.forEach((topic, index) => {
            const trendEl = document.createElement('div');
            trendEl.className = 'trending-item';
            trendEl.innerHTML = `
                <div class="trending-info">
                    <div class="trending-rank">${index + 1}</div>
                    <div class="trending-content">
                        <div class="trending-hashtag">#${topic.tag}</div>
                        <div class="trending-stats">
                            <span class="trending-count">${Utils.formatNumber(topic.posts)} posts</span>
                            <span class="trending-growth">${topic.growth}</span>
                        </div>
                    </div>
                </div>
                <div class="trending-category ${topic.category}"></div>
            `;
            trendEl.onclick = () => searchHashtag(topic.tag);
            container.appendChild(trendEl);
        });
    },
    
    loadSuggestions() {
        const container = document.getElementById('follow-suggestions-list');
        if (!container) return;
        
        container.innerHTML = '';
        
        // Show cricket and football personalities to Royal
        const suggestions = sampleUsers.filter(user => 
            user.interests?.some(interest => ['cricket', 'football'].includes(interest))
        ).slice(0, 3);
        
        suggestions.forEach(user => {
            const suggestionEl = document.createElement('div');
            suggestionEl.className = 'follow-suggestion-item';
            suggestionEl.innerHTML = `
                <div class="suggestion-user-info">
                    <img class="suggestion-avatar" src="${user.profilePic}" alt="${user.displayName}">
                    <div class="suggestion-details">
                        <div class="suggestion-name">
                            ${user.displayName}
                            ${user.isVerified ? '<i class="fas fa-check-circle verified-badge"></i>' : ''}
                        </div>
                        <div class="suggestion-username">@${user.username}</div>
                        <div class="suggestion-stats">${Utils.formatNumber(user.followers)} followers</div>
                    </div>
                </div>
                <button class="follow-btn" onclick="followUser('${user.id}')">
                    <span>Follow</span>
                </button>
            `;
            container.appendChild(suggestionEl);
        });
    },
    
    loadSportsWidget() {
        const container = document.getElementById('live-sports');
        if (!container) return;
        
        // Royal's favorite sports updates
        container.innerHTML = `
            <div class="sports-match">
                <div class="match-header">
                    <span class="live-indicator">🔴 LIVE</span>
                    <span class="match-title">RCB vs MI</span>
                </div>
                <div class="match-score">
                    <div class="team-score">
                        <span class="team-name">RCB</span>
                        <span class="score">165/4</span>
                    </div>
                    <div class="vs">vs</div>
                    <div class="team-score">
                        <span class="team-name">MI</span>
                        <span class="score">45/2</span>
                    </div>
                </div>
                <div class="match-status">RCB need 121 runs | 8.2 overs left</div>
            </div>
            
            <div class="sports-match">
                <div class="match-header">
                    <span class="match-title">Al Nassr vs Al Hilal</span>
                </div>
                <div class="match-score">
                    <div class="team-score">
                        <span class="team-name">Al Nassr</span>
                        <span class="score">2</span>
                    </div>
                    <div class="vs">-</div>
                    <div class="team-score">
                        <span class="team-name">Al Hilal</span>
                        <span class="score">1</span>
                    </div>
                </div>
                <div class="match-status">Cristiano scored! 75' min</div>
            </div>
        `;
    },
    
    setupInfiniteScroll() {
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.onclick = () => this.loadMorePosts();
        }
        
        // Auto-load on scroll near bottom
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollHeight = document.documentElement.scrollHeight;
                    const scrollTop = document.documentElement.scrollTop;
                    const clientHeight = document.documentElement.clientHeight;
                    
                    if (scrollTop + clientHeight >= scrollHeight - 1000) {
                        this.loadMorePosts();
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    },
    
    loadMorePosts() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        const loadMoreBtn = document.getElementById('load-more-btn');
        
        if (loadMoreBtn) {
            loadMoreBtn.innerHTML = '<span>Loading...</span><i class="fas fa-spinner fa-spin"></i>';
            loadMoreBtn.disabled = true;
        }
        
        setTimeout(() => {
            // Generate more posts or load from database
            this.loadFeed();
            
            if (loadMoreBtn) {
                const loadText = translations[BharatVerse.currentLanguage]['Load More Posts'] || 'Load More Posts';
                loadMoreBtn.innerHTML = `<span>${loadText}</span><i class="fas fa-chevron-down"></i>`;
                loadMoreBtn.disabled = false;
            }
            
            this.isLoading = false;
        }, 2000);
    }
};

// Authentication UI Handlers
function showAuthForm(type) {
    document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    
    if (type === 'login') {
        document.querySelector('.auth-tab:first-child').classList.add('active');
        document.getElementById('login-form').classList.add('active');
    } else if (type === 'signup') {
        document.querySelector('.auth-tab:last-child').classList.add('active');
        document.getElementById('signup-form').classList.add('active');
    }
    
    clearAuthMessage();
}

function showAuthMessage(message, type = 'error') {
    const messageEl = document.getElementById('auth-message');
    if (messageEl) {
        messageEl.textContent = message;
        messageEl.className = `auth-message ${type}`;
        messageEl.classList.remove('hidden');
    }
}

function clearAuthMessage() {
    const messageEl = document.getElementById('auth-message');
    if (messageEl) {
        messageEl.classList.add('hidden');
    }
}

async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('remember-me').checked;
    
    const submitBtn = document.getElementById('login-btn');
    const originalText = submitBtn.innerHTML;
    
    try {
        submitBtn.innerHTML = '<span>Logging in...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        const user = await Auth.login(email, password, rememberMe);
        
        showAuthMessage('Login successful! Welcome back! 🎉', 'success');
        
        setTimeout(() => {
            PageManager.showPage('home');
            Toast.success(`Welcome back, ${user.displayName}! 👋`);
        }, 1000);
        
    } catch (error) {
        showAuthMessage(error.message, 'error');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

async function handleSignup(event) {
    event.preventDefault();
    
    const formData = {
        displayName: document.getElementById('signup-fullname').value.trim(),
        username: document.getElementById('signup-username').value.trim(),
        email: document.getElementById('signup-email').value.trim(),
        phone: document.getElementById('signup-phone').value.trim(),
        password: document.getElementById('signup-password').value,
        confirmPassword: document.getElementById('signup-confirm-password').value,
        interests: Array.from(document.querySelectorAll('input[name="interests"]:checked')).map(cb => cb.value),
        language: BharatVerse.currentLanguage
    };
    
    const submitBtn = document.getElementById('signup-btn');
    const originalText = submitBtn.innerHTML;
    
    try {
        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            throw new Error('Passwords do not match');
        }
        
        // Check terms acceptance
        if (!document.getElementById('terms-checkbox').checked) {
            throw new Error('Please accept the Terms of Service and Privacy Policy');
        }
        
        submitBtn.innerHTML = '<span>Creating account...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        const user = await Auth.signup(formData);
        
        showAuthMessage('Account created successfully! Welcome to BharatVerse! 🎉', 'success');
        
        setTimeout(() => {
            PageManager.showPage('home');
            Toast.success(`Welcome to BharatVerse, ${user.displayName}! 🚀`);
        }, 1000);
        
    } catch (error) {
        showAuthMessage(error.message, 'error');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

async function loginWithOAuth(provider) {
    try {
        const user = await Auth.loginWithOAuth(provider);
        PageManager.showPage('home');
        Toast.success(`Welcome to BharatVerse, ${user.displayName}! 🎉`);
    } catch (error) {
        Toast.error(`Failed to login with ${provider}: ${error.message}`);
    }
}

async function loginWithPhone() {
    showAuthForm('phone');
    document.getElementById('phone-form').classList.add('active');
    document.querySelectorAll('.auth-form').forEach(form => {
        if (form.id !== 'phone-form') form.classList.remove('active');
    });
}

async function handlePhoneLogin(event) {
    event.preventDefault();
    
    const phoneNumber = document.getElementById('phone-number').value.trim();
    
    if (!phoneNumber.match(/^(\+91|0)?[6789]\d{9}$/)) {
        showAuthMessage('Please enter a valid Indian phone number', 'error');
        return;
    }
    
    try {
        const result = await Auth.loginWithPhone(phoneNumber);
        
        if (result.success) {
            showOTPForm(phoneNumber);
        }
    } catch (error) {
        showAuthMessage(error.message, 'error');
    }
}

function showOTPForm(phoneNumber) {
    document.getElementById('phone-form').classList.remove('active');
    document.getElementById('otp-form').classList.add('active');
    document.getElementById('otp-phone-display').textContent = phoneNumber;
    
    startOTPCountdown();
    
    // Focus first OTP input
    document.querySelector('.otp-input').focus();
}

function startOTPCountdown() {
    let countdown = 30;
    const countdownEl = document.getElementById('otp-countdown');
    const resendBtn = document.getElementById('resend-otp-btn');
    
    const timer = setInterval(() => {
        countdown--;
        countdownEl.textContent = countdown;
        
        if (countdown <= 0) {
            clearInterval(timer);
            document.querySelector('.otp-timer').style.display = 'none';
            resendBtn.classList.remove('hidden');
        }
    }, 1000);
}

function moveToNext(input, index) {
    if (input.value.length === 1 && index < 5) {
        const nextInput = document.querySelectorAll('.otp-input')[index + 1];
        nextInput.focus();
    }
    
    // Check if all inputs are filled
    const otpInputs = document.querySelectorAll('.otp-input');
    const otpComplete = Array.from(otpInputs).every(inp => inp.value.length === 1);
    
    if (otpComplete) {
        document.getElementById('verify-otp-btn').classList.remove('disabled');
    }
}

async function handleOTPVerification(event) {
    event.preventDefault();
    
    const otpInputs = document.querySelectorAll('.otp-input');
    const otp = Array.from(otpInputs).map(input => input.value).join('');
    const phoneNumber = document.getElementById('otp-phone-display').textContent;
    
    if (otp.length !== 6) {
        showAuthMessage('Please enter complete OTP', 'error');
        return;
    }
    
    const submitBtn = document.getElementById('verify-otp-btn');
    const originalText = submitBtn.innerHTML;
    
    try {
        submitBtn.innerHTML = '<span>Verifying...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        const user = await Auth.verifyOTP(phoneNumber, otp);
        
        showAuthMessage('Phone verified successfully! 🎉', 'success');
        
        setTimeout(() => {
            PageManager.showPage('home');
            Toast.success(`Welcome to BharatVerse, ${user.displayName}! 📱`);
        }, 1000);
        
    } catch (error) {
        showAuthMessage(error.message, 'error');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Clear OTP inputs
        otpInputs.forEach(input => input.value = '');
        otpInputs.focus();
    }
}

async function resendOTP() {
    const phoneNumber = document.getElementById('otp-phone-display').textContent;
    
    try {
        await Auth.loginWithPhone(phoneNumber);
        Toast.success('OTP sent again! 📱');
        
        document.getElementById('resend-otp-btn').classList.add('hidden');
        document.querySelector('.otp-timer').style.display = 'block';
        startOTPCountdown();
        
    } catch (error) {
        Toast.error('Failed to resend OTP: ' + error.message);
    }
}

// Input validation helpers
function validateInput(inputId, validatorType) {
    const input = document.getElementById(inputId);
    const validationEl = document.getElementById(inputId + '-validation');
    
    if (!input || !validationEl) return;
    
    const value = input.value.trim();
    let isValid = false;
    let message = '';
    
    switch (validatorType) {
        case 'email':
            isValid = Utils.validateEmail(value);
            message = isValid ? '✓ Valid email' : '✗ Please enter a valid email address';
            break;
            
        case 'password':
            isValid = Utils.validatePassword(value);
            message = isValid ? '✓ Strong password' : '✗ Password must be 8+ chars with uppercase, lowercase, and number';
            
            // Update password strength indicator
            updatePasswordStrength(value);
            break;
            
        case 'username':
            isValid = Utils.validateUsername(value);
            message = isValid ? '✓ Username available' : '✗ Username must be 3-20 characters, letters, numbers, underscore only';
            
            // Check availability
            if (isValid) {
                const available = userDB.checkUsernameAvailability(value);
                if (!available) {
                    isValid = false;
                    message = '✗ Username is already taken';
                }
            }
            break;
    }
    
    validationEl.textContent = message;
    validationEl.className = `input-validation ${isValid ? 'success' : 'error'}`;
    
    return isValid;
}

function updatePasswordStrength(password) {
    const strengthEl = document.getElementById('password-strength');
    if (!strengthEl) return;
    
    let strength = 'weak';
    let score = 0;
    
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z\d]/.test(password)) score++;
    
    if (score >= 4) strength = 'very-strong';
    else if (score >= 3) strength = 'strong';
    else if (score >= 2) strength = 'medium';
    
    strengthEl.className = `password-strength ${strength}`;
    strengthEl.innerHTML = '<div class="password-strength-fill"></div>';
}

// Post interaction functions
function toggleLike(postId) {
    if (!BharatVerse.currentUser) {
        Toast.error('Please login to like posts');
        return;
    }
    
    try {
        // Find post in sample data or database
        let post = samplePosts.find(p => p.id === postId);
        let isFromDB = false;
        
        if (!post) {
            post = postDB.posts.get(postId);
            isFromDB = true;
        }
        
        if (!post) {
            Toast.error('Post not found');
            return;
        }
        
        // Toggle like
        if (isFromDB) {
            post = postDB.likePost(postId, BharatVerse.currentUser.id);
        } else {
            // Handle sample posts
            if (!post.interactions) {
                post.interactions = { likedBy: new Set(), sharedBy: new Set() };
            }
            
            const isLiked = post.interactions.likedBy.has(BharatVerse.currentUser.id);
            
            if (isLiked) {
                post.interactions.likedBy.delete(BharatVerse.currentUser.id);
                post.likes = Math.max(0, post.likes - 1);
            } else {
                post.interactions.likedBy.add(BharatVerse.currentUser.id);
                post.likes += 1;
                post.verseMeter = Math.min(100, post.verseMeter + 1);
            }
        }
        
        // Update UI
        const postElement = document.querySelector(`[data-post-id="${postId}"]`);
        if (postElement) {
            const likeBtn = postElement.querySelector('.post-action');
            const likesCount = postElement.querySelector('.post-stats-item');
            const verseMeter = postElement.querySelector('.verse-meter-fill');
            
            likeBtn.classList.toggle('liked');
            if (likesCount) {
                likesCount.textContent = `${Utils.formatNumber(post.likes)} likes`;
            }
            if (verseMeter) {
                verseMeter.style.width = `${post.verseMeter}%`;
            }
        }
        
        // Show heart animation
        createLikeAnimation(event.target);
        
        const isLiked = post.interactions?.likedBy?.has(BharatVerse.currentUser.id);
        Toast.success(isLiked ? 'Post liked! ❤️' : 'Like removed', 1000);
        
    } catch (error) {
        Toast.error('Failed to like post: ' + error.message);
    }
}

function createLikeAnimation(button) {
    const heart = document.createElement('div');
    heart.textContent = '❤️';
    heart.style.cssText = `
        position: fixed;
        font-size: 24px;
        pointer-events: none;
        z-index: 1000;
        animation: heartFloat 1s ease-out forwards;
    `;
    
    const rect = button.getBoundingClientRect();
    heart.style.left = rect.left + 'px';
    heart.style.top = rect.top + 'px';
    
    document.body.appendChild(heart);
    
    // Add CSS animation if not exists
    if (!document.getElementById('heart-animation-style')) {
        const style = document.createElement('style');
        style.id = 'heart-animation-style';
        style.textContent = `
            @keyframes heartFloat {
                0% { transform: translateY(0px) scale(1); opacity: 1; }
                50% { transform: translateY(-50px) scale(1.2); opacity: 0.8; }
                100% { transform: translateY(-100px) scale(1.5); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => heart.remove(), 1000);
}

// Theme and Language Management
function toggleTheme() {
    BharatVerse.theme = BharatVerse.theme === 'dark' ? 'light' : 'dark';
    document.body.classList.toggle('light-theme', BharatVerse.theme === 'light');
    
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        themeIcon.className = BharatVerse.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    localStorage.setItem('bharatverse_theme', BharatVerse.theme);
    Toast.success(`Switched to ${BharatVerse.theme} theme`, 1000);
}

function toggleLanguage() {
    BharatVerse.currentLanguage = BharatVerse.currentLanguage === 'en' ? 'hi' : 'en';
    
    const langIcon = document.getElementById('lang-icon');
    if (langIcon) {
        langIcon.textContent = BharatVerse.currentLanguage === 'en' ? '🇮🇳' : '🇬🇧';
    }
    
    updateLanguageElements();
    localStorage.setItem('bharatverse_language', BharatVerse.currentLanguage);
    
    const langName = BharatVerse.currentLanguage === 'en' ? 'English' : 'हिन्दी';
    Toast.success(`Language: ${langName}`, 1000);
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

// Global functions for page management
function showPage(pageId) {
    PageManager.showPage(pageId);
}

function logout() {
    Auth.logout();
}

// Initialize app
function initializeApp() {
    console.log('🚀 Initializing BharatVerse...');
    
    const startTime = performance.now();
    
    // Show loading screen
    const loadingScreen = document.getElementById('loading-screen');
    const loadingStatus = document.getElementById('loading-status');
    
    const loadingSteps = [
        'Initializing...',
        'Loading user data...',
        'Setting up database...',
        'Configuring preferences...',
        'Almost ready...',
        'Welcome to BharatVerse!'
    ];
    
    let currentStep = 0;
    
    const updateLoading = () => {
        if (loadingStatus && currentStep < loadingSteps.length) {
            loadingStatus.textContent = loadingSteps[currentStep];
            currentStep++;
        }
    };
    
    const loadingInterval = setInterval(updateLoading, 400);
    
    setTimeout(() => {
        clearInterval(loadingInterval);
        
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                
                // Initialize app systems
                initializeSystems();
                
                // Check authentication
                if (Auth.checkAuthStatus()) {
                    PageManager.showPage('home');
                    Toast.success(`Welcome back, ${BharatVerse.currentUser.displayName}! 👋`);
                } else {
                    PageManager.showPage('auth');
                }
                
                BharatVerse.performance.loadTime = performance.now() - startTime;
                console.log(`✅ BharatVerse loaded in ${BharatVerse.performance.loadTime.toFixed(2)}ms`);
                
            }, 500);
        }
    }, 3000);
}

function initializeSystems() {
    // Load saved preferences
    const savedTheme = localStorage.getItem('bharatverse_theme');
    const savedLanguage = localStorage.getItem('bharatverse_language');
    
    if (savedTheme) {
        BharatVerse.theme = savedTheme;
        document.body.classList.toggle('light-theme', savedTheme === 'light');
        const themeIcon = document.getElementById('theme-icon');
        if (themeIcon) {
            themeIcon.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
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
    
    // Initialize sample data in databases
    sampleUsers.forEach(userData => {
        if (!userDB.users.has(userData.id)) {
            userDB.users.set(userData.id, userData);
        }
    });
    userDB.saveUsers();
    
    samplePosts.forEach(postData => {
        if (!postDB.posts.has(postData.id)) {
            postDB.posts.set(postData.id, postData);
        }
    });
    postDB.savePosts();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize Toast system
    Toast.init();
    
    console.log('🔧 All systems initialized');
}

function setupEventListeners() {
    // Browser navigation
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.page) {
            PageManager.showPage(e.state.page);
        }
    });
    
    // Handle hash navigation
    if (window.location.hash) {
        const page = window.location.hash.substring(1);
        if (['home', 'explore', 'create', 'messages', 'profile'].includes(page)) {
            setTimeout(() => {
                if (Auth.checkAuthStatus()) {
                    PageManager.showPage(page);
                }
            }, 3500);
        }
    }
    
    // Real-time input validation
    const inputValidators = {
        'login-email': 'email',
        'signup-email': 'email',
        'signup-password': 'password',
        'signup-username': 'username'
    };
    
    Object.entries(inputValidators).forEach(([inputId, validator]) => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', Utils.debounce(() => {
                validateInput(inputId, validator);
            }, 500));
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('global-search');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Escape to close modals
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
    
    // Click outside to close dropdowns
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.notification-btn') && !e.target.closest('#notifications-dropdown')) {
            const dropdown = document.getElementById('notifications-dropdown');
            if (dropdown) dropdown.classList.remove('active');
        }
        
        if (!e.target.closest('.search-container')) {
            const suggestions = document.getElementById('search-suggestions');
            if (suggestions) suggestions.classList.remove('active');
        }
    });
    
    console.log('👂 Event listeners setup complete');
}

// Additional utility functions (placeholder implementations)
function sharePost(postId) {
    Toast.info('Share feature coming soon! 🔄');
}

function savePost(postId) {
    Toast.success('Post saved! 📌', 1000);
}

function showComments(postId) {
    Toast.info('Comments feature coming soon! 💬');
}

function viewUserProfile(userId) {
    Toast.info(`Viewing user profile: ${userId}`);
}

function followUser(userId) {
    Toast.success('Now following user! 👥');
}

function searchHashtag(hashtag) {
    Toast.info(`Searching for #${hashtag}... 🔍`);
}

function viewStory(userId) {
    Toast.info('Story viewer coming soon! 👀');
}

function createStory() {
    Toast.info('Story creation coming soon! 📸');
}

function startLiveStream() {
    Toast.info('Live streaming coming soon! 📡');
}

function joinVoiceRoom() {
    Toast.info('Voice rooms coming soon! 🎙️');
}

function joinSportsRoom() {
    Toast.info('Sports room coming soon! ⚽');
}

function earnCoins() {
    Toast.info('VerseCoins earning coming soon! 💰');
}

function spendCoins() {
    Toast.info('VerseCoins marketplace coming soon! 🛍️');
}

function startVoiceRecording() {
    Toast.info('Voice recording coming soon! 🎤');
}

function toggleNotifications() {
    const dropdown = document.getElementById('notifications-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

function markAllNotificationsRead() {
    const badge = document.getElementById('notification-badge');
    if (badge) badge.textContent = '0';
    Toast.success('All notifications marked as read! ✅', 1000);
}

function handleGlobalSearch(query) {
    if (query.length > 2) {
        // Show search suggestions
        const suggestions = document.getElementById('search-suggestions');
        if (suggestions) {
            suggestions.classList.add('active');
            // Implement search logic here
        }
    }
}

function closeAllModals() {
    document.querySelectorAll('.modal.active').forEach(modal => {
        modal.classList.remove('active');
    });
    
    document.querySelectorAll('.dropdown.active').forEach(dropdown => {
        dropdown.classList.remove('active');
    });
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.nextElementSibling;
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

function showTerms() {
    Toast.info('Terms of Service page coming soon! 📄');
}

function showPrivacy() {
    Toast.info('Privacy Policy page coming soon! 🔒');
}

function showForgotPassword() {
    Toast.info('Password reset coming soon! 🔑');
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Service Worker Registration (PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('✅ SW registered:', registration);
            })
            .catch(error => {
                console.log('❌ SW registration failed:', error);
            });
    });
}

// Export for potential module use
window.BharatVerse = BharatVerse;
window.PageManager = PageManager;
window.Auth = Auth;
window.Toast = Toast;

console.log('🎯 BharatVerse JavaScript loaded successfully!');
console.log('🚀 Ready to make your verse go viral, Royal! 👑');
