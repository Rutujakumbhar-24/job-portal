// auth.js : login session (localStorage) + navbar + footer

function getUser() {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch (e) {
    return null;
  }
}

function setUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}

// Protects a page. role = "EMPLOYER" or "JOB_SEEKER"
function requireLogin(role) {
  const user = getUser();
  if (!user) {
    window.location.href = "login.html";
    return null;
  }
  if (role && user.role !== role) {
    alert("You do not have access to this page");
    window.location.href = "index.html";
    return null;
  }
  return user;
}

function renderNavbar() {
  const user = getUser();
  let links = `
    <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
    <li class="nav-item"><a class="nav-link" href="jobs.html">Find Jobs</a></li>`;
  let right = "";

  if (user && user.role === "EMPLOYER") {
    links += `
      <li class="nav-item"><a class="nav-link" href="post-job.html">Post a Job</a></li>
      <li class="nav-item">
        <a class="nav-link" href="employer-dashboard.html">Dashboard</a></li>`;
  }
  if (user && user.role === "JOB_SEEKER") {
    links += `<li class="nav-item">
      <a class="nav-link" href="my-applications.html">My Applications</a></li>`;
  }

  if (user) {
    right = `<span class="text-white me-3">Hi, ${esc(user.name)}</span>
      <button class="btn btn-warning btn-sm" onclick="logout()">Logout</button>`;
  } else {
    right = `<a href="login.html" class="btn btn-outline-light btn-sm me-2">Login</a>
      <a href="register.html" class="btn btn-warning btn-sm">Register</a>`;
  }

  document.getElementById("navbar").innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary-custom">
      <div class="container">
        <a class="navbar-brand" href="index.html">
          <i class="bi bi-briefcase-fill"></i> JobPortal</a>
        <button class="navbar-toggler" type="button"
                data-bs-toggle="collapse" data-bs-target="#menu">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="menu">
          <ul class="navbar-nav me-auto">${links}</ul>
          <div class="d-flex align-items-center">${right}</div>
        </div>
      </div>
    </nav>`;
}

function renderFooter() {
  const footer = document.getElementById("footer");
  if (footer) {
    footer.innerHTML = `<footer><div class="container text-center">
      &copy; 2026 JobPortal. Made with Spring Boot + PostgreSQL</div></footer>`;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  renderNavbar();
  renderFooter();
});