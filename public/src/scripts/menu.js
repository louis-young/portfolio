// Menu.

const menu = () => {
  // Menu toggle.
  const toggle = document.querySelector(".toggle");
  const navigation = document.querySelector(".navigation");
  const scrollable = document.querySelector(".navigation__inner");

  const toggleNavigation = () => {
    toggle.classList.toggle("toggle--open");
    navigation.classList.toggle("navigation--open");

    if (toggle.classList.contains("toggle--open")) {
      bodyScrollLock.disableBodyScroll(scrollable); // eslint-disable-line no-undef
    } else {
      bodyScrollLock.enableBodyScroll(scrollable); // eslint-disable-line no-undef
    }
  };

  toggle.addEventListener("click", toggleNavigation);

  const header = document.querySelector(".header");

  header.addEventListener("click", event => {
    const { target } = event;

    if (!target.classList.contains("header__link")) {
      return;
    }

    const navigation = document.querySelector(".navigation");

    navigation.classList.remove("navigation--open");

    const toggle = document.querySelector(".toggle");

    toggle.classList.remove("toggle--open");

    bodyScrollLock.enableBodyScroll(scrollable); // eslint-disable-line no-undef
  });
};

menu();

const links = document.querySelectorAll(".header__link");
const sections = document.querySelectorAll(".page__section");

const changeLinkState = () => {
  let index = sections.length;

  while (--index && window.scrollY + 60 < sections[index].offsetTop) {}

  links.forEach(link => link.classList.remove("navigation__link--active"));
  links[index].classList.add("navigation__link--active");
};

changeLinkState();

window.addEventListener("scroll", changeLinkState);

// const darkMode = () => {
//   const toggle = document.querySelector(".switch");

//   toggle.addEventListener("change", event => {
//     const { checked } = event.target;

//     const theme = document.querySelector(".theme");

//     if (checked) {
//       theme.classList.remove("theme--light");
//       theme.classList.add("theme--dark");
//     } else {
//       theme.classList.add("theme--light");
//       theme.classList.remove("theme--dark");
//     }
//   });
// };

// darkMode();

const darkMode = () => {
  const toggle = document.querySelector(".switch");

  toggle.addEventListener("change", event => {
    if (!event.target.classList.contains("switch__input")) {
      return;
    }

    const { theme } = event.target.dataset;

    const labels = document.querySelectorAll(".switch__label");

    labels.forEach(label => label.classList.remove("switch__label--active"));

    const selected = document.querySelector(`.switch__label--${theme}`);

    selected.classList.add("switch__label--active");

    const page = document.querySelector(".page");

    page.classList.remove("theme--light", "theme--dark");

    page.classList.add(`theme--${theme}`);
  });
};

darkMode();
