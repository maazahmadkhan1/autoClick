let have_an_account = false;
let keywords =['name','login','email','signin','pay','card','cvv','password','checkout','paypal','cvc','order','account','signup','username'];
chrome.runtime.onMessage.addListener(function(req, sender, sendResponse){
	if (req.msg == "giveDomain") {
		var url = window.location.hostname;
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
    if ($(this).text().toLowerCase() == "login" || $(this).text().toLowerCase() == "log in" || $(this).text().toLowerCase() == "sign in") {
      var elems = document.querySelectorAll("*"),
      res = Array.from(elems).find(v => v.textContent.toLowerCase() == 'name' || v.textContent.toLowerCase() == 'email');  
      console.log(res ? 'found!' : 'not found');
    } else if ($(this).text().toLowerCase() == "register" || $(this).text().toLowerCase() == "sign up") {
      var elems = document.querySelectorAll("*"),
      res = Array.from(elems).find(v => v.textContent.toLowerCase() == 'name' || v.textContent.toLowerCase() == 'email');
      if(res){
        saveDomain();
      } 
      console.log(res ? 'found!' : 'not found');
    }
  });

  $(document).on("click", "input[type='submit'],input[type='button']", function () {
    console.log($(this).text());
    if ($(this).text().toLowerCase() == "login" || $(this).text().toLowerCase() == "log in" || $(this).text().toLowerCase() == "sign in") {
      var elems = document.querySelectorAll("*"),
      res = Array.from(elems).find(v => v.textContent.toLowerCase() == 'name' || v.textContent.toLowerCase() == 'email');  
      console.log(res ? 'found!' : 'not found');
    } else if ($(this).text().toLowerCase() == "register" || $(this).text().toLowerCase() == "sign up") {
      var elems = document.querySelectorAll("*"),
      res = Array.from(elems).find(v => v.textContent.toLowerCase() == 'name' || v.textContent.toLowerCase() == 'email'); 
      if(res){
        saveDomain();
      }
      console.log(res ? 'found!' : 'not found');
    }
  });

  document.querySelectorAll('input').forEach((input,index)=>{
      input.addEventListener('change',function(){
        if(input.value.length>2){
         checkInputs(Object.values(input.attributes));
        }
      })
  })

});


function saveDomain(){

  let domain = window.location.hostname;

  chrome.storage.local.get('domains',function({domains=[]}){
      if(domains.indexOf(domain)==-1){
        domains.push(domain);
        chrome.storage.local.set({domains});
      }
  })

}

function checkInputs(attributes){
    console.log(attributes);
    if(attributes.length>0){
      attributes.forEach(function(attr,ind){
        if(have_an_account==false){
          keywords.forEach(function(keyword){
              if(attr.value.toLowerCase().indexOf(keyword.toLowerCase())>-1){
                saveDomain();
              }
          })
        }
      });
  }
    
  }