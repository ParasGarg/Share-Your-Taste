$(document).ready(function() {

    const needsTitle = $("#item-title");
    const needsInfo = $("#item-info");
    const imgsRow = $("#imgs-row");
    const imgsSlide = $("#imgs-slide");
    const imgsIndicators = $("#imgs-indicators");

    var reg = /.+?\:\/\/.+?(\/.+?)(?:#|\?|$)/;
    var pathname = reg.exec(window.location.href)[1]
    let itemId = pathname.split('/')[2];
    let url = "/api/needs/id/" + itemId;

    jQuery.ajax({
        url: url,
        type: "get",
        dataType: "json",
        success: responseHandler
    });

    function responseHandler(response){
        console.log(response);
        needsTitle.text(response.title);
        addItem('Description', response.description);
        addItem('Pick-up Location', response.dropStatus);

        if (response.images.length == 0) {
            imgsRow.attr("class","hide-img")
        } else {
            for (var i = 0; i < response.images.length; i++) {
                addImg(response.images[i], i);
            }
        }

        switch(response.itemCategory) {
            case 'food':
                addItem('Cuisine', response.foodCuisine);
                addItem('Cook Date', response.foodCookDate);
                addItem('Best Before', response.foodBestBeforeDate);
                break;
            case 'clothes':
                addItem('Status', response.itemStatus);
                break;
            case 'books':
                addItem('Status', response.itemStatus);
                break;
            default:
                return
        }
    }

    function addItem(title, value) {
        let dt = $('<dt>').attr("class","col-lg-3").text(title);
        let dd = $('<dd>').attr("class","col-lg-9").text(value);
        needsInfo.append(dt).append(dd);
    }

    function addImg(url, order){
        let indicator = $('<li>').attr("data-target","#carouselExampleIndicators").attr("data-slide-to",order);

        let imgImg = $('<img>').attr("class","d-block").attr("class","img-fluid").attr("src", "/public/img/shutterstock_144845914.0.0.jpg");
        let imgDiv = $('<div>').attr("class","carousel-item").append(imgImg);

        if (order == 0) {
            indicator.attr("class","active");
            imgDiv.attr("class","carousel-item active")
        }

        imgsIndicators.append(indicator);
        imgsSlide.append(imgDiv);

    }
});
