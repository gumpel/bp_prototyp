'use strict';
jQuery(document).ready(function(t) {
    function i(i, e, s) {
        e = e;
        i.attr({
                width: t(window).width(),
                height: e
            }),
            i.css({
                // 'top': '-' + (s * e).toFixed(2) - 200 + 'px'
                'top': '-' + e + 'px'
            })
    }

    function e(i) {
        var e = t('#' + i),
            o = e.height(),
            a = t(window).scrollTop(),
            h = e.prev(),
            //wh = t(window).height();
            wh = 800;
        if (h.is('section') && e.has('canvas')) {
            var r = h.offset().top;
           // if (a >= r && r + o >= a) {
                var c = e.offset().top - a;
                //console.log(t(window).height() - c);
                n(i.toString(), wh - c)
           // }
            
        }
    }



    function n(e, n) {
        if (t('#' + e).has('canvas') === !1) return !1;
        var o = t('#' + e + ' canvas:first'),
            a = o.get(0).getContext('2d');
        var p = t('#' + e + '> .canvas_help'),
            //wh = t(window).height();
            wh = 800;
        var spin = o.height() / wh < 1 ? o.height() / wh : 1;

        if (!p.find('div').length) {
            //p.append('<div></div>');

        }
        n = n > 100 ? n : 100;
        n = n < wh ? n : wh;
        //var p1 = p.find('div');
        //var p2 = p.next();
        //console.log(p2)
        //p1.css('background', o.attr('data-color'));
        if (i(o, n, Math.pow(spin, 5)),
            // p.height(((1 - Math.pow(spin, 5)) * n).toFixed(2)),
            //p.height(n.toFixed(2)),
            //p1.height(p2.offset().top - (o.offset().top + o.height())),
            a.clearRect(0, 0, o.width(), o.height()),
            a.beginPath(),
            a.moveTo(0, o.height()),
            a.lineTo(o.width(),
                o.height()),
            a.lineTo(o.width(), 0),
            a.lineTo(o.width(),
                t(window).height - 0.8 * n),

            a.bezierCurveTo(.9 * (wh - o.height()), 0, wh - o.height(), n, .1 * -n, o.height()),
            a.closePath(), 'undefined' != typeof o.data('image')) {
            var h = new Image;
            h.src = o.data('image');
            var r = a.createPattern(h, 'no-repeat');
            a.fillStyle = r, a.fill()
        } else 'undefined' != typeof o.data('color') && (a.fillStyle = o.data('color'), a.fill())
    }
    t(document).ready(function() {
        t.each(t('section.hascanvas'), function() {
            e(t(this).attr('id'));
        })
        t(window).on('scroll resize', function() {
            t.each(t('section.hascanvas'), function() {
                e(t(this).attr('id'));
            })
        })
    })
});

// fog generator 



$(document).ready(function() {
    //css Animation scroll
    AOS.init({
        disable: 'mobile',
        //once: true,
        ease: 'ease-in-out'
    });

    $('#toggle').click(function() {
        $(this).toggleClass('active');
        $('#overlay').toggleClass('open');
    });
    var windowWidth = $(window).width();

    // $(window).resize(function() {
    //     if (windowWidth != $(window).width()) {
    //         $('#bploader').show();
    //         location.reload();
    //         return;
    //     }
    // });

});

//Nice Scroll 
var nice = false;

$(document).ready(
    function() {
        //nice = $('html').niceScroll({ zindex: 100000, cursoropacitymin: 0.5, autohidemode: false, cursorborderradius: 0, cursorborder: '1px solid #cda54b', cursorcolor: '#cda54b', cursorwidth: 10, mousescrollstep: 80, scrollspeed: 100 });
    }
);


// gslider
$(document).ready(function() {
    gSlider();

    function gSlider() {
        var gLeft = $('#g-slider-control-left'),
            gRight = $('#g-slider-control-right'),
            gSliderNumber = $('#g-slider-images > ul > li').length,
            gActiveSlide = $('#g-slider-images > ul > li.g-image-active').index(),
            gDescription = $('#g-slider-desriptions > ul > li'),
            gImages = $('#g-slider-images > ul > li'),
            gInterval,
            sliderPoused,
            haveBeenPoused = false,
            playButton = $('#g-slider-control-play'),
            pauseButton = $('#g-slider-control-pause');

        $('#g-slider-images > ul > li').each(function() {
            $(this).addClass('g-slider-image-' + $(this).index());
            $(this).attr('g-data-index', $(this).index() + 1);
        });
        $('#g-slider-desriptions > ul > li').each(function() {
            $(this).addClass('g-slider-desription-' + $(this).index());
            $(this).attr('g-data-index', $(this).index() + 1);
        })
        gInterval = setInterval(function() {
            gNext()
        }, 5000);
        playSlider();
        gLeft.on('click', function() {
            gPrev();
            clearInterval(gInterval);
        });

        gRight.on('click', function() {
            gNext();
            clearInterval(gInterval);
        });

        pauseButton.on('click', function() {
            haveBeenPoused = false;
            pouseButtonAnimation();
            clearInterval(gInterval);
        });

        playButton.on('click', function() {
            gNext();
            playSlider();
        });

        gDescription.on('mouseover', function() {
            clearInterval(gInterval);
            pouseButtonAnimation();
        });

        gImages.on('mouseover', function() {
            clearInterval(gInterval);
            pouseButtonAnimation();
        });

        function gDescriptionHeight() {

            var height = 0;
            $('.g-slider-desriptions li').each(function() {
                $(this).removeAttr('style');
                //console.log($(this).height());
                //s$(this).width($('#g-slider-desriptions').width());
                if ($(this).height() > height) {
                    height = $(this).height();
                }
            });
            $('#g-slider-desriptions').height(height);
        }

        function playSlider() {
            clearInterval(gInterval);
            gInterval = setInterval(function() {
                gNext()
            }, 5000);
            haveBeenPoused = false;
        }

        function pouseButtonAnimation() {
            //  console.log(haveBeenPoused)
            if (!haveBeenPoused) {
                $('#g-slider-control-pouse').addClass('slider-poused')
                sliderPoused = setInterval(function() {
                    $('#g-slider-control-pouse').removeClass('slider-poused')
                }, 4000);
                haveBeenPoused = true;
            }
        }

        function gPrev() {
            gImages.eq((gActiveSlide + 1) % gSliderNumber).removeClass('g-image-next-active');
            gImages.eq((gActiveSlide - 1) % gSliderNumber).addClass('g-image-active').removeClass('g-image-next-active');
            gImages.eq(gActiveSlide).removeClass('g-image-active').addClass('g-image-next-active');
            // descrition index
            gDescription.eq((gActiveSlide - 1) % gSliderNumber).addClass('g-description-active');
            gDescription.eq(gActiveSlide).removeClass('g-description-active');
            gActiveSlide = gActiveSlide - 1 > 0 ? (gActiveSlide - 1) % gSliderNumber : (gActiveSlide + gSliderNumber - 1) % gSliderNumber;
            gSliderCount(gActiveSlide, gSliderNumber);
            //console.log(gActiveSlide)
        }

        function gNext() {
            gImages.eq((gActiveSlide + 1) % gSliderNumber).addClass('g-image-active').removeClass('g-image-next-active');
            gImages.eq((gActiveSlide + 2) % gSliderNumber).addClass('g-image-next-active');
            gImages.eq(gActiveSlide).removeClass('g-image-active');
            // descrition index
            gDescription.eq((gActiveSlide + 1) % gSliderNumber).addClass('g-description-active');
            gDescription.eq(gActiveSlide).removeClass('g-description-active');
            gActiveSlide = (gActiveSlide + 1) % gSliderNumber;
            gSliderCount(gActiveSlide, gSliderNumber);
        }

        function gSliderCount(nr, of) {
            $('#g-slider-nr').html(nr + 1);
            $('#g-slider-of').html('/0' + of);
        }

    }

});

