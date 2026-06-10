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
    orders.filter(order => order.status === "قيد العمل").length;

  document.getElementById("readyOrders").innerText =
    orders.filter(order => order.status === "جاهز للتسليم").length;
}

function addOrder() {
  const doctor = document.getElementById("doctorInput").value;
  const patient = document.getElementById("patientInput").value;
  const workType = document.getElementById("workTypeInput").value;
  const shade = document.getElementById("shadeInput").value;
  const deliveryDate = document.getElementById("deliveryDateInput").value;
  const technician = document.getElementById("technicianInput").value;
  const notes = document.getElementById("notesInput").value;

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
    status: editIndex !== null ? orders[editIndex].status : "قيد العمل"
  };

  if (editIndex !== null) {
    orders[editIndex] = orderData;
    editIndex = null;
  } else {
    orders.push(orderData);
  }

  saveOrders();
  renderOrders();
  clearForm();
}

function clearForm() {
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
          <select onchange="changeStatus(${index}, this.value)">
            <option value="قيد العمل" ${order.status==="قيد العمل"?"selected":""}>قيد العمل</option>
            <option value="تم الاستلام" ${order.status==="تم الاستلام"?"selected":""}>تم الاستلام</option>
            <option value="جاهز للتسليم" ${order.status==="جاهز للتسليم"?"selected":""}>جاهز للتسليم</option>
            <option value="تم التسليم" ${order.status==="تم التسليم"?"selected":""}>تم التسليم</option>
            <option value="تم الإلغاء" ${order.status==="تم الإلغاء"?"selected":""}>تم الإلغاء</option>
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

  alert("عدّل البيانات من النموذج فوق، ثم اضغط حفظ الطلب");
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
