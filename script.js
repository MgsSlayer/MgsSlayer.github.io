// HAMBURGER MENU FOR MOBILE
function toggleMenu() {
  const menu = document.querySelectorAll('.menu-links, .hamburger-icon');
  
  menu.forEach(element =>{
    element.classList.toggle("open");
  })
}

// CREATE DIVS FOR ANIMATION
function createDivs() {
  let container = document.querySelector(".container");
  let oneDiv = document.createElement("div");
  
  oneDiv.classList.add("div_anim");
 
  for (let i = 0; i < 10; i++) {
    let twoDiv = document.createElement("div");
    twoDiv.classList.add("anim_div");
    oneDiv.appendChild(twoDiv);
  }
  container.prepend(oneDiv); 
}

createDivs();

// DARK MODE
function darkmode() {
  const darkdiv = document.querySelectorAll('body, p, a, h2, button, .menu-links, .span2, .title, .section__text__p1, .details-container, #profile_pic, #message, #subject, #ccontact, #mess-me, #about-pic, .fa-moon, .fa-sun'); 
  const icon = document.querySelector(".dark-mode-icon");
  
  darkdiv.forEach(element => {
                element.classList.toggle('darkmode');
            });  
             
}

// MAILER STYLING AND ALERT
document.addEventListener("DOMContentLoaded", function() {
  let emailForm = document.getElementById("emailForm");

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

          try {
              const response = await fetch("/.netlify/functions/index", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(formData)
              });

              const alertBox = document.getElementById("alertBox");

              if (!response.ok) {
                  throw new Error("Failed to send message.");
              }

              const result = await response.json();
              alertBox.innerHTML = result.message || "Message sent successfully!";
              alertBox.style.color = "green";
              
              document.getElementById("subject").value = "";
              document.getElementById("message").value = "";

              // Set timeout AFTER updating the alertBox
              setTimeout(() => {
                  alertBox.textContent = "";
                  alertBox.classList.remove("show"); // Optionally remove a visibility class
              }, 5000);

          } catch (error) {
              let alertBox = document.getElementById("alertBox");
              alertBox.innerText = "Error: " + error.message;
              alertBox.style.color = "red";

              // Clear error message after 5 seconds
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

console.log(window.anime);
