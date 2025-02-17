(function ($) {
  $(document).ready(function () {
    var $window = $(window);
    // Responsive Slick    
    function itemSlick(slick,responsive,paramslide) {
      var autospeed = 5000,
      margin = 0,
      marginRes = 15,
      arrows = 'icon-arrow-1',                
      speed,dataout,datain,dotsContainer,navContainer;
      var slideArray = paramslide.split('||');
      $.each(slideArray, function (index, value) {
        var value = value.split('=');
        if(value[0] == 'speed')
          var speed = parseInt(value[1]);
        if(value[0] == 'autospeed')
          var autospeed = parseInt(value[1]);
        else if(value[0] == 'out')
          var dataout = value[1];
        else if(value[0] == 'in')
          var datain = value[1];
        else if(value[0] == 'nav')
          var navContainer = value[1];
        else if(value[0] == 'dot')
          var dotsContainer = value[1];
        else if(value[0] == 'margin')
          var margin = parseInt(value[1]);
          if(margin==0){  marginRes = 0;  }            
        else if(value[0] == 'arrows')
          var arrows = value[1];
      });
      slick.slick({
        nextArrow: '<span class="nextArrow"><i class="fas fa-arrow-right"></i></span>',
        prevArrow: '<span class="prevArrow"><i class="fas fa-arrow-left"></i></span>',
        infinite: slick.hasClass('s-loop') ? true : false,
        fade: (slick.hasClass('s-fade') ? true : false),                                   
        adaptiveHeight: (slick.hasClass('s-height') ? true : false),
        arrows: (slick.hasClass('s-nav') ? true : false),
        dots: (slick.hasClass('s-dots') ? true : false),
        speed: (speed ? parseInt(speed) : 400),
        variableWidth: (slick.hasClass('s-width') ? true : false),
        autoplaySpeed: (autospeed ? parseInt(autospeed) : 5000),
        autoplay: slick.hasClass('s-auto') ? true : false,
        centerMode: slick.hasClass('s-center') ? true : false,
        vertical: (slick.hasClass('s-vertical') ? true : false),
        verticalSwiping: (slick.hasClass('s-vertical') ? true : false),
        slidesToShow: parseInt(responsive[0]),
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: parseInt(responsive[1]),
              arrows: true,
              autoplay:false
            }
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: parseInt(responsive[2]),
              arrows: true,
              autoplay:false
            }
          },                        
          {
            breakpoint: 768,
            settings: {
              slidesToShow: parseInt(responsive[3]),
              arrows: true,
              autoplay:false   
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: parseInt(responsive[4]),
              arrows: true,
              autoplay:false     
            }
          }
        ]
      });
    }        
    // Responsive Slick    
    function ResSlickSlider() {
      $(".slick-res").each(function () {
        var slick = $(this),
        responsive =  slick.attr('data-res'),
        paramslide = slick.attr('paramslide'); 
        // console.log(paramslide);
        if(!paramslide) paramslide='';
        if(!responsive) { responsive = '1,1,1,1,1'; }
        responsive = responsive.split(',');
        itemSlick(slick,responsive,paramslide);
      });    
    }        
    ResSlickSlider();    
  });
})(jQuery); 