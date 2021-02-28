window.addEventListener('click', e => {
    e.preventDefault();
})

let songContainer = document.querySelector(".result-container")

let searchBtn = document.querySelector(".search-button")
searchBtn.addEventListener('click', e => {
    clearSongs()
    searchRequest()
    
})

  //'http://httpstat.us/404'
function searchRequest() {
    let searchInput = document.querySelector(".user-search").value
    if (!searchInput) {
        return
    }
    fetch ('https://itunes.apple.com//search?term=' + searchInput + "&limit=100")
    .then(resp => {
        if (!resp.ok) {
            throw new Error(resp.statusText)
        }
       return resp.json()
    })
    .then (data => {
        console.log(data)
    if (data.results.length > 0) {
        for (let song of data.results) {
            displayResults(song)
        }
     } else {
            noResult()
        }
      
    })
    .catch(error => {
        console.log(error)
        displayError(error)
    })
}

function displayError(error) {
    let errorResult = document.createElement("div")
    let errorMsg = document.createElement("p")
    errorMsg.innerHTML = "Oops, something went wrong." + " " + error + "."
    songContainer.appendChild(errorResult)
    errorResult.appendChild(errorMsg)
}

function noResult() {
    let zeroResult = document.createElement("div")
    let resultMsg = document.createElement("p")
    resultMsg.innerHTML = "No results found"
    songContainer.appendChild(zeroResult)
    zeroResult.appendChild(resultMsg)
}

function clearSongs() {
    let songs = document.querySelectorAll(".song-item")
    for (let song of songs) {
        song.remove();
    } 
  }

function displayResults(song) {
    let songEl = document.createElement("div")
    let title = document.createElement("h3")
    let artist = document.createElement("p")
    let picture = document.createElement("img")
    let sound = document.createElement("source")
    let lilBtn = document.createElement("button")

    sound.src = song.previewUrl
    picture.src = song.artworkUrl100
    artist.innerHTML = song.artistName
    title.innerHTML = song.trackName
    lilBtn.innerHTML = "&#9658;"

    songEl.className = "song-item"
    artist.className = "artist"
    lilBtn.className = "preview-btn"

    songEl.appendChild(sound)
    songEl.appendChild(picture)
    songEl.appendChild(artist)
    songEl.appendChild(title)
    songEl.appendChild(lilBtn)
    songContainer.appendChild(songEl)
    

    lilBtn.addEventListener('click', e => {
        playMusic(e.target.parentElement)
    })
}

function playMusic(song) {
    let audio = document.querySelector("audio")
    console.log(song.firstElementChild)
    audio.src = song.firstElementChild.src

}

