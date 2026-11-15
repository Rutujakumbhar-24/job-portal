// employer.js : employer dashboard - meri jobs + applicants
const employer = requireLogin("EMPLOYER");
let jobTitles = {}; // job id -> title (onclick me title pass karne se bachne ke liye)
async function loadMyJobs() {
const tbody = document.getElementById("myJobs");
try {
const jobs = await apiRequest("/jobs/employer/" + employer.id);
if (jobs.length === 0) {
tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted">
Aapne abhi tak koi job post nahi ki.</td></tr>`;
return;
}
jobs.forEach(function (j) { jobTitles[j.id] = j.title; });
tbody.innerHTML = jobs.map(function (j) {
return `<tr>
<td>${esc(j.title)}</td>
<td>${esc(j.location)}</td>
<td>${esc(j.jobType)}</td>
<td>${esc(j.postedDate)}</td>
<td>
<button class="btn btn-sm btn-primary"
onclick="loadApplicants(${j.id})">Applicants</button>
<button class="btn btn-sm btn-outline-danger"
onclick="deleteJob(${j.id})">Delete</button>
</td>
</tr>`;
}).join("");
} catch (err) {
showAlert("msg", err.message);
}
}
async function deleteJob(id) {
if (!confirm("Kya aap sach me is job ko delete karna chahte hain?")) return;
try {
await apiRequest("/jobs/" + id, "DELETE");
document.getElementById("applicantsBox").innerHTML = "";
document.getElementById("applicantsTitle").textContent = "";
loadMyJobs();
} catch (err) {
showAlert("msg", err.message);
}
}
async function loadApplicants(id) {
const title = jobTitles[id] || "";
document.getElementById("applicantsTitle").textContent = "Applicants for: " + title;
const box = document.getElementById("applicantsBox");
try {
const apps = await apiRequest("/applications/job/" + id);
if (apps.length === 0) {
box.innerHTML = `<p class="text-muted">Abhi tak koi application nahi aayi.</p>`;
return;
}
let rows = apps.map(function (a) {
return `<tr>
<td>${esc(a.applicantName)}</td>
<td>${esc(a.applicantEmail)}</td>
<td><a href="${safeUrl(a.resumeLink)}" target="_blank" rel="noopener">Resume</a></td>
<td>${esc(a.appliedDate)}</td>
<td>
<select class="form-select form-select-sm"
onchange="updateStatus(${a.id}, this.value)">
${["APPLIED", "SHORTLISTED", "ACCEPTED", "REJECTED"].map(function (s) {
return `<option ${a.status === s ? "selected" : ""}>${s}</option>`;
}).join("")}
</select>
</td>
</tr>`;
}).join("");

box.innerHTML = `<div class="table-responsive form-card">
<table class="table align-middle mb-0">
<thead><tr><th>Name</th><th>Email</th><th>Resume</th><th>Date</th>
<th>Status</th></tr></thead>
<tbody>${rows}</tbody>
</table></div>`;
} catch (err) {
showAlert("msg", err.message);
}
}
async function updateStatus(appId, status) {
try {
await apiRequest("/applications/" + appId + "/status?status=" + status, "PUT");
showAlert("msg", "Status update ho gaya: " + status, "success");
} catch (err) {
showAlert("msg", err.message);
}
if (employer) {
loadMyJobs();
}
}