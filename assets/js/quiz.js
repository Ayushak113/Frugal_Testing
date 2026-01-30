let questions = [];
let currentQuestionIndex = 0;
let userAnswers = {};
let timeSpent = {};
let timerInterval = null;
let timeRemaining = 30;
let questionStartTime = Date.now();

const category = sessionStorage.getItem('quizCategory') || 'general';
const difficulty = sessionStorage.getItem('quizDifficulty') || 'easy';

document.addEventListener('DOMContentLoaded', function() {
    initializeQuiz();
});

async function initializeQuiz() {
    // Update UI with category and difficulty
    document.getElementById('categoryBadge').textContent = category.charAt(0).toUpperCase() + category.slice(1);
    document.getElementById('difficultyBadge').textContent = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
    
    // Load questions
    try {
        const response = await fetch(`api/get_questions.php?category=${category}&difficulty=${difficulty}`);
        const data = await response.json();
        
        if (data.error) {
            alert(data.error);
            window.location.href = 'index.php';
            return;
        }
        
        questions = data.questions;
        displayQuestion();
        startTimer();
    } catch (error) {
        console.error('Error loading questions:', error);
        alert('Failed to load questions. Please try again.');
        window.location.href = 'index.php';
    }
}

function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        submitQuiz();
        return;
    }
    
    const question = questions[currentQuestionIndex];
    const questionId = question.id;
    
    // Reset timer
    timeRemaining = 30;
    questionStartTime = Date.now();
    updateTimerDisplay();
    
    // Update progress
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById('progressBarFill').style.width = progress + '%';
    document.getElementById('progressText').textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    
    // Display question
    document.getElementById('questionNumber').textContent = `Question ${currentQuestionIndex + 1}`;
    document.getElementById('questionText').textContent = question.question;
    
    // Display options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionItem = document.createElement('div');
        optionItem.className = 'option-item';
        optionItem.dataset.option = option;
        
        const radio = document.createElement('div');
        radio.className = 'option-radio';
        
        const optionText = document.createElement('span');
        optionText.textContent = option;
        
        optionItem.appendChild(radio);
        optionItem.appendChild(optionText);
        
        // Check if this option was previously selected
        if (userAnswers[questionId] === option) {
            optionItem.classList.add('selected');
        }
        
        optionItem.addEventListener('click', function() {
            selectOption(option, questionId);
        });
        
        optionsContainer.appendChild(optionItem);
    });
    
    // Update navigation buttons
    document.getElementById('prevBtn').disabled = currentQuestionIndex === 0;
    
    if (currentQuestionIndex === questions.length - 1) {
        document.getElementById('nextBtn').style.display = 'none';
        document.getElementById('submitBtn').style.display = 'inline-block';
    } else {
        document.getElementById('nextBtn').style.display = 'inline-block';
        document.getElementById('submitBtn').style.display = 'none';
    }
}

function selectOption(option, questionId) {
    userAnswers[questionId] = option;
    
    // Update UI
    const options = document.querySelectorAll('.option-item');
    options.forEach(opt => {
        opt.classList.remove('selected');
        if (opt.dataset.option === option) {
            opt.classList.add('selected');
        }
    });
}

function startTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            handleTimeUp();
        }
    }, 1000);
}

function updateTimerDisplay() {
    document.getElementById('timerText').textContent = timeRemaining;
    
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (timeRemaining / 30) * circumference;
    const timerCircle = document.getElementById('timerCircle');
    timerCircle.style.strokeDashoffset = offset;
    
    // Change color based on time remaining
    timerCircle.classList.remove('warning', 'danger');
    if (timeRemaining <= 10) {
        timerCircle.classList.add('danger');
    } else if (timeRemaining <= 15) {
        timerCircle.classList.add('warning');
    }
}

function handleTimeUp() {
    // Record time spent
    const questionId = questions[currentQuestionIndex].id;
    const timeSpentOnQuestion = 30 - timeRemaining;
    timeSpent[questionId] = timeSpentOnQuestion;
    
    // Auto-advance to next question
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
        startTimer();
    } else {
        submitQuiz();
    }
}

function recordTimeSpent() {
    const questionId = questions[currentQuestionIndex].id;
    const elapsed = Math.floor((Date.now() - questionStartTime) / 1000);
    timeSpent[questionId] = elapsed;
}

document.getElementById('nextBtn').addEventListener('click', function() {
    recordTimeSpent();
    currentQuestionIndex++;
    displayQuestion();
    startTimer();
});

document.getElementById('prevBtn').addEventListener('click', function() {
    recordTimeSpent();
    currentQuestionIndex--;
    displayQuestion();
    startTimer();
});

document.getElementById('submitBtn').addEventListener('click', function() {
    recordTimeSpent();
    submitQuiz();
});

async function submitQuiz() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    // Check if we have questions
    if (!questions || questions.length === 0) {
        alert('No questions available. Please start a new quiz.');
        window.location.href = 'index.php';
        return;
    }
    
    // Record time for current question if not already recorded
    if (currentQuestionIndex < questions.length) {
        const questionId = questions[currentQuestionIndex].id;
        if (!timeSpent[questionId]) {
            const elapsed = Math.floor((Date.now() - questionStartTime) / 1000);
            timeSpent[questionId] = elapsed;
        }
    }
    
    // Show loading state
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
    }
    
    // Submit answers to backend
    try {
        const response = await fetch('api/check_answers.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                category: category,
                difficulty: difficulty,
                answers: userAnswers,
                timeSpent: timeSpent
            })
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const results = await response.json();
        
        if (results.error) {
            throw new Error(results.error);
        }
        
        // Store results in sessionStorage
        sessionStorage.setItem('quizResults', JSON.stringify(results));
        
        // Redirect to results page
        window.location.href = 'results.php';
    } catch (error) {
        console.error('Error submitting quiz:', error);
        console.error('User answers:', userAnswers);
        console.error('Time spent:', timeSpent);
        console.error('Category:', category, 'Difficulty:', difficulty);
        
        let errorMessage = 'Failed to submit quiz. ';
        if (error.message) {
            errorMessage += error.message;
        } else {
            errorMessage += 'Please check the console for details and try again.';
        }
        alert(errorMessage);
        
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Quiz';
        }
    }
}
