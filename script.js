// ROADRESCUE - SIMPLE FRONTEND VERSION

let users = JSON.parse(localStorage.getItem("roadUsers")) || [];
let requests = JSON.parse(localStorage.getItem("roadRequests")) || [];
let currentUser = null;

// ----------------------------------
// VEHICLE OPTIONS
// ----------------------------------

const vehicleData = {
    Car: {
        companies: {
            Toyota: ["Corolla", "Yaris", "Fortuner", "Hilux", "Aqua", "Prius"],
            Honda: ["Civic", "City", "BR-V", "HR-V", "Vezel"],
            Suzuki: ["Alto", "Cultus", "Wagon R", "Swift", "Bolan", "Mehran"],
            Kia: ["Sportage", "Picanto", "Sorento", "Stonic"],
            Hyundai: ["Elantra", "Tucson", "Sonata", "Porter"],
            Changan: ["Alsvin", "Oshan X7", "Karvaan"],
            MG: ["HS", "ZS", "MG 5"],
            BYD: ["Atto 3", "Seal", "Dolphin"],
            Other: ["Other model"]
        },
        problems: {
            "Engine": ["Engine not starting", "Engine noise", "Engine misfire", "Oil leakage"],
            "Tyres & Wheels": ["Flat tyre", "Puncture", "Wheel damage", "Wheel alignment issue"],
            "Battery & Electrical": ["Dead battery", "Weak battery", "Alternator issue", "Electrical fault"],
            "Cooling System": ["Engine overheating", "Coolant leakage", "Radiator issue"],
            "Brakes": ["Brake failure", "Weak brakes", "Brake noise"],
            "Transmission & Clutch": ["Gear shifting problem", "Clutch issue", "Transmission noise"],
            "Fuel System": ["Out of fuel", "Fuel leakage", "Fuel pump issue"],
            "Accident & Body": ["Minor accident damage", "Vehicle stuck", "Body damage"],
            "Other": ["Vehicle will not move", "Unusual noise", "Other issue"]
        }
    },

    Bike: {
        companies: {
            Honda: ["CD 70", "CG 125", "CB 150F", "Pridor"],
            Yamaha: ["YB 125Z", "YBR 125", "YBR 125G"],
            Suzuki: ["GD 110S", "GS 150", "GR 150"],
            United: ["US 70", "US 100", "US 125"],
            RoadPrince: ["RP 70", "RP 110", "Wego 150"],
            Other: ["Other model"]
        },
        problems: {
            "Engine": ["Bike not starting", "Engine noise", "Engine overheating"],
            "Tyres & Wheels": ["Flat tyre", "Puncture", "Wheel damage"],
            "Battery & Electrical": ["Dead battery", "Self-start issue", "Lights not working"],
            "Chain & Gears": ["Loose chain", "Broken chain", "Gear shifting problem"],
            "Clutch": ["Clutch slipping", "Clutch not working", "Hard clutch"],
            "Brakes": ["Brake failure", "Weak brakes", "Brake noise"],
            "Fuel System": ["Out of fuel", "Fuel leakage", "Fuel supply issue"],
            "Accident & Body": ["Bike fell over", "Accident damage", "Handlebar issue"],
            "Other": ["Bike will not move", "Unusual noise", "Other issue"]
        }
    },

    Van: {
        companies: {
            Suzuki: ["Bolan", "Every", "APV"],
            Toyota: ["Hiace", "TownAce"],
            Hyundai: ["H-1", "Staria"],
            Kia: ["Grand Carnival"],
            Other: ["Other model"]
        },
        problems: {
            "Engine": ["Engine not starting", "Engine noise", "Oil leakage"],
            "Tyres & Wheels": ["Flat tyre", "Puncture", "Wheel damage"],
            "Battery & Electrical": ["Dead battery", "Alternator issue", "Electrical fault"],
            "Cooling System": ["Engine overheating", "Coolant leakage"],
            "Brakes": ["Brake failure", "Weak brakes"],
            "Transmission & Clutch": ["Gear shifting problem", "Clutch issue"],
            "Fuel System": ["Out of fuel", "Fuel leakage"],
            "Other": ["Vehicle will not move", "Unusual noise", "Other issue"]
        }
    },

    Truck: {
        companies: {
            Hino: ["300 Series", "500 Series", "700 Series"],
            Isuzu: ["N-Series", "F-Series", "Giga"],
            Hyundai: ["Mighty", "HD Series"],
            Daewoo: ["Novus", "Prima"],
            Other: ["Other model"]
        },
        problems: {
            "Engine": ["Engine not starting", "Engine overheating", "Engine noise"],
            "Tyres & Wheels": ["Flat tyre", "Tyre burst", "Wheel damage"],
            "Battery & Electrical": ["Dead battery", "Electrical fault"],
            "Cooling System": ["Radiator issue", "Coolant leakage"],
            "Brakes": ["Brake failure", "Air brake issue"],
            "Transmission & Clutch": ["Gear shifting problem", "Clutch issue"],
            "Fuel System": ["Fuel leakage", "Out of fuel"],
            "Other": ["Truck stuck", "Vehicle will not move", "Other issue"]
        }
    },

    Bus: {
        companies: {
            Hino: ["RM Series", "RN Series"],
            Isuzu: ["Bus Series"],
            Yutong: ["City Bus", "Coach"],
            Daewoo: ["City Bus", "Coach"],
            Other: ["Other model"]
        },
        problems: {
            "Engine": ["Engine not starting", "Engine overheating", "Engine noise"],
            "Tyres & Wheels": ["Flat tyre", "Tyre burst", "Wheel damage"],
            "Battery & Electrical": ["Dead battery", "Electrical fault"],
            "Cooling System": ["Radiator issue", "Coolant leakage"],
            "Brakes": ["Brake failure", "Air brake issue"],
            "Transmission & Clutch": ["Gear shifting problem", "Clutch issue"],
            "Fuel System": ["Fuel leakage", "Out of fuel"],
            "Other": ["Bus stuck", "Vehicle will not move", "Other issue"]
        }
    },

    Rickshaw: {
        companies: {
            Qingqi: ["Qingqi 2-Stroke", "Qingqi 4-Stroke"],
            Sazgar: ["Sazgar Rickshaw"],
            United: ["United Rickshaw"],
            Other: ["Other model"]
        },
        problems: {
            "Engine": ["Engine not starting", "Engine noise", "Engine overheating"],
            "Tyres & Wheels": ["Flat tyre", "Puncture", "Wheel damage"],
            "Battery & Electrical": ["Dead battery", "Electrical fault"],
            "Brakes": ["Brake failure", "Weak brakes"],
            "Fuel System": ["Out of fuel", "Fuel leakage"],
            "Other": ["Rickshaw will not move", "Unusual noise", "Other issue"]
        }
    },

    Other: {
        companies: {
            Other: ["Other model"]
        },
        problems: {
            "Engine": ["Engine not starting", "Engine noise", "Engine overheating"],
            "Tyres & Wheels": ["Flat tyre", "Puncture", "Wheel damage"],
            "Battery & Electrical": ["Dead battery", "Electrical fault"],
            "Brakes": ["Brake failure", "Weak brakes"],
            "Fuel System": ["Out of fuel", "Fuel leakage"],
            "Other": ["Vehicle will not move", "Unusual noise", "Other issue"]
        }
    }
};

