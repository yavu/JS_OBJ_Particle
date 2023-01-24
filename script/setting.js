
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
        "sign": "Sign",
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
    delta_x: "X",
    delta_y: "Y",
    delta_z: "Z",
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
    document.getElementById("pos_type").textContent = lang.axis_type[`${inherit_check("pos").type}`];
    option_elem(document.getElementById("pos_type"), 0).textContent = lang.axis_type[""];
    option_elem(document.getElementById("pos_type"), 1).textContent = lang.axis_type["~"];
    option_elem(document.getElementById("pos_type"), 2).textContent = lang.axis_type["^"];

    document.getElementById("delta_label").textContent = lang.delta;

    function delta_label_change(axis) {
        document.getElementById(`delta_${axis}_type`).textContent = lang.axis_type[`${inherit_check("delta")[axis].type}`];
        option_elem(document.getElementById(`delta_${axis}_type`), 0).textContent = lang.axis_type[""];
        option_elem(document.getElementById(`delta_${axis}_type`), 1).textContent = lang.axis_type["~"];
        option_elem(document.getElementById(`delta_${axis}_type`), 2).textContent = lang.axis_type["^"];
        document.getElementById(`delta_${axis}_mode`).textContent = lang.delta_mode[`${inherit_check("delta")[axis].mode}`];
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

function change_lang(language) {
    if (language == "ja") {
        lang = {
            axis_type: {
                "": "絶対座標",
                "~": "相対座標",
                "^": "ローカル"
            },
            delta_mode: {
                "const": "定数",
                "x_mul": "Ｘ座標倍率",
                "y_mul": "Ｙ座標倍率",
                "z_mul": "Ｚ座標倍率"
            },
            inherit: "継承",
            individ: "個別",
            outliner: "アウトライナー",
            settings: "設定",
            setting_language: "言語",
            setting_coordinates: "座標系の表示",
            setting_theme: "ＵＩテーマ",
            lang_setting: {
                "en": "英語",
                "ja": "日本語"
            },
            coordinates: {
                "text": "テキスト",
                "sign": "記号"
            },
            theme: {
                "dark": "ダーク",
                "light": "ライト"
            },
            import: "インポート",
            open: "OBJファイルを開く",
            preview: "プレビュー",
            preview_mode: {
                "command": "コマンド",
                "3d_view": "3Dビュー"
            },
            export: "エクスポート",
            export_file: "mcfunctionファイルで保存",
            export_clipboard: "クリップボードにコピー",
            particle: "パーティクル",
            pos: "位置",
            delta: "偏差",
            delta_x: "Ｘ軸",
            delta_y: "Ｙ軸",
            delta_z: "Ｚ軸",
            speed: "速度",
            count: "総数",
            mode: "モード",
            viewers: "表示者"
        }
        settings.language = "ja";
    }
    else {
        lang = {
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
                "sign": "Sign",
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
            delta_x: "X",
            delta_y: "Y",
            delta_z: "Z",
            speed: "Speed",
            count: "Count",
            mode: "Mode",
            viewers: "Viewers"
        }
        settings.language = "en";
    }
    if (settings.coordinates == "sign") {
        lang.axis_type = {
            "": "　",
            "~": "～",
            "^": "＾"
        }
    }
    set_ui_text();
}

function coordinates_ui(type) {
    settings.coordinates = type;
    change_lang(settings.language);
}