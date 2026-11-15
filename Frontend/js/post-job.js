// post-job.js : employer nayi job post karta hai
const user = requireLogin("EMPLOYER");
document.getElementById("jobForm").addEventListener("submit", async function (e) {
e.preventDefault();
if (!user) return;
try {
await apiRequest("/jobs", "POST", {
title: document.getElementById("title").value.trim(),
company: document.getElementById("company").value.trim(),
location: document.getElementById("location").value.trim(),
jobType: document.getElementById("jobType").value,
salary: document.getElementById("salary").value.trim(),
description: document.getElementById("description").value.trim(),
postedBy: user.id
});
showAlert("msg", "Job successfully post ho gayi!", "success");
document.getElementById("jobForm").reset();
setTimeout(function () {
window.location.href = "employer-dashboard.html";
}, 1200);
} catch (err) {
showAlert("msg", err.message);
}
});