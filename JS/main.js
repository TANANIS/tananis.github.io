// 當文檔內容加載完成時執行
document.addEventListener("DOMContentLoaded", function () {
  // 選擇頁面上所有的圖片元素
  const allImages = document.querySelectorAll("img");

  // 遍歷每個圖片元素
  allImages.forEach((img) => {
    // 獲取圖片的 src 屬性
    const src = img.getAttribute("src");

    // 如果 src 存在並且是 JPG 或 PNG 圖片
    if (src && (src.endsWith(".jpg") || src.endsWith(".png"))) {
      // 將 src 屬性的值設置到 data-src 屬性中，並刪除 src 屬性
      img.setAttribute("data-src", src);
      img.removeAttribute("src");
      // 添加 lazyload 類以應用懶加載樣式
      img.classList.add("lazyload");
    }
  });

  // 懶加載的處理函數
  const lazyLoad = (image) => {
    // 獲取圖片的 data-src 屬性
    const src = image.getAttribute("data-src");
    if (src) {
      // 設置圖片的 src 屬性並移除 lazyload 類
      image.src = src;
      image.classList.remove("lazyload");
      console.log(`Loading image: ${src}`); // 日誌輸出
    }
  };

  // 設置 IntersectionObserver 的選項
  const imgOptions = {
    threshold: 0, // 圖片進入視口的閾值
    rootMargin: "0px 0px 256px 0px", // 視口邊緣的額外空間
  };

  // 檢查瀏覽器是否支持 IntersectionObserver
  if ("IntersectionObserver" in window) {
    // 創建 IntersectionObserver 實例
    const observer = new IntersectionObserver((entries, observer) => {
      // 遍歷觀察到的條目
      entries.forEach((entry) => {
        // 如果條目進入視口
        if (entry.isIntersecting) {
          // 調用 lazyLoad 函數加載圖片
          lazyLoad(entry.target);
          // 停止觀察該條目
          observer.unobserve(entry.target);
        }
      });
    }, imgOptions);
    // 觀察所有帶有 lazyload 類的圖片
    document.querySelectorAll("img.lazyload").forEach((image) => {
      observer.observe(image);
    });
  } else {
    // 無 IntersectionObserver 支持的情況下，直接加載圖片
    document.querySelectorAll("img.lazyload").forEach((image) => {
      lazyLoad(image);
    });
  }
});

// 開啟懸浮視窗
document.getElementById("openModalBtn").addEventListener("click", () => {
  document.getElementById("authModal").style.display = "block";
});

// 關閉懸浮視窗
function closeModal() {
  document.getElementById("authModal").style.display = "none";
}

// 顯示註冊表單
function showRegisterForm() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registerForm").style.display = "block";
}

// 顯示登入表單
function showLoginForm() {
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("registerForm").style.display = "none";
}

window.addEventListener("load", () => {
  const modal = document.getElementById("welcome-modal"); //顯示Hello World視窗
  const closeBtn = document.querySelector(".close-btn"); // 關閉按鈕
  const titleElement = document.getElementById("modal-title"); // 使用 ID 選擇器
  const paragraphElement = document.querySelector(".modal-text"); // 使用類別選擇器

  // 打字機效果函數
  function typeWriter(element, text, i = 0, speed = 50) {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(() => typeWriter(element, text, i, speed), speed);
    }
  }

  // 開始打字效果
  typeWriter(titleElement, '"Hello World!_"', 0, 100); // 打字效果速度可以調整
  setTimeout(() => {
    typeWriter(paragraphElement, '"歡迎來到Tana的個人學習網站！_"', 0, 80);
  }, 2000); // 文字出現延遲時間，根據需要調整
});

