#!/bin/bash

echo "=========================================="
echo "Selenium Test Setup Script"
echo "=========================================="
echo ""

# Check if Python virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
    echo "✓ Virtual environment created"
fi

# Activate virtual environment and install dependencies
echo ""
echo "Installing Python dependencies..."
source venv/bin/activate
pip install --upgrade pip --quiet
pip install selenium webdriver-manager --quiet
echo "✓ Python dependencies installed"

# Check if Maven is available for Java setup
if command -v mvn &> /dev/null; then
    echo ""
    echo "Maven detected. Java setup available."
    echo "To set up Java tests:"
    echo "  1. Create Maven project in Eclipse/IntelliJ"
    echo "  2. Copy pom.xml to your project"
    echo "  3. Copy selenium_test_example.java to src/test/java/"
else
    echo ""
    echo "Maven not found. Java setup skipped."
    echo "Install Maven to use Java tests: sudo apt install maven"
fi

echo ""
echo "=========================================="
echo "Setup Complete!"
echo "=========================================="
echo ""
echo "To run Python tests:"
echo "  source venv/bin/activate"
echo "  python3 test_quiz.py"
echo ""
echo "Make sure your quiz app is running:"
echo "  php -S localhost:8000"
echo ""
