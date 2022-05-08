const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

for (let numUsers=0; numUsers<3; numUsers++){
    getRandomUser();
}


// getRandomUser();
// getRandomUser();
// getRandomUser();

// Fetch a random user from the API and add their wealth from the data
// returned from the API call
async function getRandomUser() {
    const res = await fetch('https://swapi.dev/api/people');
    const data = await res.json();
    console.log(data);
   console.log(data.results);
   // console.log(data.results.forEach(character => console.log(character)));
   // console.log(data.results.forEach(character => console.log(character.name)));
  for (let character of data.results) {
       console.log(character.name);
      let newCharacter = {
          name: character.name,
          height: character.height,
      }
      console.log(newCharacter);
      addData(newCharacter);
   }


    // const user = data.results.forEach(character => character);

    // const newUser = {
    //     name: user.name,
    //     money: Math.floor(Math.random() * 1000000)
    // };



}

//Function that will double the money using the map method
function doubleMoney() {
    data = data.map((user) => {
        return{...user, money: user.money * 2}
    });
    updateDOM();
}

//Function that will sort users by richest using the sort method
function sortByRichest() {
    data.sort((a, b) => {
        return   b.money - a.money;
    });
    updateDOM();
}

//Function that will filter out the millionaires using the filter method
function showMillionaires() {
    data = data.filter((user) => {
        return user.money > 1000000
    });
    updateDOM();
}


//function that adds the total wealth using the reduce method
function totalWealth() {
    // const wealth = data.reduce((acc, user) => {
    //     return acc += user.money
    // },0);

    let totalWealth = 0;
    for (const user of data){
        totalWealth+= user.money;
    }


    // const wealthEl = document.createElement('div');
    // wealthEl.innerHTML = `<h3>Total Wealth: <strong> ${formatMoney(wealth)}</strong></h3>`;
    // main.appendChild(wealthEl);

    main.innerHTML += `<div><h3>Total Wealth: <strong> ${formatMoney(totalWealth)}</strong></h3></div>`;
}


//Add new obj to a data array
function addData(obj) {
    data.push(obj);

    updateDOM();
}


//updating the DOM forEach method
function updateDOM(providedData = data) {
    //Clear main div
    main.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`;
    providedData.forEach((item) => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong>${(item.height)}`;
        main.appendChild(element);
    })
}


//Format the number as money
// function formatMoney(number) {
//     return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
// }

//Event Listener for add user button
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', totalWealth );
