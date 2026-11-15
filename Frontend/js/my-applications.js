// my-applications.js : job seeker ki applications ki list
const seeker = requireLogin("JOB_SEEKER");
function statusBadge(status) {
const colors = {
APPLIED: "secondary",
SHORTLISTED: "info",
ACCEPTED: "success",
REJECTED: "danger"
};
return `<span class="badge bg-${colors[status] || "secondary"}">${esc(status)}</span>`;
}
async function loadApplications() {
const tbody = document.getElementById("appList");
try {
const apps = await apiRequest("/applications/user/" + seeker.id);
if (apps.length === 0) {
tbody.innerHTML = `<tr><td colspan="4" class="text-center text-muted">
Aapne abhi tak kisi job me apply nahi kiya.
<a href="jobs.html">Jobs dekhein</a></td></tr>`;
return;
}
tbody.innerHTML = apps.map(function (a) {
return `<tr>
<td><a href="job-details.html?id=${a.jobId}">${esc(a.jobTitle)}</a></td>
<td>${esc(a.company)}</td>
<td>${esc(a.appliedDate)}</td>
<td>${statusBadge(a.status)}</td>
</tr>`;
}).join("");
} catch (err) {
tbody.innerHTML = `<tr><td colspan="4" class="text-danger">${esc(err.message)}</td></tr>`;
}
}
if (seeker) {
loadApplications();
}