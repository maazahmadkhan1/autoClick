let have_an_account = false;
let interval =0;
let keywords =['name','login','email','signin','pay','card','cvv','password','checkout','paypal','cvc','order','account','signup','username','continue', "log in", "sign in",'sign up', "register",'create an account'];
chrome.runtime.onMessage.addListener(function(req, sender, sendResponse){
	if (req.msg == "giveDomain") {
		var url = window.location.hostname;
		sendResponse(url);
	} 
	return true;
});

$(document).ready(function () {
  interval=setInterval(function(){
    document.querySelectorAll('input').forEach((input,index)=>{
      input.addEventListener('change',function(){

        if(input.value.length>2){
         checkInputs(Object.values(input.attributes));
       }
     })
    })

    document.querySelectorAll('input[type="button"]','input[type="submit"]','button','a').forEach((input,index)=>{

      input.addEventListener('click',function(){
        console.log(input.innerText.toLowerCase().trim());
        if(keywords.indexOf(input.innerText.toLowerCase().trim())){
          saveDomain();
        }
        else{
         checkInputs(Object.values(input.attributes));
       }
      
     })
    })
  },50)
});




function saveDomain(){

  let domain = window.location.hostname;
  clearInterval(interval);
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
      let attrValue =attr.value.toLowerCase().trim();
      if(have_an_account==false){
        keywords.forEach(function(keyword){
          let keywordLowerCase=keyword.toLowerCase().trim();
          if(attrValue.indexOf(keywordLowerCase)>-1){
            saveDomain();
          }
        })
      }
    });
  }

}