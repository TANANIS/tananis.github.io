// 平滑滾動到指定元素的函數
function smoothScrollTo(element, duration) {
    if (!element) return;
    
    const start = window.scrollY;
    const end = element.getBoundingClientRect().top + window.scrollY;
    const distance = end - start;
    const startTime = performance.now();

    function scroll(timestamp) {
        const progress = Math.min((timestamp - startTime) / duration, 1);
        window.scrollTo(0, start + distance * progress);
        if (progress < 1) {
            requestAnimationFrame(scroll);
        }
    }
    requestAnimationFrame(scroll);
}

// 搜尋函數
function searchFunction() {
    var input = document.getElementById('searchInput').value.toLowerCase();
    var elements = document.getElementsByClassName('searchable-content');
    var found = false;

    // 顯示“正在導向搜尋結果”通知
    var notification = document.getElementById('searchingNotification');
    notification.style.display = 'none'; // 初始隱藏通知

    // 移除所有元素的標記
    Array.from(elements).forEach(element => {
        element.style.display = 'none'; // 隱藏所有元素
        element.classList.remove('search-highlight'); // 移除高亮
    });

    // 搜尋匹配的內容
    for (let i = 0; i < elements.length; i++) {
        let element = elements[i];
        let content = element.innerText.toLowerCase();
        if (content.includes(input) && input !== '') {
            element.style.display = 'block'; // 顯示匹配的元素
            if (!found) {
                // 顯示通知
                notification.style.display = 'block';
                // 等待通知顯示1秒後才開始滾動
                setTimeout(() => {
                    // 確保這裡傳遞的是正確的元素
                    console.log('Scrolling to element:', element);
                    if (element) {
                        smoothScrollTo(element, 1000); // 1000毫秒的滾動時間
                    }
                }, 1000);
                // 標記匹配的元素
                element.classList.add('search-highlight');
                found = true;
            }
        }
    }

    // 隱藏通知
    if (found) {
        setTimeout(() => {
            notification.style.display = 'none';
        }, 2000); // 顯示通知2秒後隱藏
    }

    // 顯示/隱藏“沒有找到結果”訊息
    var noResults = document.getElementById('noResults');
    if (!found && input !== '') {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
    }
}

// 添加事件監聽器以處理搜尋按鈕點擊和ENTER鍵
document.getElementById('searchButton').addEventListener('click', searchFunction);
document.getElementById('searchInput').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        searchFunction();
    }
});

// 監聽滑鼠移動事件來顯示/隱藏搜尋欄和箭頭
document.addEventListener('mousemove', function(event) {
    var searchBar = document.querySelector('.search-container');
    var arrowIndicator = document.querySelector('.arrow-indicator');
    var arrowContainer = document.body; // 添加一個容器來控制整體狀態

    if (event.clientY <= 50) { // 假設上方邊緣範圍為50px
        searchBar.classList.add('visible-search-bar');
        arrowContainer.classList.add('search-bar-visible'); // 當搜尋欄顯示時修改箭頭位置
    } else {
        searchBar.classList.remove('visible-search-bar');
        arrowContainer.classList.remove('search-bar-visible'); // 當搜尋欄隱藏時重置箭頭位置
    }
});

// 當頁面加載完成後初始化箭頭提示和搜尋欄顯示邏輯
document.addEventListener("DOMContentLoaded", function() {
    const arrowIndicator = document.querySelector(".arrow-indicator");
    const searchContainer = document.querySelector(".search-container");

    // 顯示搜尋欄和箭頭
    function showSearchBar() {
        searchContainer.classList.add("visible-search-bar");
        document.body.classList.add("search-bar-visible");
    }

    // 隱藏搜尋欄和箭頭
    function hideSearchBar() {
        searchContainer.classList.remove("visible-search-bar");
        document.body.classList.remove("search-bar-visible");
    }

    // 初次顯示箭頭提示
    arrowIndicator.classList.add("visible-arrow");

    // 點擊箭頭時顯示搜尋欄
    arrowIndicator.addEventListener("click", showSearchBar);

    // 點擊搜尋欄外部時隱藏搜尋欄
    document.addEventListener("click", function(event) {
        if (!searchContainer.contains(event.target) && !arrowIndicator.contains(event.target)) {
            hideSearchBar();
        }
    });
});