// numbs

$(document).ready(function() {
    var bp_numbObj = {
        bp_dot_1: {
            'bp_num_box_1': {
                title: 'Web Development',
                num: 122,
                symbol: '%'
            },
            'bp_num_box_2': {
                title: 'Graphic Design',
                num: 144,
                symbol: 'h'
            },
            'bp_num_box_3': {
                title: 'JavaSript',
                num: 34,
                symbol: 'km'
            }
        },
        bp_dot_2: {
            'bp_num_box_1': {
                title: 'PHP',
                num: 89,
                symbol: '%'
            },
            'bp_num_box_2': {
                title: 'CSS',
                num: 19,
                symbol: 'h'
            },
            'bp_num_box_3': {
                title: 'HTML',
                num: 44,
                symbol: 'km'
            }
        },
        bp_dot_3: {
            'bp_num_box_1': {
                title: 'Gulp',
                num: 77,
                symbol: '%'
            },
            'bp_num_box_2': {
                title: 'Bower',
                num: 37,
                symbol: 'h'
            },
            'bp_num_box_3': {
                title: 'Json',
                num: 44,
                symbol: 'km'
            }
        },
        bp_dot_4: {
            'bp_num_box_1': {
                title: 'Sass',
                num: 65,
                symbol: '%'
            },
            'bp_num_box_2': {
                title: 'Node.js',
                num: 23,
                symbol: 'h'
            },
            'bp_num_box_3': {
                title: 'Angular',
                num: 78,
                symbol: 'km'
            }
        },
        bp_dot_5: {
            'bp_num_box_1': {
                title: 'Flux',
                num: 77,
                symbol: '%'
            },
            'bp_num_box_2': {
                title: 'React',
                num: 67,
                symbol: 'h'
            },
            'bp_num_box_3': {
                title: 'Android',
                num: 44,
                symbol: 'km'
            }
        }
    }

    var p = !1;
    var k = $('#bp_num').length ? $('#bp_num') : !1;
    if (k)
        $(window).on('scroll load', function(i) {
            //console.log(s, e);
            if (p) $(this).unbind(i);
            else {
                var s = $(this).height() + $(this).scrollTop(),
                    e = k.offset().top;
                if (s >= e) {
                    p = !0;
                    printBox('bp_dot_1');
                }
            }
        });


    $('.bp_dot').tooltip();
    $('.bp_dot').on('click', function() {
        var objKey = $(this).attr('id');
        $(this).addClass('hvr-ripple-out');
        printBox(objKey);
        //alert(objKey);
    });
    $('.bp_dot').on('mouseleave', function() {
        $(this).removeClass('hvr-ripple-out');
    });

    function printBox(key) {
        $('#bp_num_box_1 .bp_num_title').html('');
        $('#bp_num_box_2 .bp_num_title').html('');
        $('#bp_num_box_3 .bp_num_title').html('');
        // Show text
        showText('#bp_num_box_1 .bp_num_title', bp_numbObj[key].bp_num_box_1.title, 0, 30);

        showText('#bp_num_box_2 .bp_num_title', bp_numbObj[key].bp_num_box_2.title, 0, 30);

        showText('#bp_num_box_3 .bp_num_title', bp_numbObj[key].bp_num_box_3.title, 0, 30);

        showNumber('#bp_num_box_1 .bp_num_percente', bp_numbObj[key].bp_num_box_1.num, bp_numbObj[key].bp_num_box_1.symbol, 0, 15);
        // $('#bp_num_box_1 .bp_num_percente').html(bp_numbObj[key].bp_num_box_1.num + bp_numbObj[key].bp_num_box_1.symbol);
        showNumber('#bp_num_box_2 .bp_num_percente', bp_numbObj[key].bp_num_box_2.num, bp_numbObj[key].bp_num_box_2.symbol, 0, 15);
        showNumber('#bp_num_box_3 .bp_num_percente', bp_numbObj[key].bp_num_box_3.num, bp_numbObj[key].bp_num_box_3.symbol, 0, 15);

    }
    var showText = function(target, message, index, interval) {
        if (index < message.length) {
            $(target).append(message[index++]);
            setTimeout(function() {
                showText(target, message, index, interval);
            }, interval);
        }
    }
    var showNumber = function(target, number, symbol, start, interval) {
        if (start < number) {
            $(target).html(start + symbol);
            start++;
            setTimeout(function() {
                showNumber(target, number, symbol, start, interval);
            }, interval);
        }
    }
})

