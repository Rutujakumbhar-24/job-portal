// register.js : registration form handle karta hai
document.getElementById("registerForm").addEventListener("submit", async function (e) {
e.preventDefault();
try {
await apiRequest("/auth/register", "POST", {
name: document.getElementById("name").value.trim(),
email: document.getElementById("email").value.trim(),
phone: document.getElementById("phone").value.trim(),
password: document.getElementById("password").value,
role: document.getElementById("role").value
});
showAlert("msg", "Registration successful! Ab login karein...", "success");
setTimeout(function () {
window.location.href = "login.html";
}, 1500);
} catch (err) {
showAlert("msg", err.message);
}
});