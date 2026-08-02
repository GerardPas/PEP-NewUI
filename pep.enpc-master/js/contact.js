function postToGoogleForm(form) {
    formdata = new FormData(form);
    $.ajax({
        "async": true,
        "crossDomain": true,
        "url": "https://docs.google.com/forms/d/e/1FAIpQLScjUrZoLPkUP-_y8bvIMwvvf0wPtyRERNpcZ6aNDW4W96r35w/formResponse",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": formdata
    });
}

function clearForm(form) {
    form.elements["entry.1528005357"].value = "";
    form.elements["entry.1529761456"].value = "";
    form.elements["entry.1423871831"].value = "";
    form.elements["entry.1298750786"].value = "";
    form.elements["entry.274756931"].value = "";
    form.elements["entry.428986930"].value = "";

}

function validateForm(form) {
    if (form.elements["entry.1528005357"].value == "") {
       return false;
    }
    if (form.elements["entry.1529761456"].value == "") {
       return false;
    }
    if (form.elements["entry.1423871831"].value == "") {
       return false;
    }
    if (form.elements["entry.274756931"].value == "") {
        return false;
    }
    if (form.elements["entry.428986930"].value == "") {
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