// bp - clients //


$(document).ready(function() {
    var bpLeft = $('#bp_client_control_left:not(.stop)'),
        bpRight = $('#bp_client_control_right:not(.stop)'),
        bpClientObj = new Object(),
        bpHelpObj = new Object(),
        bpClientNumber = $('#bp_client_list > ul > li').length,
        bpClient = $('#bp_client_list > ul > li'),
        bpIndex = 6,
        bpRotate;

    $(bpClient).each(function() {
        $(this).attr('data-index', $(this).index());
        bpHelpObj.title = $(this).find('.bp_client_title').text();
        bpHelpObj.link = $(this).find('.bp_client_link').text();
        bpHelpObj.href = $(this).find('.bp_client_link').attr('href')
        bpHelpObj.coment = $(this).find('.bp_client_coment').text();
        bpHelpObj.logoSrc = $(this).find('.bp_main_logo_con img').attr('src');
        bpClientObj[$(this).index()] = bpHelpObj;
        bpHelpObj = new Object();
        if ($(this).index() === bpClientNumber - 1) {
            printClient($('#bp_client_list > ul > li:last-child').attr('data-index'))
            bpRotate = setInterval(function() {
                bpClientRorate()
            }, 5000);
        }
    })

    function bpClientRorate() {
        $('div.bp_client_list ul').prepend($('div.bp_client_list ul li:last-child'));
        bpIndex = (bpIndex + bpClientNumber + 1) % bpClientNumber;
        printClient($('#bp_client_list > ul > li:last-child').attr('data-index'));
        $(bpLeft).addClass('stop');
        $(bpRight).addClass('stop');

        setTimeout(function() {
            $(bpLeft).removeClass('stop');
            $(bpRight).removeClass('stop');
        }, 600);
    }

    $(bpClient).on('click', function(e) {
        $(bpClient).addClass('fast');
        var rotate = 6 - $(this).index(),
            i = 0;
        clearInterval(bpRotate);
        e.preventDefault();
        for (i; i < rotate; i++) {
            setTimeout(function() {
                bpClientRorate();
            }, 200 + i * 200);
            if (i === rotate - 1) {
                $(bpClient).removeClass('fast');
                setTimeout(function() {
                    bpRotate = setInterval(function() {
                        bpClientRorate()
                    }, 5000);
                }, 7000);
            }
        }
    })


    $(bpRight).on('click', function(e) {

        if (!$(this).is('.stop')) {
            $('div.bp_client_list ul').prepend($('div.bp_client_list ul li:last-child'));
            $(this).addClass('stop');
            bpIndex = (bpIndex + bpClientNumber + 1) % bpClientNumber;
            //console.log(bpIndex);
            printClient($('#bp_client_list > ul > li:last-child').attr('data-index'));
            setTimeout(function() {
                $(bpRight).removeClass('stop');
            }, 600);
        }
    });

    $(bpLeft).on('click', function(e) {
        if (!$(this).is('.stop')) {
            $('div.bp_client_list ul').append($('div.bp_client_list ul li:first-child'));
            $(this).addClass('stop');
            bpIndex = (bpIndex + bpClientNumber - 1) % bpClientNumber;
            printClient($('#bp_client_list > ul > li:last-child').attr('data-index'));
            setTimeout(function() {
                $(bpLeft).removeClass('stop');
            }, 600);
        }
    });

    function printClient(index) {
        //console.log(index);
        $('#bp_client_nr').html(bpClientNumber - parseInt(index));
        $('#bp_client_of').html('/0' + bpClientNumber);
        $('#bp_client_title').html(bpClientObj[index].title);
        $('#bp_client_link').html(bpClientObj[index].link);
        $('#bp_client_link').attr('href', bpClientObj[index].link);
        $('#bp_client_coment').html(bpClientObj[index].coment);
        $('#bp_client_logo img').attr('src', bpClientObj[index].logoSrc);
    }
});
// jack-20
$(document).ready(function() {
    var n = !1;
    var t = $('#jack-v').length ? $('#jack-v') : !1;
    if (t)
        $(window).on('scroll load', function(i) {
            //console.log(s, e);
            if (n) $(this).unbind(i);
            else {
                var s = $(this).height() + $(this).scrollTop(),
                    e = t.offset().top;
                if (s >= e) {
                    n = !0;
                    jack20();
                }
            }
        });
    //;
});


