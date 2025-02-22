// JavaScript Document
(function($){
    $(document).ready(function(){
        var $window = $(window),
            hd = $('#header'),
            hh = hd.outerHeight(),
            wh = $(window).outerHeight(),
            wst = $(window).scrollTop(),
            banner = $('#bannertop');

        function imgres() {  
            $(".entry-content img").each(function() {
               w = $(this).attr('width');
               h = $(this).attr('height');
               if(w && h) {
                   d = $(this).attr('data-display');
                   if(d){
                    s = 'display: block; max-width:'+w+'px';
                   }else{
                    s = 'display: inline-block; width:'+w+'px; max-width:100%';
                   }
                   $(this).wrap('<span class="imgres" style="'+s+'; "></span>');
                   pr = $(this).parent();
                   sp = $('<span style="padding-top:'+(h/w*100)+'%;">');
                   pr.prepend(sp);
               }
            });
        }
        //imgres();


        // FIXED HEADER
        /*-----------------------------------------------------------------*/

            function headerScrollUpDown() {   
                var panel = 0;
                if ($('#panel').length >0)
                    panel += $('#panel').height(); 
                if(hd.hasClass('fixe')){
                    var ah = $('<div class="afterHeader"> ');
                    hd.after(ah.height(hh));
                    var lastScrollTop = panel;
                    $(window).scroll(function(event){
                       var st = $(this).scrollTop();

                        if (st > panel) {
                           if (st > lastScrollTop){
                               $('body').removeClass('stickyUp').addClass('stickyBody stickyDown');
                           } else  {
                              $('body').removeClass('stickyDown').addClass('stickyUp');
                           }
                           lastScrollTop = st;
                        } else {
                            $('body').removeClass('stickyUp').removeClass('stickyDown').removeClass('stickyBody');
                        } 
                    });
                }
            }
                    
            function headerSingle() {   
                if ($('#panel').length >0){ p = $('#panel').height(); }else{ p = 0; }
                if(hd.hasClass('fixe')){
                    var ah = $('<div class="afterHeader"> ');
                    hd.after(ah.height(hh));
                    $(window).scroll(function() {
                        if ($(window).scrollTop() > p) $('#header').addClass('sticky');
                        else $('#header').removeClass('sticky');
                    });
                }
            }
            var headerBanner = function(){
                $window.on('scroll', function(event) {
                    event.preventDefault();
                    var mainFirstChildHeight = banner.outerHeight();
                    if ($window.scrollTop() < hh) {
                        hd.removeClass('stickyUp');
                    }
                    else if (($window.scrollTop() > 0) & ($window.scrollTop() < mainFirstChildHeight - hh )) {
                        hd.addClass('stickyUp');
                        hd.removeClass('stickyDown').removeClass('sticky');
                    }
                    else  {
                        hd.addClass('stickyDown').addClass('sticky');
                        hd.removeClass('stickyUp');
                    }

                });
            };
            if(banner.length>0){
                $('body').addClass('hasbanner');
            }
            // else {
            //     headerSingle();
            // } 

            headerSingle(); 

    



        // TOGGLECLASS
        /*-----------------------------------------------------------------*/
            $(".toggleSync").each(function () {
                $(this).click(function(){
                    var id = $(this).data('parent');
                    //$(this).toggleClass('active');
                    $('div#'+id).toggleClass('active');
                }); 
            }); 
       
            $(".toggleClass > .toggle").each(function () {
                $(this).click(function(){
                    $(this).parent().toggleClass('active');
                }); 
            }); 
            $(document).mouseup(e => {
                if (!$(".toggleClass").is(e.target) // if the target of the click isn't the container...
                && $(".toggleClass").has(e.target).length === 0) // ... nor a descendant of the container
                {
                    $(".toggleClass").removeClass('active');
                }
            });            

        // MENU MOBILE 
        /*-----------------------------------------------------------------*/

        $('.menu-btn').click(function(){
            $('body').toggleClass('showMenu'); 
        }); 

        function toggleSlideSub(li,sub) {    
            if(li.hasClass('parent-showsub')){
                sub.slideUp(300,function(){
                    li.removeClass('parent-showsub');
                });                           
            }else{
                sub.slideDown(300,function(){
                    li.addClass('parent-showsub');
                });                           
            }  
        }
        function ClickToggleSlide(span,a,li,sub) {    
            span.click(function(){
                toggleSlideSub(li,sub);
            }); li.prepend(span);
            a.click(function(e){
                e.preventDefault();
                toggleSlideSub(li,sub); 
            });
        }

        $('ul.menu-top-header ul').each(function(){
            var li = $(this).parent(),
                a = li.children('a[href="#"]'),
                btn = $('<span>',{'class':'showsubmenu icon-arrow-2 ib', text : '' });
                $(this).wrap('<div class="wrapul wrapul-custom"></div>');
                var wrapul = li.children('.wrapul');

            ClickToggleSlide(btn,a,li,wrapul);           
        })

        $('ul.menu-taxonomy ul').each(function(){
            $(this).parent().addClass('children');
        })
            
            
        var wrapmb = $('.wrap-menu-mb'),
            smb = wrapmb.data('style');
            wrapmb.find('li[class*="children"]').each(function(){
                var 
                p = $(this),
                idli = p.attr('id'),
                ul = p.children('ul'),
                a = p.children('a[href="#"]'),
                btn = $('<span>',{'class':'showsubmenu icon-arrow-3', text : '' });
                p.children('ul').children('li').children('ul').attr("data-parent",idli);
                //a.addClass('outactive').attr("data-parent",id);
                if(smb == 2){
                    btn.click(function(){
                        p.toggleClass('activesubmenu'); 
                        wrapmb.toggleClass('activesubmenu'); 
                    }); p.prepend(btn);
                    var text = p.children('a').html();
                    var head = $('<div class="menu-head"><h3 class="back"><i class="icon-arrow-3 ix"></i> '+text+'</h3></div>');

                    ul.wrap('<div class="wrapul"></div>');

                    p.children('.wrapul').prepend(head);                    
                    $('.back').click(function(){
                        $(this).parent().parent().parent().removeClass('activesubmenu');
                        wrapmb.removeClass('activesubmenu');
                    });  
                }else if(smb == 3){
                    var text = p.children('a').html();
                    var head = $('<div class="menu-head"><h3 class="back"><i class="icon-arrow-3 ix"></i> '+text+'</h3></div>');

                    id = p.attr('id');

                    ulp = ul.data('parent');
                    ul.wrap('<div id="w-'+id+'" data-parent="w-'+ulp+'"  class="wrapul"></div>');
                    var wrap = p.children('.wrapul');
                    wrap.prepend(head);  
                    

                    wrapmb.append(wrap);

                    btn.click(function(){
                        id = $(this).parent().attr('id');
                        a = p.closest(".wrapul");
                        if (a.hasClass('outactive')){
                            a.removeClass('outactive').addClass('outactive2');
                        }else{
                            a.addClass('outactive');
                        }
                        wrapmb.children('#w-'+id+'').addClass('outactive');
                    }); p.prepend(btn);
                    
             
                    $('.back').click(function(){
                        pr = $(this).parent().parent();
                        id = pr.data('parent');
                        pr.removeClass('outactive');
                        a = wrapmb.children('#'+id+'');
                        if (id=='w-undefined'){
                            $('.wrapul.main').removeClass('outactive');
                        }else{
                            a.addClass('outactive').removeClass('outactive2');
                        }                        
                        
                    });  
                } else {  
                    ClickToggleSlide(btn,a,p,ul);
                }

            });    // append - prepend - after - before


        // CLICK SCROLL
        /*-----------------------------------------------------------------*/
            // Click scroll a
          $("a.scrollspy").click(function (event) {
            event.preventDefault();
            var id  = $(this).attr('href'),
                top = $(id).offset().top;
            $('html, body').animate({
              scrollTop: $(id).offset().top - hh
              }, 1000)
          });

            // Back-top
            $(window).scroll(function() {
                if ($(this).scrollTop() > 100) {
                    $('#back-top').addClass('show');
                } else {
                    $('#back-top').removeClass('show');
                }
            });
            $('#back-top').click(function() {
                $('body,html').animate({
                    scrollTop: 0
                }, 800);
                return false;
            });

        // THEME
        /*-----------------------------------------------------------------*/

        $('.searchform .textinput').each(function(){
            var oldVal;
            $(this).bind('DOMAttrModified textInput input change keypress paste focus', function() { //keypress focus
                var val = $(this).val();
                if (val) {
                    if(val.length>=3){
                        $(this).parent('.searchform').addClass('focus');
                    }else{
                        $(this).parent('.searchform').removeClass('focus');
                    }
                }
            });
        })


        // MODAL 
        /*-----------------------------------------------------------------*/

        $(".myModal").each(function () {
            var over = $('<span class="btnModal overlay"></span>'),
                close = $('<span class="btnModal btn-close"><i class="fas fa-times"> </i></span>'),
                c = $(this).children('.container '),
                hc = c.children('.contentModal').outerHeight() + 80;            
            $(this).prepend(over);
            $(this).find('.contentModal').prepend(close);
            if($(window).outerHeight()>hc){c.addClass('middle');}
            $('body').append($(this));
        }); 
        $(".btnModal").each(function () {
            $(this).click(function(e){
                e.preventDefault();
                var id = $(this).data('modal');
                var pr = $(this).parents('.myModal');
                $('body').toggleClass('showModal');
                if(pr.length>0) {
                    pr.removeClass('active');
                    if(pr.hasClass('videoModal')){
                        pr.find('iframe').attr('src','');
                    }
                }else {
                    $('div#'+id).toggleClass('active');
                }
            }); 
        }); 


        $('.food-slider .btnModal').each(function(){
          $(this).click(function (event) {
            var id = $(this).data('id');
            $('.videoModal iframe').attr('src',id);
          });
        })
        // 
        



        // LAZYLOAD
        /*-----------------------------------------------------------------*/
            var offdefault = 50;  //BJLL.threshold;
            var BJLL_options = BJLL_options || {},
                BJLL = {
                    _ticking: !1,
                    check: function() {
                        if (!BJLL._ticking) {
                            BJLL._ticking = !0, void 0 === BJLL.threshold && (void 0 !== BJLL_options.threshold ? BJLL.threshold = parseInt(BJLL_options.threshold) : BJLL.threshold = 200);
                            var e = document.documentElement.clientHeight || body.clientHeight,
                                t = !1,
                                n = document.getElementsByClassName("lazy-hidden");
                            [].forEach.call(n, function(n, a, i) {
                                var s = n.getBoundingClientRect(),
                                    offset = parseFloat(n.getAttribute('offset'));
                                if(offset) o = 0 - offset;
                                else o = offdefault;
                                e - s.top + o > 0 && (BJLL.show(n), t = !0)
                            }), BJLL._ticking = !1, t && BJLL.check()
                        }
                    },
                    show: function(e) {
                        e.className = e.className.replace(/(?:^|\s)lazy-hidden(?!\S)/g, ""), e.addEventListener("load", function() {
                            e.className += " loaded", BJLL.customEvent(e, "lazyloaded");
                        }, !1);
                        var t = e.getAttribute("data-lazy-type");
                        e.className += ' loaded';

                        if(e.classList.contains('onepage')){

                          if(e.classList.contains('active')){
                          }else{
                            $('.onepage').removeClass('active');
                            e.classList.add("active");
                            // i = $(this).attr('id');
                            // $('.nav-tabs li').removeClass('active');                
                            // $('.nav-tabs a[href="#'+i+'"]').parent().addClass('active');
                          }
                        }         
                        if ("image" == t) null != e.getAttribute("data-lazy-srcset") && e.setAttribute("srcset", e.getAttribute("data-lazy-srcset")), null != e.getAttribute("data-lazy-sizes") && e.setAttribute("sizes", e.getAttribute("data-lazy-sizes")), e.setAttribute("src", e.getAttribute("data-lazy-src"));
                        else if ("bg" == t) {
                            var n = e.getAttribute("data-lazy-src");
                            e.style.backgroundImage = 'url(' + n + ')';
                        }
                        else if ("iframe" == t) {
                            var n = e.getAttribute("data-lazy-src"),
                                a = document.createElement("div");
                            a.innerHTML = n;
                            var i = a.firstChild;
                            e.parentNode.replaceChild(i, e);
                        }
                        else if ("mp4" == t) {
                            var n = e.getAttribute("data-lazy-src"),
                                a = '<source src="'+n+'" type="video/mp4">';
                            e.innerHTML += a;
                        }
                    },
                    customEvent: function(e, t) {
                        var n;
                        document.createEvent ? (n = document.createEvent("HTMLEvents")).initEvent(t, !0, !0) : (n = document.createEventObject()).eventType = t, n.eventName = t, document.createEvent ? e.dispatchEvent(n) : e.fireEvent("on" + n.eventType, n)
                    }
                };
            window.addEventListener("load", BJLL.check, !1), window.addEventListener("scroll", BJLL.check, !1), window.addEventListener("resize", BJLL.check, !1), document.getElementsByTagName("body").item(0).addEventListener("post-load", BJLL.check, !1);


        // RESPONSIVE
        /*-----------------------------------------------------------------*/
        // 
        $('.slider-for').slick({
            nextArrow: '<span class="nextArrow"><i class="fas fa-arrow-right"></i></span>',
            prevArrow: '<span class="prevArrow"><i class="fas fa-arrow-left"></i></span>',
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: true,
            arrows: false,
            // adaptiveHeight: true,
            asNavFor: '.slider-nav'
        });
        $('.slider-nav').slick({
            nextArrow: '<span class="nextArrow"><i class="fas fa-arrow-right"></i></span>',
            prevArrow: '<span class="prevArrow"><i class="fas fa-arrow-left"></i></span>',
            slidesToShow: 2,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            dots: false,
            focusOnSelect: true,
            infinite:true,
            responsive: [
                {
                  breakpoint: 1200,
                  settings: {
                    slidesToShow: 2,
                  }
                },
                {
                  breakpoint: 992,
                  settings: {
                    slidesToShow: 2,
                  }
                },                        
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 2,  
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 2,    
                  }
                }
              ]
        });
        // 
        
        // sent form
        $(".wpcf7").each(function () {
            $(this).on('wpcf7invalid wpcf7spam wpcf7mailsent wpcf7mailfailed', function () {  
               var form = $(this).find('form');
               if(form.hasClass('failed__')){
                    $('body').addClass('showModal');
                    $('.errorModal').addClass('active');
               }else if(form.hasClass('sent')){
                    $('body').addClass('showModal');
                    $('.successModal').addClass('active');
               }
            });
        });
        //
        ( function( $ ) {
  
            let selector = '.wpcf7 input, .wpcf7 select, .wpcf7 textarea';
            
            $( selector ).on( 'focus', function() {
               let $this = $( this ),
                   $value = $this.val(),
                   $label = $this.parent().siblings( 'label' );
              
                $label.addClass( 'has-value' );
            });
            
             $( selector ).on( 'blur', function() {
               let $this = $( this ),
                   $value = $this.val(),
                   $label = $this.parent().siblings( 'label' );
              
                if( $value === '' ) {
                    $label.removeClass( 'has-value' ); 
                }
            });
            
          })( jQuery );

    }); 

})(jQuery); 
// JAVASCRIPTs
/*----------------------------------------------------------------------------------------------------------------------------------*/
var widgetIds = [];
var cf7srLoadCallback = function() {
    var cf7srWidgets = document.querySelectorAll('.cf7sr-g-recaptcha');
    for (var i = 0; i < cf7srWidgets.length; ++i) {
        var cf7srWidget = cf7srWidgets[i];
        var widgetId = grecaptcha.render(cf7srWidget.id, {
            'sitekey' : "6LfCqD4UAAAAABCCwHC4aLhCE832huPBauYNhlgW"});
        widgetIds.push(widgetId);
    }
};
(function($) {
  $('.wpcf7').on('wpcf7invalid wpcf7mailsent invalid.wpcf7 mailsent.wpcf7', function() {
    for (var i = 0; i < widgetIds.length; i++) {
      grecaptcha.reset(widgetIds[i]);
    }
  });
})(jQuery);