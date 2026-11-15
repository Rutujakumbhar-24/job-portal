// login.js : login form handle karta hai
document.getElementById("loginForm").addEventListener("submit", async function (e) {
e.preventDefault();
try {
const user = await apiRequest("/auth/login", "POST", {
email: document.getElementById("email").value.trim(),
password: document.getElementById("password").value
});
setUser(user);
// Role ke hisaab se redirect
if (user.role === "EMPLOYER") {
window.location.href = "employer-dashboard.html";
} else {
window.location.href = "jobs.html";
}
} catch (err) {
showAlert("msg", err.message);
}
});