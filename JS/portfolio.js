//懶讀取
document.addEventListener("DOMContentLoaded", function () {
  const allImages = document.querySelectorAll("img");

  allImages.forEach((img) => {
    const src = img.getAttribute("src");
    if (src && (src.endsWith(".jpg") || src.endsWith(".png"))) {
      img.setAttribute("data-src", src);
      img.removeAttribute("src");
      img.classList.add("lazyload");
    }
  });

  // 懶加載的處理函數
  const lazyLoad = (image) => {
    const src = image.getAttribute("data-src");
    if (src) {
      image.src = src;
      image.classList.remove("lazyload");
      console.log(`Loading image: ${src}`);  // 日誌輸出
    }
  };

  const imgOptions = {
    threshold: 0,
    rootMargin: "0px 0px 256px 0px",
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          lazyLoad(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, imgOptions);

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

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  const navLinks = document.querySelectorAll("nav ul li a");

  // Modal 部分
  const modal = document.getElementById("modal");
  const modalImage = document.getElementById("modal-image");
  const caption = document.getElementById("caption");
  const closeBtn = document.querySelector(".close");

  // 處理導航欄展開和縮回
  nav.addEventListener("mouseover", () => nav.classList.add("expanded"));
  nav.addEventListener("mouseout", () => nav.classList.remove("expanded"));

  // 處理作品集圖片的懸停效果
  portfolioItems.forEach((item) => {
    item.addEventListener("mouseover", () => {
      item.querySelector("img").style.transform = "scale(1.1)";
      item.querySelector(".portfolio-description").style.opacity = "1";
      item.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.3)";
    });
    item.addEventListener("mouseout", () => {
      item.querySelector("img").style.transform = "scale(1)";
      item.querySelector(".portfolio-description").style.opacity = "0";
      item.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
    });

    // 點擊圖片顯示 Modal
    item.querySelector("img").addEventListener("click", () => {
      modal.style.display = "block"; // 顯示 Modal
      modalImage.src = item.querySelector("img").src; // 設置 Modal 圖片源
      caption.textContent = item.querySelector("img").alt; // 設置圖片標題
    });
  });

  // 點擊關閉按鈕關閉 Modal
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // 點擊 Modal 外部區域也能關閉 Modal
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // 平滑滾動到指定部分並添加縮放效果
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        event.preventDefault(); // 防止默認行為
        targetElement.scrollIntoView({ behavior: "smooth" }); // 平滑滾動到目標部分

        // 添加縮放效果
        targetElement.style.transition = "transform 0.3s ease";
        targetElement.style.transform = "scale(1.05)";
        setTimeout(() => {
          targetElement.style.transform = "scale(1)"; // 恢復原始大小
        }, 300); // 縮放效果持續時間
      }
    });
  });
});
