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
            <option ${order.status === "استلام الحالة" ? "selected" : ""}>استلام الحالة</option>
            <option ${order.status === "تصميم" ? "selected" : ""}>تصميم</option>
            <option ${order.status === "تصوير" ? "selected" : ""}>تصوير</option>
            <option ${order.status === "زركون" ? "selected" : ""}>زركون</option>
            <option ${order.status === "بورسلان" ? "selected" : ""}>بورسلان</option>
            <option ${order.status === "تشطيب" ? "selected" : ""}>تشطيب</option>
            <option ${order.status === "جاهز للتسليم" ? "selected" : ""}>جاهز للتسليم</option>
            <option ${order.status === "تم التسليم" ? "selected" : ""}>تم التسليم</option>
            <option ${order.status === "ملغي" ? "selected" : ""}>ملغي</option>
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
    doctor,
    patient,
    workType,
    status: "استلام الحالة"
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
