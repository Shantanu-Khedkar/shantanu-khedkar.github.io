var r = document.querySelector(':root');


function extractVariableNames(line){
    return line.split(" ")[0].slice(2, -1).split("_")
}
function packCSS(a, b){
    return "--"+a+"_"+b
}

colorHandlerCSS = document.getElementById("colorHandlers").innerText.trim()
colorHandlerCSS = colorHandlerCSS.slice(10,-2)
colorHandlerCSS = colorHandlerCSS.split("\n")
colorHandlerCSS = colorHandlerCSS.map(line => extractVariableNames(line));

function checkDarkTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 1 : 0;
}
function disableAllTransitions() {
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
        element.style.transition = 'none';
    });
}
function enableAllTransitions() {
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
        element.style.transition = '';  // Reset the transition property
       
    });
}



function switchTheme(theme){
   disableAllTransitions();
    colorHandlerCSS.forEach(function(pair){setProperty(packCSS(pair[0],pair[1]), pair[theme])})
    document.querySelector(".logo").style.setProperty("background-image", " url('/assets/LogoThemed"+theme+".svg')")
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) == "index.html"){document.getElementById("profile-vector").src = "./assets/profile"+theme+".svg";}
    
    setTimeout(() => {
    enableAllTransitions();
}, 20);
}
function toggleTheme(){
    switchTheme(globalTheme ? 0 : 1)
    
    globalTheme = globalTheme ? 0 : 1
    document.getElementsByClassName('fa-'+themeIcon(globalTheme ? 0 : 1))[0].style.setProperty("color", "var(--light-grey-1_dark-grey-2)")
    document.getElementsByClassName('fa-'+themeIcon(globalTheme ? 0 : 1))[1].style.setProperty("color", "var(--light-grey-1_dark-grey-2)")
    document.getElementsByClassName('fa-'+themeIcon(globalTheme))[0].style.setProperty("color", "var(--primary)")
    document.getElementsByClassName('fa-'+themeIcon(globalTheme))[1].style.setProperty("color", "var(--primary)")
    
}
function setProperty(propertyName, propertyValue){
    r.style.setProperty(propertyName, 'var(--'+propertyValue+')');
}
var themeIcon = (theme) => {return theme ? "moon":"sun"}
globalTheme = checkDarkTheme()
switchTheme(globalTheme)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    darkThemePreference = event.matches ? 1 : 0;
    globalTheme = darkThemePreference
    switchTheme(globalTheme)
});
function checkWindowSize() {
   
    if (window.innerWidth > 1024) {
        document.getElementById('top-nav').classList.remove('responsive-nav') // Close responsive nav
        document.getElementById('top-nav').classList.remove('flipped')
        document.getElementById('menu-btn').firstElementChild.style.setProperty("display", "none")
        document.getElementById('menu-btn').lastElementChild.style.setProperty("display", "block")
        document.getElementById('menu-btn').children[1].style.setProperty("display", "block")
        document.getElementById('menu-btn').style.setProperty("width", "96px")
        document.getElementsByClassName('fa-'+themeIcon(globalTheme ? 0 : 1))[0].style.setProperty("color", "var(--light-grey-1_dark-grey-1)")
        document.getElementsByClassName('fa-'+themeIcon(globalTheme ? 0 : 1))[1].style.setProperty("color", "var(--light-grey-1_dark-grey-1)")
        document.getElementById('menu-btn').setAttribute('onclick', "toggleTheme()")
    }   
    else{
        document.getElementById('menu-btn').firstElementChild.style.setProperty("display", "block")
        document.getElementById('menu-btn').lastElementChild.style.setProperty("display", "none")
        document.getElementById('menu-btn').children[1].style.setProperty("display", "none")
        document.getElementById('menu-btn').style.setProperty("width", "48px")
        document.getElementById('menu-btn').setAttribute('onclick',"this.parentElement.classList.toggle('responsive-nav'); isOffscreen()")
        document.getElementsByClassName('fa-'+themeIcon(globalTheme ? 0 : 1))[1].style.setProperty("color", "var(--light-grey-1_dark-grey-1)")
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

function tryBack(fallback){
    try{
        history.back()
    }catch (e){
        window.location.assign(fallback)
    }
}