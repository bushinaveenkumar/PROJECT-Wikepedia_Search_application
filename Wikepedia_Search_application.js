let searchInput = document.getElementById("searchInput");
let spinner = document.getElementById("spinner");
let searchResults = document.getElementById("searchResults");

function createandappendresultItem(search_results) {
    spinner.classList.add("d-none")

    for (let eachResultobj of search_results) {
        console.log(eachResultobj)
        let {
            title,
            link,
            description
        } = eachResultobj;

        let eachResultItemContainer = document.createElement("div");
        eachResultItemContainer.classList.add("result-item")
        searchResults.appendChild(eachResultItemContainer);

        let resultTitleEl = document.createElement("a");
        resultTitleEl.textContent = title
        resultTitleEl.classList.add("result-title")
        resultTitleEl.href = link;
        resultTitleEl.target = "_blank";
        eachResultItemContainer.appendChild(resultTitleEl);

        let breakEl = document.createElement("br");
        eachResultItemContainer.appendChild(breakEl);

        let resultsLinkEl = document.createElement("a");
        resultsLinkEl.textContent = link;
        resultsLinkEl.classList.add("result-url")
        resultsLinkEl.href = link;
        resultsLinkEl.target = "_blank";
        eachResultItemContainer.appendChild(resultsLinkEl);

        let decriptionEl = document.createElement("p");
        decriptionEl.textContent = description;
        decriptionEl.classList.add("link-description")
        eachResultItemContainer.appendChild(decriptionEl);
    }
}

function makeHTTPSGetrequest() {
    let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput.value
    let requestconfigobj = {
        method: "GET"
    }
    fetch(url, requestconfigobj)
        .then(function(response) {
            return response.json()
        })
        .then(function(jsonData) {
            console.log(jsonData)
            let {
                search_results
            } = jsonData
            console.log(search_results)
            createandappendresultItem(search_results);
        })
}

function makesearch(event) {
    if (event.key === "Enter") {
        searchResults.textContent = ""
        spinner.classList.remove("d-none")

        makeHTTPSGetrequest()
    }
}

searchInput.addEventListener("keydown", makesearch)