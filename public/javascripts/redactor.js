$(document).ready(function() {
    let oDoc, sDefTxt;


    function formatDoc(sCmd, sValue) {
        document.execCommand(sCmd, false, sValue);
        oDoc.focus();
    }

    function initDoc() {
        oDoc = document.getElementById("area-inp");
        //oDoc.focus();
        //sDefTxt = oDoc.innerHTML;
        //if (document.compForm.switchMode.checked) {
        //    setDocMode(true);
        //}
    }

    initDoc();

    $(".circle-div").on("click", function (e) {
        if ($(this).data('for') === 'link') {
            let sLnk = prompt('Write the URL here', 'http:\/\/');
            if (sLnk && sLnk != '' && sLnk != 'http://') {
                formatDoc('createlink', sLnk);
            }
        } else if ($(this).data('for') === 'h3') {
            formatDoc('formatblock', 'h3');
        } else {
            formatDoc($(this).data('for'));
        }
    });
});