// ----------------------------------
// BASIC PAGE FUNCTIONS
// ----------------------------------

function hidePages() {
    document.getElementById("homePage").style.display = "none";
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("signupPage").style.display = "none";
    document.getElementById("dashboard").style.display = "none";
}

function goHome() {
    hidePages();
    document.getElementById("homePage").style.display = "block";
    updateMenu();
    closeMenu();
    window.scrollTo(0, 0);
}

function showLogin() {
    hidePages();
    document.getElementById("loginPage").style.display = "grid";
    document.getElementById("loginMessage").textContent = "";
    updateMenu();
    closeMenu();
    window.scrollTo(0, 0);
}

function showSignup() {
    hidePages();
    document.getElementById("signupPage").style.display = "grid";
    document.getElementById("signupMessage").textContent = "";
    updateMenu();
    closeMenu();
    window.scrollTo(0, 0);
}

// ----------------------------------
// SIDEBAR AND PROFILE MENU
// ----------------------------------

function toggleMenu() {
    document.getElementById("sidebar").classList.toggle("open");
    document.getElementById("overlay").classList.toggle("show");
}

function closeMenu() {
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("overlay").classList.remove("show");
}

function updateMenu() {
    const guestMenu = document.getElementById("guestMenu");
    const profileMenu = document.getElementById("profileMenu");

    if (currentUser) {
        guestMenu.style.display = "none";
        profileMenu.style.display = "block";

        document.getElementById("sidebarName").textContent = currentUser.name;
        document.getElementById("sidebarRole").textContent = currentUser.role;
        document.getElementById("sidebarAvatar").textContent =
            currentUser.name.charAt(0).toUpperCase();
    } else {
        guestMenu.style.display = "block";
        profileMenu.style.display = "none";
    }
}

