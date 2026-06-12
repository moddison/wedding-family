@echo off
setlocal

cd /d "%~dp0"

echo Stopping old local site processes on port 5173...
for /f "tokens=5" %%P in ('netstat -ano ^| findstr ":5173" ^| findstr "LISTENING"') do (
  taskkill /PID %%P /F >nul 2>nul
)

if not exist node_modules (
  echo Installing dependencies...
  call npm install
)

echo Starting wedding invite at http://127.0.0.1:5173
start "" http://127.0.0.1:5173
call npm run dev -- --port 5173

endlocal
