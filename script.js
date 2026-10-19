
let currentUser = null;
let authMode = "login";

let requests = JSON.parse(localStorage.getItem("roadRequests") || "[]");

function getUsers() {
  return JSON.parse(localStorage.getItem("roadUsers") || "[]");
}

function showHome() {
  ["home", "services", "about"].forEach(id => {
    document.getElementById(id).classList.remove("hidden");
  });

  document.getElementById("auth").classList.add("hidden");
  document.getElementById("dashboard").classList.add("hidden");
  window.scrollTo(0, 0);
}

function showAuth(mode) {
  authMode = mode;
  const signup = mode === "signup";

  document.getElementById("auth").classList.remove("hidden");
  document.getElementById("dashboard").classList.add("hidden");

  ["home", "services", "about"].forEach(id => {
    document.getElementById(id).classList.add("hidden");
  });

  document.getElementById("auth-title").textContent =
    signup ? "Create Your Account" : "Welcome Back!";

  document.getElementById("auth-desc").textContent =
    signup ? "Join RoadRescue today." : "Login to continue.";

  document.getElementById("signup-fields").classList.toggle("hidden", !signup);
  document.getElementById("login-fields").classList.toggle("hidden", signup);

  document.getElementById("full-name").required = signup;
  document.getElementById("username").required = signup;
  document.getElementById("signup-email").required = signup;
  document.getElementById("login-id").required = !signup;

  document.getElementById("auth-submit").textContent =
    signup ? "Sign Up" : "Login";

  document.getElementById("switch-text").innerHTML = signup
    ? 'Already registered? <a href="#" onclick="showAuth(\'login\'); return false;">Login</a>'
    : 'New here? <a href="#" onclick="showAuth(\'signup\'); return false;">Create account</a>';

  document.getElementById("auth-error").textContent = "";
  document.getElementById("auth-form").reset();

  window.scrollTo(0, 0);
}

document.getElementById("auth-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const users = getUsers();
  const password = document.getElementById("auth-password").value;
  const error = document.getElementById("auth-error");

  error.textContent = "";

  if (authMode === "signup") {
    const name = document.getElementById("full-name").value.trim();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("signup-email").value.trim().toLowerCase();
    const role = document.getElementById("signup-role").value;

    if (username.length < 3) {
      error.textContent = "Username must have at least 3 characters.";
      return;
    }

    const exists = users.some(u =>
      u.username.toLowerCase() === username.toLowerCase() ||
      u.email.toLowerCase() === email
    );

    if (exists) {
      error.textContent = "Username or email is already registered.";
      return;
    }

    users.push({ name, username, email, password, role });
    localStorage.setItem("roadUsers", JSON.stringify(users));

    alert("Account created! Please login.");
    showAuth("login");
    return;
  }

  const loginId = document.getElementById("login-id").value.trim().toLowerCase();

  const user = users.find(u =>
    (u.username.toLowerCase() === loginId ||
     u.email.toLowerCase() === loginId) &&
    u.password === password
  );

  if (!user) {
    error.textContent = "Incorrect username/email or password.";
    return;
  }

  currentUser = user;
  openDashboard();
});

function openDashboard() {
  document.getElementById("auth").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");

  ["home", "services", "about"].forEach(id => {
    document.getElementById(id).classList.add("hidden");
  });

  document.getElementById("active-section").classList.remove("hidden");
  document.getElementById("history-section").classList.add("hidden");

  document.getElementById("dash-name").textContent = currentUser.name;
  document.getElementById("dash-role").textContent = currentUser.role + " Mode";
  document.getElementById("dash-title").textContent =
    "Welcome, " + currentUser.name + "!";

  const isDriver = currentUser.role === "Driver";

  document.getElementById("dash-info").textContent = isDriver
    ? "Submit a request for roadside assistance."
    : "View requests and send your price offers.";

  document.getElementById("request-form").classList.toggle("hidden", !isDriver);

  renderJobs();
  window.scrollTo(0, 0);
}

document.getElementById("request-form").addEventListener("submit", function(e) {
  e.preventDefault();

  if (!currentUser || currentUser.role !== "Driver") return;

  requests.push({
    id: Date.now(),
    driver: currentUser.name,
    driverEmail: currentUser.email,
    vehicle: document.getElementById("vehicle").value,
    issue: document.getElementById("issue").value,
    location: document.getElementById("location").value.trim(),
    mechanic: "",
    mechanicEmail: "",
    price: null,
    status: "Waiting for mechanic"
  });

  saveRequests();
  this.reset();
  alert("Your roadside request has been added!");
});

