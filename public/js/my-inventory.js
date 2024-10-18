// // Fetch and display my inventory
// function fetchMyInventory() {
//   fetch("/inventory/my-inventory")
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       const inventoryTableBody = document.getElementById(
//         "inventory-table-body"
//       );
//       if (!inventoryTableBody) {
//         console.error("Table body element not found.");
//         return; // Exit if the element is not found
//       }

//       if (!Array.isArray(data)) {
//         throw new TypeError("Expected data to be an array");
//       }

//       inventoryTableBody.innerHTML = ""; // Clear existing table data

//       data.forEach((item) => {
//         const row = document.createElement("tr");
//         row.innerHTML = `
//                     <td>${item.id}</td>
//                     <td>${item.name}</td>
//                     <td>${item.description}</td>
//                     <td><img src="${item.image_path}" alt="${item.name}" width="100px" /></td>
//                     <td>${item.quantity}</td>
//                 `;
//         inventoryTableBody.appendChild(row);
//       });
//     })
//     .catch((error) => console.error("Error fetching my inventory:", error));
// }

// // Call the function on page load
// document.addEventListener("DOMContentLoaded", function () {
//   fetchMyInventory(); // Ensure the function runs after the DOM is loaded
// });

// Fetch and display my inventory
function fetchMyInventory() {
  fetch("/inventory/my-inventory")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const inventoryTableBody = document.getElementById(
        "inventory-table-body"
      );
      if (!inventoryTableBody) {
        console.error("Table body element not found.");
        return; // Exit if the element is not found
      }

      if (!Array.isArray(data)) {
        throw new TypeError("Expected data to be an array");
      }

      inventoryTableBody.innerHTML = ""; // Clear existing table data

      data.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>${item.description}</td>
          <td><img src="${item.image_path}" alt="${item.name}" width="100px" /></td>
          <td>${item.quantity}</td>
          <td><button class="delete-btn" data-id="${item.id}">Delete</button></td>
        `;
        inventoryTableBody.appendChild(row);
      });

      // Add event listeners for delete buttons
      const deleteButtons = document.querySelectorAll(".delete-btn");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", handleDelete);
      });
    })
    .catch((error) => console.error("Error fetching my inventory:", error));
}

// Handle the delete button click
function handleDelete(event) {
  const productId = event.target.getAttribute("data-id");

  if (confirm("Are you sure you want to delete this product?")) {
    fetch(`/inventory/my-inventory/${productId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete product");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.message); // Confirm deletion in console
        fetchMyInventory(); // Re-fetch the inventory after deletion
      })
      .catch((error) => console.error("Error deleting product:", error));
  }
}

// Scroll to Top Button
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    // Show the button after scrolling down 300px
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Call the function on page load
document.addEventListener("DOMContentLoaded", function () {
  fetchMyInventory(); // Ensure the function runs after the DOM is loaded
});