function startHelp() {
    if (!currentUser) {
        showSignup();
        return;
    }

    if (currentUser.role === "Driver") {
        showDashboard();
        document.getElementById("driverPanel").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    } else {
        showDashboard();
        alert("You are logged in as a mechanic. You can review requests below.");
    }
}

// ----------------------------------
// SIGNUP
// ----------------------------------

function signup(event) {
    event.preventDefault();

    const name = document.getElementById("fullName").value.trim();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("signupPassword").value;
    const role = document.getElementById("role").value;
    const message = document.getElementById("signupMessage");

    message.textContent = "";

    if (!name || !username || !email || !password) {
        message.textContent = "Please fill in all required fields.";
        return;
    }

    if (password.length < 4) {
        message.textContent = "For this demo, use a password of at least 4 characters.";
        return;
    }

    const exists = users.some(function(user) {
        return user.username.toLowerCase() === username.toLowerCase() ||
               user.email.toLowerCase() === email;
    });

    if (exists) {
        message.textContent = "This username or email is already registered.";
        return;
    }

    users.push({
        name: name,
        username: username,
        email: email,
        password: password,
        role: role
    });

    localStorage.setItem("roadUsers", JSON.stringify(users));

    event.target.reset();
    showLogin();
    document.getElementById("loginMessage").textContent =
        "Account created successfully. Please log in.";
}

// ----------------------------------
// LOGIN
// ----------------------------------

function login(event) {
    event.preventDefault();

    const identity = document.getElementById("loginIdentity").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;
    const message = document.getElementById("loginMessage");

    message.textContent = "";

    const matchedUser = users.find(function(user) {
        return (
            (user.username.toLowerCase() === identity ||
             user.email.toLowerCase() === identity) &&
            user.password === password
        );
    });

    if (!matchedUser) {
        message.textContent = "Incorrect username/email or password.";
        return;
    }

    currentUser = matchedUser;
    event.target.reset();
    showDashboard();
}

// ----------------------------------
// DASHBOARD
// ----------------------------------

function showDashboard() {
    if (!currentUser) {
        showLogin();
        return;
    }

    hidePages();

    document.getElementById("dashboard").style.display = "block";
    document.getElementById("welcomeTitle").textContent =
        "Welcome, " + currentUser.name + "!";

    document.getElementById("driverPanel").style.display =
        currentUser.role === "Driver" ? "block" : "none";

    document.getElementById("mechanicPanel").style.display =
        currentUser.role === "Mechanic" ? "block" : "none";

    document.getElementById("activeJobsTitle").textContent =
        currentUser.role === "Driver" ? "Your active requests" : "Mechanic job requests";

    document.getElementById("historySection").style.display = "none";
    document.getElementById("historyButtonText").textContent = "View history ↗";

    updateMenu();
    renderJobs();
    window.scrollTo(0, 0);
}

function logout() {
    currentUser = null;
    closeMenu();
    updateMenu();
    goHome();
}

// ----------------------------------
// POPULATE MODEL YEARS
// ----------------------------------

