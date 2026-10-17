@echo off
setlocal EnableExtensions
cd /d "%~dp0"

set "VENV_DIR=venv"
set "MSG=%~1"
if "%MSG%"=="" set "MSG=Collapsible sidebar and instant navigation"

echo ==================================================
echo  MkDocs end-to-end deploy
echo ==================================================

REM ---------- 1. Prerequisites ----------
echo.
echo [1/7] Checking prerequisites...
where python >nul 2>&1
if errorlevel 1 goto :no_python
where git >nul 2>&1
if errorlevel 1 goto :no_git
if not exist "mkdocs.yml" goto :no_mkdocs

REM ---------- 2. Virtual environment ----------
echo.
echo [2/7] Checking virtual environment...
if exist "%VENV_DIR%\Scripts\activate.bat" goto :venv_ready
echo     Not found. Creating "%VENV_DIR%"...
python -m venv "%VENV_DIR%"
if errorlevel 1 goto :fail
:venv_ready
call "%VENV_DIR%\Scripts\activate.bat"
if errorlevel 1 goto :fail
echo     Activated: %VIRTUAL_ENV%

REM ---------- 3. Dependencies ----------
echo.
echo [3/7] Checking dependencies...
if exist "requirements.txt" goto :install_reqs
python -m mkdocs --version >nul 2>&1
if not errorlevel 1 goto :deps_ready
echo     Installing mkdocs and mkdocs-material...
python -m pip install --upgrade pip
python -m pip install mkdocs mkdocs-material
if errorlevel 1 goto :fail
goto :deps_ready
:install_reqs
echo     Installing from requirements.txt...
python -m pip install -r requirements.txt
if errorlevel 1 goto :fail
:deps_ready

REM ---------- 4. Git repository ----------
echo.
echo [4/7] Checking Git repository...
if exist ".git" goto :git_ready
echo     No repo found. Initializing...
git init -b main >nul 2>&1
if errorlevel 1 git init
if errorlevel 1 goto :fail
:git_ready

REM .gitignore so venv/ and site/ are never committed
if not exist ".gitignore" goto :make_ignore
findstr /b /c:"%VENV_DIR%/" ".gitignore" >nul 2>&1
if errorlevel 1 echo %VENV_DIR%/>>".gitignore"
findstr /b /c:"site/" ".gitignore" >nul 2>&1
if errorlevel 1 echo site/>>".gitignore"
goto :ignore_done
:make_ignore
echo %VENV_DIR%/>".gitignore"
echo site/>>".gitignore"
echo __pycache__/>>".gitignore"
:ignore_done

REM ---------- Remote check (create GitHub repo if needed) ----------
git remote get-url origin >nul 2>&1
if not errorlevel 1 goto :remote_ready

echo     No remote "origin" configured.
where gh >nul 2>&1
if errorlevel 1 goto :manual_remote

REM --- GitHub CLI login ---
gh auth status >nul 2>&1
if not errorlevel 1 goto :gh_authed
echo     Logging in to GitHub...
gh auth login
if errorlevel 1 goto :fail
:gh_authed
gh auth setup-git >nul 2>&1

REM --- Repo name = project folder name ---
for %%I in (.) do set "REPO_NAME=%%~nxI"
set "GH_USER="
for /f "delims=" %%U in ('gh api user --jq .login') do set "GH_USER=%%U"
if "%GH_USER%"=="" goto :fail

REM --- Does the repo already exist on GitHub? ---
gh repo view "%GH_USER%/%REPO_NAME%" >nul 2>&1
if not errorlevel 1 goto :repo_exists

echo     Repo "%GH_USER%/%REPO_NAME%" not found. Creating...
set "VIS=public"
set "VIS_IN="
set /p VIS_IN="    Visibility [public/private] (default public): "
if /i "%VIS_IN%"=="private" set "VIS=private"
gh repo create "%REPO_NAME%" --%VIS% --source=. --remote=origin
if errorlevel 1 goto :fail
goto :remote_ready

:repo_exists
echo     Repo exists on GitHub. Linking as origin...
git remote add origin "https://github.com/%GH_USER%/%REPO_NAME%.git"
if errorlevel 1 goto :fail
goto :remote_ready

:manual_remote
echo     GitHub CLI (gh) not installed. Falling back to manual URL.
echo     Tip: install it with  winget install GitHub.cli
set "REPO_URL="
set /p REPO_URL="    Paste GitHub repo URL (e.g. https://github.com/user/repo.git): "
if "%REPO_URL%"=="" goto :fail
git remote add origin "%REPO_URL%"
if errorlevel 1 goto :fail
:remote_ready

REM ---------- 5. Add + Commit ----------
echo.
echo [5/7] Staging and committing...
git add .
if errorlevel 1 goto :fail
git diff --cached --quiet
if not errorlevel 1 goto :nothing_to_commit
git commit -m "%MSG%"
if errorlevel 1 goto :fail
goto :push_step
:nothing_to_commit
echo     Nothing new to commit. Continuing...

REM ---------- 6. Push ----------
:push_step
echo.
echo [6/7] Pushing to origin...
git push -u origin HEAD
if errorlevel 1 goto :fail

REM ---------- 7. Deploy ----------
echo.
echo [7/7] Deploying to GitHub Pages...
python -m mkdocs gh-deploy
if errorlevel 1 goto :fail

echo.
echo ==================================================
echo  SUCCESS: pushed and deployed.
echo ==================================================
pause
exit /b 0

:no_python
echo ERROR: Python not found in PATH.
goto :fail
:no_git
echo ERROR: Git not found in PATH.
goto :fail
:no_mkdocs
echo ERROR: mkdocs.yml not found. Put this script in the project root.
goto :fail

:fail
echo.
echo ==================================================
echo  FAILED: check the messages above.
echo ==================================================
pause
exit /b 1
