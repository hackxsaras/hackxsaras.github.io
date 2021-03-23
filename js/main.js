

var blurred = 0;
$(document).ready(function(){

  $(window).blur(function(){
    blurred = 1;
  });
  $(window).focus(function(){
    blurred = 0;
  });
  $.fn.pvisible = function() {
    var eTop = this.offset().top;
    var eBottom = eTop + this.height();
    var wTop = $(window).scrollTop();
    var wBottom = wTop + $(window).height();
    var totalH = Math.max(eBottom, wBottom) - Math.min(eTop, wTop);
    var wComp = totalH - $(window).height();
    var eIn = this.height() - wComp;
    return (eIn <= 0 ? 0 : eIn / this.height()) ;
  };
  $(".left-banner > div > a").on('click', function(event) {

    if (this.hash !== "") {

      event.preventDefault();

      var hash = this.hash;
      $('.right-banner > .overflow-container').animate({
        scrollTop: $(hash).offset().top + $('.right-banner > .overflow-container').scrollTop() - $('.right-banner').offset().top
      }, 500);
    } 
  });
  $(".left-banner > div > a").mouseover(function(event){
    if(this.hash !== ""){
      $(this).addClass('hovered');
    }
  });
  $(".left-banner > div > a").mouseout(function(event){
    if(this.hash !== ""){
      $(this).removeClass('hovered');
    }
  });
  $('.right-banner > .overflow-container').scroll(function(){
    var maxactive= 0, activeInstance;
    $('.left-banner > .overflow-container > a').each(function(i, elem){
      if(maxactive < $(this.hash).pvisible()){
        maxactive = $(this.hash).pvisible();
        activeInstance = this;
      }
    });
    $('.left-banner > .overflow-container > a.active').removeClass('active');
    $(activeInstance).addClass('active');
  });
  $('.right-banner > .overflow-container').animate({
    scrollTop: 1
  }, 0, function(){
    this.scrollTop = 0;
    console.log('init scroll');
  });  
});







var spawner = setInterval(function(){
  if(blurred)return;
  $('.animated-back').each(function(){
    var x = newParticle();
    $(this).append(x);

  });
}, 1500);

function hasCssAnimation(el) {

  // get a collection of all children including self
  var items = [el].concat(Array.prototype.slice.call(el.getElementsByTagName("*")));

  // go through each item in reverse (faster)
  for (var i = items.length; i--;) {

    // get the applied styles
    var style = window.getComputedStyle(items[i], null);

    // read the animation/transition duration - defaults to 0
    var animDuration = parseFloat(style.getPropertyValue('animation-duration') || '0');
    var transDuration = parseFloat(style.getPropertyValue('transition-duration') || '0');

    // if we have any duration greater than 0, an animation exists
    if (animDuration > 0 || transDuration > 0) {
      return true;
    }
  }

  return false;
}




//add a particle every interval
function newParticle(){
  var rand = ((parseInt(Math.random() * 10000))%100) + 50;
  var rand2 = ((parseInt(Math.random()* 10000))%10) + 10;
  var rand3 = ((parseInt(Math.random()* 10000))%100);

  var particle = document.createElement('div');
  particle.className = "particle";
  particle.style.width = rand + "px";
  particle.style.height = rand + "px";
  particle.style.webkitAnimationDuration = rand2 + "s";
  particle.style.left = rand3 + "%";
  $(particle).on(['webkitAnimationEnd',
                    'mozAnimationEnd',
                    'MSAnimationEnd',
                    'oanimationend',
                    'animationend'].join(' ')
                  , function(){
                      $(this).remove();
                    });
  return particle;
}

function goto(url){
  window.open(url);
}