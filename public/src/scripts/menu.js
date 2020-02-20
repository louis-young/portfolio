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

const header = () => {
  const header = document.querySelector(".header");

  header.addEventListener("click", event => {
    const { target } = event;

    console.log(target);

    if (!target.classList.contains("header__link")) {
      return;
    }

    const navigation = document.querySelector(".navigation");

    navigation.classList.remove("navigation--open");

    const toggle = document.querySelector(".toggle");

    toggle.classList.remove("toggle--open");
  });
};

header();
