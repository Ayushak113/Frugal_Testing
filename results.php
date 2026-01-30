<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz Results</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div class="container">
        <div class="results-container">
            <div class="results-header">
                <h1 class="results-title">Quiz Results</h1>
                <div class="score-display">
                    <div class="score-circle">
                        <div class="score-value" id="scoreValue">0%</div>
                        <div class="score-label">Score</div>
                    </div>
                </div>
            </div>
            
            <div class="results-summary">
                <div class="summary-card correct">
                    <div class="summary-icon">✓</div>
                    <div class="summary-content">
                        <div class="summary-number" id="correctCount">0</div>
                        <div class="summary-label">Correct</div>
                    </div>
                </div>
                <div class="summary-card incorrect">
                    <div class="summary-icon">✗</div>
                    <div class="summary-content">
                        <div class="summary-number" id="incorrectCount">0</div>
                        <div class="summary-label">Incorrect</div>
                    </div>
                </div>
                <div class="summary-card total">
                    <div class="summary-icon">📊</div>
                    <div class="summary-content">
                        <div class="summary-number" id="totalQuestions">0</div>
                        <div class="summary-label">Total</div>
                    </div>
                </div>
            </div>
            
            <div class="charts-container">
                <div class="chart-card">
                    <h3>Answer Distribution</h3>
                    <canvas id="answerChart"></canvas>
                </div>
                <div class="chart-card">
                    <h3>Time Spent per Question</h3>
                    <canvas id="timeChart"></canvas>
                </div>
            </div>
            
            <div class="detailed-results">
                <h3>Detailed Breakdown</h3>
                <div class="results-list" id="resultsList">
                    <!-- Results will be dynamically loaded -->
                </div>
            </div>
            
            <div class="action-buttons">
                <button id="retakeBtn" class="btn-primary">Take Another Quiz</button>
                <button id="reviewBtn" class="btn-secondary">Review Answers</button>
            </div>
        </div>
    </div>
    
    <script src="assets/js/results.js"></script>
</body>
</html>
