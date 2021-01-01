const menu = () => {
  const toggle = document.querySelector(".toggle");
  const navigation = document.querySelector(".navigation");
  const scrollable = document.querySelector(".navigation__inner");
  const underlay = document.querySelector(".underlay");

  const toggleNavigation = () => {
    toggle.classList.toggle("toggle--open");
    navigation.classList.toggle("navigation--open");
    underlay.classList.toggle("underlay--open");

    if (toggle.classList.contains("toggle--open")) {
      bodyScrollLock.disableBodyScroll(scrollable); // eslint-disable-line no-undef
    } else {
      bodyScrollLock.enableBodyScroll(scrollable); // eslint-disable-line no-undef
    }
  };

  toggle.addEventListener("click", toggleNavigation);

  const header = document.querySelector(".header");

  header.addEventListener("click", (event) => {
    const { target } = event;

    if (!target.classList.contains("header__link")) {
      return;
    }

    const navigation = document.querySelector(".navigation");

    navigation.classList.remove("navigation--open");

    const toggle = document.querySelector(".toggle");

    toggle.classList.remove("toggle--open");

    bodyScrollLock.enableBodyScroll(scrollable); // eslint-disable-line no-undef

    underlay.classList.remove("underlay--open");
  });

  underlay.addEventListener("click", () => {
    toggleNavigation();
  });
};

menu();
