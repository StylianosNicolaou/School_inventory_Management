document.addEventListener("DOMContentLoaded", () => {
  // Fetch and display the list of schools
  fetch("/admin/schools")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch schools");
      }
      return response.json();
    })
    .then((schools) => {
      const schoolList = document.getElementById("school-list");

      // Clear the school list before appending new data
      schoolList.innerHTML = "";

      schools.forEach((school) => {
        const schoolItem = document.createElement("div");
        schoolItem.innerHTML = `
          <li>
            ${school.school_name}
            <button onclick="viewInventory('${school.school_name}')">View Inventory</button>
          </li>
        `;
        schoolList.appendChild(schoolItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching schools:", error);
    });

  // Function to fetch and display a school's inventory
  window.viewInventory = function (schoolName) {
    fetch(`/admin/inventory/${schoolName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch inventory");
        }
        return response.json();
      })
      .then((inventory) => {
        const inventoryTableBody = document.getElementById(
          "inventory-table-body"
        );
        inventoryTableBody.innerHTML = ""; // Clear previous inventory data

        // Check if the school has no inventory
        if (inventory.length === 0) {
          inventoryTableBody.innerHTML =
            "<tr><td colspan='5'>No inventory found.</td></tr>";
          return;
        }

        // Populate the table with inventory data
        inventory.forEach((item) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${item.id}</td> <!-- Product ID -->
            <td><img src="${item.image_path}" alt="${item.name}" width="50px" /></td> <!-- Product Image -->
            <td>${item.name}</td>
            <td>${item.description}</td>
            <td>${item.quantity}</td>
          `;
          inventoryTableBody.appendChild(row);
        });
      })
      .catch((error) => {
        console.error("Error fetching inventory:", error);
      });
  };
});
