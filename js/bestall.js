// Specialbeställning: gör om formulärets svar till ett mejl eller kopierbar text.

var form = document.querySelector('.custom-form');
var statusText = form.querySelector('.form-status');

// Samlar ifyllda fält som rader, t.ex. "Färg: Abborre"
function orderText() {
  var lines = [];
  new FormData(form).forEach(function (value, name) {
    value = value.trim();
    if (!value) return;
    if (name === 'Vikt') value += ' g';
    if (name === 'Längd') value += ' cm';
    lines.push(name + ': ' + value);
  });
  return 'Hej! Jag vill göra en specialbeställning.\n\n' + lines.join('\n');
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  var type = form.elements['Dragtyp'].value.trim();
  location.href = 'mailto:' + form.dataset.email +
    '?subject=' + encodeURIComponent('Specialbeställning: ' + type) +
    '&body=' + encodeURIComponent(orderText());
  statusText.textContent = 'Ditt mejlprogram öppnas med beställningen ifylld.';
});

form.querySelector('.copy-order').addEventListener('click', function () {
  if (!form.reportValidity()) return;
  navigator.clipboard.writeText(orderText()).then(function () {
    statusText.innerHTML = 'Kopierat! Klistra in i ett meddelande till ' +
      '<a href="https://www.instagram.com/alandbaits/" target="_blank" rel="noopener">@alandbaits</a>.';
  }, function () {
    statusText.textContent = 'Kunde inte kopiera. Skriv av svaren i ett meddelande på Instagram.';
  });
});
