/* =========================================================
   CHINESE EASY - MAIN SCRIPT
   ========================================================= */

/* ---------- Chinese pronunciation ---------- */
function speak(text) {
    if (!("speechSynthesis" in window)) {
        alert("เบราว์เซอร์นี้ไม่รองรับการอ่านออกเสียง");
        return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "zh-CN";
    speech.rate = 0.8;
    speech.pitch = 1;
    speech.volume = 1;

    window.speechSynthesis.speak(speech);
}

function speakLesson() {
    const items = document.querySelectorAll(".vocab-grid strong, .sentence strong");
    const text = Array.from(items)
        .map(item => item.innerText.trim())
        .filter(Boolean)
        .join("。");

    if (text) speak(text);
}

/* ---------- Lesson dropdown ---------- */
document.addEventListener("DOMContentLoaded", () => {
    const dropdown = document.querySelector(".nav-dropdown");
    const button = document.querySelector(".dropdown-btn");

    if (dropdown && button) {
        button.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();

            const open = dropdown.classList.toggle("open");
            button.setAttribute("aria-expanded", String(open));
        });

        document.addEventListener("click", event => {
            if (!dropdown.contains(event.target)) {
                dropdown.classList.remove("open");
                button.setAttribute("aria-expanded", "false");
            }
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                dropdown.classList.remove("open");
                button.setAttribute("aria-expanded", "false");
            }
        });
    }

    /* ---------- Page transition ---------- */
    document.querySelectorAll("a[href]").forEach(link => {
        const href = link.getAttribute("href");

        if (
            !href ||
            href.startsWith("#") ||
            href.startsWith("http") ||
            href.startsWith("mailto:") ||
            href.startsWith("javascript:")
        ) return;

        link.addEventListener("click", event => {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;

            event.preventDefault();
            document.body.classList.add("page-exit");

            setTimeout(() => {
                window.location.href = href;
            }, 180);
        });
    });
});
