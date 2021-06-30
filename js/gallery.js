// Declare variable to hold image data
let data
let locations = []

// Get the Modal
let modal = document.getElementById("myModal")

// Refresh search
const refresh = document.querySelector(".refresh-search a")

// Get the carousel container ad indicator
let carouselContainer = document.querySelector(".carousel-inner")
let carouselIndicator = document.querySelector(".carousel-indicators")

// Search tool
let searchBar = document.querySelector("#searchbar")
let searchIcon = document.querySelector(".search-icon")


// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0]

// When the user clicks on <span> (x), close the modal
span.addEventListener("click", () => {
    modal.style.display = "none"
})

// Insert all places into the container
    // Create XMLHttpRequest object.
    var oXHR = new XMLHttpRequest();
    const mapContainer = document.querySelector(".map-cards-container")

    // Initiate request.
    oXHR.onreadystatechange = reportStatus;
    oXHR.open("GET", "https://campus-navigation.s3.eu-west-3.amazonaws.com/images.json", true);  // get json file.
    oXHR.send();

    function reportStatus() {
        if (oXHR.readyState == 4) {		// Check if request is complete.
            data = this.responseText

           data = JSON.parse(data)

           console.log(data)

           let container = Object.keys(data)

           ImagesToGalleryScreen(container)
           
        }
    }
    
    function ImagesToGalleryScreen(container){
        
        container.forEach(folder => {
            locations.push(folder)
            mapContainer.innerHTML += `<div class="map-card col-lg-4 col-md-6 col-sm-12 col-12">
            <div class="map-image">
            <img src="https://campus-navigation.s3.eu-west-3.amazonaws.com/${data[folder][0]}" class="map-direction" alt="${folder}">
            </div>
            <div class="card-link">
            <a href="#">
            <h3>${folder}</h3>  
            </a>
            </div>
            </div>`
        })

        let images = document.querySelectorAll(".map-direction")
    
        EventlistnersForImages(images)

}


function EventlistnersForImages(images){

    images.forEach(img => {
        img.addEventListener("click", () => {
            
            console.log(img.alt)

            let folderImages = data[img.alt]
            let imageHtml = ""
            let indicatorHtml = ""

            carouselContainer.innerHTML = ""
            carouselIndicator.innerHTML = ""

            // Insert slider counter
            for(i=0; i<folderImages.length; i++){
                if(i===0){
                    indicatorHtml += `<li data-target="#demo" data-slide-to="${i}" class="active"></li>`
                }
                else{
                    indicatorHtml += `<li data-target="#demo" data-slide-to="${i}"></li>`
                }
            }

            // Insert Images to carousel
            for(i=0; i<folderImages.length; i++){
                if(i===0){
                    imageHtml += `
                        <div class="carousel-item active">
                            <img src="https://campus-navigation.s3.eu-west-3.amazonaws.com/${folderImages[i]}" alt="${img.alt}" class="img-fluid">
                            <div class="carousel-caption">
                                <h3>${img.alt}</h3>
                            </div>
                        </div>
                        `
                }
                else{
                    imageHtml += `
                        <div class="carousel-item">
                            <img class="img-fluid" src="https://campus-navigation.s3.eu-west-3.amazonaws.com/${folderImages[i]}" alt="${img.alt}">
                            <div class="carousel-caption">
                                <h3>${img.alt}</h3>
                            </div>
                        </div>`
                }
            }

            console.log(imageHtml)

            carouselContainer.innerHTML += imageHtml
            carouselIndicator.innerHTML += indicatorHtml

            modal.style.display = "grid"
            modal.style.placeContent = "center"
        })
    })

}

searchBar.addEventListener("keyup", (e) => {
    if(e.key === "Enter" && searchBar.value != ""){
        doSearch()
    }
    // doSearch()
})

searchIcon.addEventListener("click", (e) => {
    if(searchBar.value != ""){
        doSearch()
    }
})

function doSearch(){
    console.log(locations)
    let searchresult = []
    console.log(searchBar.value)
    let pattern = new RegExp(searchBar.value, "i", "g")
    locations.forEach(point => {
        if(pattern.exec(point)){
            searchresult.push(point)
        }
        
    })

    if(searchresult.length > 0){
        console.log("I want to remove clear the screen")
        mapContainer.innerHTML = ""
        console.log(searchresult)
        ImagesToGalleryScreen(searchresult)
        searchresult = []
        locations = []
        refresh.style.display = "block"
    }

}


refresh.addEventListener("click", () => {
    mapContainer.innerHTML = ""
    ImagesToGalleryScreen(Object.keys(data))

    refresh.style.display = "none"
})
