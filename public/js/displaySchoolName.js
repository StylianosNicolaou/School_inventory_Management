document.addEventListener("DOMContentLoaded", function () {
  fetch("/auth/get-school-info")
    .then((response) => response.json())
    .then((data) => {
      const schoolNameDisplay = document.getElementById("schoolNameDisplay");
      if (data.schoolName) {
        schoolNameDisplay.textContent = `Logged in as: ${data.schoolName}`;
      } else {
        schoolNameDisplay.textContent = "Not logged in";
      }
    })
    .catch((error) => {
      console.error("Error fetching school info:", error);
    });
});
