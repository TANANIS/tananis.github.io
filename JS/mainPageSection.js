document.querySelectorAll('.image-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.image-item').forEach(el => {
            el.classList.remove('expanded');
        });
        item.classList.add('expanded');
    });
});

window.addEventListener('scroll', function() {
    let scrollPosition = window.pageYOffset;
    document.body.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
});
const skills = [
    {
        name: "C# 編程",
        score: 3,
        description: "基於半月的自主學習，已經稍微掌握了基本的C#語法和編程概念，能夠編寫簡單的應用程式和遊戲。"
    },
    {
        name: "JavaScript",
        score: 4,
        description: "在前端開發中使用過JavaScript，能夠實現基本的互動功能和DOM操作，但還有提升空間。"
    },
    {
        name: "HTML/CSS",
        score: 5,
        description: "能夠使用HTML和CSS設計和實現靜態網站的基本布局和樣式。"
    },
    {
        name: "前端框架",
        score: 3,
        description: "對於前端框架有基本了解，但尚需進一步學習以熟練掌握框架的使用。"
    },
    {
        name: "UI/UX 設計",
        score: 3,
        description: "對UI/UX設計有一定了解，主要基於資策會課程和自學，但實戰經驗尚淺。"
    },
    {
        name: "數位行銷廣告",
        score: 7,
        description: "擁有豐富的數位行銷廣告設計經驗，能夠製作高品質的視覺圖和廣告素材。"
    }
];

let currentIndex = 0;

function updateSkillCard(index) {
    const skill = skills[index];
    const pieChart = document.getElementById('MainPieChart');
    const description = document.getElementById('MainSkillDescription');
    const skillName = document.getElementById('MainSkillName');
    const skillPercentage = document.getElementById('MainSkillPercentage');

    // 設置圓餅圖的背景顏色
    pieChart.style.background = `conic-gradient(
        #6c45a0 0% ${skill.score * 10}%, 
        #292424 ${skill.score * 10}% 100%
    )`;

    // 更新描述和技能名稱
    description.textContent = skill.description;
    skillName.textContent = skill.name;
    skillPercentage.textContent = `${skill.score * 10}%`;
}

function flipCard() {
    const cardContent = document.querySelector('.MainCardContent');
    cardContent.classList.add('flip');
    setTimeout(() => {
        cardContent.classList.remove('flip');
    }, 800); // 與CSS中的動畫時間相匹配
}

document.getElementById('MainPrevBtn').addEventListener('click', () => {
    flipCard();
    currentIndex = (currentIndex - 1 + skills.length) % skills.length;
    setTimeout(() => updateSkillCard(currentIndex), 800); // 等待動畫完成後再更新內容
});

document.getElementById('MainNextBtn').addEventListener('click', () => {
    flipCard();
    currentIndex = (currentIndex + 1) % skills.length;
    setTimeout(() => updateSkillCard(currentIndex), 800); // 等待動畫完成後再更新內容
});

// 初始化第一個技能卡片
updateSkillCard(currentIndex);
