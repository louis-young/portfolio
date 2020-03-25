const theme = () => {
  const selectedTheme = localStorage.theme;

  const page = document.querySelector(".page");

  const labels = document.querySelectorAll(".switch__label");

  if (selectedTheme) {
    page.classList.remove("theme--light", "theme--dark");

    page.classList.add(`theme--${selectedTheme}`);

    labels.forEach(label => label.classList.remove("switch__label--active"));

    const selected = document.querySelector(`.switch__label--${selectedTheme}`);

    selected.classList.add("switch__label--active");
  }

  const toggle = document.querySelector(".switch");

  toggle.addEventListener("change", event => {
    if (!event.target.classList.contains("switch__input")) {
      return;
    }

    const { theme } = event.target.dataset;

    labels.forEach(label => label.classList.remove("switch__label--active"));

    const selected = document.querySelector(`.switch__label--${theme}`);

    selected.classList.add("switch__label--active");

    page.classList.remove("theme--light", "theme--dark");

    page.classList.add(`theme--${theme}`);

    localStorage.theme = theme;
  });
};

theme();
