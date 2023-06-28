var lastScrollTop = 0

function openImg(i) {
    lastScrollTop = window.scrollY
    var photos = document.querySelectorAll(".posted-Img")
    document.getElementById("img-Show").setAttribute("src", photos[i].src)
    document.querySelector("body").style.transition = ".5s"
    document.querySelector("body").style.opacity = 0

    setTimeout(function() {
        document.getElementById("main-Container").style.opacity = 0
        document.getElementById("main-Container").style.display = "none"
        document.querySelector("body").style.transition = ".5s"
        document.querySelector("body").style.opacity = 1
        document.querySelector("body").style.overflow = "hidden"
        document.getElementById("img-Show-Container").style.display = ""
        document.getElementById("img-Show-Container").style.opacity = 1

        window.scrollTo(0, 0);
        
        setTimeout(function() {
            document.querySelector("body").style.transition = "0"
            document.querySelector("body").style.overflow = "visible"
        }, 500)
    }, 500)
}

function closeImg() {
    document.querySelector("body").style.transition = ".5s"
    document.querySelector("body").style.opacity = 0

    setTimeout(function() {
        document.getElementById("img-Show-Container").style.opacity = 0
        document.getElementById("img-Show-Container").style.display = "none"
        document.querySelector("body").style.transition = ".5s"
        document.querySelector("body").style.opacity = 1
        document.querySelector("body").style.overflow = "hidden"
        document.getElementById("main-Container").style.display = ""
        document.getElementById("main-Container").style.opacity = 1
        window.scrollTo(0, lastScrollTop);
        
        setTimeout(function() {
            document.querySelector("body").style.overflow = "visible"
            document.querySelector("body").style.transition = "0"
        }, 500)
    }, 500)
}

// Initialize variables
let timer;
let slideShowPlaying = false
let timer1, timer2, timer3;

// Function to restart the timer
function restartTimer() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    // Perform actions after 30 seconds of inactivity
    // slideShow()
    if(!slideShowPlaying) {
        clearTimeout(timer);
        slideShow(0)
    }
  }, 30000);
}

// Event listeners for click and scroll events
document.addEventListener("click", restartTimer);
document.addEventListener("scroll", restartTimer);

// Initial start of the timer
restartTimer();

function slideShow(i) {
    document.getElementById("slide-Show-Container").style.zIndex = 5
    lastScrollTop = window.scrollY
    var photos = document.querySelectorAll(".posted-Img")
    
    document.querySelector("body").style.transition = "1s"
    document.querySelector("body").style.opacity = 0

    timer1 = setTimeout(function() {
        document.getElementById("slide-Show-Img").setAttribute("src", photos[i].src)
        document.getElementById("main-Container").style.opacity = 0
        document.getElementById("main-Container").style.display = "none"
        document.getElementById("img-Show-Container").style.opacity = 0
        document.getElementById("img-Show-Container").style.display = "none"
        document.querySelector("body").style.transition = "1s"
        document.querySelector("body").style.opacity = 1
        document.querySelector("body").style.overflow = "hidden"
        document.getElementById("slide-Show-Container").style.opacity = 1

        window.scrollTo(0, 0);
        
        timer2 = setTimeout(function() {
            document.querySelector("body").style.transition = "0"
            document.querySelector("body").style.overflow = "visible"
            timer3 = setTimeout(function() {
                if(photos.length != i + 1) {
                    slideShow(i + 1)
                } else {                
                    slideShow(0)
                }
            }, 5000)
        }, 1000)
    }, 1000)
    slideShowPlaying = true
}


document.getElementById("slide-Show-Img").addEventListener("click", closeSlideShow())


function closeSlideShow() {
    document.getElementById("slide-Show-Container").style.zIndex = -1
    document.querySelector("body").style.transition = ".5s"
    document.querySelector("body").style.opacity = 0
    clearTimeout(timer1);
    clearTimeout(timer2);
    clearTimeout(timer3);

    setTimeout(function() {
        document.getElementById("slide-Show-Container").style.opacity = 0
        document.getElementById("img-Show-Container").style.opacity = 0
        document.getElementById("img-Show-Container").style.display = "none"
        document.querySelector("body").style.transition = ".5s"
        document.querySelector("body").style.opacity = 1
        document.querySelector("body").style.overflow = "hidden"
        document.getElementById("main-Container").style.display = ""
        document.getElementById("main-Container").style.opacity = 1
        window.scrollTo(0, lastScrollTop);
        
        setTimeout(function() {
            document.querySelector("body").style.overflow = "visible"
            document.querySelector("body").style.transition = "0"
        }, 500)
    }, 500)
    slideShowPlaying = false
}

function editPage() {
    var photos = document.querySelectorAll(".posted-Img")
    document.querySelector("body").style.transition = ".5s"
    document.querySelector("body").style.opacity = 0

    setTimeout(function() {
        document.getElementById("main-Container").style.opacity = 0
        document.getElementById("main-Container").style.display = "none"
        document.querySelector("body").style.transition = ".5s"
        document.querySelector("body").style.opacity = 1
        document.querySelector("body").style.overflow = "hidden"
        window.scrollTo(0, 0);
        
        window.location = "../Edit"
    }, 500)
}

function showBody() {
    document.querySelector("body").style.transition = ".5s"
    document.querySelector("body").style.opacity = "1"
    setTimeout(function() {
        document.querySelector("body").style.transition = "0s"
    }, 500)
}