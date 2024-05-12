// JavaScript logic to toggle visibility of additional columns

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get references to elements
  var moreButton = document.querySelector(".qn-brand-button");
  var moreColumns = document.querySelectorAll(".brand-logos:nth-child(n+2)");

  // Hide additional columns initially
  moreColumns.forEach(function (column) {
    column.style.display = "none";
  });

  // Add click event listener to the "More" button
  moreButton.addEventListener("click", function () {
    if (moreButton.textContent === "More ...") {
      // Display additional columns
      moreColumns.forEach(function (column) {
        column.style.display = "block";
      });
      // Change button text to "Less"
      moreButton.textContent = "... Less";
    } else {
      // Hide additional columns
      moreColumns.forEach(function (column) {
        column.style.display = "none";
      });
      // Change button text to "More"
      moreButton.textContent = "More ...";
    }
  });
});

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get references to elements
  var moreButton1 = document.getElementById("toggle-more-btn");
  var secondColumn1 = document.getElementById("more-btn");

  // Hide the second column initially
  secondColumn1.style.display = "none";

  // Add click event listener to the "More" button
  moreButton1.addEventListener("click", function () {
    if (moreButton1.textContent === "More ...") {
      // Display the second column
      secondColumn1.style.display = "block";
      // Change button text to "Less"
      moreButton1.textContent = "... Less";
    } else {
      // Hide the second column
      secondColumn1.style.display = "none";
      // Change button text to "More"
      moreButton1.textContent = "More ...";
    }
  });
});

// function toggleBookkeepingSubMenu(event) {
//   var subMenu = document.getElementById("bookkeepingSubMenu");
//   subMenu.classList.toggle("show");
// }

// document
//   .getElementById("navbar-drawer-id")
//   .addEventListener("click", function (event) {
//     event.stopPropagation();
//   });

// document.querySelectorAll(".form-input").forEach((input) => {
//   const formHelper = input.nextElementSibling.nextElementSibling; // Selecting the form helper element

//   input.addEventListener("focus", () => {
//     input.nextElementSibling.classList.add("active", "focus");
//     input.classList.remove("border-red-500");
//     input.classList.add("border-blue-500");
//     formHelper.textContent = "Share your first name with us"; // Update form helper text
//     formHelper.style.color = "#666";
//   });

//   input.addEventListener("blur", () => {
//     if (input.value === "") {
//       input.nextElementSibling.classList.remove("active");
//       input.classList.remove("border-blue-500");
//       input.classList.add("border-red-500");
//       formHelper.textContent = "Firstname is required"; // Update form helper text
//       formHelper.style.color = "#F87171"; // Set text color to red
//     }
//   });
// });

// document.querySelectorAll(".form-input").forEach((input) => {
//   const formHelper = input.nextElementSibling.nextElementSibling; // Selecting the form helper element
//   const formLabel = input.nextElementSibling; // Selecting the form label element

//   input.addEventListener("focus", () => {
//     formLabel.classList.add("active", "focus");
//     input.classList.remove("border-red-500");
//     input.classList.add("border-blue-500");
//     const fieldName = input.id.replace("-", " "); // Get field name from input id
//     formHelper.textContent = `${
//       fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
//     } is required`; // Update form helper text
//     formHelper.style.color = "#666"; // Reset text color to normal
//     formLabel.style.color = "#000"; // Reset label color to black
//   });

//   input.addEventListener("blur", () => {
//     if (input.value === "") {
//       formLabel.classList.remove("active");
//       input.classList.remove("border-blue-500");
//       input.classList.add("border-red-500");
//       const fieldName = input.id.replace("-", " "); // Get field name from input id
//       formHelper.textContent = `${
//         fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
//       } is required`; // Update form helper text
//       formHelper.style.color = "#F87171"; // Set text color to red
//       formLabel.style.color = "#F87171"; // Set label color to red
//     }
//   });
// });

// document.querySelectorAll(".form-input").forEach((input) => {
//   const formHelper = input.nextElementSibling.nextElementSibling; // Selecting the form helper element
//   const formLabel = input.nextElementSibling; // Selecting the form label element
//   let hasInput = false; // Flag to track whether user has entered any input

//   input.addEventListener("focus", () => {
//     formLabel.classList.add("active", "focus");
//     if (!hasInput) {
//       input.classList.remove("border-red-500");
//       input.classList.add("border-blue-500");
//     }
//     const fieldName = input.id.replace("-", " "); // Get field name from input id
//     formHelper.textContent = `${
//       fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
//     } is required`; // Update form helper text
//     formHelper.style.color = "#666"; // Reset text color to normal
//     formLabel.style.color = "#000"; // Reset label color to black
//   });

