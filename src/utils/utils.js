import * as CryptoJS from "crypto-js";
import moment from "moment";
import { API_DATA_LIMIT, ENVIRONMENT } from "./constants";

export const getAuthToken = () => {
  return localStorage.getItem("token");
};

//debounce function to call function after 500ms
export const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, delay);
  };
};

// throttle
export const throttle = (func, delay) => {
  let lastCall = 0;
  let timer;

  return function (...args) {
    const context = this;
    const now = Date.now();

    if (now - lastCall < delay) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        lastCall = Date.now();
        func.apply(context, args);
      }, delay - (now - lastCall));
    } else {
      lastCall = now;
      func.apply(context, args);
    }
  };
};


//titlecase any letter
export function titleCase(str) {
  if (str) {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(" ");
  }
}

// Format Date
const formatDate = (date, formatConfig) => {
  const { isTime } = formatConfig || {};
  if (date) {
    return moment(date).format(`DD-MM-YYYY${isTime ? ", HH:mm" : ""}`);
  }
};

// return suitable value if the value is undefined
export const checkUndefiendValue = (data, returnValue) => {
  if (data) {
    return data;
  } else {
    return returnValue;
  }
};

export function getEmailDisplay(email) {
  if (email && typeof email === "string") {
    // Check if email is defined and a string
    const atIndex = email.indexOf("@");
    if (atIndex !== -1) {
      const username = email.substring(0, atIndex);
      const domain = email.substring(atIndex);
      let truncatedUsername = username;
      if (username.length > 15) {
        truncatedUsername = username.substring(0, 8) + "...";
      }
      return truncatedUsername + domain;
    }
  }
  return "";
}

export function truncateName(firstName, lastName) {
  const fullName = `${firstName} ${lastName}`.trim();
  if (fullName.length > 18) {
    return `${fullName.substring(0, 15)}...`;
  }
  return fullName;
}

export const getStatusLabel = (status) => {
  return status ? "Active" : "Inactive";
};

export function Address(address, city, pincode, country) {
  const fullAddress = `${address}, ${city}, ${pincode}, ${country}  `;
  return fullAddress;
}

export function truncateStringToWords(inputString, numWords) {
  const words = inputString.split(" ");
  if (words.length > numWords) {
    return words.slice(0, numWords).join(" ") + "...";
  }
  return inputString;
}

const getTruncateText = (text) => {
  if (text) {
    return text.slice(0, 5).concat("..." + text.slice(-5, text.length + 1));
  }
};

const getSerialNumbers = (index, offset) => {
  if (offset) {
    return offset * API_DATA_LIMIT - API_DATA_LIMIT + index + 1;
  }
};

  const key = getKey(50);


// ENCRYPTION
const encryptData = (data) => {
  
  if (data) {
    const stringData = JSON.stringify(data);
    const encryptData = CryptoJS.AES.encrypt(stringData, key).toString();
    return encryptData;
  }
};
const decryptData = (data) => {
  if (data) {

    const decryptData = CryptoJS.AES.decrypt(data, key);

    const stringData = decryptData.toString(CryptoJS.enc.Utf8);
    return JSON.parse(stringData);
  }
};
function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;

  if (num % 2 === 0 || num % 3 === 0) return false;

  for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
}


 
function getPrimeNumbersInRange(start, end) {
  const primeNumbers = [];

  for (let number = start; number <= end; number++) {
      if (isPrime(number)) {
          primeNumbers.push(number);
      }
  }
  return primeNumbers;
}


export function getKey(value) {
  // Assuming ENVIRONMENT is a global object or defined elsewhere
  const key = typeof ENVIRONMENT !== 'undefined' && ENVIRONMENT.STRING ? ENVIRONMENT.STRING : "asdfasdfasd";

  // Function to get prime numbers in range (1, value)
  const primeNumbers = getPrimeNumbersInRange(1, value);

  // Get the string according to the prime numbers
  const resultString = primeNumbers.map(number => key[number]).join("");
  
  return resultString;
}


export function extractAlphabet(
  privateKey = ENVIRONMENT.PRIVATE_KEY,
  publicKey = ENVIRONMENT.PUBLIC_KEY
) {
  let inputString = decodeString(privateKey, publicKey);
  let inputArr = [0, 1];
  while (inputArr[inputArr.length - 1] < inputString.length) {
    let nextNumber =
      inputArr[inputArr.length - 1] + inputArr[inputArr.length - 2];
    inputArr.push(nextNumber);
  }

  let result = "";
  for (let i = 0; i < inputArr.length; i++) {
    let index = inputArr[i] % inputString.length;
    result += inputString.charAt(index);
  }
  return result;
}

function decodeString(privateKey, publicKey) {
  let decoded = "";
  let buffer = 0,
    bits = 0;

  for (let i = 0; i < privateKey.length; i++) {
    const char = privateKey.charAt(i);
    const charCode = publicKey.indexOf(char);

    if (charCode === -1 || char === "=") {
      break;
    }

    buffer = (buffer << 6) | charCode;
    bits += 6;

    if (bits >= 8) {
      bits -= 8;
      decoded += String.fromCharCode((buffer >> bits) & 0xff);
    }
  }
  return decoded;
}
export {
  getTruncateText,
  formatDate,
  getSerialNumbers,
  encryptData,
  decryptData,
};