function renderJobs() {
  const jobs = document.getElementById("jobs");
  const historyJobs = document.getElementById("history-jobs");

  jobs.replaceChildren();
  historyJobs.replaceChildren();

  const isMine = job => {
    if (currentUser.role === "Driver") {
      return job.driverEmail === currentUser.email;
    }

    return job.mechanicEmail === currentUser.email;
  };

  const activeJobs = requests.filter(job => {
    if (job.status === "Completed") return false;

    if (currentUser.role === "Driver") {
      return job.driverEmail === currentUser.email;
    }

    return job.status === "Waiting for mechanic" ||
      job.mechanicEmail === currentUser.email;
  });

  const myHistory = requests.filter(job =>
    job.status === "Completed" && isMine(job)
  );

  function addText(card, text, className = "") {
    const p = document.createElement("p");
    p.textContent = text;
    if (className) p.className = className;
    card.appendChild(p);
  }

  function makeCard(job, historyMode = false) {
    const card = document.createElement("div");
    card.className = "job";

    const title = document.createElement("h3");
    title.textContent = job.issue;
    card.appendChild(title);

    addText(card, "Driver: " + job.driver);
    addText(card, "Vehicle: " + job.vehicle);
    addText(card, "Location: " + job.location);

    if (job.price !== null && job.price !== undefined) {
      addText(card, "Mechanic Price: Rs. " + job.price, "job-price");
    }

    addText(card, "Status: " + job.status, "job-status");

    if (job.mechanic) {
      addText(card, "Mechanic: " + job.mechanic);
    }

    if (historyMode) {
      addText(card, "Completed job — saved in history.");
      return card;
    }

    if (
      currentUser.role === "Mechanic" &&
      job.status === "Waiting for mechanic"
    ) {
      const priceInput = document.createElement("input");
      priceInput.type = "number";
      priceInput.min = "1";
      priceInput.placeholder = "Enter price (Rs.)";
      priceInput.className = "price-input";

      const send = document.createElement("button");
      send.textContent = "Send Price to Driver";

      send.onclick = function() {
        const price = Number(priceInput.value);

        if (!priceInput.value || !Number.isFinite(price) || price <= 0) {
          alert("Please enter a valid price.");
          return;
        }

        job.price = price;
        job.mechanic = currentUser.name;
        job.mechanicEmail = currentUser.email;
        job.status = "Price offered to driver";

        saveRequests();
        alert("Price offer sent to driver.");
      };

      card.append(priceInput, send);
    }

    if (
      currentUser.role === "Driver" &&
      job.driverEmail === currentUser.email &&
      job.status === "Price offered to driver"
    ) {
      const accept = document.createElement("button");
      accept.textContent = "Accept Price";

      accept.onclick = function() {
        job.status = "Mechanic is on the way";
        saveRequests();
        alert("Mechanic is on the way!");
      };

      const reject = document.createElement("button");
      reject.textContent = "Reject Price";
      reject.style.background = "#dc2626";

      reject.onclick = function() {
        job.status = "Waiting for mechanic";
        job.mechanic = "";
        job.mechanicEmail = "";
        job.price = null;
        saveRequests();
        alert("Price rejected. You can receive another offer.");
      };

      card.append(accept, reject);
    }

    if (
      currentUser.role === "Mechanic" &&
      job.mechanicEmail === currentUser.email &&
      job.status === "Mechanic is on the way"
    ) {
      const finish = document.createElement("button");
      finish.textContent = "Complete Job";

      finish.onclick = function() {
        job.status = "Completed";
        saveRequests();
        alert("Job completed and moved to History.");
      };

      card.appendChild(finish);
    }

    return card;
  }

  if (activeJobs.length === 0) {
    jobs.textContent = "No active requests.";
  } else {
    activeJobs.forEach(job => jobs.appendChild(makeCard(job)));
  }

  if (myHistory.length === 0) {
    historyJobs.textContent = "No completed jobs in your history yet.";
  } else {
    myHistory.forEach(job => historyJobs.appendChild(makeCard(job, true)));
  }
}

function saveRequests() {
  localStorage.setItem("roadRequests", JSON.stringify(requests));
  renderJobs();
}

function toggleHistory() {
  const history = document.getElementById("history-section");
  const active = document.getElementById("active-section");
  const opening = history.classList.contains("hidden");

  history.classList.toggle("hidden", !opening);
  active.classList.toggle("hidden", opening);

  if (opening) renderJobs();

  window.scrollTo(0, 0);
}

function logout() {
  currentUser = null;
  showHome();
}
