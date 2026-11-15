@echo off
:: ============================================================================
:: DCPROSENS OPTIMIZER ENGINE v1.0 - ELEVATION & LAUNCHER
:: Esports Precision Architecture | Ultra-Low Latency Suite
:: ============================================================================
title DCPROSENS Optimizer Engine Launcher
color 0A

:: Check for Administrative privileges
net session >nul 2>&1
if %errorLevel% == 0 (
    goto :RunOptimizer
) else (
    echo.
    echo ============================================================================
    echo  [DCPROSENS] Solicitando privilegios de Administrador para otimizacao...
    echo ============================================================================
    echo.
    powershell -Command "Start-Process cmd -ArgumentList '/c \"\"%~dpnx0\"\"' -Verb RunAs"
    exit /b
)

:RunOptimizer
cd /d "%~dp0"
echo.
echo ============================================================================
echo   DCPROSENS OPTIMIZER ENGINE v1.0 - INICIALIZANDO INTERFACE GRAFICA...
echo ============================================================================
echo.
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0DCPROSENS-Optimizer.ps1"
exit
