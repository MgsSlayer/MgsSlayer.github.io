// HAMBURGER MENU FOR MOBILE
function toggleMenu() {
  const menu = document.querySelectorAll('.menu-links, .harmburger-icon');
  
  menu.forEach(element =>{
    element.classList.toggle("open");
  })
}

// var typed = new Typed(".typing",{
//   strings:["","Web Developer","Network Admin","Web Designer"],
//   typeSpeed:100,
//   BackSpeed:60,
//   loop:true
// })

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
  const darkdiv = document.querySelectorAll('body, p, a, h2, button, .menu-links, .span2, .title, .section__text__p1, .details-container, #profile_pic, #message, #subject, #mess-me, #about-pic'); 

  darkdiv.forEach(element => {
                element.classList.toggle('darkmode');
            });          
}


// ALERT AND STYLING FOR EMAIL
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("emailForm");
  const messageInput = document.getElementById("message");
  const alertBox = document.getElementById("alertBox");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission

    const message = messageInput.value;

    try {
      const response = await fetch("/send_email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        // Show success alert
        alertBox.innerHTML = "Message sent successfully!";
        alertBox.style.color = "green";
      } else {
        // Show error alert
        alertBox.innerHTML = "Failed to send the message.";
        alertBox.style.color = "red";
      }
    } catch (error) {
      alertBox.innerHTML = "An error occurred. Please try again.";
      alertBox.style.color = "red";
      console.error("Error:", error);
    }

    // Clear the message input
    messageInput.value = "";

    setTimeout(() => {
      alertBox.textContent = "";
      alertBox.classList.remove("show"); // Optionally remove a visibility class
    }, 5000);
  });
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
// translateX: isMobile ? '350px' : '40.7%', 
//   translateY: isMobile ? '-280px' : '0', 

