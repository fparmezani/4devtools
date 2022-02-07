$(document).ready(() => {
		$("#nv-hb-calculate").prop("disabled", true);
		$("#nv-hb-calculate").addClass("nv-disabled-cursor");
		$("#hb-height").mask("0,00");
		$("#hb-weight").mask("000");
		$("#hb-age").mask("000");
});

$("#hb-height, #hb-weight, #hb-age").keyup(() => {
		const height = $("#hb-height").val();
	  const weight = $("#hb-weight").val();
	  const age = $("#hb-age").val();

		if (height !== "" && weight !== "" && age !== "") {
				$("#nv-hb-calculate").prop("disabled", false);
				$("#nv-hb-calculate").removeClass("nv-disabled-cursor");
		} else {
				$("#nv-hb-calculate").prop("disabled", true);
				$("#nv-hb-calculate").addClass("nv-disabled-cursor");
		}
});

$("#nv-hb-calculate").click(() => {
		hbCalculate();
});

$(".nv-btn-textarea-copy").click(() => {
    copy(".nv-field-copy");
});

$(document).keypress((e) => {
	  const keycode = (e.keyCode ? e.keyCode : e.which);
	  const btnEnabled = $("#nv-hb-calculate").is(":enabled");

	  if (keycode === 13 && btnEnabled) {
	    	hbCalculate();
	  }
});

function hbCalculate() {
		registerBi();

	  const height = $("#hb-height").val().split(",").join("");
	  const weight = $("#hb-weight").val();
	  const age = $("#hb-age").val();
	  const sex = $("#hb-sex").val();
		const factor = getActivityFactorHb();

		const calculateWomen = (weight, height, age, factor) => ((10 * weight) + (6.25 * height) - (5 * age) - 161) * factor;
		const calculateMen = (weight, height, age, factor) => ((10 * weight) + (6.25 * height) - (5 * age) + 5) * factor;

		const tmb =
				sex === "f"
				? calculateWomen(weight, height, age, factor)
				: calculateMen(weight, height, age, factor);

		$(".nv-field-copy").val(`${parseInt(tmb)} kcal`);
}

function getActivityFactorHb() {
	  const activity = $("#hb-activity-factor").val();
	  let factor = 0;

	  switch (activity) {
	    case "1":
		      factor = 1.2;
		      break;
	    case "2":
		      factor = 1.375;
		      break;
	    case "3":
		      factor = 1.5;
		      break;
	    case "4":
		      factor = 1.725;
		      break;
	    case "5":
		      factor = 1.9;
		      break;
	  }

	  return factor;
}
