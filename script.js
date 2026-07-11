// FOOTER COPYRIGHT YEAR
document.getElementById('copyright-year').textContent = new Date().getFullYear();

// YEARS OF EXPERIENCE
const CAREER_START_YEAR = 2022;
const yearsExperience = new Date().getFullYear() - CAREER_START_YEAR;
document.getElementById('years-experience').textContent = yearsExperience;
document.getElementById('years-experience-inline').textContent = yearsExperience;

// HAMBURGER MENU FOR MOBILE
function toggleMenu() {
  const menu = document.querySelectorAll('.menu-links, .hamburger-icon');
  
  menu.forEach(element =>{
    element.classList.toggle("open");
  })
}

// CREATE DIVS FOR ANIMATION
function createDivs() {
  const container = document.querySelector(".container");
  const oneDiv = document.createElement("div");
  
  oneDiv.classList.add("div_anim");
 
  for (let i = 0; i < 10; i++) {
    const twoDiv = document.createElement("div");
    twoDiv.classList.add("anim_div");
    oneDiv.appendChild(twoDiv);
  }
  container.prepend(oneDiv); 
}

createDivs();

// DARK MODE
function applyDarkMode(isDark) {
  const darkdiv = document.querySelectorAll('body, p, a, h2, button, .menu-links, .span2, .title, .section__text__p1, .details-container, #profile_pic, #message, #subject, #ccontact, #mess-me, #about-pic, .fa-moon, .fa-sun');

  darkdiv.forEach(element => {
    element.classList.toggle('darkmode', isDark);
  });
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  document.dispatchEvent(new CustomEvent('themechange', { detail: { isDark } }));
}

function darkmode() {
  applyDarkMode(!document.body.classList.contains('darkmode'));
}

// default new visitors to dark mode; remember whatever they choose after that
const savedTheme = localStorage.getItem('theme');
applyDarkMode(savedTheme ? savedTheme === 'dark' : true);

// CONTACT FORM VALIDATION
function validateContactForm(formData) {
  const errors = {};
  const contact = formData.contact.trim();
  const subject = formData.subject.trim();
  const message = formData.message.trim();

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
  const isPhone = /^[+\d][\d\s\-()]{6,}$/.test(contact);
  if (!contact || (!isEmail && !isPhone)) {
    errors.ccontact = "Enter a valid email or phone number.";
  }
  if (!subject || subject.length < 2) {
    errors.subject = "Subject is required.";
  }
  if (!message || message.length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }
  return errors;
}

// MAILER STYLING AND ALERT
document.addEventListener("DOMContentLoaded", function() {
  const emailForm = document.getElementById("emailForm");

  // clear the error outline as soon as the user edits a flagged field
  ["ccontact", "subject", "message"].forEach(id => {
    document.getElementById(id).addEventListener("input", function() {
      this.classList.remove("input-error");
    });
  });

  // Prevent multiple event listeners from being added
  if (!emailForm.dataset.listener) {
      emailForm.dataset.listener = "true"; // Mark the form to prevent duplicate listeners

      emailForm.addEventListener("submit", async function(event) {
          event.preventDefault();

          const formData = {
              contact: document.getElementById("ccontact").value,
              subject: document.getElementById("subject").value,
              message: document.getElementById("message").value
          };

          const alertBox = document.getElementById("alertBox");
          const errors = validateContactForm(formData);
          const errorFields = Object.keys(errors);

          ["ccontact", "subject", "message"].forEach(id => {
            document.getElementById(id).classList.toggle("input-error", errorFields.includes(id));
          });

          if (errorFields.length) {
            alertBox.textContent = errors[errorFields[0]];
            alertBox.style.color = "red";
            return;
          }

          try {
              const response = await fetch("/.netlify/functions/index", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(formData)
              });

              if (!response.ok) {
                  throw new Error("Failed to send message.");
              }

              const result = await response.json();
              alertBox.innerHTML = result.message || "Message sent successfully!";
              alertBox.style.color = "green";
              
              document.getElementById("subject").value = "";
              document.getElementById("message").value = "";
              document.getElementById("ccontact").value = "";

              // Set timeout AFTER updating the alertBox
              setTimeout(() => {
                  alertBox.textContent = "";
                  alertBox.classList.remove("show");
              }, 5000);

          } catch (error) {
              alertBox.innerText = "Error: " + error.message;
              alertBox.style.color = "red";

              setTimeout(() => {
                  alertBox.textContent = "";
                  alertBox.classList.remove("show");
              }, 5000);
          }
      });
  }
});


// ANIMATIONS
let isMobile = window.innerWidth <= 1023;

let tl = anime.timeline({
  easing: 'easeOutExpo',
  duration: 750
});

tl.add({
  targets: '.div_anim .anim_div',
  width: '100%',
  backgroundColor: 'rgb(255, 140, 0)',
  delay: anime.stagger(100),
});

tl.add({
  targets: '.div_anim .anim_div',
  width: '90%',
  backgroundColor: 'rgb(255, 140, 0)',
});

tl.add({
  targets: '.main_body',
  opacity: 1,
  duration: 1500,
  easing: 'easeOutExpo',
  easing: 'easeInOutCubic'
}, '-=1800');

let rotate = anime({
  targets: '.div_anim',
  scale: '2',
  translateX: isMobile ? '69%' : '45.7%',
  translateY: isMobile ? '-40%' : '-3.7%',
  rotate: '45deg',
  duration: 7000,
});

//console.log(window.anime);

