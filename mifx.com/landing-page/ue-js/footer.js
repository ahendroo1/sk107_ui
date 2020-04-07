$('.closeMessageBtn').click(function() {
	$(this).closest('.ueMessage').slideUp('fast');
});
$('.rbateAll').click(function() {
	currentDataTarget = $(this).attr('id');
	if(currentDataTarget){
		$('.'+currentDataTarget+'').slideToggle('fast');
	}
});
$("#bannerRebate").click(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#daftarID").offset().top
    }, 1000);
});
$('.klikbanner').click(function() {
    if($('.ueMessage').is(":visible")){
        tinggi = tinggi - 3;
    }else{
        tinggi = 0 - 1;
    }
    $('html, body').animate({
        scrollTop: $('#viewnext').offset().top - tinggi //#DIV_ID is an example. Use the id of your destination on the page
    }, 'slow');
});
$('.ueParallax').parallax({imageSrc: $(this).attr('data-image-src')});





