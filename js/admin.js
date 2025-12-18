// Admin Panel JavaScript
// 기본 관리자 계정 (실제 운영시 반드시 변경하세요!)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'moclock2024!' // 반드시 변경하세요!
};

// LocalStorage Keys
const STORAGE_KEYS = {
    isLoggedIn: 'moclock_admin_logged_in',
    currentUser: 'moclock_admin_user',
    siteConfig: 'moclock_site_config'
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    initializeEventListeners();
    loadSavedConfig();
});

// Check Login Status
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem(STORAGE_KEYS.isLoggedIn);
    const currentUser = localStorage.getItem(STORAGE_KEYS.currentUser);

    if (isLoggedIn === 'true' && currentUser) {
        showDashboard(currentUser);
    } else {
        showLoginScreen();
    }
}

// Show Login Screen
function showLoginScreen() {
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('admin-dashboard').style.display = 'none';
}

// Show Dashboard
function showDashboard(username) {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-dashboard').style.display = 'grid';
    document.getElementById('current-user').textContent = username;
}

// Event Listeners
function initializeEventListeners() {
    // Login Form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Logout Button
    const logoutBtn = document.getElementById('btn-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Sidebar Navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionName = this.getAttribute('data-section');
            switchSection(sectionName);
        });
    });

    // Form Inputs - Auto Save
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('change', autoSaveConfig);
    });
}

// Handle Login
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('remember-me').checked;
    const errorMessage = document.getElementById('login-error');

    // Validate Credentials
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Success
        if (rememberMe) {
            localStorage.setItem(STORAGE_KEYS.isLoggedIn, 'true');
            localStorage.setItem(STORAGE_KEYS.currentUser, username);
        } else {
            sessionStorage.setItem(STORAGE_KEYS.isLoggedIn, 'true');
            sessionStorage.setItem(STORAGE_KEYS.currentUser, username);
        }

        showDashboard(username);
        
        // Reset form
        document.getElementById('login-form').reset();
        errorMessage.classList.remove('show');
    } else {
        // Failed
        errorMessage.textContent = '아이디 또는 비밀번호가 올바르지 않습니다.';
        errorMessage.classList.add('show');
        
        // Shake animation
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 3000);
    }
}

// Handle Logout
function handleLogout() {
    if (confirm('로그아웃하시겠습니까?')) {
        localStorage.removeItem(STORAGE_KEYS.isLoggedIn);
        localStorage.removeItem(STORAGE_KEYS.currentUser);
        sessionStorage.removeItem(STORAGE_KEYS.isLoggedIn);
        sessionStorage.removeItem(STORAGE_KEYS.currentUser);
        
        showLoginScreen();
    }
}

// Switch Section
function switchSection(sectionName) {
    // Update nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

    // Update sections
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(`section-${sectionName}`).classList.add('active');
}

// Load Saved Config
function loadSavedConfig() {
    const savedConfig = localStorage.getItem(STORAGE_KEYS.siteConfig);
    
    if (savedConfig) {
        try {
            const config = JSON.parse(savedConfig);
            
            // Populate form fields
            for (const [key, value] of Object.entries(config)) {
                const input = document.getElementById(key);
                if (input) {
                    input.value = value;
                }
            }
        } catch (error) {
            console.error('Failed to load config:', error);
        }
    }
}

// Auto Save Config
function autoSaveConfig() {
    const config = {};
    const formInputs = document.querySelectorAll('.form-control');
    
    formInputs.forEach(input => {
        if (input.id && input.value) {
            config[input.id] = input.value;
        }
    });

    localStorage.setItem(STORAGE_KEYS.siteConfig, JSON.stringify(config));
}

