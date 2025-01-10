!define NSIS_CONFIG_LOG 1  ; Enable logging configuration
!include "LogicLib.nsh"
!include "MUI2.nsh"

Function WriteToLogFile
  Push $0
  Push $1
  
  StrCpy $0 "$INSTDIR\installer-log.txt"
  FileOpen $1 $0 "a"
  FileWrite $1 "$\r$\n[${__DATE__} ${__TIME__}] $R0"
  FileClose $1
  
  Pop $1
  Pop $0
FunctionEnd

ShowInstDetails show  ; Show detailed installation log

!insertmacro MUI_PAGE_INSTFILES  ; Show installation progress directly

Section "UpdateSection"
  DetailPrint "Beginning update process..."
  StrCpy $R0 "Beginning update process..."
  Call WriteToLogFile

  DetailPrint "Copying new files..."
  StrCpy $R0 "Copying new files..."
  Call WriteToLogFile

  ClearErrors
  CopyFiles "$INSTDIR\update-files\*" "$INSTDIR"
  IfErrors 0 +3
    StrCpy $R0 "Error: File copy failed."
    Goto updateError

  StrCpy $R0 "Update complete."
  Call WriteToLogFile
  Goto updateEnd

  updateError:
    Call WriteToLogFile
    DetailPrint $R0

  updateEnd:
SectionEnd
