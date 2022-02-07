$(document).ready(() => {
		$("#nv-imc-calculate").prop("disabled", true);
	  $("#nv-imc-calculate").addClass("nv-disabled-cursor");
		$("#imc-height").mask("0,00");
	  $("#imc-weight").mask("000");
});

$("#imc-height, #imc-weight").keyup(() => {
		const height = $("#imc-height").val();
	  const weight = $("#imc-weight").val();

		if (height !== "" && weight !== "") {
				$("#nv-imc-calculate").prop("disabled", false);
				$("#nv-imc-calculate").removeClass("nv-disabled-cursor");
		} else {
				$("#nv-imc-calculate").prop("disabled", true);
				$("#nv-imc-calculate").addClass("nv-disabled-cursor");
		}
});

$("#nv-imc-calculate").click(() => {
		imcCalculate();
});

$(".nv-btn-textarea-copy").click(() => {
    copy(".nv-field-copy");
});

$(document).keypress((e) => {
	  const keycode = (e.keyCode ? e.keyCode : e.which);
	  const btnEnabled = $("#nv-imc-calculate").is(":enabled");

	  if (keycode === 13 && btnEnabled) {
	  		imcCalculate();
	  }
});

function imcCalculate() {
		registerBi();

	  const height = $("#imc-height").val().split(",").join(".");
	  const weight = $("#imc-weight").val();

	  const calculate = (weight, height) => weight / (height * height);
		const value = parseFloat(calculate(weight, height).toFixed(2));
	  $(".nv-field-copy").val(value);

		fillTableImc(value);
}

function fillTableImc(value) {
		$(".nv-imc-tbody tr").removeClass("nv-imc-tr-active");

		let tr = "";
		switch (true) {
			case (value < 18.5):
					tr = ".nv-imc-tr-1";
					break;
			case (value > 18.6 && value < 24.9):
					tr = ".nv-imc-tr-2";
					break;
			case (value > 25 && value < 29.9):
					tr = ".nv-imc-tr-3";
					break;
			case (value > 30 && value < 34.9):
					tr = ".nv-imc-tr-4";
					break;
			case (value > 35 && value < 39.9):
					tr = ".nv-imc-tr-5";
					break;
			case (value > 40):
					tr = ".nv-imc-tr-6";
					break;
		}

		$(tr).addClass("nv-imc-tr-active");
}
