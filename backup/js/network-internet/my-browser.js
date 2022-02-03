$(document).ready(() => {
		const browser = getBrowser();
	  $(".nv-field-copy").val(browser.name);
	  $(".nv-field-copy-2").val(browser.version);
});

$(".nv-btn-copy-browser-name").click(() => {
  	copy(".nv-field-copy");
});

$(".nv-btn-copy-browser-version").click(() => {
  	copy(".nv-field-copy-2");
});

$(".nv-btn-textarea-copy").click(() => {
    copy(".nv-field-copy");
});

$(".nv-btn-textarea-copy-2").click(() => {
    copy(".nv-field-copy-2");
});

// http://mrbool.com/how-to-detect-different-browsers-and-their-versions-using-javascript/25424
function getBrowser() {
		registerBi();

	  const objAgent = navigator.userAgent;
	  let objbrowserName = navigator.appName;
	  let objfullVersion = "" + parseFloat(navigator.appVersion);
	  let objBrMajorVersion = parseInt(navigator.appVersion, 10);
	  let objOffsetName;
		let objOffsetVersion;
		let ix;

	  if ((objOffsetVersion=objAgent.indexOf("Chrome")) != -1) {
				objbrowserName = "Google Chrome";
		   	objfullVersion = objAgent.substring(objOffsetVersion + 7);
	  }

	  else if ((objOffsetVersion=objAgent.indexOf("MSIE")) != -1) {
				objbrowserName = "Microsoft Internet Explorer";
		   	objfullVersion = objAgent.substring(objOffsetVersion + 5);
	  }

	  else if ((objOffsetVersion=objAgent.indexOf("Firefox")) != -1) {
	  		objbrowserName = "Mozilla Firefox";
	  }

	  else if ((objOffsetVersion=objAgent.indexOf("Safari")) != -1) {
				objbrowserName = "Apple Safari";
				objfullVersion = objAgent.substring(objOffsetVersion + 7);
				if ((objOffsetVersion=objAgent.indexOf("Version")) != -1)
						objfullVersion = objAgent.substring(objOffsetVersion + 8);
	  }

	  else if ((objOffsetName=objAgent.lastIndexOf(" ") + 1) < (objOffsetVersion=objAgent.lastIndexOf("/"))) {
				objbrowserName = objAgent.substring(objOffsetName, objOffsetVersion);
				objfullVersion = objAgent.substring(objOffsetVersion + 1);
				if (objbrowserName.toLowerCase() == objbrowserName.toUpperCase()) {
						objbrowserName = navigator.appName;
				}
	  }

	  if ((ix=objfullVersion.indexOf(";")) != -1)
	  		objfullVersion=objfullVersion.substring(0, ix);
	  if ((ix=objfullVersion.indexOf(" ")) != -1)
	  		objfullVersion=objfullVersion.substring(0, ix);

	  objBrMajorVersion = parseInt("" + objfullVersion, 10);
	  if (isNaN(objBrMajorVersion)) {
				objfullVersion = "" + parseFloat(navigator.appVersion);
				objBrMajorVersion = parseInt(navigator.appVersion, 10);
	  }

	  const browser = {}
	  browser.name = objbrowserName;
	  browser.version = objfullVersion;
	  return browser;
}
