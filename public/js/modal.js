document.addEventListener('DOMContentLoaded', function () {

    const modalTriggerList = document.querySelectorAll(".modal-trigger");
    const modalContainer = document.getElementById("modal-container");
    const modalImage = document.querySelector(".modal-image");
    const body = document.body;

    modalTriggerList.forEach(function (trigger) {
        trigger.addEventListener("click", function (e) {
            e.preventDefault();
            const imgSrc = trigger.getAttribute("data-src");
            showModal(imgSrc);
        });
    });

    function showModal(imgSrc) {
        modalImage.src = imgSrc;

        // 모달을 표시하기 위해 동적으로 HTML 코드 추가
        modalContainer.style.display = "flex";
        body.style.overflow = 'hidden';
    }

    // 모달 닫기 함수
    window.closeModal = function () {
        // 모달을 닫기 위해 동적으로 추가한 HTML 코드 제거
        modalContainer.style.display = "none";
        body.style.overflow = 'auto';
    }
});
