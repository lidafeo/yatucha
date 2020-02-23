$(document).ready(function() {
    let oDoc, sDefTxt;
    initDoc();

    function initDoc() {
        oDoc = document.getElementById("area-inp");
        //sDefTxt = oDoc.innerHTML;
        //if (document.compForm.switchMode.checked) {
        //    setDocMode(true);
        //}
    }

    function formatDoc(sCmd, sValue) {
        document.execCommand(sCmd, false, sValue);
        oDoc.focus();
    }

    function setDocMode(bToSource) {
        var oContent;
        if (bToSource) {
            oContent = document.createTextNode(oDoc.innerHTML);
            oDoc.innerHTML = "";
            var oPre = document.createElement("pre");
            oDoc.contentEditable = false;
            oPre.id = "sourceText";
            oPre.contentEditable = true;
            oPre.appendChild(oContent);
            oDoc.appendChild(oPre);
            document.execCommand("defaultParagraphSeparator", false, "div");
        } else {
            if (document.all) {
                oDoc.innerHTML = oDoc.innerText;
            } else {
                oContent = document.createRange();
                oContent.selectNodeContents(oDoc.firstChild);
                oDoc.innerHTML = oContent.toString();
            }
            oDoc.contentEditable = true;
        }
        oDoc.focus();
    }
/*
    function printDoc() {
        if (!validateMode()) { return; }
        var oPrntWin = window.open("","_blank","width=450,height=470,left=400,top=100,menubar=yes,toolbar=no,location=no,scrollbars=yes");
        oPrntWin.document.open();
        oPrntWin.document.write("<!doctype html><html><head><title>Print<\/title><\/head><body onload=\"print();\">" + oDoc.innerHTML + "<\/body><\/html>");
        oPrntWin.document.close();
    }

 */

    $(".circle-div").on("click", function (e) {
        if($(this).css("border-width") == '0px' && $(this).data('need') == '1') {
            $(this).css("border", "1px solid black");
        } else {
            $(this).css("border-width", '0px');
        }
        if($(this).data('for') === 'link') {
            let sLnk=prompt('Write the URL here', 'http:\/\/');
            if(sLnk&&sLnk!=''&&sLnk!='http://') {
                formatDoc('createlink',sLnk);
            }
        } else {
            formatDoc($(this).data('for'));
        }
        console.log(oDoc);
    });
});