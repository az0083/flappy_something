(function(w) {
  'use strict';

  var Score = function() {
    this.current = 0;
    this.best = 0;
    return this;
  };

  Score.init = function() {
    var score = new Score();
    score.best = Number(Score.getBestScore());
    return score;
  };

  Score.getBestScore = function() {
    return localStorage.bestScore || 0;
  };

  Score.updateBestScoreTo = function(score) {
    localStorage.bestScore = score;
  };

  Score.prototype = {
    updateBestScore: function() {
      var self = this;

      if (self.current > self.best) {
        Score.updateBestScoreTo(self.current);
        self.best = self.current;
      }
    }
  };

  w.Score = w.Score || Score;
})(window);
