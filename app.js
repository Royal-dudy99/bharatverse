<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BharatVerse - Make Your Verse Go Viral</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Language Toggle -->
    <div id="language-toggle" class="language-toggle">
        <button onclick="toggleLanguage()" class="lang-btn">
            <span id="lang-text">🇮🇳 हिन्दी</span>
        </button>
    </div>

    <!-- Login Page -->
    <div id="login-page" class="page active">
        <div class="login-container">
            <div class="logo-section">
                <div class="logo">
                    <div class="logo-circle">
                        <span class="logo-text">V</span>
                    </div>
                </div>
                <h1 class="app-title" data-en="BharatVerse" data-hi="भारतवर्स">BharatVerse</h1>
                <p class="tagline" data-en='"Make Your Verse Go Viral"' data-hi='"अपना वर्स वायरल करें"'>"Make Your Verse Go Viral"</p>
            </div>
            
            <div class="auth-forms">
                <div class="form-container">
                    <div class="tab-buttons">
                        <button class="tab-btn active" onclick="showLoginForm()" data-en="Login" data-hi="लॉगिन">Login</button>
                        <button class="tab-btn" onclick="showSignupForm()" data-en="Sign Up" data-hi="साइन अप">Sign Up</button>
                    </div>
                    
                    <form id="login-form" class="auth-form active" onsubmit="login(event)">
                        <input type="text" placeholder="Username or Email" class="form-control" required data-placeholder-en="Username or Email" data-placeholder-hi="उपयोगकर्ता नाम या ईमेल">
                        <input type="password" placeholder="Password" class="form-control" required data-placeholder-en="Password" data-placeholder-hi="पासवर्ड">
                        <button type="submit" class="btn btn-primary" data-en="Login to BharatVerse" data-hi="भारतवर्स में लॉगिन करें">Login to BharatVerse</button>
                    </form>
                    
                    <form id="signup-form" class="auth-form" onsubmit="signup(event)" style="display:none;">
                        <input type="text" placeholder="Username" class="form-control" required data-placeholder-en="Username" data-placeholder-hi="उपयोगकर्ता नाम">
                        <input type="email" placeholder="Email" class="form-control" required data-placeholder-en="Email" data-placeholder-hi="ईमेल">
                        <input type="password" placeholder="Password" class="form-control" required data-placeholder-en="Password" data-placeholder-hi="पासवर्ड">
                        <button type="submit" class="btn btn-primary" data-en="Join BharatVerse" data-hi="भारतवर्स जॉइन करें">Join BharatVerse</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Navigation Bar -->
    <nav id="main-navbar" class="navbar" style="display: none;">
        <div class="nav-brand">
            <div class="logo-small">V</div>
            <span>BharatVerse</span>
        </div>
        <div class="nav-center">
            <div class="search-box">
                <i class="fas fa-search"></i>
                <input type="text" placeholder="Search BharatVerse..." id="search-input">
            </div>
        </div>
        <div class="nav-right">
            <button class="nav-btn" onclick="showPage('home')" title="Home"><i class="fas fa-home"></i></button>
            <button class="nav-btn" onclick="showPage('explore')" title="Explore"><i class="fas fa-compass"></i></button>
            <button class="nav-btn" onclick="showPage('create')" title="Create"><i class="fas fa-plus-square"></i></button>
            <button class="nav-btn" onclick="showPage('chat')" title="Messages"><i class="fas fa-comment"></i></button>
            <div class="notification-btn" onclick="toggleNotifications()">
                <i class="fas fa-bell"></i>
                <span class="notification-count" id="notification-count">3</span>
            </div>
            <button class="nav-btn" onclick="showPage('profile')" title="Profile"><i class="fas fa-user-circle"></i></button>
        </div>
    </nav>

    <!-- Notifications Dropdown -->
    <div id="notifications-dropdown" class="notifications-dropdown">
        <div class="notifications-header">
            <h3>Notifications</h3>
            <button onclick="markAllRead()">Mark all as read</button>
        </div>
        <div class="notifications-list">
            <div class="notification-item">
                <div class="notification-avatar" style="background: linear-gradient(45deg, #4A90E2, #E91E63);">R</div>
                <div class="notification-content">
                    <p><strong>Rohit Sharma</strong> liked your post</p>
                    <span class="notification-time">2m ago</span>
                </div>
            </div>
            <div class="notification-item">
                <div class="notification-avatar" style="background: linear-gradient(45deg, #E91E63, #FF9800);">P</div>
                <div class="notification-content">
                    <p><strong>Priya Sharma</strong> commented on your post</p>
                    <span class="notification-time">5m ago</span>
                </div>
            </div>
            <div class="notification-item">
                <div class="notification-avatar" style="background: linear-gradient(45deg, #FF9800, #4CAF50);">A</div>
                <div class="notification-content">
                    <p><strong>Arjun Kapoor</strong> started syncing with you</p>
                    <span class="notification-time">1h ago</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Home Feed Page -->
    <div id="home-page" class="page">
        <!-- Cricket Score Ticker -->
        <div class="cricket-ticker">
            <div class="ticker-content">
                <span class="live-indicator">🔴 LIVE</span>
                <span class="match-info">MI vs RCB - MI 45/2 (8.3) | Target: 165</span>
                <span class="separator">•</span>
                <span class="bollywood-news">🎬 Shah Rukh Khan's new movie trailer crosses 10M views!</span>
            </div>
        </div>

        <div class="main-content">
            <div class="feed-container">
                <!-- Stories Section -->
                <div class="stories-section">
                    <div class="story your-story" onclick="showCreateStory()">
                        <div class="story-avatar add-story">+</div>
                        <span data-en="Your Story" data-hi="आपकी स्टोरी">Your Story</span>
                    </div>
                    <div class="story" onclick="viewStory(1)">
                        <div class="story-avatar" style="background-image: url('https://via.placeholder.com/60/4A90E2/FFFFFF?text=R')"></div>
                        <span>Rohit</span>
                    </div>
                    <div class="story" onclick="viewStory(2)">
                        <div class="story-avatar" style="background-image: url('https://via.placeholder.com/60/E91E63/FFFFFF?text=P')"></div>
                        <span>Priya</span>
                    </div>
                    <div class="story" onclick="viewStory(3)">
                        <div class="story-avatar" style="background-image: url('https://via.placeholder.com/60/FF9800/FFFFFF?text=A')"></div>
                        <span>Arjun</span>
                    </div>
                </div>

                <!-- Create Post -->
                <div class="create-post">
                    <div class="create-post-header">
                        <div class="user-avatar" id="current-user-avatar" style="background-image: url('https://via.placeholder.com/40/333/FFFFFF?text=You')"></div>
                        <input type="text" placeholder="What's on your verse today?" onclick="showPage('create')" data-placeholder-en="What's on your verse today?" data-placeholder-hi="आज आपके वर्स में क्या है?">
                    </div>
                    <div class="create-post-actions">
                        <button class="action-btn" onclick="showPage('create')"><i class="fas fa-image"></i> <span data-en="Photo" data-hi="फोटो">Photo</span></button>
                        <button class="action-btn" onclick="showPage('create')"><i class="fas fa-video"></i> <span data-en="Video" data-hi="वीडियो">Video</span></button>
                        <button class="action-btn" onclick="startVoiceRecording()"><i class="fas fa-microphone"></i> <span data-en="Voice" data-hi="आवाज़">Voice</span></button>
                        <button class="action-btn" onclick="shareLocation()"><i class="fas fa-map-marker-alt"></i> <span data-en="Location" data-hi="स्थान">Location</span></button>
                    </div>
                </div>

                <!-- Posts Feed -->
                <div id="posts-container">
                    <!-- Posts will be loaded here by JavaScript -->
                </div>
            </div>

            <div class="sidebar">
                <!-- Trending Section -->
                <div class="trending-section">
                    <h3 data-en="Trending in India" data-hi="भारत में ट्रेंडिंग">Trending in India</h3>
                    <div class="trending-item" onclick="searchHashtag('IPL2025')">
                        <span class="trending-tag">#IPL2025</span>
                        <span class="trending-count">125K Verses</span>
                    </div>
                    <div class="trending-item" onclick="searchHashtag('BharatVerse')">
                        <span class="trending-tag">#BharatVerse</span>
                        <span class="trending-count">89K Verses</span>
                    </div>
                    <div class="trending-item" onclick="searchHashtag('CricketFever')">
                        <span class="trending-tag">#CricketFever</span>
                        <span class="trending-count">67K Verses</span>
                    </div>
                    <div class="trending-item" onclick="searchHashtag('Bollywood')">
                        <span class="trending-tag">#Bollywood</span>
                        <span class="trending-count">45K Verses</span>
                    </div>
                </div>

                <!-- Who to Sync Section -->
                <div class="suggestions-section">
                    <h3 data-en="Who to Sync" data-hi="किसे सिंक करें">Who to Sync</h3>
                    <div class="suggestion-item">
                        <div class="user-avatar" style="background-image: url('https://via.placeholder.com/40/FF5722/FFFFFF?text=V')"></div>
                        <div class="suggestion-info">
                            <div class="suggestion-name">Virat Kohli</div>
                            <div class="suggestion-username">@virat.kohli</div>
                        </div>
                        <button class="sync-btn" onclick="syncUser('virat.kohli')" data-en="Sync" data-hi="सिंक">Sync</button>
                    </div>
                    <div class="suggestion-item">
                        <div class="user-avatar" style="background-image: url('https://via.placeholder.com/40/9C27B0/FFFFFF?text=D')"></div>
                        <div class="suggestion-info">
                            <div class="suggestion-name">Deepika Padukone</div>
                            <div class="suggestion-username">@deepikapadukone</div>
                        </div>
                        <button class="sync-btn" onclick="syncUser('deepikapadukone')" data-en="Sync" data-hi="सिंक">Sync</button>
                    </div>
                </div>

                <!-- Live Cricket Section -->
                <div class="cricket-section">
                    <h3>🏏 Live Cricket</h3>
                    <div class="match-card">
                        <div class="match-header">
                            <span class="live-dot">🔴</span>
                            <span>IPL 2025 Final</span>
                        </div>
                        <div class="match-teams">
                            <div class="team">MI: 165/4</div>
                            <div class="vs">VS</div>
                            <div class="team">RCB: 45/2</div>
                        </div>
                        <div class="match-status">8.3 overs • RCB need 121</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Create Post Page -->
    <div id="create-page" class="page">
        <div class="create-container">
            <div class="create-header">
                <button class="back-btn" onclick="showPage('home')"><i class="fas fa-arrow-left"></i></button>
                <h2 data-en="Create New Post" data-hi="नई पोस्ट बनाएं">Create New Post</h2>
                <button class="publish-btn" onclick="publishPost()" data-en="Share" data-hi="साझा करें">Share</button>
            </div>

            <div class="create-content">
                <div class="user-info">
                    <div class="user-avatar" style="background-image: url('https://via.placeholder.com/50/333/FFFFFF?text=You')"></div>
                    <div class="user-details">
                        <div class="username" id="current-username">Your Name</div>
                        <select class="privacy-select">
                            <option value="public">🌍 Public</option>
                            <option value="synced">👥 Synced Only</option>
                            <option value="private">🔒 Private</option>
                        </select>
                    </div>
                </div>

                <textarea class="post-textarea" placeholder="What's on your verse today?" data-placeholder-en="What's on your verse today?" data-placeholder-hi="आज आपके वर्स में क्या है?" maxlength="500"></textarea>
                
                <div class="character-count">
                    <span id="char-count">0</span>/500
                </div>

                <div class="media-preview" id="media-preview">
                    <!-- Media previews will appear here -->
                </div>

                <div class="create-actions">
                    <div class="media-buttons">
                        <button class="media-btn" onclick="selectPhoto()">
                            <i class="fas fa-image"></i>
                            <span data-en="Photo" data-hi="फोटो">Photo</span>
                        </button>
                        <button class="media-btn" onclick="selectVideo()">
                            <i class="fas fa-video"></i>
                            <span data-en="Video" data-hi="वीडियो">Video</span>
                        </button>
                        <button class="media-btn" onclick="recordVoice()">
                            <i class="fas fa-microphone"></i>
                            <span data-en="Voice" data-hi="आवाज़">Voice</span>
                        </button>
                        <button class="media-btn" onclick="addLocation()">
                            <i class="fas fa-map-marker-alt"></i>
                            <span data-en="Location" data-hi="स्थान">Location</span>
                        </button>
                        <button class="media-btn" onclick="addPoll()">
                            <i class="fas fa-poll"></i>
                            <span data-en="Poll" data-hi="पोल">Poll</span>
                        </button>
                    </div>

                    <div class="hashtag-suggestions">
                        <h4 data-en="Trending Hashtags" data-hi="ट्रेंडिंग हैशटैग">Trending Hashtags</h4>
                        <div class="hashtag-chips">
                            <button class="hashtag-chip" onclick="addHashtag('IPL2025')">#IPL2025</button>
                            <button class="hashtag-chip" onclick="addHashtag('BharatVerse')">#BharatVerse</button>
                            <button class="hashtag-chip" onclick="addHashtag('MondayMotivation')">#MondayMotivation</button>
                            <button class="hashtag-chip" onclick="addHashtag('TechTalk')">#TechTalk</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Chat Page -->
    <div id="chat-page" class="page">
        <div class="chat-container">
            <div class="chat-sidebar">
                <div class="chat-sidebar-header">
                    <h3 data-en="Messages" data-hi="संदेश">Messages</h3>
                    <button class="new-chat-btn" onclick="startNewChat()">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
                <div class="chat-search">
                    <input type="text" placeholder="Search conversations..." data-placeholder-en="Search conversations..." data-placeholder-hi="बातचीत खोजें...">
                </div>
                <div class="chat-list" id="chat-list">
                    <!-- Chat list items will be populated by JavaScript -->
                </div>
            </div>
            
            <div class="chat-main" id="chat-main">
                <div class="chat-header" id="chat-header">
                    <!-- Chat header will be populated when a chat is selected -->
                </div>
                
                <div class="chat-messages" id="chat-messages">
                    <!-- Messages will be populated here -->
                </div>
                
                <div class="chat-input-container">
                    <div class="chat-input-actions">
                        <button class="input-action-btn" onclick="attachFile()" title="Attach file">
                            <i class="fas fa-paperclip"></i>
                        </button>
                        <button class="input-action-btn" onclick="selectEmoji()" title="Emoji">
                            <i class="fas fa-smile"></i>
                        </button>
                    </div>
                    <div class="chat-input">
                        <input type="text" placeholder="Type a message..." id="message-input" onkeypress="handleMessageKeypress(event)" data-placeholder-en="Type a message..." data-placeholder-hi="संदेश लिखें...">
                        <button class="voice-record-btn" onclick="toggleVoiceRecording()" id="voice-record-btn">
                            <i class="fas fa-microphone"></i>
                        </button>
                        <button class="send-btn" onclick="sendMessage()" id="send-btn">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Profile Page -->
    <div id="profile-page" class="page">
        <div class="profile-container">
            <div class="profile-header">
                <div class="profile-cover" id="profile-cover"></div>
                <div class="profile-info">
                    <div class="profile-avatar-container">
                        <div class="profile-avatar" id="profile-avatar" style="background-image: url('https://via.placeholder.com/120/333/FFFFFF?text=You')"></div>
                        <button class="change-avatar-btn" onclick="changeProfilePicture()">
                            <i class="fas fa-camera"></i>
                        </button>
                    </div>
                    <div class="profile-details" id="profile-details">
                        <div class="profile-name-section">
                            <h2 class="profile-name" id="profile-name">Your Name</h2>
                            <button class="edit-profile-btn" onclick="editProfile()">
                                <i class="fas fa-edit"></i>
                            </button>
                        </div>
                        <p class="profile-username" id="profile-username">@your_username</p>
                        <p class="profile-bio" id="profile-bio" data-en="Cricket lover 🏏 | Coding addict | #TeamIndia" data-hi="क्रिकेट प्रेमी 🏏 | कोडिंग के दीवाने | #टीमइंडिया">Cricket lover 🏏 | Coding addict | #TeamIndia</p>
                        <div class="profile-location">
                            <i class="fas fa-map-marker-alt"></i>
                            <span id="profile-location" data-en="Mumbai, India" data-hi="मुंबई, भारत">Mumbai, India</span>
                        </div>
                        <div class="profile-stats">
                            <div class="stat" onclick="showStatModal('posts')">
                                <div class="stat-number" id="user-posts-count">247</div>
                                <div class="stat-label" data-en="Verses" data-hi="वर्स">Verses</div>
                            </div>
                            <div class="stat" onclick="showStatModal('synced')">
                                <div class="stat-number" id="user-synced-count">1.2K</div>
                                <div class="stat-label" data-en="Synced" data-hi="सिंक्ड">Synced</div>
                            </div>
                            <div class="stat" onclick="showStatModal('syncing')">
                                <div class="stat-number" id="user-syncing-count">890</div>
                                <div class="stat-label" data-en="Syncing" data-hi="सिंकिंग">Syncing</div>
                            </div>
                            <div class="stat verse-coins" onclick="showVerseCoinsModal()">
                                <div class="stat-number" id="user-versecoins">2,500</div>
                                <div class="stat-label" data-en="VerseCoins" data-hi="वर्सकॉइन">VerseCoins</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="profile-tabs">
                <button class="tab-btn active" onclick="showProfileTab('posts')" data-en="Verses" data-hi="वर्स">Verses</button>
                <button class="tab-btn" onclick="showProfileTab('reels')" data-en="Reels" data-hi="रील्स">Reels</button>
                <button class="tab-btn" onclick="showProfileTab('saved')" data-en="Saved" data-hi="सेव्ड">Saved</button>
                <button class="tab-btn" onclick="showProfileTab('tagged')" data-en="Tagged" data-hi="टैग्ड">Tagged</button>
            </div>
            
            <div class="profile-content">
                <div class="profile-posts" id="profile-posts-grid">
                    <!-- Profile posts will be loaded here -->
                </div>
            </div>
        </div>
    </div>

    <!-- Explore Page -->
    <div id="explore-page" class="page">
        <div class="explore-container">
            <div class="explore-header">
                <h2 data-en="Explore BharatVerse" data-hi="भारतवर्स एक्सप्लोर करें">Explore BharatVerse</h2>
                <div class="explore-search">
                    <i class="fas fa-search"></i>
                    <input type="text" placeholder="Search posts, people, hashtags..." id="explore-search" data-placeholder-en="Search posts, people, hashtags..." data-placeholder-hi="पोस्ट, लोग, हैशटैग खोजें...">
                </div>
            </div>

            <div class="explore-categories">
                <button class="category-btn active" onclick="filterExplore('all')" data-en="For You" data-hi="आपके लिए">For You</button>
                <button class="category-btn" onclick="filterExplore('cricket')" data-en="Cricket" data-hi="क्रिकेट">Cricket</button>
                <button class="category-btn" onclick="filterExplore('bollywood')" data-en="Bollywood" data-hi="बॉलीवुड">Bollywood</button>
                <button class="category-btn" onclick="filterExplore('tech')" data-en="Tech" data-hi="टेक">Tech</button>
                <button class="category-btn" onclick="filterExplore('music')" data-en="Music" data-hi="संगीत">Music</button>
                <button class="category-btn" onclick="filterExplore('food')" data-en="Food" data-hi="खाना">Food</button>
                <button class="category-btn" onclick="filterExplore('travel')" data-en="Travel" data-hi="यात्रा">Travel</button>
            </div>
            
            <div class="explore-grid" id="explore-grid">
                <!-- Explore content will be loaded here -->
            </div>
        </div>
    </div>

    <!-- Voice Recording Modal -->
    <div id="voice-modal" class="modal">
        <div class="modal-content">
            <div class="voice-recording">
                <div class="voice-animation" id="voice-animation">
                    <div class="voice-circle"></div>
                    <div class="voice-waves">
                        <div class="wave"></div>
                        <div class="wave"></div>
                        <div class="wave"></div>
                    </div>
                </div>
                <div class="voice-timer" id="voice-timer">00:00</div>
                <div class="voice-actions">
                    <button class="voice-btn cancel" onclick="cancelVoiceRecording()">
                        <i class="fas fa-times"></i>
                    </button>
                    <button class="voice-btn record" onclick="toggleVoiceRecording()" id="voice-record-toggle">
                        <i class="fas fa-microphone"></i>
                    </button>
                    <button class="voice-btn send" onclick="sendVoiceMessage()">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Edit Profile Modal -->
    <div id="edit-profile-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3 data-en="Edit Profile" data-hi="प्रोफाइल एडिट करें">Edit Profile</h3>
                <button class="close-btn" onclick="closeEditProfile()">&times;</button>
            </div>
            <div class="edit-profile-form">
                <div class="form-group">
                    <label data-en="Display Name" data-hi="प्रदर्शन नाम">Display Name</label>
                    <input type="text" id="edit-name" placeholder="Your display name" data-placeholder-en="Your display name" data-placeholder-hi="आपका प्रदर्शन नाम">
                </div>
                <div class="form-group">
                    <label data-en="Username" data-hi="उपयोगकर्ता नाम">Username</label>
                    <input type="text" id="edit-username" placeholder="@username" data-placeholder-en="@username" data-placeholder-hi="@उपयोगकर्तानाम">
                </div>
                <div class="form-group">
                    <label data-en="Bio" data-hi="बायो">Bio</label>
                    <textarea id="edit-bio" placeholder="Tell people about yourself..." maxlength="150" data-placeholder-en="Tell people about yourself..." data-placeholder-hi="लोगों को अपने बारे में बताएं..."></textarea>
                    <div class="char-count"><span id="bio-char-count">0</span>/150</div>
                </div>
                <div class="form-group">
                    <label data-en="Location" data-hi="स्थान">Location</label>
                    <input type="text" id="edit-location" placeholder="Your location" data-placeholder-en="Your location" data-placeholder-hi="आपका स्थान">
                </div>
                <div class="form-actions">
                    <button class="btn btn-secondary" onclick="closeEditProfile()" data-en="Cancel" data-hi="रद्द करें">Cancel</button>
                    <button class="btn btn-primary" onclick="saveProfile()" data-en="Save Changes" data-hi="बदलाव सेव करें">Save Changes</button>
                </div>
            </div>
        </div>
    </div>

    <!-- File input for media uploads -->
    <input type="file" id="photo-input" accept="image/*" style="display: none;" onchange="handlePhotoUpload(event)">
    <input type="file" id="video-input" accept="video/*" style="display: none;" onchange="handleVideoUpload(event)">

    <script src="app.js"></script>
</body>
</html>
