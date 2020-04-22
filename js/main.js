'use strict'
{
  class Panel {
    constructor() {
      this.el = document.createElement('li');
      this.el.classList.add('pressed');
    }
    getEl() {
      return this.el;
    }

    activate(num) {
      this.el.classList.remove('pressed');
      this.el.textContent = num;
    }
  }



  class Board {
    constructor() {
      this.panels = [];
      for(let i = 0; i <4; i++) {
        this.panels.push(new Panel())
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
      const nums = [0,1,2,3];

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



  const board = new Board();

  const btn = document.getElementById('btn');
  btn.addEventListener('click',() => {
    board.activate();
  });
  
}