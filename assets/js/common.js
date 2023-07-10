$(function () {
    $(document).on('click', 'a[href="#"]', function (e) {
        e.preventDefault();
    });

    AOS.init({
        duration: 650,
        once: true
    });

    const svgPath = document.querySelectorAll('#svg path');

    const svgText = anime({
        targets: svgPath,
        loop: false,
        direction: 'alternate',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 2500,
        delay: (el, i) => {
            return i * 500;
        }
    });

    // INTRO
    setTimeout(function () {
        scrollAble();
    }, 2300);

    // HEADER MENU-BTN
    $('.menu__btn').on('click', function () {
        let menuOn = $('.menu__list').hasClass('-active');
        $('.menu__btn, .menu__list').toggleClass('-active');

        if (!menuOn) {
            scrollDisable();
        } else {
            scrollAble();
        }
    });

    $('.menu__item').on('click', function () {
        $('.menu__btn, .menu__list').removeClass('-active');
        scrollAble();
    });

    // POPUP BUTTON, IMAGE
    let popProject = $('.popup__project-btn button');
    let popProjectImg = $('.popup__project-img img');

    $('.project__tab').on('click', function () {
        let projectData = $(this).data('project');

        $('.project__list').removeClass('on');
        $('#' + projectData).addClass('on');

        $('.project__tab').removeClass('on');
        $(this).addClass('on');
    });

    $('.project__btn .button').on('click', function () {
        $('#popup').addClass('-active');
        scrollDisable();

        // 프로젝트 팝업 내용 변경
        let projectName = $(this).data('project');
        popProjectImg.attr('src', './assets/images/project/pc/' + projectName + '.png');

        // -- HC
        if (projectName == 'hc') {
            $('.popup__project-desc').html(`고객사 요청으로 라이브가 일시 중단되었습니다.`);
            $('.popup__lang').text('언어 : 국/영');
            $('.popup__project-link').find('a').text('현재 준비 중').attr('href', '');
        }

        // -- KOF
        if (projectName == 'kof') {
            $('.popup__project-desc').html(`현재 라이브 중인 사이트에서는 사전예약 종료로 인해 사전예약 영역은 숨김처리 되었습니다.`);
            $('.popup__lang').text('언어 : 국/영/일/번체');
            $('.popup__project-link').find('a').text('https://kofsurvivalcity.joycity.com/ko').attr('href', 'https://kofsurvivalcity.joycity.com/ko');
        }
        // -- DS
        else if (projectName == 'ds') {
            $('.popup__project-desc').html(
                `기존 브랜딩페이지 리뉴얼 진행 (8/17 라이브 예정)<br />
                - 사전예약 영역 추가 및 미디어 컨텐츠 영역 리뉴얼 (미디어/아트워크/월페이퍼/사운드트랙)<br />
                - 전체적인 디자인 변경`
            );
            $('.popup__lang').text('언어 : 국/영/일/번체');
            $('.popup__project-link').find('a').text('https://dragon.ndream.com').attr('href', 'https://dragon.ndream.com');
        }
        // -- GBCC BRANDING
        else if (projectName == 'gbcc') {
            $('.popup__project-desc').html(`국내 IP는 접근이 제한되어 VPN 우회하여 접근 가능한 페이지 입니다.`);
            $('.popup__lang').text('언어 : 영/일/간체/번체/독/프/러/스페인/포르투칼/인도네이사/태국/아랍');
            $('.popup__project-link').find('a').text('http://cryptoconflict.joycity.com/en').attr('href', 'http://cryptoconflict.joycity.com/en');
        }
        // -- GBCC TECH
        else if (projectName == 'gbccTech') {
            $('.popup__project-desc').html(`
            국내 IP는 접근이 제한되어 VPN 우회하여 접근 가능한 페이지 입니다.<br />
            - 스테이킹 페이지 작업 (현재 라이브 준비중)`);
            $('.popup__lang').text('언어 : 영/일/간체/번체/독/프/러/스페인/포르투칼/인도네이사/태국/아랍');
            $('.popup__project-link').find('a').text('https://milico.joycity.com/en').attr('href', 'https://milico.joycity.com/en');
        }
        // -- JOY APPSTORE
        else if (projectName == 'joyApp') {
            $('.popup__project-desc').html(`
            라이브 준비중<br />
            - 메인, 결제정보, 결제완료, 구매내역 페이지 제작`);
            $('.popup__lang').text('언어 : 국문');
            $('.popup__project-link').find('a').text('도메인 준비 중').attr('href', '#');
            $('.popup__project-btn').after(`
            <div class="popup__project-tab" data-color="basic">
                <a href="#" class="popup__project-page on" data-page="joyApp">메인</a>
                <a href="#" class="popup__project-page" data-page="joyInfo">결제정보</a>
                <a href="#" class="popup__project-page" data-page="joyCom">결제완료</a>
                <a href="#" class="popup__project-page" data-page="joyPur">구매내역</a>
            </div>
            `);
        }
    });

    $('.popup__close').on('click', function () {
        $('#popup').removeClass('-active');
        popProjectImg.attr('src', '');
        popProject.removeClass('on');
        popProject.eq(0).addClass('on');

        $('.popup__project-tab').remove();
        scrollAble();
    });

    $('.popup__project-btn .button').on('click', function () {
        let projectMq = $(this).data('mq');

        $('.popup__project-btn .button').removeClass('on');
        $(this).addClass('on');

        $('.popup__project-img, .popup__project-page').attr('data-mq', projectMq);

        if (projectMq == 'mo') {
            popProjectImg.attr('src', popProjectImg.attr('src').replace('pc', 'mo'));
        } else {
            popProjectImg.attr('src', popProjectImg.attr('src').replace('mo', 'pc'));
        }

        // console.log(projectMq);
    });

    // 동적으로 생성된 요소 클릭 이벤트
    $(document).on('click', '.popup__project-page', function (e) {
        let pageData = $(this).data('page');
        let imgData = $('.popup__project-img').attr('data-mq');

        popProjectImg.attr('src', './assets/images/project/' + imgData + '/' + pageData + '.png');

        $('.popup__project-page').removeClass('on');
        $(this).addClass('on');

        // console.log(pageData, imgData);
    });
});

// SCROLLABLE FUNCTION
function scrollAble() {
    $('body').removeClass('-noneScroll').off('scroll touchmove mousewheel');
}
function scrollDisable() {
    $('body')
        .addClass('-noneScroll')
        .on('scroll touchmove mousewheel', function (e) {
            e.preventDefault();
        });
}