function jack20() {
    var jformObj = {
        name: 'Jane',
        field: {
            '#jform-1': {
                html: '<div class="field" id="jform-1"><div class="jlabel">Cześć, jestem Leo. Jak masz na Imię ?</div><div class="jinput"><input type="text" name="name" id="jname" autocomplete="off"/></div><div class="jbutton" data-next="#jform-1-1"><span>Zatwierdź</span></div></div>',
                next: {
                    'jbutton': '#jform-1-1'
                },
                nextType: 'jbutton'
            },
            '#jform-1-1': {
                html: '<div class="field" id="jform-1-1"><div class="jlabel">Miło Cię poznać <span class="jname">Jan</span>. Jak mógłbym Ci pomóc ?</div><div class="jinput-radio"><input type="radio" name="jinput-radio" value="sites" data-next="#jform-sites" autofocus><label for="jinput-radio">Stworzenie strony internetowej</label></div><div class="jinput-radio"><input type="radio" name="jinput-radio" value="position" data-next="#jform-position" /><label for="jinput-radio">Pozycjonowanie</label></div><div class="jinput-radio"><input type="radio" name="jinput-radio" value="diffrent" data-next="#jform-diffrent" /><label for="jinput-radio">Inne</label></div><div class="jbutton-centred"><div class="jbutton"><span>Zatwierdź</span></div></div></div>',
                next: {
                    'sites': '#jform-sites',
                    'position': '#jform-position',
                    'diffrent': '#jform-diffrent'
                },
                nextType: 'jinput-radio'
            },
            '#jform-sites': {
                html: '<div class="field" id="jform-sites"><div class="jlabel">Pomóż mi proszę opisując swój pomysł. Możesz także załączyć plik.</div><div class="jinput-textarea"><textarea name="comment"form="jform" cols="30" rows="5"></textarea></div><div class="jinput-file"><input type="file" name="pic"></div><div class="jbutton-centred"><div class="jbutton" data-next="#jform-sites-1"><span>Zatwierdź</span></div></div></div>',
                next: {
                    'jbutton': '#jform-sites-1'
                },
                nextType: 'jbutton'
            },
            '#jform-sites-1': {
                html: '<div class="field" id="jform-sites-1"><div class="jlabel">Zaraz zacznę zastanawiać się nad wszystkim co napisałeś. Zostaw mi proszę do siebie numer telefonu i  e-mail.</div><div class="jinput"><input type="email" name="email" placeholder="email" autocomplete="off" /></div><div class="jinput"><input type="tel" name="tel" placeholder="telefon" autocomplete="off" /></div><div class="jbutton" data-next="#jform-end"><span>Zatwierdź</span></div></div>',
                next: {
                    'jbutton': '#jform-end'
                },
                nextType: 'jbutton'
            },
            '#jform-position': {
                html: '<div class="field" id="jform-position"><div class="jlabel">Pozycjonowanie dotyczy twojej istniejącej strony?</div><div class="jinput-radio"><input type="radio" name="jinput-radio" value="tak" data-next="#jform-position-1"/><label for="jinput-radio">Tak</label></div><div class="jinput-radio"><input type="radio" name="jinput-radio" value="nie" data-next="#jform-position-2"/><label for="jinput-radio">Nie</label></div></div>',
                next: {
                    'tak': '#jform-position-1',
                    'nie': '#jform-position-2'
                },
                nextType: 'jinput-radio'
            },
            '#jform-position-1': {
                html: '<div class="field" id="jform-position-1"><div class="jlabel">Podaj mi adres strony / domeny:</div><div class="jinput"><input type="text" name="name"  autocomplete="off"/></div><div class="jbutton" data-next="#jform-position-2"><span>Zatwierdź</span></div></div>',
                next: {
                    'jbutton': '#jform-position-2'
                },
                nextType: 'jbutton'
            },
            '#jform-position-2': {
                html: '<div class="field" id="jform-position-2"><div class="jlabel">Czy masz słowa kluczowe na jakie chcesz pozycjonować ?  </div><div class="jinput-radio"><input type="radio" name="jinput-radio" value="tak" data-next="#jform-position-2-1"/><label for="jinput-radio">Tak</label></div><div class="jinput-radio"><label for="jinput-radio">Nie</label><input type="radio" name="jinput-radio" value="nie" data-next="#jform-position-2-2"/></div></div>',
                next: {
                    'tak': '#jform-position-2-1',
                    'nie': '#jform-position-2-2'
                },
                nextType: 'jinput-radio'
            },
            '#jform-position-2-1': {
                html: '<div class="field" id="jform-position-2-1"><div class="jlabel">Wymień je proszę:</div><div class="jinput"><input type="text" name="name" autocomplete="off" /></div><div class="jbutton" data-next="#jform-position-2-1-2"><span>Zatwierdź</span></div></div>',
                next: {
                    'jbutton': '#jform-position-2-1-2'
                },
                nextType: 'jbutton'
            },
            '#jform-position-2-1-2': {
                html: '<div class="field" id="jform-position-2-1-2"><div class="jlabel">Zostaw mi proszę do siebie numer telefonu i  e-mail.</div><div class="jinput"><input type="email" name="email" placeholder="email" autocomplete="off" /></div><div class="jinput"><input type="tel" name="tel" placeholder="telefon" autocomplete="off" /></div><div class="jbutton" data-next="#jform-end"><span>Zatwierdź</span></div></div>',
                next: {
                    'jbutton': '#jform-end'
                },
                nextType: 'jbutton'
            },
            '#jform-position-2-2': {
                html: '<div class="field" id="jform-position-2-2"><div class="jlabel">Zostaw mi proszę do siebie numer telefonu i  e-mail.</div><div class="jinput"><input type="email" name="email" placeholder="email" autocomplete="off" /></div><div class="jinput"><input type="tel" name="tel" placeholder="telefon" autocomplete="off" /></div><div class="jbutton" data-next="#jform-end"><span>Zatwierdź</span></div></div>',
                next: {
                    'jbutton': '#jform-end'
                },
                nextType: 'jbutton'
            },
            '#jform-diffrent': {
                html: '<div class="field" id="jform-diffrent"><div class="jlabel">Możesz teraz napisać cokolwiek o swoim pomyśle ?</div><div class="jinput-radio"><input type="radio" name="jinput-radio" value="tak"data-next="#jform-diffrent-1"/><label for="jinput-radio">Tak</label></div><div class="jinput-radio"><input type="radio" name="jinput-radio" value="nie"data-next="jform-diffrent-2"/><label for="jinput-radio">Nie</label></div></div>',
                next: {
                    'tak': '#jform-diffrent-1',
                    'nie': '#jform-diffrent-2'
                },
                nextType: 'jinput-radio'
            },
            '#jform-diffrent-1': {
                html: '<div class="field" id="jform-diffrent-1"><div class="jlabel">Więc jak mógłbym Ci pomóc ? Możesz teraz napisać cokolwiek ?</div><div class="jinput-textarea"><textarea name="comment" form="jform" cols="30" rows="5"></textarea></div><div class="jbutton-centred"><div class="jbutton" data-next="#jform-diffrent-1-1"><span>Zatwierdź</span></div></div></div>',
                next: {
                    'jbutton': '#jform-diffrent-1-1'
                },
                nextType: 'jbutton'
            },
            '#jform-diffrent-1-1': {
                html: '<div class="field" id="jform-diffrent-1-1"><div class="jlabel">Zostaw mi proszę do siebie numer telefonu i  e-mail.</div><div class="jinput"><input type="email" name="email" placeholder="email" autocomplete="off" /></div><div class="jinput"><input type="tel" name="tel" placeholder="telefon" autocomplete="off" /></div><div class="jbutton" data-next="#jform-end"><span>Zatwierdź</span></div></div>',
                next: {
                    'jbutton': '#jform-end'
                },
                nextType: 'jbutton'
            },
            '#jform-diffrent-2': {
                html: '<div class="field" id="jform-diffrent-2"><div class="jlabel">Zostaw mi proszę do siebie numer telefonu i  e-mail.</div><div class="jinput"><input type="email" name="email" placeholder="email" autocomplete="off" /></div><div class="jinput"><input type="tel" name="tel" placeholder="telefon" autocomplete="off" /></div><div class="jbutton" data-next="#jform-end"><span>Zatwierdź</span></div></div>',
                next: {
                    'jbutton': '#jform-end'
                },
                nextType: 'jbutton'
            },
            '#jform-end': {
                html: '<div class="field" id="jform-end"><div class="jlabel">Dziękuję za rozmowę, do usłyszenia.</div></div>'
            }
        }
    }
    jtimer();

    function jtimer() {
        var hours = 0,
            minuts = 0,
            sec = 0,
            dHours, dMinuts, dSec;

        setInterval(function() {
            sec++;
            if (sec === 60) {
                minuts++;
                sec = 0;
            }

            if (minuts == 60) {
                hours++;
                minuts = 0;
            }

            dHours = hours < 10 ? '0' + hours : hours;
            dMinuts = minuts < 10 ? '0' + minuts : minuts;
            dSec = sec < 10 ? '0' + sec : sec;
            $('#jtimer').text(dHours + ':' + dMinuts + ':' + dSec);

        }, 1000)
    }

    var current = '#jform-1',
        pathArr = [current],
        button,
        clickedPrev = false;

    $('#jform').html('');
    mapCurrent(current);

    function mapCurrent(current) {
        //console.log(pathArr);
        var dataNext = dataNext(current);
        $('#jform').append(jformObj.field[current].html);
        if (jformObj.field[current].html.indexOf('jname') !== -1) {
            $(current).find('.jname').append(jformObj.name);
        }

        // Wybór jednego z trzech
        if ($(current).find('.jinput-radio').length === 3) {
            $(current + ' .jinput-radio label').on('click', function() {
                $(this).siblings().prop('checked', true);
                $(current + ' .jbutton').addClass('activate');
                dataNext = jformObj.field[current].next[$(this).siblings().prop('checked', true).val()];
                //  console.log(dataNext)
            })
        }
        if ($(current).find('.jinput-radio').length === 2) {
            $(current + ' .jinput-radio label').on('click', function() {
                $(this).siblings().prop('checked', true);
                dataNext = jformObj.field[current].next[$(this).siblings().prop('checked', true).val()];
                //console.log(dataNext);
                showNext(dataNext);
            })
        }

        $('#jform .jname').html(jformObj.name);
        $('#jform').on('keyup keypress', function(e) {
            var keyCode = e.keyCode || e.which;
            if (keyCode === 13) {

                if ($('.jack-v .jform .field .jack-v .jform .field .jbutton.activate').length != -1) {
                    $(button).click();
                }
                e.preventDefault();
                return false;
            }
        });
        button = $(current).find('div.jbutton').length > 0 ? $(current).find('div.jbutton') : $(current).find('div.jbutton');

        $(button).on('click', function() {
            //console.log(dataNext);
            if (dataNext === '#jform-end') {
                $.ajax({
                    url: 'mailer.php',
                    type: 'post',
                    data: $('#jform').serialize(),
                    success: function(d) {
                        //alert(d);
                    }
                });
            }
            showNext(dataNext);
            $(this).unbind('click');
            $(this).parent().parent().find('.jinput-radio').unbind('click');
            if (current === '#jform-1') {

            };
        });




        function dataNext(current) {
            if (jformObj.field[current].nextType === 'jbutton') {
                return jformObj.field[current].next['jbutton']
            }
        }

        if (current === '#jform-1') {

            //$(current + ' .jinput input').focus();
            $(current + ' .jinput input').on('change keyup keydown keypress', function() {
                $(button).addClass('activate');
                jformObj.name = $(this).val();
            });
        }
        if (current !== '#jform-1' && current !== '#jform-sites' && jformObj.field[current].nextType === 'jbutton') {
            $(button).addClass('activate');
        }
        if (current === '#jform-sites') {
            $(current + ' textarea').on('input propertychange', function() {
                $(this).parent().siblings('.jbutton-centred').find('div.jbutton').addClass('activate');
            });
        }
    }

    function showNext(e) {
        var i;
        $(current).addClass('stop')
        setTimeout(function() {
            $(pathArr[pathArr.length - 2]).removeClass('stop');
            current = e;
        }, 50)
        current = e;
        pathArr.push(e);
        mapCurrent(e);
        $('#jform').css('margin-top', -$('#jform').height() + $('#jform .field:last-child').height());
    }
};
// Zasob wiedzy;

