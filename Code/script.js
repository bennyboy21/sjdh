function calcTime(city, offset) {
    // create Date object for current location
    var d = new Date();

    // convert to msec
    // subtract local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + (3600000*offset));

    // return time as a string
    return "The local time for city "+ city +" is "+ nd.toLocaleString();
}

console.log(calcTime('Toronto', '-4'));

const firebaseConfig = {
    apiKey: "AIzaSyCuwZfSSZj8ZAJeOHc5KyVMoCLyVNpoHtg",
    authDomain: "riverwoodweek.firebaseapp.com",
    projectId: "riverwoodweek",
    storageBucket: "riverwoodweek.appspot.com",
    messagingSenderId: "1082778996477",
    appId: "1:1082778996477:web:2268b67f1c83116456b894",
    measurementId: "G-XSMTVCLVE2"
};

firebase.initializeApp(firebaseConfig);



const checkPass = function()  {
    var pass_enter = document.getElementById("number").value

    firebase.database().ref().once("value", function(snapshot) {
        const pass = snapshot.val().code
        if(pass == pass_enter) {
            localStorage.setItem("Code", pass_enter)
            document.getElementById("button-Text").style.opacity = 0
            document.querySelector(".bouncing-loader").style.opacity = 1
            setTimeout(function() {
                document.getElementById("button-Text").textContent = "Correct"
                document.getElementById("button-Text").style.color = "green"
                
                document.getElementById("button-Text").style.transitionDelay = 0
                document.querySelector(".bouncing-loader").style.transitionDelay = 1
                document.getElementById("button-Text").style.opacity = 1
                document.querySelector(".bouncing-loader").style.opacity = 0

                setTimeout(function() {
                    document.querySelector("body").style.transition = ".5s"
                    document.querySelector("body").style.opacity = 0

                    setTimeout(function() {
                        window.location = "../home/"
                    }, 500)
                }, 2000)
            }, 1000)
        } else {
            document.getElementById("button-Text").style.opacity = 0
            document.querySelector(".bouncing-loader").style.opacity = 1
            setTimeout(function() {
                document.getElementById("button-Text").textContent = "WRONG"
                document.getElementById("button-Text").style.color = "red"
                
                document.getElementById("button-Text").style.transitionDelay = 0
                document.querySelector(".bouncing-loader").style.transitionDelay = 1
                document.getElementById("button-Text").style.opacity = 1
                document.querySelector(".bouncing-loader").style.opacity = 0

                setTimeout(function() {
                    document.getElementById("button-Text").style.opacity = 0
                    setTimeout(function() {
                        document.getElementById("button-Text").style.color = "black"
                        document.getElementById("button-Text").textContent = "ENTER"
                        document.getElementById("button-Text").style.opacity = 1
                    }, 500)
                }, 2000)
            }, 1000)
        }
    })
}