document.addEventListener("DOMContentLoaded", () => {
  // 導航欄展開與縮回
  const nav = document.querySelector("nav");

  // 當滑鼠懸停時展開導航欄
  nav.addEventListener("mouseover", () => {
    nav.classList.add("expanded");
  });

  // 當滑鼠移開時縮回導航欄
  nav.addEventListener("mouseout", () => {
    nav.classList.remove("expanded");
  });

  // 精選區域滾動效果
  // 通用滾動效果函式
  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight * 0.8) {
      section.classList.add("visible");
    }
  };

  // 初始化檢查和添加滾動事件監聽器
  const initScrollEffects = () => {
    // 區域 ID 列表
    const sections = ["featured", "news"];

    // 監聽滾動事件
    window.addEventListener("scroll", () => {
      sections.forEach(handleScroll);
    });

    // 初始化檢查
    sections.forEach(handleScroll);
  };

  // 執行初始化
  initScrollEffects();

  // 載入響應式樣式表
  const loadResponsiveStylesheet = () => {
    const stylesheet = document.getElementById("mobileStyle");
    // 檢查樣式表是否存在
    if (stylesheet) {
      if (window.innerWidth <= 768) {
        stylesheet.setAttribute("href", "css/mobileStyle.css");
      } else {
        // 不進行任何操作，以保持預設樣式
        stylesheet.removeAttribute("href"); // 可選：移除響應式樣式表
      }
    } else {
      console.error("Stylesheet with id 'mobileStyle' not found.");
    }
  };

  // 初始化
  loadResponsiveStylesheet();

  // 監聽窗口大小變化以重新加載樣式表
  window.addEventListener("resize", loadResponsiveStylesheet);

  // 卡片翻頁功能
  const cards = document.querySelectorAll(".card");
  let currentIndex = 0;

  // 更新卡片的顯示狀態
  const updateCards = () => {
    cards.forEach((card, index) => {
      card.classList.toggle("active", index === currentIndex);
      card.classList.toggle("inactive", index !== currentIndex);
      card.style.transform =
        index === currentIndex
          ? "translateX(0)"
          : index < currentIndex
          ? "translateX(-100%)"
          : "translateX(100%)";
    });
  };

  // 處理下一張卡片的顯示
  document.getElementById("next-button").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCards();
  });

  // 處理上一張卡片的顯示
  document.getElementById("prev-button").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCards();
  });

  // 初始化顯示
  updateCards();

  // 自動輪播（可選，設定每隔 10 秒自動切換）
  setInterval(() => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCards();
  }, 10000);

  // WELCOME 區域放大效果
  const welcomeSection = document.getElementById("welcome");
  const welcomeCards = document.querySelectorAll(".welcome-card");
  const welcomeImages = document.querySelectorAll(".welcome-image");

  // 當滑鼠移動到 WELCOME 區域時放大卡片和圖片
  welcomeSection.addEventListener("mouseover", () => {
    welcomeCards.forEach((card) => card.classList.add("scale-up"));
    welcomeImages.forEach((img) => img.classList.add("scale-up"));
  });

  // 當滑鼠移開時恢復卡片和圖片的大小
  welcomeSection.addEventListener("mouseout", () => {
    welcomeCards.forEach((card) => card.classList.remove("scale-up"));
    welcomeImages.forEach((img) => img.classList.remove("scale-up"));
  });
});

//留言/回覆留言功能
(function () {
  // 假設我們已經有一個存儲留言的數組
  const comments = [];

  // 發佈留言
  window.postComment = function () {
    const name = document.getElementById("commentName").value.trim();
    const text = document.getElementById("commentText").value.trim();

    if (name && text) {
      const comment = { name, text, replies: [] };
      comments.push(comment);
      renderComments();
      document.getElementById("commentName").value = "";
      document.getElementById("commentText").value = "";
    } else {
      alert("請填寫姓名和留言內容！");
    }
  };

  // 回覆留言
  window.replyComment = function (index, replyText) {
    if (replyText) {
      comments[index].replies.push(replyText);
      renderComments();
    } else {
      alert("請填寫回覆內容！");
    }
  };

  // 渲染留言
  function renderComments() {
    const commentList = document.querySelector(".comment-list");
    commentList.innerHTML = "";

    comments.forEach((comment, index) => {
      const commentCard = document.createElement("div");
      commentCard.className = "comment-card";

      commentCard.innerHTML = `
        <div class="comment-header">
          <span>${comment.name}</span>
          <button class="reply-button" onclick="toggleReplyForm(${index})">回覆</button>
          <span>回覆 (${comment.replies.length})</span>
        </div>
        <div class="comment-text">${comment.text}</div>
        <div class="reply-form-container ${
          comment.replies.length ? "visible" : ""
        }">
          <textarea class="reply-textarea" placeholder="回覆留言..."></textarea>
          <button class="reply-submit-button" onclick="replyComment(${index}, this.previousElementSibling.value)">發佈回覆</button>
          ${comment.replies
            .map((reply) => `<div class="reply-text">- ${reply}</div>`)
            .join("")}
        </div>
      `;

      commentList.appendChild(commentCard);
    });
  }

  // 顯示/隱藏回覆表單
  window.toggleReplyForm = function (index) {
    const replyFormContainer = document.querySelector(
      `.comment-card:nth-child(${index + 1}) .reply-form-container`
    );
    replyFormContainer.classList.toggle("visible");
  };
})();

