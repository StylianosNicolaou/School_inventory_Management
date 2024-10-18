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
//       .then((response) => response.text())
//       .then((data) => {
//         alert(data);
//         if (data === "Registration successful!") {
//           window.location.href = "/login";
//         }
//       });
//   });

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("register-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const schoolName = document.getElementById("school_name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Check if a school is selected
      if (schoolName === "") {
        alert("Please select a school name.");
        return;
      }

      fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ school_name: schoolName, email, password }),
      })
        .then((response) => response.json()) // Parse JSON response
        .then((data) => {
          alert(data.message || "Registration successful!");
          if (data.success) {
            // Assuming the server returns an object with a success key
            window.location.href = "/login";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred during registration. Please try again.");
        });
    });
});
