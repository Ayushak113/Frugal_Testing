document.addEventListener('DOMContentLoaded', function() {
    const resultsData = sessionStorage.getItem('quizResults');
    
    if (!resultsData) {
        alert('No results found. Please take a quiz first.');
        window.location.href = 'index.php';
        return;
    }
    
    try {
        const results = JSON.parse(resultsData);
        
        // Validate results structure
        if (!results.results || !Array.isArray(results.results)) {
            throw new Error('Invalid results data');
        }
        
        displayResults(results);
    } catch (error) {
        console.error('Error parsing results:', error);
        alert('Error loading results. Please take a quiz again.');
        sessionStorage.clear();
        window.location.href = 'index.php';
    }
});

function displayResults(results) {
    // Display score
    document.getElementById('scoreValue').textContent = results.score + '%';
    
    // Display summary
    document.getElementById('correctCount').textContent = results.correctCount;
    document.getElementById('incorrectCount').textContent = results.incorrectCount;
    document.getElementById('totalQuestions').textContent = results.totalQuestions;
    
    // Create answer distribution chart
    createAnswerChart(results);
    
    // Create time spent chart
    createTimeChart(results);
    
    // Display detailed results
    displayDetailedResults(results);
    
    // Setup action buttons
    document.getElementById('retakeBtn').addEventListener('click', function() {
        sessionStorage.clear();
        window.location.href = 'index.php';
    });
    
    document.getElementById('reviewBtn').addEventListener('click', function() {
        // Scroll to detailed results
        document.querySelector('.detailed-results').scrollIntoView({ behavior: 'smooth' });
    });
}

function createAnswerChart(results) {
    const ctx = document.getElementById('answerChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Correct', 'Incorrect'],
            datasets: [{
                data: [results.correctCount, results.incorrectCount],
                backgroundColor: ['#10b981', '#ef4444'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function createTimeChart(results) {
    const ctx = document.getElementById('timeChart').getContext('2d');
    
    const questionNumbers = results.results.map((r, index) => `Q${index + 1}`);
    const timeData = results.results.map(r => r.timeSpent || 0);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: questionNumbers,
            datasets: [{
                label: 'Time Spent (seconds)',
                data: timeData,
                backgroundColor: '#6366f1',
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Seconds'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Questions'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function displayDetailedResults(results) {
    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = '';
    
    results.results.forEach((result, index) => {
        const resultItem = document.createElement('div');
        resultItem.className = `result-item ${result.isCorrect ? 'correct' : 'incorrect'}`;
        
        resultItem.innerHTML = `
            <div class="result-question">
                <strong>Question ${index + 1}:</strong> ${result.question}
            </div>
            <div class="result-answer">
                <div class="result-answer-item user">
                    <strong>Your Answer:</strong> ${result.userAnswer || 'Not answered'}
                </div>
                ${!result.isCorrect ? `
                    <div class="result-answer-item correct">
                        <strong>Correct Answer:</strong> ${result.correctAnswer}
                    </div>
                ` : ''}
            </div>
            <div class="result-time">
                Time spent: ${result.timeSpent || 0} seconds
            </div>
        `;
        
        resultsList.appendChild(resultItem);
    });
}
