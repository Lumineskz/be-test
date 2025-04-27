const scriptURL = 'https://script.google.com/macros/s/AKfycbyA3cPP7cMtPt3wu6jSZiVxCBWTrkdfv8FQ0S4-jgKLurznkvIJWGOSTxBKoDQ36QWB/exec'; // <- Paste your deployed Google Apps Script Web App URL

document.getElementById('orderForm').addEventListener('submit', e => {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const order = document.getElementById('order').value;
  
  const token = "ORD" + Math.floor(Math.random() * 1000000);

  const data = { name, order, token };

  fetch(scriptURL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => response.text())
  .then(result => {
    alert(`Order placed! Your Order Token is: ${token}`);
    document.getElementById('orderForm').reset();
  })
  .catch(error => {
    alert('Something went wrong!');
    console.error('Error!', error.message);
  });
});
