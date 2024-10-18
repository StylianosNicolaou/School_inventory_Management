// displaySchoolName.js
document.addEventListener("DOMContentLoaded", function () {
  const schoolNameDisplay = document.getElementById("schoolNameDisplay");

  // Retrieve the school name from local storage
  const schoolName = localStorage.getItem("schoolName");

  // Display the school name if it exists
  if (schoolName) {
    schoolNameDisplay.textContent = `Logged in as: ${schoolName}`;
  }
});