//   input.addEventListener("blur", () => {
//     if (input.value === "") {
//       formLabel.classList.remove("active");
//       input.classList.remove("border-blue-500");
//       input.classList.add("border-red-500");
//       const fieldName = input.id.replace("-", " "); // Get field name from input id
//       formHelper.textContent = `${
//         fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
//       } is required`; // Update form helper text
//       formHelper.style.color = "#F87171"; // Set text color to red
//       formLabel.style.color = "#F87171"; // Set label color to red
//     } else {
//       hasInput = true; // Update flag to indicate user has entered input
//       input.classList.remove("border-red-500");
//       input.classList.add("border-blue-500");
//       formLabel.style.color = "#000"; // Reset label color to black
//     }
//   });
// });

// document.querySelectorAll(".form-input").forEach((input) => {
//   const formHelper = input.nextElementSibling.nextElementSibling; // Selecting the form helper element
//   const formLabel = input.nextElementSibling; // Selecting the form label element
//   let hasInput = false; // Flag to track whether user has entered any input

//   input.addEventListener("focus", () => {
//     formLabel.classList.add("active", "focus");
//     if (!hasInput) {
//       input.classList.remove("border-red-500");
//       input.classList.add("border-blue-500");
//       formLabel.style.color = "#666"; // Set label color to gray
//     }
//     const fieldName = input.id.replace("-", " "); // Get field name from input id
//     formHelper.textContent = `${
//       fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
//     } is required`; // Update form helper text
//     formHelper.style.color = "#666"; // Reset text color to normal
//   });

//   input.addEventListener("blur", () => {
//     if (input.value === "") {
//       formLabel.classList.remove("active");
//       input.classList.remove("border-blue-500");
//       input.classList.add("border-red-500");
//       const fieldName = input.id.replace("-", " "); // Get field name from input id
//       formHelper.textContent = `${
//         fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
//       } is required`; // Update form helper text
//       formHelper.style.color = "#F87171"; // Set text color to red
//       formLabel.style.color = "#F87171"; // Set label color to red
//     } else {
//       hasInput = true; // Update flag to indicate user has entered input
//       input.classList.remove("border-red-500");
//       input.classList.add("border-blue-500");
//     }
//   });
// });

// document.querySelectorAll(".form-input").forEach((input) => {
//   const formHelper = input.nextElementSibling.nextElementSibling; // Selecting the form helper element
//   const formLabel = input.nextElementSibling; // Selecting the form label element
//   let hasInput = input.value.trim() !== ""; // Check if the input field already has some input
//   let initialHelpText = formHelper.textContent; // Store the initial help text

//   input.addEventListener("focus", () => {
//     formLabel.classList.add("active", "focus");
//     if (!hasInput) {
//       input.classList.remove("border-red-500");
//       input.classList.add("border-blue-500");
//       formLabel.style.color = "blue"; // Set label color to blue
//     }
//     const fieldName = input.id.replace("-", " "); // Get field name from input id
//     formHelper.textContent = `${
//       fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
//     } is required`; // Update form helper text
//     formHelper.style.color = "#666"; // Reset text color to normal
//   });

//   input.addEventListener("blur", () => {
//     if (input.value === "") {
//       formLabel.classList.remove("active");
//       input.classList.remove("border-blue-500");
//       input.classList.add("border-red-500");
//       const fieldName = input.id.replace("-", " "); // Get field name from input id
//       formHelper.textContent = `${
//         fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
//       } is required`; // Update form helper text
//       formHelper.style.color = "#F87171"; // Set text color to red
//       formLabel.style.color = "#F87171"; // Set label color to red
//     } else {
//       hasInput = true; // Update flag to indicate user has entered input
//       input.classList.remove("border-red-500");
//       input.classList.add("border-blue-500");
//       formHelper.textContent = initialHelpText; // Restore initial help text
//       formHelper.style.color = "#666"; // Reset text color to normal
//     }

//     // Additional checks for specific input fields
//     if (input.id === "email") {
//       if (!isValidEmail(input.value)) {
//         formHelper.textContent =
//           "Please enter a valid email address. Email should be at least 8 characters long.";
//         formHelper.style.color = "#F87171"; // Set text color to red
//       }
//     } else if (input.id === "phone") {
//       if (input.value.length < 6) {
//         formHelper.textContent =
//           "Phone number should be at least 6 characters long.";
//         formHelper.style.color = "#F87171"; // Set text color to red
//       }
//     } else if (input.id === "store") {
//       const storeValue = parseInt(input.value);
//       if (isNaN(storeValue) || storeValue > 9999) {
//         formHelper.textContent =
//           "Please provide a valid number. Number of stores cannot be more than 9999.";
//         formHelper.style.color = "#F87171"; // Set text color to red
//       }
//     }
//   });
// });

// // Function to validate email address
// function isValidEmail(email) {
//   // Regular expression for validating email
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// }

