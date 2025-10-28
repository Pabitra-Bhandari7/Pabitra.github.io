// ==============================================
// 1. Mobile Menu Toggle
// ==============================================
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    menuToggle.addEventListener('click', () => {
        // Toggle the 'active' class to show/hide the menu (CSS handles the display)
        mainNav.classList.toggle('active');
        
        // Toggle the icon between bars and X
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
        
        // Toggle ARIA attributes
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
        menuToggle.setAttribute('aria-expanded', !isExpanded);
    });
});

// ==============================================
// 2. Skill Bar Animation on Scroll (Intersection Observer)
// ==============================================
const skillItems = document.querySelectorAll('.skill-item');

const skillObserverOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5 // Trigger when 50% of the skill item is visible
};

const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Find the progress fill div within the skill item
            const progressFill = entry.target.querySelector('.progress-fill');
            // Get the target width from the 'data-skill-percent' attribute
            const percent = entry.target.getAttribute('data-skill-percent');
            
            // Apply the width to start the CSS transition animation
            progressFill.style.width = percent + '%';
            
            // Stop observing after the animation starts
            observer.unobserve(entry.target);
        }
    });
}, skillObserverOptions);

// Start observing each skill item
skillItems.forEach(skill => {
    skillObserver.observe(skill);
});

// ==============================================
// 3. Dynamic Typing Effect (Matching Video's H3)
// ==============================================
const dynamicText = document.querySelector('.job-title-dynamic');
const words = ["Creator", "Developer", "Learner", "Problem Solver"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        // Deleting phase
        dynamicText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Typing phase
        dynamicText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typingSpeed = 100;
    
    if (!isDeleting && charIndex === currentWord.length) {
        // Pause at end of word
        typingSpeed = 1500;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // Done deleting, move to next word
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
}

// Start the typing effect when the page loads
typeEffect();