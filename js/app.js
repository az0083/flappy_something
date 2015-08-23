var app = (function(w, self) {
  'use strict';

  self.setStartListener = function() {
    w.addEventListener('keydown', self.startFunc, false);
  };

  self.startFunc = function(e) {
    if (e.keyCode === 32) {
      e.preventDefault();
      w.removeEventListener('keydown', self.startFunc, false);
      self.controller.startGame();
    }
  };

  self.gameOverFunc = function() {
    setTimeout(self.setStartListener, 200);
  };

  self.controller = Controller.initWithParams({
    score: Score.init(),
    flying: Flying.initWithElementId('flying'),
    bg: BackGround.initWithElementId('main'),
    gameOverCallback: self.gameOverFunc
  });

  self.setStartListener();

  return self;
})(window, app || {});
