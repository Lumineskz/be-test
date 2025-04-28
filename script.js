const orderForm = document.getElementById('cafe-order-form');
const summaryContent = document.getElementById('summary-content');
const messageBox = document.getElementById('message-box');
const messageText = document.getElementById('message-text');
const errorBox = document.getElementById('error-box');
const errorText = document.getElementById('error-text');

function showMessage(message) {
    messageText.textContent = message;
    messageBox.classList.remove('hidden');
    setTimeout(() => {
        messageBox.classList.add('hidden');
    }, 3000); // Hide after 3 seconds
}

function showError(message) {
    errorText.textContent = message;
    errorBox.classList.remove('hidden');
    setTimeout(() => {
        errorBox.classList.add('hidden');
    }, 3000); // Hide after 3 seconds
}

orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const drink = document.getElementById('drink').value;
    const quantity = document.getElementById('quantity').value;

    if (!SCRIPT_URL) {
        showError('Script URL is not defined.  Please update the SCRIPT_URL in the code.');
        return;
    }

    const orderData = {
        name: name,
        email: email,
        drink: drink,
        quantity: quantity,
    };

    // Display order summary
    summaryContent.innerHTML = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Drink:</strong> ${drink}</p>
        <p><strong>Quantity:</strong> ${quantity}</p>
    `;

    // Send data to Google Sheets
    fetch(SCRIPT_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.result === 'success') {
            showMessage('Order placed successfully!');
            orderForm.reset(); // Clear the form
        } else {
            showError(`Error: ${data.error || 'Failed to place order'}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showError('Failed to place order. Please check your internet connection and try again.');
    });
});