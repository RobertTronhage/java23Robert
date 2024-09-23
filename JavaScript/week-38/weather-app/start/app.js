

async function fetchData() {
    const data = await fetch("./weather.json")
        .then(response => response.json())
        .then(data => (console.log(data)));
    return data;
}

console.log(fetchData());

const date = new Date();
const currentDay = date.getDay();
const formatDate = date.getDate() + "/" + (date.getMonth() + 1);
const weekDays = [
    "Måndag", "tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"
];
const todayDisplay = document.querySelector("#today");

const formatTime = () => {
    setInterval(() => {
        ate = new Date();

        todayDisplay.textContent = veckodagar[currentDay] + "kl: " +
            formateTime + ":" + date.getSeconds.toString().padStart(2, '0');
    }, 1000);

};


formatTime();