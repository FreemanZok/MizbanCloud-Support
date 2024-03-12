"use strict";
function read(id) {
    const input = document.getElementById(id) ?? document.querySelector(id);
    if (!input) return "";
    if (input.type === 'checkbox') return input.checked ? "true" : "false";
    return input.value;
}
function parseFormData(formData) {
    let obj = {};
    for (let key of formData.keys()) {
        obj[key] = formData.get(key);
    }
    return obj;
};
function makeFormData() {
    let form = new FormData;
    form.append('domainid', 'TODO:');
    // PAGE 1
    form.append('name', read('live-name'));
    form.append('pushurl', read('live-link')); //TODO: Api gets the Pull url as Push Url and accepts it in push mode
    form.append('ip', read('ip-safety')); // TODO: ask if the input is for this parameter.
    // PAGE 2
    form.append('protection', read('safe-link'));
    form.append('TODO:', read('archive-switch')); // TODO: the parameter for this input is not specified on API

    // PAGE 3
    form.append('framerate', read('#live-fps .current-item'));
    form.append('hls',); // TODO: no option in UI is available for enable/disable HLS
    form.append('dash',); // TODO: no option in UI is available for enable/disable Dash
    form.append('hlsresolution', read());
    form.append('dashresolution', read());
    form.append('hlsbitrate', read());
    form.append('dashbitrate', read());
    form.append('hlsaudiobitrate', read());
    form.append('dashaudiobitrate', read());


    form.append('type',);
    form.append('record',);
    form.append('useragent',);
    form.append('country',);
    form.append('referer',);


}
function validateFormData(formData) {
    const FORM = parseFormData(formData);
}