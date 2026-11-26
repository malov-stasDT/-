
const modal = document.getElementById('modal');
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');

function openModal(formType) {
    if (!modal) return;
    modal.style.display = 'block';
    if (formType === 'register') {
        registerForm.style.display = 'block';
        loginForm.style.display = 'none';
    } else {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    }
    clearAllErrors();
}

function closeModal() {
    if (modal) modal.style.display = 'none';
}

window.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
});


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setError(input, errorEl, message) {
    input.classList.add('invalid');
    input.classList.remove('valid');
    errorEl.textContent = message;
}

function setSuccess(input, errorEl) {
    input.classList.remove('invalid');
    input.classList.add('valid');
    errorEl.textContent = '';
}

function clearAllErrors() {
    document.querySelectorAll('.field input').forEach(input => {
        input.classList.remove('invalid', 'valid');
    });
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
}

function validateName(name) {
    if (!name) return 'Введите имя';
    if (name.length < 2) return 'Имя должно содержать минимум 2 символа';
    return '';
}

function validateEmail(email) {
    if (!email) return 'Введите email';
    if (!emailRegex.test(email)) return 'Некорректный формат email';
    return '';
}

function validatePassword(password, minLength = 6) {
    if (!password) return 'Введите пароль';
    if (password.length < minLength) return `Пароль должен быть минимум ${minLength} символов`;
    return '';
}

function handleRegister(event) {
    event.preventDefault();

    const nameInput = document.getElementById('reg-name');
    const emailInput = document.getElementById('reg-email');
    const passInput = document.getElementById('reg-password');

    const nameError = validateName(nameInput.value.trim());
    const emailError = validateEmail(emailInput.value.trim());
    const passError = validatePassword(passInput.value);

    if (nameError) setError(nameInput, document.getElementById('error-reg-name'), nameError);
    else setSuccess(nameInput, document.getElementById('error-reg-name'));

    if (emailError) setError(emailInput, document.getElementById('error-reg-email'), emailError);
    else setSuccess(emailInput, document.getElementById('error-reg-email'));

    if (passError) setError(passInput, document.getElementById('error-reg-password'), passError);
    else setSuccess(passInput, document.getElementById('error-reg-password'));

    if (!nameError && !emailError && !passError) {
        alert('Регистрация прошла успешно! Добро пожаловать в КиноПортал!');
        event.target.reset();
        clearAllErrors();
        closeModal();
    }
}

function handleLogin(event) {
    event.preventDefault();

    const emailInput = document.getElementById('log-email');
    const passInput = document.getElementById('log-password');

    const emailError = validateEmail(emailInput.value.trim());
    const passError = validatePassword(passInput.value);

    if (emailError) setError(emailInput, document.getElementById('error-log-email'), emailError);
    else setSuccess(emailInput, document.getElementById('error-log-email'));

    if (passError) setError(passInput, document.getElementById('error-log-password'), passError);
    else setSuccess(passInput, document.getElementById('error-log-password'));

    if (!emailError && !passError) {
        alert('Вы успешно вошли! Приятного просмотра!');
        event.target.reset();
        clearAllErrors();
        closeModal();
    }
}

const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('slider-dots');
const totalSlides = slides.length;
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');

    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function next() {
    if (!totalSlides) return;
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prev() {
    if (!totalSlides) return;
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

function createDots() {
    if (!dotsContainer) return;
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        dot.setAttribute('aria-label', `Слайд ${i + 1}`);
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentSlide = i;
            showSlide(currentSlide);
        });
        dotsContainer.appendChild(dot);
    }
}

createDots();

if (totalSlides) {
    let autoSlide = setInterval(next, 5000);

    const sliderWrapper = document.querySelector('.slider-wrapper');
    if (sliderWrapper) {
        sliderWrapper.addEventListener('mouseenter', () => clearInterval(autoSlide));
        sliderWrapper.addEventListener('mouseleave', () => {
            autoSlide = setInterval(next, 5000);
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft') prev();
    });
}


function toggleFaq(button) {
    const item = button.parentElement;
    const isOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

    if (!isOpen) item.classList.add('open');
}