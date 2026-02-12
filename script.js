// Create floating hearts in background
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.hearts-background');
    const heartEmojis = ['💖', '💕', '💗', '💓', '💝', '💞', '💟', '❤️'];
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (10 + Math.random() * 10) + 's';
        heartsContainer.appendChild(heart);
    }
}

// Create heart rain effect
function createHeartRain() {
    const heartRain = document.getElementById('heartRain');
    const heartEmojis = ['💖', '💕', '💗', '💓', '💝', '💞', '❤️'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart-particle';
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (2 + Math.random() * 2) + 's';
            heart.style.fontSize = (20 + Math.random() * 20) + 'px';
            heartRain.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 3000);
        }, i * 100);
    }
}

// Kiss button click handler
document.getElementById('kissBtn').addEventListener('click', function() {
    // Create burst of hearts
    createHeartBurst();
    
    // Animate kiss emoji
    const kiss = document.querySelector('.kiss');
    kiss.style.animation = 'none';
    setTimeout(() => {
        kiss.style.animation = 'kissAnimation 0.5s ease-in-out';
    }, 10);
    
    // Create floating hearts around button
    createButtonHearts(this);
    
    // Play sound effect (optional - browser may require user interaction)
    playKissSound();
});

// Create heart burst effect
function createHeartBurst() {
    const button = document.getElementById('kissBtn');
    const rect = button.getBoundingClientRect();
    const heartEmojis = ['💋', '💖', '💕', '💗', '💓', '💝', '💞', '❤️'];
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = (rect.left + rect.width / 2) + 'px';
        heart.style.top = (rect.top + rect.height / 2) + 'px';
        heart.style.position = 'fixed';
        heart.style.animation = `heartBurst ${1 + Math.random()}s ease-out forwards`;
        heart.style.fontSize = (25 + Math.random() * 15) + 'px';
        
        const angle = (Math.PI * 2 * i) / 15;
        const distance = 100 + Math.random() * 50;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;
        
        heart.style.setProperty('--end-x', endX + 'px');
        heart.style.setProperty('--end-y', endY + 'px');
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 1000);
    }
}

// Add CSS animation for heart burst
const style = document.createElement('style');
style.textContent = `
    @keyframes heartBurst {
        0% {
            transform: translate(0, 0) scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(var(--end-x, 0), var(--end-y, 0)) scale(1) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Create hearts around button
function createButtonHearts(button) {
    const rect = button.getBoundingClientRect();
    const heartEmojis = ['💖', '💕', '💗'];
    
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = (rect.left + rect.width / 2) + 'px';
        heart.style.top = (rect.top + rect.height / 2) + 'px';
        heart.style.position = 'fixed';
        heart.style.animation = `buttonHeartFloat ${2}s ease-out forwards`;
        heart.style.fontSize = '20px';
        
        const angle = (Math.PI * 2 * i) / 8;
        const distance = 80;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance - 30;
        
        heart.style.setProperty('--end-x', endX + 'px');
        heart.style.setProperty('--end-y', endY + 'px');
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 2000);
    }
}

// Add CSS animation for button hearts
const buttonStyle = document.createElement('style');
buttonStyle.textContent += `
    @keyframes buttonHeartFloat {
        0% {
            transform: translate(0, 0) scale(0);
            opacity: 1;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translate(var(--end-x, 0), var(--end-y, 0)) scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(buttonStyle);

// Play kiss sound (using Web Audio API for a simple beep)
function playKissSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
        // Silently fail if audio context is not available
    }
}

// Continuous floating hearts
function createContinuousFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    const heartEmojis = ['💖', '💕', '💗', '💓', '💝', '💞'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (15 + Math.random() * 10) + 's';
        container.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 25000);
    }, 2000);
}

// Initialize on page load
window.addEventListener('load', () => {
    createFloatingHearts();
    createContinuousFloatingHearts();
    
    // Initial heart rain
    setTimeout(() => {
        createHeartRain();
    }, 1000);
    
    // Periodic heart rain
    setInterval(() => {
        createHeartRain();
    }, 8000);
});

// Add parallax effect on mouse move
document.addEventListener('mousemove', (e) => {
    const kiss = document.querySelector('.kiss');
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    
    kiss.style.transform = `translate(${x}px, ${y}px)`;
});

// Reset transform on mouse leave
document.addEventListener('mouseleave', () => {
    const kiss = document.querySelector('.kiss');
    kiss.style.transform = 'translate(0, 0)';
});

