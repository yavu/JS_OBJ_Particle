addEventListener('load', () => {

});

let lang = {
    axis_type: {
        "": "Absolute",
        "~": "Relative",
        "^": "Local"
    },
    delta_mode: {
        "const": "Constant",
        "x_mul": "OBJ X Mul",
        "y_mul": "OBJ Y Mul",
        "z_mul": "OBJ Z Mul"
    },
    inherit: "Inherit",
    individ: "Individ"
}

let import_data = {
    file_name: "",
    loot: {},
    object: {}
};

let select_object = "loot";
let result = "";

function file_changed(elem) {
    import_data = {
        file_name: "",
        loot: {},
        object: {}
    };
    import_data.file_name = elem.files[0].name.replace(".obj", "");
    import_data.loot = {
        inheritance: [],
        particle: {
            name: "end_rod",
            color: "#ffffff",
            color1: "#ffffff",
            color2: "#ffffff",
            size: 1,
            id: "stone"
        },
        pos: {
            type: "~",
            mul: 1
        },
        delta: {
            x: { type: "", mode: "const", value: 0 },
            y: { type: "", mode: "const", value: 0 },
            z: { type: "", mode: "const", value: 0 }
        },
        speed: 0,
        count: 1,
        mode: "normal",
        viewers: "@a"
    };
    elem.files[0]?.text().then(text => {
        import_data.object = text.split("o ")
            .slice(1)
            .map(obj => obj.split(/\r?\n/))
            .map(([object_name, ...vertex]) => ({
                object_name: object_name,
                vertex: vertex.filter(v => v.startsWith("v "))
                    .map(v => v.slice("v ".length))
                    .map(v => v.split(" "))
                    .map(v => v.map(n => parseFloat(n)))
                    .map(([x, y, z]) => ({ x, y, z })),
                inheritance: ["particle", "pos", "delta", "speed", "count", "mode", "viewers"],
                particle: {
                    name: "end_rod",
                    color: "#ffffff",
                    color1: "#ffffff",
                    color2: "#ffffff",
                    size: 1,
                    id: "stone"
                },
                pos: {
                    type: "~",
                    mul: 1
                },
                delta: {
                    x: { type: "", mode: "const", value: 0 },
                    y: { type: "", mode: "const", value: 0 },
                    z: { type: "", mode: "const", value: 0 }
                },
                speed: 0,
                count: 1,
                mode: "normal",
                viewers: "@a"
            }), {});

        console.log(import_data);
        set_outliner();
    });
    ui_update();
    setTimeout(output, 10);
}

function target_object() {
    if (select_object == "loot") { return import_data.loot; }
    else { return import_data.object[select_object]; }
}

function inherit_check(option) {
    if (target_object().inheritance.includes(option)) {
        return import_data.loot[option];
    }
    else {
        return target_object()[option];
    }
}


function set_outliner() {
    let outliner = document.getElementById("outliner");
    while (outliner.firstChild) {
        outliner.removeChild(outliner.firstChild);
    }
    outliner.insertAdjacentHTML('beforeend', `<a class="yv_menu yv_menu_button outliner_file" onclick="outliner_select('loot');"><div class="yv_menu_icon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100px"height="100px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><g id="layer1"><g><path fill="#FFFFFF" d="M55.946,12L88,44.054V88H12V12H55.946 M60.917,0H6C2.687,0,0,2.687,0,6v88c0,3.313,2.687,6,6,6h88c3.313,0,6-2.687,6-6V39.083L60.917,0L60.917,0z"/></g><path fill="none" stroke="#FFFFFF" stroke-width="12" stroke-linejoin="round" stroke-miterlimit="10" d="M100,49.732H59.153c-4.907,0-8.886-3.978-8.886-8.884V0"/></g></svg></div><span>${import_data.file_name}</span></a>`);
    for (let i = 0; i < import_data.object.length; i++) {
        outliner.insertAdjacentHTML('beforeend', `<a class="yv_menu yv_menu_button outliner_object" onclick="outliner_select(${i});"><div class="yv_menu_icon"><svg version="1.1" id="layer1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100px" height="100px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><circle fill="#FFFFFF" cx="50" cy="8.661" r="8.52"/><circle fill="#FFFFFF" cx="85.801" cy="29.331" r="8.52"/><circle fill="#FFFFFF" cx="85.801" cy="70.67" r="8.52"/><circle fill="#FFFFFF" cx="50" cy="91.339" r="8.52"/><circle fill="#FFFFFF" cx="14.2" cy="70.67" r="8.52"/><circle fill="#FFFFFF" cx="14.2" cy="29.331" r="8.52"/></svg></div><span>${import_data.object[i].object_name}</span></a>`);
    }
}