// O nas;

$(document).ready(function() {
    if ($('#main_page').length && $(window).width() >= 992) {
        var wcontroller = new ScrollMagic.Controller({
            globalSceneOptions: {
                //duration: 200 wwd_trigger1
            }
        });
        $(window).resize(function() {

        });
        var trigger1 = new ScrollMagic.Scene({
                triggerElement: '#wwd_trigger1',
                duration: 900,
                offset: -100
            })
            //.setTween("#wwdh2",0.5,{scale:2.5})
            //.addIndicators() // add indicators (requires plugin)           
            .on('progress', function(e) {
                if ($(window).width() >= 992) {
                    // $('#wwdh2').css({ 'transform': 'translate3d(0px, ' + (-e.progress.toFixed(2) * 300) + 'px, 0px)' })
                    // $('#wwd_slide').css({ 'transform': 'translate3d(0px, ' + (200 - e.progress.toFixed(2) * 600) + 'px, 0px)' })
                    // $('#wwb_button').css({ 'transform': 'translate3d(0px, ' + (400 - e.progress.toFixed(2) * 1000) + 'px, 0px)' })
                    $('#wwdh2').css({ 'transform': 'translateY(' + (-e.progress.toFixed(2) * 300) + 'px)' });
                    //console.log((-e.progress.toFixed(2) * 300))
                    $('#wwd_slide').css({ 'transform': 'translateY(' + (200 - e.progress.toFixed(2) * 600) + 'px)' });
                    $('#wwb_button').css({ 'transform': 'translateY(' + (400 - e.progress.toFixed(2) * 1000) + 'px)' });
                } else {
                    $('#wwdh2,#wwd_slide,#wwb_button ').attr('style', '');
                }
            })
            .addTo(wcontroller);



        var trigger2 = new ScrollMagic.Scene({
                triggerElement: '#baner_s',
                duration: $('#baner_s').height(),
                offset: $(window).height() * .5
            })
            //.addIndicators()
            .setClassToggle('#mb-tittle', 'transition-reset')
            .setClassToggle('#mb-slider-count', 'transition-reset')
            .addTo(wcontroller)
            .on('progress', function(e) {
                $('#mb-tittle, #mb-slider-count').css({ 'transform': 'translate3d(0px, ' + (-e.progress.toFixed(2) * $('#baner_s').height()) + 'px, 0px)' })
            });

        var gsliderC = '#g-slider > .showen';
        //console.log(gsliderC);
        var trigger3 = new ScrollMagic.Scene({
                triggerElement: '#canvas2',
                offset: -0.3 * $('#canvas2').height(),
                duration: $('#canvas2').height()
            })
            //.addIndicators()
            .addTo(wcontroller)
            .on('progress', function(e) {
                if ($(window).width() >= 992) {
                    var prog = .3 * (-$('#canvas2').height() + ($('#canvas2').height() * e.progress));
                    //$(gsliderC).css({ 'transform': 'translate3d(0px,' +  prog + 'px,0px)' })
                    $(gsliderC).css({ 'transform': 'translateY(' + prog + 'px)' })
                    if (e.progress.toFixed(2) < 0.15) $(gsliderC).hide();
                    else $(gsliderC).show();
                    if (e.progress.toFixed(2) < 0.16) $(gsliderC).css({ 'opacity': '0' });
                    else $(gsliderC).css({ 'opacity': '1' }).show();
                } else {
                    //$(gsliderC).css({ 'transform': 'translate3d(0px,0px,0px)' });
                    $(gsliderC).css({ 'transform': 'translateY(0px)' });
                    $(gsliderC).css({ 'opacity': '1' });
                }
            })
            .on('enter', function() {

            })

        var canvas3h = $('#canvas3').height();
        var trigger4 = new ScrollMagic.Scene({
                triggerElement: '#canvas3',
                offset: -.4 * $('#canvas3').height(),
                duration: canvas3h
            })
            //.addIndicators()
            .addTo(wcontroller)
            .on('progress', function(e) {
                var prog = .3 * (-$('#canvas3').height() + ($('#canvas3').height() * e.progress));

                prog = prog < 0 ? prog : 0;
                if ($(window).width() >= 992) {
                    //$('#bp_technology > .container').css({ 'transform': 'translate3d(0px,' + prog + 'px, 0px)' });

                    if (e.progress.toFixed(2) < 0.15) $('#bp_technology > .container').css({ 'opacity': '0' });
                    else {
                        $('#bp_technology > .container').css({ 'opacity': '1' });
                        $('#bp_technology > .container').css({ 'transform': 'translateY(' + prog + 'px)' });
                    }
                } else {
                    //$('#bp_technology > .container').css({ 'transform': 'translate3d(0px,0px,0px)' });
                    $('#bp_technology > .container').css({ 'transform': 'translateY(0px)' });
                    $('#bp_technology > .container').css({ 'opacity': '1' });

                }

            })
            .on('enter', function(e) {
                $('#bp_technology').addClass('realative_mod');
            })
            .on('leave', function(e) {
                $('#bp_technology').removeClass('realative_mod');
            })

        var jackTrigger = new ScrollMagic.Scene({
                triggerElement: '#jack-v',
                duration: $('#jack-v').height()
            })
            //.addIndicators()
            .addTo(wcontroller)
            .on('enter', function(e) {
                $('#jform').fadeIn(400);
                $('input#jname').focus();
            })
            .on('leave', function(e) {
                $('#jform').fadeOut(400)
            })
    }

    if ($('#aboutpath').length) {
        $('#pathline').height($('#aboutpath').height() - $('#aboutpath .row:last-child').height());
        $('#pathline').css('top', $('#aboutpath .row:first-child').height() / 2 - 11);
        var pathTop = -6;
        $('.pathdot').each(function() {
            $(this).css('top', pathTop);
            var hStart = $('#aboutpath .row:first-child').height() / 2 - 11;
            pathTop += $('#abouthpath_inner .row').eq($(this).index()).height() + 1;
            //console.log(pathTop);
        })
        var controller = new ScrollMagic.Controller({
            globalSceneOptions: {
                //duration: 200
            }
        });

        var proggres = new ScrollMagic.Scene({
                triggerElement: '#pathline',
                duration: $('#pathline').height()
            })
            .setClassToggle('#pathdot_1', 'hvr-ripple-out-path')
            .addTo(controller).on('progress', function(e) {
                $('#progress').height((e.progress * 100).toFixed(1) + '%')
            })

        var trigger1 = new ScrollMagic.Scene({
                triggerElement: '#trigger1',
                duration: 300
            })
            .setClassToggle('#pathdot_1', 'hvr-ripple-out-path')
            //.addIndicators() // add indicators (requires plugin)
            .addTo(controller);

        new ScrollMagic.Scene({
                triggerElement: '#trigger2'
            })
            .setClassToggle('#pathdot_2', 'hvr-ripple-out-path') // add class toggle
            //.addIndicators() // add indicators (requires plugin)
            .addTo(controller);
        new ScrollMagic.Scene({
                triggerElement: '#trigger3'
            })
            .setClassToggle('#pathdot_3', 'hvr-ripple-out-path') // add class toggle
            //.addIndicators() // add indicators (requires plugin)
            .addTo(controller);
        new ScrollMagic.Scene({
                triggerElement: '#trigger4'
            })
            .setClassToggle('#pathdot_4', 'hvr-ripple-out-path') // add class toggle
            //.addIndicators() // add indicators (requires plugin)
            .addTo(controller);
        new ScrollMagic.Scene({
                triggerElement: '#trigger5'
            })
            .setClassToggle('#pathdot_5', 'hvr-ripple-out-path') // add class toggle
            //.addIndicators() // add indicators (requires plugin)
            .addTo(controller);
        new ScrollMagic.Scene({
                triggerElement: '#trigger5'
            })
            .setClassToggle('#pathdot_5', 'hvr-ripple-out-path') // add class toggle
            //.addIndicators() // add indicators (requires plugin)
            .addTo(controller);
        new ScrollMagic.Scene({
                triggerElement: '#trigger6'
            })
            .setClassToggle('#pathdot_6', 'hvr-ripple-out-path') // add class toggle
            //.addIndicators() // add indicators (requires plugin)
            .addTo(controller);
        new ScrollMagic.Scene({
                triggerElement: '#trigger7'
            })
            .setClassToggle('#pathdot_7', 'hvr-ripple-out-path') // add class toggle
            //.addIndicators() // add indicators (requires plugin)
            .addTo(controller);
    }
});

