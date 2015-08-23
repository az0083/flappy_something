(function(w, d) {
  'use strict';

  var Pillar = function() {
    this.dContainer = null;
    this.dUpObj = null;
    this.dDownObj = null;
    this.dSaftyObj = null;
    this.currentX = 0; // left edge
    this.currentSaftyY = 0; // safty center top

    return this;
  };

  Pillar.initWithParams = function(saftyCenterY) {
    var pillar = new Pillar();

    pillar.dContainer = Util.$('cloneSrc').children[0].cloneNode(true);
    Util.$('main').appendChild(pillar.dContainer);

    var dPillarChildren = pillar.dContainer.children;
    pillar.dUpObj = dPillarChildren[0];
    pillar.dDownObj = dPillarChildren[2];
    pillar.dSaftyObj = dPillarChildren[1];
    pillar.dUpObj.style.height = saftyCenterY - pillar.dSaftyObj.clientHeight / 2 + 'px';
    pillar.dDownObj.style.height = Settings.groundHeight - pillar.dUpObj.clientHeight - pillar.dSaftyObj.clientHeight + 'px';
    pillar.currentSaftyY = pillar.dSaftyObj.offsetTop + pillar.dSaftyObj.clientHeight / 2;
    pillar.currentX = pillar.dContainer.offsetLeft;

    return pillar;
  };

  Pillar.prototype = {
    moveTo: function(targetX) {
      var self = this;
      self.dContainer.style.left = targetX + 'px';
      self.currentX = self.dContainer.offsetLeft;
    },

    destroy: function() {
      this.currentX = null;
      this.currentSaftyY = null;
      this.dUpObj = null;
      this.dDownObj = null;
      this.dSaftyObj = null;
      Util.$('main').removeChild(this.dContainer);
      this.dContainer = null;
    }
  };

  w.Pillar = w.Pillar || Pillar;
})(window, document);
