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

const database = firebase.database();
const storage = firebase.storage().ref();

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

var file = ""
var geocoder;
var imgURLRecent = ''

// Function to upload data URL to Firebase Storage
function uploadImage(dataURL) {
    // Generate a unique filename for the image
    var filename = Math.floor(Date.now() / 1000) + '.png';

    // Create a reference to the image file in Firebase Storage
    var imageRef = storage.child(filename);

    // Convert the data URL to a Blob object
    var imageBlob = dataURLToBlob(dataURL);

    // Upload the Blob to Firebase Storage
    var uploadTask = imageRef.put(imageBlob);

    // Register an event handler for successful upload
    uploadTask.then(function(snapshot) {
        // Get the download URL of the uploaded image
        snapshot.ref.getDownloadURL().then(function(downloadURL) {
            // Create an image element and set its source to the download URL
            var img = document.createElement('img');
            img.src = downloadURL;
            img.style.display = "none"

            // Append the image element to the document body or any desired location
            document.body.appendChild(img);

            console.log('Image uploaded and displayed successfully.');
            console.log('Image URL:', downloadURL);
            imgURLRecent = downloadURL
        });
    }).catch(function(error) {
        console.log('Error uploading image:', error);
    });
}

    // Function to convert data URL to Blob
function dataURLToBlob(dataURL) {
    var arr = dataURL.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});
}

function convertFileToDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
    
        reader.onloadend = () => {
            resolve(reader.result);
        };
    
        reader.onerror = (error) => {
            reject(error);
        };
    
        reader.readAsDataURL(file);
    });
}

  
document.getElementById("Images").addEventListener("change", async (event) => {
    const file = event.target.files[0];
  
    try {
      const dataURL = await convertFileToDataURL(file);
      uploadImage(dataURL);
      codeLatLng()
      // Use the dataURL as needed (e.g., upload it to Firebase Storage)
    } catch (error) {
      console.error('Error converting file to data URL:', error);
    }
});


function codeLatLng() {

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
      
          const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=2d978186b1e2492eb6c1f375a5d8cb32`;
      
          fetch(url)
            .then(response => response.json())
            .then(data => {
              if (data.results.length > 0) {
                const result = data.results[0];
                const city = result.components.city;
                const region = result.components.state;
                const country = result.components.country;
      
                console.log("Latitude: " + latitude);
                console.log("Longitude: " + longitude);
                console.log("City: " + city);
                console.log("Region: " + region);
                console.log("Country: " + country);

                var path = makeid(15)

                database.ref("img/" + path).set({
                    "path":path,
                    "Latitude":position.coords.latitude,
                    "Longitude":position.coords.longitude,
                    "City":city,
                    "Region": region,
                    "Country": country,
                    "imgURL":imgURLRecent
                })
              }
            })
            .catch(error => {
              console.log("Error: " + error);
            });
        });
    } else {
        console.log("Geolocation is not supported by your browser");
    }
      
}


var code = localStorage.getItem("Code")

if(code == null || code == undefined) {
    window.location = "../Code"
} else { 
    const checkPass = function()  {
        var pass_enter = code

        database.ref().once("value", function(snapshot) {
            const pass = snapshot.val().code
            if(pass != pass_enter) {
                window.location = "../Code"
            }
        })
    }
    checkPass()
}

function shareImg(imageURL) {
    if (navigator.share) {
        navigator.share({
            title: 'Shared Image',
            text: 'Check out this image!',
            url: imageURL
        })
        .then(() => console.log('Image shared successfully.'))
        .catch((error) => console.log('Error sharing image:', error));
    } else {
    console.log('Web Share API is not supported by your browser.');

    // You can provide an alternative sharing option or display a message to the user.
    // For example, you can create a shareable link or display a share button with custom behavior.
    }
}