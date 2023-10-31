// validations.ts
interface ValidationResult {
    isValid: boolean;
    message: string;
  }
  
  export const validateUsername = (username: string): ValidationResult => {
    const minLength = 5;
    const maxLength = 12;
    const allowedCharactersRegex = /^[a-zA-Z0-9_@-]+$/;
  
  
    if (username.length < minLength || username.length > maxLength) {
        return {
            isValid: false,
            message: "El nombre de usuario debe tener entre 5 y 12 caracteres."
        };
    }
  
    if (!allowedCharactersRegex.test(username)) {
        return {
            isValid: false,
            message: "El nombre de usuario solo puede contener letras, números, guiones bajos, guiones y arrobas."
        };
    }
  
    if (username.includes(" ")) {
        return {
            isValid: false,
            message: "El nombre de usuario no puede contener espacios."
        };
    }
  
    return {
        isValid: true,
        message: "Nombre de usuario válido."
    };
  };
  
  
    
  export function validatePassword(password: string): ValidationResult {
    const minLength = 8;
    const maxLength = 30;
    const regexSpecialChars = /[!@#$%^&*(),.?":{}|<>]/;
    const regexUpperCase = /[A-Z]/;
    const regexLowerCase = /[a-z]/;
    const regexNumbers = /[0-9]/;
  
    if (password.length < minLength || password.length > maxLength) {
      return {
        isValid: false,
        message: "La contraseña debe tener entre 8 y 30 caracteres."
      };
    }
  
    if (!regexSpecialChars.test(password)) {
      return {
        isValid: false,
        message: "La contraseña debe contener al menos un carácter especial."
      };
    }
  
    if (!regexUpperCase.test(password)) {
      return {
        isValid: false,
        message: "La contraseña debe contener al menos una letra mayúscula."
      };
    }
  
    if (!regexLowerCase.test(password)) {
      return {
        isValid: false,
        message: "La contraseña debe contener al menos una letra minúscula."
      };
    }
  
    if (!regexNumbers.test(password)) {
      return {
        isValid: false,
        message: "La contraseña debe contener al menos un número."
      };
    }
  
    return {
      isValid: true,
      message: "Contraseña válida."
    };
  }