// document.querySelectorAll(".form-input").forEach((input) => {
//   const formHelper = input.nextElementSibling.nextElementSibling; // Selecting the form helper element
//   const formLabel = input.nextElementSibling; // Selecting the form label element
//   let hasInput = input.value.trim() !== ""; // Check if the input field already has some input
//   let initialHelpText = formHelper.textContent; // Store the initial help text

//   input.addEventListener("focus", () => {
//     formLabel.classList.add("active", "focus");
//     if (!hasInput) {
//       input.classList.remove("border-red-500");
//       input.classList.add("border-blue-500");
//       formLabel.style.color = "blue"; // Set label color to blue
//     }
//     const fieldName = input.id.replace("-", " "); // Get field name from input id
//     formHelper.textContent = `${
//       fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
//     } is required`; // Update form helper text
//     formHelper.style.color = "#666"; // Reset text color to normal
//   });

//   input.addEventListener("blur", () => {
//     if (input.value === "") {
//       formLabel.classList.remove("active");
//       input.classList.remove("border-blue-500");
//       input.classList.add("border-red-500");
//       const fieldName = input.id.replace("-", " "); // Get field name from input id
//       formHelper.textContent = `${
//         fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
//       } is required`; // Update form helper text
//       formHelper.style.color = "#F87171"; // Set text color to red
//       formLabel.style.color = "#F87171"; // Set label color to red
//     } else {
//       hasInput = true; // Update flag to indicate user has entered input
//       input.classList.remove("border-red-500");
//       input.classList.add("border-blue-500");
//       formHelper.textContent = initialHelpText; // Restore initial help text
//       formHelper.style.color = "#666"; // Reset text color to normal

//       // Additional checks for specific input fields
//       if (input.id === "email") {
//         if (!isValidEmail(input.value)) {
//           formHelper.textContent =
//             "Please enter a valid email address. Email should be at least 8 characters long.";
//           formHelper.style.color = "#F87171"; // Set text color to red
//           return; // Exit the event listener to prevent further execution
//         }
//       } else if (input.id === "phone") {
//         if (input.value.length < 6 || isNaN(input.value)) {
//           formHelper.textContent =
//             "Phone number should be at least 6 characters long.";
//           formHelper.style.color = "#F87171"; // Set text color to red
//           return; // Exit the event listener to prevent further execution
//         }
//       } else if (input.id === "store") {
//         const storeValue = parseInt(input.value);
//         if (isNaN(storeValue) || storeValue > 9999 || storeValue <= 0) {
//           formHelper.textContent =
//             "Please provide a valid number. Number of stores cannot be more than 9999.";
//           formHelper.style.color = "#F87171"; // Set text color to red
//           return; // Exit the event listener to prevent further execution
//         }
//       }
//     }
//   });
// });

// // Function to validate email address
// function isValidEmail(email) {
//   // Regular expression for validating email
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// }

