chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	chrome.tabs.sendMessage(tabs[0].id, { msg: "giveDomain" }, function (response) {
		let url = response;
		if(response.indexOf('www.')>-1){
			url = response.replace("www.","");
		}
		$(".url").text(url);
		chrome.storage.local.get('domains',({domains})=>{
			console.log(domains);
			if(domains.indexOf(response)>-1){

				$('#have_an_account').attr('checked',true);
			}
		});
	});
});

$("#close").click(function () {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    	chrome.tabs.sendMessage(tabs[0].id, { msg: "remove" });
  	});
});

