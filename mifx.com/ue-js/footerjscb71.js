currentOpenedMenu = 0;

$('.mainMenuHvrTrigger').mouseenter(function() {
	currentClassMenuId = $(this).attr('data-megamenu-id');
	if(currentClassMenuId > 0) {
		$('.slideMenuContainer').css('display','none');
		$('.slideMenuContainer[data-sliderPopMenu="'+currentClassMenuId+'"]').css('display','block');
		//$('#slideDownMenu').stop().slideDown('fast');
		$('#slideDownMenu').css('display','block');
		currentOpenedMenu = currentClassMenuId;
	}
});

function closeMegamenu() {
	//$('#slideDownMenu').stop().slideUp('fast');
	$('#slideDownMenu').css('display','none');
}

var timer;
$("#slideDownMenu,.mainMenuHvrTrigger").mouseleave(
	function() {
		timer = setTimeout(closeMegamenu,10);
	}).mouseenter(function() {
		clearTimeout(timer);
	}
);

var selectName = $('select#question').attr('name');

// add a hidden element with the same name as the select
var hidden = $('<input type="hidden" name="'+selectName+'">');
hidden.val('');
hidden.insertAfter($('select#question'));

$("select#question option").unwrap().each(function() {
    var btn = $('<div class="greenBtnHeader bold pnovafont btnq" data-value="'+$(this).val()+'" >'+$(this).text()+'</div><div class="uespacer20"></div>');
    if($(this).is(':checked')) btn.addClass('');
    $(this).replaceWith(btn);
});

/*$(document).on('click', '.btnq', function() {
    $('.btnq').removeClass('on');
    $(this).addClass('on');
    $('input[name="'+selectName+'"]').val($(this).attr('data-value'));
});
$(document).on('click', '.lanjut', function() {
	alert('lanjuttttttt');
    $('.welcome').hide();
	$('.pertanyaan').show();
});*/
$('.btnq').click(function() {
    $('.btnq').removeClass('on');
    $(this).addClass('on');
    $('input[name="'+selectName+'"]').val($(this).attr('data-value'));
});
$('.lanjut').click(function() {
    $('.welcome').hide();
	$('.pertanyaan').show();
});
$('.headnyawebinar').click(function() {
	currentDataTarget = $(this).attr('id');
	//alert(currentDataTarget);
	if(currentDataTarget){
		$('.isinya[data-target-isi!="'+currentDataTarget+'"]').slideUp('fast');
		$('.isinya[data-target-isi="'+currentDataTarget+'"]').slideToggle('fast');
		//$('.'+currentDataTarget+'').slideToggle('fast');
	}
});
$("#province").change(function() {
	currentSelectedValue = $(this).val();
	currentTargetId = '#'+currentSelectedValue;
	currentTargetIdcabag = 'cab'+currentSelectedValue;
	$('.shipCity').attr('style','display: none;');
	$(currentTargetId).attr('style','display: block;');
	$('#cabang.cab'+currentSelectedValue).attr('data-formcheck','~!nan');
	$('#cabang.cab'+currentSelectedValue).attr('data-formcheck-err','Pilih Salah satu cabang');
	
	$('.cabangalamat[data-cabang-alamat!="'+currentTargetIdcabag+'"]').attr('style','display: none;');
	$('.cabangalamat[data-cabang-alamat="'+currentTargetIdcabag+'"]').attr('style','display: block;');
});

