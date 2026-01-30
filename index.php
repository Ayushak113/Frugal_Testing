<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz Application - Select Your Challenge</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <div class="container">
        <div class="landing-page">
            <div class="header">
                <h1 class="main-title">Quiz Master</h1>
                <p class="subtitle">Test your knowledge across various categories</p>
            </div>
            
            <div class="selection-panel">
                <div class="selection-group">
                    <label for="category">Select Category:</label>
                    <select id="category" class="select-input">
                        <option value="general">General Knowledge</option>
                        <option value="science">Science</option>
                        <option value="history">History</option>
                        <option value="technology">Technology</option>
                    </select>
                </div>
                
                <div class="selection-group">
                    <label for="difficulty">Select Difficulty:</label>
                    <select id="difficulty" class="select-input">
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
            </div>
            
            <div class="info-box">
                <h3>Quiz Information</h3>
                <ul>
                    <li>10 questions per quiz</li>
                    <li>30 seconds per question</li>
                    <li>Automatic submission when time runs out</li>
                    <li>Detailed result analysis at the end</li>
                </ul>
            </div>
            
            <button id="startQuizBtn" class="btn-primary">Start Quiz</button>
        </div>
    </div>
    
    <script src="assets/js/main.js"></script>
</body>
</html>
