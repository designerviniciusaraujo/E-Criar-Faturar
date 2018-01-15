  sF$.fnLogout();
  fnShowYear();
 /* ===================================================
 * checkout.js 
 * http://www.zfast.com.br
 * ===================================================
 * Copyright 2013 zFast, Inc.
 * =================================================== */

var oChkLoginFC=document.getElementById("idChkLoginFC");
var oChkRegisterFC=document.getElementById("idChkRegisterFC");
var oChkCartFC=document.getElementById("idChkCartFC");
var oChkFreightFC=document.getElementById("idChkFreightFC");
var oChkPaymentFC=document.getElementById("idChkPaymentFC");
var ErrInvalidPassword=13;
var bPaymentInit = false;

//function FuncChkFloat(){}

function FuncChkRegisterBegin(){
  FuncChkHide(oChkRegisterFC);
  FuncChkCartBegin();
  FuncChkFreightBegin();
  FuncChkPaymentBegin();

	  var idValid = "343";
	
	  if ( FC$.IDLoja != idValid) {
	      jQuery('.fc-chk-bg').html("Id inv&aacute;lido!");
	  }

}
function FuncChkRegisterEnd(){
  FuncChkShow(oChkRegisterFC);
  if(F$.iLastError==ErrInvalidPassword)jQuery(oChkLoginFC).effect("shake",{distance:10,times:3},400);
  FuncChkCartEnd();
  FuncChkFreightEnd();
  FuncChkPaymentEnd();
  
	//Ao pressionar o enter na tela do login da o submit do form
  /*$(function() {
      $('#Email').bind('keypress', function(e) {
          if (e.keyCode == 13) {
              $('#idLinkContinueFC').click(); 
          }
      });
  });*/

  jQuery("#idRegisterFC").append("<div class='idRegisterAtend'></div><div class='idRegisterRev'></div>");
  jQuery("#idChkResellerFC").appendTo(".idRegisterAtend");
  jQuery("#Origem").appendTo(".idRegisterRev");
  jQuery("#idChkResellerFC").text("Foi atendido por alguém?");

  //jQuery("#idTitRegisterFC").addClass("EstTitCheckoutFC Teste");

  //jQuery("#idTitRegisterFC").text("INFORME SEU EMAIL");


	jQuery(function($){
	   $("#P2Telefone").mask("(99) 9999-9999");
	   $("#P2PTelefone").mask("(99) 9999-9999");
	   //$("#P2CPF").mask("999.999.999-99");
	   $("#P2DataNasc").mask("99/99/9999");
	});	

  //Replace texto
  if(F$.Step==0){
    $("#idTxtYourPasswordFC").text('Minha senha é');
    $("#idTxtNoPasswordFC").text('Não tenho ou esqueci minha senha');
  }

  if(F$.Step==1){
    F$.fnChkShowPlaces();
  }

	//Insere o numero do pedido e a hora local da loja no topo da tela de confirmacao do pedido.
  jQuery("#idChkTxtPedConfirmadoFC, #idChkTxtTimeCompletionFC").insertBefore("#idChkCompletionIntFC");
  //Remove o link para mais detalhes do pedido.	
	jQuery("#idShowOrderDetailsFC").hide();
}

function FuncChkCartBegin(){FuncChkHide(oChkCartFC);}
function FuncChkCartEnd(){FuncChkShow(oChkCartFC);}

function FuncChkFreightBegin(){FuncChkHide(oChkFreightFC);}

function FuncChkFreightEnd(){
  FuncChkShow(oChkFreightFC);
  if(F$.Step==1 && (F$.FreightValue=='' || F$.FreightValue==null))F$.GetID("idChkPaymentFC").innerHTML="<div id=idChkPaymentIntFC class=EstChkDiv><div id=idTitPaymentFC class=EstTitCheckoutFC>Pagamento</div><p>As op&ccedil;&otilde;es de pagamento ser&atilde;o exibidas ap&oacute;s a etapa da escolha do frete.</p></div>";
}


