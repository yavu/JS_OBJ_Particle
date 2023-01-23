
let lang = {
    axis_type: {
        "": "Absolute",
        "~": "Relative",
        "^": "Local"
    },
    delta_mode: {
        "const": "Constant",
        "x_mul": "Pos X Mul",
        "y_mul": "Pos Y Mul",
        "z_mul": "Pos Z Mul"
    },
    inherit: "Inherit",
    individ: "Individ",
    outliner: "Outliner",
    settings: "Settings",
    setting_language: "Language",
    setting_coordinates: "Coordinates UI",
    setting_theme: "UI Theme",
    lang_setting: {
        "en": "English",
        "ja": "Japanese",
    },
    coordinates: {
        "text": "Text",
        "sigh": "Sign",
    },
    theme: {
        "dark": "Dark",
        "light": "Light",
    },
    import: "Import",
    open: "Open OBJ file",
    preview: "Preview",
    preview_mode: {
        "command": "Command",
        "3d_view": "3D View"
    },
    export: "Export",
    export_file: "mcfunction",
    export_clipboard: "clipboard",
    particle: "Particle",
    pos: "Position",
    delta: "Delta",
    speed: "Speed",
    count: "Count",
    mode: "Mode",
    viewers: "Viewers"
}

let settings = {
    language: "en",//ja
    coordinates: "text",//sign
    theme: "dark",//light
    preview: "command"//3d_view
}

function set_ui_text() {
    document.getElementById("outliner_label").textContent = lang.outliner;
    document.getElementById("settings_label").textContent = lang.settings;
    document.getElementById("setting_1_label").textContent = lang.setting_language;
    document.getElementById("setting_2_label").textContent = lang.setting_coordinates;
    document.getElementById("setting_3_label").textContent = lang.setting_theme;
    document.getElementById("lang_setting").textContent = lang.lang_setting[settings.language];
    option_elem(document.getElementById("lang_setting"), 0).textContent = lang.lang_setting["en"];
    option_elem(document.getElementById("lang_setting"), 1).textContent = lang.lang_setting["ja"];

    document.getElementById("coordinates_setting").textContent = lang.coordinates[settings.coordinates];
    option_elem(document.getElementById("coordinates_setting"), 0).textContent = lang.coordinates["text"];
    option_elem(document.getElementById("coordinates_setting"), 1).textContent = lang.coordinates["sign"];

    document.getElementById("theme_setting").textContent = lang.theme[settings.theme];
    option_elem(document.getElementById("theme_setting"), 0).textContent = lang.theme["dark"];
    option_elem(document.getElementById("theme_setting"), 1).textContent = lang.theme["light"];

    document.getElementById("import_label").textContent = lang.import;
    button_elem(document.getElementById("import_label"), 0).textContent = lang.open;

    document.getElementById("preview_label").textContent = lang.preview;
    document.getElementById("view_mode").textContent = lang.preview_mode[settings.preview];
    option_elem(document.getElementById("view_mode"), 0).textContent = lang.preview_mode["command"];
    option_elem(document.getElementById("view_mode"), 1).textContent = lang.preview_mode["3d_view"];

    document.getElementById("export_label").textContent = lang.export;
    button_elem(document.getElementById("export_label"), 0).textContent = lang.export_file;
    button_elem(document.getElementById("export_label"), 1).textContent = lang.export_clipboard;
    
    document.getElementById("particle_label").textContent = lang.particle;
    document.getElementById("pos_label").textContent = lang.pos;
    document.getElementById("delta_label").textContent = lang.delta;

    function delta_label_change(axis) {
        document.getElementById(`delta_${axis}_type`).textContent = lang.axis_type[`${inherit_check("delta")[axis].type}`];
        option_elem(document.getElementById(`delta_${axis}_type`), 0).textContent = lang.axis_type[""];
        option_elem(document.getElementById(`delta_${axis}_type`), 1).textContent = lang.axis_type["^"];
        option_elem(document.getElementById(`delta_${axis}_type`), 2).textContent = lang.axis_type["~"];
        document.getElementById(`delta_${axis}_mode`).textContent = lang.axis_type[`${inherit_check("delta")[axis].mode}`];
        option_elem(document.getElementById(`delta_${axis}_mode`), 0).textContent = lang.delta_mode["const"];
        option_elem(document.getElementById(`delta_${axis}_mode`), 1).textContent = lang.delta_mode["x_mul"];
        option_elem(document.getElementById(`delta_${axis}_mode`), 2).textContent = lang.delta_mode["y_mul"];
        option_elem(document.getElementById(`delta_${axis}_mode`), 3).textContent = lang.delta_mode["z_mul"];
    }
    document.getElementById("delta_x_label").textContent = lang.delta_x;
    delta_label_change("x");
    document.getElementById("delta_y_label").textContent = lang.delta_y;
    delta_label_change("y");
    document.getElementById("delta_z_label").textContent = lang.delta_z;
    delta_label_change("z");

    document.getElementById("speed_label").textContent = lang.speed;
    document.getElementById("count_label").textContent = lang.count;
    document.getElementById("mode_label").textContent = lang.mode;
    document.getElementById("viewers_label").textContent = lang.viewers;
}

