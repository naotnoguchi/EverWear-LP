// DOM要素の取得
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const header = document.querySelector('.header');

// モバイルメニューの開閉
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// スクロール時のヘッダー処理
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // ヘッダーの背景変更
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // モバイルメニューを閉じる
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });
});

// FAQアコーディオンのアニメーション強化
document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    question.addEventListener('click', () => {
        // 他のFAQを閉じる
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== item && otherItem.hasAttribute('open')) {
                otherItem.removeAttribute('open');
            }
        });
    });
});

// アニメーション on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// アニメーション対象要素の監視
document.querySelectorAll('.problem-item, .feature-card, .step, .pricing-card, .impact-card').forEach(el => {
    observer.observe(el);
});

// モバイルメニュー用CSS追加
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 60px;
            right: -100%;
            width: 80%;
            max-width: 300px;
            height: calc(100vh - 60px);
            background: white;
            flex-direction: column;
            padding: 2rem;
            gap: 1.5rem;
            box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
            transition: right 0.3s ease;
            overflow-y: auto;
        }
        
        .nav-menu.active {
            right: 0;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(7px, 7px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -7px);
        }
    }
    
    .header.scrolled {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    
    /* アニメーション */
    .problem-item, .feature-card, .step, .pricing-card, .impact-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* 順番にアニメーション */
    .problem-grid .problem-item:nth-child(1) { transition-delay: 0.1s; }
    .problem-grid .problem-item:nth-child(2) { transition-delay: 0.2s; }
    .problem-grid .problem-item:nth-child(3) { transition-delay: 0.3s; }
    
    .features-grid .feature-card:nth-child(1) { transition-delay: 0.1s; }
    .features-grid .feature-card:nth-child(2) { transition-delay: 0.2s; }
    .features-grid .feature-card:nth-child(3) { transition-delay: 0.3s; }
    .features-grid .feature-card:nth-child(4) { transition-delay: 0.4s; }
    .features-grid .feature-card:nth-child(5) { transition-delay: 0.5s; }
    .features-grid .feature-card:nth-child(6) { transition-delay: 0.6s; }
    
    .steps .step:nth-child(1) { transition-delay: 0.1s; }
    .steps .step:nth-child(3) { transition-delay: 0.3s; }
    .steps .step:nth-child(5) { transition-delay: 0.5s; }
`;
document.head.appendChild(style);

// ページ読み込み完了時の処理
window.addEventListener('load', () => {
    // ローディングアニメーションなど必要に応じて追加
    document.body.classList.add('loaded');
}); 