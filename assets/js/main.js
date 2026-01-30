document.addEventListener('DOMContentLoaded', function() {
    const startQuizBtn = document.getElementById('startQuizBtn');
    const categorySelect = document.getElementById('category');
    const difficultySelect = document.getElementById('difficulty');
    
    startQuizBtn.addEventListener('click', function() {
        const category = categorySelect.value;
        const difficulty = difficultySelect.value;
        
        // Store selections in sessionStorage
        sessionStorage.setItem('quizCategory', category);
        sessionStorage.setItem('quizDifficulty', difficulty);
        
        // Redirect to quiz page
        window.location.href = 'quiz.php';
    });
    
    // Add some interactivity
    const selects = document.querySelectorAll('.select-input');
    selects.forEach(select => {
        select.addEventListener('change', function() {
            this.style.borderColor = '#6366f1';
        });
    });
});
