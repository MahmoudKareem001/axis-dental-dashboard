let orderNumber = 1;

function addOrder() {

  const doctor = prompt("اسم الطبيب");
  if (!doctor) return;

  const patient = prompt("اسم المريض");
  if (!patient) return;

  const workType = prompt("نوع العمل");
  if (!workType) return;

  const table = document.getElementById("ordersTable");

  table.innerHTML += `
    <tr>
      <td>${orderNumber++}</td>
      <td>${doctor}</td>
      <td>${patient}</td>
      <td>${workType}</td>
      <td>قيد العمل</td>
    </tr>
  `;
}
