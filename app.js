const smallGlass = document.querySelectorAll(".small-glass"),
  liters = document.querySelector(".liters"),
  percentage = document.querySelector(".percentage"),
  remained = document.querySelector(".remained"),
  h3 = document.querySelector("h3"),
  buttonEl = document.querySelector(".dark-mode");

h3.innerText = "Goal: 4 Liters";

const updateGlass = () => {
  const full = document.querySelectorAll(".small-glass.full").length;
  const total = smallGlass.length;
  if (full === 0) {
    percentage.style.visibility = "hidden";
    percentage.style.height = 0;
  } else {
    percentage.style.visibility = "visible";
    percentage.style.height = `${(full / total) * 350}px`;
    percentage.innerText = `${(full / total) * 100}%`;
  }

  if (full === total) {
    remained.style.visibility = "hidden";
    remained.style.height = 0;
  } else {
    remained.style.visibility = "visible";
    liters.innerText = `${4 - (250 * full) / 1000}L`;
  }
};

const drinkedGlass = (index) => {
  if (index === 15 && smallGlass[index].classList.contains("full")) {
    index--;
  } else if (
    smallGlass[index].classList.contains("full") &&
    !smallGlass[index].nextElementSibling.classList.contains("full")
  ) {
    index--;
  }
  smallGlass.forEach((glass, indx) => {
    if (indx <= index) {
      glass.classList.add("full");
    } else {
      glass.classList.remove("full");
    }
  });
  updateGlass();
};

updateGlass();

smallGlass.forEach((item, index) => {
  item.addEventListener("click", () => {
    drinkedGlass(index);
  });
});

let darkMode = localStorage.getItem("dark-mode");

const enableDarkMode = () => {
  document.documentElement.classList.add("dark-theme");
  buttonEl.classList.remove("dark-theme");
  buttonEl.innerText = "Light Theme";
  localStorage.setItem("dark-mode", "enabled");
};

const disableDarkMode = () => {
  document.documentElement.classList.remove("dark-theme");
  buttonEl.classList.add("dark-theme");
  buttonEl.innerText = "Dark Theme";
  localStorage.setItem("dark-mode", "disabled");
};

if (darkMode === "enabled") {
  enableDarkMode();
}

buttonEl.addEventListener("click", (e) => {
  darkMode = localStorage.getItem("dark-mode");
  if (darkMode === "disabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});