function FuncChkPaymentBegin(){FuncChkHide(oChkPaymentFC);}

function FuncChkPaymentEnd(){

FuncChkShow(oChkPaymentFC);
  jQuery("<div id='idTxtPaymentFC'><p></p><div align='justify' class='os_pagamento'><p class='p1'><b>PAGAMENTO por PAGSEGURO</b><br>O PagSeguro &eacute; um sistema de pagamento on-line da Uol. Ao selecion&aacute;-lo, ser&aacute; direcionado (a) para o site deste parceiro e desta forma, concluir&aacute; toda a transa&ccedil;&atilde;o. O pagamento ser&aacute; repassado para a loja que dar&aacute; prosseguimento ao envio de sua compra. <br><br>Lembramos que: ao selecionar esta op&ccedil;&atilde;o, a loja n&atilde;o possui acesso aos dados cadastrados, somente a confirma&ccedil;&atilde;o da transa&ccedil;&atilde;o e status deste pagamento.</p><br><br><p class='p2'><b>PAGAMENTO por CART&Atilde;O:</b> Mesmo no caso de pagamento em v&aacute;rias parcelas de pequeno valor, lembre-se que o valor total da compra n&atilde;o pode exceder o limite de seu cart&atilde;o. Esta &eacute; a regra de aprova&ccedil;&atilde;o adotada pelas administradoras de cart&atilde;o de cr&eacute;dito. O titular do cart&atilde;o deve ser o mesmo do CPF que constar&aacute; no cadastro. <b>N&Atilde;O aceitamos cart&atilde;o de cr&eacute;dito em nome de terceiros.</b></p><br><br><p class='p2'><b>PAGAMENTO por BOLETO:</b> O sistema banc&aacute;rio pode levar at&eacute; 2 dias &uacute;teis para compensar o pagamento. Assim, voc&ecirc; deve somar pelo menos 2 DIAS ao prazo de entrega informado no ato de sua compra.</p></div><p></p></div>").insertAfter("#TabRadio"); 
}

function FuncChkShow(oObj){
  if(F$.OldIE){oObj.style.display="";}
  else{
    sID=oObj.id;
    if(sID.indexOf('ErrFieldFreight')>=0 || sID.indexOf('ErrFieldPayment')>=0)jQuery(oObj).show(1000);
    else if(sID.indexOf('Waiting')>=0)jQuery(oObj).fadeIn(100);
    else if(sID=="idCartItemsFC")jQuery(oObj).show(1500);
    else if(sID=="idChkRegisterIntFC" || sID=="idChkCartIntFC")jQuery(oObj).slideDown("slow");
    //else jQuery(oObj).show(500);
    //else jQuery(oObj).effect("slide",{},"slow");
    else jQuery(oObj).toggle("blind",{},"slow");
  }
}

function FuncChkHide(oObj){
  if(F$.OldIE){oObj.style.display="none";}
  else{
    sID=oObj.id;
    if(sID.indexOf('Waiting')>=0)jQuery(oObj).fadeOut(200);
    //else if(sID=="idChkCartFC" || sID=="idChkFreightFC" || sID=="idChkPaymentFC")jQuery(oObj).effect("blind",{},"slow");
    else if(sID=="idChkCartFC" || sID=="idChkFreightFC" || sID=="idChkPaymentFC")jQuery(oObj).toggle("blind");
    else jQuery(oObj).hide(200);
  }
}

function FuncChkIntoView(oObjIntoView){
  jQuery('html,body').animate({scrollTop: jQuery(oObjIntoView).offset().top},500);
  //oObj.scrollIntoView();
}

function isScrolledIntoView(elem){
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();
  var elemTop = $(elem).offset().top;
  //alert(elemTop +" "+ elem.id);
  var elemBottom = elemTop + $(elem).height();
  return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}
