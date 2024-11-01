// document
//   .getElementById("admin-login-form")
//   .addEventListener("submit", async (event) => {
//     event.preventDefault();

//     const username = document.getElementById("username").value;
//     const password = document.getElementById("password").value;

//     try {
//       const response = await fetch("/admin/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         window.location.href = "/protected/admin.html"; // Redirect to protected admin panel
//       } else {
//         alert(result.message);
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   });

// V2
// document
//   .getElementById("admin-login-form")
//   .addEventListener("submit", async (event) => {
//     event.preventDefault();

//     const username = document.getElementById("username").value;
//     const password = document.getElementById("password").value;

//     try {
//       const response = await fetch(
//         "https://school-inventory-68f0c11dffed.herokuapp.com/admin/login",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ username, password }),
//           credentials: "include", // Include credentials for session management
//         }
//       );

//       const result = await response.json();

//       if (response.ok) {
//         window.location.href =
//           "https://school-inventory-68f0c11dffed.herokuapp.com/protected/admin.html"; // Redirect to the protected admin panel
//       } else {
//         alert(result.message);
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   });

// V3
document
  .getElementById("admin-login-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (response.ok) {
        window.location.href = "/protected/admin.html";
      } else {
        const result = await response.json();
        alert(result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  });
