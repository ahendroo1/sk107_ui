$(function(){ $('.material').materialForm(); }); // Apply material
$('.ueFormCheck input,select,textarea').change(function() { ueFormElementCheck($(this)); }); //Form Checking on Change

//Disabled Style for Radio Buttons
$('.material input,select,textarea').change(function() {
	$('.material input[type="radio"][data-material!="disabled"]').each(function(i, obj) {
    	if($(this).prop('disabled')) {
			$(this).siblings(".material-radio").addClass('material-radio-disabled');
		}
		else {
			$(this).siblings(".material-radio").removeClass('material-radio-disabled');
		}
	});
});

$('.ueFormCheck').submit(function(event) {
	//Check All Inputs
	$('input,select,textarea',this).each(function() {
		ueFormElementCheck($(this));
	});
	
	//Check Form Submission
	currentSubmitForm = $(this).closest("form");
	isiError = currentSubmitForm.find('.ueFormCheckErrorMessage').html();
	
	if(isiError) {
		event.preventDefault();
		$.magnificPopup.close({items: {src: '#loadingCover'}});
		//Scroll To First Error
		var aTag = currentSubmitForm.children('.ueFormCheckErrorMessage:first').prev();
		$('html,body').animate(
			{
				scrollTop: aTag.offset().top
			},
			'500',
			function() {
				currentSubmitForm.find('.ueFormCheckErrorMessage:first').prev().find('input:first').focus();
			}
		);
	}
});

$('.checkButton').click(function() {
	currentSubmitForm = $(this).closest(".formSelfCheckContainer");
	
	//Check All Inputs
	$('input,select,textarea',currentSubmitForm).each(function() {
		ueFormElementCheck($(this));
	});

	//Check Form Submission
	isiError = currentSubmitForm.find('.ueFormCheckErrorMessage').html();

	if(isiError) {
		event.preventDefault();

		//Scroll To First Error
		var aTag = currentSubmitForm.children('.ueFormCheckErrorMessage:first').prev();
		$('html,body').animate(
			{
				scrollTop: aTag.offset().top
			},
			'500',
			function() {
				currentSubmitForm.find('.ueFormCheckErrorMessage:first').prev().find('input:first').focus();
			}
		);
	}
});


//$("form[name='form1']").submit(); //To Check Before Submitting
$('.material select').wrap("<div class='ueMaterialSelectContainer'></div>");

//Select 2 Magnific Fix
/*
$.magnificPopup.instance._onFocusIn = function(e) {
	// Do nothing if target element is select2 input
	if( $(e.target).hasClass('select2-search__field') ) {
		return true;
	} 
	// Else call parent method
	$.magnificPopup.proto._onFocusIn.call(this,e);
};
*/

$('.material select[data-material!="disabled"][data-source]').select2({
	placeholder: function(){
		$(this).data('placeholder');
	},
	allowClear: false,
	minimumInputLength: 4,
	maximumInputLength: 20,
	language: {
		errorLoading: function(){ return "Searching" },
		inputTooShort: function () { return 'Please type at least 4 characters'; },
		inputTooLong: function () { return 'Maximum 20 characters'; }
	},
	ajax: {
		url: function(){
			return $(this).data('source');
		},
		dataType: 'json',
		delay: 250,
		data: function (params) {
			return {
				term: params.term, // search term
				page: params.page
			};
		},
		results: function (data, page) {
			return { results: data.results };
		},
		cache: true
	},
	templateResult: formatOption,
	templateSelection: formatSelect
});

$('.material select[data-material!="disabled"][data-tags="enabled"]').select2({
	placeholder: function(){
		$(this).data('placeholder');
	},
	minimumInputLength: 2,
    tags: true,
    tokenSeparators: [',']
});

if(window.matchMedia("(min-width: 768px)").matches) {
	$('.material select[data-material!="disabled"][data-tags!="enabled"]:not([data-source])').select2({
		placeholder: function() {
			$(this).data('placeholder');
		},
		minimumResultsForSearch: 6
	});
	
	$('.material select[data-material!="disabled"][data-tags!="enabled"]').on('select2:unselecting', function() {
		var opts = $(this).data('select2').options;
		opts.set('disabled', true);
		setTimeout(function() {
			opts.set('disabled', false);
		}, 1);
	});
} else {
	$('.material select:not([data-source]').select2("destroy");
}

/* Non Image File Upload */
$('.ueInputFile[data-material!="disabled"]').change(function() {
	inputFileSelectedNum = $(this)[0].files.length;
	inputFileName = $(this).attr('name');
	
	if(inputFileSelectedNum > 1) {
		$('#'+inputFileName+'-ueFileLabel').html(inputFileSelectedNum+' Files selected');
		$('.ueInputFileCancel[data-targetInput="'+inputFileName+'"]').css('opacity','1');
	}
	else if(inputFileSelectedNum == 1) {
		inputFileRealName = $(this)[0].files[0].name;
		$('#'+inputFileName+'-ueFileLabel').html(inputFileRealName);
		$('.ueInputFileCancel[data-targetInput="'+inputFileName+'"]').css('opacity','1');
	}
	else {
		$('#'+inputFileName+'-ueFileLabel').html($('#'+inputFileName+'-ueFileLabel').attr('data-defaultlabel'));
	}
});
$('.ueInputFileCancel').click(function() {
	cancelInputFileName = $(this).attr('data-targetInput');
	$('input[type="file"][id="'+cancelInputFileName+'"]').val('');
	$('#'+cancelInputFileName+'-ueFileLabel').html($('#'+cancelInputFileName+'-ueFileLabel').attr('data-defaultlabel'));
	$(this).css('opacity','0');
});
try {
$('.ueInputDateBox').DateTimePicker({
	buttonsToDisplay: ['HeaderCloseButton','SetButton'],
	titleContentDate: '',
	titleContentTime: '',
	titleContentDateTime: '',
	animationDuration: 200,
	shortDayNames: ['','','','','','','']
});
} catch(e) {};