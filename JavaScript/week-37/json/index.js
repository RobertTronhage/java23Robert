const data = require('./data.json');

// console.log(data.Grill.forEach(element => console.log(element)))

// const kyckling = data.Grill.filter(element =>  element.name === 'Grillad Kyckling')
// console.log(JSON.stringify(data))

// console.log(kyckling)
// console.log(kyckling[0])


console.log("ny ändring")

















const responseJson = '{"result":true, "count":42}';
// const obj = JSON.parse(responseJson);

// console.log(responseJson)
// obj.result = false
// obj.count = 43
// console.log(obj.result)

// console.log(JSON.stringify(obj))



const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array1.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue,
);

// console.log(sumWithInitial);
// Expected output: 10


var date = new Date();
// console.log(date.toISOString()) // Todays date
// console.log(date.toString()) // Todays date

const formatter = new Intl.DateTimeFormat('sv-SE',"");
// console.log(formatter.format(date));


// date.setDate(-1)

const date2 = new
Date("2023-11-24");
console.log(
date2.getFullYear(),
date2.getMonth() + 1,
date2.getDate()
);
// 2023 11 24
date2.setMonth(2)

data.Grill.toString
console.log(date2)
// 2

// console.log(formatter)
// specificDate.toISOString(); // UTC time
// specificDate.toString(); 













data.Grill.push({
  name: 'AAA',
  price: '900.0',
  description: 'BBBB'
})

// console.log(data)