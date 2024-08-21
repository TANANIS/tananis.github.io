document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    const backToTopButton = document.createElement('button');

    // 當滑鼠懸停時展開導航欄
    nav.addEventListener('mouseover', () => {
        nav.classList.add('expanded');
    });

    // 當滑鼠移開時縮回導航欄
    nav.addEventListener('mouseout', () => {
        nav.classList.remove('expanded');
    });

    // 滾動到指定位置的平滑效果
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // 創建一個回到頂部的按鈕
    backToTopButton.textContent = '回到頂部';
    backToTopButton.classList.add('back-to-top');
    document.body.appendChild(backToTopButton);

    backToTopButton.addEventListener('click', scrollToTop);

    // 顯示/隱藏回到頂部按鈕
    const handleBackToTopButtonVisibility = () => {
        if (window.scrollY > window.innerHeight) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', handleBackToTopButtonVisibility);

    // 段落放大效果
    const paragraphs = document.querySelectorAll('section[id^="paragraph"]');

    const handleParagraphZoom = () => {
        paragraphs.forEach(paragraph => {
            const rect = paragraph.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            if (rect.top < viewportHeight * 0.8 && rect.bottom > 0) { // 段落進入視窗
                paragraph.classList.add('zoom');
            } else {
                paragraph.classList.remove('zoom');
            }
        });
    };

    window.addEventListener('scroll', handleParagraphZoom);
    handleParagraphZoom(); // 初始化檢查
});
