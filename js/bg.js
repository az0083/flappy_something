(function(w) {
  'use strict';

  var BackGround = function() {
    this.dObj = null;
    return this;
  };

  BackGround.initWithElementId = function(elemId) {
    var bg = new BackGround();
    bg.dObj = Util.$(elemId);
    return bg;
  };

  BackGround.prototype = {
    start: function() {
      var self = this;
      _resetInterval.call(self);
    },

    stop: function() {
      var self = this;
      clearInterval(_intervalCtrl);
    }
  };

  var _intervalCtrl = null;
  var _bgX = 0;
  var _resetInterval = function() {
    var self = this;
    clearInterval(_intervalCtrl);
    var bgMovingFunc = _bgMoving.bind(self);
    _intervalCtrl = setInterval(bgMovingFunc, Settings.interval);
  };

  var _bgMoving = function() {
    var self = this;
    _bgX -= 1;
    self.dObj.style.backgroundPosition = _bgX + 'px 0';
  };

  w.BackGround = w.BackGround || BackGround;
})(window);
