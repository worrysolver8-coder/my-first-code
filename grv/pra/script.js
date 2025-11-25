document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const dailyQuote = document.getElementById('dailyQuote');
    const progressText = document.getElementById('progressText');
    const progressCircle = document.getElementById('progressCircle');

    // 名言リスト
    const quotes = [
        "未来を予測する最良の方法は、それを創ることだ。",
        "コミュニティは成長の心臓部。共創が新しい世界を開く。",
        "小さな一歩が、偉大なNFTコレクションへの道。",
        "コードは魔法。バイブコーディングで世界を便利に。",
        "今日という日は、残りの人生の最初の日。",
        "一人で見る夢はただの夢、みんなで見る夢は現実になる。"
    ];

    // 今日の名言を表示
    function setDailyQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        dailyQuote.textContent = quotes[randomIndex];
    }

    // 進捗状況の更新
    function updateProgress() {
        const totalTasks = taskList.children.length;
        const completedTasks = document.querySelectorAll('.task-item.completed').length;

        let percentage = 0;
        if (totalTasks > 0) {
            percentage = Math.round((completedTasks / totalTasks) * 100);
        }

        progressText.textContent = `${percentage}%`;

        // 円グラフのアニメーション更新 (stroke-dasharray: value, 100)
        progressCircle.setAttribute('stroke-dasharray', `${percentage}, 100`);

        // 色の変更（完了率に応じて）
        if (percentage === 100) {
            progressCircle.style.stroke = '#4caf50'; // Green
        } else if (percentage > 50) {
            progressCircle.style.stroke = '#ff9800'; // Orange
        } else {
            progressCircle.style.stroke = '#ffb347'; // Light Orange
        }
    }

    // タスクを追加する関数
    function addTask(text = null) {
        const taskText = text || taskInput.value.trim();
        if (taskText === '') return;

        const li = document.createElement('li');
        li.className = 'task-item';

        li.innerHTML = `
            <span class="task-text">${taskText}</span>
            <button class="delete-btn">削除</button>
        `;

        // タスク完了の切り替え
        li.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-btn')) return;
            li.classList.toggle('completed');
            updateProgress();
        });

        // 削除ボタンの動作
        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            li.style.opacity = '0';
            li.style.transform = 'translateX(20px)';
            setTimeout(() => {
                li.remove();
                updateProgress();
            }, 300);
        });

        taskList.appendChild(li);
        if (!text) {
            taskInput.value = '';
            taskInput.focus();
        }
        updateProgress();
    }

    // イベントリスナー
    addTaskBtn.addEventListener('click', () => addTask());

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // 初期化
    setDailyQuote();

    // サンプルタスクの追加（初回のみ）
    if (taskList.children.length === 0) {
        const dreamTasks = [
            'コミュニティのコンセプトを書き出す',
            'NFTアートのラフスケッチを描く',
            'バイブコーディングのチュートリアルを見る',
            '共創してくれる仲間を一人見つける'
        ];
        dreamTasks.forEach(text => addTask(text));
    }
});
