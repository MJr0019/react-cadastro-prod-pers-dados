@echo off
@REM cls
echo "==============  Instalando Dependencias do Projeto =============="
echo "" >nul
echo "" >nul
if exist "./node_modules" ( rmdir /s/q "./node_modules" ) else ( echo >nul )
echo "" >nul
call npm install
echo "" >nul
echo "" >nul
echo "==============  Dependencias Instaladas com Sucesso =============="
echo "" >nul
echo "" >nul