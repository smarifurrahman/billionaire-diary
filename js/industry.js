const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const first = urlParams.get('first');
const second = urlParams.get('second');

const loadByIndustry = async (first = '', second = '') => {
    const url = `https://forbes400.onrender.com/api/forbes400${first}${second}`;
    const res = await fetch(url);
    const data = await res.json();
    displayByIndustry(data);
}

const displayByIndustry = (persons) => {
    const cardContainer = document.getElementById('card-container');
    const emptyString = '';
    for (const person of persons) {
        const card = document.createElement('div');
        card.classList.add('bg-primary', 'p-4');
        card.innerHTML = `
        <h2 class="text-center text-xl mb-5 font-secondary" style="text-shadow: 5px 5px 8px white;">${person.person ? person.person.name : 'Not Found'}</h2>
        <div class="flex">
            <div class="flex justify-center items-center mr-3 w-1/2">
                <img class="w-full" src="${person.person.squareImage ? person.person.squareImage : emptyString}" alt="Not Found">
            </div>
            <div class="border-l-2 flex flex-col justify-center py-5 px-3 w-1/2">
                <p class="font-semibold">Rank: <span class="font-light">${person.rank ? person.rank : 'Not Found'}</span></p>
                <p class="font-semibold">Citizenship: <span class="font-light">${person.countryOfCitizenship ? person.countryOfCitizenship : 'Not Found'}</span></p>
                <p class="font-semibold">State: <span class="font-light">${person.state ? person.state : 'Not Found'}</span></p>
                <p class="font-semibold">City: <span class="font-light">${person.city ? person.city : 'Not Found'}</span></p>
                <p class="font-semibold">Total Shares: <span class="font-light">${person.financialAssets ? Math.round(person.financialAssets[0].numberOfShares) : 'Not Found'}</span></p>
                <p class="font-semibold">Share Price: <span class="font-light">$${person.financialAssets ? person.financialAssets[0].sharePrice.toFixed(2) : 'Not Found'}</span></p>
            </div>
        </div>
        <p class="mt-3 font-semibold">Source: <span class="font-light">${person.source ? person.source : 'Not Found'}</span></p>
        `;
        cardContainer.appendChild(card);
    }
}

const displayHeading = (industry = '/forbes 400') => {
    let industryName = industry.split('');
    industryName.shift();
    industryName[0] = industryName[0].toUpperCase();
    industryName = industryName.join('');
    document.getElementById('industry-name').innerText = industryName;
}

if (second) {
    displayHeading(second);
    loadByIndustry(first, second);
}

else if (first) {
    displayHeading(first);
    loadByIndustry(first);
}

else {
    displayHeading();
    loadByIndustry();
}