function populateYears() {
    const yearSelect = document.getElementById("vehicleYear");
    const currentYear = new Date().getFullYear();

    for (let year = currentYear; year >= 1980; year--) {
        const option = document.createElement("option");
        option.value = String(year);
        option.textContent = String(year);
        yearSelect.appendChild(option);
    }
}

// ----------------------------------
// VEHICLE TYPE -> COMPANY -> MODEL
// ----------------------------------

function updateVehicleOptions() {
    const type = document.getElementById("vehicleType").value;
    const companySelect = document.getElementById("vehicleCompany");
    const modelSelect = document.getElementById("vehicleModel");
    const problemSelect = document.getElementById("problem");
    const detailSelect = document.getElementById("problemDetail");

    companySelect.innerHTML = '<option value="">Select company</option>';
    modelSelect.innerHTML = '<option value="">First select company</option>';
    problemSelect.innerHTML = '<option value="">Select your problem</option>';
    detailSelect.innerHTML = '<option value="">First select problem category</option>';

    if (!type || !vehicleData[type]) {
        return;
    }

    const companies = vehicleData[type].companies;

    Object.keys(companies).forEach(function(company) {
        const option = document.createElement("option");
        option.value = company;
        option.textContent = company;
        companySelect.appendChild(option);
    });

    Object.keys(vehicleData[type].problems).forEach(function(problem) {
        const option = document.createElement("option");
        option.value = problem;
        option.textContent = problem;
        problemSelect.appendChild(option);
    });
}

function updateModelOptions() {
    const type = document.getElementById("vehicleType").value;
    const company = document.getElementById("vehicleCompany").value;
    const modelSelect = document.getElementById("vehicleModel");

    modelSelect.innerHTML = '<option value="">Select model</option>';

    if (!type || !company || !vehicleData[type]) {
        return;
    }

    const models = vehicleData[type].companies[company] || ["Other model"];

    models.forEach(function(model) {
        const option = document.createElement("option");
        option.value = model;
        option.textContent = model;
        modelSelect.appendChild(option);
    });
}

function updateProblemDetails() {
    const type = document.getElementById("vehicleType").value;
    const problem = document.getElementById("problem").value;
    const detailSelect = document.getElementById("problemDetail");

    detailSelect.innerHTML = '<option value="">Select specific issue</option>';

    if (!type || !problem || !vehicleData[type]) {
        return;
    }

    const details = vehicleData[type].problems[problem] || ["Other issue"];

    details.forEach(function(detail) {
        const option = document.createElement("option");
        option.value = detail;
        option.textContent = detail;
        detailSelect.appendChild(option);
    });
}

// ----------------------------------
// CREATE OR EDIT REQUEST
// ----------------------------------

function saveRequest(event) {
    event.preventDefault();

    if (!currentUser || currentUser.role !== "Driver") {
        return;
    }

    const editingId = document.getElementById("editingJobId").value;

    const vehicleType = document.getElementById("vehicleType").value;
    const company = document.getElementById("vehicleCompany").value;
    const model = document.getElementById("vehicleModel").value;
    const year = document.getElementById("vehicleYear").value;
    const problem = document.getElementById("problem").value;
    const problemDetail = document.getElementById("problemDetail").value;
    const location = document.getElementById("location").value.trim();
    const extraDetails = document.getElementById("extraDetails").value.trim();

    if (!vehicleType || !company || !model || !problem ||
        !problemDetail || !location) {
        document.getElementById("requestMessage").textContent =
            "Please complete all required fields.";
        return;
    }

    const vehicleName = [year, company, model].filter(Boolean).join(" ");
    const message = document.getElementById("requestMessage");

    if (editingId) {
        const job = requests.find(function(item) {
            return String(item.id) === String(editingId) &&
                   item.driverEmail === currentUser.email;
        });

        if (!job || job.status !== "Waiting for mechanic") {
            message.textContent =
                "This request can no longer be edited because a mechanic has responded.";
            return;
        }

        job.vehicleType = vehicleType;
        job.company = company;
        job.model = model;
        job.year = year;
        job.vehicle = vehicleName;
        job.issue = problem;
        job.problemDetail = problemDetail;
        job.location = location;
        job.extraDetails = extraDetails;
        job.updatedDate = new Date().toLocaleString();

        saveRequests();
        resetRequestForm();
        renderJobs();

        message.textContent = "Your request has been updated.";
        return;
    }

    const job = {
        id: Date.now(),
        driver: currentUser.name,
        driverEmail: currentUser.email,
        vehicleType: vehicleType,
        company: company,
        model: model,
        year: year,
        vehicle: vehicleName,
        issue: problem,
        problemDetail: problemDetail,
        location: location,
        extraDetails: extraDetails,
        mechanic: "",
        mechanicEmail: "",
        price: 0,
        status: "Waiting for mechanic",
        date: new Date().toLocaleString(),
        updatedDate: ""
    };

    requests.push(job);
    saveRequests();
    resetRequestForm();
    renderJobs();

    message.textContent = "Your roadside assistance request has been submitted.";
}

