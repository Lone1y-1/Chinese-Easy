/* =========================================================
   CHINESE EASY - THEME
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    if (!themeToggle) return;

    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);

    themeToggle.addEventListener("click", () => {
        const nextTheme = document.body.classList.contains("dark-mode")
            ? "light"
            : "dark";

        applyTheme(nextTheme);
        localStorage.setItem("theme", nextTheme);
    });
});

function applyTheme(theme) {
    const isDark = theme === "dark";
    document.body.classList.toggle("dark-mode", isDark);

    const button = document.getElementById("themeToggle");
    if (button) {
        button.textContent = isDark ? "☀️" : "🌙";
        button.setAttribute(
            "aria-label",
            isDark ? "เปลี่ยนเป็นโหมดสว่าง" : "เปลี่ยนเป็นโหมดมืด"
        );
    }
}
