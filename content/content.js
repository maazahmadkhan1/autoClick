chrome.runtime.onMessage.addListener(function(req, sender, sendResponse){
	if (req.msg == "giveDomain") {
		var url = window.location.hostname.replace("www.","");
		sendResponse(url);
	}
	return true;
});