function outliner_select(object_index) {
    select_object = object_index;

    let inheritance_button = document.querySelectorAll(".header .yv_menu_select");
    if (select_object == "loot") {
        for (let i = 0; i < inheritance_button.length; i++) { inheritance_button.item(i).style.visibility = "hidden"; }
    }
    else {
        for (let i = 0; i < inheritance_button.length; i++) { inheritance_button.item(i).style.visibility = "visible"; }
    }
    ui_update();
}

function inherit_changed(mode, option) {
    if (mode == "inherit") {
        if (!target_object().inheritance.includes(option)) {
            target_object().inheritance.push(option);
            ui_update();
        }
        document.getElementById(`${option}_inherit`).textContent = lang.inherit;
        document.getElementById(`${option}_inherit`).parentElement.parentElement.parentElement.style.color = "#489eff";
        document.getElementById(`${option}_inherit`).parentElement.parentElement.parentElement.style.borderColor = "#2373cc";
    }
    else if (mode == "individ") {
        if (target_object().inheritance.includes(option)) {
            target_object().inheritance.splice(import_data.object[select_object].inheritance.indexOf(option), 1);
            target_object()[option] = JSON.parse(JSON.stringify(import_data.loot[option]));
        }
        document.getElementById(`${option}_inherit`).textContent = lang.individ;
        document.getElementById(`${option}_inherit`).parentElement.parentElement.parentElement.style.color = "#ffffff";
        document.getElementById(`${option}_inherit`).parentElement.parentElement.parentElement.style.borderColor = "var(--border_color)";
    }
}

function ui_update() {
    document.getElementById("particle").textContent = inherit_check("particle").name;

    document.getElementById("id_input").style.display = "none";
    document.getElementById("dust_input").style.display = "none";
    document.getElementById("dust_transition_input").style.display = "none";
    if (inherit_check("particle").name == "block" || inherit_check("particle").name == "item") {
        document.getElementById("id_input").style.display = "inline-flex";
    }
    else if (inherit_check("particle").name == "dust") {
        document.getElementById("dust_input").style.display = "inline-flex";
    }
    else if (inherit_check("particle").name == "dust_color_transition") {
        document.getElementById("dust_transition_input").style.display = "inline-flex";
    }

    document.getElementById("id").value = inherit_check("particle").id;
    document.getElementById("dust_color").style.backgroundColor = inherit_check("particle").color;
    document.getElementById("dust_transition_color1").style.backgroundColor = inherit_check("particle").color1;
    document.getElementById("dust_transition_color2").style.backgroundColor = inherit_check("particle").color2;
    document.getElementById("dust_size").value = inherit_check("particle").size;
    document.getElementById("dust_transition_size").value = inherit_check("particle").size;
    document.getElementById("pos_type").textContent = lang.axis_type[`${inherit_check("pos").type}`];
    document.getElementById("pos_mul").value = inherit_check("pos").mul;
    document.getElementById("delta_x_type").textContent = lang.axis_type[`${inherit_check("delta").x.type}`];
    document.getElementById("delta_y_type").textContent = lang.axis_type[`${inherit_check("delta").y.type}`];
    document.getElementById("delta_z_type").textContent = lang.axis_type[`${inherit_check("delta").z.type}`];
    document.getElementById("delta_x_mode").textContent = lang.delta_mode[`${inherit_check("delta").x.mode}`];
    document.getElementById("delta_y_mode").textContent = lang.delta_mode[`${inherit_check("delta").y.mode}`];
    document.getElementById("delta_z_mode").textContent = lang.delta_mode[`${inherit_check("delta").z.mode}`];
    document.getElementById("delta_x_value").value = inherit_check("delta").x.value;
    document.getElementById("delta_y_value").value = inherit_check("delta").y.value;
    document.getElementById("delta_z_value").value = inherit_check("delta").z.value;
    document.getElementById("speed").value = inherit_check("speed");
    document.getElementById("count").value = inherit_check("count");
    document.getElementById("mode").textContent = inherit_check("mode");
    document.getElementById("viewers").value = inherit_check("viewers");

    let inheritance_button = document.querySelectorAll(".header .yv_menu_select span:first-child");
    for (let i = 0; i < inheritance_button.length; i++) {
        inheritance_button.item(i).textContent = lang.individ;
        inheritance_button.item(i).parentElement.parentElement.parentElement.style.color = "#ffffff";
        inheritance_button.item(i).parentElement.parentElement.parentElement.style.borderColor = "var(--border_color)";
    }
    for (let i = 0; i < target_object().inheritance.length; i++) {
        document.getElementById(`${target_object().inheritance[i]}_inherit`).textContent = lang.inherit;
        document.getElementById(`${target_object().inheritance[i]}_inherit`).parentElement.parentElement.parentElement.style.color = "#489eff";
        document.getElementById(`${target_object().inheritance[i]}_inherit`).parentElement.parentElement.parentElement.style.borderColor = "#2373cc";
    }
    output();
}

