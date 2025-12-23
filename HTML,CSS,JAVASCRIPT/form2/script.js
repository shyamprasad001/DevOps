const form = document.getElementById("regForm");
const card = document.getElementById("card");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  document.getElementById("oName").innerText = name.value;
  document.getElementById("oAddress").innerText = address.value;
  document.getElementById("oCollege").innerText = college.value;
  document.getElementById("oDob").innerText = dob.value;

  document.getElementById("oGender").innerText = document.querySelector(
    'input[name="gender"]:checked'
  ).value;

  let skills = [];
  document
    .querySelectorAll('input[type="checkbox"]:checked')
    .forEach((cb) => skills.push(cb.value));
  document.getElementById("oSkills").innerText = skills.join(", ");

  const file = photo.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => (outImg.src = reader.result);
    reader.readAsDataURL(file);
  }

  card.style.display = "block";
  form.style.display = "none";
});

form.addEventListener("reset", () => {
    
});
