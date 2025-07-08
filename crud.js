// Sélection des éléments
const form = document.getElementById("myForm"),
  imgInput = document.querySelector(".img"),
  file = document.getElementById("imgInput"),
  userName = document.getElementById("name"),
  age = document.getElementById("age"),
  city = document.getElementById("City"),
  email = document.getElementById("email"),
  phone = document.getElementById("phone"),
  post = document.getElementById("post"),
  sDate = document.getElementById("sDate"),
  submitBtn = document.querySelector(".submit"),
  userInfo = document.getElementById("data"),
  modalTitle = document.querySelector("#userForm .modal-title"),
  newUserBtn = document.querySelector(".newUser");

let users = JSON.parse(localStorage.getItem("userProfile")) || [];
let isEdit = false;
let editIndex = null;

// Afficher les utilisateurs au démarrage
showUsers();

// Ajouter un utilisateur
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const userData = {
    picture: imgInput.src || "image/Screenshot_20250121-195356~2.png",
    name: userName.value,
    age: age.value,
    city: city.value,
    email: email.value,
    phone: phone.value,
    post: post.value,
    sDate: sDate.value
  };

  if (isEdit) {
    users[editIndex] = userData;
    isEdit = false;
    submitBtn.innerText = "Submit";
    modalTitle.innerText = "Fill the form";
  } else {
    users.push(userData);
  }

  localStorage.setItem("userProfile", JSON.stringify(users));
  showUsers();
  form.reset();
  imgInput.src = "image/Screenshot_20250121-195356~2.png";

  // Fermer le modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('userForm'));
  modal.hide();
});

// Afficher la liste
function showUsers() {
  userInfo.innerHTML = "";
  users.forEach((user, index) => {
    const row = `
      <tr class="employeeDetails">
        <td>${index + 1}</td>
        <td><img src="${user.picture}" width="50" height="50" /></td>
        <td>${user.name}</td>
        <td>${user.age}</td>
        <td>${user.city}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.post}</td>
        <td>${user.sDate}</td>
        <td>
          <button class="btn btn-success" onclick="viewUser(${index})" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>
          <button class="btn btn-primary" onclick="editUser(${index})" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>
          <button class="btn btn-danger" onclick="deleteUser(${index})"><i class="bi bi-trash"></i></button>
        </td>
      </tr>
    `;
    userInfo.innerHTML += row;
  });
}

// Lire les données
window.viewUser = function(index) {
  const user = users[index];
  document.querySelector(".showImg").src = user.picture;
  document.getElementById("showName").value = user.name;
  document.getElementById("showAge").value = user.age;
  document.getElementById("showCity").value = user.city;
  document.getElementById("showEmail").value = user.email;
  document.getElementById("showPhone").value = user.phone;
  document.getElementById("showPost").value = user.post;
  document.getElementById("showsDate").value = user.sDate;
}

// Modifier
window.editUser = function(index) {
  const user = users[index];
  imgInput.src = user.picture;
  userName.value = user.name;
  age.value = user.age;
  city.value = user.city;
  email.value = user.email;
  phone.value = user.phone;
  post.value = user.post;
  sDate.value = user.sDate;

  isEdit = true;
  editIndex = index;
  submitBtn.innerText = "Update";
  modalTitle.innerText = "Update the form";
}

// Supprimer
window.deleteUser = function(index) {
  if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
    users.splice(index, 1);
    localStorage.setItem("userProfile", JSON.stringify(users));
    showUsers();
  }
}

// Image preview
file.onchange = function () {
  const reader = new FileReader();
  reader.onload = function (e) {
    imgInput.src = e.target.result;
  };
  reader.readAsDataURL(file.files[0]);
};
