document.addEventListener('DOMContentLoaded', () => {
    const Data = [
        [

            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/VcQlFK5wQA?si=JnCGjPGIs4SbkC6n" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
                title: '흡연 기록',
                description: '흡연 할 때 마다 터치 한번이면 됩니다. 체커에서 흡연을 기록해 보세요. 흡연을 기록하시면 체커에서 흡연 습관을 분석하여 개인 맞춤 데이터를 제공합니다.',
            },
            {
                title: '금연 지원',
                description: '여러분이 실제로 지원받을 수 있는 금연 프로그램들을 제공합니다. 금연 지원 프로그램에 참여하여 더 쉽게 금연에 도전해 보세요.',
            }
        ],
        [
            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/06bPPjnw1g?si=RpkPGV9Q6BnsJmBz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
                title: '흡연습관 분석',
                description: '개인이 직접 기록한 흡연을 분석하여 제공합니다. 매 흡연마다 단 한번의 클릭으로 흡연 패턴, 흡연량, 흡연 습관, 건강상태 등을 확인할 수 있습니다.',
            },
            {
                title: '금연 지원 4',
                description: '금연 프로그램 4에 참여하여 더 쉽게 금연에 도전해 보세요.',
            }
        ],
        [
            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/TNBC4CELvQ?si=lg2rQVzTDiRUUpyV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
                title: '잭스 차렷',
                description: '금연 프로그램 5에 참여하여 더 쉽게 금연에 도전해 보세요.',
            },
            {
                title: '금연 지원 2',
                description: '금연 프로그램 2에 참여하여 더 쉽게 금연에 도전해 보세요.',
            },
            {
                title: '금연 지원 2',
                description: '금연 프로그램 2에 참여하여 더 쉽게 금연에 도전해 보세요.',
            }
        ],
        [
            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/nmNUzmBfeg?si=nVa5YXhLP4zHvTmp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
                title: '원피스 실사화',
                description: '금연 프로그램 5에 참여하여 더 쉽게 금연에 도전해 보세요.',
            },
            {
                title: '금연 지원 2',
                description: '금연 프로그램 2에 참여하여 더 쉽게 금연에 도전해 보세요.',
            },
            {
                title: '금연 지원 2',
                description: '금연 프로그램 2에 참여하여 더 쉽게 금연에 도전해 보세요.',
            },
            {
                title: '금연 지원 2',
                description: '금연 프로그램 2에 참여하여 더 쉽게 금연에 도전해 보세요.',
            },
            {
                title: '금연 지원 2',
                description: '금연 프로그램 2에 참여하여 더 쉽게 금연에 도전해 보세요.',
            }
        ],
        [
            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/nX6i0EEweY?si=OI_Fr_DmmWWS5Ylo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
                title: '수리남',
                description: '금연 프로그램 5에 참여하여 더 쉽게 금연에 도전해 보세요.',
            },
            {
                title: '금연 지원 2',
                description: '금연 프로그램 2에 참여하여 더 쉽게 금연에 도전해 보세요.',
            },

        ]
    ];
    // HTML 요소들을 가져옵니다.
    const options = document.querySelectorAll('.select-option .option');
    const textArea = document.querySelector('.select-contents .text-area');
    const videoContainer = document.querySelector('.select-contents');
    const video = document.querySelector('.video');

    // 각 옵션에 클릭 이벤트를 추가합니다.
    options.forEach((option, index) => {
        option.addEventListener('click', () => {
            // 모든 옵션에서 'selected' 클래스를 제거합니다.
            options.forEach((opt) => opt.classList.remove('selected'));

            // 선택한 옵션에 'selected' 클래스를 추가합니다.
            option.classList.add('selected');

            // Data 배열에서 해당 인덱스의 정보를 가져옵니다.
            const selectedData = Data[index];

            textArea.innerHTML = '';

            // video 요소 초기화
            video.innerHTML = '';

            selectedData.forEach((item) => {
                const h2 = document.createElement("h2");
                h2.textContent = item.title;

                const p = document.createElement("p");
                p.textContent = item.description;

                textArea.appendChild(h2);
                textArea.appendChild(p);

                if (item.video) {
                    // video를 videoContainer에 추가
                    video.innerHTML = item.video;
                }
            });
        });
    });


    const cardSlider = document.querySelector('.card-slider');
    const prevBtn = document.getElementById('prevBtnslider1');
    const nextBtn = document.getElementById('nextBtnslider1');

    let currentIndex = 0;
    const cardWidth = document.querySelector('.card-component').offsetWidth;

    nextBtn.addEventListener('click', () => {
        if (currentIndex < cardSlider.children.length - 3) {
            currentIndex++;
            cardSlider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            cardSlider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }
    });



});

const screenSlider = document.querySelector('.screen-slider');
const sliderImages = document.querySelectorAll('.screen-slider img');

let currentIndex = 0;
const slideWidth = sliderImages[0].offsetWidth;

// Intersection Observer 설정
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            slideLeft();
        }
    });
});

observer.observe(screenSlider);

function slideLeft() {
    if (currentIndex < sliderImages.length - 1) {
        currentIndex++;
        screenSlider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
}