function saveRequests() {
    localStorage.setItem("roadRequests", JSON.stringify(requests));
}

function resetRequestForm() {
    document.getElementById("requestForm").reset();
    document.getElementById("editingJobId").value = "";
    document.getElementById("requestSubmit").textContent = "Submit request ↗";
    document.getElementById("cancelEdit").style.display = "none";

    document.getElementById("vehicleCompany").innerHTML =
        '<option value="">First select vehicle type</option>';
    document.getElementById("vehicleModel").innerHTML =
        '<option value="">First select company</option>';
    document.getElementById("problem").innerHTML =
        '<option value="">Select your problem</option>';
    document.getElementById("problemDetail").innerHTML =
        '<option value="">First select problem category</option>';
}

// ----------------------------------
// EDIT A DRIVER REQUEST
// ----------------------------------

function editRequest(id) {
    const job = requests.find(function(item) {
        return item.id === id &&
               item.driverEmail === currentUser.email;
    });

    if (!job || job.status !== "Waiting for mechanic") {
        alert("You can edit a request only before a mechanic responds.");
        return;
    }

    document.getElementById("editingJobId").value = job.id;

    document.getElementById("vehicleType").value = job.vehicleType;
    updateVehicleOptions();

    document.getElementById("vehicleCompany").value = job.company;
    updateModelOptions();

    document.getElementById("vehicleModel").value = job.model;
    document.getElementById("vehicleYear").value = job.year || "";

    document.getElementById("problem").value = job.issue;
    updateProblemDetails();

    document.getElementById("problemDetail").value = job.problemDetail;
    document.getElementById("location").value = job.location;
    document.getElementById("extraDetails").value = job.extraDetails || "";

    document.getElementById("requestSubmit").textContent = "Save changes ✓";
    document.getElementById("cancelEdit").style.display = "inline-flex";
    document.getElementById("requestMessage").textContent =
        "Editing your request. Save your changes when ready.";

    document.getElementById("driverPanel").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

function cancelEdit() {
    resetRequestForm();
    document.getElementById("requestMessage").textContent = "";
}

// ----------------------------------
// DISPLAY JOB CARDS
// ----------------------------------

function renderJobs() {
    if (!currentUser) {
        return;
    }

    const container = document.getElementById("jobsContainer");
    container.innerHTML = "";

    let visibleJobs = requests.filter(function(job) {
        if (job.status === "Completed" || job.status === "Rejected") {
            return false;
        }

        if (currentUser.role === "Driver") {
            return job.driverEmail === currentUser.email;
        }

        return job.status === "Waiting for mechanic" ||
               job.mechanicEmail === currentUser.email;
    });

    visibleJobs.sort(function(a, b) {
        return b.id - a.id;
    });

    if (visibleJobs.length === 0) {
        container.innerHTML =
            '<div class="empty-state">No active requests right now. New activity will appear here.</div>';
        return;
    }

    visibleJobs.forEach(function(job) {
        const card = document.createElement("article");
        card.className = "job-card";

        let html = `
            <h3>${escapeHTML(job.issue)}: ${escapeHTML(job.problemDetail)}</h3>
            <p><strong>Driver:</strong> ${escapeHTML(job.driver)}</p>
            <p><strong>Vehicle type:</strong> ${escapeHTML(job.vehicleType || "Other")}</p>
            <p><strong>Vehicle:</strong> ${escapeHTML(job.vehicle)}</p>
            <p><strong>Location:</strong> ${escapeHTML(job.location)}</p>
            <p><strong>Request date:</strong> ${escapeHTML(job.date)}</p>
        `;

        if (job.extraDetails) {
            html += `<p><strong>Extra details:</strong> ${escapeHTML(job.extraDetails)}</p>`;
        }

        if (job.updatedDate) {
            html += `<p><strong>Last updated:</strong> ${escapeHTML(job.updatedDate)}</p>`;
        }

        if (job.mechanic) {
            html += `<p><strong>Mechanic:</strong> ${escapeHTML(job.mechanic)}</p>`;
        }

        if (job.price > 0) {
            html += `<p><strong>Offered price:</strong> PKR ${Number(job.price).toLocaleString()}</p>`;
        }

        html += `<span class="job-status">${escapeHTML(job.status)}</span>`;

        if (currentUser.role === "Driver") {
            if (job.status === "Waiting for mechanic") {
                html += `
                    <div class="job-actions">
                        <button class="edit-btn" onclick="editRequest(${job.id})">Edit request ✎</button>
                        <button class="reject-btn" onclick="cancelRequest(${job.id})">Cancel request</button>
                    </div>
                `;
            } else if (job.status === "Price offered to driver") {
                html += `
                    <p>A mechanic has sent a price offer. Review it below.</p>
                    <div class="job-actions">
                        <button class="accept-btn" onclick="acceptPrice(${job.id})">Accept price ✓</button>
                        <button class="reject-btn" onclick="rejectPrice(${job.id})">Reject offer</button>
                    </div>
                `;
            } else if (job.status === "Mechanic is on the way") {
                html += `<p><strong>✓ Your mechanic is on the way!</strong></p>`;
            }
        }

        if (currentUser.role === "Mechanic") {
            if (job.status === "Waiting for mechanic") {
                html += `
                    <label for="price-${job.id}">Your service price (PKR)</label>
                    <input type="number" id="price-${job.id}" min="1" step="1"
                        placeholder="Enter your price">
                    <div class="job-actions">
                        <button onclick="sendPrice(${job.id})">Send price offer ↗</button>
                    </div>
                `;
            } else if (job.mechanicEmail === currentUser.email &&
                       job.status === "Price offered to driver") {
                html += `<p>Waiting for the driver to accept or reject your offer.</p>`;
            } else if (job.mechanicEmail === currentUser.email &&
                       job.status === "Mechanic is on the way") {
                html += `
                    <div class="job-actions">
                        <button class="complete-btn" onclick="completeJob(${job.id})">
                            Mark job completed ✓
                        </button>
                    </div>
                `;
            }
        }

        card.innerHTML = html;
        container.appendChild(card);
    });
}

function escapeHTML(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function(char) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        }[char];
    });
}

