window.onload = function () {
  fetch("/admin/schools")
    .then((response) => response.json())
    .then((schools) => {
      const tableBody = document.getElementById("school-table-body");
      schools.forEach((school) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${school.id}</td>
                    <td>${school.school_name}</td>
                    <td>
                        <a href="/admin/school/${school.id}/inventory">View Inventory</a>
                    </td>
                `;
        tableBody.appendChild(row);
      });
    });
};
