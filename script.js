function checkWindowSize() {
    if (window.innerWidth > 1024) {
        document.getElementById('top-nav').classList.remove('responsive-nav') // Close responsive nav
        document.getElementById('top-nav').classList.remove('flipped')
    }
}

// Event listener for window resize
window.addEventListener('resize', checkWindowSize);
window.addEventListener('scroll', isOffscreen)


function isOffscreen() {
    const nav = document.getElementById('nav-opt')
    const rect = nav.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    if(rect.top <0 && nav.parentElement.classList.contains('flipped')){
        console.log('flipped')
        nav.parentElement.classList.remove('flipped')
    }

    if(rect.top+rect.height > viewportHeight && nav.parentElement.classList.contains('responsive-nav')){
        console.log('flipped')
        nav.parentElement.classList.add('flipped')
    }

    if(!nav.parentElement.classList.contains('responsive-nav') && nav.parentElement.classList.contains('flipped')){
                console.log('flipped')
        nav.parentElement.classList.remove('flipped')
    }

}

