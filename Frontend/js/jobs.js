
// jobs.js : jobs.html - search + filter
const params = new URLSearchParams(window.location.search);
async function loadJobs() {
const keyword = document.getElementById("keyword").value.trim();
const location = document.getElementById("location").value.trim();
const type = document.getElementById("jobType").value;
const query = "?keyword=" + encodeURIComponent(keyword) +
"&location=" + encodeURIComponent(location) +
"&type=" + encodeURIComponent(type);
const list = document.getElementById("jobList");
try {
const jobs = await apiRequest("/jobs" + query);
document.getElementById("resultCount").textContent = jobs.length + " job(s) found";
list.innerHTML = jobs.length
? jobs.map(jobCard).join("")
: `<p class="text-center text-muted">Koi job nahi mili.</p>`;
} catch (err) {
list.innerHTML = `<p class="text-center text-danger">${esc(err.message)}</p>`;
}
}
document.addEventListener("DOMContentLoaded", function () {
// URL se aayi values form me bharo (home page ke search se)
document.getElementById("keyword").value = params.get("keyword") || "";
document.getElementById("location").value = params.get("location") || "";
document.getElementById("filterForm").addEventListener("submit", function (e) {
e.preventDefault();
loadJobs();
});
loadJobs();
});