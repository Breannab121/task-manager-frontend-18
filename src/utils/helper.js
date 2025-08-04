// Validates if the input string is a properly formatted email address
export const validateEmail = (email) => {
  // Regex checks for one or more characters before and after "@", followed by a domain
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email); // Returns true if valid email, false otherwise
};

// Adds commas as thousands separators to a number (e.g., 1000 => 1,000)
export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return ""; // Return empty string for null or invalid input

  // Split the number into integer and fractional parts (if any)
  const [integerPart, fractionalPart] = num.toString().split(".");

  // Add commas to the integer part using regex
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Return the formatted number with fractional part (if it exists)
  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};