const faqButtons = document.querySelectorAll('.faq-question');

faqButtons.forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentNode;
        faqItem.classList.toggle('open');
    });
});
