function createRipple(event) {
    const item = event.currentTarget;
    
    const ripple = document.createElement("span");
    const rect = item.getBoundingClientRect();
    
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;
    
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - rect.left - radius}px`;
    ripple.style.top = `${event.clientY - rect.top - radius}px`;
    ripple.className = "ripple";
    
    // Remove existing ripple
    const existingRipple = item.querySelector(".ripple");
    if (existingRipple) {
        existingRipple.remove();
    }
    
    item.appendChild(ripple);
}

// Add ripple effect to all nav items
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', createRipple);
    });
});