!define MUI_PAGE_DEBUG
!include "LogicLib.nsh"

!macro customWelcomePage
  DetailPrint "Starting Welcome Page setup..."
  !insertMacro skipPageIfUpdated
  DetailPrint "Skipping Welcome Page if updated..."
  !insertMacro MUI_PAGE_WELCOME
  DetailPrint "Welcome Page setup complete."
!macroend

Function WriteToLogFile
  !define NSIS_CONFIG_LOG
  LogSet on
  StrCpy $0 "$INSTDIR\installer-log.txt"
  FileOpen $1 $0 "a"
  FileWrite $1 "$R0$\n"
  FileClose $1
FunctionEnd

Section "UpdateSection"
  !define NSIS_CONFIG_LOG
  LogSet on
  DetailPrint "Beginning update process..."
  StrCpy $R0 "Beginning update process..."
  Call WriteToLogFile

  DetailPrint "Copying new files..."
  StrCpy $R0 "Copying new files..."
  Call WriteToLogFile

  CopyFiles "$INSTDIR\update-files\*" "$INSTDIR"
  IfErrors 0 +2
    DetailPrint "Error: File copy failed."
    StrCpy $R0 "Error: File copy failed."
    Call WriteToLogFile

  DetailPrint "Update complete."
  StrCpy $R0 "Update complete."
  Call WriteToLogFile
SectionEnd
