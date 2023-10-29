

$(document).ready(function () {
    var slides = $(".main_banner .slide");
    var currentSlide = 0;
    slides.eq(currentSlide).addClass("active");

    var slideInterval = setInterval(nextSlide, 4000);

    function nextSlide() {
        slides.eq(currentSlide).removeClass("active");
        currentSlide = (currentSlide + 1) % slides.length;
        slides.eq(currentSlide).addClass("active");
    }
});



// 슬라이드 기능 함수
function slideToIndex(container, group, index, cardWidth) {
    group.style.transform = `translateX(-${index * cardWidth}px)`;
    container.dataset.currentIndex = index;
}

function slidePrev(container, group, prdCards, numCardsVisible, cardWidth) {
    const currentIndex = parseInt(container.dataset.currentIndex);
    if (currentIndex > 0) {
        slideToIndex(container, group, currentIndex - numCardsVisible, cardWidth);
    }
}

function slideNext(container, group, prdCards, numCardsVisible, cardWidth) {
    const currentIndex = parseInt(container.dataset.currentIndex);
    if (currentIndex < prdCards.length - numCardsVisible) {
        const nextIndex = currentIndex + numCardsVisible;
        slideToIndex(container, group, nextIndex, cardWidth);
    }
}

// 각 섹션에 대한 슬라이드 초기화 및 버튼 이벤트 처리
const sliderContainers = document.querySelectorAll('.product_slide .slider-container');
const prdCardGroups = document.querySelectorAll('.slider-container .sub_prd_card_group');
const prdCards = document.querySelectorAll('.slider-container .prd_card');

sliderContainers.forEach((container, index) => {
    const group = prdCardGroups[index];
    const cardWidth = prdCards[0].offsetWidth + 30;
    const numCardsVisible = 3;

    container.dataset.currentIndex = 0;

    const prevButton = document.createElement('button');
    prevButton.id = 'prevBtn';
    prevButton.innerHTML = '<img src="./img/icon/prev_btn.png" alt="이전">';
    prevButton.addEventListener('click', () => slidePrev(container, group, prdCards, numCardsVisible, cardWidth));

    const nextButton = document.createElement('button');
    nextButton.id = 'nextBtn';
    nextButton.innerHTML = '<img src="./img/icon/next_btn.png" alt=다음">';
    nextButton.addEventListener('click', () => slideNext(container, group, prdCards, numCardsVisible, cardWidth));

    container.parentNode.appendChild(prevButton);
    container.parentNode.appendChild(nextButton);
});




const faqButtons = document.querySelectorAll('.faq-question');

faqButtons.forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentNode;
        const faqAnswer = faqItem.querySelector('.faq-answer');
        faqItem.classList.toggle('open');

        if (faqItem.classList.contains('open')) {
            faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
        } else {
            faqAnswer.style.maxHeight = '0';
        }
    });
});


var button1 = document.getElementById('toggleButton1');
var button2 = document.getElementById('toggleButton2');

// 버튼에 클릭 이벤트 리스너 추가
button1.addEventListener('click', function () {
    // h2 요소의 내용 변경
    var value = button1.value;
    if (value === '48개월') {
        document.querySelector('#lent_price h2').textContent = '600,000원';
    } else if (value === '12개월') {
        document.querySelector('#lent_price h2').textContent = '240,000원';
    } else if (value === '24개월') {
        document.querySelector('#lent_price h2').textContent = '360,000원';
    }
});

button2.addEventListener('click', function () {
    // h2 요소의 내용 변경
    var value = button2.value;
    if (value === '60개월') {
        document.querySelector('#lent_price h2').textContent = '800,000원';
    } else if (value === '24개월') {
        document.querySelector('#lent_price h2').textContent = '200,000원';
    } else if (value === '36개월') {
        document.querySelector('#lent_price h2').textContent = '400,000원';
    }
});





$(document).ready(function () {
    var currentImageIndex = 0;

    // 이미지 클릭 시 메인으로 설정
    $('.min_img_slide').click(function () {
        var imageSrc = $(this).find('img').attr('src');
        $('#img_slide img').addClass('hide');
        setTimeout(function () {
            $('#img_slide img').attr('src', imageSrc).removeClass('hide');
        }, 100);


        $('.min_img_slide').removeClass('selected');
        $(this).addClass('selected');

        currentImageIndex = $(this).index();
    });

    // 이전 버튼 클릭 시 이전 이미지로 이동
    $('#minPrevBtn').click(function () {
        currentImageIndex--;
        if (currentImageIndex < 0) {
            currentImageIndex = $('.min_img_slide').length - 1;
        }
        var imageSrc = $('.min_img_slide').eq(currentImageIndex).find('img').attr('src');
        $('#img_slide img').addClass('hide');
        setTimeout(function () {
            $('#img_slide img').attr('src', imageSrc).removeClass('hide');
        }, 100);


        $('.min_img_slide').removeClass('selected');
        $('.min_img_slide').eq(currentImageIndex).addClass('selected');
    });

    // 다음 버튼 클릭 시 다음 이미지로 이동
    $('#minNextBtn').click(function () {
        currentImageIndex++;
        if (currentImageIndex >= $('.min_img_slide').length) {
            currentImageIndex = 0;
        }
        var imageSrc = $('.min_img_slide').eq(currentImageIndex).find('img').attr('src');
        $('#img_slide img').addClass('hide');
        setTimeout(function () {
            $('#img_slide img').attr('src', imageSrc).removeClass('hide');
        }, 100);


        $('.min_img_slide').removeClass('selected');
        $('.min_img_slide').eq(currentImageIndex).addClass('selected');
    });
});


