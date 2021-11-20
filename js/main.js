'use strict';

{
  let word;
  let loc; //location
  let letters;
  let miss;
  let timeLimit;
  let startTime;
  let isPlaying = false;

  const target = document.getElementById('target');
  const lettersLabel = document.getElementById('letters');
  const missLabel = document.getElementById('miss');
  const timerLabel = document.getElementById('timer');

  const body = document.querySelector('body');


  function updateTarget() {
    let placeholder = '';

    //0~2文字目の個数（３つ）分だけアンダーバーをつくる
    for (let i = 0; i < loc; i++) {
      placeholder += '_';
    }
    target.textContent = placeholder + word.substring(loc);
    // 部分文字列を取得するsubstringで、3番目から最後までを表示する
  }

  function updateTimer() {
    const timeLeft = startTime + timeLimit - Date.now();
    timerLabel.textContent = (timeLeft / 1000).toFixed(2);
    const timeoutId = setTimeout(() => {
      updateTimer();
    }, 10);

    //時間切れでプレイ停止
    if (timeLeft < 0) { //timeLeftはms!
      clearTimeout(timeoutId);
      timerLabel.textContent = '0.00';

      //clickなどを可能にし、リストの半透明化解除
      body.style.pointerEvents = 'auto';
      document.querySelectorAll('.header-right li').forEach((li) => {
        li.style.opacity = 1;
      });

      setTimeout(() => {
        showResult();
        //alertの処理が終わるまで、画面描写処理をブロックする > 0.00になる前にアラートが先にでてしまうから、処理を遅らせる
      }, 100);
      target.textContent = 'クリックで再スタート';
      isPlaying = false; // 再スタートを有効にする
      isStartCountDown = false; // カウントダウンを有効にする
    }

  }

  const result = document.getElementById('result-screen')
  function showResult() {
    let score = Math.round((letters * 100 / userTimeLimit - miss * 3));
    const detailAccuracy = letters + miss === 0 ? 0 : letters / (letters + miss) * 100
    const rank = judgeRank(score);
    const accuracy = detailAccuracy.toFixed(2);
    const wpm = Math.round(letters / userTimeLimit * 60);

    document.getElementById('score').textContent = score;
    document.getElementById('rank').textContent = rank;
    document.getElementById('elapsed-time').textContent = userTimeLimit;
    document.getElementById('correct-letters').textContent = letters;
    document.getElementById('mistakes').textContent = miss;
    document.getElementById('accuracy').textContent = accuracy;
    document.getElementById('wpm').textContent = wpm;

    result.style.display = 'block';
    result.style.opacity = 1;
  }


  // プレイ開始
  const startGame = () => {
    if (isPlaying) {
      return;
      //既にプレイしているときは以下を実行しない
      }
    isPlaying = true;
      
    timeLimit = userTimeLimit * 1000
    //タイムリミット設定の反映
  
    
  
    target.textContent = word;
    startTime = Date.now();
      updateTimer();
  }
  //clickしたとき
  let isStartCountDown = false;
  document.getElementById('gamefield').addEventListener('click', () => {
    
    let startIn = 3; //seconds
    loc = 0;
    letters = 0;
    miss = 0;
    lettersLabel.textContent = letters;
    missLabel.textContent = miss;
    word = defaultWords[Math.floor(Math.random() * defaultWords.length)];
    
    if (!(isStartCountDown)) {

      isStartCountDown = true;

      const countDown = setInterval(() => {
        if (startIn > 0) {
          target.textContent = startIn;
          startIn--;
        } else {
          startGame();
          clearInterval(countDown);
        }
      }, 1000);
    }

    });


  //プレイ中
  window.addEventListener('keydown', e => {
    if (!(isPlaying)) {
      return;
    }
    if (e.key === word[loc]) {

      //例えば、0文字目からスタートで2文字目を正解したら、現在位置を3にする
      loc++;
      if (loc === word.length) {
        word = defaultWords[Math.floor(Math.random() * defaultWords.length)];
        loc = 0;
      }
      updateTarget();
      letters++;
      lettersLabel.textContent = letters;
    } else {
      miss++;
      missLabel.textContent = miss;
    }
  });
}

