// logout.js
document.getElementById("logoutButton").addEventListener("click", function () {
  // Clear school name from local storage
  localStorage.removeItem("schoolName");

  // Redirect to login page or handle logout
  window.location.href = "/login";
});
