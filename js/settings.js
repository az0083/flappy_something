(function(w) {
  'use strict';

  var Settings = {
    startHeight: 300, // pixel
    gravity: 400, // pixel/s
    interval: 20, // ms
    jumpingPower: 250, // pixel/s
    groundHeight: 600, // pixel
    pillarSpeed: 3, // pixel/ms
    pillarAppearInterval: 1500, // ms
  };

  w.Settings = w.Settings || Settings;
})(window);