// ----------------------------------
// DRIVER CANCELS A REQUEST
// ----------------------------------

function cancelRequest(id) {
    const job = requests.find(function(item) {
        return item.id === id &&
               item.driverEmail === currentUser.email;
    });

    if (!job || job.status !== "Waiting for mechanic") {
        alert("This request can no longer be cancelled here.");
        return;
    }

    if (!confirm("Are you sure you want to cancel this request?")) {
        return;
    }

    requests = requests.filter(function(item) {
        return item.id !== id;
    });

    saveRequests();
    renderJobs();
}

// ----------------------------------
// MECHANIC SENDS A PRICE OFFER
// ----------------------------------

function sendPrice(id) {
    const job = requests.find(function(item) {
        return item.id === id;
    });

    if (!job || job.status !== "Waiting for mechanic") {
        alert("This request is no longer available.");
        renderJobs();
        return;
    }

    const input = document.getElementById("price-" + id);
    const price = Number(input.value);

    if (!Number.isFinite(price) || price <= 0) {
        alert("Please enter a valid price greater than zero.");
        return;
    }

    job.price = price;
    job.mechanic = currentUser.name;
    job.mechanicEmail = currentUser.email;
    job.status = "Price offered to driver";

    saveRequests();
    renderJobs();
    alert("Price offer sent to the driver!");
}

