$(document).ready(function() {

    
    /*页面切换*/
	$(".left ul>li a[href='#jingying']").click(function() {
		$(this).css("background-color", "#3c3c3c");
		$(this).css("border-color", "#3c3c3c");
		$(this).css("border-top-color", "#ffa818");
		$(".left ul>li a[href='#case']").css("background-color", "#a3a3a3");
		$(".left ul>li a[href='#case']").css("border-color", "#a3a3a3");
		$(".left ul>li a[href='#lietou']").css("background-color", "#a3a3a3");
		$(".left ul>li a[href='#lietou']").css("border-color", "#a3a3a3");

	});

	$(".left ul>li a[href='#case']").click(function() {
		$(this).css("background-color", "#3c3c3c");
		$(this).css("border-color", "#3c3c3c");
		$(this).css("border-top-color", "#ffa818");
		$(".left ul>li a[href='#jingying']").css("background-color", "#a3a3a3");
		$(".left ul>li a[href='#jingying']").css("border-color", "#a3a3a3");
		$(".left ul>li a[href='#lietou']").css("background-color", "#a3a3a3");
		$(".left ul>li a[href='#lietou']").css("border-color", "#a3a3a3");
	});

	$(".left ul>li a[href='#lietou']").click(function() {
		$(this).css("background-color", "#3c3c3c");
		$(this).css("border-color", "#3c3c3c");
		$(this).css("border-top-color", "#ffa818");
		$(".left ul>li a[href='#jingying']").css("background-color", "#a3a3a3");
		$(".left ul>li a[href='#jingying']").css("border-color", "#a3a3a3");
		$(".left ul>li a[href='#case']").css("background-color", "#a3a3a3");
		$(".left ul>li a[href='#case']").css("border-color", "#a3a3a3");
	});
    

    /*年薪选择*/
    $("div#case div#nianxinid .dropdown-menu li").click(function(){
    	var atext=$(this).find("a").text();
    	 $(".tab-content div#case div#nianxinid .form-control").attr("placeholder",atext);
    });
   /* 行业选择*/
    $("div#case div#hangyeid .dropdown-menu li").click(function(){
    	var atext=$(this).find("a").text();
    	 $(".tab-content div#case div#hangyeid .form-control").attr("placeholder",atext);
    });
    

     /*右上的动画*/
     $('#centerwell li#photo1').click(function() {
     if(!$(this).is(':animated')){

      
      $(this).animate({width: '540px'}, 300).siblings().animate({width: '135px'}, 300);
      $(this).find('div.imgpho').css("background-image","url(images/photo11.png)");
      $('#centerwell li#photo2 div.imgpho').css("background-image","url(images/photo2.png)");
      $('#centerwell li#photo3 div.imgpho').css("background-image","url(images/photo3.png)");
      /*$(this).find('div.imgpho').css("background-image","url(images/photo11.png)").siblings().parent().siblings().find('div.imgpho').animate({backgroundPosition: '0px'}, 300);*/
     }
  });


     $('#centerwell li#photo2').click(function() {
     if(!$(this).is(':animated')){

      
      $(this).animate({width: '540px'}, 300).siblings().animate({width: '135px'}, 300);
      $(this).find('div.imgpho').css("background-image","url(images/photo22.png)");
      $('#centerwell li#photo1 div.imgpho').css("background-image","url(images/photo1.png)");
      $('#centerwell li#photo3 div.imgpho').css("background-image","url(images/photo3.png)");
      /*$(this).find('div.imgpho').css("background-image","url(images/photo11.png)").siblings().parent().siblings().find('div.imgpho').animate({backgroundPosition: '0px'}, 300);*/
     }

     

    /*if(!$(this).is(':animated')){
      $(this).animate({width: '318px'}, 300).siblings().animate({width: '72px'}, 300);
      $(this).find('h3').animate({backgroundPosition: '-72px'}, 300).parent().siblings().find('h3').animate({backgroundPosition: '0px'}, 300);
    }*/
  });


     $('#centerwell li#photo3').click(function() {
     if(!$(this).is(':animated')){

      
      $(this).animate({width: '540px'}, 300).siblings().animate({width: '135px'}, 300);
      $(this).find('div.imgpho').css("background-image","url(images/photo33.png)");
      $('#centerwell li#photo1 div.imgpho').css("background-image","url(images/photo1.png)");
      $('#centerwell li#photo2 div.imgpho').css("background-image","url(images/photo2.png)");
      /*$(this).find('div.imgpho').css("background-image","url(images/photo11.png)").siblings().parent().siblings().find('div.imgpho').animate({backgroundPosition: '0px'}, 300);*/
     }

     

    /*if(!$(this).is(':animated')){
      $(this).animate({width: '318px'}, 300).siblings().animate({width: '72px'}, 300);
      $(this).find('h3').animate({backgroundPosition: '-72px'}, 300).parent().siblings().find('h3').animate({backgroundPosition: '0px'}, 300);
    }*/
  });


    /* 字幕滚动*/
    $("#scrollDiv").textSlider({line:1,speed:500,timer:1000});


});