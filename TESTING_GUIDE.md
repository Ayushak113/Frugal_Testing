# Testing Guide for Quiz Application

This guide provides instructions for testing the Quiz Application using Selenium WebDriver.

## Prerequisites

1. **Java Development Kit (JDK)** - Version 8 or higher
2. **Eclipse IDE** or **IntelliJ IDEA**
3. **Selenium WebDriver** - Download from https://www.selenium.dev/downloads/
4. **TestNG** or **JUnit** framework
5. **ChromeDriver** or appropriate WebDriver for your browser
6. **Web Server** - PHP server running the application

## Setup Instructions

### 1. Eclipse Setup

1. Create a new Java project
2. Add Selenium JAR files to Build Path:
   - Right-click project → Properties → Java Build Path → Libraries → Add External JARs
   - Add all Selenium JAR files
   - Add TestNG library
3. Add ChromeDriver:
   - Download ChromeDriver from https://chromedriver.chromium.org/
   - Place in a known location and update path in test code
4. Copy `selenium_test_example.java` to your project

### 2. IntelliJ IDEA Setup

1. Create a new Java project
2. Add dependencies in `pom.xml` (if using Maven) or add JARs to project:
   ```xml
   <dependencies>
       <dependency>
           <groupId>org.seleniumhq.selenium</groupId>
           <artifactId>selenium-java</artifactId>
           <version>4.15.0</version>
       </dependency>
       <dependency>
           <groupId>org.testng</groupId>
           <artifactId>testng</artifactId>
           <version>7.8.0</version>
       </dependency>
   </dependencies>
   ```
3. Download ChromeDriver and update path in test code

## Test Scenarios

### Scenario 1: Verify Landing Page

**Objective**: Verify that the landing page loads correctly

**Steps**:
1. Open the quiz application URL
2. Verify the page title contains "Quiz"
3. Verify the URL contains "index.php"
4. Verify presence of category dropdown
5. Verify presence of difficulty dropdown
6. Verify presence of "Start Quiz" button

**Expected Results**:
- Page loads successfully
- All elements are visible and accessible
- URL and title are correct

### Scenario 2: Start Quiz

**Objective**: Verify that clicking "Start Quiz" loads the quiz page

**Steps**:
1. Select a category (e.g., "General Knowledge")
2. Select a difficulty level (e.g., "Easy")
3. Click "Start Quiz" button
4. Wait for quiz page to load
5. Verify first question is displayed

**Expected Results**:
- Quiz page loads
- First question text is visible
- Timer is displayed and running
- Options are displayed

### Scenario 3: Question Navigation & Answer Selection

**Objective**: Navigate through questions and select answers

**Steps**:
1. For each question:
   - Verify question text is displayed
   - Verify answer options are displayed
   - Select an answer option
   - Click "Next" button (or "Submit" for last question)
   - Wait for next question to load
2. Repeat until all questions are answered

**Example Test Data**:
- Question 1: Select option "3" (if available)
- Question 2: Select first available option
- Continue for all questions

**Expected Results**:
- Each question loads correctly
- Selected answers are highlighted
- Navigation works smoothly
- All questions can be accessed

### Scenario 4: Submit Quiz

**Objective**: Verify quiz submission functionality

**Steps**:
1. After answering all questions
2. Click "Submit Quiz" button
3. Wait for results page to load
4. Verify results page is displayed

**Expected Results**:
- Quiz submits successfully
- Results page loads
- No errors occur during submission

### Scenario 5: Score Calculation

**Objective**: Verify result analysis displays correct information

**Steps**:
1. On results page, verify:
   - Score percentage is displayed
   - Correct answer count is shown
   - Incorrect answer count is shown
   - Total questions count is shown
2. Verify calculations:
   - Correct + Incorrect = Total
   - Score percentage is calculated correctly
3. Verify charts are displayed:
   - Answer distribution chart
   - Time spent per question chart
4. Verify detailed breakdown:
   - Each question shows user answer
   - Each question shows correct answer
   - Time spent per question is shown

**Expected Results**:
- All result elements are displayed
- Calculations are accurate
- Charts render correctly
- Detailed breakdown is complete

## Running Tests

### In Eclipse:
1. Right-click on test class
2. Select "Run As" → "TestNG Test"

### In IntelliJ:
1. Right-click on test class or method
2. Select "Run" or use keyboard shortcut

### Command Line (with Maven):
```bash
mvn test
```

## Test Data

The application includes questions in the following categories:
- **General Knowledge**: Easy, Medium, Hard
- **Science**: Easy, Medium, Hard
- **History**: Easy, Medium, Hard
- **Technology**: Easy, Medium, Hard

Each category has 10-12 questions per difficulty level.

## Troubleshooting

### Common Issues:

1. **ChromeDriver version mismatch**:
   - Ensure ChromeDriver version matches your Chrome browser version
   - Download appropriate version from ChromeDriver website

2. **Element not found errors**:
   - Increase wait times
   - Verify element IDs match the application
   - Check if page has fully loaded

3. **Timeout errors**:
   - Increase WebDriverWait timeout
   - Add explicit waits for dynamic content

4. **Application not accessible**:
   - Verify web server is running
   - Check URL is correct
   - Verify PHP is properly configured

## Best Practices

1. **Use explicit waits** instead of Thread.sleep()
2. **Use meaningful test data** and assertions
3. **Clean up resources** in @AfterClass methods
4. **Use Page Object Model** for larger test suites
5. **Add screenshots** on test failures
6. **Use data-driven testing** for multiple scenarios
7. **Maintain test independence** - each test should be able to run alone

## Sample Test Output

```
Current URL: http://localhost/quiz-application/index.php
Page Title: Quiz Application - Select Your Challenge
First question: What is the capital of France?
Question 1: What is the capital of France?
Available options: 4
Selected option: Paris
Question 2: What is 2 + 2?
...
Completed 10 questions
Quiz submitted successfully
Score: 80.00%
Correct Answers: 8
Incorrect Answers: 2
Total Questions: 10
```

## Additional Test Cases

Consider adding tests for:
- Timer expiration and auto-submit
- Browser back button handling
- Page refresh during quiz
- Multiple quiz attempts
- Different category/difficulty combinations
- Mobile responsive design
- Error handling (network failures, etc.)
