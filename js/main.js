'use strict'
{
  class Panel {
    constructor(game) {
      this.game = game;
      this.el = document.createElement('li');
      this.el.classList.add('pressed');
      this.el.addEventListener('click', () => {
        this.check();
      });
    }

    getEl() {
      return this.el;
    }

    activate(num) {
      this.el.classList.remove('pressed');
      this.el.textContent = num;
    }

    check() {
      if (this.game.getCurrentNum() === parseInt(this.el.textContent,10)) {
        //parseInt(文字列,10);  文字列を10進法で表示
        this.el.classList.add('pressed');
        this.game.addCurrentNum();

        if (this.game.getCurrentNum() === this.game.getLevel() ** 2) {
          clearTimeout(this.game.getTimeoutId());
        }
      }
    }


  }



  class Board {
    constructor(game) {
      this.game = game;
      this.panels = [];
      for(let i = 0; i < this.game.getLevel() **2; i++) {
        this.panels.push(new Panel(this.game))
      }
      this.setup();
    }

    setup()  {
      const board = document.getElementById('board');
      this.panels.forEach(panel => {
        // board.appendChild(panel.el)
        board.appendChild(panel.getEl());
        //オブジェクト試行のカプセル化
      });
    }

    activate() {
      const nums = [];
      for(let i = 0; i < this.game.getLevel() **2; i++) {
        nums.push(i);
      }

      this.panels.forEach(panel => {
        const num = nums.splice(Math.floor(Math.random() * nums.length),1)[0];
        //配列.splice(引数1,引数2,引数3,引数4)　　配列を編集する　返り値が一つでも配列を返す
        //引数1   追加・削除する位置
        //引数2   削除する要素の数
        //引数3以降   追加する要素
        panel.activate(num);
      })
    }
  }



  
  class Game {
    constructor(level) {
      this.level = level;
      this.board = new Board(this);

      this.currentNum = undefined;
      this.startTime = undefined;
      this.timeoutId = undefined; 

      const btn = document.getElementById('btn');
      btn.addEventListener('click',() => {
        this.start();
      });

      this.setup();
    }

    setup() {
      const container = document.getElementById('container');
      const PANEL_WIDTH = 50;
      const BOARD_PADDING = 10;
      container.style.width = PANEL_WIDTH * this.level + BOARD_PADDING * 2 + 'px';
    }

    start() {
      if (typeof this.timeoutId !== 'undefined') {
        clearTimeout(this.timeoutId);
      }

      this.currentNum = 0;
      this.board.activate();
      
      this.startTime = Date.now();
      this.runTimer();
    }

    runTimer() {     //メソッド
      const timer = document.getElementById('timer');
      timer.textContent = ((Date.now() - this.startTime)/1000).toFixed(2);
      //小数点二桁で表示
  
      this.timeoutId = setTimeout(() => {
        this.runTimer();
      },10);
    }

    addCurrentNum() {
      this.currentNum ++ ;
    }

    getCurrentNum() {
      return this.currentNum;
    }

    getTimeoutId() {
      return this.timeoutId;
    }

    getLevel() {
      return this.level;
    }
  }

  new Game(5);



  
}