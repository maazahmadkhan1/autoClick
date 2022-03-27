$(document).ready(function () {	

	var activeUrl = window.location.href;
	
	if (activeUrl.indexOf('/dp/') > -1) {
		$(document).on("click", ".seller", function () {
			if ($(this).parents("#aod-offer").children("#aod-offer-soldBy").find(".a-fixed-left-grid-col.a-col-right a[role='link']").attr("href") !== undefined) {
				var sold_id = $(this).parents("#aod-offer").children("#aod-offer-soldBy").find(".a-fixed-left-grid-col.a-col-right a[role='link']").attr("href").split("&")[1].substring(7);	
				var url = "https://www.amazon.com/s?me=" + sold_id;
				if ($(this).hasClass("added") == false) {
					chrome.runtime.sendMessage({ msg: "add", url: url, id: sold_id });
					$(this).css({"background-color": "#ffd814", "color": "black"});
					$(this).addClass("added");
				} else {
					chrome.runtime.sendMessage({ msg: "remove", url: url, id: sold_id });
					$(this).css({"background-color": "black", "color": "#fff"});
					$(this).removeClass("added");
				}
			} else if ($(this).parent().prev().children("#pinned-offer-top-id").find("a").attr('href') !== undefined) {
				var sold_id = $(this).parent().prev().children("#pinned-offer-top-id").find("a").attr('href').split("?")[1].split("&")[0].substring(7);	
				var url = "https://www.amazon.com/s?me=" + sold_id;
				if ($(this).hasClass("added") == false) {
					chrome.runtime.sendMessage({ msg: "add", url: url, id: sold_id });
					$(this).css({"background-color": "#ffd814", "color": "black"});
					$(this).addClass("added");
				} else {
					chrome.runtime.sendMessage({ msg: "remove", url: url, id: sold_id });
					$(this).css({"background-color": "black", "color": "#fff"});
					$(this).removeClass("added");
				}
			}
		});
	}

	chrome.runtime.onMessage.addListener(function(req, sender, sendResponse){
		if (req.msg == "csv") {
			chrome.storage.local.get(function(res){
				if (res.links !== undefined && res.links !== []) {
					genrateCSV(res.links, "Amazon_links");
				}
			});
		} 
		if (req.msg == "addBtn") {
			addBtn();
		}
	});

	function addBtn() {
		if (document.querySelectorAll(".a-declarative[data-action='aod-atc-action']").length > 0) {
			var btn = `<button class="seller">Select Seller</button>`;
			if ($(".seller").length == 0) {
				$(".a-fixed-right-grid-col.aod-atc-column.a-col-right").append(btn);
				$(".seller").css({
					"background-color": "black",
				    "margin-top": "10px",
				    "border-radius": "10px",
				    "height": "30px",
				    "border": "none",
				    "color": "#fff"
				});
			}
		} else {
			setTimeout(function () {
				addBtn();
			}, 500);
		}
	}

	function genrateCSV(sites, filename) {
	    let csv = "";
	    if (sites.length > 0) {
		    console.log(sites);
	        sites.forEach((row, ind) => {
	            csv += row;
	            csv += "\n";
	        });
		    var downloadLink = document.createElement("a");
		    var blob = new Blob(["\ufeff", csv]);
		    var url = URL.createObjectURL(blob);
		    downloadLink.href = url;
		    downloadLink.download = filename + ".csv";
		    document.body.appendChild(downloadLink);
		    downloadLink.click();
		    document.body.removeChild(downloadLink);
		    chrome.storage.local.set({ links: [] });
		    chrome.runtime.sendMessage({ msg: "clear" });
	  	}
	}

});