// uslugi

var sObj = [];
var hObj = {};
$('.s_details').each(function() {
    hObj.type = $(this).attr('data-type');
    hObj.html = $(this).parent().html();
    sObj.push(hObj)
    hObj = {};
})



// $(document).ready(function() {
//     if (window.addEventListener) window.addEventListener('DOMMouseScroll', wheel, false);
//     window.onmousewheel = document.onmousewheel = wheel;
//     var scrollCanPass = true;

//     function wheel(event) {
//         if (scrollCanPass) {
//             var delta = 0;
//             if (event.wheelDelta) delta = event.wheelDelta / Math.abs(event.wheelDelta) * 120 ;
//             else if (event.detail) delta = -event.detail / Math.abs(event.detail) * 3;

//             console.log(scrollCanPass);

//             handle(delta);
//             scrollCanPass = false;
//             setTimeout(function() {
//                 scrollCanPass = true;
//             }, 300)
//         }
//         event.preventDefault();
//         event.returnValue = false;
//     }

//     function handle(delta) {
//         var time = 500;
//         var distance = 100;
//         //console.log(delta)
//         $('html, body').stop().animate({
//             scrollTop: $(window).scrollTop() - (distance * delta)
//         }, time);
//     }
// })


// if (window.location.href.indexOf('localhost') !== -1) {
// $('body').append('<div id="log"><div id="log1"></div><div id="log2"></div><div id="log3"></div><div id="log4"></div></div>')