//慶祝按鈕
document.getElementById("celebrate-btn").addEventListener("click", (event) => {
  const celebrateContainer = document.getElementById("celebrate"); // 取得紙雪容器
  const numPieces = 1600; // 控制紙雪數量

  const buttonRect = event.target.getBoundingClientRect(); // 按鈕的位置信息
  const buttonCenterX = buttonRect.left + buttonRect.width / 2; // 按鈕中心位置
  const buttonCenterY = buttonRect.top + buttonRect.height / 2; // 按鈕中心位置

  for (let i = 0; i < numPieces; i++) {
    const celebratePiece = document.createElement("div");
    celebratePiece.className = "celebrate-piece"; // 設定紙雪類別
    celebratePiece.style.backgroundColor = getRandomColor();
    celebratePiece.style.width = `${Math.random() * 10 + 5}px`; // 設定紙雪大小
    celebratePiece.style.height = celebratePiece.style.width;
    celebratePiece.style.position = "absolute"; // 設定紙雪位置 = 絕對定位
    celebratePiece.style.left = `${buttonCenterX}px`; // 設定紙雪位置 = 按鈕中心
    celebratePiece.style.top = `${buttonCenterY}px`;
    celebratePiece.style.transform = "translate(-50%, -50%)"; // 初始位置對齊
    celebratePiece.style.opacity = 0; // 初始不透明度 = 0

    celebrateContainer.appendChild(celebratePiece); // 將紙雪加入容器

    // Animation
    setTimeout(() => {
      const randomAngle = Math.random() * 360;
      const randomDistance = Math.random() * 2000 + 600; // 擴大分佈範圍
      celebratePiece.style.transition =
        "transform 3s ease-out, opacity 4s ease-out"; // 增加動畫持續時間
      celebratePiece.style.transform = `translate(-50%, -50%) translate(${
        Math.cos(randomAngle) * randomDistance
      }px, ${Math.sin(randomAngle) * randomDistance}px)`; // 紙雪移動
      celebratePiece.style.opacity = 1; // 紙雪透明度

      // Make it fall down
      setTimeout(() => {
        celebratePiece.style.transition =
          "transform 4s ease-in, opacity 3s ease-in"; // 往下掉落的過渡
        celebratePiece.style.transform = `translate(-50%, -50%) translate(${
          Math.cos(randomAngle) * randomDistance
        }px, ${Math.sin(randomAngle) * randomDistance}px) translateY(${
          window.innerHeight
        }px)`; // 向下移動
      }, 2000);
    }, 10);

    // Remove piece after animation
    setTimeout(() => {
      celebratePiece.style.opacity = 0; // Fade out effect
      setTimeout(() => {
        celebratePiece.remove();
      }, 3000); // 延長刪除延遲，以便完成動畫
    }, 3000);
  }
});

function getRandomColor() {
  // 取得隨機顏色
  const letters = "0123456789ABCDEF"; // 十六進位字母
  let color = "#";
  for (let i = 0; i < 6; i++) {
    // 產生六位顏色碼
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