$(document).ready(function () {
    // 이미지 변경 함수
    function changeImage(imageSrc) {
        $('#img_slide img').addClass('hide');
        setTimeout(function () {
            $('#img_slide img').attr('src', imageSrc).removeClass('hide');
        }, 100);
    }



    $('.prd_select_box select').change(function () {
        var selectedOption = $(this).val();
        var imageGroup = []; 


        if (selectedOption === 'option1') {
            imageGroup = [
                './img/product_image/Ke1.5/Product image_(1) Ke1.5.jpg',
                './img/product_image/Ke1.5/Product image_(2) Ke1.5.jpg',
                './img/product_image/Ke1.5/Product image_(3) Ke1.5.jpg',
                './img/product_image/Ke1.5/Product image_(4) Ke1.5.jpg',
                './img/product_image/Ke1.5/Product image_(5) Ke1.5.jpg'
            ],
            textGroup = ['안녕'];
        } else if (selectedOption === 'option2') {
            imageGroup = [
                './img/product_image/Mf/Product image_(1) Mf.jpg',
                './img/product_image/Mf/Product image_(2) Mf.jpg',
                './img/product_image/Mf/Product image_(3) Mf.jpg',
                './img/product_image/Mf/Product image_(4) Mf.jpg'
            ];
        } else if (selectedOption === 'option3') {
            imageGroup = [
                './img/product_image/Ke2.5/Product image_(1) Ke2.5.jpg',
                './img/product_image/Ke2.5/Product image_(2) Ke2.5.jpg',
                './img/product_image/Ke2.5/Product image_(3) Ke2.5.jpg',
                './img/product_image/Ke2.5/Product image_(4) Ke2.5.jpg',
                './img/product_image/Ke2.5/Product image_(5) Ke2.5.jpg'
            ];
        } else if (selectedOption === 'option4') {
            imageGroup = [
                './img/product_image/ie2.5/Product image_(1) Ie2.5.jpg',
                './img/product_image/ie2.5/Product image_(2) Ie2.5.jpg',
                './img/product_image/ie2.5/Product image_(3) Ie2.5.jpg',
                './img/product_image/ie2.5/Product image_(4) Ie2.5.jpg',
                './img/product_image/ie2.5/Product image_(5) Ie2.5.jpg'
            ];
        } else if (selectedOption === 'option5') {
            imageGroup = [
                './img/product_image/Cby25/Product image_(1) Cby25.jpg',
                './img/product_image/Cby25/Product image_(2) Cby25.jpg',
                './img/product_image/Cby25/Product image_(3) Cby25.jpg',
                './img/product_image/Cby25/Product image_(4) Cby25.jpg',
                './img/product_image/Cby25/Product image_(5) Cby25.jpg'
            ];
        } else if (selectedOption === 'option6') {
            imageGroup = [
                './img/product_image/F2/Product image_(1) F2.jpg',
                './img/product_image/F2/Product image_(2) F2.jpg',
                './img/product_image/F2/Product image_(3) F2.jpg',
                './img/product_image/F2/Product image_(4) F2.jpg',
                './img/product_image/F2/Product image_(5) F2.jpg'
            ];
        } else if (selectedOption === 'option7') {
            imageGroup = [
                './img/product_image/St/Product image_(1) St.jpg',
                './img/product_image/St/Product image_(2) St.jpg',
                './img/product_image/St/Product image_(3) St.jpg',
                './img/product_image/St/Product image_(4) St.jpg',
                './img/product_image/St/Product image_(5) St.jpg'
            ];
        } else if (selectedOption === 'option8') {
            imageGroup = [
                './img/product_image/S3/Product image S3(1).jpg',
                './img/product_image/S3/Product image S3(2).jpg',
                './img/product_image/S3/Product image S3(3).jpg',
                './img/product_image/S3/Product image S3(4).jpg',
                './img/product_image/S3/Product image S3(5).jpg'
            ];
        } else if (selectedOption === 'option9') {
            imageGroup = [
                './img/product_image/s7/S7(1).png',
                './img/product_image/s7/S7(2).jpg',
                './img/product_image/s7/S7(3).jpg',
                './img/product_image/s7/S7(4).jpg',
                './img/product_image/s7/S7(5).jpg'
            ];
        }

        var currentIndex = 0;
        var numImages = imageGroup.length;

        // 이미지 그룹 변경
        function changeImageGroup() {
            var imageSrc = imageGroup[currentIndex];
            changeImage(imageSrc);
            $('.min_img_slide img').addClass('hide'); //  hide 클래스 추가
            setTimeout(function () {
                $('.min_img_slide img').eq(currentIndex).attr('src', imageSrc).removeClass('hide'); // hide 클래스 제거
            }, 100);
        }


        $('#minPrevBtn').click(function () {
            currentIndex = (currentIndex - 1 + numImages) % numImages;
            changeImageGroup();
        });


        $('#minNextBtn').click(function () {
            currentIndex = (currentIndex + 1) % numImages;
            changeImageGroup();
        });


        changeImageGroup();
    });
});