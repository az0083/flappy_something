var app = (function(self) {
  'use strict';

  var _randomSaftyHeight = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  var _createPillars = function() {
    self.pillarsQueue.push(Pillar.initWithParams(_randomSaftyHeight(100, 500)));
  };

  self.flying = Flying.initWithElementId('flying');
  self.bg = BackGround.initWithElementId('main');
  self.pillarsQueue = [];
  _createPillars();
  setInterval(_createPillars, Settings.pillarAppearInterval);

  var _flyingDeadCallback = function() {
    self.bg.stop();
    clearInterval(_intervalCtrl);
  };

  self.flying.hittedCallback = _flyingDeadCallback;

  var _movePillars = function() {
    var len = self.pillarsQueue.length;

    if (len === 0) {
      clearInterval(_intervalCtrl);
      return;
    }

    for (var i = 0; i < len; i++) {
      var currentPillar = self.pillarsQueue[i];
      if (!currentPillar) {
        continue;
      }

      if (currentPillar.currentX < -100) {
        self.pillarsQueue.shift(currentPillar);
        currentPillar.destroy();
      } else {
        currentPillar.moveTo(currentPillar.currentX - Settings.pillarSpeed);
      }
    }
  };

  var _intervalCtrl = setInterval(_movePillars, Settings.interval);

  return self;
})(app || {});