function option_elem(elem, i) {
    return elem.nextElementSibling.nextElementSibling.firstElementChild.children[i];
}

function button_elem(elem, i) {
    return elem.nextElementSibling.children[i].firstElementChild;
}

function lang_ja() {

}

/*
function lang_ja() {
    document.getElementById("outliner_label").textContent = "アウトライナー";
    document.getElementById("settings_label").textContent = "設定";
    document.getElementById("setting_1_label").textContent = "言語";
    document.getElementById("setting_2_label").textContent = "座標系の表示";
    document.getElementById("setting_3_label").textContent = "UIテーマ";
    document.getElementById("lang_setting").textContent = "日本語";
    option_elem(document.getElementById("lang_setting"), 0).textContent = "英語";
    option_elem(document.getElementById("lang_setting"), 1).textContent = "日本語";

    if (document.getElementById("coordinates_setting").textContent == "テキスト") { document.getElementById("coordinates_setting").textContent = "テキスト"; }
    else { document.getElementById("coordinates_setting").textContent = "記号"; }
    option_elem(document.getElementById("coordinates_setting"), 0).textContent = "テキスト";
    option_elem(document.getElementById("coordinates_setting"), 1).textContent = "記号";

    if (document.getElementById("theme_setting").textContent == "Dark") { document.getElementById("theme_setting").textContent = "ダーク"; }
    else { document.getElementById("theme_setting").textContent = "ライト"; }
    option_elem(document.getElementById("theme_setting"), 0).textContent = "ダーク";
    option_elem(document.getElementById("theme_setting"), 1).textContent = "ライト";

    document.getElementById("import_label").textContent = "インポート";
    button_elem(document.getElementById("import_label"), 0).textContent = "OBJファイルを開く";

    document.getElementById("preview_label").textContent = "プレビュー";
    if (document.getElementById("view_mode").textContent == "Command") { document.getElementById("view_mode").textContent = "コマンド"; }
    else { document.getElementById("view_mode").textContent = "3Dビュー"; }
    option_elem(document.getElementById("view_mode"), 0).textContent = "コマンド";
    option_elem(document.getElementById("view_mode"), 1).textContent = "3Dビュー";

    document.getElementById("export_label").textContent = "エクスポート";
    button_elem(document.getElementById("export_label"), 0).textContent = "mcfunctionファイルで保存";
    button_elem(document.getElementById("export_label"), 1).textContent = "クリップボードにコピー";
    
    document.getElementById("particle_label").textContent = "パーティクル";
    document.getElementById("pos_label").textContent = "位置";
    document.getElementById("delta_label").textContent = "偏差";

    function delta_label_change(axis) {
        if (document.getElementById(`delta_${axis}_type`).textContent == "Absolute") { document.getElementById(`delta_${axis}_type`).textContent = "絶対座標"; }
        else if (document.getElementById(`delta_${axis}_type`).textContent == "Relative") { document.getElementById(`delta_${axis}_type`).textContent = "相対座標"; }
        else { document.getElementById(`delta_${axis}_type`).textContent = "ローカル"; }
        option_elem(document.getElementById(`delta_${axis}_type`), 0).textContent = "絶対座標";
        option_elem(document.getElementById(`delta_${axis}_type`), 1).textContent = "相対座標";
        option_elem(document.getElementById(`delta_${axis}_type`), 2).textContent = "ローカル";
        if (document.getElementById(`delta_${axis}_mode`).textContent == "Constant") { document.getElementById(`delta_${axis}_mode`).textContent = "定数"; }
        else if (document.getElementById(`delta_${axis}_mode`).textContent == "Pos X Mul") { document.getElementById(`delta_${axis}_mode`).textContent = "Ｘ座標倍率"; }
        else if (document.getElementById(`delta_${axis}_mode`).textContent == "Pos Y Mul") { document.getElementById(`delta_${axis}_mode`).textContent = "Ｙ座標倍率"; }
        else { document.getElementById(`delta_${axis}_mode`).textContent = "Ｚ座標倍率"; }
        option_elem(document.getElementById(`delta_${axis}_mode`), 0).textContent = "定数";
        option_elem(document.getElementById(`delta_${axis}_mode`), 1).textContent = "Ｘ座標倍率";
        option_elem(document.getElementById(`delta_${axis}_mode`), 2).textContent = "Ｙ座標倍率";
        option_elem(document.getElementById(`delta_${axis}_mode`), 3).textContent = "Ｚ座標倍率";
    }
    document.getElementById("delta_x_label").textContent = "Ｘ軸";
    delta_label_change("x");
    document.getElementById("delta_y_label").textContent = "Ｙ軸";
    delta_label_change("y");
    document.getElementById("delta_z_label").textContent = "Ｚ軸";
    delta_label_change("z");

    document.getElementById("speed_label").textContent = "速度";
    document.getElementById("count_label").textContent = "総数";
    document.getElementById("mode_label").textContent = "モード";
    document.getElementById("viewers_label").textContent = "表示者";
}*/