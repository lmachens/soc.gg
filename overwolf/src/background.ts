async function init() {
  overwolf.extensions.onAppLaunchTriggered.addListener(openMainWindow);
  openMainWindow();
}

// Opens the UI window
function openMainWindow() {
  overwolf.windows.obtainDeclaredWindow("desktop", (result) => {
    if (result.success && result.window && result.window.id) {
      overwolf.windows.restore(result.window.id);
    }
  });
}

init();
