/* =========================================================
   CHINESE EASY - AUTH SYSTEM
   ========================================================= */

function togglePassword(inputId, button) {
    const input = document.getElementById(inputId);
    if (!input) return;

    if (input.type === "password") {
        input.type = "text";
        if (button) button.textContent = "🙈";
    } else {
        input.type = "password";
        if (button) button.textContent = "👁️";
    }
}

function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

function getUsers() {
    try {
        return JSON.parse(localStorage.getItem("chineseUsers")) || [];
    } catch {
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem("chineseUsers", JSON.stringify(users));
}

/* ---------- Sign up ---------- */
document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");
    if (!signupForm) return;

    signupForm.addEventListener("submit", event => {
        event.preventDefault();

        const name = document.getElementById("signupName")?.value.trim();
        const email = document.getElementById("signupEmail")?.value.trim().toLowerCase();
        const password = document.getElementById("signupPassword")?.value || "";
        const confirmPassword = document.getElementById("confirmPassword")?.value || "";
        const terms = document.getElementById("terms")?.checked;

        if (!name) return showToast("⚠️ กรุณากรอกชื่อผู้เรียน");
        if (!email) return showToast("⚠️ กรุณากรอกอีเมล");
        if (password.length < 6) return showToast("⚠️ รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
        if (password !== confirmPassword) return showToast("❌ รหัสผ่านไม่ตรงกัน");
        if (!terms) return showToast("⚠️ กรุณายอมรับเงื่อนไขการใช้งาน");

        const users = getUsers();
        if (users.some(user => user.email === email)) {
            return showToast("❌ อีเมลนี้มีบัญชีแล้ว");
        }

        const newUser = {
            id: Date.now(),
            name,
            email,
            password,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        saveUsers(users);

        localStorage.setItem("chineseStudentName", name);
        localStorage.setItem("chineseLoggedIn", "true");

        showToast("🎉 สมัครสมาชิกสำเร็จ!");

        setTimeout(() => {
            window.location.href = "index.html";
        }, 900);
    });
});

/* ---------- Login ---------- */
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    if (!loginForm) return;

    const savedName = localStorage.getItem("chineseStudentName");
    const loginUsername = document.getElementById("loginUsername");
    const remember = document.getElementById("rememberMe");

    if (savedName && loginUsername) {
        loginUsername.value = savedName;
        if (remember) remember.checked = true;
    }

    loginForm.addEventListener("submit", event => {
        event.preventDefault();

        const username = loginUsername?.value.trim() || "";
        const password = document.getElementById("loginPassword")?.value || "";
        const shouldRemember = remember?.checked ?? true;

        if (!username || !password) {
            return showToast("⚠️ กรุณากรอกข้อมูลให้ครบ");
        }

        const user = getUsers().find(item =>
            item.name === username ||
            item.email === username.toLowerCase()
        );

        if (!user) return showToast("❌ ไม่พบบัญชีผู้ใช้นี้");
        if (user.password !== password) return showToast("❌ รหัสผ่านไม่ถูกต้อง");

        localStorage.setItem("chineseLoggedIn", "true");

        if (shouldRemember) {
            localStorage.setItem("chineseStudentName", user.name);
        } else {
            localStorage.removeItem("chineseStudentName");
        }

        showToast(`🎉 ยินดีต้อนรับ ${user.name}`);

        setTimeout(() => {
            window.location.href = "index.html";
        }, 900);
    });
});

function forgotPassword(event) {
    event.preventDefault();
    showToast("💡 ระบบกู้คืนรหัสผ่านจะเพิ่มในภายหลัง");
}

/* ---------- Navbar user area ---------- */
function updateUserUI() {
    const userArea = document.getElementById("userArea");
    if (!userArea) return;

    const loggedIn = localStorage.getItem("chineseLoggedIn") === "true";
    const studentName = localStorage.getItem("chineseStudentName");

    if (loggedIn && studentName) {
        userArea.innerHTML = `
            <div class="user-welcome">
                <span>👋 สวัสดี</span>
                <strong>${escapeHTML(studentName)}</strong>
            </div>
            <button type="button" class="logout-btn" onclick="logout()">Logout</button>
        `;
    } else {
        userArea.innerHTML = `
            <div class="auth-buttons">
                <a href="signup.html" class="auth-btn signup-btn">Sign Up</a>
                <a href="login.html" class="auth-btn login-btn">Login</a>
            </div>
        `;
    }
}

function escapeHTML(value) {
    const div = document.createElement("div");
    div.textContent = value;
    return div.innerHTML;
}

function logout() {
    localStorage.removeItem("chineseLoggedIn");
    localStorage.removeItem("chineseStudentName");
    showToast("👋 ออกจากระบบแล้ว");

    setTimeout(() => {
        window.location.href = "index.html";
    }, 500);
}

document.addEventListener("DOMContentLoaded", updateUserUI);
