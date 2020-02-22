$(document).ready(function() {
    function checkValidForm(form) {
        let check = true;
        /*
        $('#form-signup input').each(function (index) {
            if(this.validity.valid === false) {
                check = false;
            }
        });
         */
        if (form.checkValidity() === false) {
            check = false;
        }
        $("#password2-inp").removeClass("is-invalid");
        if ($("#form-signup #password-inp").val() != $("#password2-inp").val()) {
            $("#password2-inp").addClass("is-invalid");
            let element = $("#password2-inp")[0];
            element.setCustomValidity("Invalid field");
            check = false;
        }
        form.classList.add('was-validated');
        return check;
    }

    let existsLogin = false;
    $('#form-signup').submit(function (e) {
        e.preventDefault();
        $('#err-signup').text("");
        if (!checkValidForm(this)) {
            return;
        }
        $.post('/signup', $(this).serialize(), function (data) {
            if (data.err) {
                $("#form-signup #login-inp")[0].setCustomValidity("Invalid field");
                existsLogin = $("#form-signup #login-inp").val();
                return $('#err-signup').text(data.err);
            }
            window.location.replace('/cabinet');
        });
    });
    $("#form-signup #password-inp, #password2-inp").on("input", function (e) {
        let element = $("#password2-inp")[0];
        element.setCustomValidity("");
        $("#password2-inp").removeClass("is-invalid");
        if ($("#form-signup #password-inp").val() != $("#password2-inp").val()) {
            $("#password2-inp").addClass("is-invalid");
            element.setCustomValidity("Invalid field");
        }
    });
    $("#form-signup #login-inp").on("input", function (e) {
        $(this).val($(this).val().replace(/[А-Яа-яЁё]/, ''));
        if(existsLogin) {
            if ($(this).val() != existsLogin) {
                $("#form-signup #login-inp")[0].setCustomValidity("");
            } else {
                $("#form-signup #login-inp")[0].setCustomValidity("Логин занят");
            }
        }
    });
    let countPhone = 0;

    $("#form-signup #phone-inp").on("input", function (e) {
        $(this).val($(this).val().replace(/[A-Za-zА-Яа-яЁё]/, ''));
        if ($(e.target).val()) {
            if (countPhone > $(e.target).val().length) {
                countPhone = $(e.target).val().length;
                return;
            }
            countPhone = $(e.target).val().length;
            if ($(e.target).val().length == 1) {
                return $(e.target).val($(e.target).val() + '(');
            }
            if ($(e.target).val().length == 5) {
                return $(e.target).val($(e.target).val() + ')');
            }
            if ($(e.target).val().length == 9 || $(e.target).val().length == 12) {
                return $(e.target).val($(e.target).val() + '-');
            }
        }
    });
});