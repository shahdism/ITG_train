function validateForm(event) {
    event.preventDefault();
  
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var phone = document.getElementById("phone").value;


    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('password-error');
    const phoneError = document.getElementById('phone-error');


    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    phoneError.textContent = '';

   

  
    // Reset error messages
    var errorMessages = document.getElementsByClassName("error-message");
    for (var i = 0; i < errorMessages.length; i++) {
      errorMessages[i].textContent = "";
    }
  
    var isValid = true;
  
    // Username validation
    if (username.trim() === "") {
      displayErrorMessage("username", "Please enter a username.");
      isValid = false;
    }
  
    // Email validation
    var emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      displayErrorMessage("email", "Please enter a valid email address.");
      isValid = false;
    }
  
    // Password validation
    if (password.length < 8 || !/[a-zA-Z]/.test(password)) {
      displayErrorMessage("password", "Password must be at least 8 characters long and contain at least one letter.");
      isValid = false;
    }
  
    // Phone number validation
    if (!/^\d{10}$/.test(phone)) {
      displayErrorMessage("phone", "Please enter a valid 10-digit phone number.");
      isValid = false;
    }
  
    if (isValid) {
      // Store username in local storage
      localStorage.setItem("userName", username);
  
      // Redirect to ordering page
      window.location.href = "ordering.html";
    }
  }
  
  function displayErrorMessage(fieldId, message) {
    var field = document.getElementById(fieldId);
    var errorMessage = field.parentNode.querySelector(".error-message");
    errorMessage.textContent = message;
  }
  
  function placeOrder(event) {
    event.preventDefault();
  
    var meal = document.getElementById("meal").value;
    var specialNotes = document.getElementById("specialNotes").value;
  
    var price = 0;
    switch (meal) {
      case "fired_chickens":
        price = 10;
        break;
      case "pizza":
        price = 20;
        break;
      case "burger":
        price = 30;
        break;
    }
  
    if (specialNotes.length > 0) {
      price += 5;
    }
  
    var userName = localStorage.getItem("userName");
    var currentDate = new Date().toLocaleDateString();
  
    var receipt = `Our Customer ${userName} has ordered ${meal.replace("_", " ")} with a total price of $${price} at the date ${currentDate}.`;
    document.getElementById("receipt").textContent = receipt;
  
    // Clear local storage
    localStorage.removeItem("userName");
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    var createAccountForm = document.getElementById("createAccountForm");
    if (createAccountForm) {
      createAccountForm.addEventListener("submit", validateForm);
    }
  
    var orderForm = document.getElementById("orderForm");
    if (orderForm) {
      orderForm.addEventListener("submit", placeOrder);
      
    }
  });

