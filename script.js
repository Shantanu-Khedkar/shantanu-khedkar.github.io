function checkWindowSize() {
    if (window.innerWidth > 1024) {
        document.getElementById('top-nav').classList.remove('responsive-nav') // Close responsive nav
        document.getElementById('top-nav').classList.remove('flipped')
    }
    if (window.innerHeight < 450){
        document.getElementById('nav-opt').parentElement.classList.add('covered')
    }
    else{
        document.getElementById('nav-opt').parentElement.classList.remove('covered')
    }
}

// Event listener for window resize
window.addEventListener('resize', checkWindowSize);
window.addEventListener('scroll', isOffscreen)


function isOffscreen() {
    const nav = document.getElementById('nav-opt')
    const rect = nav.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    if(rect.top < -40 && nav.parentElement.classList.contains('flipped')){
        console.log('flipped')
        if(window.innerHeight > 450){
        nav.parentElement.classList.remove('flipped')
        }
    }

    if(rect.top+rect.height > (viewportHeight + 40)&& nav.parentElement.classList.contains('responsive-nav')){
        console.log('flipped')
        nav.parentElement.classList.add('flipped')
    }

    if(!nav.parentElement.classList.contains('responsive-nav') && nav.parentElement.classList.contains('flipped')){
                console.log('flipped')
        nav.parentElement.classList.remove('flipped')

    }

}

checkWindowSize()



window.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section'); // Select all sections

    const setActiveLink = () => {
        var currentSection = null;
        var maxVisibleArea = 0;

        // Check each section to see which is most visible in viewport
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const visibleArea = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(0, rect.top));

            if (visibleArea > maxVisibleArea) {
                maxVisibleArea = visibleArea;
                currentSection = section;
            }
        });

        // Update links
        const currentLinkId = `n-${currentSection ? currentSection.id : ''}`;
        const links = document.querySelectorAll('a[id^="n-"]');

        // Remove 'current' class from all links and add to the current one
        links.forEach(link => link.classList.remove('current'));
        if (currentSection) {
            const currentLink = document.getElementById(currentLinkId);
            if (currentLink) {
                currentLink.classList.add('current');
            }
        }
    };

    // Initial call
    setActiveLink();

    // Add scroll event listener to update on scroll
    window.addEventListener('scroll', setActiveLink);
});

document.getElementById("module-container").addEventListener("animationend", function(){
    document.getElementById("module-container").style.webkitTransform = 'transform2D(0,0)'
})