$('.privacy').click(function() {
	$.magnificPopup.open({items: {src: '#privacyPop'}, type: 'inline'});
});
$('.headnya').click(function() {
	currentDataTarget = $(this).attr('id');
	if(currentDataTarget){
		$('.isinya[data-target-isi!="'+currentDataTarget+'"]').slideUp('fast');
		$('.isinya[data-target-isi="'+currentDataTarget+'"]').slideToggle('fast');
		//$('.'+currentDataTarget+'').slideToggle('fast');
	}
});
$('.batasmega').addClass('borderGreyCF');
var elementPosition = $('#navigation').offset();
$(window).scroll(function(){
	//console.log(elementPosition);
		if($(window).scrollTop() > elementPosition.top){
			  //$('#navigation').css('position','fixed').css('top','0').css('z-index','99');
			  $('#navigation').addClass('stickyHeader');
			  $('.batasnya').addClass('borderGreyEE');
			  $('.batasmega').removeClass('borderGreyCF');
			  //$('#leftSideMenu').css('margin-top','15px');
			  $('.cmenu').hide();
			  
		} else {
			//$('#navigation').css('position','static');
			 $('#navigation').removeClass('stickyHeader');
			//$('#leftSideMenu').css('margin-top','0px');
			$('.batasnya').removeClass('borderGreyEE');
			$('.batasmega').addClass('borderGreyCF');
			 $('.cmenu').show();
		}
		var scroll = $(window).scrollTop(); 
		if (scroll >= 250) {
			$('#leftSideMenu').css({"margin-top":"15px"});
			$('.tambahan').css({"height":"30px"});
		}else if (scroll <= 180) {
			$('#leftSideMenu').css({"margin-top":"0"});
			$('.tambahan').css({"height":"40px"});
		}
		
});
$('#leftSideMenu').simpleScrollFollow({
  limit_elem: '#try',
  upper_side: '#navigation'
 //lower_side: '#try'
});
$('#topSideMenu').simpleScrollFollow({
  upper_side: '#navigation'
 //lower_side: '#try'
});
$('#topSideMenuMobile').simpleScrollFollow({
  upper_side: '',
 lower_side: '#try'
});
$('#leftSideMenuEdu').simpleScrollFollow({
  limit_elem: '#try',
  upper_side: '#navigation'
 //lower_side: '#try'
});
$("#menus").mmenu({
  navbar: {
	title: ''
  }
});
var api = $('#menus').data('mmenu');
api.bind( "open:start", function() {
	if($('.smartbanner').is(':visible')) {
	$('html').css({'margin-top':'0'});
	$('.smartbanner').css({'position':'relative'});
	}
});
api.bind( "open:finish", function() {
	$(window).on('load', function() {
	   if($('.smartbanner').is(':visible')) {
		//$('.smartbanner').hide();
		$('html').css({'margin-top':'0'});
		$('.smartbanner').css({'position':'relative'});
		}
	});
});
api.bind( "close:finish", function() {
	if($('.smartbanner').is(':visible')) {
	$('html').css({'margin-top':'100px'});
	$('.smartbanner').css({'position':'absolute'});
	}
	//$('.smartbanner').show();
	
});
$( "input[name='referral']" )
  .focusin(function() {
   $( ".optionalwp" ).fadeIn(300);
  })
  .focusout(function() {
    $( ".optionalwp" ).css( "display", "none" );
  });
 $( "input[name='password']" )
  .focusin(function() {
	  if(!$("input[name='password']").hasClass('pswdTick')){
		  
   		$( ".optionalpw" ).fadeIn(300);
	  }
  })
  .focusout(function() {
    $( ".optionalpw" ).css( "display", "none" );
  });
  $('#password').keyup(function(){
	var pass = $(this).val();
	var strength = 0;
	var arr = [/.{6,}/, /[a-z]+/, /[0-9]+/, /[A-Z]+/];
	jQuery.map(arr, function(regexp) {
	  if(pass.match(regexp))
		 strength++;
	});
	if(strength >= 4){
		// $( ".goodpw" ).fadeIn(300);
		$("input[name='password']").addClass('pswdTick');
		 $( ".optionalpw" ).css( "display", "none" );
	}else{
		//$( ".goodpw" ).css( "display", "none" );
		$("input[name='password']").removeClass('pswdTick');
		$( ".optionalpw" ).fadeIn(300);
	}
});
$('.ueParallax').parallax({imageSrc: $(this).attr('data-image-src')});
	$( ".showMenuPage" ).click(function() {
	  $( ".showkecil" ).slideToggle( "slow" );
	});
	$(function(){
		$('.scroll-pane').jScrollPane();
	});
	$('#menus').removeClass('hidemenu');
$('.paddingVideoMain, .paddingVideo, .paddingVideoChild').click(function() {
	currentVideoId = $(this).attr('data-video-id');
	$('.videoTarget').attr('src','https://www.youtube.com/embed/'+currentVideoId);
	$.magnificPopup.open({items: {src: '#viewVideoBox'}, type: 'inline'});
});
$('.ue-popbtn[href="#loginPopup"]').click(function() {
	setTimeout(function(){
		$('input[name="username"]').focus();
	},100);
});
$('.loginPopup').click(function() {
	$.magnificPopup.open({items: {src: '#loginPopup'}, type: 'inline'});
});
writeCartNumberOfItems();
retinaHref(getClientSideVars('ue_retinasupport'));
updateOnlineVisitorsCounter(getClientSideVars('ue_persistanttr'));
ueOpenModal(getClientSideVars('ue_openmodal'));
$('.ue-popbtn').click(function() {
	//$.sidr('close', 'sidr');
	//alert('asdas');
});
$('.closeMessageBtn').click(function() {
	$(this).closest('.ueMessage').slideUp('fast')
	setCookie('closeLastMessage',getClientSideVars('ue_messagecookie'),0);
});
/*$('.ue-voidclick').click(function() {
	try {
		event.preventDefault();
	} catch(e){};
	return false;
});*/
$('.ue-magnificclose').click(function() {
	$.magnificPopup.close()
});
$(".tabmenu a").click(function() {
	
	$(".tabmenu a").css({"background-color":"#00c64d","color":"#ffffff"});
	$(".tabmenu a").removeClass('whiteBg');
	$(this).css({"background-color":"#ffffff","color":"#3f3f3f"});
	$(this).removeClass('colorWhite');
});
$(".butcontent1").click(function() {
	showContent('content1')
});
$(".butcontent2").click(function() {
	showContent('content2')
});

