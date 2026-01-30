<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz - In Progress</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <div class="container">
        <div class="quiz-container">
            <div class="quiz-header">
                <div class="quiz-info">
                    <span class="category-badge" id="categoryBadge"></span>
                    <span class="difficulty-badge" id="difficultyBadge"></span>
                </div>
                <div class="timer-container">
                    <div class="timer-circle">
                        <svg class="timer-svg" viewBox="0 0 100 100">
                            <circle class="timer-bg" cx="50" cy="50" r="45"></circle>
                            <circle class="timer-progress" cx="50" cy="50" r="45" id="timerCircle"></circle>
                        </svg>
                        <div class="timer-text" id="timerText">30</div>
                    </div>
                </div>
            </div>
            
            <div class="progress-bar-container">
                <div class="progress-bar">
                    <div class="progress-bar-fill" id="progressBarFill"></div>
                </div>
                <span class="progress-text" id="progressText">Question 1 of 10</span>
            </div>
            
            <div class="question-container">
                <div class="question-number" id="questionNumber">Question 1</div>
                <h2 class="question-text" id="questionText">Loading question...</h2>
                
                <div class="options-container" id="optionsContainer">
                    <!-- Options will be dynamically loaded -->
                </div>
            </div>
            
            <div class="navigation-buttons">
                <button id="prevBtn" class="btn-secondary" disabled>Previous</button>
                <button id="nextBtn" class="btn-primary">Next</button>
                <button id="submitBtn" class="btn-success" style="display: none;">Submit Quiz</button>
            </div>
        </div>
    </div>
    
    <script src="assets/js/quiz.js"></script>
</body>
</html>
