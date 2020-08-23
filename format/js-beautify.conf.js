module.exports = {
    "html_indent_root": false,
    "break_attr_limit": -1,
    "attr_end_with_gt": true,
    "format_need": ["html", "js", "css"],
    "js-beautify": {
        "indent_size": "editor.tabSize",
        "indent_char": " ",
        "indent_with_tabs": false,
        "brace-style": "collapse",
        "space_after_anon_function": true,
        "css": {},
        "js": {},
        "html": {
            "force_format": ["template"],
            "wrap_attributes": "auto"
        }
    },
    "pug-beautify": {
        "fill_tab": false
    }
};
