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

const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);

function switchTheme(e) {
  if (e.target.checked) {
    document.querySelector(".theme").classList.remove("theme--default");
    document.querySelector(".theme").classList.add("theme--dark");
  } else {
    document.querySelector(".theme").classList.remove("theme--dark");
    document.querySelector(".theme").classList.add("theme--default");
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);
