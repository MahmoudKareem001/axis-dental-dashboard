let orders = JSON.parse(localStorage.getItem("orders")) || [];
let orderNumber = orders.length + 1;

function saveOrders() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

function renderOrders() {
  const table = document.getElementById("ordersTable");
  table.innerHTML = "";

  orders.forEach((order, index) => {
    table.innerHTML += `
      <tr>
        <td>${order.id}</td>
        <td>${order.doctor}</td>
        <td>${order.patient}</td>
        <td>${order.workType}</td>
        <td>${order.status}</td>
        <td>
          <button onclick="deleteOrder(${index})">حذف</button>
        </td>
      </tr>
    `;
  });

  document.getElementById("todayOrders").innerText = orders.length;
}

function addOrder() {
  const doctor = prompt("اسم الطبيب");
  if (!doctor) return;

  const patient = prompt("اسم المريض");
  if (!patient) return;

  const workType = prompt("نوع العمل");
  if (!workType) return;

  orders.push({
    id: orderNumber++,
    doctor,
    patient,
    workType,
    status: "قيد العمل"
  });

  saveOrders();
  renderOrders();
}

function deleteOrder(index) {
  if (!confirm("حذف الطلب؟")) return;

  orders.splice(index, 1);
  saveOrders();
  renderOrders();
}

renderOrders();
