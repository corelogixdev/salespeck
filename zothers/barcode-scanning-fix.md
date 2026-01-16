# Fix for Application Minimizing During Barcode Scanning

## Problem
When creating a new sale and scanning a barcode, the application window was:
1. **Minimizing** to the taskbar (initial issue)
2. **Un-maximizing** from full screen to normal size (secondary issue)

Both issues interrupted the sales workflow and required manual window adjustment.

## Root Cause
The issue occurred due to rapid input events from barcode scanners causing the Electron window to lose focus. Barcode scanners simulate keyboard input very quickly, which triggered system-level focus changes that:
- Caused the window to minimize to taskbar
- Reset the window's maximized state to normal size

## Solution Implemented

### 1. Electron Main Process Focus Lock (main.js)
- **IPC Handlers**: Added `lock-window-focus` and `unlock-window-focus` IPC channels
- **Focus Lock Mechanism**: 
  - Sets window to always-on-top with 'screen-saver' level priority during barcode scanning
  - Automatically restores minimized windows
  - **Preserves and restores maximized state** (prevents un-maximizing)
  - Ensures window visibility
  - Auto-releases lock after 2 seconds of inactivity
- **Unmaximize Prevention**: Added event listener that re-maximizes window if it tries to un-maximize during scanning

### 2. Renderer Process IPC Communication (form.ejs)
- **On Focus**: Sends `lock-window-focus` when search input is focused in barcode mode
- **On Input**: Extends lock with each keystroke during scanning
- **On Blur**: Delays unlock by 500ms to handle quick refocus scenarios

### 3. Enhanced Focus Tracking (form.ejs)
- **isSearchInputFocused Flag**: Tracks when the search input has focus
- **focusin/focusout Listeners**: Monitor search input state with 50ms delay for quick changes
- **Window Blur Prevention**: Captures blur events early and refocuses immediately

### 4. Multi-Level Focus Restoration (form.ejs)
After adding a product via barcode:
1. **Immediate focus + IPC lock** - Locks window and focuses input
2. **requestAnimationFrame focus** - Re-locks and refocuses after DOM updates
3. **10ms delayed fallback** - Final check to ensure focus is maintained

## Technical Details

### Why IPC Communication?
Electron windows require main process control to:
- Set `alwaysOnTop` flag
- Restore minimized windows
- Override system-level focus changes

The renderer process (web page) doesn't have these permissions, so we use IPC to communicate with the main process.

### Auto-Release Timer
The 2-second auto-release prevents the window from being permanently locked on top if:
- User switches away intentionally
- An error occurs during scanning
- The scanning session ends naturally

### Window Priority Level
Using 'screen-saver' level keeps the window above most other windows but below system dialogs, ensuring it doesn't interfere with critical OS operations.

## Testing
To test the fix:
1. Start the application (`npm run start:electron`)
2. Navigate to Sales → New Sale
3. Click in the product search field (barcode mode should be active by default)
4. Scan multiple barcodes rapidly (or type and press Enter quickly)
5. **Expected**: Window stays focused, visible, and on top
6. **Expected**: Products are added without any window minimization
7. After 2 seconds of no input, window returns to normal behavior

## Files Modified
1. `main.js` - Added IPC handlers for focus lock/unlock (lines 97-143)
2. `views/sales/form.ejs` - Added IPC communication and enhanced focus management (multiple sections)
3. `zothers/barcode-scanning-fix.md` - This documentation

## Notes
- Focus lock only activates in barcode mode, not manual search mode
- Auto-unlocks after 2 seconds to prevent permanent always-on-top
- Multiple failsafes ensure window returns to normal state
- Does not interfere with user clicking away intentionally (500ms blur delay allows for intentional focus changes)
