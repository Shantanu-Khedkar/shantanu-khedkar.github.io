function checkWindowSize() {
    if (window.innerWidth > 1024) {
        document.getElementById('top-nav').classList.remove('responsive-nav') // Close responsive nav
    }
}

// Event listener for window resize
window.addEventListener('resize', checkWindowSize);