$(document).ready(function() {
	const listCategory = $("#list-category");
	const foodDiv = $("#food-info");
	const bookDiv = $("#book-info");
	const clothDiv = $("#cloth-info");


   listCategory.change(function () {
	    let current = this.value;
		hideAllCategories();
		console.log(current);
	    switch (current) {
	    	case '1':
				console.log('in one');
				foodDiv.attr("class","");
	    		break;
			case '2':
				bookDiv.attr("class","");
	    		break;
			case '3':
				clothDiv.attr("class","");
	    		break;
	    	default:

	    }
   });

	function hideAllCategories(){
		foodDiv.attr("class","hide-element");
		bookDiv.attr("class","hide-element");
		clothDiv.attr("class","hide-element");
	}





	$("#share-form").submit(function(e) {
		e.preventDefault();
		var url = "/api/share";
		jQuery.ajax({
			url: url,
			type: "post",
			dataType: "json",
			data: $("#share-form").serialize(),
			success: responseHandler
		});
		function responseHandler(response){
		}

	});
});
