(function(w) {
  'use strict';

  var Flying = function(elemId) {
    this.dObj = null;
    this.v = 0;
    this.jumpingStartHeigth = 0; // bottom line height
    this.hittedCallback = null;
    return this;
  };

  Flying.initWithElementId = function(elemId) {
    var flying = new Flying();
    flying.dObj = Util.$(elemId);
    flying.jumpingStartHeigth = Settings.startHeight;
    _moveTo.call(flying, flying.jumpingStartHeigth);
    return flying;
  };

  Flying.prototype = {
    start: function() {
      var self = this;
      _addKeyEventListener.call(self);
      _resetFallingInterval.call(self);
    },

    jump: function() {
      var self = this;
      self.v = -Settings.jumpingPower;
      _t = 0;
      self.jumpingStartHeigth = self.dObj.offsetTop + self.dObj.clientHeight;
    },

    hitted: function() {
      var self =  this;
      clearInterval(_intervalCtrl);
      w.removeEventListener('keydown', _keydownHandlerFunc, false);
      self.v = 0;
      self.jumpingStartHeigth = 0;
      _t = 0;

      if (self.hittedCallback && typeof self.hittedCallback === 'function') {
        self.hittedCallback();
      }
    },

    reset: function() {
      var self = this;
      self.jumpingStartHeigth = Settings.startHeight;
      _moveTo.call(self, self.jumpingStartHeigth);
    }
  };

  var _intervalCtrl = null;
  var _t = 0;
  var _keydownHandlerFunc = null;

  var _moveTo = function(height) {
    var self = this;
    self.dObj.style.top = height - self.dObj.clientHeight + 'px';
  };

  var _resetFallingInterval = function() {
    var self = this;
    clearInterval(_intervalCtrl);
    var fallingFunc = _falling.bind(self);
    _intervalCtrl = setInterval(fallingFunc, Settings.interval);
  };

  var _falling = function() {
    var self = this;
    // s = v * t + 1/2 * g * t^2
    _t += Settings.interval / 1000;
    var movedOffset = self.v * _t + 0.5 * Settings.gravity * _t * _t;
    var nextHeight = self.jumpingStartHeigth + movedOffset;

    if (nextHeight > Settings.groundHeight) {
      _moveTo.call(self, Settings.groundHeight);
      self.hitted();
    } else {
      _moveTo.call(self, nextHeight);
    }
  };

  var _addKeyEventListener = function() {
    var self = this;
    _keydownHandlerFunc = _keydownHandler.bind(self);
    w.addEventListener('keydown', _keydownHandlerFunc, false);
  };

  var _keydownHandler = function(e) {
    var self = this;

    if (e.keyCode !== 32) {
      return;
    }

    e.preventDefault();
    self.jump();
  };

  w.Flying = w.Flying || Flying;
})(window);
