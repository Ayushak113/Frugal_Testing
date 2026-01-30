<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

$category = isset($_GET['category']) ? $_GET['category'] : 'general';
$difficulty = isset($_GET['difficulty']) ? $_GET['difficulty'] : 'easy';

$questionsFile = __DIR__ . '/../data/questions.json';

if (!file_exists($questionsFile)) {
    echo json_encode(['error' => 'Questions file not found']);
    exit;
}

$allQuestions = json_decode(file_get_contents($questionsFile), true);

if (!isset($allQuestions[$category][$difficulty])) {
    echo json_encode(['error' => 'No questions found for selected category and difficulty']);
    exit;
}

$questions = $allQuestions[$category][$difficulty];

// Shuffle questions and limit to 10
shuffle($questions);
$questions = array_slice($questions, 0, 10);

// Remove correct_answer from response for security
foreach ($questions as &$question) {
    unset($question['correct_answer']);
}

echo json_encode(['questions' => $questions]);
?>
