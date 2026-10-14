// Produktsidan: filterknappar och informationsruta för varje drag.

var products = document.querySelectorAll('.product');
var filters = document.querySelectorAll('.filter');
var emptyNote = document.querySelector('.empty-note');
var dialog = document.querySelector('.product-dialog');

// --- Filter ---
filters.forEach(function (button) {
  button.addEventListener('click', function () {
    var category = button.dataset.filter;
    var visible = 0;

    filters.forEach(function (b) {
      b.setAttribute('aria-pressed', b === button ? 'true' : 'false');
    });

    products.forEach(function (product) {
      var show = category === 'alla' || product.dataset.category === category;
      product.hidden = !show;
      if (show) visible++;
    });

    emptyNote.hidden = visible > 0;
  });
});

// --- Informationsruta ---
var dialogMedia = dialog.querySelector('.dialog-media');
var dialogImg = dialogMedia.querySelector('img');
var dialogTitle = dialog.querySelector('#dialog-title');
var dialogInfo = dialog.querySelector('.dialog-info');
var dialogMail = dialog.querySelector('.dialog-mail');

function openProduct(product) {
  var name = product.querySelector('.product-name').textContent;
  var cardImg = product.querySelector('.media img');

  dialogTitle.textContent = name;
  dialogMedia.classList.remove('is-missing');
  dialogMedia.setAttribute('data-file', cardImg.getAttribute('src'));
  dialogImg.src = cardImg.getAttribute('src');
  dialogImg.alt = name;
  dialogInfo.innerHTML = product.querySelector('.product-info').innerHTML;
  dialogMail.href = 'mailto:' + dialog.dataset.email +
    '?subject=' + encodeURIComponent('Fråga om draget: ' + name);

  history.replaceState(null, '', '#' + product.id);
  dialog.showModal();
}

dialogImg.addEventListener('error', function () {
  dialogMedia.classList.add('is-missing');
});

products.forEach(function (product) {
  product.querySelector('.product-card').addEventListener('click', function () {
    openProduct(product);
  });
});

dialog.querySelector('.dialog-close').addEventListener('click', function () {
  dialog.close();
});

// Stäng när man klickar utanför rutan
dialog.addEventListener('click', function (event) {
  if (event.target === dialog) dialog.close();
});

dialog.addEventListener('close', function () {
  history.replaceState(null, '', location.pathname);
});

// Öppna direkt om adressen pekar på ett drag, t.ex. produkter.html#wobbler
if (location.hash) {
  var linked = document.getElementById(location.hash.slice(1));
  if (linked && linked.classList.contains('product')) openProduct(linked);
}
