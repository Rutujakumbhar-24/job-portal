// home.js : index.html par latest 6 jobs dikhata hai
async function loadLatestJobs() {
const box = document.getElementById("latestJobs");
try {
const jobs = await apiRequest("/jobs");
if (jobs.length === 0) {
box.innerHTML = `<p class="text-center text-muted">Abhi koi job available nahi hai.</p>`;
return;
}
box.innerHTML = jobs.slice(0, 6).map(jobCard).join("");
} catch (err) {
box.innerHTML = `<p class="text-center text-danger">
</p>`;
}
}
document.addEventListener("DOMContentLoaded", loadLatestJobs);