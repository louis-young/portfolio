/**
 * Form.
 *
 */

const form = () => {
  const form = document.querySelector(".form");

  /**
   * Destroy.
   *
   * Destroy the form and show message.
   *
   * @param { string } message
   */

  const destroy = (message) => {
    form.innerHTML = `<h2 class="form__notification">${message}</h2>`;
    form.classList.add("form--sent");
  };

  /**
   * Serialize.
   *
   * Serialize the form data.
   *
   * @param { nodeList } inputs
   */

  const serialize = (inputs) => {
    const fields = {};

    Array.from(inputs).forEach((input) => {
      const { name, value } = input;

      fields[name] = value;
    });

    return fields;
  };

  /**
   * Submit.
   *
   * Handle the form submission.
   *
   * @param { object } event
   */

  const submit = async (event) => {
    event.preventDefault();

    const button = document.querySelector(".form__submit");

    button.disabled = "true";

    const inputs = form.querySelectorAll("input, textarea");

    const serializedFormData = serialize(inputs);

    const formData = new FormData();

    formData.append("fields", JSON.stringify(serializedFormData));

    try {
      const url = "https://api.louisyoung.co.uk/send.php";

      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const sent = await response.json();

      destroy(sent.message);
    } catch (error) {
      console.error(error);
    }
  };

  form.addEventListener("submit", submit);
};

form();

/**
 * Recaptcha.
 */

/* eslint-disable no-undef */

grecaptcha.ready(async () => {
  const response = grecaptcha.execute(
    "6LcfxNoUAAAAABsesl6rqP3wSfjjt_k27sxYyRbx",
    {
      action: "form",
    }
  );

  const token = await response;
  const form = document.querySelector(".form");

  const input = document.createElement("input");

  input.value = token;
  input.type = "hidden";
  input.name = "g-recaptcha-response";

  form.appendChild(input);
});