// ----------------------------------
// DRIVER ACCEPTS OR REJECTS
// ----------------------------------

function acceptPrice(id) {
    const job = requests.find(function(item) {
        return item.id === id &&
               item.driverEmail === currentUser.email;
    });

    if (!job || job.status !== "Price offered to driver") {
        alert("This price offer is no longer available.");
        renderJobs();
        return;
    }

    job.status = "Mechanic is on the way";

    saveRequests();
    renderJobs();
    alert("Price accepted! Mechanic is on the way.");
}

function rejectPrice(id) {
    const job = requests.find(function(item) {
        return item.id === id &&
               item.driverEmail === currentUser.email;
    });

    if (!job || job.status !== "Price offered to driver") {
        alert("This price offer is no longer available.");
        renderJobs();
        return;
    }

    job.status = "Rejected";
    saveRequests();
    renderJobs();
    alert("Price offer rejected.");
}

// ----------------------------------
// MECHANIC COMPLETES JOB
// ----------------------------------

function completeJob(id) {
    const job = requests.find(function(item) {
        return item.id === id &&
               item.mechanicEmail === currentUser.email;
    });

    if (!job || job.status !== "Mechanic is on the way") {
        alert("This job cannot be marked as completed.");
        renderJobs();
        return;
    }

    if (!confirm("Confirm that this job has been completed?")) {
        return;
    }

    job.status = "Completed";
    job.completedDate = new Date().toLocaleString();

    saveRequests();
    renderJobs();

    if (document.getElementById("historySection").style.display !== "none") {
        renderHistory();
    }

    alert("Job completed and moved to history.");
}

// ----------------------------------
// HISTORY
// ----------------------------------

function toggleHistory() {
    const section = document.getElementById("historySection");
    const buttonText = document.getElementById("historyButtonText");

    if (section.style.display === "none") {
        section.style.display = "block";
        buttonText.textContent = "Hide history ↑";
        renderHistory();

        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    } else {
        section.style.display = "none";
        buttonText.textContent = "View history ↗";
    }
}

function renderHistory() {
    const container = document.getElementById("historyContainer");
    container.innerHTML = "";

    const completedJobs = requests.filter(function(job) {
        if (job.status !== "Completed") {
            return false;
        }

        if (currentUser.role === "Driver") {
            return job.driverEmail === currentUser.email;
        }

        return job.mechanicEmail === currentUser.email;
    });

    completedJobs.sort(function(a, b) {
        return b.id - a.id;
    });

    if (completedJobs.length === 0) {
        container.innerHTML =
            '<div class="empty-state">No completed jobs yet. Your completed jobs will appear here.</div>';
        return;
    }

    completedJobs.forEach(function(job) {
        const card = document.createElement("article");
        card.className = "job-card";

        card.innerHTML = `
            <h3>${escapeHTML(job.issue)}: ${escapeHTML(job.problemDetail)}</h3>
            <p><strong>Vehicle:</strong> ${escapeHTML(job.vehicle)}</p>
            <p><strong>Location:</strong> ${escapeHTML(job.location)}</p>
            <p><strong>Driver:</strong> ${escapeHTML(job.driver)}</p>
            <p><strong>Mechanic:</strong> ${escapeHTML(job.mechanic)}</p>
            <p><strong>Final offered price:</strong> PKR ${Number(job.price).toLocaleString()}</p>
            <p><strong>Completed on:</strong> ${escapeHTML(job.completedDate || "Not recorded")}</p>
            <span class="job-status">Completed ✓</span>
        `;

        container.appendChild(card);
    });

// ----------------------------------
// INITIAL SETUP
// ----------------------------------

populateYears();
updateMenu();
goHome();}