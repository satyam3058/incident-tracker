@REM Maven Wrapper startup script for Windows
@echo off
@setlocal

set "ERROR_CODE=0"

@REM Locate java.exe
if NOT "%JAVA_HOME%"=="" goto OkJHome
for %%i in (java.exe) do set "JAVACMD=%%~$PATH:i"
goto checkJCmd

:OkJHome
set "JAVACMD=%JAVA_HOME%\bin\java.exe"

:checkJCmd
if exist "%JAVACMD%" goto chkMWrapper
echo Java not found. Install JDK 17+ and set JAVA_HOME. >&2
goto error

:chkMWrapper
set "WRAPPER_JAR=%~dp0.mvn\wrapper\maven-wrapper.jar"
set "WRAPPER_URL=https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar"

if exist "%WRAPPER_JAR%" goto runWrapper
echo Downloading Maven Wrapper JAR...
powershell -Command "Invoke-WebRequest -Uri '%WRAPPER_URL%' -OutFile '%WRAPPER_JAR%'"
if "%ERRORLEVEL%" NEQ "0" (
    echo Failed to download Maven Wrapper.
    goto error
)

:runWrapper
set "MAVEN_PROJECTBASEDIR=%~dp0"
@REM Remove trailing backslash
if "%MAVEN_PROJECTBASEDIR:~-1%"=="\" set "MAVEN_PROJECTBASEDIR=%MAVEN_PROJECTBASEDIR:~0,-1%"

"%JAVACMD%" %MAVEN_OPTS% "-Dmaven.multiModuleProjectDirectory=%MAVEN_PROJECTBASEDIR%" -classpath "%WRAPPER_JAR%" org.apache.maven.wrapper.MavenWrapperMain %* 
if ERRORLEVEL 1 goto error
goto end

:error
set "ERROR_CODE=1"

:end
@endlocal & set "ERROR_CODE=%ERROR_CODE%"
cmd /C exit /B %ERROR_CODE%
