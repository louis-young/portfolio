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
