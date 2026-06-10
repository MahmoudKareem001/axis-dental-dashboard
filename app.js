let orders = JSON.parse(localStorage.getItem("orders")) || [];

function saveOrders() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

function renderOrders() {
  const table = document.getElementById("ordersTable");
  table.innerHTML = "";

  orders.forEach((order, index) => {
    table.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${order.doctor}</td>
        <td>${order.patient}</td>
        <td>${order.workType}</td>
        <td>
          <select onchange="changeStatus(${index}, this.value)">
            <option ${order.status === "قيد العمل" ? "selected" : ""}>قيد العمل</option>
            <option ${order.status === "جاهز" ? "selected" : ""}>جاهز</option>
            <option ${order.status === "لم يجهز" ? "selected" : ""}>لم يجهز</option>
            <option ${order.status === "ملغي" ? "selected" : ""}>ملغي</option>
            <option ${order.status === "بانتظار التصوير" ? "selected" : ""}>بانتظار التصوير</option>
            <option ${order.status === "قيد التصوير" ? "selected" : ""}>قيد التصوير</option>
            <option ${order.status === "تم التسليم" ? "selected" : ""}>تم التسليم</option>
          </select>
        </td>
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
    doctor: doctor,
    patient: patient,
    workType: workType,
    status: "قيد العمل"
  });

  saveOrders();
  renderOrders();
}

function changeStatus(index, status) {
  orders[index].status = status;
  saveOrders();
}

function deleteOrder(index) {
  if (!confirm("حذف الطلب؟")) return;

  orders.splice(index, 1);
  saveOrders();
  renderOrders();
}

renderOrders();
