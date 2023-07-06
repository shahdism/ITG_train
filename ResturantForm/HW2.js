


function createAccount() {
    document.body.innerHTML = '';

    var formContainer = document.createElement('div');
    formContainer.className = 'container';

    var formHeading = document.createElement('h2');
    formHeading.textContent = 'Create Account';

    var form = document.createElement('form');
    form.onsubmit = submitForm;

    var nameLabel = document.createElement('label');
    nameLabel.textContent = 'Name:';
    var nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.required = true;

    var emailLabel = document.createElement('label');
    emailLabel.textContent = 'Email:';
    var emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.required = true;

    var passwordLabel = document.createElement('label');
    passwordLabel.textContent = 'Password:';
    var passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.required = true;

    var phoneLabel = document.createElement('label');
    phoneLabel.textContent = 'Phone Number:';
    var phoneInput = document.createElement('input');
    phoneInput.type = 'tel';
    phoneInput.required = true;

    var submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';

    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(emailLabel);
    form.appendChild(emailInput);
    form.appendChild(passwordLabel);
    form.appendChild(passwordInput);
    form.appendChild(phoneLabel);
    form.appendChild(phoneInput);
    form.appendChild(submitButton);

    formContainer.appendChild(form);
    document.body.appendChild(formContainer);
}

function submitForm(event) {
   

    var name = event.target.elements[0].value;
    var email = event.target.elements[1].value;
    var password = event.target.elements[2].value;
    var phone = event.target.elements[3].value;

    // Client-side validation
    var isValid = true;
    var errorContainer = document.createElement('div');
    errorContainer.className = 'error';

    if (!emailRegex.test(email)) {
        errorContainer.textContent = 'Invalid email format.';
        isValid = false;
    } else if (password.length < 8 || !/[a-zA-Z]/.test(password)) {
        errorContainer.textContent = 'Password must be at least 8 characters long and contain at least one letter.';
        isValid = false;
    } else if (!phoneRegex.test(phone)) {
        errorContainer.textContent = ' Phone number should be 10 digits.';
        isValid = false;
    }

    if (!isValid) {
        event.target.appendChild(errorContainer);
        return;
    }

    document.body.innerHTML = '';

    var orderContainer = document.createElement('div');
    orderContainer.className = 'container order-container';

    var orderHeading = document.createElement('h2');
    orderHeading.textContent = 'Place Your Order';

    var orderForm = document.createElement('form');
    orderForm.onsubmit = placeOrder;

    var mealLabel = document.createElement('label');
    mealLabel.textContent = 'Choose a Meal:';
    var mealSelect = document.createElement('select');
    var mealOptions = [
        { name: 'Fried Chicken', price: 10 },
        { name: 'Pizza', price: 20 },
        { name: 'Burger', price: 30 }
    ];

    for (var i = 0; i < mealOptions.length; i++) {
        var option = document.createElement('option');
        option.value = mealOptions[i].name;
        option.textContent = mealOptions[i].name + ' - $' + mealOptions[i].price;
        mealSelect.appendChild(option);
    }

    var notesLabel = document.createElement('label');
    notesLabel.textContent = 'Special Notes (Optional):';
    var notesInput = document.createElement('input');
    notesInput.type = 'text';

    var orderButton = document.createElement('button');
    orderButton.type = 'submit';
    orderButton.textContent = 'Place Order';

    orderForm.appendChild(mealLabel);
    orderForm.appendChild(mealSelect);
    orderForm.appendChild(notesLabel);
    orderForm.appendChild(notesInput);
    orderForm.appendChild(orderButton);

    orderContainer.appendChild(orderHeading);
    orderContainer.appendChild(orderForm);
    document.body.appendChild(orderContainer);
}

function placeOrder(event) {
    event.preventDefault();

    var meal = event.target.elements[0].value;
    var notes = event.target.elements[1].value;

    var price = 0;
    var mealOptions = event.target.elements[0].options;

    for (var i = 0; i < mealOptions.length; i++) {
        if (mealOptions[i].value === meal) {
            price = parseFloat(mealOptions[i].textContent.split('$')[1]);
            break;
        }
    }

    if (notes.trim().length > 0) {
        price += 5;
    }

    var date = new Date().toDateString();

    document.body.innerHTML = '';

    // Display the receipt
    var receiptContainer = document.createElement('div');
    receiptContainer.className = 'container';

    var receiptHeading = document.createElement('h2');
    receiptHeading.textContent = 'Order Receipt';

    var receiptContent = document.createElement('p');
    receiptContent.innerHTML = 'Our Customer <strong>' + name + '</strong> has ordered <strong>' + meal + '</strong> with a total price of <strong>$' + price.toFixed(2) + '</strong> at the date ' + date + '.';

    receiptContainer.appendChild(receiptHeading);
    receiptContainer.appendChild(receiptContent);
    document.body.appendChild(receiptContainer);
}

// Regular expressions for email and phone number validation
var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var phoneRegex = /^\d{10}$/;
