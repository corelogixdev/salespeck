!macro customWelcomePage
  # Welcome Page is not added by default for installer.
  !insertMacro skipPageIfUpdated
  !insertMacro MUI_PAGE_WELCOME
!macroend