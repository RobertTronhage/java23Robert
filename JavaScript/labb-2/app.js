async function fetchMenuData() {
    try {
        const response = await fetch("./data/menu.json");  
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();  
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);  
        return null;
    }
}

async function fetchSpecialsMenuData() {
    try {
        const response = await fetch("./data/specials.json");  
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();  
        console.log("Fetched specials data:", data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);  
        return null;
    }
}


function generateMenuHTML(categoryName, items) {
    let html = `<h2>${categoryName}</h2><ul>`;
    items.forEach(item => {
        html += `
            <li>
                <h3>${item.name}</h3>
                <p>Price: ${item.price} SEK</p>
                <p>Description: ${item.description}</p>
            </li>
        `;
    });
    html += "</ul>";
    return html;
}

async function displayCategory(category) {
    const data = await fetchMenuData();  
    if (!data) {
        console.log("No data available for the selected category");
        return;
    }

    const container = document.querySelector('.menu__container');
    container.innerHTML = generateMenuHTML(category, data[category]);
}

function setupEventListeners() {
    const buttons = document.querySelectorAll('.nav__menu .options');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            
            buttons.forEach(btn => btn.classList.remove('options--active'));
            
            this.classList.add('options--active');
            
            displayCategory(this.value);
        });
    });
    
    const defaultButton = document.querySelector('.nav__menu .options--active');
    if (defaultButton) {
        displayCategory(defaultButton.value);
    }
}

function getCurrentDayAndTime() {
    const date = new Date();
    
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const currentDay = days[date.getDay()]; 
    
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;

    console.log("Current day is:", currentDay);
    console.log("Current time is:", currentTime); 

    return { currentDay, currentTime };
}

async function displaySpecials() {
    const specialsData = await fetchSpecialsMenuData(); // Hämta specials.json-data
    if (!specialsData) {
        console.error('No data fetched.');
        return;
    }

    console.log('Fetched specials data:', specialsData);

    const { currentDay, currentTime } = getCurrentDayAndTime(); // Hämta aktuell dag och tid

    console.log("Current day is:", currentDay);
    console.log("Current time is:", currentTime);

    // Kontrollera om det finns specials för dagens dag
    const specialsForDay = specialsData.weeklySpecialsMenu[currentDay];
    console.log("Specials for", currentDay, ":", specialsForDay);

    if (!specialsForDay) {
        console.log(`No specials available for ${currentDay}`);
        return;
    }

    // Filtrera ut de specials som är inom den aktuella tiden
    const todaysSpecials = specialsForDay.filter(special => {
        const [startTime, endTime] = special.time.split('-'); // Ex: "11:00-14:00"
        console.log(`Checking if ${currentTime} is between ${startTime} and ${endTime}`);
        return currentTime >= startTime && currentTime <= endTime; // Kontrollera om nuvarande tid är inom intervallet
    });

    // Om inga specials matchar tiden, visa ett meddelande
    if (todaysSpecials.length === 0) {
        console.log(`No specials available at this time (${currentTime})`);
        return;
    }

    // Generera och visa specials HTML
    const specialsContainer = document.querySelector('#specials__content');
    if (!specialsContainer) {
        console.error('Specials container not found.');
        return;
    }

    let specialsHTML = `<h2>Today's Specials (${currentDay})</h2>`;
    todaysSpecials.forEach(special => {
        specialsHTML += `
            <div class="special">
                <h3>${special.name}</h3>
                <p>Price: ${special.price} SEK</p>
                <p>Description: ${special.description}</p>
                <p>Available: ${special.time}</p>
            </div>
        `;
    });

    // Ta bort laddningsbilden och uppdatera specials-container med data
    const loadingSpinner = document.querySelector('#js-loading');
    if (loadingSpinner) {
        loadingSpinner.classList.add('hidden'); // Lägg till 'hidden'-klassen för att dölja laddningsbilden
    }

    specialsContainer.innerHTML = specialsHTML;
    specialsContainer.classList.add('specials__content--loaded');
}

function generateSpecialsHTML(specialsData) {
    let specialsHTML = '';
    for (const [day, specials] of Object.entries(specialsData)) {
        specialsHTML += `<div>
            <h4>${day}</h4>
            ${specials.map(special => `
                <p><strong>Lunch:</strong> ${special.name} - ${special.price} SEK - ${special.time}</p>
                <p>${special.description}</p>
            `).join('')}
        </div>`;
    }
    return specialsHTML;
}

async function toggleMenu() {
    const menu = document.getElementById('specials-menu');
    const menuToggleButton = document.getElementById('menu-toggle');
    const isOpen = menu.classList.contains('specials__menu--open');

    if (isOpen) {
        menu.classList.remove('specials__menu--open');
        menuToggleButton.classList.remove('nav-open');
    } else {
        menu.classList.add('specials__menu--open');
        menuToggleButton.classList.add('nav-open');

        const specialsData = await fetchSpecialsMenuData();
        if (specialsData) {
            const specialsHTML = generateSpecialsHTML(specialsData);
            menu.innerHTML = `<h3>Veckas specialerbjudanden</h3>${specialsHTML}`; // Lägg till specials till menyn
        }
    }
}


document.addEventListener('DOMContentLoaded', displaySpecials);
document.getElementById('menu-toggle').addEventListener('click', toggleMenu);
document.addEventListener('DOMContentLoaded', setupEventListeners);