// api.js : REST API call karne wale common functions
async function apiRequest(path, method = "GET", body = null) {
const options = {
method: method,
headers: { "Content-Type": "application/json" }
};
if (body) {
options.body = JSON.stringify(body);
}
const res = await fetch(API_BASE + path, options);
const text = await res.text();
let data = null;
try {
data = text ? JSON.parse(text) : null;
} catch (e) {
data = text;
}
if (!res.ok) {
throw new Error((data && data.message) || "Something went wrong");
}
return data;
}
// XSS se bachne ke liye text ko safe banata hai
function esc(value) {
const div = document.createElement("div");
div.textContent = value == null ? "" : value;
return div.innerHTML;
}
// Sirf http/https links allow karta hai (javascript: links se bachav)
function safeUrl(url) {
if (typeof url === "string" && /^https?:\/\//i.test(url)) {
return esc(url).replace(/"/g, "&quot;");
}
return "#";
}
function showAlert(elementId, message, type = "danger") {
document.getElementById(elementId).innerHTML =
`<div class="alert alert-${type}">${esc(message)}</div>`;
}
// Job card ka HTML (home page aur jobs page dono use karte hain)
function jobCard(job) {
return `
<div class="col-md-6 col-lg-4">
<div class="card job-card h-100 shadow-sm">
<div class="card-body">
<h5 class="card-title">${esc(job.title)}</h5>
<h6 class="text-muted">${esc(job.company)}</h6>
<p class="mb-1"><i class="bi bi-geo-alt"></i> ${esc(job.location)}</p>
<p class="mb-1"><i class="bi bi-briefcase"></i> ${esc(job.jobType)}</p>
<p class="mb-3"><i class="bi bi-currency-rupee"></i> ${esc(job.salary)}</p>
<a href="job-details.html?id=${job.id}"
class="btn btn-outline-primary btn-sm">View Details</a>
</div>
</div>
</div>`;
}