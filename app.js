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
        <td>
          <select onchange="changeStatus(${index}, this.value)">
            <option value="قيد العمل" ${order.status === "قيد العمل" ? "selected" : ""}>قيد العمل</option>
            <option value="جاهز" ${order.status === "جاهز" ? "selected" : ""}>جاهز</option>
            <option value="لم يجهز" ${order.status === "لم يجهز" ? "selected" : ""}>لم يجهز</option>
            <option value="ملغي" ${order.status === "ملغي" ? "selected" : ""}>ملغي</option>
            <option value="بانتظار التصوير" ${order.status === "بانتظار التصوير" ? "selected" : ""}>بانتظار التصوير</option>
            <option value="قيد التصوير" ${order.status === "قيد التصوير" ? "selected" : ""}>قيد التصوير</option>
            <option value="تم التسليم" ${order.status === "تم التسليم" ? "selected" : ""}>تم التسليم</option>
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
    id: orderNumber++,
    doctor,
    patient,
    workType,
    status: "قيد العمل"
  });

  saveOrders();
  renderOrders();
}

function changeStatus(index, newStatus) {
  orders[index].status = newStatus;
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
