var check = false;

function changeVal(el) {
    var quantity = parseFloat(el.parent().children(".quantity").html());
    var price = parseFloat(el.parent().children(".price").html());
    var eq = Math.round(price * quantity * 100) / 100;

    el.parent().children(".full-price").html( eq + "KR" );

    changeTotal();
}

function changeTotal() {

    var price = 0;

    $(".full-price").each(function(index){
        price += parseFloat($(".full-price").eq(index).html());
    });

    price = Math.round(price * 100) / 100;
    var tax = Math.round(price * 0.05 * 100) / 100
    var shipping = parseFloat($("#shipping").val()); //Vil ej uppdateras i realtid!?!
    var fullPrice = Math.round((price + tax + shipping) *100) / 100;

    if(price == 0) {
        fullPrice = 0;
    }

    $(".subtotal span").html(price);
    $(".tax span").html(tax);
    $(".total span").html(fullPrice);
}

$(document).ready(function(){

    $(".remove").click(function(){
        var el = $(this);
        el.parent().parent().addClass("removed");
        window.setTimeout(
            function(){
                el.parent().parent().slideUp('fast', function() {
                    el.parent().parent().remove();
                    if($(".product").length == 0) {
                        if(check) {
                            $("#cart").html();
                        } else {
                            $("#cart").html("<h1>No products!</h1>");
                        }
                    }
                    changeTotal();
                });
            }, 200);
    });

    $(".quantity-plus").click(function(){
        $(this).parent().children(".quantity").html(parseInt($(this).parent().children(".quantity").html()) + 1);
		
		if(parseInt(child.html()) >= 1) {
			child.html(parseInt(child.html()));
			$(".content").click(function(){
   			$(".quantity-minus").text("-");
			})
        }

        $(this).parent().children(".full-price").addClass("added");

        var el = $(this);
        window.setTimeout(function(){el.parent().children(".full-price").removeClass("added"); changeVal(el);}, 150);
    });

    $(".quantity-minus").click(function(){

        child = $(this).parent().children(".quantity");

        if(parseInt(child.html()) > 1) {
            child.html(parseInt(child.html()) - 1);
        }
		else if(parseInt(child.html()) >= 1) {
			child.html(parseInt(child.html()) - 1);
			$(".content").click(function(){
   			$(".quantity-minus").text("x");
			})
        }//Lägga till .remove vid tryck på X!!

        $(this).parent().children(".full-price").addClass("minused");

        var el = $(this);
        window.setTimeout(function(){el.parent().children(".full-price").removeClass("minused"); changeVal(el);}, 150);
    });

    window.setTimeout(function(){$(".is-open").removeClass("is-open")}, 1200);

    $(".btn").click(function(){
        check = true;
        $(".remove").click();
    });	
});