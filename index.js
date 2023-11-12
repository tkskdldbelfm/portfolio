// 페이지가 로드될 때 실행
window.addEventListener("load", () => {
    // 헤더 엘리먼트 가져오기
    const header = document.querySelector("nav");

    // 이전 스크롤 위치 저장
    let prevScrollPos = window.pageYOffset;

    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", () => {
        // 현재 스크롤 위치 가져오기
        const currentScrollPos = window.pageYOffset;

        // 스크롤 방향 계산
        if (prevScrollPos > currentScrollPos) {
            // 스크롤을 올릴 때: 헤더 표시
            header.style.opacity = "1";
        } else {
            // 스크롤을 내릴 때: 헤더 숨김
            header.style.opacity = "0";
        }

        // 현재 스크롤 위치를 이전 스크롤 위치로 업데이트
        prevScrollPos = currentScrollPos;
    });

});




var polyline = document.querySelector('.drawing_line_polyline');
var polyPoints = polyline.getAttribute('points');
var circle = document.querySelector('.drawing_line_circle');
var circleX = circle.getAttribute('cx');
var circleY = circle.getAttribute('cy');
var circleR = circle.getAttribute('r');

var total = 12;
var gap = 30;
var ease = 0.5;
var debounce_removeLine;
var debounce_counter = 0;

var pointer = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    tx: 0,
    ty: 0,
    dist: 0,
    scale: 1,
    speed: 2,
    circRadius: 4,
    updateCrds: function () {
        if (this.x != 0) {
            this.dist = Math.abs((this.x - this.tx) + (this.y - this.ty));
            this.scale = Math.max(this.scale + ((100 - this.dist * 8) * 0.01 - this.scale) * 0.1, 0.25); // gt 0.25 = 4px
            this.tx += (this.x - this.tx) / this.speed;
            this.ty += (this.y - this.ty) / this.speed;
        }
    }
};

var points = [];

$(window).on('mousemove', function (e) {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    if (window.innerWidth > 488) { // 체크 너비가 488px 초과인 경우에만 이펙트 활성화
        debounce_counter = 0;
        drawLine();
    }
    else {
        // 너비가 488px 이하인 경우 마우스 커서를 따라다니는 효과 없애기
        polyline.setAttribute('points', '');
        circle.setAttribute('cx', '');
        circle.setAttribute('cy', '');
        circle.setAttribute('r', '');
    }

    // debounce
    clearTimeout(debounce_removeLine);
    debounce_removeLine = setTimeout(() => {
        debounce_counter = 12;
        drawLine();
    }, 80);
});

$(window).on('mousedown', function (e) {
    pointer.circRadius = 6;
    drawLine();
});

$(window).on('mouseup', function (e) {
    pointer.circRadius = 8;
    drawLine();
});

function drawLine() {
    if (window.innerWidth <= 488) {
        return; // 너비가 488px 이하인 경우에는 이펙트를 실행하지 않음
    }

    pointer.updateCrds();

    points.push({
        x: pointer.tx,
        y: pointer.ty
    });
    while (points.length > total) {
        points.shift();
        if (points.length > gap) {
            for (var i = 0; i < 5; i++) {
                points.shift();
            }
        }
    }
    var pointsArr = points.map(point => `${point.x},${point.y}`);
    polyPoints = pointsArr.join(' ');
    polyline.setAttribute('points', polyPoints);

    // circle
    circleX = pointer.x;
    circleY = pointer.y;
    circleR = pointer.scale * pointer.circRadius;

    circle.setAttribute('cx', circleX);
    circle.setAttribute('cy', circleY);
    circle.setAttribute('r', circleR);

    if (debounce_counter > 0) {
        debounce_counter--;
        requestAnimationFrame(drawLine);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.querySelector(".menuBtn");
    const navMobile = document.querySelector(".nav-mobile");

    menuBtn.addEventListener("click", function () {
        navMobile.classList.toggle("active");
    });
});



document.addEventListener('DOMContentLoaded', function () {
    // 슬라이더 스크립트 함수
    function setupSlider(sliderClass) {
        const slider = document.querySelector(`.${sliderClass}`);
        const slideContainer = slider.querySelector('.slider-container');
        const slides = slideContainer.querySelectorAll('.slide'); // 슬라이드 요소들을 가져옴
        let currentIndex = 0;

        function showSlide(index) {
            slideContainer.style.transform = `translateX(-${index * 100}%)`; // 슬라이드 너비 조정
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        }

        // 다음 버튼 클릭 시
        slider.querySelector(`#nextBtn${sliderClass}`).addEventListener('click', nextSlide);

        // 이전 버튼 클릭 시
        slider.querySelector(`#prevBtn${sliderClass}`).addEventListener('click', prevSlide);

        // 초기 슬라이드 표시
        showSlide(currentIndex);
    }

    // 슬라이더 설정 - 각 슬라이더에 해당 클래스 이름 적용
    setupSlider('slider1');
    setupSlider('slider2');
    setupSlider('slider3');
    setupSlider('slider4');
    setupSlider('slider5');
});
