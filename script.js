const accessKey = "BQwYGkvR_ul77Jza6cHGlIkVMmtsTmHfTnR2OTleY10";

const formEle = document.querySelector("form")
const inputEle = document.getElementById("search-input")
const searchResults = document.querySelector(".search-results")
const showMore = document.getElementById("show-more")

let inputData = ""
let page = 1  //start ka page to 1 hi hoga


async function searchImages() //async bcoz await use krna h and that only happens with async
{
    inputData = inputEle.value
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

    const response = await fetch(url);
    const data = await await response.json() //jo bhi respoinse aaya url se fetch hoke usko json me cause json format easy to use
    console.log(data)
    const results = data.results

    if (page === 1) {
        searchResults.innerHTML = ""
    }

    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");
    
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
    
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;
    
        imageWrapper.appendChild(image);  //imagewrapper wali cheez me hi to img and a tag h
        imageWrapper.appendChild(imageLink);
    
        searchResults.appendChild(imageWrapper); // Append to searchResults, not imageWrapper
    });
    

    page++
    if (page > 1) {
        showMore.style.display = "block"
    }
}

formEle.addEventListener("submit", (event) => { 
    event.preventDefault()
    page = 1
    searchImages()
})

showMore.addEventListener("click", () => { 
    searchImages()
})
