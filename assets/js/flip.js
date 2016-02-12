    (function() {
  var Flip;

  Flip = (function() {
    function Flip(el) {
      this.el = el;
      this.el = $(this.el);
      this.currentStep = 0;
      
    }

    Flip.prototype.next = function(event) {
      var currentStepEl, nextStepEl, nextStepNum;
      if (event) {
        event.preventDefault();
      }
      nextStepNum = this.currentStep + 1;
      currentStepEl = this.el.find(".step" + this.currentStep);
      nextStepEl = this.el.find(".step" + nextStepNum);
      if (nextStepEl.length) {
        currentStepEl.prev().removeClass('down');
        currentStepEl.removeClass('set');
        currentStepEl.addClass('down');
        nextStepEl.addClass('set');
        nextStepEl.removeClass('down');
        nextStepEl.next().removeClass('down');
        return this.currentStep++;
      } else {
        this.el.find(".step").removeClass('set');
        this.el.find(".step" + this.currentStep).addClass('down');
        this.el.find(".step").not(".step" + this.currentStep).removeClass('down');
        this.currentStep = -1;
        return this.next();
      }
    };

    return Flip;

  })();

  $(function() {
    var f;
    f = new Flip(document.getElementById('flipper'));
    return setInterval((function() {
      return f.next();
    }), 1500);
  });

}).call(this);