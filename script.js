document.addEventListener("DOMContentLoaded", function() {
    fetch("http://localhost:5000/opportunities")
    .then(response => response.json())
    .then(data => {
        let list = document.getElementById("opportunity-list");
        data.forEach(opportunity => {
            let li = document.createElement("li");
            li.innerHTML = `<strong>${opportunity.title}</strong> - ${opportunity.location}`;
            list.appendChild(li);
        });
    })
    .catch(error => console.error("Error fetching opportunities:", error));
});

// Function to navigate between pages
function navigateTo(page) {
    window.location.href = page;
}

// Handle Profile Saving
document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("profile")) {
        const profile = JSON.parse(localStorage.getItem("profile"));
        document.getElementById("display-name").textContent = profile.name;
        document.getElementById("display-skills").textContent = profile.skills;
        document.getElementById("display-availability").textContent = profile.availability;
    }

    document.getElementById("profile-form")?.addEventListener("submit", function(event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const skills = document.getElementById("skills").value;
        const availability = document.getElementById("availability").value;
        localStorage.setItem("profile", JSON.stringify({ name, skills, availability }));
        alert("Profile saved successfully!");
        window.location.reload();
    });
});

// Signup Form Handling
document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup-form");
    if (signupForm) {
        console.log("Signup form found! ✅");
        signupForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const response = await fetch("http://127.0.0.1:5000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();
            alert(data.message);
            if (data.success) {
                window.location.href = "login.html";
            }
        });
    } else {
        console.error("Signup form not found! ❌");
    }
});

// Login Form Handling
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        console.log("Login form found! ✅");
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;

            const response = await fetch("http://127.0.0.1:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            alert(data.message);
            if (data.success) {
                localStorage.setItem("user", JSON.stringify(data.user));
                window.location.href = "index.html";
            }
        });
    } else {
        console.error("Login form not found! ❌");
    }
});

// Logout Button
document.getElementById("logout-btn")?.addEventListener("click", () => {
    localStorage.removeItem("user");
    alert("Logged out successfully!");
    window.location.href = "login.html";
});

// Volunteer Sign-Up Popup
document.addEventListener("click", (event) => {
    if (event.target.classList.contains('btn')) {
        event.preventDefault();
        const opportunityTitle = event.target.closest('.opportunity')?.querySelector('h2')?.textContent || 'an opportunity';
        openSignUpPopup(opportunityTitle);
    }
});

function openSignUpPopup(opportunityTitle) {
    const popupHTML = `
        <div class="popup-overlay">
            <div class="popup-content">
                <h2>Sign Up for ${opportunityTitle} 💖</h2>
                <form id="signupForm">
                    <input type="text" id="name" placeholder="Enter your name" required>
                    <input type="email" id="email" placeholder="Enter your email" required>
                    <textarea id="message" placeholder="Why do you want to volunteer?" required></textarea>
                    <button type="submit">Submit</button>
                </form>
                <button class="close-btn">Close</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', popupHTML);
    document.querySelector('.close-btn').addEventListener('click', closeSignUpPopup);
    document.querySelector('#signupForm').addEventListener('submit', handleFormSubmit);
}

function closeSignUpPopup() {
    document.querySelector('.popup-overlay').remove();
}

function handleFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        alert(`Thank you, ${name}! You've successfully signed up for the volunteering opportunity!`);
        closeSignUpPopup();
    } else {
        alert('Please fill in all the fields!');
    }
}

// Carousel Fix
const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentIndex = 0;

function moveCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * (250 + 20)}px)`;
}

prevBtn?.addEventListener('click', () => { if (currentIndex > 0) currentIndex--; moveCarousel(); });
nextBtn?.addEventListener('click', () => { if (currentIndex < carousel.children.length - 1) currentIndex++; moveCarousel(); });





