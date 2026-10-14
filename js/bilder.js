// Visar en platshållare om en bild saknas.
// Byt bild: lägg en ny fil i mappen bilder/ med samma namn som den gamla.
document.querySelectorAll('.media img').forEach(function (img) {
  function showPlaceholder() {
    var box = img.parentElement;
    box.classList.add('is-missing');
    box.setAttribute('data-file', img.getAttribute('src'));
  }

  img.addEventListener('error', showPlaceholder);
  if (img.complete && img.naturalWidth === 0) {
    showPlaceholder();
  }
});
