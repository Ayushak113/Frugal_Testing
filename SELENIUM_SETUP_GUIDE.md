# Complete Selenium WebDriver Setup Guide

This guide will help you set up and run Selenium WebDriver tests for the Quiz Application.

## Option 1: Java with Eclipse/IntelliJ IDEA

### Prerequisites

1. **Java JDK 8 or higher** - Download from [Oracle](https://www.oracle.com/java/technologies/downloads/) or [OpenJDK](https://openjdk.org/)
2. **Eclipse IDE** or **IntelliJ IDEA**
3. **Chrome Browser** (or Firefox/Edge)
4. **ChromeDriver** - Download from [ChromeDriver Downloads](https://chromedriver.chromium.org/downloads)

### Step 1: Install Java

**Check if Java is installed:**
```bash
java -version
javac -version
```

If not installed, download and install JDK.

### Step 2: Setup Project in Eclipse

#### A. Create New Java Project

1. Open Eclipse IDE
2. File → New → Java Project
3. Name: `QuizApplicationTests`
4. Click Finish

#### B. Add Selenium JAR Files

**Method 1: Download JARs manually**

1. Download Selenium Java Client from: https://www.selenium.dev/downloads/
   - Download "Java" version (e.g., selenium-java-4.15.0.zip)
2. Extract the zip file
3. In Eclipse:
   - Right-click project → Properties
   - Java Build Path → Libraries tab
   - Click "Add External JARs"
   - Navigate to extracted folder and add ALL JARs from:
     - `libs/` folder
     - Root folder (selenium-java-*.jar)
4. Download TestNG:
   - Go to https://testng.org/doc/download.html
   - Download TestNG JAR
   - Add to project Build Path

**Method 2: Use Maven (Recommended)**

1. Right-click project → Configure → Convert to Maven Project
2. Edit `pom.xml`:
```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
    http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <groupId>com.quiz</groupId>
    <artifactId>quiz-tests</artifactId>
    <version>1.0</version>
    
    <properties>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>
    
    <dependencies>
        <!-- Selenium WebDriver -->
        <dependency>
            <groupId>org.seleniumhq.selenium</groupId>
            <artifactId>selenium-java</artifactId>
            <version>4.15.0</version>
        </dependency>
        
        <!-- TestNG -->
        <dependency>
            <groupId>org.testng</groupId>
            <artifactId>testng</artifactId>
            <version>7.8.0</version>
        </dependency>
        
        <!-- WebDriverManager (automatically manages drivers) -->
        <dependency>
            <groupId>io.github.bonigarcia</groupId>
            <artifactId>webdrivermanager</artifactId>
            <version>5.6.2</version>
        </dependency>
    </dependencies>
</project>
```

3. Right-click project → Maven → Update Project

### Step 3: Download ChromeDriver

1. Check your Chrome version:
   - Open Chrome → Settings → About Chrome
   - Note the version number

2. Download matching ChromeDriver:
   - Visit: https://chromedriver.chromium.org/downloads
   - Download version matching your Chrome
   - Extract `chromedriver` (Linux) or `chromedriver.exe` (Windows)

3. **Option A: Add to PATH**
   ```bash
   # Linux/Mac
   sudo mv chromedriver /usr/local/bin/
   sudo chmod +x /usr/local/bin/chromedriver
   
   # Windows
   # Add chromedriver.exe folder to System PATH
   ```

   **Option B: Use WebDriverManager (Easier)**
   - If using Maven with WebDriverManager dependency, you don't need to download manually!

### Step 4: Create Test Class

1. In Eclipse, right-click `src` folder → New → Class
2. Name: `QuizApplicationTest`
3. Copy content from `selenium_test_example.java`
4. Update the `baseUrl`:
   ```java
   private String baseUrl = "http://localhost:8000/";
   ```

5. **If using WebDriverManager**, update `setUp()` method:
   ```java
   @BeforeClass
   public void setUp() {
       // WebDriverManager automatically downloads and sets up ChromeDriver
       WebDriverManager.chromedriver().setup();
       
       driver = new ChromeDriver();
       driver.manage().window().maximize();
       driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
       wait = new WebDriverWait(driver, 30);
   }
   ```

   **If NOT using WebDriverManager**, update path:
   ```java
   @BeforeClass
   public void setUp() {
       // Update this path to your ChromeDriver location
       System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");
       
       driver = new ChromeDriver();
       driver.manage().window().maximize();
       driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
       wait = new WebDriverWait(driver, 30);
   }
   ```

### Step 5: Run Tests

1. Right-click on test class → Run As → TestNG Test
2. Or right-click on specific test method → Run As → TestNG Test

---

## Option 2: Python with PyCharm/VS Code

### Prerequisites

1. **Python 3.7+** - Download from [python.org](https://www.python.org/downloads/)
2. **pip** (comes with Python)

### Step 1: Install Selenium

```bash
pip install selenium
```

### Step 2: Install WebDriver Manager (Optional but Recommended)

```bash
pip install webdriver-manager
```

### Step 3: Download ChromeDriver

Same as Java option, or use webdriver-manager (automatic).

### Step 4: Create Test File

Create `test_quiz.py`:

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time

class QuizApplicationTest:
    def __init__(self):
        # Using WebDriverManager (automatic driver management)
        self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
        self.driver.maximize_window()
        self.wait = WebDriverWait(self.driver, 30)
        self.base_url = "http://localhost:8000/"
    
    def test_landing_page(self):
        """Test Scenario 1: Verify Landing Page"""
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
        
        print("✓ Landing page test passed")
    
    def test_start_quiz(self):
        """Test Scenario 2: Start Quiz"""
        start_button = self.driver.find_element(By.ID, "startQuizBtn")
        start_button.click()
        
        # Wait for quiz page
        question_text = self.wait.until(
            EC.presence_of_element_located((By.ID, "questionText"))
        )
        
        assert question_text is not None, "Question text not found"
        assert question_text.text != "", "Question text is empty"
        
        print(f"First question: {question_text.text}")
        print("✓ Start quiz test passed")
    
    def test_question_navigation(self):
        """Test Scenario 3: Question Navigation & Answer Selection"""
        question_number = 1
        has_more_questions = True
        
        while has_more_questions:
            question_text = self.driver.find_element(By.ID, "questionText")
            print(f"Question {question_number}: {question_text.text}")
            
            # Get all options
            options = self.driver.find_elements(By.CLASS_NAME, "option-item")
            assert len(options) > 0, f"No options found for question {question_number}"
            
            # Select first option
            if options:
                first_option = options[0]
                option_text = first_option.text.strip()
                first_option.click()
                print(f"Selected option: {option_text}")
                time.sleep(0.5)
            
            # Check for next or submit button
            try:
                next_button = self.driver.find_element(By.ID, "nextBtn")
                if next_button.is_displayed() and next_button.is_enabled():
                    next_button.click()
                    question_number += 1
                    self.wait.until(EC.presence_of_element_located((By.ID, "questionText")))
                    time.sleep(1)
                else:
                    has_more_questions = False
            except:
                try:
                    submit_button = self.driver.find_element(By.ID, "submitBtn")
                    if submit_button.is_displayed():
                        has_more_questions = False
                except:
                    has_more_questions = False
        
        print(f"✓ Completed {question_number} questions")
    
    def test_submit_quiz(self):
        """Test Scenario 4: Submit Quiz"""
        try:
            submit_button = self.driver.find_element(By.ID, "submitBtn")
            if submit_button.is_displayed() and submit_button.is_enabled():
                submit_button.click()
                self.wait.until(EC.presence_of_element_located((By.ID, "scoreValue")))
                print("✓ Quiz submitted successfully")
        except Exception as e:
            print(f"Submit button not found or already submitted: {e}")
    
    def test_score_calculation(self):
        """Test Scenario 5: Score Calculation"""
        self.wait.until(EC.presence_of_element_located((By.ID, "scoreValue")))
        
        score_value = self.driver.find_element(By.ID, "scoreValue")
        correct_count = self.driver.find_element(By.ID, "correctCount")
        incorrect_count = self.driver.find_element(By.ID, "incorrectCount")
        total_questions = self.driver.find_element(By.ID, "totalQuestions")
        
        assert score_value is not None, "Score value not found"
        assert correct_count is not None, "Correct count not found"
        
        print(f"Score: {score_value.text}")
        print(f"Correct Answers: {correct_count.text}")
        print(f"Incorrect Answers: {incorrect_count.text}")
        print(f"Total Questions: {total_questions.text}")
        
        assert "%" in score_value.text, "Score format incorrect"
        print("✓ Score calculation test passed")
    
    def run_all_tests(self):
        """Run all test scenarios"""
        try:
            self.test_landing_page()
            self.test_start_quiz()
            self.test_question_navigation()
            self.test_submit_quiz()
            self.test_score_calculation()
            print("\n✅ All tests passed!")
        except Exception as e:
            print(f"\n❌ Test failed: {e}")
        finally:
            self.driver.quit()

if __name__ == "__main__":
    test = QuizApplicationTest()
    test.run_all_tests()
```

### Step 5: Run Python Tests

```bash
python test_quiz.py
```

---

## Quick Start: Using WebDriverManager (Easiest Method)

### Java with WebDriverManager

1. Add to `pom.xml`:
```xml
<dependency>
    <groupId>io.github.bonigarcia</groupId>
    <artifactId>webdrivermanager</artifactId>
    <version>5.6.2</version>
</dependency>
```

2. Update `setUp()` method:
```java
import io.github.bonigarcia.wdm.WebDriverManager;

@BeforeClass
public void setUp() {
    WebDriverManager.chromedriver().setup(); // Automatically downloads driver
    driver = new ChromeDriver();
    // ... rest of setup
}
```

### Python with WebDriver Manager

```bash
pip install webdriver-manager
```

```python
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
```

---

## Common Issues & Solutions

### Issue 1: ChromeDriver version mismatch

**Solution:** Use WebDriverManager (automatically handles version matching)

### Issue 2: "chromedriver not found"

**Solution:** 
- Add ChromeDriver to PATH, OR
- Use WebDriverManager, OR
- Update path in code: `System.setProperty("webdriver.chrome.driver", "/full/path/to/chromedriver")`

### Issue 3: Tests run too fast (elements not loaded)

**Solution:** Use explicit waits:
```java
WebDriverWait wait = new WebDriverWait(driver, 30);
wait.until(ExpectedConditions.presenceOfElementLocated(By.id("elementId")));
```

### Issue 4: "Element not clickable"

**Solution:** Wait for element to be clickable:
```java
wait.until(ExpectedConditions.elementToBeClickable(By.id("buttonId")));
```

---

## Running Tests from Command Line

### Java (Maven)

```bash
mvn test
```

### Python

```bash
python test_quiz.py
```

---

## Test Reports

### TestNG Reports (Java)

After running tests in Eclipse/IntelliJ, TestNG generates HTML reports in `test-output/` folder.

### Pytest Reports (Python)

```bash
pip install pytest pytest-html
pytest test_quiz.py --html=report.html
```

---

## Next Steps

1. ✅ Set up Selenium WebDriver
2. ✅ Run the provided test example
3. ✅ Customize tests for your needs
4. ✅ Add more test scenarios
5. ✅ Integrate with CI/CD pipeline

For detailed test scenarios, see `TESTING_GUIDE.md`
