// First, we need to create a function to handle the scroll reveal
function scrollReveal() {
    // Select all elements you want to reveal (you'll need to add the class 'reveal' to these elements in HTML)
    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach((element) => {
        // Get the element's position relative to the viewport
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 5; // You can adjust this value to change when the element becomes visible

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        } else {
            element.classList.remove('active');
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', scrollReveal);

// Call the function on page load
scrollReveal();