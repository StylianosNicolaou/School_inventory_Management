// Fetch and display products
function fetchAndDisplayProducts() {
  fetch("/inventory/products")
    .then((response) => response.json())
    .then((products) => {
      const productTableBody = document.getElementById("product-table-body");
      productTableBody.innerHTML = ""; // Clear existing table data

      products.forEach((product) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.description}</td>
          <td><img class="product-image" src="${product.image_path}" alt="${product.name}" width="100px" /></td>
          <td>
            <input type="number" min="0" max="10" value="0" data-product-id="${product.id}" />
          </td>
        `;

        productTableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error fetching products:", error));
}

// Call the function on page load
fetchAndDisplayProducts();

// Submit inventory quantities
function submitInventory() {
  const products = [];
  const inputs = document.querySelectorAll("input[type='number']");

  inputs.forEach((input) => {
    const quantity = parseInt(input.value);
    if (quantity > 0) {
      products.push({
        id: input.dataset.productId, // Use dataset to get product ID
        quantity: quantity,
      });
    }
  });

  if (products.length === 0) {
    alert("Please enter a quantity greater than 0 for at least one product.");
    return; // Exit if no valid products are found
  }

  console.log("Submitting inventory data:", products); // Log inventory data before sending

  fetch("/inventory/submit-inventory", {
    // Correct the URL here
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inventory: products }), // Wrap products in an object
  })
    .then((response) => {
      if (response.ok) {
        alert("Inventory submitted successfully!");
        location.reload(); // Reload to fetch the new inventory
      } else {
        alert("Failed to submit inventory.");
        return response.json(); // Return the response for error logging
      }
    })
    .then((errorData) => {
      if (errorData && errorData.error) {
        console.error("Error details:", errorData.error); // Log error details if available
      }
    })
    .catch((error) => console.error("Error submitting inventory:", error));
}

// Add event listener to the submit button
document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.getElementById("submit-inventory"); // Ensure this ID matches your button
  if (submitButton) {
    submitButton.addEventListener("click", submitInventory);
  }
});

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
