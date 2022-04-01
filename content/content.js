chrome.runtime.onMessage.addListener(function(req, sender, sendResponse){
	if (req.msg == "giveDomain") {
		var url = window.location.hostname.replace("www.","");
		sendResponse(url);
	} 
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

$(document).ready(function () {
  $(document).on("click", "button", function () {
    console.log($(this).text());
    if ($(this).text().toLowerCase() == "login" && $(this).text().toLowerCase() == "log in" && $(this).text().toLowerCase() == "sign in") {
      var elems = document.querySelectorAll("*"),
      res = Array.from(elems).find(v => v.textContent.toLowerCase() == 'name' || v.textContent.toLowerCase() == 'email');  
      console.log(res ? 'found!' : 'not found');
    } else if ($(this).text().toLowerCase() == "register" && $(this).text().toLowerCase() == "sign up") {
      var elems = document.querySelectorAll("*"),
      res = Array.from(elems).find(v => v.textContent.toLowerCase() == 'name' || v.textContent.toLowerCase() == 'email');  
      console.log(res ? 'found!' : 'not found');
    }
  });
  $(document).on("click", "input[type='submit']", function () {
    console.log($(this).text());
    if ($(this).text().toLowerCase() == "login" && $(this).text().toLowerCase() == "log in" && $(this).text().toLowerCase() == "sign in") {
      var elems = document.querySelectorAll("*"),
      res = Array.from(elems).find(v => v.textContent.toLowerCase() == 'name' || v.textContent.toLowerCase() == 'email');  
      console.log(res ? 'found!' : 'not found');
    } else if ($(this).text().toLowerCase() == "register" && $(this).text().toLowerCase() == "sign up") {
      var elems = document.querySelectorAll("*"),
      res = Array.from(elems).find(v => v.textContent.toLowerCase() == 'name' || v.textContent.toLowerCase() == 'email');  
      console.log(res ? 'found!' : 'not found');
    }
  });
});