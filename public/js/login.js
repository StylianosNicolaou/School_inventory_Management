// document.addEventListener("DOMContentLoaded", function () {
//   const loginForm = document.getElementById("loginForm"); // Ensure you have an element with id="loginForm"

//   if (loginForm) {
//     loginForm.addEventListener("submit", async (event) => {
//       event.preventDefault();

//       const schoolName = document.getElementById("school_name").value;
//       const password = document.getElementById("password").value;

//       const response = await fetch("/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ school_name: schoolName, password: password }),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         window.location.href = "/inventory";
//       } else {
//         alert(result.message);
//       }
//     });
//   }
// });

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm"); // Ensure you have an element with id="loginForm"

  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const schoolName = document.getElementById("school_name").value;
      const password = document.getElementById("password").value;

      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ school_name: schoolName, password: password }),
      });

      const result = await response.json();

      if (response.ok) {
        // Store school name in local storage
        localStorage.setItem("schoolName", schoolName);
        window.location.href = "/inventory";
      } else {
        alert(result.message);
      }
    });
  }
});
