// job-details.js : ek job ki details + apply form
const jobId = new URLSearchParams(window.location.search).get("id");
async function loadJob() {
const box = document.getElementById("jobDetails");
try {
const job = await apiRequest("/jobs/" + jobId);
box.innerHTML = `
<h3 class="text-primary">${esc(job.title)}</h3>
<h5 class="text-muted">${esc(job.company)}</h5>
<hr>
<div class="row mb-3">
<div class="col-md-4"><i class="bi bi-geo-alt"></i> ${esc(job.location)}</div>
<div class="col-md-4"><i class="bi bi-briefcase"></i> ${esc(job.jobType)}</div>
<div class="col-md-4"><i class="bi bi-currency-rupee"></i> ${esc(job.salary)}</div>
</div>
<p class="text-muted">Posted on: ${esc(job.postedDate)}</p>
<h5>Job Description</h5>
<p class="job-description">${esc(job.description)}</p>`;
renderApplyBox(job);
} catch (err) {
box.innerHTML = `<p class="text-danger">${esc(err.message)}</p>`;
}
}
function renderApplyBox(job) {
const box = document.getElementById("applyBox");
const user = getUser();
if (!user) {
box.innerHTML = `<h5>Apply for this job</h5>
<p>Apply karne ke liye pehle login karein.</p>
<a href="login.html" class="btn btn-primary w-100">Login</a>`;
return;
}
if (user.role === "EMPLOYER") {
box.innerHTML = `<p class="mb-0">Employer account se apply nahi kar sakte.</p>`;
return;
}
box.innerHTML = `
<h5 class="mb-3">Apply for this job</h5>
<div id="applyMsg"></div>
<form id="applyForm">
<div class="mb-3">
<label class="form-label">Resume Link (Google Drive etc.)</label>
<input type="url" id="resumeLink" class="form-control"
placeholder="https://..." required>
</div>
<div class="mb-3">
<label class="form-label">Cover Letter</label>
<textarea id="coverLetter" rows="5" class="form-control"></textarea>
</div>
<button type="submit" class="btn btn-primary w-100">Apply Now</button>
</form>`;
document.getElementById("applyForm").addEventListener("submit", async function (e) {
e.preventDefault();
try {
await apiRequest("/applications", "POST", {
jobId: job.id,
userId: user.id,
resumeLink: document.getElementById("resumeLink").value,
coverLetter: document.getElementById("coverLetter").value
});
showAlert("applyMsg", "Application successfully submit ho gayi!", "success");
document.getElementById("applyForm").reset();
} catch (err) {
showAlert("applyMsg", err.message);
}
});
}
document.addEventListener("DOMContentLoaded", loadJob);
