var onlineVisitorsCounterScriptPath = function () {
	vCountScriptUrl = $('#vCountScript').attr('src').split('?');
	return vCountScriptUrl[0].replace('counter.html','');
};

function currentVisitorNumber(currentVisitorNumberTarget,writeMode) {
	currentVisitorNumberTarget = '#currentonlinevisitors';
	currentVisitorNumberPage = onlineVisitorsCounterScriptPath()+'/counter.php?mode=read';
	
	$.ajax({
		url: currentVisitorNumberPage,
		type: 'get',
		dataType: 'html',
		success: function(currentVisitorNumberPageReturn) {
			if(currentVisitorNumberPageReturn) {
				currentVisitorNumberPageReturn = currentVisitorNumberPageReturn.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".");
				$(currentVisitorNumberTarget).html(currentVisitorNumberPageReturn);
				$('#currentonlinevisitorpages').html('Loading');
				setTimeout(function(){currentVisitorPages('#currentonlinevisitorpages',writeMode)},1500);
			}
		} 
	});
}

function currentVisitorPages(currentVisitorPagesTarget,currentVisitorPagesMode) {
	currentVisitorPagesTarget = '#currentonlinevisitorpages';
	currentAjaxVisitedPages = onlineVisitorsCounterScriptPath()+'/getviewedpages.php?mode='+currentVisitorPagesMode;
	$.get(currentAjaxVisitedPages,function(currentAjaxVisitedPagesReturn) {
		if(currentAjaxVisitedPagesReturn) {
			if(currentVisitorPagesMode == 'write') {
				$(currentVisitorPagesTarget).html(currentAjaxVisitedPagesReturn);
			}
			else if(currentVisitorPagesMode == 'panel') {
				//Awareness=1,Interest=1,Evaluation=0,Decision=0
				panelArr = currentAjaxVisitedPagesReturn.split(',');
				//console.log(panelArr);
				for(i=0;i<panelArr.length;i++) {
					if(panelArr[i]) {
						panelVal = panelArr[i].split('=');
						visitorChart.data.datasets[0].data[i] = panelVal[1];
					}
				}
				visitorChart.update();
			}
			else {
				alert(currentAjaxVisitedPagesReturn);
			}
		}
	});
}

function updateOnlineVisitorsCounter(updateOnlineVisitorsCounterKeepTrack) {	
    var page_title = window.document.title;
    var page_url = window.location.href;
	
	$.ajax({
		url: onlineVisitorsCounterScriptPath() + '/counter.php',
		type: 'POST',
		beforeSend: function(xhr) {
			xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		},
		data: {
			page_title: encodeURIComponent(page_title),
			page_url: encodeURIComponent(page_url)
		}
	});
		
	if(updateOnlineVisitorsCounterKeepTrack === true) {
		setTimeout(function() {
			updateOnlineVisitorsCounter(true);
		},50000);
	}
}

function writeOnlineVisitorCounter(writeOnlineVisitorCounterMode) {
	currentVisitorNumber('#currentonlinevisitors',writeOnlineVisitorCounterMode);
	setTimeout(function() {
		writeOnlineVisitorCounter(writeOnlineVisitorCounterMode);
	},15000);
}