document.querySelectorAll(".form-input").forEach((input) => {
  const formHelper = input.nextElementSibling.nextElementSibling; // Selecting the form helper element
  const formLabel = input.nextElementSibling; // Selecting the form label element
  let hasInput = input.value.trim() !== ""; // Check if the input field already has some input
  let initialHelpText = formHelper.textContent; // Store the initial help text

  input.addEventListener("focus", () => {
    formLabel.classList.add("active", "focus");
    if (!hasInput) {
      input.classList.remove("border-red-500");
      input.classList.add("border-blue-500");
      formLabel.style.color = "blue"; // Set label color to blue
    }
    // const fieldName = input.id.replace("-", " "); // Get field name from input id
    // formHelper.textContent = `${
    //   fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
    // } is required`; // Update form helper text
    // formHelper.style.color = "#666"; // Reset text color to normal

    if (input.hasAttribute("required")) {
      // Check if the input field is required
      const fieldName = input.id.replace("-", " "); // Get field name from input id
      formHelper.textContent = `${
        fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
      } is required`; // Update form helper text
    }
    formHelper.style.color = "#666"; // Reset text color to normal
  });

  input.addEventListener("blur", () => {
    if (input.value === "") {
      formLabel.classList.remove("active");
      input.classList.remove("border-blue-500");
      input.classList.add("border-red-500");
      // const fieldName = input.id.replace("-", " "); // Get field name from input id
      // formHelper.textContent = `${
      //   fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
      // } is required`; // Update form helper text
      if (input.hasAttribute("required")) {
        // Check if the input field is required
        const fieldName = input.id.replace("-", " "); // Get field name from input id
        formHelper.textContent = `${
          fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
        } is required`; // Update form helper text

        formHelper.style.color = "#F87171"; // Set text color to red
        formLabel.style.color = "#F87171"; // Set label color to red
      } else {
        input.classList.remove("border-red-500");
        input.classList.add("border-gray-400");
        formHelper.style.color = "#666"; // Set text color to red
        formLabel.style.color = "#666"; // Set label color to red
      }
    } else {
      hasInput = true; // Update flag to indicate user has entered input
      input.classList.remove("border-red-500");
      input.classList.add("border-blue-500");
      formHelper.textContent = initialHelpText; // Restore initial help text
      formHelper.style.color = "#666"; // Reset text color to normal

      // Additional checks for specific input fields
      if (input.id === "email") {
        if (!isValidEmail(input.value)) {
          formHelper.textContent =
            "Please enter a valid email address. Email should be at least 8 characters long.";
          formHelper.style.color = "#F87171"; // Set text color to red
          formLabel.style.color = "#F87171";
          input.classList.remove("border-blue-500");
          input.classList.add("border-red-500");

          return; // Exit the event listener to prevent further execution
        }
      } else if (input.id === "work-email") {
        if (input.value.length < 8) {
          formHelper.textContent =
            "Please enter a valid email address. Email should be at least 8 characters long.";
          formHelper.style.color = "#F87171"; // Set text color to red
          formLabel.style.color = "#F87171";
          input.classList.remove("border-blue-500");
          input.classList.add("border-red-500");
          return;
        } else if (!isValidEmail(input.value)) {
          formHelper.textContent = "Please enter a valid email address.";
          formHelper.style.color = "#F87171"; // Set text color to red
          formLabel.style.color = "#F87171";
          input.classList.remove("border-blue-500");
          input.classList.add("border-red-500");

          return; // Exit the event listener to prevent further execution
        }
      } else if (input.id === "phone") {
        if (input.value.length < 6 || isNaN(input.value)) {
          formHelper.textContent =
            "Phone number should be at least 6 characters long.";
          formHelper.style.color = "#F87171"; // Set text color to red
          formLabel.style.color = "#F87171";
          input.classList.remove("border-blue-500");
          input.classList.add("border-red-500");

          return; // Exit the event listener to prevent further execution
        }
      } else if (input.id === "store") {
        const storeValue = parseInt(input.value);
        if (isNaN(storeValue) || storeValue > 9999 || storeValue <= 0) {
          formHelper.textContent =
            "Please provide a valid number. Number of stores cannot be more than 9999.";
          formHelper.style.color = "#F87171"; // Set text color to red
          formLabel.style.color = "#F87171";
          input.classList.remove("border-blue-500");
          input.classList.add("border-red-500");

          return; // Exit the event listener to prevent further execution
        }
      } else if (input.id === "additional-notes") {
        formHelper.textContent = initialHelpText; // Restore initial help text
        return; // Do nothing for textarea, keep the initial helper text
      }
    }
  });
});

// Function to validate email address
function isValidEmail(email) {
  // Regular expression for validating email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// document.querySelectorAll(".form-input").forEach((input) => {
//   const formHelper = input.nextElementSibling.nextElementSibling; // Selecting the form helper element
//   const formLabel = input.nextElementSibling; // Selecting the form label element
//   let hasInput = input.value.trim() !== ""; // Check if the input field already has some input
//   let initialHelpText = formHelper.textContent; // Store the initial help text

//   input.addEventListener("focus", () => {
//     formLabel.classList.add("active", "focus");
//     if (!hasInput) {
//       input.classList.remove("border-red-500");
//       input.classList.add("border-blue-500");
//       formLabel.style.color = "blue"; // Set label color to blue
//     }
//     if (input.hasAttribute("required")) {
//       // Check if the input field is required
//       const fieldName = input.id.replace("-", " "); // Get field name from input id
//       formHelper.textContent = `${
//         fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
//       } is required`; // Update form helper text
//     }
//     formHelper.style.color = "#666"; // Reset text color to normal
//   });

//   input.addEventListener("blur", () => {
//     if (input.value === "") {
//       formLabel.classList.remove("active");
//       input.classList.remove("border-blue-500");
//       input.classList.add("border-red-500");
//       if (input.hasAttribute("required")) {
//         // Check if the input field is required
//         const fieldName = input.id.replace("-", " "); // Get field name from input id
//         formHelper.textContent = `${
//           fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
//         } is required`; // Update form helper text
//       }
//       formHelper.style.color = "#F87171"; // Set text color to red
//       formLabel.style.color = "#F87171"; // Set label color to red
//     } else {
//       hasInput = true; // Update flag to indicate user has entered input
//       input.classList.remove("border-red-500");
//       input.classList.add("border-blue-500");
//       formHelper.textContent = initialHelpText; // Restore initial help text
//       formHelper.style.color = "#666"; // Reset text color to normal
//     }
//   });
// });

// // Function to validate email address
// function isValidEmail(email) {
//   // Regular expression for validating email
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// }
