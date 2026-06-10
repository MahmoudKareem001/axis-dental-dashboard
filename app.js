let orders = JSON.parse(localStorage.getItem("orders")) || [];
let editIndex = null;

function showSection(sectionId) {
  document.querySelectorAll(".section").forEach(section => {
    section.classList.remove("active");
  });

  document.getElementById(sectionId).classList.add("active");
}

function saveOrders() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

function updateDashboard() {
  document.getElementById("todayOrders").innerText = orders.length;

  document.getElementById("workingOrders").innerText =
    orders.filter(order =>
      order.status !== "جاهز للتسليم" &&
      order.status !== "تم التسليم" &&
      order.status !== "ملغي"
    ).length;

  document.getElementById("readyOrders").innerText =
    orders.filter(order => order.status === "جاهز للتسليم").length;
}

function addOrder() {
  const doctor = document.getElementById("doctorInput").value.trim();
  const patient = document.getElementById("patientInput").value.trim();
  const workType = document.getElementById("workTypeInput").value;
  const shade = document.getElementById("shadeInput").value.trim();
  const deliveryDate = document.getElementById("deliveryDateInput").value;
  const technician = document.getElementById("technicianInput").value.trim();
  const notes = document.getElementById("notesInput").value.trim();

  if (!doctor || !patient || !workType) {
    alert("يرجى تعبئة اسم الطبيب واسم المريض ونوع العمل");
    return;
  }

  const orderData = {
    doctor,
    patient,
    workType,
    shade,
    deliveryDate,
    technician,
    notes,
    status: editIndex !== null ? orders[editIndex].status : "استلام الحالة"
  };

  if (editIndex !== null) {
    orders[editIndex] = orderData;
    editIndex = null;
  } else {
    orders.push(orderData);
  }

  saveOrders();
  renderOrders();
  clearOrderForm();
}

function clearOrderForm() {
  document.getElementById("doctorInput").value = "";
  document.getElementById("patientInput").value = "";
  document.getElementById("workTypeInput").value = "";
  document.getElementById("shadeInput").value = "";
  document.getElementById("deliveryDateInput").value = "";
  document.getElementById("technicianInput").value = "";
  document.getElementById("notesInput").value = "";
}

function renderOrders() {
  const table = document.getElementById("ordersTable");
  if (!table) return;

  table.innerHTML = "";

  orders.forEach((order, index) => {
    table.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${order.doctor}</td>
        <td>${order.patient}</td>
        <td>${order.workType}</td>
        <td>${order.shade || ""}</td>
        <td>${order.deliveryDate || ""}</td>
        <td>${order.technician || ""}</td>
        <td>
          <select class="${statusClass(order.status)}" onchange="changeStatus(${index}, this.value)">
            <option value="استلام الحالة" ${order.status==="استلام الحالة"?"selected":""}>استلام الحالة</option>
            <option value="تصميم" ${order.status==="تصميم"?"selected":""}>تصميم</option>
            <option value="تصوير" ${order.status==="تصوير"?"selected":""}>تصوير</option>
            <option value="زركون" ${order.status==="زركون"?"selected":""}>زركون</option>
            <option value="بورسلان" ${order.status==="بورسلان"?"selected":""}>بورسلان</option>
            <option value="تشطيب" ${order.status==="تشطيب"?"selected":""}>تشطيب</option>
            <option value="جاهز للتسليم" ${order.status==="جاهز للتسليم"?"selected":""}>جاهز للتسليم</option>
            <option value="تم التسليم" ${order.status==="تم التسليم"?"selected":""}>تم التسليم</option>
            <option value="ملغي" ${order.status==="ملغي"?"selected":""}>ملغي</option>
          </select>
        </td>
        <td>${order.notes || ""}</td>
        <td>
          <button onclick="editOrder(${index})">✏️</button>
          <button onclick="deleteOrder(${index})">🗑️</button>
        </td>
      </tr>
    `;
  });

  updateDashboard();
}

function statusClass(status) {
  if (status === "جاهز للتسليم") return "status-ready";
  if (status === "تم التسليم") return "status-done";
  if (status === "ملغي") return "status-cancel";
  return "status-working";
}

function editOrder(index) {
  const order = orders[index];

  document.getElementById("doctorInput").value = order.doctor;
  document.getElementById("patientInput").value = order.patient;
  document.getElementById("workTypeInput").value = order.workType;
  document.getElementById("shadeInput").value = order.shade || "";
  document.getElementById("deliveryDateInput").value = order.deliveryDate || "";
  document.getElementById("technicianInput").value = order.technician || "";
  document.getElementById("notesInput").value = order.notes || "";

  editIndex = index;
}

function changeStatus(index, status) {
  orders[index].status = status;
  saveOrders();
  renderOrders();
}

function deleteOrder(index) {
  if (!confirm("هل تريد حذف الطلب؟")) return;

  orders.splice(index, 1);
  saveOrders();
  renderOrders();
}

renderOrders();
