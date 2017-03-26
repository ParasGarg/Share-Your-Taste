$(document).ready(function() {

    const needsList = $("#needs-list");
    let url = "/api/needs";

    jQuery.ajax({
        url: url,
        type: "get",
        dataType: "json",
        success: responseHandler
    });

    function responseHandler(response){
        // loop and add items
        for (var i = 0; i < response.length; i++) {
            console.log(response[i]);
            let item = createItem(response[i]);
            needsList.append(item);
        }

    }

    function createItem(obj) {
        let title = $('<div>').attr("class","card-title").text(obj.title);
        let link = $('<a>').attr("href","/needs/" + obj._id).append(title);
        let subTitle = $('<div>').attr("class","card-subtitle mb-2 text-muted").text('');
        let cardBlock = $('<div>').attr("class","card-block").append(link).append(subTitle);
        let cardDiv = $('<div>').attr("class","card").append(cardBlock);
        let item = $('<li>').append(cardDiv)
        return item;
    }
});
