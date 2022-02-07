$(document).ready(() => {
    getRenavam();
});

$("#nv-new-generator-renavam").click(() => {
    getRenavam();
});

$("#nv-new-generator-copy-renavam").click(() => {
  	getRenavam();
  	copy(".nv-field-copy");
});

$(".nv-btn-textarea-copy").click(() => {
    copy(".nv-field-copy");
});

$(document).keypress((e) => {
    const keycode = (e.keyCode ? e.keyCode : e.which);

    if (keycode === 13) {
        getRenavam();
        copy(".nv-field-copy");
    }
});

function getRenavam() {
    registerBi();

    const n1 = Math.round(Math.random() * 9);
    const n2 = Math.round(Math.random() * 9);
    const n3 = Math.round(Math.random() * 9);
    const n4 = Math.round(Math.random() * 9);
    const n5 = Math.round(Math.random() * 9);
    const n6 = Math.round(Math.random() * 9);
    const n7 = Math.round(Math.random() * 9);
    const n8 = Math.round(Math.random() * 9);
    const n9 = Math.round(Math.random() * 9);
    const n10 = Math.round(Math.random() * 9);

    const sum = n10 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 2 + n1 * 3;
    let dv = 11 - sum % 11;

    if (dv >= 10) {
        dv = 0;
    }

    const field = $("#nv-field-generator-renavam");
    const renavam = `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${n10}${dv}`;
    field.val(renavam).text(renavam);
}
