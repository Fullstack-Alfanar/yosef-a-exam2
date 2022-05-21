function editData(obj, removeFunc) {

    $("#AddBtn").addClass("deleteCard");
    $(".deleteCard").click(() => {
        removeFunc();
    });
    $("#AddBtn").removeClass("deleteCard");
}