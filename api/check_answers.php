<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['error' => 'Invalid JSON input: ' . json_last_error_msg()]);
    exit;
}

$category = isset($input['category']) ? $input['category'] : 'general';
$difficulty = isset($input['difficulty']) ? $input['difficulty'] : 'easy';
$userAnswers = isset($input['answers']) ? $input['answers'] : [];
$timeSpent = isset($input['timeSpent']) ? $input['timeSpent'] : [];

$questionsFile = __DIR__ . '/../data/questions.json';

if (!file_exists($questionsFile)) {
    echo json_encode(['error' => 'Questions file not found']);
    exit;
}

$allQuestions = json_decode(file_get_contents($questionsFile), true);

if (!isset($allQuestions[$category][$difficulty])) {
    echo json_encode(['error' => 'No questions found']);
    exit;
}

$allCategoryQuestions = $allQuestions[$category][$difficulty];
$results = [];
$correctCount = 0;
$incorrectCount = 0;

// Create a map of question IDs to questions for quick lookup
$questionMap = [];
foreach ($allCategoryQuestions as $question) {
    $questionMap[$question['id']] = $question;
}

// Process only the questions that user answered (those that were shown)
foreach ($userAnswers as $questionId => $userAnswer) {
    if (!isset($questionMap[$questionId])) {
        continue; // Skip if question ID not found
    }
    
    $question = $questionMap[$questionId];
    $correctAnswer = $question['correct_answer'];
    $isCorrect = ($userAnswer == $correctAnswer);
    
    if ($isCorrect) {
        $correctCount++;
    } else {
        $incorrectCount++;
    }
    
    $results[] = [
        'questionId' => $questionId,
        'question' => $question['question'],
        'userAnswer' => $userAnswer,
        'correctAnswer' => $correctAnswer,
        'isCorrect' => $isCorrect,
        'timeSpent' => isset($timeSpent[$questionId]) ? $timeSpent[$questionId] : 0
    ];
}

// Total questions is the number of questions that were shown (answered or not)
$totalQuestions = count($userAnswers);
if ($totalQuestions == 0) {
    $totalQuestions = count($results); // Fallback to results count if no answers
}
$score = $totalQuestions > 0 ? ($correctCount / $totalQuestions) * 100 : 0;

echo json_encode([
    'results' => $results,
    'correctCount' => $correctCount,
    'incorrectCount' => $incorrectCount,
    'totalQuestions' => $totalQuestions,
    'score' => round($score, 2),
    'timeSpent' => $timeSpent
]);
?>
