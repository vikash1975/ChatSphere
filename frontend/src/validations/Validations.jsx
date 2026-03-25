const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

export const validateEmail = (email) => {
  if (!email) return "Email is required";
  if (!emailPattern.test(email.trim())) return "Enter valid email";
  return "";
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (!passwordPattern.test(password.trim())) {
    return "Min 6 char, 1 uppercase, 1 number";
  }
  return "";
};

export const registerForm = (username, email, password, confirmPassword,gender) => {
  const errors = {};

  if (!username || username.trim() === "") {
    errors.username = "Username required";
  }
 
  if(!gender) errors.gender="Please select gender";


  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;

  const passError = validatePassword(password);
  if (passError) errors.password = passError;

  if (!confirmPassword) {
    errors.confirmPassword = "Confirm password required";
  } else if (password.trim() !== confirmPassword.trim()) {
    errors.confirmPassword = "Passwords not match";
  }

  return errors;
};


//  Login
export const loginForm = (email, password) => {
  const errors = {};

  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;

  return errors;
};




