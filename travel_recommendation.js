const btnSearch = document.getElementById('btnSearch')
const btnReset = document.getElementById('btnReset')
const searchInput = document.getElementById('searchInput')
const searchResultsDiv = document.getElementById('searchResults')

function searchDestinations() {
    let searchString = searchInput.value;
    if (searchString) {
        fetch('./travel_recommendation_api.json')
            .then(response => response.json())
            .then(data => {
                if (searchString.toLowerCase().includes('beach')) {
                    return data.beaches;
                }
                if (searchString.toLowerCase().includes('temple')) {
                    return data.temples;
                }
                switch (searchString.toLowerCase().trim()) {
                    case 'australia':
                        return data.countries[0].cities;
                    case 'japan':
                        return data.countries[1].cities;
                    case 'brazil':
                        return data.countries[2].cities;
                }
            })
            .then(results => displayResults(results))
            .catch(error => console.error('Error fetching data:', error));
    }

}

function clearSearchInput() {
    searchResultsDiv.style.display = 'none';
    searchInput.value = "";
}

function displayResults(results) {
    const NoResultMessage = document.getElementById('NoResultMessage');
    const resultGrid = document.getElementById('resultGrid');
    searchResultsDiv.style.display = 'block';
    if (!results || results.length === 0) {
        resultGrid.style.display = 'none';
        NoResultMessage.style.display = 'block';
        return;
    }
    resultGrid.innerHTML = '';
    results.forEach(result => {
        let resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        let resultImage = document.createElement('img');
        resultImage.src = `./images/${result.imageUrl}`;
        resultImage.alt = result.name;
        let resultTitle = document.createElement('h3');
        resultTitle.textContent = result.name;
        let resultDescription = document.createElement('p');
        resultDescription.textContent = result.description;
        resultItem.appendChild(resultImage);
        resultItem.appendChild(resultTitle);
        resultItem.appendChild(resultDescription);
        resultGrid.appendChild(resultItem);
    })
    resultGrid.style.display = 'block';
    NoResultMessage.style.display = 'none';
    // Display results
}

btnSearch.addEventListener('click', searchDestinations)

btnReset.addEventListener('click', clearSearchInput)