addEventListener('load', () => {
    yv_menu_select_init();
    yv_menu_number_spin_init();
    yv_menu_color_init();
});
addEventListener('resize', () => {
    yv_menu_select_init();
});

let ui_click = false;

function yv_menu_select_init() {
    let select = document.getElementsByClassName("yv_menu_select");
    for (let i = 0; i < select.length; i++) {
        select.item(i).style.width = `${select.item(i).lastElementChild.offsetWidth}px`;
    }
}


function yv_menu_select(input) {

    let target = input.lastElementChild;
    if (input.lastElementChild.classList.contains("yv_menu_prevent")) { target = input.lastElementChild.previousElementSibling; }

    if (target.style.visibility != "visible") {
        //optionの表示切り替え
        let select = document.getElementsByClassName("yv_menu_select");
        for (let i = 0; i < select.length; i++) {
            select.item(i).lastElementChild.style.visibility = "hidden";
            select.item(i).firstElementChild.nextElementSibling.textContent = "⏷";
        }
        target.style.visibility = "visible";
        input.firstElementChild.nextElementSibling.textContent = "⏶";
        ui_click = true;
    }
    else {
        //optionの表示切り替え
        target.style.visibility = "hidden";
        input.firstElementChild.nextElementSibling.textContent = "⏷";
        ui_click = true;
    }
}
window.addEventListener('click', () => {
    
    let select = document.getElementsByClassName("yv_menu_select");
    if (ui_click) {
        ui_click = false;
    }
    else {
        for (let i = 0; i < select.length; i++) {
            select.item(i).lastElementChild.style.visibility = "hidden";
            select.item(i).firstElementChild.nextElementSibling.textContent = "⏷";
        }
    }
});


function yv_menu_option(input) {
    input.parentElement.parentElement.parentElement.firstElementChild.textContent = input.textContent;
}



function yv_menu_number_spin_init() {
    let number_spin = document.getElementsByClassName("yv_menu_number_spin");
    for (let i = 0; i < number_spin.length; i++) {

        number_spin.item(i).lastElementChild.previousElementSibling.addEventListener("click", () => {
            number_spin.item(i).previousElementSibling.stepUp();
            console.log("a");
        });
        number_spin.item(i).lastElementChild.addEventListener("click", () => {
            number_spin.item(i).previousElementSibling.stepDown();
            console.log("a");
        });
    }
}

function yv_menu_number(input) {
    if (parseFloat(input.max) < parseFloat(input.value)) {
        input.value = input.max;
    }
}

function yv_menu_color_init() {
    let color = document.getElementsByClassName("yv_menu_color");
    for (let i = 0; i < color.length; i++) {
        color.item(i).addEventListener("input", yv_menu_color_update, false);
    }
}

function yv_menu_color_update(input) {
    input.currentTarget.firstElementChild.style.backgroundColor = input.target.value;
}

function yv_menu_color(input) {
    input.parentElement.style.backgroundColor = input.value;
}