function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

var typed = new Typed(".typing",{
  strings:["","Web Developer","Web Designer","Network Administrator"],
  typeSpeed:100,
  BackSpeed:60,
  loop:true
})

const ppp = document.getElementById('profile_pic');

function darkmode() {
  const darkdiv = document.querySelectorAll('.details-container'); 
  const dark_p = document.querySelectorAll('p');
  const dark_a = document.querySelectorAll('a');
  const dark_h2 = document.querySelectorAll('h2');
  const dark_btn = document.querySelectorAll('button');
  const dark_span = document.querySelectorAll('.span2');
  const dark_about_pic = document.querySelector('.about-pic');
  // const details_container = document.querySelector('.details-container');
  const profilePic = document.getElementById('profile_pic');
  
  
  dark_about_pic.classList.toggle('dark-mode-shadow');
  // details_container.classList.toggle('dark-mode-shadow');
  profilePic.classList.toggle('dark-mode-shadow');

  
  
  document.body.classList.toggle('darkmode');

//   details_container.forEach(element => {
//     element.classList.toggle('dark-mode-shadow');
// });


  
  darkdiv.forEach(element => {
                element.classList.toggle('darkmode');
            });
            
  dark_p.forEach(element => {
                element.classList.toggle('darkmode');
            });
            
  dark_a.forEach(element => {
                element.classList.toggle('darkmode');
            });
            
  dark_h2.forEach(element => {
                element.classList.toggle('darkmode');
            });
            
  dark_btn.forEach(element => {
                element.classList.toggle('darkmode');
            });
            
  dark_span.forEach(element => {
                element.classList.toggle('darkmode');
            });
            
}



