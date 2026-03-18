g = document.getElementById("gallery");
current = 0;
mediaList=[]
Array.from(g.children).forEach(function(elem){
    if(elem.classList.contains("media")){
        mediaList.push(elem)
    }
})
console.log(mediaList)

function changeMedia(dir){
    mediaList.forEach(function(elem){
        elem.style.display="none"
    })
    index = current + dir
    if(index > (mediaList.length - 1)){
        index=0;
    }
    if(index < 0){
        index = (mediaList.length - 1);
    }
    current = index
    mediaList[index].style.display='block'
}