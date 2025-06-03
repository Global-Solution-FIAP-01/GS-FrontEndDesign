document.addEventListener('DOMContentLoaded', () => {
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const themeButtons = {
        default: document.getElementById('theme-default-btn'),
        dark: document.getElementById('theme-dark-btn'),
        lightAlt: document.getElementById('theme-light-alt-btn')
    };

    function applyTheme(themeName) {
        document.body.className = themeName;
        localStorage.setItem('floodWatchTheme', themeName);
    }

    if (themeButtons.default) themeButtons.default.addEventListener('click', () => applyTheme('theme-default'));
    if (themeButtons.dark) themeButtons.dark.addEventListener('click', () => applyTheme('theme-dark'));
    if (themeButtons.lightAlt) themeButtons.lightAlt.addEventListener('click', () => applyTheme('theme-light-alt'));

    const savedTheme = localStorage.getItem('floodWatchTheme');
    if (savedTheme) {
        document.body.className = savedTheme;
    } else {
        document.body.className = 'theme-default';
    }

    const hamburgerButton = document.getElementById('hamburger-button');
    const navUl = document.querySelector('#main-nav ul');
    const mainNav = document.getElementById('main-nav');
    const hamburgerIcon = document.getElementById('hamburger-icon');

    if (hamburgerButton && navUl && mainNav) {
        hamburgerButton.addEventListener('click', () => {
            const isExpanded = navUl.classList.toggle('active');
            mainNav.classList.toggle('nav-open', isExpanded);
            hamburgerButton.setAttribute('aria-expanded', isExpanded);
            if (isExpanded) {
                hamburgerIcon.src = '../src/assets/imgs/close-menu.png';
                hamburgerIcon.alt = 'Fechar menu';
            } else {
                hamburgerIcon.src = '../src/assets/imgs/hamburger-menu.png';
                hamburgerIcon.alt = 'Menu';
            }
        });
    }
    
    document.querySelectorAll('#main-nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768 && navUl.classList.contains('active')) {
                navUl.classList.remove('active');
                mainNav.classList.remove('nav-open');
                hamburgerButton.setAttribute('aria-expanded', 'false');
                hamburgerIcon.src = '../src/assets/imgs/hamburger-menu.png';
                hamburgerIcon.alt = 'Menu';
            }
        });
    });

    let slideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevSlideBtn = document.getElementById('prev-slide');
    const nextSlideBtn = document.getElementById('next-slide');

    function showSlides(n) {
        slideIndex = n;
        if (slideIndex >= slides.length) { slideIndex = 0; }
        if (slideIndex < 0) { slideIndex = slides.length - 1; }

        slides.forEach(slide => slide.style.display = 'none');
        dots.forEach(dot => dot.classList.remove('active'));

        if (slides[slideIndex]) slides[slideIndex].style.display = 'block';
        if (dots[slideIndex]) dots[slideIndex].classList.add('active');
    }

    function plusSlides(n) {
        showSlides(slideIndex + n);
    }
    
    function currentSlide(n) {
        showSlides(n);
    }

    if (slides.length > 0) {
        showSlides(slideIndex);
        if (prevSlideBtn) prevSlideBtn.addEventListener('click', () => plusSlides(-1));
        if (nextSlideBtn) nextSlideBtn.addEventListener('click', () => plusSlides(1));
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => currentSlide(index));
        });
        setInterval(() => plusSlides(1), 5000);
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            let isValid = true;

            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            const formSuccessMessage = document.getElementById('form-success-message');

            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
            if(formSuccessMessage) formSuccessMessage.style.display = 'none';

            if (!name.value.trim()) {
                document.getElementById('name-error').textContent = 'Nome é obrigatório.';
                isValid = false;
            }
            if (!email.value.trim()) {
                document.getElementById('email-error').textContent = 'Email é obrigatório.';
                isValid = false;
            } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
                document.getElementById('email-error').textContent = 'Email inválido.';
                isValid = false;
            }
            if (!subject.value.trim()) {
                document.getElementById('subject-error').textContent = 'Assunto é obrigatório.';
                isValid = false;
            }
            if (!message.value.trim()) {
                document.getElementById('message-error').textContent = 'Mensagem é obrigatória.';
                isValid = false;
            }

            if (isValid) {
                console.log('Form submitted:', {
                    name: name.value,
                    email: email.value,
                    subject: subject.value,
                    message: message.value
                });
                if(formSuccessMessage) formSuccessMessage.style.display = 'block';
                contactForm.reset();
                setTimeout(() => { if(formSuccessMessage) formSuccessMessage.style.display = 'none'; }, 3000);
            }
        });
    }

    const quizData = [
        { question: "O que é uma enchente relâmpago?", options: ["Inundação lenta e gradual", "Inundação causada por maré alta", "Inundação rápida por chuva intensa", "Rompimento de barragem"], answer: 2 },
        { question: "Qual agência no Brasil é responsável pelo monitoramento hidrológico nacional?", options: ["IBAMA", "ANA - Agência Nacional de Águas", "Defesa Civil", "Ministério do Meio Ambiente"], answer: 1 },
        { question: "Qual o principal gás de efeito estufa que contribui para o aumento do nível do mar?", options: ["Metano", "Óxido Nitroso", "Dióxido de Carbono", "Ozônio"], answer: 2 },
        { question: "O que significa a sigla 'SAR' em um contexto de desastres?", options: ["Sistema de Alerta Rápido", "Segurança Aquática e Resgate", "Busca e Salvamento (Search and Rescue)", "Serviço de Ajuda Remota"], answer: 2 },
        { question: "Qual a importância de preservar matas ciliares?", options: ["Aumentar áreas de pastagem", "Facilitar acesso a rios", "Proteger margens de rios e evitar erosão", "Melhorar a navegação"], answer: 2 },
        { question: "O que é um pluviômetro?", options: ["Mede velocidade do vento", "Mede nível do rio", "Mede quantidade de chuva", "Mede umidade do ar"], answer: 2 },
        { question: "Qual o primeiro passo ao receber um alerta de inundação?", options: ["Tentar salvar pertences", "Ligar para parentes", "Buscar um local seguro e elevado", "Aguardar instruções"], answer: 2 },
        { question: "O que são 'bacias hidrográficas'?", options: ["Grandes reservatórios de água subterrânea", "Área de captação de água para um rio principal", "Canais artificiais para irrigação", "Regiões propensas a secas"], answer: 1 },
        { question: "Qual a cor de alerta que indica maior perigo de inundação, geralmente?", options: ["Amarelo", "Laranja", "Vermelho", "Verde"], answer: 2 },
        { question: "É seguro dirigir ou caminhar por águas de enchente?", options: ["Sim, se a água estiver abaixo do joelho", "Sim, se estiver em um veículo 4x4", "Não, devido a perigos ocultos e contaminação", "Apenas se conhecer bem o local"], answer: 2 }
    ];

    const startQuizBtn = document.getElementById('start-quiz-btn');
    const quizContainer = document.getElementById('quiz-container');
    const questionArea = document.getElementById('question-area');
    const optionsArea = document.getElementById('options-area');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const quizFeedback = document.getElementById('quiz-feedback');
    const quizResult = document.getElementById('quiz-result');
    const scoreText = document.getElementById('score-text');
    const resultMessage = document.getElementById('result-message');
    const restartQuizBtn = document.getElementById('restart-quiz-btn');

    let currentQuestionIndex = 0;
    let score = 0;
    let answerSelected = false;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let correctSoundBuffer, wrongSoundBuffer, completeSoundBuffer;

    async function loadSound(url) {
        try {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            return audioContext.decodeAudioData(arrayBuffer);
        } catch (error) {
            console.error(`Error loading sound ${url}:`, error);
            return null;
        }
    }

    async function initSounds() {
        correctSoundBuffer = await loadSound('../src/assets/sounds/correct-answer.mp3');
        wrongSoundBuffer = await loadSound('../src/assets/sounds/wrong-answer.mp3');
        completeSoundBuffer = await loadSound('../src/assets/sounds/quiz-complete.mp3');
    }
    initSounds();

    function playSound(buffer) {
        if (!buffer || !audioContext) return;
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start(0);
    }

    function loadQuestion() {
        answerSelected = false;
        quizFeedback.textContent = '';
        quizFeedback.className = 'feedback';
        const currentQuestion = quizData[currentQuestionIndex];
        questionArea.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
        optionsArea.innerHTML = '';
        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', () => selectAnswer(index, button));
            optionsArea.appendChild(button);
        });
        nextQuestionBtn.textContent = currentQuestionIndex === quizData.length - 1 ? 'Ver Resultado' : 'Próxima Pergunta';
        nextQuestionBtn.style.display = 'none';
    }

    function selectAnswer(selectedIndex, selectedButton) {
        if (answerSelected) return;
        answerSelected = true;

        const currentQuestion = quizData[currentQuestionIndex];
        const correct = selectedIndex === currentQuestion.answer;

        Array.from(optionsArea.children).forEach((btn, idx) => {
            btn.classList.add('disabled');
            if (idx === currentQuestion.answer) {
                btn.classList.add('correct');
            } else if (idx === selectedIndex && !correct) {
                btn.classList.add('incorrect');
            }
        });
        
        if (correct) {
            score++;
            quizFeedback.textContent = 'Correto!';
            quizFeedback.className = 'feedback correct';
            if (correctSoundBuffer) playSound(correctSoundBuffer);
        } else {
            quizFeedback.textContent = `Incorreto. A resposta correta é: ${currentQuestion.options[currentQuestion.answer]}`;
            quizFeedback.className = 'feedback incorrect';
            if (wrongSoundBuffer) playSound(wrongSoundBuffer);
        }
        nextQuestionBtn.style.display = 'inline-block';
    }

    function showResults() {
        questionArea.style.display = 'none';
        optionsArea.style.display = 'none';
        nextQuestionBtn.style.display = 'none';
        quizFeedback.style.display = 'none';
        
        quizResult.classList.remove('hidden');
        scoreText.textContent = `Você acertou ${score} de ${quizData.length} perguntas.`;

        let message = '';
        if (score === quizData.length) {
            message = 'Excelente! Você é um expert em segurança hídrica!';
        } else if (score >= quizData.length * 0.7) {
            message = 'Muito bom! Você tem um ótimo conhecimento sobre o tema.';
        } else if (score >= quizData.length * 0.4) {
            message = 'Bom esforço! Continue aprendendo sobre o assunto.';
        } else {
            message = 'Não desanime! Que tal tentar novamente para aprender mais?';
        }
        resultMessage.textContent = message;
        if(completeSoundBuffer) playSound(completeSoundBuffer);
    }

    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', () => {
            startQuizBtn.classList.add('hidden');
            quizContainer.classList.remove('hidden');
            currentQuestionIndex = 0;
            score = 0;
            questionArea.style.display = 'block';
            optionsArea.style.display = 'block';
            quizFeedback.style.display = 'block';
            quizResult.classList.add('hidden');
            loadQuestion();
        });
    }

    if (nextQuestionBtn) {
        nextQuestionBtn.addEventListener('click', () => {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizData.length) {
                loadQuestion();
            } else {
                showResults();
            }
        });
    }
    
    if (restartQuizBtn) {
        restartQuizBtn.addEventListener('click', () => {
            startQuizBtn.classList.remove('hidden');
            quizContainer.classList.add('hidden');
        });
    }
});