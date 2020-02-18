/**
 * Animations.
 *
 * Instantiate WowJS effects.
 */

const animations = () => {
  AOS.init({ once: true }); // eslint-disable-line no-undef
};

animations();

// const elements = document.querySelectorAll("[data-animate]");

// elements.forEach(element => {
//   element.dataset.aos = "fade-up"; // eslint-disable-line no-param-reassign
//   element.dataset.aosDuration = "1000"; // eslint-disable-line no-param-reassign
//   element.dataset.aosOffset = "750"; // eslint-disable-line no-param-reassign
// });
