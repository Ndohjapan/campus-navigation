const currentLocation = document.querySelector("#current-location")
const destinationLocation = document.querySelector("#destination-location")
const nextPageBtn = document.querySelector("#direction-button")
const optionsDest = document.querySelectorAll("#destination-location > option")

const mapping = {
    "gate":  {
        "senate": "Senate",
        "art-education-social-science": "Art education  Social Sciences",
        "atm": "ATM",
        "basketball-court": "Basketball Court",
        "block-a": "Block A",
        "block-b": "Block B",
        "block-c": "Block C",
        "boys-hostel": "Boys Hostel",
        "car-park": "Car Park",
        "chapel-of-peace-and-joy": "Chapel Of Peace And Joy",
        "enterprise": "Enterprise Hostel",
        "girls-hostel": "Girls Hostel",
        "guest-house": "Guest House and Conference Center",
        "hospital": "University Hospital",
        "law-faculty": "Law Faculty",
        "law-theater": "Law Theater",
        "lead-radio": "Lead Radio",
        "library": "School Library",
        "mart-and-pharm": "Mart and Pharm",
        "nursing-department": "Nursing",
        "public-health-department": "Public Health Department",
        "school-field": "School Field",
        "sports-complex": "Sports Complex"
    },
    "adeline-hall": {"guest-house": "Guest House and Conference Center"},
    "art-education-social-science": {"senate": "Senate"},
    "car-park": {"senate": "Senate"},
    "enterprise": {"senate": "Senate", "guest-house": "Guest House and Conference Center"},
    "boys-hostel": {"senate": "Senate"},
    "girls-hostel": {"senate": "Senate"}
}

currentLocation.addEventListener("change", (e) => {
    destinationLocation.innerHTML = ""
    let newHtml  = "" 
    console.log(mapping[e.target.value])
    Object.keys(mapping[e.target.value]).forEach(newLocation => {
        console.log(newLocation, mapping[e.target.value][newLocation])
        newHtml += `<option value="${newLocation}">${mapping[e.target.value][newLocation]}</option>`
    })

    destinationLocation.innerHTML = newHtml

})

destinationLocation.addEventListener("change", (e) => {
    console.log(e.target.value)
})

function checkSelectedLocation(){
    let begin = currentLocation.value
    let end = destinationLocation.value

    return(begin + "-"+ "to" + "-" + end)
}


nextPageBtn.addEventListener("click", (e) => {
    e.preventDefault()
    let address = checkSelectedLocation()
    location.replace(`./direction/${address}.html`)
})

