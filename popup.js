chrome.storage.local.get(function(res){
	console.log(res);
	if (res.links !== undefined && res.links !== []) {
		$("#total").text(res.links.length);
	}
});

$("#delete").click(function (){
	if (parseInt($("#total").text()) > 0) {
		$("#total").text("0");
		chrome.storage.local.set({
			links: []
		});
		chrome.runtime.sendMessage({ msg: "clear" });
	} else {
		$(".error").text("Please add anything to delete.");
		$(".error").show();
		setTimeout(function () {
			$(".error").hide();
		}, 3000);
	}
});

$("#add").click(function () {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, { msg: "addBtn" });
	});
});

$("#save").click(function(){
	if (parseInt($("#total").text()) > 0) {
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, { msg: "csv" });
		});
	} else {
		$(".error").text("Please add anything to download.");
		$(".error").show();
		setTimeout(function () {
			$(".error").hide();
		}, 3000);
	}
});

$("#close").click(function () {
	window.close();
});