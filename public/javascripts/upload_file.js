$(document).ready(function() {

    const StoreFiles = [];

    $('#photo-1').on('change', function () {
        let reader = new FileReader();
        let files = $('#photo-1')[0].files;
        let extension = ['jpg', 'png'];
        if(files.length > 0 && extension.indexOf((files[0].name).split('.').pop()) !== -1) {
            var img = document.createElement('img');
            let src;
            reader.readAsDataURL(files[0]);
            reader.onload = function () {
                src = reader.result;
                // Устанавливаем src для изображения
                img.setAttribute('src', src);
                img.setAttribute('height', "160px");
                //img.setAttribute('width', "200px");

                // Добавляем в хранилище
                StoreFiles.push(files[0]);
                //files[0].value = '';
                // Добавляем изображение на страницу
                $("#preview").append(img);
                console.log(StoreFiles);
            };

            reader.onerror = function () {
                console.log(reader.error);
            };
        }

    });

    $("#create-post").submit(function (e) {
        e.preventDefault();
        if (this.checkValidity() === false) {
            this.classList.add('was-validated');
            return;
        }
        const formData = new FormData();

        formData.append('title', $("#input-title").val());
        formData.append('text', $("#area-inp").html());

        StoreFiles.map((file, index) => {
            formData.append(`file${index + 1}`, file);
        });
        $.ajax({
            url: '/cabinet/add_post',
            type: 'post',
            data: formData,
            contentType: false,
            processData: false,
            success: function(data) {
                alert('Файлы были успешно загружены');
            }
        });
    });
    /*

    function getSelectionText() {
        var text = "";
        var activeEl = document.activeElement;
        var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
        if (
            (activeElTagName == "textarea") || (activeElTagName == "input" &&
            /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
            (typeof activeEl.selectionStart == "number")
        ) {
            text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
        } else if (window.getSelection) {
            text = window.getSelection().toString();
        }
        return text;
    }
    $("#area-inp").on("click", function () {
        let text = getSelectionText();
        if(text != "") {
            console.log(text);
            //$("#area-inp").append('<a href="/cabinet">Ссылочка</a>');
        }
    });
    /*
    document.onmouseup = document.onkeyup = document.onselectionchange = function() {
        document.getElementById("area-inp").value = getSelectionText();
    };
     */
});