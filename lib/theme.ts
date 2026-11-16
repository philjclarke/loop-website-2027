export const THEME_STORAGE_KEY = "theme";

/**
 * Inlined in <head> so it runs before first paint: a saved choice never
 * flashes the wrong theme. With no saved choice, CSS follows the system setting.
 */
export const themeScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
