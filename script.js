const form = document.getElementById("userForm");
const resetBtn = document.getElementById("resetBtn");
const submitBtn = document.getElementById("submitBtn");
const resultSection = document.getElementById("resultSection");
const resultBody = document.getElementById("resultBody");

// Reset button functionality
resetBtn.addEventListener("click", function () {
  form.reset();
  hideAllErrors();
  resultSection.style.display = "none";
});

// Submit button functionality
submitBtn.addEventListener("click", function () {
  if (validateForm()) {
    displayFormData();
  }
});

// Hide all error messages
function hideAllErrors() {
  const errors = document.querySelectorAll(".error");
  errors.forEach((error) => (error.style.display = "none"));
}

// Validate form
function validateForm() {
  hideAllErrors();
  let isValid = true;

  // Validate Name
  const name = document.getElementById("name").value.trim();
  if (name === "") {
    document.getElementById("nameError").style.display = "block";
    isValid = false;
  }

  // Validate Age
  const age = document.getElementById("age").value;
  if (age === "" || parseInt(age) < 1 || parseInt(age) > 150) {
    document.getElementById("ageError").style.display = "block";
    isValid = false;
  }

  // Validate Gender
  const gender = document.querySelector('input[name="gender"]:checked');
  if (!gender) {
    document.getElementById("genderError").style.display = "block";
    isValid = false;
  }

  // Validate Country
  const country = document.getElementById("country").value;
  if (country === "") {
    document.getElementById("countryError").style.display = "block";
    isValid = false;
  }

  // Validate Technological Stack
  const techChecked = document.querySelectorAll('input[name="tech"]:checked');
  if (techChecked.length === 0) {
    document.getElementById("techError").style.display = "block";
    isValid = false;
  }

  // Validate Address
  const address = document.getElementById("address").value.trim();
  if (address === "") {
    document.getElementById("addressError").style.display = "block";
    isValid = false;
  }

  // Validate Phone Number
  const telephone = document.getElementById("telephone").value.trim();
  const phonePattern =
    /^[+]?[0-9]{1,4}?[\s.-]?[(]?[0-9]{1,4}[)]?[\s.-]?[0-9]{1,4}[\s.-]?[0-9]{1,9}$/;
  if (
    telephone === "" ||
    !phonePattern.test(telephone) ||
    telephone.replace(/[^0-9]/g, "").length < 10
  ) {
    document.getElementById("telephoneError").style.display = "block";
    isValid = false;
  }

  // Validate Email
  const email = document.getElementById("email").value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "" || !emailPattern.test(email)) {
    document.getElementById("emailError").style.display = "block";
    isValid = false;
  }

  return isValid;
}

// Display form data in table
function displayFormData() {
  resultBody.innerHTML = "";

  // Get all form values
  const name = document.getElementById("name").value.trim();
  const age = document.getElementById("age").value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const country = document.getElementById("country").value;
  const techChecked = document.querySelectorAll('input[name="tech"]:checked');
  const techStack = Array.from(techChecked)
    .map((cb) => cb.value)
    .join(", ");
  const address = document.getElementById("address").value.trim();
  const telephone = document.getElementById("telephone").value.trim();
  const email = document.getElementById("email").value.trim();

  // Create table rows
  const data = [
    { field: "Name", value: name },
    { field: "Age", value: age },
    { field: "Gender", value: gender },
    { field: "Country", value: country },
    { field: "Technological Stack", value: techStack },
    { field: "Address", value: address },
    { field: "Phone Number", value: telephone },
    { field: "Email", value: email },
  ];

  data.forEach((item) => {
    const row = document.createElement("tr");
    const fieldCell = document.createElement("td");
    const valueCell = document.createElement("td");

    fieldCell.textContent = item.field;
    valueCell.textContent = item.value;

    row.appendChild(fieldCell);
    row.appendChild(valueCell);
    resultBody.appendChild(row);
  });

  // Show result section
  resultSection.style.display = "block";
}
