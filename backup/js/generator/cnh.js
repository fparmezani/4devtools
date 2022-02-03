$(document).ready(() => {
    getCnh();
});

$("#nv-new-generator-cnh").click(() => {
    getCnh();
});

$("#nv-new-generator-copy-cnh").click(() => {
  	getCnh();
  	copy(".nv-field-copy");
});

$(".nv-btn-textarea-copy").click(() => {
    copy(".nv-field-copy");
});

$(document).keypress((e) => {
    const keycode = (e.keyCode ? e.keyCode : e.which);

    if (keycode === 13) {
        getCnh();
        copy(".nv-field-copy");
    }
});

function getCnh() {
    registerBi();

    while (true) {
        const n1 = Math.round(Math.random() * 9);
        const n2 = Math.round(Math.random() * 9);
        const n3 = Math.round(Math.random() * 9);
        const n4 = Math.round(Math.random() * 9);
        const n5 = Math.round(Math.random() * 9);
        const n6 = Math.round(Math.random() * 9);
        const n7 = Math.round(Math.random() * 9);
        const n8 = Math.round(Math.random() * 9);
        const n9 = Math.round(Math.random() * 9);

        let aux = 0;

        const sumDv1 = n1 * 9 + n2 * 8 + n3 * 7 + n4 * 6 + n5 * 5 + n6 * 4 + n7 * 3 + n8 * 2 + n9 * 1;
        let dv1 = sumDv1 % 11;
        if (dv1 >= 10) {
            dv1 = 0;
            aux = 2;
        }

        const sumDv2 = n1 * 1 + n2 * 2 + n3 * 3 + n4 * 4 + n5 * 5 + n6 * 6 + n7 * 7 + n8 * 8 + n9 * 9;
        let dv2 = sumDv2 % 11;
        dv2 = dv2 >= 10
            ? 0
            : dv2 - aux;

        // gambi because life is like this... ¯\_(ツ)_/¯
        if (dv2 < 0) {
            continue;
        }

        const field = $("#nv-field-generator-cnh");
        const cnh = `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${dv1}${dv2}`;
        field.val(cnh).text(cnh);

        break;
    }

}