// $( document ).on( "mousemove scroll load", function( event ) {
//   var ws = $(window).scrollTop(),
//       wh = $(window).height(),
//       sot,sh,sid,cSection ='dupa';



//   $( "#log1" ).text( "pageX: " + event.pageX + ", pageY: " + event.pageY );
//   $('#log2').text('');
//   $('section').each(function(){
//     sot = $(this).offset().top.toFixed(2);
//     sh =  $(this).height().toFixed(2);
//     sid =  $(this).attr('id');

//   if ( sot > ws && sot < ws + wh ) {
//       cSection = sid;
//   }  


//    $('#log2').append('<span id=o' + sid + '>' + sid.substring(0,7) + ' offset().top: ' + sot + '<br>');
//    $('#log2').append('<span id=h' + sid + '>' + sid.substring(0,7) + ' height: ' + sh + '<br>');
//    $('#log3').text(cSection);

//   });
//    $('#log4').text('');
//    $('#log4').append('$(window).scrollTop() : '+ ws +'<br>')
//    $('#log4').append('$(window).height() : '+ wh)
// });
// }


/* kontakt */

$(document).ready(function() {

    if ($('#map').length) {
        $('#button-contact').hover(function() {
                $('#planet_wrap').addClass('active')
            },
            function() {
                $('#planet_wrap').removeClass('active')
            })
        $('#button-contact').on('click', function() {
            $('.contact-form-overlayer').fadeIn(330);
            $('h1').hide();
            $('body').css({ 'overflow': 'hidden' })
        });
        $('#close_contact').on('click', function() {
            $('.contact-form-overlayer').fadeOut(330);
            $('h1').show();
            $('body').attr('style', '');
        })

        $('#contact-form button').on('click', function(e) {
            //e.preventDefault();
            $.ajax({
                url: 'mailer.php',
                type: 'post',
                data: $('#jform').serialize(),
                success: function(d) {
                    $('.contact-form textarea').after('<div style="color:green">dziękujemy wiadomość została wysłana</div>');
                    $('#contact-form button').unbind('click');
                },
                error: function() {
                    $('.contact-form textarea').after('<div style="color:red">Nie udało się wysłać wiadomości</div>');
                    $('#contact-form button').unbind('click');
                }
            });
        })


        var bpmap = new GMaps({
            div: '#map',
            zoom: 12,
            streetViewControl: false,
            scrollwheel: false,
            navigationControl: false,
            mapTypeControl: false,
            scaleControl: false,
            draggable: false,
            zoomControl: false,
            lat: 53.435196,
            lng: 14.540546,
            styles: [{ 'featureType': 'water', 'elementType': 'geometry', 'stylers': [{ 'color': '#202021' }] }, { 'featureType': 'landscape', 'elementType': 'geometry', 'stylers': [{ 'color': '#242425' }] }, { 'featureType': 'road', 'elementType': 'geometry', 'stylers': [{ 'color': '#202021' }, { 'lightness': -0 }] }, { 'featureType': 'poi', 'elementType': 'geometry', 'stylers': [{ 'color': '#202021' }] }, { 'featureType': 'transit', 'elementType': 'geometry', 'stylers': [{ 'color': '#202021' }] }, { 'elementType': 'labels.text.stroke', 'stylers': [{ 'visibility': 'on' }, { 'color': '#3e606f' }, { 'weight': 2 }, { 'gamma': 0.84 }] }, { 'elementType': 'labels.text.fill', 'stylers': [{ 'color': '#ffffff' }] }, { 'featureType': 'administrative', 'elementType': 'geometry', 'stylers': [{ 'weight': 0.6 }, { 'color': '#1a3541' }] }, { 'elementType': 'labels.icon', 'stylers': [{ 'visibility': 'off' }] }, { 'featureType': 'poi.park', 'elementType': 'geometry', 'stylers': [{ 'color': '#242425' }] }]
        });

        var markericon = 'images/logo_top.png',
            szczecin = {
                lat: 53.435196,
                lng: 14.540546,
                animation: google.maps.Animation.DROP,
                icon: markericon,
                title: 'Biznesport.pl Szczecin ul.Niedziałkowskiego 26A',
                infoWindow: {
                    content: '<h3>Biznesport.pl</h3><br>Szczecin<br> ul.Niedziałkowskiego 26A<br><a href="tel:+48888520888">+48 888 520 888</a><br><a href="mailto:contact@biznesport.pl">contact@biznesport.pl</a>'
                }
            },
            warszawa = {
                lat: 52.243171,
                lng: 21.084914,
                icon: markericon,
                title: 'Biznesport.pl Warszawa Al. Stanów Zjednoczonych 72',
                infoWindow: {
                    content: '<h3>Biznesport.pl</h3><br>Warszawa<br>Al. Stanów Zjednoczonych 72<br><a href="tel:+48888520888">+48 888 520 888</a><br><a href="mailto:contact@biznesport.pl">contact@biznesport.pl</a>'
                }
            },
            mszczecin = bpmap.addMarker(szczecin),
            mwarszawa = bpmap.addMarker(warszawa);

        $('#mwarszawa').on('click', function() {
            bpmap
                .setCenter(warszawa.lat, warszawa.lng);
            bpmap
                .hideInfoWindows();
            mwarszawa.setAnimation(google.maps.Animation.DROP)
        });
        $('#mszczecin').on('click', function() {
            bpmap
                .setCenter(szczecin.lat, szczecin.lng);
            bpmap
                .hideInfoWindows();
            mszczecin.setAnimation(google.maps.Animation.DROP)
        })

    }

});

