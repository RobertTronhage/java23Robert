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

document.addEventListener('DOMContentLoaded', setupEventListeners);