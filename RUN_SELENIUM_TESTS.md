# How to Run Selenium Tests

## 🐍 Python Tests (Easiest - Already Set Up!)

### Quick Run:
```bash
# 1. Make sure quiz app is running
php -S localhost:8000

# 2. In another terminal, run tests
cd "/home/prince-verma/1. Dynamic Quiz Application with Timer and Result Analysis"
source venv/bin/activate
python3 test_quiz.py
```

### What You'll See:
- Browser opens automatically
- Tests run through all 5 scenarios
- Results printed in terminal
- Browser closes automatically

---

## ☕ Java Tests (Eclipse/IntelliJ)

### Option 1: Eclipse Setup

1. **Create New Project:**
   - File → New → Java Project
   - Name: `QuizApplicationTests`
   - Click Finish

2. **Add Maven Support:**
   - Right-click project → Configure → Convert to Maven Project
   - Copy content from `pom.xml` in this project
   - Right-click → Maven → Update Project

3. **Add Test File:**
   - Create folder: `src/test/java`
   - Copy `selenium_test_example.java` to that folder
   - Update package name if needed

4. **Run Tests:**
   - Right-click test class → Run As → TestNG Test

### Option 2: IntelliJ IDEA Setup

1. **Create New Project:**
   - File → New → Project
   - Select "Maven"
   - Click Next → Finish

2. **Add Dependencies:**
   - Open `pom.xml`
   - Copy content from `pom.xml` in this project
   - Maven will auto-download dependencies

3. **Add Test File:**
   - Create: `src/test/java/com/quiz/QuizApplicationTest.java`
   - Copy content from `selenium_test_example.java`

4. **Run Tests:**
   - Right-click test class → Run 'QuizApplicationTest'
   - Or click green arrow next to test method

---

## 📝 Test Scenarios Covered

1. **Landing Page Test**
   - Verifies URL and page title
   - Checks all UI elements are present

2. **Start Quiz Test**
   - Clicks "Start Quiz" button
   - Verifies first question loads

3. **Question Navigation Test**
   - Answers all 10 questions
   - Navigates through questions
   - Verifies options are clickable

4. **Submit Quiz Test**
   - Clicks submit button
   - Verifies results page loads

5. **Score Calculation Test**
   - Verifies score is displayed
   - Checks correct/incorrect counts
   - Validates calculations

---

## 🔧 Troubleshooting

### Python Tests

**Issue: "ModuleNotFoundError: No module named 'selenium'"**
```bash
source venv/bin/activate
pip install selenium webdriver-manager
```

**Issue: "ChromeDriver not found"**
- WebDriverManager will download it automatically
- Or download manually from: https://chromedriver.chromium.org/

**Issue: "Connection refused"**
```bash
# Make sure quiz app is running
php -S localhost:8000
```

### Java Tests

**Issue: "TestNG not found"**
- Make sure `pom.xml` includes TestNG dependency
- Right-click project → Maven → Update Project

**Issue: "ChromeDriver not found"**
- Add WebDriverManager dependency to `pom.xml`
- Or set path: `System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver")`

---

## 🎯 Customizing Tests

### Change Test URL:
Edit `baseUrl` in test file:
```python
self.base_url = "http://localhost:8000/"
```

### Add More Test Cases:
Add new test methods following the same pattern:
```python
def test_custom_scenario(self):
    """Your custom test"""
    # Your test code here
    pass
```

### Run Specific Test:
```python
# In Python, comment out other tests
# In Java, right-click specific test method → Run
```

---

## 📊 Test Results

After running tests, you'll see:
- ✓ Passed tests
- ❌ Failed tests with error messages
- Summary of all test results

---

## 🚀 Next Steps

1. ✅ Run basic tests
2. ✅ Customize test data
3. ✅ Add more scenarios
4. ✅ Integrate with CI/CD (Jenkins, GitHub Actions, etc.)

Happy Testing! 🎉
