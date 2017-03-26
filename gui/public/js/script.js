$(document).ready(function() {


	$("#share-form").submit(function(e) {

		e.preventDefault();

		var url = "/share";

		jQuery.ajax({

			url: url,
			type: "post",
			dataType: "text",
			data: $("#share-form").serialize(),
			success: responseHandler
		});

		function responseHandler(response){

			
		}
	});
});
