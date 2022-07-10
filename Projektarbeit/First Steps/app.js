window.onload = function () {
  formTextbox();
  formRequired();
};
/* ---------------------------------- Form ---------------------------------- */

function formTextbox() {
  const textbox = document.querySelectorAll('.form-textbox-input');
  textbox.forEach((textbox) => {
    textbox.addEventListener('keyup', function () {
      if (this.value.length > 0) {
        this.classList.add('form-textbox-entered');
      } else {
        this.classList.remove('form-textbox-entered');
      }
    });
  });

  // const for all inputs with type="date"
  const dateInput = document.querySelectorAll('input[type="date"]');
  dateInput.max = new Date().toLocaleDateString('de-ch');
}