// Save SEO Settings
function saveSEO() {
    const title = document.getElementById('meta-title').value;
    const description = document.getElementById('meta-description').value;
    const keywords = document.getElementById('meta-keywords').value;

    if (!title || !description) {
        alert('제목과 설명은 필수 항목입니다.');
        return;
    }

    const config = {
        title,
        description,
        keywords
    };

    // Generate JSON file
    const dataStr = JSON.stringify(config, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    showNotification('SEO 설정이 저장되었습니다.', 'success');
    autoSaveConfig();
    
    // Show instructions
    showUpdateInstructions('seo');
}

// Save Location Info
function saveLocation() {
    const address = document.getElementById('address').value;
    const subwayLine = document.getElementById('subway-line').value;
    const subwayStation = document.getElementById('subway-station').value;
    const exitNumber = document.getElementById('exit-number').value;
    const walkTime = document.getElementById('walk-time').value;
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;

    if (!address || !subwayStation) {
        alert('주소와 역 이름은 필수 항목입니다.');
        return;
    }

    const config = {
        address,
        addressDetail: document.getElementById('address-detail').value,
        subway: {
            line: subwayLine,
            station: subwayStation,
            exit: exitNumber,
            walkTime: walkTime
        },
        coordinates: {
            latitude,
            longitude
        }
    };

    showNotification('위치 정보가 저장되었습니다.', 'success');
    autoSaveConfig();
    showUpdateInstructions('location');
}

// Save Contact Info
function saveContact() {
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    if (!phone || !email) {
        alert('전화번호와 이메일은 필수 항목입니다.');
        return;
    }

    const config = {
        phone,
        phoneIntl: document.getElementById('phone-intl').value,
        email,
        kakao: document.getElementById('kakao').value
    };

    showNotification('연락처 정보가 저장되었습니다.', 'success');
    autoSaveConfig();
    showUpdateInstructions('contact');
}

// Save Business Hours
function saveHours() {
    const config = {
        weekday: {
            open: document.getElementById('weekday-open').value,
            close: document.getElementById('weekday-close').value
        },
        weekend: {
            open: document.getElementById('weekend-open').value,
            close: document.getElementById('weekend-close').value
        },
        holiday: document.getElementById('holiday-notice').value
    };

    showNotification('영업시간이 저장되었습니다.', 'success');
    autoSaveConfig();
    showUpdateInstructions('hours');
}

// Save Social Media
function saveSocial() {
    const config = {
        instagram: document.getElementById('instagram').value,
        facebook: document.getElementById('facebook').value,
        naver: document.getElementById('naver').value,
        googleMaps: document.getElementById('google-maps').value
    };

    showNotification('소셜 미디어 정보가 저장되었습니다.', 'success');
    autoSaveConfig();
    showUpdateInstructions('social');
}

// Download Config
function downloadConfig() {
    const config = {};
    const formInputs = document.querySelectorAll('.form-control');
    
    formInputs.forEach(input => {
        if (input.id && input.value) {
            config[input.id] = input.value;
        }
    });

    const dataStr = JSON.stringify(config, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `moclock-config-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    showNotification('설정 파일이 다운로드되었습니다.', 'success');
}

// Show Notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 30px;
        background: ${type === 'success' ? '#48bb78' : '#f56565'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideInRight 0.4s ease;
        font-weight: 500;
    `;
    notification.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 400);
    }, 3000);
}

// Show Update Instructions
function showUpdateInstructions(section) {
    const instructions = {
        seo: 'index.html 파일의 메타 태그를 수동으로 업데이트해주세요.',
        location: 'index.html과 translations.js 파일의 위치 정보를 업데이트해주세요.',
        contact: 'index.html 파일의 연락처 정보를 업데이트해주세요.',
        hours: 'translations.js 파일의 영업시간을 업데이트해주세요.',
        social: 'index.html 푸터 섹션의 소셜 미디어 링크를 업데이트해주세요.'
    };

    const message = instructions[section] || '파일을 직접 수정해주세요.';
    
    setTimeout(() => {
        if (confirm(`${message}\n\n다운로드한 JSON 파일을 참고하여 수정하시겠습니까?`)) {
            downloadConfig();
        }
    }, 500);
}

// CSS Animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);
