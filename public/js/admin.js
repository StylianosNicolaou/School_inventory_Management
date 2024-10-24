document.addEventListener("DOMContentLoaded", () => {
  // Fetch and display the list of schools
  fetch("/admin/schools")
    .then((response) => response.json())
    .then((schools) => {
      const schoolList = document.getElementById("school-list");

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
    });

  // Function to fetch and display a school's inventory
  window.viewInventory = function (schoolName) {
    fetch(`/admin/inventory/${schoolName}`)
      .then((response) => response.json())
      .then((inventory) => {
        const inventoryTableBody = document.getElementById(
          "inventory-table-body"
        );
        inventoryTableBody.innerHTML = ""; // Clear previous inventory data

        inventory.forEach((item) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${item.id}</td> <!-- Product ID -->
            <td><img src="${item.image_path}" alt="${item.name}" /></td> <!-- Product Image -->
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
