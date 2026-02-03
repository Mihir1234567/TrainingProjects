#!/bin/bash

BASE_URL="http://localhost:5001/api"
TIMESTAMP=$(date +%s)
EMAIL="testuser_${TIMESTAMP}@example.com"
PASSWORD="password123"
NAME="API Tester"

echo "----------------------------------------"
echo "Starting Backend Integration Test"
echo "----------------------------------------"

# 1. Register
echo "[1] Testing Registration..."
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"$NAME\", \"email\":\"$EMAIL\", \"password\":\"$PASSWORD\", \"role\":\"candidate\"}")

if [[ $REGISTER_RESPONSE == *"token"* ]]; then
  echo "✅ Registration Successful"
else
  echo "❌ Registration Failed: $REGISTER_RESPONSE"
  exit 1
fi

# Extract Token (Simple grep hack for bash, assuming clean json)
TOKEN=$(echo $REGISTER_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

# 2. Login (Double Check)
echo "[2] Testing Login..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\", \"password\":\"$PASSWORD\"}")

if [[ $LOGIN_RESPONSE == *"token"* ]]; then
    echo "✅ Login Successful"
else
    echo "❌ Login Failed: $LOGIN_RESPONSE"
    exit 1
fi

# 3. Upload Resume
echo "[3] Testing File Upload..."
# Ensure a dummy file exists (using .pdf extension to satisfy backend validation)
echo "Dummy Resume Content" > dummy_resume.pdf

UPLOAD_RESPONSE=$(curl -s -X POST "$BASE_URL/upload" \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@dummy_resume.pdf")

if [[ $UPLOAD_RESPONSE == *"/uploads/"* ]]; then
    echo "✅ File Upload Successful. Path: $UPLOAD_RESPONSE"
else
    echo "❌ File Upload Failed: $UPLOAD_RESPONSE"
    exit 1
fi

echo "----------------------------------------"
echo "🎉 ALL BACKEND TESTS PASSED"
echo "----------------------------------------"
