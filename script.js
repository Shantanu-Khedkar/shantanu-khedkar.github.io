function checkWindowSize() {
    if (window.innerWidth > 1024) {
        document.getElementById('top-nav').classList.remove('responsive-nav') // Close responsive nav
        document.getElementById('top-nav').classList.remove('flipped')
    }
    if (window.innerHeight < 550){
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

    if(rect.top <0 && nav.parentElement.classList.contains('flipped')){
        console.log('flipped')
        if(window.innerHeight > 450){
        nav.parentElement.classList.remove('flipped')
        }
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

checkWindowSize()



Array.from(document.getElementsByClassName("app-filebar-file")).forEach(function(elem){
        elem.addEventListener("click", function(e){
    if (!this.classList.contains("selected")){
        Array.from(document.getElementsByClassName("app-filebar-file")).forEach(function(elem){
            elem.classList.remove('selected')
            document.getElementById("f-"+elem.innerText).classList.remove("visible")
        })
        this.classList.toggle("selected");
        document.getElementById("f-"+this.innerText).classList.add("visible")
    }
})

})

document.getElementById('index-input').value = document.getElementById("hero-editable").innerHTML
document.getElementById('README-input').value = "# Text Editor Module\n\nThis is a simple text editor gimmick!\n\nWith the index.html file, you can see \nyour live edits to the hero section above...\nGo ahead, try it out. Feel free to go crazy\nwith your web dev skills. \n\nThe on the fly syntax highlighting is made\npossible in a manner similar to the clever code\n(here)[https://css-tricks.com/creating-an-editable-textarea-that-supports-syntax-highlighted-code/] \nAnyways, continue exploring my site!\n"


syncText(document.getElementById('index-input').value, document.getElementById('index-input').nextElementSibling)
syncText(document.getElementById('README-input').value, document.getElementById('README-input').nextElementSibling)

Array.from(document.getElementsByClassName("editarea-input")).forEach(function(elem){
elem.addEventListener('input', function(){
    syncScroll(this, this.nextElementSibling)
    
    syncText(this.value, this.nextElementSibling)
    if (this.id == 'index-input'){
    syncContent(this.value)
    }
})
elem.addEventListener('scroll', function(){
    syncScroll(this, this.nextElementSibling)
    console.log(this.nextElementSibling.classList)
    
})
})



function syncScroll(element, editareaHighlight){
    editareaHighlight.scrollTop = element.scrollTop;
    editareaHighlight.scrollLeft = element.scrollLeft;
}
function syncText(text, editareaHighlight){
      if(text[text.length-1] == "\n") { // If the last character is a newline character
    text += " "; // Add a placeholder space character to the final line 
  }
  editareaHighlight.children[0].textContent = text
  console.log(editareaHighlight.children[0])
  Prism.highlightElement(editareaHighlight.children[0]);
}
function syncContent(html){
document.getElementById("hero-editable").innerHTML = html
}

Array.from(document.getElementsByClassName("app-filebar-file")).forEach(function(elem){
        elem.addEventListener("click", function(e){
    if (!this.classList.contains("selected")){
        Array.from(document.getElementsByClassName("app-filebar-file")).forEach(function(elem){
            elem.classList.remove('selected')
            document.getElementById("f-"+elem.innerText).classList.remove("visible")
        })
        this.classList.toggle("selected");
        document.getElementById("f-"+this.innerText).classList.add("visible")
    }
})

})