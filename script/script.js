let taskList = [];
fetchLocalStorage();
$(document).ready(() => {
    let sideBarPopUp = $(".sideBarContainer");
    sideBarPopUp.hide();

    $("#addTaskBtn").click(() => {
        sideBarPopUp.show();
    });

    $("#popUpExit").click(() => {
        $(".sideBarContainer").hide();
    });

    $("#saveTaskBtnSm").click(() => {
        let sub = $("#subjectInputSm");
        let time = $("#timeInputSm");
        let date = $("#dateInputSm");
        let note = $("#noteInputSm");
        getInput(sub, time, date, note);
    });
    $("#saveTaskBtnLg").click(() => {
        let sub = $("#subjectInputLg");
        let time = $("#timeInputLg");
        let date = $("#dateInputLg");
        let note = $("#noteInputLg");
        getInput(sub, time, date, note);
    });
});

function getInput(sub, time, date, note) {
    sub.removeClass("invalidInput");
    time.removeClass("invalidInput");
    date.removeClass("invalidInput");
    note.removeClass("invalidInput");

    let subValid = sub.val() != "" && sub.val() != null ? true : false;
    let dateValid = validateDate(date.val(), time.val());
    let timeValid = validateTime(time.val());
    let noteValid = note.val() != "" && note.val() != null ? true : false;


    if (dateValid && subValid && noteValid) {
        let now = new Date();
        task = {
            "sub": sub.val(),
            "time": time.val(),
            "date": date.val(),
            "note": note.val(),
            "createTime": `${now.getHours()}:${now.getMinutes()} ${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`
        }

        taskList.push(task);
        saveToLocalStorage();
        addTaskToList(task);

        sub.val("");
        time.val("");
        date.val("");
        note.val("");

    } else {
        if (!subValid) sub.addClass("invalidInput");
        if (!timeValid && dateValid) time.addClass("invalidInput");
        if (!dateValid) date.addClass("invalidInput");
        if (!noteValid) note.addClass("invalidInput");
    }
}

function validateDate(date, time) {
    let year = date.split("-")[0];
    let month = date.split("-")[1];
    let day = date.split("-")[2];
    let now = new Date();

    if (date == "" || date == null) {
        return false;
    }
    if (year < now.getFullYear()) {
        return false;
    }
    if (year == now.getFullYear() && month < now.getMonth() + 1) {
        return false;
    }
    if (year == now.getFullYear() &&
        month == now.getMonth() + 1 &&
        day < now.getDate()) {
        return false;
    }
    if (year == now.getFullYear() &&
        month == now.getMonth() + 1 &&
        day == now.getDate()) {
        return validateTime(time);
    }

    return true;
}

function validateTime(time) {
    let now = new Date();

    let hour = time.split(":")[0];
    let minutes = time.split(":")[1];


    if (time == "" || time == null) {
        return false;
    }
    if (hour < now.getHours()) {
        return false;
    }
    if (hour == now.getHours() && minutes < now.getMinutes() + 1) {
        return false;
    }
    return true;
}

function saveToLocalStorage() {
    localStorage.setItem("TaskList", JSON.stringify(taskList));
}
function fetchLocalStorage() {
    if (localStorage.getItem("TaskList")) {
        taskList = JSON.parse(localStorage.getItem("TaskList"));
        for (const i of taskList) {
            addTaskToList(i);
        }
    }
}
function createCard(task) {
    let div = $(`<div></div>`)
    let card = $(`
        <div class="card card-body ">
            <h5 class="card-title">${task.sub}</h5>
            <label>${task.time} ${task.date}</label>
            <hr>
            <p class="card-text">${task.note}</p>
        </div>
        `);
    let buttonsDiv = $(`<div class="controlls"></div>`)
    let button = $(`<button class="btn btn-remove"><i class="bi bi-trash"></i></button>`).on("click", () => {
        let index = taskList.indexOf(task);
        taskList.splice(index, 1);
        saveToLocalStorage();
        div.remove();
    });
    buttonsDiv.append(button);
    card.append(buttonsDiv);
    div.append(card);
    return div;
}
function addTaskToList(task) {
    let card = createCard(task);
    $("#toDoList").prepend(card);
}