document.getElementById("regForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const address = document.getElementById("address").value.trim();
  const college = document.getElementById("college").value;
  const dobRaw = document.getElementById("dob").value;
  const photoInput = document.getElementById("photo");

  const gender = document.querySelector('input[name="gender"]:checked').value;

  const skills = [];
  document
    .querySelectorAll('.inline input[type="checkbox"]:checked')
    .forEach((cb) => skills.push(cb.value));

  const dob = new Date(dobRaw).toLocaleDateString("en-GB");

  const reader = new FileReader();
  reader.onload = function () {
    const formData = {
      name,
      address,
      gender,
      college,
      skills,
      dob,
      photo: reader.result,
    };

    localStorage.setItem("formData", JSON.stringify(formData));
    window.location.href = "dashboard.html";
  };

  reader.readAsDataURL(photoInput.files[0]);
});
