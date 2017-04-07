$(document).ready(function() {
	const listCategory = $(".lliisstt");
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

		// form
		const titleE = $("#title");
		const descriptionE = $("#description");
		const imagesE = $("#images");
		const itemStatusE = $("#itemStatus");
		const dropStatusE = $("#dropStatus");
		const dropStreetE = $("#dropStreet");
		const dropAptE = $("#dropApt");
		const dropCityE = $("#dropCity");
		const dropStateE = $("#dropState");
		const dropZipE = $("#dropZip");
		const itemCategoryE = $("#itemCategory");
		const foodCuisineE = $("#foodCuisine");
		const foodCookDateE = $("#foodCookDate");
		const foodBestBeforeDateE = $("#foodBestBeforeDate");
		const clothGenderE = $("#clothGender");
		const clothSizeE = $("#clothSize");
		const itemCategory = $("#itemCategory");

		itemData = {
			title: titleE.val(),
			description: descriptionE.val(),
			images: imagesE.val(),
			dropStatus: dropStatusE.val(),
			itemStatus: itemStatusE.val(),
			dropStreet: dropStreetE.val(),
			dropApt: dropAptE.val(),
			dropCity: dropCityE.val(),
			dropState: dropStateE.val(),
			dropZip: dropZipE.val(),
			itemCategory: 'book',
			foodCuisine: foodCuisineE.val(),
			foodCookDate: foodCookDateE.val(),
			foodBestBeforeDate: foodBestBeforeDateE.val(),
			foodIngredients: [],
			clothGender: clothGenderE.val(),
			clothSize: clothSizeE.val()
		};

		console.log(itemData);


		var url = "/api/share/";
		jQuery.ajax({
			url: url,
			type: "post",
			contentType: "application/json; charset=utf-8",
    		dataType: "json",
			data: JSON.stringify(itemData),
			success: responseHandler,
			error: responseHandlerError
		});
		function responseHandler(response){
			window.location = "http://localhost:3000/needs/";
		}
		function responseHandlerError(response){
			console.log(response);
		}

	});
});
