var app = (function(self) {
  'use strict';

  self.flying = Flying.initWithElementId('flying');
  self.bg = BackGround.initWithElementId('main');
  self.flying.hittedCallback = self.bg.stop;

  return self;
})(app || {});
