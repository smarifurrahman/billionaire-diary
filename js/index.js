const loadTopTen = async () => {
    const url = 'https://forbes400.onrender.com/api/forbes400?limit=10';
    const res = await fetch(url);
    const data = await res.json();
    displayTopTen(data);
}

const displayTopTen = (persons) => {
    const topTenBody = document.getElementById('top-10-tbody');
    let total = 0;
    for (const person of persons) {
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `
        <td class="pr-6 lg:pr-10 py-1"><i class="fa-solid fa-eye cursor-pointer p-1"></i> ${person.person.name}</td>
        <td class="pr-6 lg:pr-10 py-1">${person.countryOfCitizenship}</td>
        <td class="pr-6 lg:pr-10 py-1">${person.industries[0]}</td>
        <td class="pr-6 lg:pr-10 py-1">${person.rank}</td>
        <td class="pr-6 lg:pr-10 py-1 text-right">$${person.finalWorth.toFixed(2)}</td>
        `;
        total += person.finalWorth;
        topTenBody.appendChild(tableRow);
    }
    displayTotalTopTen(total);
}

const displayTotalTopTen = (total) => {
    const topTenFoot = document.getElementById('top-10-tfoot');
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `
    <td class="pt-3 pr-6 lg:pr-10">Total</td>
    <td class="pt-3 pr-6 lg:pr-10"></td>
    <td class="pt-3 pr-6 lg:pr-10"></td>
    <td class="pt-3 pr-6 lg:pr-10"></td>
    <td class="pt-3">$${total.toFixed(2)}</td>
    `;
    topTenFoot.appendChild(tableRow);
}

document.getElementById('all-button-container').addEventListener('click', function (event) {
    if (event.target.id !== 'all-button-container') {
        const url = `../industry.html${event.target.id}`;
        window.location.href = url;
    }
});

loadTopTen();