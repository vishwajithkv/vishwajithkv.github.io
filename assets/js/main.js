/*-----------------------------------------------
                Toggle Menu
-------------------------------------------------*/                
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById('menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  // Toggle mobile menu visibility
  menuToggle.addEventListener('click', function () {
    mobileMenu.classList.toggle('active');
    const icon = menuToggle.querySelector('i');

    if (mobileMenu.classList.contains('active')) {
      icon.classList.remove('bi-list');
      icon.classList.add('bi-x');
    } else {
      icon.classList.remove('bi-x');
      icon.classList.add('bi-list');
    }
  });

});

let options = {
  root: document.querySelector("menu-button"),
  rootMargin: "0px",
  threshold: 0.2,
};

let observer = new IntersectionObserver((arg) => {
  const isIntersecting = arg.some(item => item.isIntersecting);
  const isMobile = window.matchMedia("(width < 900px)").matches
  const menuToggle = document.getElementById('menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const icon = menuToggle.querySelector('i');
  const nav = document.querySelector('#nav')
  if (isIntersecting && !isMobile) {
    menuToggle.style.display = 'none';
    nav.style.display = 'flex';
    icon.classList.remove('bi-x');
    icon.classList.add('bi-list');
    mobileMenu.classList.remove('active')
  }
  else {
    menuToggle.style.display = 'block';
    nav.style.display = 'none';
  }
}, options);
observer.observe(document.querySelector("#home"));

/*-----------------------------------------------
           Hero typewriter effect
-------------------------------------------------*/
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 7) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName('typewrite');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};

/*-------------------------------------------
          Moment Section Gallery
---------------------------------------------*/
document.addEventListener("DOMContentLoaded", function () {

  const isMobile = window.matchMedia("(width < 900px)").matches

  if (!isMobile) {
    let slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) {
      showSlides(slideIndex += n);
    }

    function currentSlide(n) {
      showSlides(slideIndex = n);
    }

    function showSlides(n) {
      let i;
      let slides = document.getElementsByClassName("mySlides");
      let dots = document.getElementsByClassName("dot");
      if (n > slides.length) { slideIndex = 1 }
      if (n < 1) { slideIndex = slides.length }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " active";
    }

    // Expose functions to global scope to be accessible from HTML
    window.plusSlides = plusSlides;
    window.currentSlide = currentSlide;
  }
});

/*-------------------------------------------
             Back to top buton
---------------------------------------------*/
const backToTopButton = document.querySelector('.back-to-top');

if (backToTopButton) {
  const toggleBackToTop = () => {
    backToTopButton.classList.toggle('active', window.scrollY > 100);
  };

  window.addEventListener('scroll', toggleBackToTop);
}

/*---------------------------------------------
            Website theme changer.
----------------------------------------------*/
const homeSection = document.getElementById('home');
const aboutSection = document.getElementById('about');
const momentSection = document.getElementById('moments');
const gameSection = document.getElementById('game');
const toggleMobileMenu = document.getElementById('menu-button');
const mobileMenu = document.getElementById('mobile-menu');


const toggleBtn = document.querySelector('#theme-btn');
const mobileToggleBtn = document.querySelector('#mobiletheme-btn');

// Function to toggle between light and dark mode icons
function toggleThemeIconsAndText() {
  if (document.body.classList.contains('dark-mode')) {
      // Set icon for light mode
      toggleBtn.innerHTML = '<i class="bi bi-brightness-high-fill"></i>';
      mobileToggleBtn.innerHTML = '<i class="bi bi-brightness-high-fill"></i> Light Mode';
  } else {
      // Set icon for dark mode
      toggleBtn.innerHTML = '<i class="bi bi-moon-fill"></i>';
      mobileToggleBtn.innerHTML = '<i class="bi bi-moon-fill"></i> Dark Mode';
  }
}

// Event listener for theme toggle button
toggleBtn.addEventListener('click', toggleMode);

// Prevent default anchor behavior
mobileToggleBtn.addEventListener('click', (e) => {
  e.preventDefault(); 
  toggleMode();
});

function toggleMode() {
  document.body.classList.toggle('dark-mode');
  document.body.classList.toggle('light-mode');
  homeSection.classList.toggle('dark-mode');
  homeSection.classList.toggle('light-mode');
  aboutSection.classList.toggle('dark-mode');
  aboutSection.classList.toggle('light-mode');
  momentSection.classList.toggle('dark-mode');
  momentSection.classList.toggle('light-mode');
  gameSection.classList.toggle('dark-mode');
  gameSection.classList.toggle('light-mode');
  backToTopButton.classList.toggle('dark-mode');
  backToTopButton.classList.toggle('light-mode');
  toggleMobileMenu.classList.toggle('dark-mode');
  toggleMobileMenu.classList.toggle('light-mode');
  mobileMenu.classList.toggle('dark-mode');
  mobileMenu.classList.toggle('light-mode');
  toggleThemeIconsAndText();
}

// Call the function initially to set the correct icon based on the initial theme mode
toggleThemeIconsAndText();

// Check if dark mode is preferred by the user
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Function to set the initial theme based on user preference
function setInitialTheme() {
  if (prefersDarkMode) {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
    homeSection.classList.add('dark-mode');
    homeSection.classList.remove('light-mode');
    aboutSection.classList.add('dark-mode');
    aboutSection.classList.remove('light-mode');
    momentSection.classList.add('dark-mode');
    momentSection.classList.remove('light-mode');
    gameSection.classList.add('dark-mode');
    gameSection.classList.remove('light-mode');
    backToTopButton.classList.add('dark-mode');
    backToTopButton.classList.remove('light-mode');
    toggleMobileMenu.classList.add('dark-mode');
    toggleMobileMenu.classList.remove('light-mode');
    mobileMenu.classList.add('dark-mode');
    mobileMenu.classList.remove('light-mode');
  }

  else {
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
    homeSection.classList.add('light-mode');
    homeSection.classList.remove('dark-mode');
    aboutSection.classList.add('light-mode');
    aboutSection.classList.remove('dark-mode');
    momentSection.classList.add('light-mode');
    momentSection.classList.remove('dark-mode');
    gameSection.classList.add('light-mode');
    gameSection.classList.remove('dark-mode');
    backToTopButton.classList.add('light-mode');
    backToTopButton.classList.remove('dark-mode');
    toggleMobileMenu.classList.add('light-mode');
    toggleMobileMenu.classList.remove('dark-mode');
    mobileMenu.classList.add('light-mode');
    mobileMenu.classList.remove('dark-mode');
  }
  toggleThemeIconsAndText();
}

// Set the initial theme when the page loads
document.addEventListener('DOMContentLoaded', setInitialTheme);




















