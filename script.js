var app = document.getElementById('type-writer');

var typewriter = new Typewriter(app, {
  loop: false,
  delay: 75,
});


console.log(app)
typewriter
  .pauseFor(2500)
  .typeString('<span style="font-family:Times New Roman; font-size: 20pt;"><b>Vitaj slováčisko!</b></span>')
  .pauseFor(300)
  .typeString('<br>Som Ľudovít Štúr.')
  .pauseFor(300)
  .typeString('<br>Chceš sa niečo dozvedieť o našej <b>literatúre</b>?')
  .pauseFor(1000)
  .deleteChars('našej literatúre?'.length)
  .typeString('mojom <b>živote</b>?')
  .start();

$(function () {
  $(document).scroll(function () {
    var $nav = $(".navbar");
    $nav.toggleClass('bg-body', $(this).scrollTop() > $nav.height());
    $nav.toggleClass('navbar-dark', $(this).scrollTop() <= $nav.height());
  });
});