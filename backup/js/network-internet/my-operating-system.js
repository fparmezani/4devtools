$(document).ready(() => {
		const os = getOperatingSystem();
	  $(".nv-field-copy").val(os);
});

$(".nv-btn-textarea-copy").click(() => {
    copy(".nv-field-copy");
});

function getOperatingSystem() {
		registerBi();

	  let nome = "Não conseguimos indentificar o seu sistema operacional...", agent = window.navigator.userAgent;
	  if (agent.indexOf("Windows NT 10.0") != -1) nome = "Windows 10";
	  if (agent.indexOf("Windows NT 6.2")  != -1) nome = "Windows 8";
	  if (agent.indexOf("Windows NT 6.1")  != -1) nome = "Windows 7";
	  if (agent.indexOf("Windows NT 6.0")  != -1) nome = "Windows Vista";
	  if (agent.indexOf("Windows NT 5.1")  != -1) nome = "Windows XP";
	  if (agent.indexOf("Windows NT 5.0")  != -1) nome = "Windows 2000";
	  if (agent.indexOf("Mac")             != -1) nome = "Mac/iOS";
	  if (agent.indexOf("X11")             != -1) nome = "UNIX";
	  if (agent.indexOf("Linux")           != -1) nome = "Linux";
	  return nome;
}
