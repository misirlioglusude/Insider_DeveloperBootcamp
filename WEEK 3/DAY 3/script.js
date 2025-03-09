$(document).ready(function () {
  $("#applyBtn").click(function () {
    $(this).animate(
      {
        marginTop: "-50px",
      },
      500,
      function () {
        $(this).fadeOut(500);
        $("#form-container").fadeIn();
      }
    );
  });

  $("#birthDate").datepicker({
    dateFormat: "mm/dd/yy",
    changeMonth: true,
    changeYear: true,
    yearRange: "1900:2025",
  });

  $("#phone").mask("(999) 999-9999");

  $("#applicationForm").validate({
    rules: {
      firstName: "required",
      lastName: "required",
      email: {
        required: true,
        email: true,
      },
      phone: {
        required: true,
        minlength: 14,
      },
      birthDate: "required",
      position: "required",
    },
    messages: {
      firstName: "Adınızı girin.",
      lastName: "Soyadınızı girin.",
      email: "Geçerli bir e-posta adresi girin.",
      phone: "Telefon numaranızı doğru formatta girin.",
      birthDate: "Doğum tarihinizi seçin.",
      position: "Pozisyonu girin.",
    },
    submitHandler: function (form) {
      $("#success-message").fadeIn();
      setTimeout(function () {
        $("#success-message").fadeOut();
      }, 3000);
    },
  });
});