$(document).ready(function() {
    $('#bploader').fadeOut('fast', function() {
        $('#bploader').hide();
    });
});

//Portfolio 

$(document).ready(function() {
    if ($('#portfoliogrid').length) {
        //alert('obrazki wgrane 4');
        var $gridp = $('#portfoliogrid');
        $gridp.imagesLoaded(function() {
        $gridp.isotope({
            // options
            itemSelector: '.grid-item',
            masonry: {
                columnWidth: '.grid-sizer',
                percentPosition: true,
            }
        })
        });


        // $grid.isotope({ filter: '.portale' });
        $('.portfolioselect').on('changed.bs.select', function() {            
            $gridp.isotope({ filter: '.' + $('.portfolioselect').selectpicker('val') });
        });
    }
    if ($('.servises-detail').length) {
        var $grid = $('.servises-detail').isotope({
            // options
            itemSelector: '.grid-item',
            masonry: {
                columnWidth: '.grid-sizer',
                percentPosition: true,
            }
        }).imagesLoaded(function() {
            // trigger again after images have loaded
            $grid.isotope('reloadItems');
        });
        $(window).on('load',function() {
            // trigger again after everything has loaded
            $grid.isotope('reloadItems');
        });

        // $grid.isotope({ filter: '.portale' });
        $('.servies_chosen').on('click', function() {
            //console.log($(this).attr('data-pick'));
            $grid.isotope({ filter: $(this).attr('data-pick') });
        });
    }

})

$(document).ready(function() {
    if ($('body#portfolio').length) {
        $('.grid-item[data-href]').on('click', function() {
            document.location.href = $(this).attr('data-href');
        })
    }
})

//# sourceMappingURL=main.js.map
