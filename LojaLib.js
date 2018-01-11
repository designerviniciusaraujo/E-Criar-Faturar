// Template Fastcommerce [05/2018]
var iQtdProds=0;
var iItensCesta=0;
var iDescontoAvista=0;
ImgLoadingFC=FC$.PathImg+"loading.gif?cccfc=1";
ImgOnError=FC$.PathImg+"nd";
FCLib$.LazyLoadWaitImage=FC$.PathImg+"loading.gif?cccfc=1"; //loading usado no lazy load

var sF$=(function(){

  function storagePopNews(){  
   var popUp=document.getElementById("BasePorNews");  
    function controlsPopNews(){ 
      var y= document.getElementsByTagName("body")[0]; var x = document.getElementsByTagName("body")[0].getAttribute("class"); var oPosPrice=document.getElementById('PosPrice');
      if(x==="FCHome"){
      //BOTÕES // CONTROLES // USABILIDADE
      var cls=document.querySelector(".btnClose") 
      var btdown=document.querySelector("button.btn-popnews")
      var overLay=document.getElementById("FullBackground")       
      cls.onclick = function(){tooglePopUp();};btdown.onclick = function(){tooglePopUp();};overLay.onclick = function(){tooglePopUp();}
      function tooglePopUp(){popUp.style.display="none";}
      }
    }controlsPopNews(); 
 

    //tratamento de data
    var today = new Date(); var dd = today.getDate(); var mm = today.getMonth()+1;   var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy; var ExDate; var sfirstDate=localStorage.getItem("curremtDate"); 
 
    //Storage armazenamento de dados
    if(sfirstDate==null) {
      console.log("Usuário primeiro acesso")
      localStorage.setItem("curremtDate", today); //Armazena dado
      popUp.style.display="block";
    } 

    //trata data de primeiro acesso e compara com a veriavel de periodo 
    if(sfirstDate){ 
    var ofirstDate = sfirstDate.split("/");  

    var frAcesdd=parseInt(ofirstDate[0]);var frAcesmmm=parseInt(ofirstDate[1]);var frAcesyy=parseInt(ofirstDate[2]); var lastAcesmmm=frAcesmmm+1;var lastAcesyy=frAcesyy;var lastAcesdd=dd;
     // valida data se virar um novo ano
    if(lastAcesmmm>12){lastAcesmmm=1;lastAcesyy=frAcesyy+=1}     
    if(dd>=frAcesdd && mm==lastAcesmmm && yyyy>=lastAcesyy)  {  
      popUp.style.display="block";
      popUp.style.border="15px";
      }  
    } 

   // RESET STORAGE  
    var reset=document.getElementById("removeStorage")
    if(reset){
    reset.onclick=function(){localStorage.removeItem("curremtDate");}  
    }
   // RESET STORAGE   
   }

  function MenuStore(){  

    var oToggle=document.getElementById("MenuToggle");
    var oMClose=document.getElementById("MenuClose");   
    var OcontentMenu=document.querySelector(".contentMenu");   
    var OsubList=document.querySelector(".subList");   
    var oreturnMenu=document.querySelector(".Menubreadcrumb");
    var oMenuIten=document.querySelectorAll(".CatsMoreSubs li");  

    oMClose.innerHTML="<svg  width='25px' height='25px' fill='#fff' id='Layer_1' style='enable-background:new 0 0 512 512;' version='1.1' viewBox='0 0 512 512' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><path d='M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z'/></svg>";
    
    var oAllCat=FCLib$.oCatMenu;
    oToggle.onclick = function(){OpenMenu();}
    oMClose.onclick = function(){   if(subMenList){ subMenList.classList.remove("on");}  oreturnMenu.style.visibility="hidden";OsubList.classList.remove("on");CloseMenu();}    


    for (var i = 0; i < oMenuIten.length;  i++) {  
      var oItemUrl=oMenuIten[i].childNodes[1];  
    	var oItems=oMenuIten[i];  
      var oItemsSubL=oItems.childNodes[3];  

      // DESABILITA URL SE HOUVER SUB 
	    if(oItemUrl!=undefined){    
        oItemUrl.style.pointerEvents="none"   
      }  
      //HAVENDO SUB-CATEGORIAS É EXIBIDO ICONE NO ITEM
      if(oItemsSubL){        
        var sSvgNext= "<i class=iconNext><svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' viewBox='0 0 129 129' enable-background='new 0 0 129 129' width='512px' height='512px'><g><path d='m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z' fill='#a5a4a4'/></g></svg><i>";
        oItems.innerHTML+=sSvgNext; 
      }   
      if (window.matchMedia("(max-width: 1023px)").matches){     
         oMenuIten[i].onclick=function(){    
         subMenList=this.childNodes[3]; 
         // var sUrlThis=this.childNodes[1].getAttribute("href");
         var sUrlThis=this.childNodes[1].getAttribute("href");
       
         if(subMenList!=undefined){ 
          OcontentMenu.style.overflow="inherit";     
          OcontentMenu.classList.remove("on"); 
          oreturnMenu.style.visibility="visible";  
          subMenList.classList.add("on"); 

          var snameOpt=this.childNodes[1].innerHTML  

          var oSt=localStorage.setItem("snameOpt",snameOpt); 
          var OnameOpt=document.getElementById("nameOpt") 
          // OnameOpt.innerHTML=localStorage.getItem("snameOpt");  
          var sStorageGetOpt=localStorage.getItem("snameOpt");  


          OnameOpt.innerHTML="<a href="+sUrlThis+">"+sStorageGetOpt+"</a>";  

          // EXPOSIÇÃO MENU TABLETS 
          if (window.matchMedia("(min-width: 768px)").matches){
             setTimeout(function(){ OsubList.style.width="100%"; oMClose.style.display="block";}, 100); ;
          }  
           CloseMenu();    
         }
        }
      }
    }  
    returnMenu.onclick=function(){ 
      setTimeout(function(){ oMClose.style.display="block";}, 300);  
      subMenList.classList.remove("on");  
      oreturnMenu.style.visibility="hidden"; 
      OpenMenu();
    } 

    function CloseMenu(){ 
       if (window.matchMedia("(max-width: 768px)").matches){oMClose.style.display="none";}
       OcontentMenu.classList.remove("on");  
    }
    function OpenMenu(){  
      setTimeout(function(){oMClose.style.display="block";}, 400);  
      OcontentMenu.classList.add("on");    
      OcontentMenu.style.overflow="auto";    
    } 
  }


  function MediaQuery(banner1, banner2, banner3, banner4, banner5, banner6, banner7, banner8, banner9, banner10,banner15,banner20){   
    if(FC$.Page=="Home"){   
    var ShowBanners=document.getElementById("oneBan");  
    var ShowBannTwo=document.getElementById("twoBan");  
    var ShowBannThr=document.getElementById("threeBan");  
    var bannerHomeCenter=document.getElementById("bannerHomeCenter");  
    var errMsg=ShowBanners.innerHTML="Atenção! Esta loja não possui banners cadastrados!";  
    if (window.matchMedia("(max-width: 767px)").matches){   
        ShowBanners.innerHTML=banner6;
        ShowBannTwo.innerHTML=banner7;
        ShowBannThr.innerHTML=banner8;
        bannerHomeCenter.innerHTML=banner20;
    }else{  
       ShowBanners.innerHTML=banner1;
       ShowBannTwo.innerHTML=banner2;
       ShowBannThr.innerHTML=banner3;
       bannerHomeCenter.innerHTML=banner15;
    }   
    }
  }

  var sCurrentPage=document.location.href.toUpperCase();

  function fnGetID(id){
    return document.getElementById(id);
  }

  //Função que faz pré-load das imagens
  function fnPreloadImages() { //v3.0
    var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=fnPreloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
  }

  //Função para mostrar valor economizado em produtos em promoção
  function fnShowEconomy(ProdPrice,ProdPriceOri){
    if(ProdPrice!=ProdPriceOri)document.write("<span class=FCfnShowEconomy>Economize <b>"+FormatPrice(ProdPriceOri-ProdPrice,FC$.Currency)+"</b> ("+fnFormatNumber(((ProdPriceOri-ProdPrice)/ProdPriceOri)*100)+"%)</span>");
  }
  
  function fnFormatNumber(num){
    num=num.toString().replace(/\$|\,/g,'');
    if(isNaN(num))num="0";
    sign=(num==(num=Math.abs(num)));
    num=Math.floor(num*100+0.50000000001);
    num=Math.floor(num/100).toString();
    for(var i=0;i<Math.floor((num.length-(1+i))/3);i++)num=num.substring(0,num.length-(4*i+3))+'.'+num.substring(num.length-(4*i+3));
    return ((sign)?'':'-')+num;
  }
  
  function fnLogout(){
    if(FC$.ClientID!=0){
      var oLinkLogin=fnGetID("idLinkLoginFC");
      if(oLinkLogin){
        oLinkLogin.innerHTML="Logout";
        oLinkLogin.href="/cadastro.asp?idloja="+ FC$.IDLoja +"&logoff=true";
      }
    }
  }

  var iPL=0;
  
  function fnShowPrice(Price,OriginalPrice,Cod,iMaxParcels,ProductID){
    iPL++;
    var idPrice=fnGetID("idProdPrice"+ProductID);
    var sPrice="";
    if(Price==0 && OriginalPrice==0){
      if(idPrice)idPrice.innerHTML="<div class=\"prices\"><br><div class=price><div class=currency><a href='/faleconosco.asp?idloja="+FC$.IDLoja+"&assunto=Consulta%20sobre%20produto%20(Código%20"+Cod+")' target='_top' >Consulte-nos</a></div></div></div>";
      return void(0);
    }
    var iPrice=Price.toString().split(".");
    if(iPrice.length==2){
      var iPriceInt=iPrice[0];
      var PriceDecimal=iPrice[1];
      if(PriceDecimal.length==1)PriceDecimal+="0";
    }
    else{
      var iPriceInt=iPrice;
      var PriceDecimal="00";
    }    

    var sInterest;

    if(typeof Juros!="undefined"){
      if(iMaxParcels==0||iMaxParcels>Juros.length)iMaxParcels=Juros.length;
      if(Juros[iMaxParcels-1]>0)sInterest=""; else sInterest=" <span class='home-price-breakline'>sem juros</span>";
    }
    else{
      iMaxParcels=0;
    }

    if(Price!=OriginalPrice){
      sPrice+="<div class=\"prices\">";
      sPrice+="  <div class=\"old-price\">De&nbsp; <span>"+FormatPrice(OriginalPrice,FC$.Currency)+"</span></div>";
      sPrice+="  <div class=\"price home-price\"><span class=\"home-price-por\">Por </span>"+FC$.Currency + " " + fnFormatNumber(iPriceInt) +","+ "<span class=\"home-price-cents\">" + PriceDecimal + "</span>" +"</div>";
      if(iMaxParcels>1)sPrice+="  <div class=\"installments\"><strong><span class=\"installment-count\">"+ iMaxParcels +"</span>x</strong> de <strong><span class=\"installment-price\">"+FormatPrice(CalculaParcelaJurosCompostos(Price,iMaxParcels),FC$.Currency)+"</span></strong>"+ sInterest +"</div>";
      sPrice+="</div>";
    }
    else{
      sPrice+="<div class=\"prices\">";
      sPrice+="  <div class=\"price home-price\">"+FC$.Currency + " " + fnFormatNumber(iPriceInt) +","+ "<span class=\"home-price-cents\">" + PriceDecimal + "</span>" +"</div>";
      if(iMaxParcels>1)sPrice+="  <div class=\"installments\"><strong><span class=\"installment-count\">"+ iMaxParcels +"</span>x</strong> de <strong><span class=\"installment-price\">"+FormatPrice(CalculaParcelaJurosCompostos(Price,iMaxParcels),FC$.Currency)+"</span></strong>"+ sInterest +"</div>";
      sPrice+="</div>";
    }
    if(idPrice)idPrice.innerHTML=sPrice;
  }

  function fnShowParcels(Price,iMaxParcels,ProductID){
    var idParcelsProd=fnGetID("idProdParcels"+ProductID);
    var sPrice="";
    var sInterest;
    if(typeof Juros!="undefined"){
      if(iMaxParcels==0||iMaxParcels>Juros.length)iMaxParcels=Juros.length;
      if(Juros[iMaxParcels-1]>0)sInterest=""; else sInterest=" sem juros";
    }
    else{
      iMaxParcels=0;
    }
    if(iMaxParcels>1 && Price>=1)sPrice+="<div class=\"installments\">ou <strong><span class=\"installment-count\">"+ iMaxParcels +"</span>x</strong> de <strong><span class=\"installment-price\">"+FormatPrice(CalculaParcelaJurosCompostos(Price,iMaxParcels),FC$.Currency)+"</span></strong>"+ sInterest +"</div>";
    if(idParcelsProd)idParcelsProd.innerHTML=sPrice;
  }

  function fnShowButtonCart(Estoque, IDProd){
    var idButton=document.querySelector('#idButtonProd'+IDProd+' img');
    var idAviso=document.querySelector('#idAvisoProd'+IDProd+'');
    var avisoDisp='<span class="mntext"><a href="#na" onclick="sF$.fnShowDisp('+IDProd+');" title="Clique aqui para ser avisado da disponibilidade deste produto">Avise-me</a> quando estiver disponível.</span>';
    if (idButton){
      if(Estoque==0){
        idButton.setAttribute('src',''+FC$.PathImg+'botcarrinhoesgotado.svg?cccfc=1');
        idAviso.innerHTML=avisoDisp;
      }else{
        idButton.setAttribute('src',''+FC$.PathImg+'botcarrinho.svg?cccfc=1');
      }
    } 
  }

  function fnShowDisp(IDProd){
    popup=window.open("/AvisaDispProduto.asp?IDLoja="+ FC$.IDLoja +"&IDProduto="+ IDProd,"Disp","top=10,left=10,height=480,width=450,scrollbars=yes");
    popup.focus();
    return void(0);
  }

  function fnSearchSubmit(oForm){
    var oSearch=oForm.Texto;
    if(oSearch){
      var sSearch=oSearch.value;
      if(sSearch.length<2){
        alert("Preencha a busca corretamente");
        oSearch.focus();
       }
       else{
        document.TopSearchForm.submit()
       }
    }
  }
  
  function fnCustomizeIconsSocialNetworks(isProd){
  //se isProd personaliza ícones do detalhe do produto, caso contrário do rodapé
    if(isProd)var oContentHTML=document.getElementById("idShareProd");
    else var oContentHTML=document.getElementById("idShareFooter");
    if(oContentHTML)var aImgsShare=oContentHTML.getElementsByTagName('img');
    if(aImgsShare)
      for(var i=0;i<aImgsShare.length;i++){
        if(aImgsShare[i].className=='EstImgShareFacebook'){
          aImgsShare[i].setAttribute('data-src',FC$.PathImg +'ic_det_facebook.svg');
          aImgsShare[i].src=FC$.PathImg +'iconprodfacebook.svg?cccfc=1';
        }
        else if(aImgsShare[i].className=='EstImgShareTwitter'){
          aImgsShare[i].setAttribute('data-src',FC$.PathImg +'ic_det_twitter.svg');
          aImgsShare[i].src=FC$.PathImg+ 'iconprodtwitter.svg?cccfc=1';
        }
        else if(aImgsShare[i].className=='EstImgShareGooglePlus'){
          aImgsShare[i].setAttribute('data-src',FC$.PathImg +'ic_det_googleplus.svg');
          aImgsShare[i].src=FC$.PathImg+ 'iconprodgoogleplus.svg?cccfc=1';
        }
        else if(aImgsShare[i].className=='EstImgSharePinterest'){
          aImgsShare[i].setAttribute('data-src',FC$.PathImg +'ic_det_pinterest.svg');
          aImgsShare[i].src=FC$.PathImg+ 'iconprodpinterest.svg?cccfc=1';
        }
        if(isProd){ //produto
          aImgsShare[i].style.width="40px";
          aImgsShare[i].style.height="43px";
          aImgsShare[i].setAttribute("alt","Redes Sociais");
        }
         else {
          if (aImgsShare[i].className == 'EstImgShareFacebook') {
            aImgsShare[i].setAttribute('data-src', FC$.PathImg + 'iconprodfacebook.svg');
            aImgsShare[i].src = FC$.PathImg + 'iconprodfacebook.svg';
          }
          else if (aImgsShare[i].className == 'EstImgShareTwitter') {
            aImgsShare[i].setAttribute('data-src', FC$.PathImg + 'iconprodtwitter.svg');
            aImgsShare[i].src = FC$.PathImg + 'iconprodtwitter.svg';
          }
          else if (aImgsShare[i].className == 'EstImgShareGooglePlus') {
            aImgsShare[i].setAttribute('data-src', FC$.PathImg + 'iconprodgoogleplus.svg');
            aImgsShare[i].src = FC$.PathImg + 'iconprodgoogleplus.svg';
          }
          else if (aImgsShare[i].className == 'EstImgSharePinterest') {
            aImgsShare[i].setAttribute('data-src', FC$.PathImg + 'iconprodpinterest.svg');
            aImgsShare[i].src = FC$.PathImg + 'iconprodpinterest.svg';
          }
          aImgsShare[i].style.width="40px";
          aImgsShare[i].style.height="43px";
          aImgsShare[i].setAttribute("alt","Redes Sociais");
        }  



 
    }
  }
 
  function fnShowCart(bShow,ItensCesta){
   oTabItensCart=document.getElementById('TabItensCart');
   if(bShow){
      oTabItensCart.className="EstTabItensCartOn";
      document.getElementById('DivItensCart').style.display="";
    }
   else{
      oTabItensCart.className="EstTabItensCart";
      document.getElementById('DivItensCart').style.display="none";
    }
  }
  
  function fnGoCart(){
    document.location.href="/addproduto.asp?idloja="+FC$.IDLoja;
  }

  function fnUpdateCart(IsAdd,IsSpy){FCLib$.fnAjaxExecFC("/XMLCart.asp","IDLoja="+FC$.IDLoja,false,fnCallbackUpdateCart,IsAdd,IsSpy);}

  function fnCallbackUpdateCart(oHTTP,IsAdd,IsSpy){
    if(oHTTP.responseXML){
      oXML=oHTTP.responseXML;
      var oCarts=oXML.getElementsByTagName("cart");
      try{currencyProdCart=(oCarts[0].getElementsByTagName("currency")[0].childNodes[0].nodeValue);}catch(e){currencyProdCart=FC$.Currency}
      try{TotalQtyProdCart=(oCarts[0].getElementsByTagName("TotalQty")[0].childNodes[0].nodeValue);}catch(e){TotalQtyProdCart="0"}
      try{subtotalProdCart=(oCarts[0].getElementsByTagName("subtotal")[0].childNodes[0].nodeValue);}catch(e){subtotalProdCart="0,00"}
      iItensCesta=TotalQtyProdCart;
      if(IsSpy){
        var oReferrer=window.parent;
        try{oReferrer.document.getElementById("idCartItemsTop").innerHTML=iItensCesta;}catch(e){}
        try{oReferrer.document.getElementById("idCartItemsToolTop").innerHTML=iItensCesta;}catch(e){}
        try{oReferrer.document.getElementById("idCartTotalTop").innerHTML=FCLib$.FormatPreco(currencyProdCart +" "+ subtotalProdCart);}catch(e){}
        try{oReferrer.document.getElementById("idCartTotalToolTop").innerHTML=FCLib$.FormatPreco(currencyProdCart +" "+ subtotalProdCart);}catch(e){}
      }
      else {
        try{document.getElementById("idCartItemsTop").innerHTML=iItensCesta;}catch(e){}
        try{document.getElementById("idCartItemsToolTop").innerHTML=iItensCesta;}catch(e){}
        try{document.getElementById("idCartTotalTop").innerHTML=FCLib$.FormatPreco(currencyProdCart +" "+ subtotalProdCart);}catch(e){}
        try{document.getElementById("idCartTotalToolTop").innerHTML=FCLib$.FormatPreco(currencyProdCart +" "+ subtotalProdCart);}catch(e){}
      }
    }
  }

  //Histórico de navegação
  function fnLoadXMLPageHistory(){FCLib$.fnAjaxExecFC("/xmlpagehistory.asp","idloja="+FC$.IDLoja,false,fnCallbackLoadXMLPageHistory);}

  function fnCallbackLoadXMLPageHistory(oHTTP){
    if(oHTTP.responseXML){
      var oXML=oHTTP.responseXML;
      var aItens=oXML.getElementsByTagName("item")
      if(aItens)sF$.fnShowPageHistory(aItens);
    }
  }
  
  function fnShowPageHistory(oHistoryPages){
    var oPageHistory=document.getElementById("idPageHistory");
    if(oPageHistory){
      var sPageHistory="";
      try{var sBar=(oHistoryPages[0].getElementsByTagName("title")[0].childNodes[0].nodeValue);}
      catch(e){var sBar="";}
      if(sBar!=""){sPageHistory+="<div id='idDivPageHistory'><div id='idPageHistoryFC'><div class='col-small-12 col-medium-12 col-large-12 col-xlarge-12 text-left'><div id='idTitPageHistory'><h3>Meu histórico de navegação:</h3></div></div><div class='col-small-12 col-medium-12 col-large-12 col-xlarge-12 fc-footer-history-sep'></div><ul id='idListPageHistoryFC'>";}  
      for (i=0;i<oHistoryPages.length;i++){
        sTitleProd=oHistoryPages[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
        sLinkProd=oHistoryPages[i].getElementsByTagName("link")[0].childNodes[0].nodeValue;
        try{sImageProd=oHistoryPages[i].getElementsByTagName("image")[0].childNodes[0].nodeValue;}
        catch(e){sImageProd=FC$.PathImg+"nd0.gif";}
        try{sPriceProd=(oHistoryPages[i].getElementsByTagName("price")[0].childNodes[0].nodeValue);}
        catch(e){sPriceProd="";}
        sTitleProd=sTitleProd.substring(0,20);
        sPageHistory+="<li>";
        sPageHistory+="<div class='EstImagePageHistory'><a href='"+ sLinkProd +"'><img src='"+ sImageProd +"' alt='"+ sTitleProd +"' border=0 class=EstFotoPageHistory onError=MostraImgOnError(this,0)></a></div>";
        sPageHistory+="<div class='EstNamePageHistory'><a href='"+ sLinkProd +"'>"+ sTitleProd +"</a></div>";
        sPageHistory+="<div class=EstPricePageHistory>"+ sPriceProd +"</div>";
        sPageHistory+="</li>";
      }
      oPageHistory.innerHTML=sPageHistory+"</ul></div></div>";
    }
  }

  function fnInsertVideo(ProductID,CodVideo){
    var oVideo=document.getElementById("VideoProd"+ProductID);
    if(oVideo){
      oVideo.innerHTML="<iframe class=\"VideoProd\" src=\"//www.youtube.com/embed/"+ CodVideo +"?controls=1&showinfo=0&rel=0&modestbranding=1&theme=light&modestbranding=1\" frameborder=0 allowfullscreen></iframe>"
    }
  }
  
  function fnAdjustsFilters(){ 
    var bTemPathQts=false;
    var oUlPathCatQt=document.getElementById("idUlPathCatQtFC");
    if(oUlPathCatQt){bTemPathQts=true;}else{document.getElementById('idListaProdCategoriasFC').style.display='none';}
    var oUlAdic1Qt=document.getElementById("idUlAdic1QtFC");
    if(oUlAdic1Qt){bTemPathQts=true;}else{document.getElementById('idListaProdAdicional1FC').style.display='none';}
    var oUlAdic2Qt=document.getElementById("idUlAdic2QtFC");
    if(oUlAdic2Qt){bTemPathQts=true;}else{document.getElementById('idListaProdAdicional2FC').style.display='none';}
    var oUlAdic3Qt=document.getElementById("idUlAdic3QtFC");
    if(oUlAdic3Qt){bTemPathQts=true;}else{document.getElementById('idListaProdAdicional3FC').style.display='none';}
    //Caso não tenha produtos em categorias/adicionais encontrados, remove div
    if(!bTemPathQts)document.getElementById("idDivPath").style.display='none';
    //Caso não tenha filtros de busca, remove div com filtros
    var oUlPathSearch=document.getElementById("idUlPathSearchFC");
    if(oUlPathSearch==null)document.getElementById("idDivSearch").style.display='none';
  }

  function fnLoginUserName(NameUser,PicUser){
    var oImgGlobalSign=document.getElementById("idImgGlobalSignFC");
    if(NameUser==""){
      jQuery('.loginInfo').html("<span>Bem Vindo. <a href='/cadastro.asp?idloja="+FC$.IDLoja+"&pp=3&passo=1&sit=1'> Clique aqui </a>e faça seu login</span>");
      if(oImgGlobalSign){oImgGlobalSign.style.display="";}
    }
    else{
      NameUser=fnFirstName(NameUser);
      jQuery('.loginInfo').html("<span'>Bem Vindo. "+NameUser+"<a href='#Logout' onclick=FCLib$.fnClientLogout('',sF$.fnCliLogout)><span class='HeaderSocialLoginLogout'>&nbsp;( sair x ) </a></span>");
      if(oImgGlobalSign){oImgGlobalSign.style.display="none";}
    }
    var oFoto=document.getElementById("UserImage");
    if(oFoto){
      if(PicUser==undefined || PicUser==""){oFoto.src=FC$.PathImg+"iconuser.svg?cccfc=1";}
      else{oFoto.src=PicUser;}   
    } 
  }
 
  function fnFirstName(NameUser){
    var iPos=NameUser.search(" ");
    if(iPos>0) return NameUser.charAt(0).toUpperCase() + NameUser.substring(0,iPos).slice(1).toLowerCase();
    else return NameUser.charAt(0).toUpperCase() + NameUser.slice(1).toLowerCase();
  }

  function fnCliLogout(obj,sPag){
    sF$.fnLoginUserName("","");
    FC$.ClientID==0;
    fnShowGlobalSignin();
  }
  
  function fnMostraDescontoHome(PrecoProd){
    if(PrecoProd==0 || iDescontoAvista==0)return;
    document.write("<p class=PriceAVistaProdLista>à vista <b>"+FormatPrice(PrecoProd*((100-iDescontoAvista)/100),FC$.Currency)+"</b></p>");
  }  

  function fnMostraDescontoProdLista(PrecoProd){
    if(PrecoProd==0 || iDescontoAvista==0)return;
    document.write("<p class=PriceAVistaProdLista>à vista <b>"+FormatPrice(PrecoProd*((100-iDescontoAvista)/100),FC$.Currency)+"</b></p>");
  }
  
  function fnMostraDescontoProdDet(PrecoProd){
    if(PrecoProd==0 || iDescontoAvista==0)return;
    document.getElementById("idPriceAVista").innerHTML="<div id='PriceAVista'><p>Para pagamentos à vista ganhe <b>"+ iDescontoAvista +"% de desconto</b>.</p><p>Valor com desconto <b>"+FormatPrice(PrecoProd*((100-iDescontoAvista)/100),FC$.Currency)+"</b></p></div>";
  }

  function fnCreateEventGA(sCategory,sAction,sLabel){
    if(typeof ga!=='undefined'){
      ga('send','event',sCategory,sAction,sLabel);
    }
  }
  
  //Show and Hide Banner Home
  function fnHideShowBannersHome(){
    var FCHideHomeBanners = document.getElementById('FC-HideHomeBanners');
    var FCShowHomeBanners = document.getElementById('FC-ShowHomeBanners');
    FCShowHomeBanners.innerHTML = FCHideHomeBanners.innerHTML;
  }
  
  //Aviso de disponibilidade
  function fnLinkDisp(Estoque,IDProduto){
    if(Estoque==0){
      document.write("<a href='javascript:MostraDisp("+ FC$.IDLoja +","+ IDProduto +")' title='Clique aqui para ser avisado quando este produto estiver disponível'>Avise-me quando estiver disponível</a>");
    }
  }
  
  // Video Filter
  function fnShowVideo(IDProduto,oProdFilters,sImagemProdPri,sNomeProd){
    var sVideo="";
    if(oProdFilters.length>0){
      var iFiltroVideo=oProdFilters[0].pFilNames["video"];
      if(iFiltroVideo!=undefined)sVideo=oProdFilters[0].pFil[iFiltroVideo].value;
    }
    fnVideoImage(IDProduto,sVideo,sImagemProdPri,sNomeProd);
  }
  
  // Video and Image Product
  function fnVideoImage(IDProduto,videoProduct,ImagemProdPri,NomeProd){
    var replaceNomeProd = NomeProd.replace(/-/g,' ');
    if (videoProduct==""){
      document.getElementById("id-video-image"+IDProduto).innerHTML="<div class='ImgCapaListProd DivListproductStyleImagemZoom'><img src="+ ImagemProdPri +" alt=\""+ replaceNomeProd +"\" onerror='MostraImgOnError(this,0)'></div>";
    }else{
     document.getElementById("id-video-image"+IDProduto).innerHTML="<video id=prodVideo"+ IDProduto +" class='videoProd' preload=auto loop src='https://my.mixtape.moe/"+ videoProduct +".mp4'></video>";
     function execVideoEvents(){
      var oVideo=document.getElementById("prodVideo"+IDProduto);
      if(FCLib$.isOnScreen(oVideo))oVideo.play();
     }
     execVideoEvents();
     FCLib$.AddEvent(document,"scroll",execVideoEvents);
    }
  }
  
  return{
    sCurrentPage:sCurrentPage,
    fnGetID:fnGetID,
    fnCustomizeIconsSocialNetworks:fnCustomizeIconsSocialNetworks,
    fnPreloadImages:fnPreloadImages,
    fnShowEconomy:fnShowEconomy,
    fnLogout:fnLogout,
    fnShowPrice:fnShowPrice,
    fnShowParcels:fnShowParcels,
    fnShowButtonCart:fnShowButtonCart,
    fnShowDisp:fnShowDisp,
    fnSearchSubmit:fnSearchSubmit,
    fnFormatNumber:fnFormatNumber,
    fnShowCart:fnShowCart,
    fnGoCart:fnGoCart,
    fnUpdateCart:fnUpdateCart,
    fnLoadXMLPageHistory:fnLoadXMLPageHistory,
    fnShowPageHistory:fnShowPageHistory,
    fnInsertVideo:fnInsertVideo,
    fnAdjustsFilters:fnAdjustsFilters,
    fnLoginUserName:fnLoginUserName,
    fnCliLogout:fnCliLogout,
    fnMostraDescontoHome:fnMostraDescontoHome,
    fnMostraDescontoProdLista:fnMostraDescontoProdLista,
    fnMostraDescontoProdDet:fnMostraDescontoProdDet,
    fnCreateEventGA:fnCreateEventGA,
    fnHideShowBannersHome:fnHideShowBannersHome,
    fnLinkDisp:fnLinkDisp,
    fnShowVideo:fnShowVideo,
    storagePopNews:storagePopNews,
    MediaQuery:MediaQuery,
    MenuStore:MenuStore
  }

})();

//Funções para o carrinho
var oDivShowCartOnPage=null;
var iLastCartOnPage=0;

function ShowCartOnPage(IDLoja,iErr,sMsg,sCartText,sCheckoutText,este){
  //console.log('function ShowCartOnPage de LojaLib.js #####');
  var oPos=getPos(este);
  if(oDivShowCartOnPage==null){
    var oNewElement=document.createElement("div");
    oNewElement.setAttribute("id","DivShowCartOnPage"); 
    oDivShowCartOnPage=document.body.appendChild(oNewElement);
  }
  oDivShowCartOnPage.style.backgroundColor="#fcfcfc";
  oDivShowCartOnPage.style.borderColor="#cdcdcd";
  oDivShowCartOnPage.style.color="#555555";
  oDivShowCartOnPage.style.border="1px solid #cdcdcd";
  oDivShowCartOnPage.style.marginTop="-95px";
  oDivShowCartOnPage.style.marginLeft="0px";
  oDivShowCartOnPage.style.position="absolute";
  oDivShowCartOnPage.style.zIndex="1";
  var iW=238;
  var iH=100;
  var oPosPrice=document.getElementById('PosPrice');
  if(oPosPrice){
    iW=oPosPrice.offsetWidth;
    iH=oPosPrice.offsetHeight;
  }
  if(iErr==0){var sBackColor="3187e6";var iLH=45} else {var sBackColor="949494";var iLH=25}
  var sHTML="<table id=idTabShowCartOnPageFC width='"+iW +"' height='"+ iH +"' cellpadding=3 cellspacing=3>";
     sHTML+="<tr onclick=top.location.href='/addproduto.asp?idloja="+ IDLoja +"'><td id=idTDTitShowCartOnPageFC colspan=2 align=center style='background-color:#"+ sBackColor +";color:#ffffff;border-width:1px;border-color:#3b6e22;font-weight:bold;font-size:12px;cursor:pointer'><div style='padding:5px; line-height:"+ iLH +"px;'>"+ sMsg +"</div></td></tr>";
     if(iErr==0){
       sHTML+="<tr height=45>";
       sHTML+="<td valign=top align=center style=cursor:pointer onclick=top.location.href='/addproduto.asp?idloja="+ IDLoja +"'><a href='/addproduto.asp?idloja="+ IDLoja +"' style='color:#444444;text-decoration:none;font-size:14px;font-weight:bold;'>Ir para o carrinho</a></td>";
       sHTML+="<td align=left><img src='"+ FC$.PathImg +"ic_close.svg?cccfc=1' width=20 height=20 hspace=5 style='cursor:pointer;margin-top:10px' onclick=oDivShowCartOnPage.style.visibility='hidden'></td>";
       sHTML+="</tr>";
       sF$.fnUpdateCart(true,false);
     }
     else{
       sHTML+="<tr height=25>";
       sHTML+="<td colspan=2 align=center><img src='"+ FC$.PathImg +"ic_close.svg?cccfc=1' width=20 height=20 hspace=5 style='cursor:pointer;margin:10px;' onclick=oDivShowCartOnPage.style.visibility='hidden'></td>";
       sHTML+="</tr>";
     }
     sHTML+="</table>";
  oDivShowCartOnPage.style.top=oPos.y+"px";
  oDivShowCartOnPage.style.left=oPos.x+"px";
  oDivShowCartOnPage.innerHTML=sHTML;
  oDivShowCartOnPage.style.visibility="visible";
  iLastCartOnPage++;
  setTimeout("if(iLastCartOnPage=="+ iLastCartOnPage +")oDivShowCartOnPage.style.visibility='hidden';",4000);
}

// ZipCode - CEP
// function fnShowCEP(IDProd){
//   if(FC$.TypeFrt==3 || FC$.TypeFrt==4){
//     var sNumCEP=fnGetCookie('CEP'+FC$.IDLoja);
//     if(sNumCEP==null)sNumCEP="";
//     sCEP="<div id='idDivCEPFC'>";
//     sCEP+="  <div id='idDivTitCEP'><span class='font-bold'>Simule o valor do frete</span></div>";
//     sCEP+="  <div id='idDivContentCEP'>";
//     sCEP+="    <div id='idDivContentFieldsCEP'>";
//     sCEP+="      <div id='idDivCEPCalc'>";
//     sCEP+="        <div class='FieldCEP FieldCEPQty'><label>Qtd.</label><input type='number' id='idQtdZip"+ IDProd +"' value='1' maxlength='4'></div>";
//     sCEP+="        <div class='FieldCEP FieldCEPNum'><input type='text' placeholder='CEP' id='idZip"+ IDProd +"' value='"+ sNumCEP +"' maxlength='9'></div>";
//     // sCEP+="        <img src='"+ FC$.PathImg +"icon-arrow-cep.svg alt='Simular frete' id='idCEPButton' class='FieldCEPBtn' onclick='fnGetShippingValuesProd("+ IDProd +")'>";
//     sCEP+="      </div>";
//     sCEP+="    </div>";
//     sCEP+="    <div id='idDivImgLoadingCEPFC'><img src='"+ FC$.PathImg +"loadingcep.gif?cccfc=1' vspace=3 style='display:none;' id=ImgLoadingCEP></div>";
//     sCEP+="    <div id='idShippingValues"+ IDProd +"'></div></div>";
//     sCEP+="  </div>";
//     if(FC$.TypeFrt==4)sCEP+="<div class='FreightTxtOnlyBR'><img src='"+FC$.PathImg+"icexclamation.svg?cccfc=1'>Simulação apenas para o Brasil</div>";
//     sCEP+="</div>";
//     var oShowCEP=document.getElementById("ShowCEP"+IDProd);
//     if(oShowCEP)oShowCEP.innerHTML=sCEP;
//   }
// }

function fnGetShippingValuesProd(IDProd){
  sCEP=document.getElementById("idZip"+ IDProd).value;
  fnSetCookie('CEP'+FC$.IDLoja,sCEP);
  if(sCEP==""){document.getElementById("idShippingValues"+IDProd).innerHTML="<span class='freightResult' style=color:#990000;>Informe o CEP</span>";return;}
  document.getElementById("idShippingValues"+IDProd).innerHTML="";
  document.getElementById("ImgLoadingCEP").style.display='';
  var iQty=document.getElementById("idQtdZip"+IDProd).value;
  if(IDProd)var sParamProd="&idproduto="+ IDProd;
  else var sParamProd="";
  AjaxExecFC("/XMLShippingCEP.asp","IDLoja="+ FC$.IDLoja +"&qty="+ iQty +"&cep="+ sCEP + sParamProd,false,processXMLCEP,IDProd);
}

function processXMLCEP(obj,IDProd){
  var sShipping="";
  var oShippingValues=document.getElementById("idShippingValues"+IDProd);
  var iErr=ReadXMLNode(obj,"err");if(iErr==null)return;
  if(iErr!="0"){
    document.getElementById("ImgLoadingCEP").style.display='none';
    oShippingValues.innerHTML="<span class='freightResult' style=color:#990000;>"+ ReadXMLNode(obj,"msg") +"</span>";
    return;
  }
  oShippingValues.innerHTML="";
  var UseCart=ReadXMLNode(obj,"UseCart");
  if(UseCart=="False"){
    var ProdName=ReadXMLNode(obj,"ProdName");
    var ProdRef=ReadXMLNode(obj,"ProdRef");  
  }
  sShipping+="<div class='ZipOptions'>";
  var iOpt=ReadXMLNode(obj,"OptQt");
  for(var i=1;i<=iOpt;i++){
    var OptName=ReadXMLNode(obj,"Opt"+ i +"Name");
    var OptImage=ReadXMLNode(obj,"Opt"+ i +"Image");
    var OptObs=ReadXMLNode(obj,"Opt"+ i +"Obs");
    if(OptObs==null)OptObs="";
    sValorFrete=ReadXMLNode(obj,"Opt"+ i +"Value");
    if(sValorFrete==FC$.Currency+" 0,00")sValorFrete="FRETE GRÁTIS";
    sShipping+="<div class='ZipOption'>";
    sShipping+="  <div class='ZipNameObs'>";
    sShipping+="    <div class='ZipName'>"+ OptName +"</div>";
    sShipping+="    <div class='ZipObsVal'>"+ OptObs +"</div>";
    sShipping+="  </div>";
    sShipping+="  <div class='ZipValue'>"+ sValorFrete +"</div>";
    sShipping+="</div>";
  }
  oShippingValues.innerHTML=sShipping;
  oShippingValues.style.display="block"; 
  sShipping+="</div>";
  document.getElementById("ImgLoadingCEP").style.display='none';
}

function fnGetCookie(name){
  var arg=name+"=";
  var alen=arg.length;
  var clen=document.cookie.length;
  var i=0;
  while (i<clen){
    var j=i+alen;
    if(document.cookie.substring(i,j)==arg)return fnGetCookieVal(j);
    i=document.cookie.indexOf(" ",i)+1;
    if(i==0)break;
  }
  return null;
}

function fnGetCookieVal(offset){
  var endstr=document.cookie.indexOf(";",offset);
  if (endstr==-1)endstr=document.cookie.length;
  return unescape(document.cookie.substring(offset,endstr));
}

function fnSetCookie(name,value){
  var argv=fnSetCookie.arguments;
  var argc=fnSetCookie.arguments.length;
  var expires=(argc>2)?argv[2]:null;
  var path=(argc>3)?argv[3]:null;
  var domain=(argc>4)?argv[4]:null;
  var secure=(argc>5)?argv[5]:false;
  document.cookie=name+"="+escape(value)+((expires==null)?"":(";expires=" + expires.toGMTString()))+((path==null)?"":(";path="+path))+((domain==null)?"":(";domain="+domain))+((secure==true)?"; secure":"");
}
// Frete - CEP - End

//Smart Suggestions
function fnCallbackSuggestions(aTerms){
  "use strict";
  var iTerms=aTerms.length;
  if(FC$.Page=="News"){
    var sParamName="textobuscanews"
    var sIDNotFound="idNotFoundNewsFC";
  }
  else{
    var sParamName="texto"
    var sIDNotFound="idTxtCatNotFoundFC";
  }
  var oNotFound=FCLib$.GetID(sIDNotFound);
  if(oNotFound && iTerms>=1){
    if(iTerms>10)iTerms=10;
    var sTerms="<div id=GoogleTerms><ul>";
    var sPlural=(iTerms>1)?"s":"";
    sTerms+="<li><b>Busca"+ sPlural +" sugerida"+ sPlural +" pelo Google:</b></li>";
    for(var i=0;i<iTerms;i++)sTerms+="<li><a href='"+ FCLib$.fnGetSearchURL(aTerms[i],sParamName) +"'>"+aTerms[i]+"</a></li>";
    sTerms+="</ul></div>";
    oNotFound.insertAdjacentHTML('afterend',sTerms);
  }
}

// Funções executadas no rodapé
function fnFooter(){ 
  sF$.MenuStore(); 
  sF$.storagePopNews();
  FCLib$.onReady(sF$.fnCustomizeIconsSocialNetworks(false));
  sF$.fnLogout();
  fnShowYear();
 


  if(FC$.query!="")FCLib$.onReady(FCLib$.fnGetSuggestions(decodeURIComponent(FC$.query),true,fnCallbackSuggestions));

  if(FC$.Page=="Products"){
    if(iQtdProds>2){
      var oScript=document.createElement('script');
      oScript.type='text/javascript';
      oScript.async=true;
      oScript.src=FC$.PathHtm+'IncPaginacaoOrder.js?cccfc=1';
      var sAddScript=document.getElementsByTagName('script')[0];
      sAddScript.parentNode.insertBefore(oScript,sAddScript); 
    }
  }else if(FC$.Page=="Track")FCLib$.onReady(FCLib$.fnOrderTrack());

  jQuery(document).ready(function(){
    sF$.fnLoadXMLPageHistory();
  });
  


  FCLib$.ShowBadgeFC();
  var ListVerify=document.querySelector('.ProductList');
  if (FC$.Page=="Products" && ListVerify){
    document.querySelector('#idFCContent').setAttribute('class','col-large-9 col-xlarge-10');
  };

  FCLib$.onReady(FCLib$.execWaveInterchange);
}

  /*Executa Toolbar*/
  function ToolbarCartExec(){
    //Toolbar
    var TemScroll = false;
    jQuery(window).scroll(function(event) {
      if(jQuery(window).scrollTop() > 150 && !TemScroll){
        jQuery('.FCToolBar').fadeIn(300);
      }else{jQuery('.FCToolBar').fadeOut(150);}
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
 
function fnShowYear(){
  //Show year Rodape.htm
  var footerDate = new Date();
  var footerYearDisplay = footerDate.getFullYear();
  var oFooterFullYear=document.getElementById("FooterFullYear");
  if(oFooterFullYear)oFooterFullYear.innerHTML = footerYearDisplay;
}
// Funções executadas no rodapé

// mixitUp
function execMixClasses(){
  var catBlock = jQuery('.CatContainerFC');
  jQuery(catBlock).each(function(){
    jQuery(this).addClass('mix');
  });
  jQuery('.CatBlockFC').attr('id', 'Container');
  jQuery(function(){jQuery('#Container').mixItUp();});
  FCLib$.onReady(
    function(){
    var elCat = document.querySelectorAll('.FCBtnMixit');
    elCat[0].setAttribute("class", "FCBtnMixit sort active");
  });  
}

var bCascate=false;
function NoCascate(sURL){
  if(!bCascate){
    bCascate=true;
    location.href=sURL;
  }
  else bCascate=false;
}

// Grade
/*Função para mostrar parcelamento*/
function fnMaxInstallmentsGrid(PrecoProd,MaxParcelas){
  var ComSem;
  if(typeof Juros!="undefined"){
    if(PrecoProd==0||MaxParcelas==1||Juros.length==0)return "";
    if(MaxParcelas==0||MaxParcelas>Juros.length)MaxParcelas=Juros.length;
    if(Juros[MaxParcelas-1]>0)ComSem=""; else ComSem=" sem juros";
    return "<span class=EstParc>"+MaxParcelas+"x de <b>"+FormatPrice(CalculaParcelaJurosCompostos(PrecoProd,MaxParcelas),FC$.Currency)+"</b>"+ComSem+"</span>";
  }else{
    return "";
  }
}

/*Função para mostrar valor formatado*/
function FormatNumber(num){
  var num=num.toString().replace(/\$|\,/g,'');
  if(isNaN(num))num="0";
  sign=(num==(num=Math.abs(num))); num=Math.floor(num*100+0.50000000001); num=Math.floor(num/100).toString();
  for(var i=0;i<Math.floor((num.length-(1+i))/3);i++)num=num.substring(0,num.length-(4*i+3))+'.'+num.substring(num.length-(4*i+3));
  return ((sign)?'':'-')+num;
}

/*Função para mostrar valor economizado em produtos em promoção*/
function fnShowEconomyGrid(ProdPrice,ProdPriceOri){
  if(ProdPrice!=ProdPriceOri && typeof FormatNumber == 'function' && typeof FormatPrice == 'function' ){
    return "<font style='font-size:16px;display:block;' color=#33691e>Economize <b>"+ FormatPrice(ProdPriceOri-ProdPrice,FC$.Currency) +"</b> ("+ FormatNumber(((ProdPriceOri-ProdPrice)/ProdPriceOri)*100)+"%)</font>";
  }else{return "";}
}

// ZipCode Grid FC - CEP - Begin 
function fnShowCEPGrid(IDProd){ 
 
  if(FC$.TypeFrt==3){ 
    var sNumCEP=fnGetCookie('CEP'+FC$.IDLoja);
    if(sNumCEP==null)sNumCEP="";
    sCEP="<div id='idDivCEPFC' class='ProductDet-cep-position'>";
    sCEP+="  <div id='idDivTitCEP'><span class='font-bold'>Simule o valor do frete:</span></div>";
    sCEP+="  <div id='idDivContentCEP'>";
    sCEP+="    <div id='idDivContentFieldsCEP'>";
    sCEP+="      <div id='idDivCEPCalc'>";
    sCEP+="        <div class='FieldCEP FieldCEPQty'><label>Qtd.</label><input type='number' id='idQtdZip"+ IDProd +"' value='1' maxlength='4'></div>";
    sCEP+="        <div class='FieldCEP FieldCEPNum'><input type='text' placeholder='CEP' id='idZip"+ IDProd +"' value='"+ sNumCEP +"' maxlength='9'></div>";
    sCEP+="        <img src='"+ FC$.PathImg +"icon-arrow-cep.svg'  id='idCEPButton' alt='Simular frete' class='FieldCEPBtn' onclick='fnGetShippingValuesProdGrid("+ IDProd +")'>";
    sCEP+="      </div>";
    sCEP+="    </div>";
    sCEP+="    <div id='idDivImgLoadingCEPFC'><img src='"+ FC$.PathImg +"loadingcep.gif?cccfc=1' alt=' ' vspace=3 style='display:none;' id=ImgLoadingCEP></div>";
    sCEP+="    <div id='idShippingValues"+ IDProd +"'></div></div>";
    sCEP+="  </div>";
    sCEP+="</div>";
    var oShowCEP=document.getElementById("ShowCEP"+IDProd);
    if(oShowCEP)oShowCEP.innerHTML=sCEP;
  }
}

function fnGetShippingValuesProdGrid(IDProd){
  sCEP=document.getElementById("idZip"+ IDProd).value;
  fnSetCookie('CEP'+FC$.IDLoja,sCEP);
  if(sCEP==""){document.getElementById("idShippingValues"+IDProd).innerHTML="<span class='freightResult' style=color:#990000;>Informe o CEP</span>";return;}
  document.getElementById("idShippingValues"+IDProd).innerHTML="";
  document.getElementById("ImgLoadingCEP").style.display='';
  var iQty=document.getElementById("idQtdZip"+IDProd).value;
  if(IDProd)var sParamProd="&idproduto="+ IDProd;
  else var sParamProd="";
  AjaxExecFC("/XMLShippingCEP.asp","IDLoja="+ FC$.IDLoja +"&qty="+ iQty +"&cep="+ sCEP + sParamProd,false,processXMLCEPGrid,IDProd);

}

function processXMLCEPGrid(obj,IDProd){
  var sShipping="";
  var oShippingValues=document.getElementById("idShippingValues"+IDProd);
  var iErr=ReadXMLNode(obj,"err");if(iErr==null)return;
  if(iErr!="0"){
    document.getElementById("ImgLoadingCEP").style.display='none';
    oShippingValues.innerHTML="<span class='freightResult' style=color:#990000;>"+ ReadXMLNode(obj,"msg") +"</span>";
    return;
  }
  oShippingValues.innerHTML="";
  var UseCart=ReadXMLNode(obj,"UseCart");
  if(UseCart=="False"){
    var ProdName=ReadXMLNode(obj,"ProdName");
    var ProdRef=ReadXMLNode(obj,"ProdRef");  
  }
  sShipping+="<div class='ZipOptions'>";
  var iOpt=ReadXMLNode(obj,"OptQt");
  for(var i=1;i<=iOpt;i++){
    var OptName=ReadXMLNode(obj,"Opt"+ i +"Name");
    var OptImage=ReadXMLNode(obj,"Opt"+ i +"Image");
    var OptObs=ReadXMLNode(obj,"Opt"+ i +"Obs");
    if(OptObs==null)OptObs="";
    sValorFrete=ReadXMLNode(obj,"Opt"+ i +"Value");
    if(sValorFrete==FC$.Currency+" 0,00")sValorFrete="FRETE GRÁTIS";
    sShipping+="<div class='ZipOption'>";
    sShipping+="  <div class='ZipNameObs'>";
    sShipping+="    <div class='ZipName'>"+ OptName +"</div>";
    sShipping+="    <div class='ZipObsVal'>"+ OptObs +"</div>";
    sShipping+="  </div>";
    sShipping+="  <div class='ZipValue'>"+ sValorFrete +"</div>";
    sShipping+="</div>";
  }
  oShippingValues.innerHTML=sShipping;
  oShippingValues.style.display="block"; 
  sShipping+="</div>";
  document.getElementById("ImgLoadingCEP").style.display='none';
}
// ZipCode Grid FC - CEP - End

function fnGetCookie(name){
  var arg=name+"=";
  var alen=arg.length;
  var clen=document.cookie.length;
  var i=0;
  while (i<clen){
    var j=i+alen;
    if(document.cookie.substring(i,j)==arg)return fnGetCookieVal(j);
    i=document.cookie.indexOf(" ",i)+1;
    if(i==0)break;
  }
  return null;
}

function fnGetCookieVal(offset){
  var endstr=document.cookie.indexOf(";",offset);
  if (endstr==-1)endstr=document.cookie.length;
  return unescape(document.cookie.substring(offset,endstr));
}

function fnSetCookie(name,value){
  var argv=fnSetCookie.arguments;
  var argc=fnSetCookie.arguments.length;
  var expires=(argc>2)?argv[2]:null;
  var path=(argc>3)?argv[3]:null;
  var domain=(argc>4)?argv[4]:null;
  var secure=(argc>5)?argv[5]:false;
  document.cookie=name+"="+escape(value)+((expires==null)?"":(";expires=" + expires.toGMTString()))+((path==null)?"":(";path="+path))+((domain==null)?"":(";domain="+domain))+((secure==true)?"; secure":"");
}

FCLib$.onReady(FCLib$.showPwdViewer);
function FuncChkRegisterBegin(){FCLib$.showPwdViewer();}

// Global Signin
if(FC$.ClientID==0)FCLib$.onReady(fnShowGlobalSignin);

function fnShowGlobalSignin(){
  var oImgGlobalSign=sF$.fnGetID("idImgGlobalSignFC");
  if(oImgGlobalSign){
    var bFacebookLogin=false;
    var bGoogleLogin=false;
    var sImgs="ou";
    if(typeof FC$.FacebookSigninID!="undefined"){
      sImgs+="<img src='"+ FC$.PathImg +"facebooklogin.svg' class='FacebookSigninClass' data-loginsuccess='fnLoginShowUserName'>";
      bFacebookLogin=true;
    } 
    if(typeof FC$.GoogleSigninID!="undefined"){
      sImgs+="<img src='"+ FC$.PathImg +"googlelogin.svg' class='GoogleSigninClass' data-loginsuccess='fnLoginShowUserName'>";
      bGoogleLogin=true;
    }
    if(bFacebookLogin||bGoogleLogin)oImgGlobalSign.innerHTML=sImgs;
    if(bFacebookLogin)FCLib$.signinFacebook();
    if(bGoogleLogin)FCLib$.signinGoogle();
  }
}

function fnLoginShowUserName(user){
  sF$.fnLoginUserName(user.fullName,user.pictureURL);
}



// Don't Go Popup
if(FC$.Page=="Home" || FC$.Page=="Products"){
  FCLib$.onReady(function(){
    if(FCLib$.GetID("overlay")){
      //Dynamic Don't Go Container
      var dynamicDontGoContainer = document.createElement('div');
      dynamicDontGoContainer.id = 'ShowDontGoPopup';
      dynamicDontGoContainer.className = 'DontGoPopup';
      document.getElementsByTagName('body')[0].appendChild(dynamicDontGoContainer);
    
      //Dynamic Don't Go Container Elements
      var dynamicDontGoContainerElements = document.createElement('div');
      dynamicDontGoContainerElements.className = 'DontGoPopupContent';
      dynamicDontGoContainer.appendChild(dynamicDontGoContainerElements);
    
      //Dynamic Don't Go Elements Close Button
      var dynamicDontGoElementsCloseButton = document.createElement('div');
      dynamicDontGoElementsCloseButton.className = 'DontGoPopupCloseButton';
      dynamicDontGoContainerElements.appendChild(dynamicDontGoElementsCloseButton);
      dynamicDontGoElementsCloseButton.innerHTML = "<img id='idBtnDontGoClose' alt='Fechar popup' border='0' onclick='sF$.fnCreateEventGA(\"DontGo\",\"Clique\",\"Close\");'>";
    
      //Dynamic Don't Go Elements Banner
      var dynamicDontGoElementsBanner = document.createElement('div');
      dynamicDontGoElementsBanner.className = 'DontGoBanner';
      dynamicDontGoContainerElements.appendChild(dynamicDontGoElementsBanner);
      dynamicDontGoElementsBanner.innerHTML = "<a id='idLinkDontGo' target='_self'><img id='idImgDontGo' src='' border='0' onclick='sF$.fnCreateEventGA(\"DontGo\",\"Clique\",\"Banner\");'></a>"; 
    
      //PreLoading Image Banner
      var preLoadingDontGoBanner = new Image();
      preLoadingDontGoBanner.onload = function () {
        document.getElementById('idImgDontGo').src = preLoadingDontGoBanner.src;
      };
      preLoadingDontGoBanner.src = FC$.PathImg +"bannerpopupdontgo.jpg?cccfc=1";
    
      //Show Don't Go Popup
      FCLib$.fnDontGo(userDontGo,{
      DontGoBtnClose:FC$.PathImg +"close-browser.svg", //Close button
      DontGoBanner:FC$.PathImg +"bannerpopupdontgo.jpg", //Banner
      DontGoLink:"/prod,idloja,"+FC$.IDLoja+",promocao,1,ofertas.htm", //Link
      DontGoAltParam:"UM DESCONTO ESPECIAL PARA VOCÊ!"}, //Alt Param
      "DontGoCookie"); //Cookie name
    }
  });
}

function userDontGo(oParam){
  var OpenDontGoPopup=document.getElementById('ShowDontGoPopup');
  if(OpenDontGoPopup){
    document.getElementById("idBtnDontGoClose").src=oParam.DontGoBtnClose; //Close button
    document.getElementById("idImgDontGo").src=oParam.DontGoBanner; //Banner
    document.getElementById("idImgDontGo").alt=oParam.DontGoAltParam; //Alt Param
    document.getElementById("idLinkDontGo").href=oParam.DontGoLink; //Link
    sF$.fnCreateEventGA("DontGo","Open","Window");
    window.onload=OpenDontGoPopup.style.display="block";
    var CloseDontGoPopup=document.getElementsByClassName("DontGoPopupCloseButton")[0];
    CloseDontGoPopup.onclick=function(){OpenDontGoPopup.style.display="none";}
  }
}

function fnDontGoActions() {
  var oDontGo = document.getElementById('ShowDontGoPopup');
  if (oDontGo) {
    window.addEventListener("keydown", (function (e) {
      if (oDontGo && e.keyCode == 27) {
        oDontGo.style.display = "none";
      }
    }), false);
    oDontGo.addEventListener("click", (function (e) {
      e.stopPropagation();
      if (e.target.id != 'DontGoPopupContent' && e.target.id == 'ShowDontGoPopup') {
        oDontGo.style.display = "none";
      }
    }), false);
  }else{
    return;
  }
}
document.addEventListener('DOMContentLoaded', fnDontGoActions, false);

 

 

// Carrinho


function fnShowCart(){AjaxExecFC("/xmlcart.asp","idloja="+ FC$.IDLoja,false,fnShowCartInfo);}
function fnShowCartInfo(oDocXML){
var oShowCart=document.getElementById("ShowCart");
if(oShowCart){
var oProdsCart=oDocXML.getElementsByTagName("item");
var oInfoCart=oDocXML.getElementsByTagName("cart");
try{currencyProdCart=(oInfoCart[0].getElementsByTagName("currency")[0].childNodes[0].nodeValue);}
catch(e){currencyProdCart=""}
try{TotalQtyProdCart=(oInfoCart[0].getElementsByTagName("TotalQty")[0].childNodes[0].nodeValue);}
catch(e){TotalQtyProdCart="0"}
try{subtotalProdCart=(oInfoCart[0].getElementsByTagName("subtotal")[0].childNodes[0].nodeValue);}
catch(e){subtotalProdCart="0"}
var QtdCesta=TotalQtyProdCart;
var sInfoCart="";
var cartOnpage=document.getElementById("idCartItemsTop")  
if (QtdCesta>=0){
FCLib$.fnLoadScript(FC$.PathHtm+'MenuTopoAparecer.js',true);
FCLib$.fnLoadScript(FC$.PathHtm+'MenuTopo.js',true);
sInfoCart+=" <div class='CartAjax'>";
sInfoCart+=" <span class='CartRes'<span class='EstPrecoProd'>"+ TotalQtyProdCart +"</span></span>";
sInfoCart+=" </span>";
sInfoCart+=" <div class='Cart'>";
sInfoCart+=" <p class='EstTitXML'><a href='/addproduto.asp?idloja="+ FC$.IDLoja +"' title='Ver meu carrinho'>Minha Sacola:</a></p>";
sInfoCart+=" <div class='CartItem'>";
for (i=0;i<oProdsCart.length;i++)
{
var sCestaFC=document.getElementById("idMostraDadosCestaFC");
var NomeProdCart=(oProdsCart[i].getElementsByTagName("prod")[0].childNodes[0].nodeValue);
var qtyProdCart=(oProdsCart[i].getElementsByTagName("qty")[0].childNodes[0].nodeValue);
var priceProdCart=(oProdsCart[i].getElementsByTagName("price")[0].childNodes[0].nodeValue);
sInfoCart+="<p class='ItemXML'><span class='TitItem'>" + NomeProdCart + " <span class='QtProd'>(" + qtyProdCart + ") </span></span><span class='PrecoItem'>" + currencyProdCart + " " + priceProdCart + "</span></p>";
}
sInfoCart+=" </div>";
sInfoCart+=" <div class='CartInfo'>";
sInfoCart+=" <p><b>Sub-total:</b> <span class='PrecoTotal'>"+ currencyProdCart +" " + subtotalProdCart +" </span></p>";
sInfoCart+=" </div>";
sInfoCart+=" </div>";
sInfoCart+=" </div>";
}
if(sInfoCart!="")oShowCart.innerHTML=sInfoCart;
}
}


var carousel = function(){ 
 var swipers = { 
 banners: function(){
    var swiperlist  = new Swiper('.swiper-container-banners', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        slidesPerView: 1,
        spaceBetween: 15,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        loop:true,
        autoplay: 2500,
        preventClicks:true,
        preventClicksPropagation:true,
        breakpoints: {
            1024: {
                slidesPerView: 1
            },
            768: {
                slidesPerView: 1
            },
            640: {
                slidesPerView: 1
            },
            320: {
                slidesPerView: 1
            }
        }
    });
    carousel.swipers.removeLazyLoad();
  },

  removeLazyLoad: function(){
    var allElemImg = document.querySelectorAll(".swiper-slide a img");
    for(var i=0; i< allElemImg.length; i++){
      var oImg = allElemImg[i].getAttribute("data-src");
      if(oImg != null){ allElemImg[i].src= oImg;}
    }
  }
}
  return {
    "swipers":swipers
  }

}();
