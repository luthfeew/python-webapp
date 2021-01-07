$(document).ready(function () {
  // chat button
  const wwsWidget = {
    popup: jQuery(".wws-popup"),
    popupGradient: jQuery(".wws-gradient"),
    trigger: function () {
      if (this.popup.attr("data-wws-popup-status") === "0") {
        this.popup.slideDown();
        this.popup.attr("data-wws-popup-status", "1");
        this.popupGradient.show();
      } else {
        this.popup.slideUp();
        this.popup.attr("data-wws-popup-status", "0");
        this.popupGradient.hide();
      }
    },
    isPopupOpen: function () {
      return jQuery(this.popup).attr("data-wws-popup-status") === "1"
        ? true
        : false;
    },
    autoPopup: function (delayInSeconds) {
      if ("yes" !== sessionStorage.wwsAutoPopup) {
        if (false === this.isPopupOpen()) {
          setTimeout(function () {
            wwsWidget.trigger();
            sessionStorage.wwsAutoPopup = "yes";
          }, Number(delayInSeconds * 1000));
        }
      }
    },
    sendMessage: function (message = "", whatsappNumber = "") {
      if ("" === message || "" === whatsappNumber) {
        return false;
      }
      if (this.is_mobile.any()) {
        window.open(
          wwsObj.whatsapp_mobile_api +
            "/send?phone=" +
            whatsappNumber +
            "&text=" +
            message +
            ""
        );
      } else {
        window.open(
          wwsObj.whatsapp_desktop_api +
            "/send?phone=" +
            whatsappNumber +
            "&text=" +
            message +
            ""
        );
      }
      return true;
    },
    sendGroupInvitation: function (groupID) {
      window.open("https://chat.whatsapp.com/" + groupID);
    },
    is_mobile: {
      Android: function () {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
      },
      any: function () {
        return (
          wwsWidget.is_mobile.Android() ||
          wwsWidget.is_mobile.BlackBerry() ||
          wwsWidget.is_mobile.iOS() ||
          wwsWidget.is_mobile.Opera() ||
          wwsWidget.is_mobile.Windows()
        );
      },
    },
    logAnalytics: function (message = "N/A", number = "N/A") {
      jQuery.ajax({
        url: wwsObj.admin_url,
        type: "post",
        data: {
          action: "wws_click_analytics",
          message: message,
          number: number,
        },
      });
    },
  };

  jQuery(".wws-popup__open-btn, .wws-popup__close-btn").on("click", function (
    event
  ) {
    event.preventDefault();
    wwsWidget.trigger();
  });

  // scroll navbar effect
  var position = $(window).scrollTop();

  // should start at 0

  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll > position) {
      $("nav").removeClass("nav-show");
      $("nav").addClass("nav-hide");
    } else {
      $("nav").removeClass("nav-hide");
      $("nav").addClass("nav-show");
    }
    position = scroll;
  });

  // pop up under construct
  // $(document).ready(function () {
  //   $("#myModal").modal("show");
  // });

  // loader
  $(window).on("load", function () {
    setTimeout(function () {
      $(".loader-wrapper").fadeOut("slow");
    }, 1500);
  });

  // typed animation
  var lang = { 
    typed: [
          "Politik",
          "Ekonomi",
          "Sosial Budaya",
          "Moral",
        ]};
          if($(".forPeople").length > 0) {
    var typed = new Typed(".forPeople", {
      strings: lang.typed,
      smartBackspace: true,
      startDelay: 1500,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 1000,
      loop: true
    });  
  } 

  //srolll in animation team
  $(window).scroll(function () {
    let wScroll = $(this).scrollTop();
     if (wScroll > 3450) {
        $(".anggota").each(function (i) {
          setTimeout(function () {
            $(".anggota").eq(i).addClass("element-show");
          }, 500 * (i + 1));
        });
      } 
  });
  // aos
   AOS.init(); 
 
   
    /* Card Slider - Swiper */
	var cardSlider = new Swiper('.card-slider', {
		autoplay: {
            delay: 3000,
            disableOnInteraction: false
		},
        loop: true,
        navigation: {
			nextEl: '.swiper-button-prev',
			prevEl: '.swiper-button-next'
		}
    });
    
  // portfolio
   // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
   
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function() {
      $('.venobox').venobox();
    });
  });

 
 

});
