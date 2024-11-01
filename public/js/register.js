// document
//   .getElementById("register-form")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();

//     const school_name = document.getElementById("school_name").value;
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     fetch("/auth/register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ school_name, email, password }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.message === "School registered and logged in successfully.") {
//           // Redirect to the inventory page upon successful registration and login
//           window.location.href = "/inventory";
//         } else {
//           alert(data.message); // Display error message if any
//         }
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   });

// V2
// document
//   .getElementById("register-form")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();

//     const school_name = document.getElementById("school_name").value;
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     // Absolute path for Vercel compatibility
//     fetch(`${window.location.origin}/auth/register`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ school_name, email, password }),
//     })
//       .then(async (response) => {
//         if (!response.ok) {
//           const text = await response.text();
//           throw new Error(`Failed to register: ${text}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         if (data.message === "School registered and logged in successfully.") {
//           window.location.href = "/inventory"; // Redirect on successful registration
//         } else {
//           alert(data.message);
//         }
//       })
//       .catch((error) => {
//         console.error("Error:", error.message || error);
//         alert("An error occurred during registration. Please try again.");
//       });
//   });

// V3
document
  .getElementById("register-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const school_name = document.getElementById("school_name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ school_name, email, password }),
    })
      .then(async (response) => {
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Failed to register: ${text}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.message === "School registered and logged in successfully.") {
          window.location.href = "/inventory";
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error.message || error);
        alert("An error occurred during registration. Please try again.");
      });
  });
