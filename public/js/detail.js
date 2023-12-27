// 웹용 작업 제목 클릭 이벤트 처리
function changeViewpoint(target) {
    // 모든 항목을 초기화
    document.querySelector('.aside-experience').classList.remove('active');
    document.querySelector('.aside-planning').classList.remove('active');
    document.querySelector('.experience').classList.remove('active');
    document.querySelector('.planning').classList.remove('active');

    // 클릭된 항목에 active 클래스 추가
    document.querySelector('.aside-' + target).classList.add('active');
    document.querySelector('.' + target).classList.add('active');

    // 해당 항목으로 스무스하게 스크롤
    document.querySelector('.' + target).scrollIntoView({ behavior: 'smooth' });
}
