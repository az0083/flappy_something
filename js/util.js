(function(w, d) {
  var Util = {
    $: function(elemId) {
      return d.getElementById(elemId);
    }
  };

  w.Util = w.Util || Util;
})(window, document);
