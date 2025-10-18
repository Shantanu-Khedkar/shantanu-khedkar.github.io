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

async function sectionLoaded(){
    text = ['S','h','a','n','t','a','n','u',' ','K','h','e','d','k','a','r']
    for (const letter of text){
        typeLetter(letter)
        await new Promise(resolve => setTimeout(resolve, Math.max(Math.random(), 0.5)*140));
    }
    
}


function typeLetter(letter){
    document.getElementById("hero-editable").children[0].textContent = document.getElementById("hero-editable").children[0].textContent + letter 
    document.getElementById('index-input').value = document.getElementById("hero-editable").innerHTML;
    syncText(document.getElementById('index-input').value, document.getElementById('index-input').nextElementSibling)
}
