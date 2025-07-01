// スクロールインジケーターのスムーズスクロール
document.querySelector('.scroll-indicator').addEventListener('click', function() {
    document.getElementById('concept').scrollIntoView({ behavior: 'smooth' });
});

// ナビゲーションのスムーズスクロール
document.querySelectorAll('.nav-menu a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// スクロールアニメーション
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// コンセプトアイテムのアニメーション
document.querySelectorAll('.concept-item').forEach(item => {
    observer.observe(item);
});

// スクロール連動エフェクト
let ticking = false;
function updateOnScroll() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            updateElements();
            ticking = false;
        });
        ticking = true;
    }
}

function updateElements() {
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // パララックス効果
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    // フローティングポケット
    const floatingPocket = document.querySelector('.floating-pocket');
    if (floatingPocket) {
        floatingPocket.style.transform = `translateY(${scrolled * -0.3}px) rotate(${scrolled * 0.1}deg)`;
    }
    
    // ナビゲーションの背景
    const navbar = document.querySelector('.navbar');
    if (scrolled > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
}

window.addEventListener('scroll', updateOnScroll);

// ツールカードのアニメーション
const toolCards = document.querySelectorAll('.tool-card');
const toolObserver = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
}, {
    threshold: 0.2
});

toolCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.8s ease';
    toolObserver.observe(card);
});

// ケーススタディのアニメーション
const caseStudies = document.querySelectorAll('.case-study');
const caseObserver = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, index * 150);
        }
    });
}, {
    threshold: 0.1
});

caseStudies.forEach(study => {
    study.style.opacity = '0';
    study.style.transform = 'translateY(30px) scale(0.95)';
    study.style.transition = 'all 0.6s ease';
    caseObserver.observe(study);
});

// 数値のカウントアップアニメーション
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        if (element.dataset.format === 'percentage') {
            element.textContent = Math.floor(progress * (end - start) + start) + '%';
        } else if (element.dataset.format === 'decimal') {
            element.textContent = (progress * (end - start) + start).toFixed(1);
        } else if (element.dataset.format === 'time') {
            element.textContent = (progress * (end - start) + start).toFixed(1) + '秒';
        } else if (element.dataset.format === 'multiplier') {
            element.textContent = (progress * (end - start) + start).toFixed(1) + '倍';
        } else {
            element.textContent = Math.floor(progress * (end - start) + start);
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// 統計数値のアニメーション
const statNumbers = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const text = entry.target.textContent;
            let end = 0;
            let format = '';
            
            if (text.includes('%')) {
                end = parseFloat(text);
                entry.target.dataset.format = 'percentage';
            } else if (text.includes('秒')) {
                end = parseFloat(text);
                entry.target.dataset.format = 'time';
            } else if (text.includes('倍')) {
                end = parseFloat(text);
                entry.target.dataset.format = 'multiplier';
            } else if (text.includes('.')) {
                end = parseFloat(text);
                entry.target.dataset.format = 'decimal';
            } else {
                end = parseInt(text);
            }
            
            animateValue(entry.target, 0, end, 2000);
        }
    });
}, {
    threshold: 0.5
});

statNumbers.forEach(stat => {
    statObserver.observe(stat);
});

// 結果数値のアニメーション
const resultNumbers = document.querySelectorAll('.result-number');
resultNumbers.forEach(result => {
    const text = result.textContent;
    if (text.includes('%')) {
        result.dataset.format = 'percentage';
    } else if (text.includes('倍')) {
        result.dataset.format = 'multiplier';
    } else if (text.includes('日')) {
        result.dataset.format = 'days';
    }
    statObserver.observe(result);
});

// ページロード時のアニメーション
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // ヒーローセクションのエレメントを順番にフェードイン
    const heroElements = document.querySelectorAll('.hero-title span, .hero-subtitle, .scroll-indicator');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
        }, index * 200);
    });
});

// マウス追従エフェクト（デスクトップのみ）
if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        const aiParticles = document.querySelector('.ai-particles');
        if (aiParticles) {
            aiParticles.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
        }
    });
}