//  validate user input data before adding a new user to the database
function validateUserInput(data) {
    const errors = {};
  
    if (!data.name) {
      errors.name = 'Name is required';
    }
  
    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(data.email)) {
      errors.email = 'Invalid email format';
    }
  
    return errors;
  }
  
  // Validate email format
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

  
  
  function createErrorResponse(message) {// Generate a standard error response
    return {
      success: false,
      message: message,
    };
  }
  
  module.exports = {
    validateUserInput,
    createErrorResponse,
  };
  