jQuery(function($) {

    var GLOCK = window.GLOCK || {};

    /*==================================
    =            Sticky Nav            =
    ==================================*/
    
    GLOCK.nav = function() {
        $('.sticky-nav').waypoint('sticky');
    }
    
    /*-----  End of Sticky Nav  ------*/

    /*=======================================
    =            Parallex Scroll            =
    =======================================*/
    
    GLOCK.parallex = function() {
        $("div[data-type='vertical'], img[data-type='vertical']").each(function(){
            var $obj=$(this);
            $(window).scroll(function(){
                var y=$(window).scrollTop();
                var yhome=$obj.data("current")-(y/$obj.data("speed"));
                if($obj.data("start") != '' && $obj.data("end") != ''){
                    if(y >= $obj.data("start") && y <= $obj.data("end")){
                        $obj.css({ "top" : yhome });
                    }
                }else{
                        $obj.css({ "top" : yhome });
                }
                
            });
        });
    }
    
    /*-----  End of Parallex Scroll  ------*/

    /*=====================================
    =            Page Scroller            =
    =====================================*/
    
    GLOCK.scroller = function() {
        $('body').pageScroller({
            navigation: '#menu',
            keyboardControl: true
            // scrollOffset: -40
        });
    }
    
    /*-----  End of Page Scroller  ------*/

    /*=====================================
    =            Menu Switcher            =
    =====================================*/
    
    GLOCK.menu = function(){
        $('#menu-nav, #menu-nav-mobile').onePageNav({
            currentClass: 'current',
            changeHash: false,
            scrollSpeed: 2050,
            scrollOffset: 30,
            scrollThreshold: 0.5,
            easing: 'easeOutExpo',
            filter: ':not(.external)'
        });
    }
        
    /*-----  End of Menu Switcher  ------*/

    /*====================================
    =            Contact Form            =
    ====================================*/
    
    GLOCK.contact = function() {
        $('#submitContact').on('click', function(e) {
            e.preventDefault();

            var valid = $('#form-contact').parsley('validate');

            var spamCheck = $('#contact_business').val();
            // console.log('spamCheck: ', spamCheck);

            if(valid && spamCheck === "1") {
                console.log('in check');
                console.log($('#contact'));
                var fields = $('#form-contact').serialize();
                console.log(fields);

                $.post('/contact', fields, function(res) {
                    if(res.status === 'sent') {
                        var n = noty({text: res.html});
                        $('#email').val('');
                        $('#name').val('');
                        $('#subject').val('');
                        $('#message').val('');
                    } else {
                        var n = noty({type: 'error', text: 'Message Failed'});
                    }
                });
            }
        });
    }
    
    /*-----  End of Contact Form  ------*/
    
    
    /*=====================================
    =            Notifications            =
    =====================================*/
    
    GLOCK.notifications = function() {
        $.noty.defaults = {
            layout: 'bottomCenter',
            theme: 'defaultTheme',
            type: 'success',
            text: '',
            dismissQueue: true, // If you want to use queue feature set this true
            template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
            animation: {
                open: {height: 'toggle'},
                close: {height: 'toggle'},
                easing: 'swing',
                speed: 2000 // opening & closing animation speed
            },
            timeout: true, // delay for closing event. Set false for sticky notifications
            force: false, // adds notification to the beginning of queue when set to true
            modal: false,
            maxVisible: 5, // you can set max visible notification for dismissQueue true option
            closeWith: ['click'], // ['click', 'button', 'hover']
            callback: {
                onShow: function() {},
                afterShow: function() {},
                onClose: function() {},
                afterClose: function() {}
            },
            buttons: false // an array of buttons
        }
    }
    
    /*-----  End of Noty  -------------*/
    
    /*============================
    =            Init            =
    ============================*/
    
    $(document).ready(function() {
        GLOCK.nav();
        GLOCK.parallex();
        GLOCK.scroller();
        GLOCK.menu();
        GLOCK.notifications();
        GLOCK.contact();
    });
    
    /*-----  End of Init  ------*/    
    
});