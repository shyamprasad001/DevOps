const yearEl = document.getElementById("year");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const datetextEL = document.getElementById("date-text");
const ampmEl = document.getElementById("ampm");

function updateClock() {
  const date = new Date();

  yearEl.textContent = date.getFullYear();
  hours.textContent =
    date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  minutes.textContent = String(date.getMinutes()).padStart(2, "0");
  seconds.textContent = String(date.getSeconds()).padStart(2, "0");
  ampm.textContent = hours >= 12 ? "PM" : "AM";

  datetextEL.textContent = `${date.toLocaleDateString("en-US", {
    weekday: "short",
  })} | ${date.toLocaleDateString("en-US", {
    month: "long",
  })}`;
}

updateClock();
setInterval("updateClock()", 1000);
