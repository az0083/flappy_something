var app = (function(self) {
  'use strict';

  self.controller = Controller.initWithParams({
    flying: Flying.initWithElementId('flying'),
    bg: BackGround.initWithElementId('main')
  });

  self.controller.startGame();
  return self;
})(app || {});
