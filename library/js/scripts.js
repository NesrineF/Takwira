(function($){

    "use strict";



	/* FIX TRIM FOR IE8 */

	if ( typeof String.prototype.trim !== 'function' ) {

		String.prototype.trim = function() {

			return this.replace(/^\s+|\s+$/g, '');

		};

	}



/* -----------------------------------------------------------------------------



	GLOBAL FUNCTIONS



----------------------------------------------------------------------------- */



	/* -------------------------------------------------------------------------

		ACCORDION

	------------------------------------------------------------------------- */



	$.fn.uouAccordion = function(){



		var self = $(this),

		items = self.find( '.accordion-item' );



		items.find( '.accordion-item-content:visible' ).css( 'display', 'block' );

		items.find( '.accordion-item-content:hidden' ).css( 'display', 'none' );



		items.find( '.accordion-toggle' ).each(function(){

			$(this).click(function(){



				if ( ! self.hasClass( 'type-toggle' ) ) {



					self.find( '.accordion-item.active .accordion-toggle .fa-minus' ).removeClass( 'fa-minus' ).addClass( 'fa-plus' );

					self.find( '.accordion-item.active .accordion-item-content' ).slideUp(300);

					self.find( '.accordion-item' ).removeClass( 'active' );



				}



				$(this).find( '.fa' ).toggleClass( 'fa-plus fa-minus' );

				$(this).parents( '.accordion-item' ).toggleClass( 'active' ).find( '.accordion-item-content' ).slideToggle(300, function(){

					if ( $(this).is( ':visible' ) ) {

						$(this).css( 'display', 'block' );

					}

					else {

						$(this).css( 'display', 'none' );

					}

				});



			});

		});



		return false;



	};



	/* -------------------------------------------------------------------------

		ALERT MESSAGES

	------------------------------------------------------------------------- */



	$.fn.uouAlertMessage = function(){



		var self = $(this),

		close = self.find( '.close' );

		close.click(function(){

			self.slideUp(300);

		});



	};



	/* -------------------------------------------------------------------------

		CONTACT FORM

	------------------------------------------------------------------------- */



	$.fn.uouContactForm = function(){



		var form = $(this).prop( 'tagName' ).toLowerCase() === 'form' ? $(this) : $(this).find( 'form' ),

		submit_btn = form.find( '.submit-btn' );



		form.submit(function(e){

			e.preventDefault();



			if ( ! submit_btn.hasClass( 'loading' ) ) {



				// form not valid

				if ( ! form.uouFormValid() ) {

					form.find( 'p.alert-message.warning.validation' ).slideDown(300);

					return false;

				}

				// form valid

				else {



					submit_btn.addClass( 'loading' ).attr( 'data-label', submit_btn.text() );

					submit_btn.text( submit_btn.data( 'loading-label' ) );



					// ajax request

					$.ajax({

						type: 'POST',

						url: form.attr( 'action' ),

						data: form.serialize(),

						success: function( data ){



							form.find( '.alert-message.validation' ).hide();

							form.prepend( data );

							form.find( '.alert-message.success, .alert-message.phpvalidation' ).slideDown(300);

							submit_btn.removeClass( 'loading' );

							submit_btn.text( submit_btn.attr( 'data-label' ) );



							// reset all inputs

							if ( data.indexOf( 'success' ) > 0 ) {

								form.find( 'input, textarea' ).each( function() {

									$(this).val( '' );

								});

							}



						},

						error: function(){

							form.find( '.alert-message.validation' ).slideUp(300);

							form.find( '.alert-message.request' ).slideDown(300);

							submit_btn.removeClass( 'loading' );

							submit_btn.text( submit_btn.attr( 'data-label' ) );

						}

					});



				}



			}

		});

	};



	/* -------------------------------------------------------------------------

		FORM ELEMENTS

	------------------------------------------------------------------------- */



	// CHEKCBOX INPUT

	$.fn.uouCheckboxInput = function(){



		var self = $(this),

		input = self.find( 'input' );







		// INITIAL STATE

		if ( input.is( ':checked' ) ) {

			self.addClass( 'active' );

		}

		else {

			self.removeClass( 'active' );

		}



		// CHANGE STATE

		input.change(function(){

			if ( input.is( ':checked' ) ) {

				self.addClass( 'active' );

			}

			else {

				self.removeClass( 'active' );

			}

		});



	};



	// RADIO INPUT

	$.fn.uouRadioInput = function(){



		var self = $(this),

		input = self.find( 'input' ),

		group = input.attr( 'name' );



		// INITIAL STATE

		if ( input.is( ':checked' ) ) {

			self.addClass( 'active' );

		}



		// CHANGE STATE

		input.change(function(){

			if ( group ) {

				$( '.radio-input input[name="' + group + '"]' ).parent().removeClass( 'active' );

			}

			if ( input.is( ':checked' ) ) {

				self.addClass( 'active' );

			}

		});



	};



	// SELECT BOX

	$.fn.uouSelectBox = function(){



		var self = $(this),

		select = self.find( 'select' );

		self.prepend( '<ul class="select-clone custom-list"></ul>' );



		var placeholder = select.data( 'placeholder' ) ? select.data( 'placeholder' ) : select.find( 'option:eq(0)' ).text(),

		clone = self.find( '.select-clone' );

		self.prepend( '<input class="value-holder" type="text" disabled="disabled" placeholder="' + placeholder + '"><i class="fa fa-chevron-down"></i>' );

		var value_holder = self.find( '.value-holder' );



		// INPUT PLACEHOLDER FIX FOR IE

		if ( $.fn.placeholder ) {

			self.find( 'input, textarea' ).placeholder();

		}



		// CREATE CLONE LIST

		select.find( 'option' ).each(function(){

			if ( $(this).attr( 'value' ) ){

				clone.append( '<li data-value="' + $(this).val() + '">' + $(this).text() + '</li>' );

			}

		});



		// TOGGLE LIST

		self.click(function(){

			var media_query_breakpoint = uouMediaQueryBreakpoint();

			if ( media_query_breakpoint > 991 ) {

				clone.slideToggle(100);

				self.toggleClass( 'active' );

			}

		});



		// CLICK

		clone.find( 'li' ).click(function(){



			value_holder.val( $(this).text() );

			select.find( 'option[value="' + $(this).attr( 'data-value' ) + '"]' ).attr('selected', 'selected');



			// IF LIST OF LINKS

			if ( self.hasClass( 'links' ) ) {

				window.location.href = select.val();

			}



		});



		// HIDE LIST

		self.bind( 'clickoutside', function(event){

			clone.slideUp(100);

		});



		// LIST OF LINKS

		if ( self.hasClass( 'links' ) ) {

			select.change( function(){

				window.location.href = select.val();

			});

		}



	};



	/* -------------------------------------------------------------------------

		FORM VALIDATION

	------------------------------------------------------------------------- */



	$.fn.uouFormValid = function() {



		function emailValid( email ) {

			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

			return re.test(email);

		}



		var form = $(this),

		formValid = true;



		form.find( 'input.required, textarea.required, select.required' ).each(function(){



			var field = $(this),

			value = field.val(),

			valid = false;



			if ( value.trim() !== '' ) {



				// email field

				if ( field.hasClass( 'email' ) ) {

					if ( ! emailValid( value ) ) {

						field.addClass( 'error' );

					}

					else {

						field.removeClass( 'error' );

						valid = true;

					}

				}



				// select field

				else if ( field.prop( 'tagName' ).toLowerCase() === 'select' ) {



					if ( value === null || value === field.data( 'placeholder' ) ) {

						field.addClass( 'error' );

						field.parents( '.select-box' ).addClass( 'error' );

					}

					else {

						field.removeClass( 'error' );

						valid = true;

					}

				}



				// default field

				else {

					field.removeClass( 'error' );

					valid = true;

				}



			}

			else {

				field.addClass( 'error' );

			}

			formValid = ! valid ? false : formValid;



		});



		return formValid;



	};



	/* -------------------------------------------------------------------------

		IMAGES LOADED

	------------------------------------------------------------------------- */



    $.fn.uouImagesLoaded = function( options ) {

		if ( $.isFunction( options ) ) {



			var images = $(this).find( 'img' ),

			loaded_images = 0,

			count = images.length;



			if ( count > 0 ) {

				images.one( 'load', function(){

					loaded_images++;

					if ( loaded_images === count ){

						options.call();

					}

				}).each(function() {

					if ( this.complete ) { $(this).load(); }

				});

			}

			else {

				options.call();

			}



		}

    };



	/* -------------------------------------------------------------------------

		LIGHTBOX

	------------------------------------------------------------------------- */



	// LIGHTBOX STRINGS SETUP

	$.extend( true, $.magnificPopup.defaults, {

		tClose: 'Close (Esc)',

		tLoading: 'Loading...',

		gallery: {

			tPrev: 'Previous (Left arrow key)', // Alt text on left arrow

			tNext: 'Next (Right arrow key)', // Alt text on right arrow

			tCounter: '%curr% / %total%' // Markup for "1 of 7" counter

		},

		image: {

			tError: '<a href="%url%">The image</a> could not be loaded.' // Error message when image could not be loaded

		},

		ajax: {

			tError: '<a href="%url%">The content</a> could not be loaded.' // Error message when ajax request failed

		}

	});



	// FUNCTION

	$.fn.uouInitLightboxes = function(){

		if ( $.fn.magnificPopup ) {

			$(this).find( 'a.lightbox' ).each(function(){



				var self = $(this),

				lightbox_group = self.data( 'lightbox-group' ) ? self.data( 'lightbox-group' ) : false;



				if ( lightbox_group ) {

					$( 'a.lightbox[data-lightbox-group="' + lightbox_group + '"]' ).magnificPopup({

						type: 'image',

						removalDelay: 300,

						mainClass: 'mfp-fade',

						gallery: {

							enabled: true

						}

					});

				}

				else {

					self.magnificPopup({

						type: 'image'

					});

				}



			});

		}

	};



	/* -------------------------------------------------------------------------

		MEDIA QUERY BREAKPOINT

	------------------------------------------------------------------------- */



	var uouMediaQueryBreakpoint = function() {



		if ( $( '#media-query-breakpoint' ).length < 1 ) {

			$( 'body' ).append( '<var id="media-query-breakpoint"><span></span></var>' );

		}

		var value = $( '#media-query-breakpoint' ).css( 'content' );

		if ( typeof value !== 'undefined' ) {

			value = value.replace( "\"", "" ).replace( "\"", "" ).replace( "\'", "" ).replace( "\'", "" );

			if ( isNaN( parseInt( value, 10 ) ) ){

				$( '#media-query-breakpoint span' ).each(function(){

					value = window.getComputedStyle( this, ':before' ).content;

				});

				value = value.replace( "\"", "" ).replace( "\"", "" ).replace( "\'", "" ).replace( "\'", "" );

			}

		}

		else {

			value = 1199;

		}

		return value;



	};



	/* -------------------------------------------------------------------------

		PROGRESS BAR

	------------------------------------------------------------------------- */



	$.fn.uouProgressBar = function(){



		var self = $(this),

		percentage = self.data( 'percentage' ) ? parseInt( self.data( 'percentage' ) ) : 100,

		inner = self.find( '.progress-bar-inner > span' ),

		media_query_breakpoint = uouMediaQueryBreakpoint();



		// WITH INVIEW ANIMATIONS

		if ( $( 'body' ).hasClass( 'enable-inview-animations' ) && media_query_breakpoint > 991 ) {

			self.one( 'inview', function(){

				inner.css( 'width', percentage + '%' );

			});

		}

		// WITHOUT INVIEW ANIMATIONS

		else {

			inner.css( 'width', percentage + '%' );

		}



		// TYPE 2

		if ( self.hasClass( 'type-2' ) ) {



			var button = self.find( '.toggle' ),

			text = self.find( '.progress-bar-text' );

			button.click(function(){

				button.find( '.fa' ).toggleClass( 'fa-plus fa-minus' );

				if ( text.is( ':visible' ) ) {

					text.css( 'display', 'block' );

				}

				else {

					text.css( 'display', 'none' );

				}

				text.slideToggle(300);

				self.toggleClass( 'active' );

			});

		}



	};



	/* -------------------------------------------------------------------------

		RADIAL PROGRESS BAR

	------------------------------------------------------------------------- */



	$.fn.uouRadialProgressBar = function(){



		var self = $(this),

		percentage = self.data( 'percentage' ) ? parseInt( self.data( 'percentage' ) ) : 100,

		html = '',

		media_query_breakpoint = uouMediaQueryBreakpoint();



		// CREATE HTML

		html += '<div class="loader"><div class="loader-bg"><div class="text">0%</div></div>';

		html += '<div class="spiner-holder-one animate-0-25-a"><div class="spiner-holder-two animate-0-25-b"><div class="loader-spiner" style=""></div></div></div>';

		html += '<div class="spiner-holder-one animate-25-50-a"><div class="spiner-holder-two animate-25-50-b"><div class="loader-spiner"></div></div></div>';

		html += '<div class="spiner-holder-one animate-50-75-a"><div class="spiner-holder-two animate-50-75-b"><div class="loader-spiner"></div></div></div>';

		html += '<div class="spiner-holder-one animate-75-100-a"><div class="spiner-holder-two animate-75-100-b"><div class="loader-spiner"></div></div></div>';

		html += '</div>';

		self.prepend( html );



		// SET PERCENTAGE FUNCTION

		var set_percentage = function( percentage ){

			if ( percentage < 25 ) {

				var angle = -90 + ( percentage / 100 ) * 360;

				self.find( '.animate-0-25-b' ).css( 'transform', 'rotate(' + angle + 'deg)' );

			}

			else if ( percentage >= 25 && percentage < 50 ) {

				var angle = -90 + ( ( percentage - 25 ) / 100 ) * 360;

				self.find( '.animate-0-25-b' ).css( 'transform', 'rotate(0deg)' );

				self.find( '.animate-25-50-b' ).css( 'transform', 'rotate(' + angle + 'deg)' );

			}

			else if ( percentage >= 50 && percentage < 75 ) {

				var angle = -90 + ( ( percentage-50 ) / 100 ) * 360;

				self.find( '.animate-25-50-b, .animate-0-25-b' ).css( 'transform', 'rotate(0deg)' );

				self.find( '.animate-50-75-b' ).css( 'transform' , 'rotate(' + angle + 'deg)' );

			}

			else if ( percentage >= 75 && percentage <= 100 ) {

				var angle = -90 + ( ( percentage - 75 ) / 100 ) * 360;

				self.find(' .animate-50-75-b, .animate-25-50-b, .animate-0-25-b' ).css( 'transform', 'rotate(0deg)' );

				self.find( '.animate-75-100-b' ).css( 'transform', 'rotate(' + angle + 'deg)' );

			}

			self.find( '.text' ).html( percentage + '%' );

		}



		var clearProgress = function() {

			self.find( '.animate-75-100-b, .animate-50-75-b, .animate-25-50-b, .animate-0-25-b' ).css( 'transform', 'rotate(90deg)' );

		}



		// SET PERCENTAGE

		if ( $( 'body' ).hasClass( 'enable-inview-animations' ) && media_query_breakpoint > 991 ) {

			self.one( 'inview', function(){

				for ( var i = 0; i <= percentage; i++ ) {

					(function(i) {

						setTimeout(function(){ set_percentage( i ); }, i * 20);

					})(i);

				}

			});

		}

		else {

			set_percentage( percentage );

		}



	};



	/* -------------------------------------------------------------------------

		TABBED

	------------------------------------------------------------------------- */



	$.fn.uouTabbed = function(){



		var self = $(this),

		tabs = self.find( '> .tab-title-list > .tab-title' ),

		contents = self.find( '> .tab-content-list > .tab-content' );



		tabs.click(function(e){

			if ( ! $(this).hasClass( 'active' ) ) {

				var index = $(this).index();

				tabs.filter( '.active' ).removeClass( 'active' );

				$(this).addClass( 'active' );

				contents.filter( '.active' ).hide().removeClass( 'active' );

				contents.filter( ':eq(' + index + ')' ).show().addClass( 'active' );



				// CHANGE LOCATION HASH IF NEEDED

				var target = $(e.target);

				if ( target.attr( 'href' ) ) {

					if ( history.pushState ) {

						history.pushState( null, null, target.attr( 'href' ) );

					}

					else {

						location.hash = target.attr( 'href' );

					}

				}

				return false;



			}

		});



	};



	/* -------------------------------------------------------------------------

		TOGGLE

	------------------------------------------------------------------------- */



	$.fn.uouToggle = function(){



		var self = $(this),

		title = self.find( '.toggle-title' ),

		content = self.find( '.toggle-content' );



		title.click(function(){

			self.toggleClass( 'closed' );

			content.slideToggle(200);

		});



	};



	/* -------------------------------------------------------------------------

		TWITTER FEED

	------------------------------------------------------------------------- */



	$.fn.uouTwitterFeed = function(){

		if ( $.fn.tweet ) {



			var self = $(this),

			feed_id = self.data( 'id' ),

			feed_limit = self.data( 'limit' ),

			widget = self.parents( '.twitter-widget' );



			self.bind( 'loaded', function(){

				widget.removeClass( 'loading' );

				if ( self.hasClass( 'paginated' ) && $.fn.owlCarousel ) {

					var interval = self.data( 'interval' ) ? parseInt( self.data( 'interval' ) ) > 0 : false;

					self.find( '.tweet-list' ).fadeIn(500);

					widget.find( '.tweet-nav' ).fadeIn(500);

					self.find( '.tweet-list' ).owlCarousel({

						autoPlay: interval,

						slideSpeed: 300,

						pagination: false,

						paginationSpeed : 400,

						singleItem:true

					});

					widget.find( '.tweet-nav-prev' ).click(function(){

						self.find( '.tweet-list' ).trigger( 'owl.prev' );

					});

					widget.find( '.tweet-nav-next' ).click(function(){

						self.find( '.tweet-list' ).trigger( 'owl.next' );

					});

				}

			});



			self.tweet({

				username: feed_id,

				modpath: './library/twitter/',

				count: feed_limit,

				loading_text: '<span class="loading-anim"><span></span></span>'

			});



		}

	};





$(document).ready(function(){

/* -----------------------------------------------------------------------------



	GENERAL



----------------------------------------------------------------------------- */



	// GET ACTUAL MEDIA QUERY BREAKPOINT

	var media_query_breakpoint = uouMediaQueryBreakpoint();



	// INPUT PLACEHOLDER FIX FOR IE

	if ( $.fn.placeholder ) {

		$( 'input, textarea' ).placeholder();

	}



	// ACCORDIONS

	$( '.accordion-container' ).each(function(){

		$(this).uouAccordion();

	});



	// ALERT MESSAGES

	$( '.alert-message' ).each(function(){

		$(this).uouAlertMessage();

	});



	// FORM ELEMENTS

	$( '.checkbox-input' ).each(function(){

		$(this).uouCheckboxInput();

	});

	$( '.radio-input' ).each(function(){

		$(this).uouRadioInput();

	});

	$( '.select-box' ).each(function(){

		$(this).uouSelectBox();

	});



	// DATE PICKER

	$( '.calendar-input' ).each(function(){



		var input = $(this).find( 'input' ),

		dateformat = input.data( 'dateformat' ) ? input.data( 'dateformat' ) : 'm/d/y',

		icon = $(this).find( '.fa' ),

		widget = input.datepicker( 'widget' );



		input.datepicker({

			dateFormat: dateformat,

			minDate: 0,

			beforeShow: function(){

				input.addClass( 'active' );

			},

			onClose: function(){

				input.removeClass( 'active' );

				// TRANSPLANT WIDGET BACK TO THE END OF BODY IF NEEDED

				widget.hide();

				if ( ! widget.parent().is( 'body' ) ) {

					widget.detach().appendTo( $( 'body' ) );

				}

			}

		});

		icon.click(function(){

			input.focus();

		});



	});



	// LIGHTBOXES

	$( 'body' ).uouInitLightboxes();



	// PROGRESS BARS

	$( '.progress-bar' ).each(function(){

		$(this).uouProgressBar();

	});

	$( '.radial-progress-bar' ).each(function(){

		$(this).uouRadialProgressBar();

	});



	// TABS

	$( '.tabs-container' ).each(function(){

		$(this).uouTabbed();

	});



	// TOGGLES

	$( '.toggle-container' ).each(function(){

		$(this).uouToggle();

	});





/* -----------------------------------------------------------------------------



	HEADER



----------------------------------------------------------------------------- */



	/* -------------------------------------------------------------------------

		HEADER SEARCH

	------------------------------------------------------------------------- */



	$( '.header-search' ).each(function(){



		var self = $(this),

		search_input = self.find( '.search-input input' ),

		search_advanced = self.find( '.search-advanced' );



		// SHOW ADVANCED

		search_input.focus(function(){

			self.addClass( 'active' );

			$(this).addClass( 'active' );

			$(this).parent().find( '.ico' ).fadeOut(300);

			search_advanced.slideDown(200);

		});



		// HIDE ADVANCED

		self.bind( 'clickoutside', function(event){

			if ( media_query_breakpoint > 991 ) {



				var target = $(event.target);

				if ( ! ( target.hasClass( 'ui-datepicker-prev' ) || target.hasClass( 'ui-datepicker-next' ) ) ) {

					search_input.blur();

					self.removeClass( 'active' );

					search_input.removeClass( 'active' );

					if ( search_input.val() === '' ) {

						search_input.parent().find( '.ico' ).fadeIn(300);

					}

					search_advanced.slideUp(200);

					self.find( '.select-box .select-clone' ).slideUp(200);

				}



			}

		});



		// TRANSPLANT CALENDAR BEFORE SHOW

		self.find( '.calendar-input' ).each(function(){



			var self = $(this),

			widget = self.find( 'input' ).datepicker( 'widget' );

			self.find( 'input' ).focus(function(){

				widget.detach().insertAfter( self.parent() );

			});



		});



		// CLOSE ON MOBILE

		search_input.parent().find( '.close' ).click(function(){

			search_input.val( '' );

			search_input.blur();

			self.removeClass( 'active' );

			search_input.removeClass( 'active' );

			if ( search_input.val() === '' ) {

				search_input.parent().find( '.ico' ).fadeIn(300);

			}

			search_advanced.slideUp(200);

			self.find( '.select-box .select-clone' ).slideUp(200);

		});



	});



	/* -------------------------------------------------------------------------

		HEADER MENU

	------------------------------------------------------------------------- */



	$( '.header-menu' ).each(function(){



		var self = $(this);



		// HOVER

		self.hover(function(){

			if ( media_query_breakpoint > 991 ) {

				self.find( '.header-btn' ).addClass( 'hover' );

				self.find( '.header-nav' ).show();

				self.find( '.header-nav > ul' ).stop( true, true ).slideDown(200);

			}

		}, function(){

			if ( media_query_breakpoint > 991 ) {

				self.find( '.header-btn' ).removeClass( 'hover' );

				self.find( '.header-nav > ul' ).stop( true, true ).delay(10).slideUp(200, function(){

					self.find( '.header-nav' ).hide();

				});

			}

		});



		// HOVER SUBMENU

		self.find( 'li.has-submenu' ).hover(function(){

			if ( media_query_breakpoint > 991 ) {

				$(this).addClass( 'hover' );

				$(this).find( '> ul' ).stop( true, true ).fadeIn(200);

			}

		}, function(){

			if ( media_query_breakpoint > 991 ) {

				$(this).removeClass( 'hover' );

				$(this).find( '> ul' ).stop( true, true ).delay(10).fadeOut(200);

			}

		});



		// CREATE TOGGLE BUTTONS



		self.find( 'li.has-submenu' ).each(function(){

			$(this).append( '<button class="submenu-toggle"><i class="fa fa-chevron-down"></i></button>' );

		});



		// TOGGLE SUBMENU

		self.find( '.submenu-toggle' ).each(function(){

			$(this).click(function(){

				$(this).parent().find( '> .sub-menu' ).slideToggle(200);

				$(this).find( '.fa' ).toggleClass( 'fa-chevron-down fa-chevron-up' );

			});

		});



	});



	/* -------------------------------------------------------------------------

		HEADER LANGUAGE

	------------------------------------------------------------------------- */



	$( '.header-language' ).each(function(){



		var self = $(this);



		// HOVER

		self.hover(function(){

			if ( media_query_breakpoint > 991 ) {

				self.find( '.header-btn' ).addClass( 'hover' );

				self.find( '.header-nav' ).show();

				self.find( '.header-nav ul' ).stop( true, true ).slideDown(200);

			}

		}, function(){

			if ( media_query_breakpoint > 991 ) {

				self.find( '.header-btn' ).removeClass( 'hover' );

				self.find( '.header-nav ul' ).stop( true, true ).delay(10).slideUp(200, function(){

					self.find( '.header-nav' ).hide();

				});

			}

		});



	});



	/* -------------------------------------------------------------------------

		HEADER REGISTER

	------------------------------------------------------------------------- */



	$( '.header-register' ).each(function(){



		var self = $(this),

		form_holder = self.find( '.header-form' ),

		btn = self.find( '.header-btn' );



		// HOVER

		self.hover(function(){

			if ( media_query_breakpoint > 991 ) {

				self.find( '.header-btn' ).addClass( 'hover' );

				form_holder.stop( true, true ).slideDown(200);

			}

		}, function(){

			if ( media_query_breakpoint > 991 ) {

				self.find( '.header-btn' ).removeClass( 'hover' );

				form_holder.stop( true, true ).delay(10).slideUp(200);

			}

		});



		// VALIDATE FORM

		form_holder.find( 'form' ).submit(function(){



			var form = $(this);

			if ( form.uouFormValid() ) {

				form.find( '.alert-message.warning:visible' ).slideUp(300);

			}

			else {

				form.find( '.alert-message.warning' ).slideDown(300);

				return false;

			}



		});



		// TOGGLE

		btn.click(function(){

			if ( media_query_breakpoint <= 991 ) {

				self.find( '.header-btn' ).toggleClass( 'hover' );

				form_holder.stop( true, true ).slideToggle(200);

			}

		});



	});



	/* -------------------------------------------------------------------------

		HEADER LOGIN

	------------------------------------------------------------------------- */



	$( '.header-login' ).each(function(){



		var self = $(this),

		form_holder = self.find( '.header-form' ),

		btn = self.find( '.header-btn' );



		// HOVER

		self.hover(function(){

			if ( media_query_breakpoint > 991 ) {

				self.find( '.header-btn' ).addClass( 'hover' );

				form_holder.stop( true, true ).slideDown(200);

			}

		}, function(){

			if ( media_query_breakpoint > 991 ) {

				self.find( '.header-btn' ).removeClass( 'hover' );

				form_holder.stop( true, true ).delay(10).slideUp(200);

			}

		});



		// VALIDATE FORM

		form_holder.find( 'form' ).submit(function(){



			var form = $(this);

			if ( form.uouFormValid() ) {

				form.find( '.alert-message.warning:visible' ).slideUp(300);

			}

			else {

				form.find( '.alert-message.warning' ).slideDown(300);

				return false;

			}



		});



		// TOGGLE

		btn.click(function(){

			if ( media_query_breakpoint <= 991 ) {

				self.find( '.header-btn' ).toggleClass( 'hover' );

				form_holder.stop( true, true ).slideToggle(200);

			}

		});



	});



	/* -------------------------------------------------------------------------

		HEADER TOGGLES

	------------------------------------------------------------------------- */



	// SEARCH TOGGLE

	$( '.search-toggle' ).click(function(){

		if ( $( '.header-menu' ).is( ':visible' ) ) {

			$( '.header-menu, .header-tools' ).slideUp(300);

		}

		else {

			$( '.header-navbar:hidden' ).show();

		}

		$( '.header-search' ).slideToggle(300, function(){

			if ( $( '.header-search' ).is( ':hidden' ) && $( '.header-menu' ).is( ':hidden' ) && $( '.header-tools' ).is( ':hidden' ) ) {

				$( '.header-navbar:visible' ).hide();

			}

		});

	});



	// NAVBAR TOGGLE

	$( '.navbar-toggle' ).click(function(){

		if ( $( '.header-search' ).is( ':visible' ) ) {

			$( '.header-search' ).slideUp(300);

		}

		else {

			$( '.header-navbar:hidden' ).show();

		}

		$( '.header-menu, .header-tools' ).slideToggle(300, function(){

			if ( $( '.header-search' ).is( ':hidden' ) && $( '.header-menu' ).is( ':hidden' ) && $( '.header-tools' ).is( ':hidden' ) ) {

				$( '.header-navbar:visible' ).hide();

			}

		});

	});







/* -----------------------------------------------------------------------------



	BANNER



----------------------------------------------------------------------------- */



	/* -------------------------------------------------------------------------

		BANNER BG

	------------------------------------------------------------------------- */



	$( '#banner .banner-bg' ).each(function(){



		var self = $(this),

		images = self.find( '.banner-bg-item' );



		// SET BG IMAGES

		images.each(function(){

			var img =  $(this).find( 'img' );

			if ( img.length > 0 ) {

				$(this).css( 'background-image', 'url(' + img.attr( 'src' ) + ')' );

				img.hide();

			}

		});



		// INIT SLIDER

		if ( $.fn.owlCarousel ) {

			self.owlCarousel({

				slideSpeed: 300,

				pagination: false,

				paginationSpeed : 400,

				singleItem:true,

				addClassActive: true,

				afterMove: function(){

					// ACTIVATE TAB

					var active_index = self.find( '.owl-item.active' ).index();

					$( '.banner-search-inner .tab-title:eq(' + active_index + ')' ).trigger( 'click' );

				}

			});

		}



		// SET DEFAULT IF NEEDED

		var active_tab_index = $( '.banner-search-inner .tab-title.active' ).index();

		if ( active_tab_index !== 0 ) {

			self.trigger( 'owl.jumpTo', active_tab_index );

		}



	});



	/* -------------------------------------------------------------------------

		BANNER SEARCH

	------------------------------------------------------------------------- */



	$( '.banner-search-inner' ).each(function(){



		var self = $(this),

		tabs = self.find( '.tab-title' ),

		contents = self.find( '.tab-content' );



		// TAB CLICK

		tabs.click(function(){

			if ( ! $(this).hasClass( 'active' ) ) {

				var index = $(this).index();

				tabs.filter( '.active' ).removeClass( 'active' );

				$(this).addClass( 'active' );

				contents.filter( '.active' ).hide().removeClass( 'active' );

				contents.filter( ':eq(' + index + ')' ).show().addClass( 'active' );



				// CHANGE BG

				if ( $.fn.owlCarousel ) {

					$( '#banner .banner-bg' ).trigger( 'owl.goTo', index );

				}



			}

		});



	});





/* -----------------------------------------------------------------------------



	CORE



----------------------------------------------------------------------------- */



	/* -------------------------------------------------------------------------

		BROWSE

	------------------------------------------------------------------------- */



	// PROPERTIES

	$( '#browse .browse-properties' ).uouTabbed();



	// DESTINATIONS

	$( '#browse .browse-destinations .top-destination' ).each(function(){



		var self = $(this),

		image = self.find( '.destination-thumb' );



		if ( image.length > 0 ){

			self.css( 'background-image', 'url(' + image.attr( 'src' ) + ')' );

		}



	});



	// MEMBERS

	$( '#browse .browse-members-search input' ).focus(function(){

		$(this).parent().find( '.fa' ).fadeOut(200);

	});

	$( '#browse .browse-members-search input' ).blur(function(){

		if ( $(this).val() === '' ) {

			$(this).parent().find( '.fa' ).fadeIn(200);

		}

	});



	/* -------------------------------------------------------------------------

		CONTACT FORM

	------------------------------------------------------------------------- */



	$( '#contact-form' ).each(function(){

		$(this).uouContactForm();

	});



	/* -------------------------------------------------------------------------

		PROPERTIES LISTING

	------------------------------------------------------------------------- */



	// LAYOUT

	$( '.properties-listing-header .list-layout .button' ).click(function(){



		var self = $(this),

		layout = self.data( 'layout' );



		if ( ! self.hasClass( 'active' ) ) {

			self.parent().find( '.active' ).removeClass( 'active' );

			self.addClass( 'active' );

			$( '.properties-listing .property-list' ).fadeOut(300, function(){

				$(this).removeClass( 'layout-list layout-grid' ).addClass( 'layout-' + layout );

				$(this).fadeIn(300);

			});

		}



	});



	// SEARCH TYPE

	$( '.properties-search-type' ).each(function(){



		var self = $(this),

		inputs = self.find( 'input[type=radio]' );

		inputs.each(function(){

			$(this).change(function(){

				$( '#properties-search-form-swap, #properties-search-form-book, #properties-search-form-rent' ).hide();

				$( '#properties-search-form-' + $(this).data( 'type' ) ).show();

			});

		});



	});



	// PRICE FILTER

	$( '.properties-search-filter .price-filter .slider-range-container' ).each(function(){

		if ( $.fn.slider ) {



			var self = $(this),

			slider = self.find( '.slider-range' ),

			min = slider.data( 'min' ) ? slider.data( 'min' ) : 100,

			max = slider.data( 'max' ) ? slider.data( 'max' ) : 2000,

			step = slider.data( 'step' ) ? slider.data( 'step' ) : 100,

			default_min = slider.data( 'default-min' ) ? slider.data( 'default-min' ) : 100,

			default_max = slider.data( 'default-max' ) ? slider.data( 'default-max' ) : 500,

			currency = slider.data( 'currency' ) ? slider.data( 'currency' ) : '$',

			input_from = self.find( '.range-from' ),

			input_to = self.find( '.range-to' );



			input_from.val( currency + ' ' + default_min );

			input_to.val( currency + ' ' + default_max );



			slider.slider({

				range: true,

				min: min,

				max: max,

				step: step,

				values: [ default_min, default_max ],

				slide: function( event, ui ) {

					input_from.val( currency + ' ' + ui.values[0] );

					input_to.val( currency + ' ' + ui.values[1] );

				}

			});



		}

	});



	/* -------------------------------------------------------------------------

		PROPERTY DETAILS

	------------------------------------------------------------------------- */



	// PROPERTY IMAGES

	$( '.property-details .property-images' ).each(function(){



		var self = $(this),

		image_list = self.find( '.image-list' ),

		images = image_list.find( '.image' ),

		images_count = images.length,

		footer = self.find( '.images-footer' ),

		description = footer.find( '.image-description' ),

		counter = footer.find( '.image-counter' ),

		btn_prev = footer.find( '.prev-btn' ),

		btn_next = footer.find( '.next-btn' );



		// ADD CLASSES

		if ( images_count === 1 ) {

			self.addClass( 'single-image' );

		}

		if ( images.find( 'img[alt=""]' ).length === images_count || images.find( 'img:not([alt])' ).length === images_count ) {

			self.addClass( 'no-description' );

		}



		// SET FIRST IMAGE DESCRIPTION

		if ( images.first().find( 'img' ).attr( 'alt' ) ) {

			description.text( images.first().find( 'img' ).attr( 'alt' ) );

		}



		// INIT OWL SLIDER

		if ( $.fn.owlCarousel && images_count > 1 ) {



			// SET COUNTER

			counter.text( '1/' + images_count );



			image_list.owlCarousel({

				autoPlay: false,

				slideSpeed: 300,

				pagination: false,

				paginationSpeed : 400,

				singleItem:true,

				addClassActive: true,

				afterMove: function(){



					var active = image_list.find( '.owl-item.active' ),

					index = active.index();



					// SET DESCRIPTION

					if ( active.find( 'img' ).attr( 'alt' ) ) {

						description.text( active.find( 'img' ).attr( 'alt' ) );

					}

					else {

						description.text( '' );

					}



					// SET COUNTER

					counter.text( parseInt( index ) + 1 + '/' + images_count );



				}

			});



			btn_prev.click(function(){

				image_list.trigger( 'owl.prev' );

			});

			btn_next.click(function(){

				image_list.trigger( 'owl.next' );

			});



		}



	});



	// BOOK FORM & CONTACT FORM

	$( '.property-details .property-panel .book-form, .property-details .property-panel .contact-form' ).each(function(){



		var form = $(this);



		form.submit(function(){

			if ( ! form.uouFormValid() ) {

				form.find( 'p.alert-message.warning.validation' ).slideDown(300);

				return false;

			}

		});



	});





/* -----------------------------------------------------------------------------



	TESTIMONIALS



----------------------------------------------------------------------------- */



	$( '#testimonials' ).each(function(){



		var self = $(this),

		list = self.find( '.testimonial-list' ),

		testimonials = list.find( '.testimonial' ),

		interval = self.data( 'interval' ) ? parseInt( self.data( 'interval' ) ) > 0 : false;



		// SHOW FIRST PORTRAIT

		var first_portrait = testimonials.first().find( '.portrait img' );

		if ( first_portrait.length > 0 ) {

			list.before( '<div class="active-portrait"><img src="' + first_portrait.attr( 'src' ) + '" alt="' + first_portrait.attr( 'alt' ) + '"></div>' );

		}



		// CREATE SLIDER

		list.owlCarousel({

			autoPlay: interval,

			slideSpeed: 300,

			pagination: false,

			paginationSpeed : 400,

			singleItem:true,

			addClassActive: true,

			afterMove: function(){

				var new_portrait;

				self.find( '.active-portrait' ).fadeOut(200, function(){

					new_portrait = list.find( '.owl-item.active .portrait img' );

					if ( new_portrait.length > 0 ) {

						self.find( '.active-portrait img' ).attr( 'src', new_portrait.attr( 'src' ) );

						self.find( '.active-portrait img' ).attr( 'alt', new_portrait.attr( 'alt' ) );

					}

					self.find( '.active-portrait' ).fadeIn(200);

				});

			}

		});



		// NAV

		self.find( '.navigation .prev' ).click(function(){

			list.trigger( 'owl.prev' );

		});

		self.find( '.navigation .next' ).click(function(){

			list.trigger( 'owl.next' );

		});



	});





/* -----------------------------------------------------------------------------



	BOTTOM PANEL



----------------------------------------------------------------------------- */



	// NEWSLETTER WIDGET

	$( '#bottom-panel .newsletter-widget form' ).submit(function(){



		var form = $(this);

		if ( form.uouFormValid() ) {

			form.find( '.alert-message.warning:visible' ).slideUp(300);

		}

		else {

			form.find( '.alert-message.warning' ).slideDown(300);

			return false;

		}



	});



	// TWITTER WIDGET

	$( '#bottom-panel .twitter-feed' ).each(function(){

		$(this).uouTwitterFeed();

	});





/* -----------------------------------------------------------------------------



	SCREEN RESIZE



----------------------------------------------------------------------------- */



	$(window).resize(function(){

		if ( uouMediaQueryBreakpoint() !== media_query_breakpoint ) {

			media_query_breakpoint = uouMediaQueryBreakpoint();



			/* RESET HEADER ELEMENTS */

			$( '.header-navbar, .header-form, .header-nav, .header-nav ul, .header-menu, .header-search, .header-tools, .sub-menu' ).removeAttr( 'style' );

			$( '.submenu-toggle .fa' ).removeClass( 'fa-chevron-up' ).addClass( 'fa-chevron-down' );

			$( '.header-btn' ).removeClass( 'hover' );



		}



	});



/* -----------------------------------------------------------------------------



	STYLE SWITCHER



----------------------------------------------------------------------------- */



	if ( $( 'body' ).hasClass( 'enable-style-switcher' ) ) {



		// CREATE STYLE SWITCHER

		var style_switcher_html = '<div id="style-switcher"><button class="style-switcher-toggle"><i class="ico fa fa-cog"></i></button>';

		style_switcher_html += '<div class="style-switcher-content"><ul class="custom-list skin-list">';

		style_switcher_html += '<li><button class="skin-default active" data-skin="default"><span>Default</span></button></li>';

		style_switcher_html += '<li><button class="skin-blue" data-skin="blue"><span>Blue</span></button></li>';

		style_switcher_html += '<li><button class="skin-yellow" data-skin="yellow"><span>Yellow</span></button></li>';

		style_switcher_html += '</ul></div></div>';

		$( 'body' ).append( style_switcher_html );



		// INIT SWITCHER

		$( '#style-switcher' ).each(function(){



			var switcher = $(this),

			toggle = switcher.find( '.style-switcher-toggle' ),

			skins = switcher.find( '.skin-list button' ),

			style_switcher_settings = {};

			if ($('body').hasClass('style-switcher-active')) {
				switcher.addClass('active');
			}



			//localStorage.clear();



			// SAVE SETTINGS

			var style_switcher_save = function(){

				if ( $( 'html' ).hasClass( 'localstorage' ) ) {

					localStorage.style_switcher_settings = JSON.stringify( style_switcher_settings );

				}

			};



			// LOAD SETTINGS

			if ( $( 'html' ).hasClass( 'localstorage' ) && localStorage.style_switcher_settings ) {



				style_switcher_settings = JSON.parse( localStorage.style_switcher_settings );



				// LOAD SAVED SKIN

				if ( typeof style_switcher_settings.skin !== 'undefined' ) {

					skins.filter( '.active' ).removeClass( 'active' );

					skins.filter( '[data-skin="' + style_switcher_settings.skin + '"]' ).addClass( 'active' );

					if ( $( 'head #skin-temp' ).length < 1 ) {

						$( 'head' ).append( '<link id="skin-temp" rel="stylesheet" type="text/css" href="library/css/skins/' + style_switcher_settings.skin + '.css">' );

					}

				}



			}



			// TOGGLE SWITCHER

			toggle.click(function(){

				switcher.toggleClass( 'active' );

			});



			// SET SKIN

			skins.click(function(){

				skins.filter( '.active' ).removeClass( 'active' );

				$(this).toggleClass( 'active' );

				style_switcher_settings.skin = $(this).data( 'skin' );

				style_switcher_save();

				if ( $( 'head #skin-temp' ).length < 1 ) {

					$( 'head' ).append( '<link id="skin-temp" rel="stylesheet" type="text/css" href="library/css/skins/' + $(this).data( 'skin' ) + '.css">' );

				}

				else {

					$( '#skin-temp' ).attr( 'href', 'library/css/skins/' + $(this).data( 'skin' ) + '.css' );

				}



			});



		});



	}

	// STYLE SWITCHER END



/* END. */

});

})(jQuery);