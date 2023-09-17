document.addEventListener('DOMContentLoaded', () => {
    const Data = [
        [

            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/VcQlFKa5wQA?si=JnCGjPGIs4SbkC6n" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
                title: '공략은 구루루',
                description: '금연 프로그램 1에 참여하여 더 쉽게 금연에 도전해 보세요.',
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
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/06bQPPjnw1g?si=RpkPGV9Q6BnsJmBz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
                title: '엔진은 어떻게 작동할까?',
                description: '금연 프로그램 3에 참여하여 더 쉽게 금연에 도전해 보세요.',
            },
            {
                title: '금연 지원 4',
                description: '금연 프로그램 4에 참여하여 더 쉽게 금연에 도전해 보세요.',
            }
        ],
        [
            {
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/TNBC4CELyvQ?si=lg2rQVzTDiRUUpyV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
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
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/nmNUzQmBfeg?si=nVa5YXhLP4zHvTmp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
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
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/nX6i0uEEweY?si=OI_Fr_DmmWWS5Ylo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
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
    const video = document.querySelector('.select-contents .video');

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
            video.innerHTML = '';


            // 각 묶음의 title과 description을 생성합니다.
            selectedData.forEach((item) => {

                video.innerHTML = item.video;

                const h2 = document.createElement("h2");
                h2.textContent = item.title;

                const p = document.createElement("p");
                p.textContent = item.description;

                textArea.appendChild(h2);
                textArea.appendChild(p);
                video.appendChild(video);
            });
        });
    });
});

