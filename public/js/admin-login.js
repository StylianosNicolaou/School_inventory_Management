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

document
  .getElementById("admin-login-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch(
        "https://school-inv.vercel.app/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
          credentials: "include", // Include credentials for session management
        }
      );

      const result = await response.json();

      if (response.ok) {
        window.location.href =
          "https://school-inv.vercel.app/protected/admin.html"; // Redirect to the protected admin panel
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  });
