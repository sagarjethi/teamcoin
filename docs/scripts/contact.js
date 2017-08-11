$(function() {
	// Validate the contact form
  $('#contactForm').validate({
  	// Specify what the errors should look like
  	// when they are dynamically added to the form
  	errorElement: "label",
  	wrapper: "div",
  	errorPlacement: function(error, element) {
  		error.insertAfter(element.parent());
  		error.wrap("<div class='error-msg'></div>");
  	},
  	
  	// Add requirements to each of the fields
  	rules: {
  		name: {
  			required: true,
  			minlength: 2
  		},
  		email: {
  			required: true,
  			email: true
  		},
  		message: {
  			required: true,
  			minlength: 10
  		}
  	},
  	
  	// Specify what error messages to display
  	// when the user does something horrid
  	messages: {
  		name: {
  			required: "Please enter your name.",
  			minlength: jQuery.format("At least {0} characters required.")
  		},
  		email: {
  			required: "Please enter your email.",
  			email: "Please enter a valid email."
  		},
  		message: {
  			required: "Please enter a message.",
  			minlength: jQuery.format("At least {0} characters required.")
  		}
  	},
  	
  	// Use Ajax to send everything to processForm.php
  	submitHandler: function(form) {
  		$("#send").attr("value", "Sending...");
  		$(form).ajaxSubmit({
  			success: function(responseText, statusText, xhr, $form) {
  				$(form).slideUp("fast");
  				$("#response").html(responseText).hide().slideDown("fast");
  			}
  		});
  		return false;
  	}
  });
});


$(function() {
	// Validate the subscribe form
  $('#subscribeForm').validate({
  	// Specify what the errors should look like
  	// when they are dynamically added to the form
  	errorElement: "label",
  	wrapper: "div",
  	errorPlacement: function(error, element) {
  		error.insertAfter(element.parent());
  		error.wrap("<div class='error-msg'></div>");
  	},
  	
  	// Add requirements to each of the fields
  	rules: {
  		email: {
  			required: true,
  			email: true
  		}
  	},
  	
  	// Specify what error messages to display
  	// when the user does something horrid
  	messages: {
  		email: {
  			required: "Please enter your email.",
  			email: "Please enter a valid email."
  		}
  	},
  	
  	// Use Ajax to send everything to processForm.php
  	submitHandler: function(form) {
  		$("#subSend").text("Sending...");
  		$(form).ajaxSubmit({
  			success: function(responseText, statusText, xhr) {
				$(form).slideUp("fast");
  				$("#subscriptionResponse").html(responseText).hide().slideDown("fast");
  			}
  		});
  		return false;
  	}
  });
});


$(function() {
	// Validate the subscribe form
  $('#downloadForm').validate({
  	// Specify what the errors should look like
  	// when they are dynamically added to the form
  	errorElement: "label",
  	wrapper: "div",
  	errorPlacement: function(error, element) {
  		error.insertAfter(element.parent());
  		error.wrap("<div class='error-msg'></div>");
  	},
  	
  	// Add requirements to each of the fields
  	rules: {
  		email: {
  			required: true,
  			email: true
  		}
  	},
  	
  	// Specify what error messages to display
  	// when the user does something horrid
  	messages: {
  		email: {
  			required: "Please enter your email.",
  			email: "Please enter a valid email."
  		}
  	},
  	
  	// Use Ajax to send everything to processForm.php
  	submitHandler: function(form) {
  		$("#dLoad").text("Processing...");
  		$(form).ajaxSubmit({
  			success: function(responseText, statusText, xhr) {
				$(form).slideUp("fast");
  				$("#dLoadResponse").html(responseText).hide().slideDown("fast");
  			}
  		});
  		return false;
  	}
  });
});