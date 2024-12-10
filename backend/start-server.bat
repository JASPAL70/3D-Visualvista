@echo off
SETLOCAL ENABLEDELAYEDEXPANSION

REM Find the process using port 3001
FOR /F "tokens=5" %%P IN ('netstat -aon ^| findstr :3001') DO (
  SET PID=%%P
)

REM Kill the process if it exists
IF NOT "!PID!"=="" (
  echo Killing process using port 3001: !PID!
  taskkill /PID !PID! /F
)

REM Start the server
node server.js

ENDLOCAL

