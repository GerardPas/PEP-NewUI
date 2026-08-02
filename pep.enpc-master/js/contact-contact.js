function postToGoogleForm(form) {
    formdata = new FormData(form);
    $.ajax({
        "async": true,
        "crossDomain": true,
        "url": "https://docs.google.com/forms/d/e/1FAIpQLSeUb3ft-S73SPerplqgTMDfoFjYkwPxQjgtawNhMoOuoqR6GA/formResponse",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": formdata
    });
}

function clearForm(form) {
    form.elements["entry.1951718622"].value = "";
    form.elements["entry.396007678"].value = "";
    form.elements["entry.1332571731"].value = "";
    form.elements["entry.216023587"].value = "";
    form.elements["entry.383904697"].value = "";
    form.elements["entry.1699257137"].value = "";

}

function validateForm(form) {
    if (form.elements["entry.1951718622"].value == "") {
       return false;
    }
    if (form.elements["entry.396007678"].value == "") {
       return false;
    }
    if (form.elements["entry.1332571731"].value == "") {
       return false;
    }
    if (form.elements["entry.383904697"].value == "") {
        return false;
    }
    if (form.elements["entry.1699257137"].value == "") {
        return false;
    }
    return true;
 }

function handleSubmitForm(form) {
    document.activeElement.blur();
    var isFormValid = validateForm(form);
    if (!isFormValid) {
        document.getElementById("form-error").style.display = 'block';
    } else {
        postToGoogleForm(form);
        document.getElementById("form-error").style.display = 'none';
        document.getElementById("form-success").style.display = 'block';
        clearForm(form);
    }
}