/* Tilt Effect for Stack Grid - Inspired by https://gijsroge.github.io/tilt.js/ */
const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
maxT = 20;
function tilt(e){
    bounds = e.target.getBoundingClientRect()
    rX = e.clientX - bounds.left; // Relative X
    rY = e.clientY - bounds.top; // Relative Y
    pX = rX / bounds.width; // Percent X
    pY = rY / bounds.height; // Percent Y
    pXh = clamp(Math.round(pX * 100), 40, 60).toString() // Percent X Hundred Clamped
    pYh = clamp(Math.round(pY * 100), 40, 60).toString() // Percent Y Hundred Clamped
    cX = (pX - 0.5) * -2 // Centered X
    cY = (pY - 0.5) * 2 // Centered Y
    tX = Math.round(cX * maxT).toString() // Tilt X
    tY = Math.round(cY * maxT).toString() // Tilt Y
    console.log(tX, tY)
    e.target.style.transform= "translateZ(60px) rotateX("+tY+"deg) rotateY("+tX+"deg)"
    e.target.style.transformOrigin = pXh+"% "+pYh+"%"
   
    e.target.style.setProperty("--opac", pY / 2);
    e.target.style.setProperty("--rot", Math.round(180 + (cX * 50))+"deg");

}
function tiltReset(e){
    e.target.style.transform= ""
}

function addTilt(container){
    container.addEventListener("mousemove", tilt)
    container.addEventListener("mouseleave", tiltReset)
}
function removeTilt(container){
    container.removeEventListener("mousemove", tilt)
    container.removeEventListener("mouseleave", tiltReset)
}

Array.from(document.getElementsByClassName("stack-grid")).forEach(function(grid){
Array.from(grid.children).forEach(function(gridSp){
addTilt(gridSp.children[0])

})

});