$(document).ready(function() {

    let StoreFiles = {};
    let StoreFilesIndex = [];

    $('#photo-1').on('change', function () {
        let reader = new FileReader();
        let files = $('#photo-1')[0].files;
        let extension = ['jpg', 'png'];
        if(files.length > 0 && extension.indexOf((files[0].name).split('.').pop()) !== -1) {
            let img = document.createElement('img');
            let src;
            reader.readAsDataURL(files[0]);
            reader.onload = function () {

                if(StoreFilesIndex.length >= 6) {
                    let index = StoreFilesIndex[0];
                    StoreFilesIndex.splice(StoreFilesIndex.indexOf(index), 1);
                    $("#img-div-" + index).remove();
                    delete StoreFiles[index];
                }

                // Добавляем в хранилище
                let index = getFreeIndex();
                StoreFiles[index] = files[0];
                StoreFilesIndex.push(index);

                src = reader.result;
                // Устанавливаем src для изображения
                img.setAttribute('src', src);
                img.setAttribute('id', 'img' + index);
                //img.setAttribute('height', "160px");
                //img.setAttribute('width', "200px");

                //files[0].value = '';
                // Добавляем изображение на страницу
                $("#preview").append(img);
                //img.wrap('<div class="image-div"></div>');
                $("#img" + index).wrap('<div class="wrapper-div"><div class="img-div mr-2" id="img-div-' + index + '"></div></div>');
                $("#img-div-" + index).append('<button type="button" class="close close-button" data-index="' + index + '" aria-label="Close"><span aria-hidden="true">&times;</span></button>')
            };

            reader.onerror = function () {
                console.log(reader.error);
            };
        }

    });

    $("body").on('click', '.close', function (e) {
        e.preventDefault();
        let index = $(this).data("index");
        if(StoreFilesIndex.indexOf(index) !== -1) {
            StoreFilesIndex.splice(StoreFilesIndex.indexOf(index), 1);
        }
        $("#img-div-" + index).remove();
        delete StoreFiles[index];
    });

    $("#input-tag").on("input", function (e) {
        $(this).val($(this).val().replace(/\s/, '#'));
        //let value = $("#input-tag").val();
        //if(/\s/.test(value[value.length - 1])) {
        //    $("#input-tag").val(value + '#');
        //}
    });

    $("#create-post").submit(function (e) {
        e.preventDefault();
        //checkForm(this)
        if (checkForm(this) === false) {
            this.classList.add('was-validated');
            return;
        }
        const formData = new FormData();

        formData.append('title', $("#input-title").val());
        formData.append('category', $("#select-category").val());
        formData.append('text', $("#area-inp").html());
        formData.append('tag', $("#input-tag").val());

        StoreFilesIndex.map((index, i) => {
            formData.append(`file${i + 1}`, StoreFiles[index]);
        });
        $.ajax({
            url: '/cabinet/add-post',
            type: 'post',
            data: formData,
            contentType: false,
            processData: false,
            success: function(data) {
                alert('Файлы были успешно загружены');
            }
        });
    });

    function checkForm(form) {
        $("#err-post").text("");
        if (StoreFilesIndex.length == 0 && $("#area-inp").html().trim() == '') {
            $("#err-post").text("Необходимо создать содержимое поста: минимум - изображение или текст");
            let scrollTop = $('#err-post').offset().top;
            $('html, body').animate({ scrollTop: scrollTop }, 500);
            return false;
        }
        if (form.checkValidity() === false) {
            return false;
        }
        return true;
    }
    function getFreeIndex() {
        for(let i = 0; i < 6; i++) {
            if(StoreFilesIndex.indexOf(i) == -1) {
                return i;
            }
        }
        return 6;
    }

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