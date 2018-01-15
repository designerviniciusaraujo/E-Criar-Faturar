/* ===================================================
 * toolbar.js 
 * http://www.zfast.com.br
 * ===================================================
 * Copyright 2014 zFast, Inc.
 * @author Fábio Verissimo
 * =================================================== */



function readCart() {
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET","XMLCart.asp?IDLoja="+IDLoja+"",false);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML; 

    var x=xmlDoc.getElementsByTagName("item");
    var z=xmlDoc.getElementsByTagName("cart");

    try{currencyProdCart=(z[0].getElementsByTagName("currency")[0].childNodes[0].nodeValue);}
    catch(e){currencyProdCart=""}
    try{TotalQtyProdCart=(z[0].getElementsByTagName("TotalQty")[0].childNodes[0].nodeValue);}
    catch(e){TotalQtyProdCart="0"}
    try{subtotalProdCart=(z[0].getElementsByTagName("subtotal")[0].childNodes[0].nodeValue);}
    catch(e){subtotalProdCart="0"}
    try{moedaProdCart=(z[0].getElementsByTagName("currency")[0].childNodes[0].nodeValue);}
    catch(e){moedaProdCart="R$"}  

    var QtdCesta=TotalQtyProdCart;
    var TotalCesta = subtotalProdCart;
    var fTotalCesta = parseFloat(subtotalProdCart.replace(".","").replace(",","."));
    var moedaCesta = moedaProdCart;
    var id ="",
        prod="",
        image="",
        qty="",
        price="",
        subTotal = 0;
        totalUnid = new Array();



    if (QtdCesta>0){
         jQuery(".qtdCartItems").html(QtdCesta);         

         for(i=0;i<x.length;i++){
            id= (x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue);
            prod= (x[i].getElementsByTagName("prod")[0].childNodes[0].nodeValue);
            image= (x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue);
            qty= (x[i].getElementsByTagName("qty")[0].childNodes[0].nodeValue);
            price= (x[i].getElementsByTagName("price")[0].childNodes[0].nodeValue);
                     
            if (prod.length >= 45) {
                etc = '...'
            } else {
                etc = ''
            }

            jQuery("#fc-cart-container table,#fc-cart-topo-container table").append("<tr><td><a href='/prod,idloja," + FC$.IDLoja + ",idproduto," + id + "," + prod + "'><img src='" + image + "'width='30' height='30' style='border: 1px solid #FF283A'/></a></td><td style='width:160px'><a href='/prod,idloja," + FC$.IDLoja + ",idproduto," + id + "," + prod + "'>" + prod.substring(0, 45) + etc + "</a></td><td id='qty'>(" + qty + ")</td><td style='font-weight:bold;width:59px'>R$&nbsp;" + price + "</td></tr>");
                   // jQuery("#fc-cart-parc,#fc-cart-topo-parc").html("<div>" + MontaMaxParcelaCart(ValCesta) + "</div><p><a href='AddProduto.asp?IDLoja=" + FC$.IDLoja + "'><img src='" + FC$.PathImg + "layout/comprar_toolbar.png' width='200' height='30'/></a></       p>");
        }
        jQuery("#fc-cart-parc,#fc-cart-topo-parc").html("<div>Em até 3x de "+FormatPrecoReais(CalculaParcelaJurosCompostos(fTotalCesta,3)) + "</div><p><a href='AddProduto.asp?IDLoja=" + FC$.IDLoja + "'><img src='" + FC$.PathImg + "layout/comprar_toolbar.png' width='200' height='30'/></a></p>");
        jQuery(".totalCartItems").html(moedaCesta+" "+TotalCesta);
        //jQuery("#fc-cart-container table,#fc-cart-topo-container table").append("<tr><td>"+subTotal+"</td></tr>");
    }else{
        jQuery('#fc-cart-container').html('<p>Carrinho vazio</p>');        
    }
}



function updateCart() {
    jQuery("#fc-cart-container table,#fc-cart-topo-container table").empty();
    jQuery('#fc-cart,#fc-cart-container').animate({backgroundColor: '#feedba'}, 'slow');    
    setTimeout(function () {
        jQuery('#fc-cart,#fc-cart-container').animate({
            backgroundColor: 'white'            
        }, 'slow');
    }, 2000);
    readCart();
}

jQuery(document).ready(function () {
   
    jQuery("#fc-controler").click(function hideShowToolbar(event) {
        event.preventDefault();
        var src = jQuery("#fc-controler img").attr('src');
        var closeSrc = FC$.PathImg + 'close.png';
        var openSrc = FC$.PathImg + 'open.png';
        if (src == closeSrc) {
            var height = '-55';
            src = 'open.png';
            var marginTop = 5;
            var hideShow = 'none';
            jQuery('#fc-toolbar').animate({
                top: height
            }, 'slow');
            jQuery('#fc-controler').animate({
                marginTop: marginTop
            }, 'slow');
            jQuery('img[src="' + closeSrc + '"]').attr('src', FC$.PathImg + src);
            jQuery('#fc-sep,#fc-logo,#fc-search,#fc-cart').hide();
        } else {
            var height = '0';
            src = 'close.png';
            var marginTop = 0;
            var hideShow = 'block';
            jQuery('#fc-toolbar').animate({
                top: height
            }, 'slow');
            jQuery('#fc-controler').animate({
                marginTop: marginTop
            }, 'slow');
            jQuery('img[src="' + openSrc + '"]').attr('src', FC$.PathImg + src);
            jQuery('#fc-sep,#fc-logo,#fc-search,#fc-cart').show();
        }
    });

    jQuery("#ToolBarOpenCartFC").mouseover(function () {
        jQuery('#fc-cart-container').slideDown();
    });
    jQuery("#fc-cart-container").mouseleave(function () {
        jQuery('#fc-cart-container').slideUp();  
    });

});

     
/*Executa Toolbar*/
function ToolbarCartExec(){
    //Toolbar
    var TemScroll = false;
    jQuery(window).scroll(function(event) {
      if(jQuery(window).scrollTop() > 150 && !TemScroll){
        jQuery('#fc-toolbar').fadeIn(300);
        jQuery('.ui-autocomplete').hide();
        jQuery('.zFToolBarProdCart').hover(function() {
          jQuery('.zFToolBarCartIndic').css('background', 'url(<BaseLoja>images/seta.png) 5px -20px no-repeat');
          jQuery('.zFToolBarCartSlide').css('display', 'table').fadeIn(300)
        }, function() {
          jQuery('.zFToolBarCartSlide').stop().fadeOut(100);
          jQuery('.zFToolBarCartIndic').css('background', 'url(<BaseLoja>images/seta.png) 5px 5px no-repeat');
        });
      }else{jQuery('#fc-toolbar').fadeOut(150);}
    });

    //hover do menu
    jQuery('.zf-topMainNav ul > li > a').each(function(){
      jQuery(this).hover(function() {
        jQuery(this,'a').css('display', 'block').stop().animate({marginTop: '-3px'}, 100);
      }, function(){
        jQuery(this,'a').stop().animate({marginTop: '3px'}, 100);
      });
    });
}
