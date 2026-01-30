/*
 * Selenium WebDriver Test Example for Quiz Application
 * 
 * This is a sample test class demonstrating how to automate the quiz application
 * using Selenium WebDriver. You can use this as a reference for creating your
 * test suite in Eclipse or IntelliJ IDEA.
 * 
 * Prerequisites:
 * - Selenium WebDriver JAR files
 * - ChromeDriver or appropriate WebDriver
 * - TestNG or JUnit framework
 */

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import java.util.List;
import java.util.concurrent.TimeUnit;

// Optional: Import WebDriverManager for automatic driver management
// import io.github.bonigarcia.wdm.WebDriverManager;

public class QuizApplicationTest {
    
    private WebDriver driver;
    private WebDriverWait wait;
    private String baseUrl = "http://localhost:8000/"; // Update with your URL
    
    @BeforeClass
    public void setUp() {
        // Option 1: Using WebDriverManager (Recommended - automatically downloads driver)
        // Uncomment these lines if you added WebDriverManager dependency:
        // WebDriverManager.chromedriver().setup();
        // driver = new ChromeDriver();
        
        // Option 2: Manual ChromeDriver setup
        // Update the path to your ChromeDriver location
        System.setProperty("webdriver.chrome.driver", "/usr/local/bin/chromedriver");
        // Or if ChromeDriver is in your PATH, you can skip the line above
        
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        wait = new WebDriverWait(driver, 30);
    }
    
    @Test(priority = 1)
    public void testLandingPage() {
        // Test Scenario 1: Verify Landing Page
        driver.get(baseUrl + "index.php");
        
        // Verify URL and Title
        String currentUrl = driver.getCurrentUrl();
        String pageTitle = driver.getTitle();
        
        System.out.println("Current URL: " + currentUrl);
        System.out.println("Page Title: " + pageTitle);
        
        Assert.assertTrue(currentUrl.contains("index.php"), "URL verification failed");
        Assert.assertTrue(pageTitle.contains("Quiz"), "Title verification failed");
        
        // Verify page elements
        WebElement categorySelect = driver.findElement(By.id("category"));
        WebElement difficultySelect = driver.findElement(By.id("difficulty"));
        WebElement startButton = driver.findElement(By.id("startQuizBtn"));
        
        Assert.assertNotNull(categorySelect, "Category select not found");
        Assert.assertNotNull(difficultySelect, "Difficulty select not found");
        Assert.assertNotNull(startButton, "Start button not found");
    }
    
    @Test(priority = 2)
    public void testStartQuiz() {
        // Test Scenario 2: Start Quiz
        WebElement startButton = driver.findElement(By.id("startQuizBtn"));
        startButton.click();
        
        // Wait for quiz page to load
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("questionText")));
        
        // Verify first question is displayed
        WebElement questionText = driver.findElement(By.id("questionText"));
        Assert.assertNotNull(questionText, "Question text not found");
        Assert.assertFalse(questionText.getText().isEmpty(), "Question text is empty");
        
        System.out.println("First question: " + questionText.getText());
    }
    
    @Test(priority = 3)
    public void testQuestionNavigationAndAnswerSelection() {
        // Test Scenario 3: Question Navigation & Answer Selection
        
        int questionNumber = 1;
        boolean hasMoreQuestions = true;
        
        while (hasMoreQuestions) {
            // Verify question text and options
            WebElement questionText = driver.findElement(By.id("questionText"));
            System.out.println("Question " + questionNumber + ": " + questionText.getText());
            
            // Get all option elements
            List<WebElement> options = driver.findElements(By.className("option-item"));
            Assert.assertFalse(options.isEmpty(), "No options found for question " + questionNumber);
            
            System.out.println("Available options: " + options.size());
            
            // Select the first option (or any specific option)
            // Example: For question 1, select answer option "3" (if it exists)
            // For this example, we'll select the first available option
            if (!options.isEmpty()) {
                WebElement firstOption = options.get(0);
                String optionText = firstOption.getText().trim();
                firstOption.click();
                
                System.out.println("Selected option: " + optionText);
                
                // Wait a moment for selection to register
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            
            // Check if there's a next button or submit button
            WebElement nextButton = null;
            WebElement submitButton = null;
            
            try {
                nextButton = driver.findElement(By.id("nextBtn"));
                if (nextButton.isDisplayed() && nextButton.isEnabled()) {
                    nextButton.click();
                    questionNumber++;
                    
                    // Wait for next question to load
                    wait.until(ExpectedConditions.presenceOfElementLocated(By.id("questionText")));
                    try {
                        Thread.sleep(1000); // Wait for question to load
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                } else {
                    hasMoreQuestions = false;
                }
            } catch (Exception e) {
                // Next button not found, check for submit button
                try {
                    submitButton = driver.findElement(By.id("submitBtn"));
                    if (submitButton.isDisplayed()) {
                        hasMoreQuestions = false;
                    }
                } catch (Exception ex) {
                    hasMoreQuestions = false;
                }
            }
        }
        
        System.out.println("Completed " + questionNumber + " questions");
    }
    
    @Test(priority = 4)
    public void testSubmitQuiz() {
        // Test Scenario 4: Submit Quiz
        try {
            WebElement submitButton = driver.findElement(By.id("submitBtn"));
            if (submitButton.isDisplayed() && submitButton.isEnabled()) {
                submitButton.click();
                
                // Wait for results page to load
                wait.until(ExpectedConditions.presenceOfElementLocated(By.id("scoreValue")));
                
                System.out.println("Quiz submitted successfully");
            }
        } catch (Exception e) {
            System.out.println("Submit button not found or already submitted");
        }
    }
    
    @Test(priority = 5)
    public void testScoreCalculation() {
        // Test Scenario 5: Score Calculation
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("scoreValue")));
        
        // Verify result analysis page displays
        WebElement scoreValue = driver.findElement(By.id("scoreValue"));
        WebElement correctCount = driver.findElement(By.id("correctCount"));
        WebElement incorrectCount = driver.findElement(By.id("incorrectCount"));
        WebElement totalQuestions = driver.findElement(By.id("totalQuestions"));
        
        Assert.assertNotNull(scoreValue, "Score value not found");
        Assert.assertNotNull(correctCount, "Correct count not found");
        Assert.assertNotNull(incorrectCount, "Incorrect count not found");
        Assert.assertNotNull(totalQuestions, "Total questions not found");
        
        // Print results
        System.out.println("Score: " + scoreValue.getText());
        System.out.println("Correct Answers: " + correctCount.getText());
        System.out.println("Incorrect Answers: " + incorrectCount.getText());
        System.out.println("Total Questions: " + totalQuestions.getText());
        
        // Verify score is displayed
        String score = scoreValue.getText();
        Assert.assertFalse(score.isEmpty(), "Score is empty");
        Assert.assertTrue(score.contains("%"), "Score format incorrect");
        
        // Verify counts are numeric
        int correct = Integer.parseInt(correctCount.getText());
        int incorrect = Integer.parseInt(incorrectCount.getText());
        int total = Integer.parseInt(totalQuestions.getText());
        
        Assert.assertEquals(correct + incorrect, total, "Answer counts don't match total");
    }
    
    @AfterClass
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
