

$("#submit_button_checkout_mini").on("click", function () {

    $("#checkoutFooter").hide();
    $("#total").hide();
    $(".right_list").hide();
    $('.checkoutBox, .receiptTest').animate({'opacity':'.50'}, 300, 'linear');
    $('.receiptTest').animate({'opacity':'1.00'}, 300, 'linear');
    $('.checkoutBox, .receiptTest').css('display', 'flex');



    var checkoutFirstName = $("#input_info_firstName").val();
    var checkoutLastName = $("#input_info_LastName").val();
    var checkoutadress = $("#input_info_adress").val();
    var checkoutZipCode = $("#input_info_zipCode").val();
    var checkoutCity = $("#input_info_city").val();
    var checkoutCountry = $("#country").val();
    var checkoutEmail = $("#input_info_email");
    var freight = document.querySelector('input[name=radio1]:checked').value;
    var payment = document.querySelector('input[name=radio]:checked').value;






    $("#tyFirstName").text(checkoutFirstName);
   $("#tyLastName").text(checkoutLastName);
   $("#tyAdress").text(checkoutadress);
   $("#tyZipCode").text(checkoutZipCode);
   $("#tyCity").text(checkoutCity);
   $("#tyCountry").text(checkoutCountry);
   $("#tyEmail").text("Email: "+checkoutEmail);
   $("#tyfreight").text(freight);
   $("#typayment").text("Payment: "+payment);



    $('.close').click(function(){
        close_box();
    });

    $('.backdrop').click(function(){
        close_box();
    });

    function close_box()
    {
        $('.checkoutBox, .receiptTest').animate({'opacity':'0'}, 300, 'linear', function(){
            $('.checkoutBox, .receiptTest').css('display', 'none');
            $("#checkoutFooter").show();
            $("#total").show();
        });
    }

});


