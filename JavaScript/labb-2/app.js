let isYesterday = false;

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
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDay = days[date.getDay()]; 
    
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;

    console.log("Current day is:", currentDay);
    console.log("Current time is:", currentTime); 

    return { currentDay, currentTime };
}

async function displaySpecials() {
    const specialsData = await fetchSpecialsMenuData(); 
    if (!specialsData) {
        console.error('No data fetched.');
        return;
    }

    console.log('Fetched specials data:', specialsData);

    const { currentDay, currentTime } = getCurrentDayAndTime(); 

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let displayDayIndex = days.indexOf(currentDay);

    if (isYesterday) {
        displayDayIndex = (displayDayIndex - 1 + 7) % 7;
    }
    const displayDay = days[displayDayIndex];

    console.log("Display day is:", displayDay);
    console.log("Current time is:", currentTime);
   
    const specialsForDay = specialsData.weeklySpecialsMenu[displayDay];
    console.log("Specials for", displayDay, ":", specialsForDay);

    if (!specialsForDay) {
        console.log(`No specials available for ${displayDay}`);
        return;
    }
    
    let timeRange;
    const currentHour = parseInt(currentTime.split(':')[0], 10); 

    if (currentHour < 14) {
        timeRange = "11:00-14:00"; 
    } else {
        timeRange = "17:00-20:00"; 
    }

    console.log(`Using time range: ${timeRange}`);

    const todaysSpecials = specialsForDay.filter(special => special.time === timeRange);
    
    if (todaysSpecials.length === 0) {
        console.log(`No specials available at this time (${currentTime})`);
        return;
    }
    
    const specialsContainer = document.querySelector('#specials__content');
    if (!specialsContainer) {
        console.error('Specials container not found.');
        return;
    }

    let specialsHTML = `<h2>${isYesterday ? "Yesterday's" : "Today's"} Special (${displayDay})</h2>`;
    
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

    specialsHTML += `
        <div>
            <button class="button button--specials">${isYesterday ? 'Show Today\'s' : 'Show Yesterday\'s'}</button>
        </div>
    `;

    const loadingSpinner = document.querySelector('#js-loading');
    if (loadingSpinner) {
        loadingSpinner.classList.add('hidden'); 
    }

    specialsContainer.innerHTML = specialsHTML;
    specialsContainer.classList.add('specials__content--loaded');

    
    const toggleButton = document.querySelector('.button--specials');
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            isYesterday = !isYesterday;
            displaySpecials();
        });
    } else {
        console.error('Toggle button not found!');
    }
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
        if (specialsData && specialsData.weeklySpecialsMenu) {
            const specialsHTML = generateSpecialsHTML(specialsData.weeklySpecialsMenu); 
            menu.innerHTML = `<h3>Veckas specialerbjudanden</h3>${specialsHTML}`; 
        } else {
            console.error("No valid specials data.");
        }
    }
}

function generateSpecialsHTML(weeklySpecialsMenu) {
    let specialsHTML = '';

    for (const [day, specials] of Object.entries(weeklySpecialsMenu)) {
        specialsHTML += `<h4>${day}</h4>`;
        specials.forEach(special => {
            specialsHTML += `
                <div class="special">
                    <h5>${special.name}</h5>
                    <p>Pris: ${special.price} SEK</p>
                    <p>Beskrivning: ${special.description}</p>
                    <p>Tillgänglig tid: ${special.time}</p>
                </div>
            `;
        });
    }

    return specialsHTML;
}

document.addEventListener('DOMContentLoaded', () => {
    displaySpecials();
    setupEventListeners();
});

document.getElementById('menu-toggle').addEventListener('click', toggleMenu);