var enableSubmit = function(ele) {
    $(ele).removeAttr("disabled");
}

/*function demo(timenya) {
  var seconds = timenya;
  var $output = document.querySelector('.output');

  return function() {
    if (seconds >= 0) {
      $output.innerHTML = formatSeconds(seconds) + ' (' + seconds + ' seconds)';
      seconds--;
    }
  };
}*/

// The function
function formatSeconds(secs) {
  function pad(n) {
    return (n < 10 ? "0" + n : n);
  }

  var h = Math.floor(secs / 3600);
  var m = Math.floor(secs / 60) - (h * 60);
  var s = Math.floor(secs - h * 3600 - m * 60);

  return  pad(m) + ":" + pad(s);
}

var jamKirimAwal = '';
var jamKirimAkhir = '';
var detikExpired = 90;

jamKirimAwal = $('input[name="jamSendMulai"]').val();
jamKirimAkhir = $('input[name="jamSendAkhir"]').val();
if(jamKirimAwal != '' && jamKirimAkhir != ''){
	var sisadetik = jamKirimAkhir - jamKirimAwal;
	
		var secondsBeforeExpire = detikExpired - sisadetik;
		if(secondsBeforeExpire > 0){
		    $('#sendotp').attr("disabled", true);
		    $('.sisawaktu').show();
		    //setTimeout(function() { enableSubmit(that) }, 5000);
		    // This will trigger your timer to begin
		    var timer = setInterval(function(){
		    	$("#time-remaining").text(formatSeconds(secondsBeforeExpire));
		        // If the timer has expired, disable your button and stop the timer
		        if(secondsBeforeExpire <= 0){
		            clearInterval(timer);
		            enableSubmit($('#sendotp'));
		            $("#time-remaining").text('OTP');
		        }
		        // Otherwise the timer should tick and display the results
		        else{
		            // Decrement your time remaining
		            
		            secondsBeforeExpire--;   
		        }
		    },1000);
		}
}

$("#sendotp").click(function() {
	
	$.ajax({
		method: "POST",
		url: "ajax-resendSms.php",
		dataType: 'json',
		data: { }
	}).done(function( data ) {
		//$("#contentRatio").html(data);
		var secondsBeforeExpire = detikExpired;
		var that = $('#sendotp');
		if(data.error == false){
			

		    $('#sendotp').attr("disabled", true);
		    $('.sisawaktu').show();
		    //setTimeout(function() { enableSubmit(that) }, 5000);
		    // This will trigger your timer to begin
		    var timer = setInterval(function(){
		    	$("#time-remaining").text(formatSeconds(secondsBeforeExpire));
		        // If the timer has expired, disable your button and stop the timer
		        if(secondsBeforeExpire <= 0){
		            clearInterval(timer);
		            enableSubmit(that);
		            $("#time-remaining").text('OTP');
		        }
		        // Otherwise the timer should tick and display the results
		        else{
		            // Decrement your time remaining
		            secondsBeforeExpire--;   
		        }
		    },1000);
		}
	});
	
});

