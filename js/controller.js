(function(w) {
  'use strict';

  var Controller = function() {
    this.score = null;
    this.flying = null;
    this.bg = null;
    this.pillarsQueue = [];
    this.nextPillar = null;
    this.gameOverCallback = null;

    return this;
  };

  Controller.initWithParams = function(params) {
    var controller = new Controller();

    controller.score = params.score;
    controller.flying = params.flying;
    controller.bg = params.bg;
    controller.gameOverCallback = params.gameOverCallback;
    var gameOverFunc = controller.gameOver.bind(controller);
    controller.flying.hittedCallback = gameOverFunc;

    return controller;
  };

  Controller.prototype = {
    startGame: function() {
      var self = this;

      _clearAllPillars.call(self);
      _createPillar.call(self);
      self.nextPillar = self.pillarsQueue[0];
      self.flying.reset();
      self.flying.start();
      self.bg.start();
      _startCreatingPillars.call(self);
      _startMovingPillars.call(self);
      Util.$('start').hidden = true;
      Util.$('end').hidden = true;
      Util.$('end').style.display = 'block';
      Util.$('systemView').hidden = true;
    },

    gameOver: function() {
      var self = this;
      self.bg.stop();
      _stopCreatingPillars();
      _stopMovingPillars();
      self.score.updateBestScore();
      Util.$('start').hidden = true;
      Util.$('end').hidden = false;
      Util.$('systemView').hidden = false;
      Util.$('lastestPoint').innerHTML = self.score.current;
      Util.$('bestPoint').innerHTML = self.score.best;
      self.score.current = 0;
      Util.$('currentScore').innerHTML = self.score.current;

      if (typeof self.gameOverCallback === 'function') {
        self.gameOverCallback();
      }
    }
  };

  var _createPillarInterval = null;
  var _startCreatingPillars = function() {
    var self = this;
    var createPillarFunc = _createPillar.bind(self);
    _createPillarInterval = setInterval(createPillarFunc, Settings.pillarAppearInterval);
  };

  var _stopCreatingPillars = function() {
    clearInterval(_createPillarInterval);
  };

  var _createPillar = function() {
    var self = this;
    self.pillarsQueue.push(Pillar.initWithParams(_randomSaftyHeight(100, 500)));
  };

  var _randomSaftyHeight = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  var _isFlyingHittedPillar = function() {
    var self = this;

    if ((self.flying.dObj.offsetLeft + self.flying.dObj.clientWidth) < self.nextPillar.dContainer.offsetLeft) {
      return false;
    }

    if (self.flying.dObj.offsetTop <= self.nextPillar.dSaftyObj.offsetTop ||
        self.flying.dObj.offsetTop + self.flying.dObj.clientHeight >= self.nextPillar.dSaftyObj.offsetTop + self.nextPillar.dSaftyObj.clientHeight) {
      return true;
    }
  };

  var _movePillarsIntervalCtrl = null;
  var _startMovingPillars = function() {
    var self = this;
    var movePillarsFunc = _movePillars.bind(self);
    _movePillarsIntervalCtrl = setInterval(movePillarsFunc, Settings.interval);
  };

  var _stopMovingPillars = function() {
    clearInterval(_movePillarsIntervalCtrl);
  };

  var _movePillars = function() {
    var self = this;
    var len = self.pillarsQueue.length;

    if (len === 0 || _isFlyingHittedPillar.call(self)) {
      self.flying.hitted();
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

        if (currentPillar.currentX + currentPillar.dContainer.clientWidth < self.flying.dObj.offsetLeft && self.nextPillar !== self.pillarsQueue[i + 1]) {
          self.nextPillar = self.pillarsQueue[i + 1];
          self.score.current++;
          Util.$('currentScore').innerHTML = self.score.current;
        }
      }
    }
  };

  var _clearAllPillars = function() {
    var self = this;

    for (var i = 0, len = self.pillarsQueue.length; i < len; i++) {
      self.pillarsQueue[i].destroy();
    }

    self.pillarsQueue = [];
    self.nextPillar = null;
  };

  w.Controller = w.Controller || Controller;
})(window);
