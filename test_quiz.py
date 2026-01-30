"""
Selenium WebDriver Test for Quiz Application (Python)
Run this with: python test_quiz.py
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
import time

# Try to use WebDriverManager (automatic driver management)
try:
    from webdriver_manager.chrome import ChromeDriverManager
    USE_WEBDRIVER_MANAGER = True
except ImportError:
    USE_WEBDRIVER_MANAGER = False
    print("Note: Install webdriver-manager for automatic driver management: pip install webdriver-manager")

class QuizApplicationTest:
    def __init__(self):
        """Initialize WebDriver"""
        chrome_options = Options()
        # chrome_options.add_argument('--headless')  # Uncomment for headless mode
        
        if USE_WEBDRIVER_MANAGER:
            # Automatic driver management
            self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
        else:
            # Manual driver path (update this path)
            # self.driver = webdriver.Chrome(executable_path='/path/to/chromedriver', options=chrome_options)
            # Or if chromedriver is in PATH:
            self.driver = webdriver.Chrome(options=chrome_options)
        
        self.driver.maximize_window()
        self.wait = WebDriverWait(self.driver, 30)
        self.base_url = "http://localhost:8000/"
    
    def test_landing_page(self):
        """Test Scenario 1: Verify Landing Page"""
        print("\n=== Test 1: Landing Page Verification ===")
        self.driver.get(self.base_url + "index.php")
        
        current_url = self.driver.current_url
        page_title = self.driver.title
        
        print(f"Current URL: {current_url}")
        print(f"Page Title: {page_title}")
        
        assert "index.php" in current_url, "URL verification failed"
        assert "Quiz" in page_title, "Title verification failed"
        
        # Verify elements
        category_select = self.driver.find_element(By.ID, "category")
        difficulty_select = self.driver.find_element(By.ID, "difficulty")
        start_button = self.driver.find_element(By.ID, "startQuizBtn")
        
        assert category_select is not None, "Category select not found"
        assert difficulty_select is not None, "Difficulty select not found"
        assert start_button is not None, "Start button not found"
        
        print("✓ Landing page test passed\n")
        return True
    
    def test_start_quiz(self):
        """Test Scenario 2: Start Quiz"""
        print("=== Test 2: Start Quiz ===")
        start_button = self.driver.find_element(By.ID, "startQuizBtn")
        start_button.click()
        
        # Wait for quiz page to load
        self.wait.until(EC.presence_of_element_located((By.ID, "questionText")))
        
        # Wait for question text to be populated (not just "Loading question...")
        def question_loaded(driver):
            question_elem = driver.find_element(By.ID, "questionText")
            return question_elem.text and question_elem.text != "Loading question..."
        
        self.wait.until(question_loaded)
        
        question_text = self.driver.find_element(By.ID, "questionText")
        
        assert question_text is not None, "Question text not found"
        assert question_text.text != "", "Question text is empty"
        assert question_text.text != "Loading question...", "Question still loading"
        
        print(f"First question: {question_text.text}")
        print("✓ Start quiz test passed\n")
        return True
    
    def test_question_navigation(self):
        """Test Scenario 3: Question Navigation & Answer Selection"""
        print("=== Test 3: Question Navigation & Answer Selection ===")
        question_number = 1
        has_more_questions = True
        
        while has_more_questions:
            question_text = self.driver.find_element(By.ID, "questionText")
            print(f"Question {question_number}: {question_text.text}")
            
            # Get all options
            options = self.driver.find_elements(By.CLASS_NAME, "option-item")
            assert len(options) > 0, f"No options found for question {question_number}"
            
            print(f"Available options: {len(options)}")
            
            # Select first option (or specific option for question 1)
            if options:
                if question_number == 1:
                    # For question 1, try to find option "3" if it exists, otherwise first option
                    selected_option = None
                    for opt in options:
                        if "3" in opt.text or "Paris" in opt.text:
                            selected_option = opt
                            break
                    if not selected_option:
                        selected_option = options[0]
                else:
                    selected_option = options[0]
                
                option_text = selected_option.text.strip()
                selected_option.click()
                print(f"Selected option: {option_text}")
                time.sleep(0.5)
            
            # Check for next or submit button
            try:
                next_button = self.driver.find_element(By.ID, "nextBtn")
                if next_button.is_displayed() and next_button.is_enabled():
                    next_button.click()
                    question_number += 1
                    # Wait for next question to load
                    self.wait.until(EC.presence_of_element_located((By.ID, "questionText")))
                    # Wait for question text to be populated
                    def question_loaded(driver):
                        question_elem = driver.find_element(By.ID, "questionText")
                        return question_elem.text and question_elem.text != "Loading question..."
                    self.wait.until(question_loaded)
                    time.sleep(0.5)
                else:
                    has_more_questions = False
            except:
                try:
                    submit_button = self.driver.find_element(By.ID, "submitBtn")
                    if submit_button.is_displayed():
                        has_more_questions = False
                except:
                    has_more_questions = False
        
        print(f"✓ Completed {question_number} questions\n")
        return True
    
    def test_submit_quiz(self):
        """Test Scenario 4: Submit Quiz"""
        print("=== Test 4: Submit Quiz ===")
        try:
            submit_button = self.driver.find_element(By.ID, "submitBtn")
            if submit_button.is_displayed() and submit_button.is_enabled():
                submit_button.click()
                self.wait.until(EC.presence_of_element_located((By.ID, "scoreValue")))
                print("✓ Quiz submitted successfully\n")
                return True
        except Exception as e:
            print(f"Submit button not found or already submitted: {e}\n")
            return False
    
    def test_score_calculation(self):
        """Test Scenario 5: Score Calculation"""
        print("=== Test 5: Score Calculation ===")
        self.wait.until(EC.presence_of_element_located((By.ID, "scoreValue")))
        
        # Wait for results to be populated (not empty)
        def results_loaded(driver):
            try:
                score_elem = driver.find_element(By.ID, "scoreValue")
                correct_elem = driver.find_element(By.ID, "correctCount")
                return (score_elem.text and score_elem.text.strip() != "" and 
                        correct_elem.text and correct_elem.text.strip() != "")
            except:
                return False
        
        self.wait.until(results_loaded)
        time.sleep(1)  # Additional wait for any animations
        
        score_value = self.driver.find_element(By.ID, "scoreValue")
        correct_count = self.driver.find_element(By.ID, "correctCount")
        incorrect_count = self.driver.find_element(By.ID, "incorrectCount")
        total_questions = self.driver.find_element(By.ID, "totalQuestions")
        
        assert score_value is not None, "Score value not found"
        assert correct_count is not None, "Correct count not found"
        assert incorrect_count is not None, "Incorrect count not found"
        assert total_questions is not None, "Total questions not found"
        
        print(f"Score: {score_value.text}")
        print(f"Correct Answers: {correct_count.text}")
        print(f"Incorrect Answers: {incorrect_count.text}")
        print(f"Total Questions: {total_questions.text}")
        
        assert score_value.text and score_value.text.strip() != "", "Score is empty"
        assert "%" in score_value.text, "Score format incorrect"
        
        # Verify calculations
        correct = int(correct_count.text)
        incorrect = int(incorrect_count.text)
        total = int(total_questions.text)
        
        assert correct + incorrect == total, "Answer counts don't match total"
        
        print("✓ Score calculation test passed\n")
        return True
    
    def run_all_tests(self):
        """Run all test scenarios"""
        print("=" * 50)
        print("QUIZ APPLICATION SELENIUM TESTS")
        print("=" * 50)
        
        try:
            self.test_landing_page()
            self.test_start_quiz()
            self.test_question_navigation()
            self.test_submit_quiz()
            self.test_score_calculation()
            
            print("=" * 50)
            print("✅ ALL TESTS PASSED!")
            print("=" * 50)
        except AssertionError as e:
            print(f"\n❌ Test Assertion Failed: {e}")
        except Exception as e:
            print(f"\n❌ Test Error: {e}")
            import traceback
            traceback.print_exc()
        finally:
            print("\nClosing browser...")
            time.sleep(2)  # Wait to see results
            self.driver.quit()

if __name__ == "__main__":
    test = QuizApplicationTest()
    test.run_all_tests()
