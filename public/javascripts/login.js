$(document).ready(function() {
    $('#form-login').submit(function (e) {
        e.preventDefault();
        $.post('/login', $(this).serialize(), function (data) {
            if (data.err) {
                return $('#err-login').text(data.err);
            }
            window.location.replace('/cabinet');
        });
    });
});