function particle_changed(elem) {
    inherit_changed("individ", "particle");
    target_object().particle.name = elem.textContent;
    function child_option(particle) {
        switch (particle) {
            case "dust": return 0;
            case "dust_color_transition": return 1;
            case "item": return 2;
            case "block": return 2;
            default: return "none";
        }
    }
    if (child_option(elem.textContent) != "none") {
        target_object().particle.color = "#ffffff",
            target_object().particle.color1 = "#ffffff",
            target_object().particle.color2 = "#ffffff",
            target_object().particle.size = 1,
            target_object().particle.id = "stone"
    }
    ui_update();
}

function id_changed(elem) {
    inherit_changed("individ", "particle");
    target_object().particle.id = elem.value;
    ui_update();
}

function color_changed(elem) {
    inherit_changed("individ", "particle");
    target_object().particle[elem.id] = elem.value;
    ui_update();
}

function dust_size_changed(elem) {
    inherit_changed("individ", "particle");
    if (elem.value < 0 || elem.value === "") {
        elem.value = 0;
    }
    target_object().particle.size = elem.value;
    ui_update();
}

function pos_type_changed(type) {
    target_object().pos.type = type;
    inherit_changed("individ", "pos");
    ui_update();
}

function pos_mul_changed(elem) {
    inherit_changed("individ", "pos");
    if (elem.value === "") {
        elem.value = 0;
    }
    target_object().pos.mul = elem.value;
    ui_update();
}

function delta_type_changed(axis, type) {
    inherit_changed("individ", "delta");
    target_object().delta[axis].type = type;
    ui_update();
}

function delta_mode_changed(axis, mode) {
    inherit_changed("individ", "delta");
    target_object().delta[axis].mode = mode;
    ui_update();
}

function delta_value_changed(axis, elem) {
    inherit_changed("individ", "delta");
    if (elem.value === "") {
        elem.value = 0;
    }
    target_object().delta[axis].value = elem.value;
    ui_update();
}

function speed_changed(elem) {
    inherit_changed("individ", "speed");
    if (elem.value < 0 || elem.value === "") {
        elem.value = 0;
    }
    target_object().speed = elem.value;
    ui_update();
}

function count_changed(elem) {
    inherit_changed("individ", "count");
    if (elem.value < 0 || elem.value === "") {
        elem.value = 0;
    }
    target_object().count = elem.value;
    ui_update();
}

function mode_changed(elem) {
    inherit_changed("individ", "mode");
    target_object().mode = elem.textContent;
    ui_update();
}

function viewers_changed(elem) {
    inherit_changed("individ", "viewers");
    target_object().viewers = elem.value;
    ui_update();
}

