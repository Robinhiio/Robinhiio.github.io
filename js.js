$(document).ready(function () {
    var clickedItem = 0;

    $(".item_description_img").attr('src', items[0].imageURL);
    $(".item_description_h3").html(items[0].title);
    $(".item_description_p").html(items[0].description);
    $(".item_price").html('Price: ' + items[0].price);

    drawItems();
    countTotalQuantity();
    var existingEntries = JSON.parse(localStorage.getItem("itemList"));

    function drawItems() {
        for (var i = 0; i < items.length; i++) {
            var itemDiv = $('<div class="item_div"></div>').data("item", i);    //CREATE DIV THATH CONTAIN ITEM NUMBER INDEX
            $(".products_items_section").append(itemDiv);                       // ADD DIV TO PRODUCTS SECTION

            var itemImg = $('<img src=""/>');                                   //CREATE IMAGE WITH ANDD GIVE IT CORRECT SRC
            itemImg.attr("src", items[i].imageURL);

            var itemTitle = $('<p>' + items[i].title + '</p>');                 //CREATE P WITH THE IMAGE TITLE
            itemDiv.append(itemImg);                                            // ADD IMAGE AND P TO THE ITEM DIV
        }
    }

    $(".products_items_section").on("click", ".item_div", function () {
        clickedItem = $(this).data("item");
        var imageURL = items[clickedItem].imageURL;
        var description = items[clickedItem].description;
        var price = items[clickedItem].price;
        var discount = items[clickedItem].discount;
        var title = items[clickedItem].title;

        $(".item_description_img").attr('src', imageURL);
        $(".item_description_h3").html(title);
        $(".item_description_p").html(description);
        $(".item_price").html('Price: ' + price + ' SEK');
    });

    $(".addCart").on("click", function () {
        var existingEntries = JSON.parse(localStorage.getItem("itemList"));
        if (existingEntries == null) existingEntries = [];
        var addedItem = items[clickedItem];
        var found = false;
        for (var i = 0; i < existingEntries.length; i++) {
            if (addedItem.title === existingEntries[i].title) {
                existingEntries[i].quantity++;
                found = true;
            }
        }
        if (found === false) existingEntries.push(addedItem);
        localStorage.setItem("itemList", JSON.stringify(existingEntries));
        flyToElement($(".item_description_img"), $(".cart"));
        countTotalQuantity();
    });

    //CHECKOUT FUNCTIONS
    if ($("body#checkout_page").length > 0) {
        var shippingCost = 29;
        var lastRemovedItem = "";
        drawTable();
        calculatePrice();

        function drawTable() {
            $(".product_list").html("");
            var existingEntries = JSON.parse(localStorage.getItem("itemList"));
            console.log(existingEntries.length);
            if (existingEntries == null) existingEntries = [];
            for (var i = 0; i < existingEntries.length; i++) {
                var itemImage = existingEntries[i].imageURL;
                var itemTitle = existingEntries[i].title;
                var itemPrice = existingEntries[i].price;
                var itemQuantity = existingEntries[i].quantity;

                var tableRow = $('<table id="product_numbers1">\n' +
                    '          <tr class="test">\n' +
                    '            <th><img class = "table_row_image"></th>\n' +
                    '            <th id="art_number"></th>\n' +
                    '            <th><u>Web:</u> in stock</th>\n' +
                    '            <th><input id="input" min="1" type="number" placeholder="1" name="nr:">/Pcs</th>\n' +
                    '            <th id="table_price"></th>\n' +
                    '            <th><button class="remove_item">REMOVE</button></th>\n' +
                    '          </tr>\n' +
                    '        </table>')
                tableRow.data("item", i);
                $(tableRow).find('tr').children("th:first").find('img').attr('src', itemImage);
                $(tableRow).find("#art_number").html(itemTitle);
                $(tableRow).find("#table_price").html(itemPrice + '' + ':-');
                $(tableRow).find("#input").val(itemQuantity);
                $(".product_list").prepend(tableRow);
                lastItemTitle = itemTitle;
            }
            $(".product_list").append('<button class ="undo">Undo</button>');
            ;
        }

        $('.product_list').on("click", '.remove_item', function () {
            var clickedItem = $(this).closest('table').data("item");
            lastRemovedItem = items[clickedItem];
            var existingEntries = JSON.parse(localStorage.getItem("itemList"));
            var index = existingEntries.indexOf(clickedItem);
            existingEntries.splice(clickedItem, 1);
            localStorage.setItem("itemList", JSON.stringify(existingEntries));
            $(this).closest('table').remove();
            drawTable();
            calculatePrice();
            countTotalQuantity();
        });

        $(".product_list").on("click", ".undo", function () {
            if(lastRemovedItem != "") {
                console.log(lastRemovedItem);
                var existingEntries = JSON.parse(localStorage.getItem("itemList"));
                existingEntries.push(lastRemovedItem);
                localStorage.setItem("itemList", JSON.stringify(existingEntries));
                lastRemovedItem = "";
                drawTable();
                calculatePrice();
                countTotalQuantity();
            }

        });

        function calculatePrice() {
            var vat = 0;
            var delivery = 0;
            var subTotal = 0;
            var total = 0;
            var existingEntries = JSON.parse(localStorage.getItem("itemList"));
            if (existingEntries == null) existingEntries = [];
            for (var i = 0; i < existingEntries.length; i++) {
                subTotal += existingEntries[i].price * existingEntries[i].quantity;
            }
            vat = subTotal * 0.25;
            total = subTotal + vat;


            $("#totalsek").html(subTotal + ":-");
            $(".vat").html(vat + ":-");
            $(".vat_top").html("Vat 25%: " + vat + ":-");
            $(".absolute_total").html(total + shippingCost + ":-");
            $(".shipping_total").html(shippingCost);
        }

        $('.product_list').on("click", '#input', function () {
            var clickedItem = $(this).closest('table').data("item");
            var existingEntries = JSON.parse(localStorage.getItem("itemList"));
            existingEntries[clickedItem].quantity = $(this).val();
            localStorage.setItem("itemList", JSON.stringify(existingEntries));
            calculatePrice();
            countTotalQuantity();
        });




    }
    $(".form_bottom").on("click", 'input', function(){
        var shipping = $(this).attr('id');

        switch(shipping) {
            case 'shipping_standard':
                shippingCost = 29;
                break;
            case 'shipping_express':
                shippingCost = 100;
                break;
            case 'shipping_home':
                shippingCost = 150;
                break;
            case 'shipping_pickup':
                shippingCost = 20;
                break;
        }
    calculatePrice();
    });

    function countTotalQuantity() {
        var total = 0;
        var existingEntries = JSON.parse(localStorage.getItem("itemList"));
        if (existingEntries == null) existingEntries = [];
        for (var i = 0; i < existingEntries.length; i++) {
            total += existingEntries[i].quantity *1;
        }
        $(".cart_quantity").text("Items: " + total)
    }


});
