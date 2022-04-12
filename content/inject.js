chrome.runtime.onMessage.addListener(function(req, sender, sendResponse){
	if (req.msg == "inject") {
		if ($("#extIframe").length) {
    		$("#extIframe").remove();
  		} else {
    		var popup = chrome.runtime.getURL("popup.html");
    		var iframe = $("<iframe/>", { id: "extIframe" }).attr("src", popup);
    		iframe.css({
      			width: "430px",
      			height: "230px",
      			border: "1px solid #ddd",
      			boxShadow: "0 0 10px #CCC",
      			zIndex: 9999999999,
      			position: "fixed",
      			top: "10px",
      			right: "10px",
      			overflowX: "hidden",
    		});
    		iframe.appendTo("body");
  		}
  		sendResponse("true");
	} 
	if (req.msg == "remove") {
    	$("#extIframe").remove();
  	}
	return true;
});