function output() {

    let text_preview = document.getElementById("text_preview");
    while (text_preview.firstChild) {
        text_preview.removeChild(text_preview.firstChild);
    }
    result = "";
    text_preview.insertAdjacentHTML('beforeend', `<p>## ${import_data.file_name}.obj</p>`);
    result += `## ${import_data.file_name}.obj\n`;

    for (let i = 0; i < import_data.object.length; i++) {
        let object = import_data.object[i];
        text_preview.insertAdjacentHTML('beforeend', `<p># ${object.object_name}</p>`);
        result += `# ${object.object_name}\n`;
        for (let j = 0; j < object.vertex.length; j++) {

            function inherit(option) {
                if (object.inheritance.includes(option)) {
                    return import_data.loot[option];
                }
                else {
                    return object[option];
                }
            }

            function delta(axis) {
                if (inherit("delta")[axis].mode == "const") {
                    return parseFloat(inherit("delta")[axis].value).toFixed(4);
                }
                else if (inherit("delta")[axis].mode == "x_mul") {
                    return parseFloat(object.vertex[j].x * inherit("delta")[axis].value).toFixed(4);
                }
                else if (inherit("delta")[axis].mode == "y_mul") {
                    return parseFloat(object.vertex[j].y * inherit("delta")[axis].value).toFixed(4);
                }
                else if (inherit("delta")[axis].mode == "z_mul") {
                    return parseFloat(object.vertex[j].z * inherit("delta")[axis].value).toFixed(4);
                }
            }

            function color(object) {
                return `${Math.floor(parseInt(inherit("particle")[object].replace("#", "").substr(0, 2), 16) * 10000 / 255) / 10000} ${Math.floor(parseInt(inherit("particle")[object].replace("#", "").substr(2, 2), 16) * 10000 / 255) / 10000} ${Math.floor(parseInt(inherit("particle")[object].replace("#", "").substr(4, 2), 16) * 10000 / 255) / 10000}`
            }

            if (inherit("particle").name == "block" || inherit("particle").name == "item") {
                text_preview.insertAdjacentHTML('beforeend', `<p>particle ${inherit("particle").name} ${inherit("particle").id} ${inherit("pos").type}${parseFloat(object.vertex[j].x * inherit("pos").mul).toFixed(4)} ${inherit("pos").type}${parseFloat(object.vertex[j].y * inherit("pos").mul).toFixed(4)} ${inherit("pos").type}${parseFloat(object.vertex[j].z * inherit("pos").mul).toFixed(4)} ${inherit("delta").x.type}${delta("x")} ${inherit("delta").y.type}${delta("y")} ${inherit("delta").z.type}${delta("z")} ${inherit("speed")} ${inherit("count")} ${inherit("mode")} ${inherit("viewers")}</p>`);
                result += `particle ${inherit("particle").name} ${inherit("particle").id} ${inherit("pos").type}${parseFloat(object.vertex[j].x * inherit("pos").mul).toFixed(4)} ${inherit("pos").type}${parseFloat(object.vertex[j].y * inherit("pos").mul).toFixed(4)} ${inherit("pos").type}${parseFloat(object.vertex[j].z * inherit("pos").mul).toFixed(4)} ${inherit("delta").x.type}${delta("x")} ${inherit("delta").y.type}${delta("y")} ${inherit("delta").z.type}${delta("z")} ${inherit("speed")} ${inherit("count")} ${inherit("mode")} ${inherit("viewers")}\n`;
            }
            else if (inherit("particle").name == "dust") {
                text_preview.insertAdjacentHTML('beforeend', `<p>particle ${inherit("particle").name} ${color("color")} ${inherit("particle").size} ${inherit("pos").type}${parseFloat(object.vertex[j].x * inherit("pos").mul).toFixed(4)} ${inherit("pos").type}${parseFloat(object.vertex[j].y * inherit("pos").mul).toFixed(4)} ${inherit("pos").type}${parseFloat(object.vertex[j].z * inherit("pos").mul).toFixed(4)} ${inherit("delta").x.type}${delta("x")} ${inherit("delta").y.type}${delta("y")} ${inherit("delta").z.type}${delta("z")} ${inherit("speed")} ${inherit("count")} ${inherit("mode")} ${inherit("viewers")}</p>`);
                result += `particle ${inherit("particle").name} ${color("color")} ${inherit("particle").size} ${inherit("pos").type}${parseFloat(object.vertex[j].x * inherit("pos").mul).toFixed(4)} ${inherit("pos").type}${parseFloat(object.vertex[j].y * inherit("pos").mul).toFixed(4)} ${inherit("pos").type}${parseFloat(object.vertex[j].z * inherit("pos").mul).toFixed(4)} ${inherit("delta").x.type}${delta("x")} ${inherit("delta").y.type}${delta("y")} ${inherit("delta").z.type}${delta("z")} ${inherit("speed")} ${inherit("count")} ${inherit("mode")} ${inherit("viewers")}\n`;
            }
            else if (inherit("particle").name == "dust_color_transition") {
                text_preview.insertAdjacentHTML('beforeend', `<p>particle ${inherit("particle").name} ${color("color1")} ${color("color2")} ${inherit("particle").size} ${inherit("pos").type}${parseFloat(object.vertex[j].x * inherit("pos").mul).toFixed(4)} ${inherit("pos").type}${parseFloat(object.vertex[j].y * inherit("pos").mul).toFixed(4)} ${inherit("pos").type}${parseFloat(object.vertex[j].z * inherit("pos").mul).toFixed(4)} ${inherit("delta").x.type}${delta("x")} ${inherit("delta").y.type}${delta("y")} ${inherit("delta").z.type}${delta("z")} ${inherit("speed")} ${inherit("count")} ${inherit("mode")} ${inherit("viewers")}</p>`);
                result += `particle ${inherit("particle").name} ${color("color1")} ${color("color2")} ${inherit("particle").size} ${inherit("pos").type}${parseFloat(object.vertex[j].x * inherit("pos").mul).toFixed(4)} ${inherit("pos").type}${parseFloat(object.vertex[j].y * inherit("pos").mul).toFixed(4)} ${inherit("pos").type}${parseFloat(object.vertex[j].z * inherit("pos").mul).toFixed(4)} ${inherit("delta").x.type}${delta("x")} ${inherit("delta").y.type}${delta("y")} ${inherit("delta").z.type}${delta("z")} ${inherit("speed")} ${inherit("count")} ${inherit("mode")} ${inherit("viewers")}\n`;
            }
            else {
                text_preview.insertAdjacentHTML('beforeend', `<p>particle ${inherit("particle").name} ${inherit("pos").type}${parseFloat(object.vertex[j].x * inherit("pos").mul).toFixed(4)} ${inherit("pos").type}${parseFloat(object.vertex[j].y * inherit("pos").mul).toFixed(4)} ${inherit("pos").type}${parseFloat(object.vertex[j].z * inherit("pos").mul).toFixed(4)} ${inherit("delta").x.type}${delta("x")} ${inherit("delta").y.type}${delta("y")} ${inherit("delta").z.type}${delta("z")} ${inherit("speed")} ${inherit("count")} ${inherit("mode")} ${inherit("viewers")}</p>`);
                result += `particle ${inherit("particle").name} ${inherit("pos").type}${parseFloat(object.vertex[j].x * inherit("pos").mul).toFixed(4)} ${inherit("pos").type}${parseFloat(object.vertex[j].y * inherit("pos").mul).toFixed(4)} ${inherit("pos").type}${parseFloat(object.vertex[j].z * inherit("pos").mul).toFixed(4)} ${inherit("delta").x.type}${delta("x")} ${inherit("delta").y.type}${delta("y")} ${inherit("delta").z.type}${delta("z")} ${inherit("speed")} ${inherit("count")} ${inherit("mode")} ${inherit("viewers")}\n`;
            }
        }
    }
    console.log(result);
}

function export_clipboard() {
    return text => {
        document.addEventListener('copy', e => {
            e.preventDefault();
            e.clipboardData?.setData('text/plain', text);
            document.removeEventListener('copy', listener);
        });
        document.execCommand('copy');
    }
}

