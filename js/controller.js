(function(w) {
  'use strict';

  var Controller = function() {
    this.flying = null;
    this.bg = null;
    this.pillarsQueue = [];
    this.nextPillar = null;

    return this;
  };

  Controller.initWithParams = function(params) {
    var controller = new Controller();

    controller.flying = params.flying;
    controller.bg = params.bg;
    _createPillar.call(controller);
    controller.nextPillar = controller.pillarsQueue[0];
    var flyingDeadCallbackFunc = _flyingDeadCallback.bind(controller);
    controller.flying.hittedCallback = flyingDeadCallbackFunc;

    return controller;
  };

  Controller.prototype = {
    startGame: function() {
      var self = this;

      self.flying.start();
      self.bg.start();
      _startCreatingPillars.call(self);
      _startMovingPillars.call(self);
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

  var _flyingDeadCallback = function() {
    var self = this;
    self.bg.stop();
    _stopCreatingPillars();
    _stopMovingPillars();
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
        }
      }
    }
  };

  w.Controller = w.Controller || Controller;
})(window);