var chainedInputSelector = '.otpInputs input';

	$(chainedInputSelector+":first").focus();

	$(chainedInputSelector).focusin(function() {
		//Move cursor to first
		$(this)[0].setSelectionRange(0,0);
	});

	$(chainedInputSelector).keydown(function(e) {
		maxCharacters = 1;
		regexCharacters = /[0-9]/;
		keycode = e.which;
		currentObj = $(this);
		currentVal = currentObj.val();
		currentValLength = currentObj.val().length;
		
		//Numpad 0-9 keycode re-normalize START
		if(keycode >= 96 && keycode <= 105) {
			keycode -= 48;
		}
		//Numpad 0-9 keycode re-normalize END
		
		if(keycode == 13) {
			//ENTER
			e.preventDefault();
			emptyFound = false;
			$(chainedInputSelector).each(function(index, element) {
				if(!$(this).val()) {
					emptyFound = true;
				}
			});
			if(!emptyFound) {
				$(this).closest('form').submit();
			}
		}
		else if(keycode == 36) {
			//HOME
			e.preventDefault();
			$(chainedInputSelector+":first").focus();
		}
		else if(keycode == 35) {
			//LAST
			e.preventDefault();
			$(chainedInputSelector+":last").focus();
		}
		else if(keycode == 8) {
			//BACKSPACE
			e.preventDefault();
			if(currentVal) {
				currentObj.val(currentVal.slice(0,-1));
			}
			else {
				try {
					setTimeout(function() {
						currentObj.prev().val(currentVal.slice(0,-Math.abs(maxCharacters)));
						currentObj.prev().focus();
					},5);
				}
				catch(err) {
					/*NaN*/
				}
			}
		}
		else if(keycode == 46) {
			//DELETE
			e.preventDefault();
			if(currentVal) {
				currentObj.val(currentVal.slice(0,-Math.abs(maxCharacters)));
			}
		}
		else if(keycode == 37) {
			//LEFT
			try {
				currentObj.prev().focus();
			}
			catch(err) {
				/*NaN*/
			}
		}
		else if(keycode == 39) {
			//RIGHT
			try {
				currentObj.next().focus();
			}
			catch(err) {
				/*NaN*/
			}
		}
		else if(
			//NUMERIC
			keycode >= 48 && keycode <= 57
		) {
			if(
				currentValLength >= maxCharacters ||
				/^[0-9]$/.test(currentVal) == false
			) {
				currentObj.val(currentVal.slice(0,-Math.abs(maxCharacters)));
			}
			
			setTimeout(function() {
				currentObj.next().focus();
			},20);
			
				
			setTimeout(function() {
				if(/^[0-9]$/.test(currentObj.val()) == false) {
					currentObj.next().prev().focus();
				}
			},21);
		}
		else if(
			//ANDROID WORKAROUND
			keycode == 229 ||
			keycode == 0 ||
			keycode == null
		) {
			while(
				currentValLength > 0 &&
				(
					currentValLength >= maxCharacters ||
					/^[0-9]$/.test(currentVal) == false
				)
			) {
				currentObj.val(currentVal.slice(0,-Math.abs(maxCharacters)));
				currentValLength--;
			}
			
			setTimeout(function() {
				if(!regexCharacters.test(currentObj.val())) {
					currentObj.val(currentObj.val().slice(0,-Math.abs(maxCharacters)));
				}
				else {
					currentObj.next().focus();
				}
			},1);
		}
		else if(
			keycode != 116 && // Allow F5 Refresh
			keycode != 9 // Allow TAB Button
		) {
			e.preventDefault();
		}
		
		//Move cursor to first
		try {
			$(this)[0].setSelectionRange(0,0);
		} catch(err) {
			/*NaN*/
		}
	});
	
	$(chainedInputSelector).blur(function(e) {
		maxCharacters = 1;
		regexCharacters = /[0-9]/;
		keycode = e.which;
		currentObj2 = $(this);
		currentVal = currentObj2.val();
		currentValLength = currentObj2.val().length;
		
		//Numpad 0-9 keycode re-normalize START
		if(keycode >= 96 && keycode <= 105) {
			keycode -= 48;
		}
		//Numpad 0-9 keycode re-normalize END
		
		while(
			currentValLength > 0 &&
			(
				currentValLength > maxCharacters ||
				/^[0-9]$/.test(currentVal) == false
			)
		) {
			currentVal = currentVal.slice(0,-Math.abs(maxCharacters));
			currentValLength--;
		}
		
		currentObj2.val(currentVal);
	});
$( ".submitPop" ).click(function() {
	$.magnificPopup.open({items: {src: '#loadingCover'}, modal: true, showCloseBtn: false});
});
lsAlias = localStorage.getItem("alias");
lsAdv = localStorage.getItem("adv");
lsSwp = localStorage.getItem("swp");
//alert(lsSwp);
if(lsAlias) {
	setCookie('swp',lsSwp,60);
	setCookie('alias',lsAlias,60);
	eraseCookie('adv');
	$('input[name="referral"]').val(lsSwp);
	localStorage.removeItem("alias");
	localStorage.removeItem("swp");
}
if(lsAdv) {
	setCookie('swp',lsSwp,60);
	setCookie('adv',lsAdv,60);
	eraseCookie('alias');
	$('input[name="referral"]').val(lsSwp);
	localStorage.removeItem("adv");
	localStorage.removeItem("swp");
}

try {
	var favicon=new Favico({
		animation:'pop'
	});
	if(getClientSideVars('ue_notifNum')>0){
		favicon.badge(getClientSideVars('ue_notifNum'));	
	}
} catch(e) { console.log('Favicon Notification Disabled'); };