// REVEAL TECH STACK ITEMS ON SCROLL
const stackObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      anime({
        targets: entry.target.querySelectorAll('.stack-item'),
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(80),
        duration: 600,
        easing: 'easeOutExpo'
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.stack-row').forEach(row => stackObserver.observe(row));

// REVEAL SECTION ITEMS ON SCROLL
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      anime({
        targets: entry.target.querySelectorAll('.reveal-item'),
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(120),
        duration: 700,
        easing: 'easeOutExpo'
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal-group').forEach(group => revealObserver.observe(group));

// FALLING DOTS BACKGROUND
(function() {
  const canvas = document.getElementById('dots-canvas');
  const ctx = canvas.getContext('2d');
  let dots = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createDots() {
    const count = Math.floor((window.innerWidth * window.innerHeight) / 16000);
    dots = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.4 + 0.4,
      speed: Math.random() * 0.4 + 0.1
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const isDark = document.body.classList.contains('darkmode');
    ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(80, 80, 80, 0.35)';

    dots.forEach(dot => {
      dot.y += dot.speed;
      if (dot.y > canvas.height) {
        dot.y = 0;
        dot.x = Math.random() * canvas.width;
      }
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  resize();
  createDots();
  draw();

  window.addEventListener('resize', () => {
    resize();
    createDots();
  });
})();

// COMMIT HEATMAP (GitHub + GitLab, merged)
(function() {
  const canvas = document.getElementById('heatmap-canvas');
  const daysCanvas = document.getElementById('heatmap-days-canvas');
  const status = document.getElementById('heatmap-status');
  if (!canvas || !daysCanvas) return;

  const ctx = canvas.getContext('2d');
  const daysCtx = daysCanvas.getContext('2d');
  const CELL = 16;
  const GAP = 4;
  const STEP = CELL + GAP;

  const GITHUB_SCALE = ['#9be9a8', '#40c463', '#30a14e', '#216e39'];
  const GITLAB_SCALE = ['#fde0d0', '#fbb090', '#fc6d26', '#c94f0f'];
  const LABEL_HEIGHT = 18;
  const LABEL_WIDTH = 26;
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const DAY_LABELS = { 1: 'Mon', 3: 'Wed', 5: 'Fri' };

  function levelFor(count) {
    if (count <= 0) return -1;
    if (count <= 2) return 0;
    if (count <= 5) return 1;
    if (count <= 9) return 2;
    return 3;
  }

  function emptyColor() {
    return document.body.classList.contains('darkmode') ? '#2d2d2d' : '#ebedf0';
  }

  function labelColor() {
    return document.body.classList.contains('darkmode') ? '#cccccc' : '#555555';
  }

  let days = null;

  function render() {
    if (!days) return;

    // align the grid to full weeks, like GitHub's own graph
    const firstDate = new Date(days[0].date);
    const leadingBlanks = firstDate.getDay();
    const totalCells = leadingBlanks + days.length;
    const columns = Math.ceil(totalCells / 7);
    const gridHeight = LABEL_HEIGHT + 7 * STEP - GAP;

    // fixed day-of-week labels, outside the scrollable area
    daysCanvas.width = LABEL_WIDTH;
    daysCanvas.height = gridHeight;
    daysCtx.clearRect(0, 0, daysCanvas.width, daysCanvas.height);
    daysCtx.font = '11px sans-serif';
    daysCtx.fillStyle = labelColor();
    daysCtx.textBaseline = 'top';
    Object.entries(DAY_LABELS).forEach(([row, label]) => {
      daysCtx.fillText(label, 0, LABEL_HEIGHT + row * STEP);
    });

    // scrollable month labels + grid
    canvas.width = columns * STEP - GAP;
    canvas.height = gridHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '11px sans-serif';
    ctx.fillStyle = labelColor();
    ctx.textBaseline = 'top';

    let lastMonth = null;
    days.forEach((day, i) => {
      const cellIndex = leadingBlanks + i;
      const col = Math.floor(cellIndex / 7);
      const month = new Date(day.date).getMonth();
      if (month !== lastMonth) {
        ctx.fillText(MONTHS[month], col * STEP, 0);
        lastMonth = month;
      }
    });

    days.forEach((day, i) => {
      const cellIndex = leadingBlanks + i;
      const col = Math.floor(cellIndex / 7);
      const row = cellIndex % 7;
      const x = col * STEP;
      const y = LABEL_HEIGHT + row * STEP;

      const githubLevel = levelFor(day.github);
      const gitlabLevel = levelFor(day.gitlab);

      if (githubLevel !== -1 && gitlabLevel !== -1) {
        // activity on both platforms the same day - split the cell
        ctx.fillStyle = GITHUB_SCALE[githubLevel];
        ctx.fillRect(x, y, CELL / 2, CELL);

        ctx.fillStyle = GITLAB_SCALE[gitlabLevel];
        ctx.fillRect(x + CELL / 2, y, CELL / 2, CELL);
      } else if (githubLevel !== -1) {
        ctx.fillStyle = GITHUB_SCALE[githubLevel];
        ctx.fillRect(x, y, CELL, CELL);
      } else if (gitlabLevel !== -1) {
        ctx.fillStyle = GITLAB_SCALE[gitlabLevel];
        ctx.fillRect(x, y, CELL, CELL);
      } else {
        ctx.fillStyle = emptyColor();
        ctx.fillRect(x, y, CELL, CELL);
      }
    });
  }

  fetch('/.netlify/functions/heatmap')
    .then(response => {
      if (!response.ok) throw new Error('Request failed');
      return response.json();
    })
    .then(data => {
      days = data.days;
      render();
      if (data.errors && (data.errors.github || data.errors.gitlab)) {
        status.textContent = 'Some activity data could not be loaded.';
      }
    })
    .catch(() => {
      status.textContent = 'Activity data is unavailable right now.';
    });

  document.addEventListener('themechange', render);
})();
