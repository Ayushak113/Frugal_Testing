# Quick Start: Selenium WebDriver in 5 Minutes

## 🚀 Fastest Way: Python (Recommended for Beginners)

### Step 1: Install Python and Selenium
```bash
# Install Python (if not already installed)
# Then install Selenium
pip install selenium webdriver-manager
```

### Step 2: Run the Test
```bash
# Make sure your quiz app is running on http://localhost:8000
# Then run:
python test_quiz.py
```

**That's it!** The test will automatically:
- Download ChromeDriver
- Open browser
- Run all 5 test scenarios
- Show results

---

## ☕ Java with Eclipse/IntelliJ

### Step 1: Create Maven Project

**In Eclipse:**
1. File → New → Maven Project
2. Use `pom.xml` from this project
3. Right-click project → Maven → Update Project

**In IntelliJ:**
1. File → New → Project → Maven
2. Copy `pom.xml` content
3. Maven will auto-download dependencies

### Step 2: Copy Test File

1. Copy `selenium_test_example.java` to `src/test/java/`
2. Update `baseUrl` if needed (default: `http://localhost:8000/`)

### Step 3: Run Tests

**Eclipse:**
- Right-click test class → Run As → TestNG Test

**IntelliJ:**
- Right-click test class → Run 'QuizApplicationTest'
- Or click green arrow next to test method

**Command Line:**
```bash
mvn test
```

---

## 📋 What Each Test Does

1. **testLandingPage()** - Verifies the home page loads correctly
2. **testStartQuiz()** - Clicks "Start Quiz" and verifies first question appears
3. **testQuestionNavigation()** - Answers all questions and navigates through them
4. **testSubmitQuiz()** - Submits the quiz
5. **testScoreCalculation()** - Verifies results page shows correct score

---

## 🔧 Troubleshooting

### "ChromeDriver not found"
**Solution:** Use WebDriverManager (included in `pom.xml` and `test_quiz.py`)

### "Element not found"
**Solution:** Make sure quiz app is running on `http://localhost:8000`

### "Connection refused"
**Solution:** Start PHP server: `php -S localhost:8000` in project directory

---

## 📚 Full Documentation

- **SELENIUM_SETUP_GUIDE.md** - Complete setup instructions
- **TESTING_GUIDE.md** - Detailed test scenarios
- **selenium_test_example.java** - Java test code
- **test_quiz.py** - Python test code

---

## 🎯 Next Steps

1. ✅ Run the basic tests
2. ✅ Customize test data
3. ✅ Add more test scenarios
4. ✅ Integrate with CI/CD

Happy Testing! 🎉
