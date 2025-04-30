function createRipple(event) {
    const link = event.currentTarget;
    
    const ripple = document.createElement("span");
    const rect = link.getBoundingClientRect();
    
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;
    
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - rect.left - radius}px`;
    ripple.style.top = `${event.clientY - rect.top - radius}px`;
    ripple.className = "ripple";
    
    // Remove existing ripple
    const existingRipple = link.querySelector(".ripple");
    if (existingRipple) {
        existingRipple.remove();
    }
    
    link.appendChild(ripple);
}

// Add ripple effect to main navigation links only
document.addEventListener('DOMContentLoaded', () => {
    const mainNavLinks = document.querySelectorAll('.navbar-nav > .nav-item:not(.dropdown) > .nav-link');
    mainNavLinks.forEach(link => {
        link.style.position = 'relative';
        link.style.overflow = 'hidden';
        link.addEventListener('click', createRipple);
    });
});