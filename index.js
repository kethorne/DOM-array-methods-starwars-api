const main = document.getElementById('main');
const addCharacterBtn = document.getElementById('add-character');
const doubleBtn = document.getElementById('double');
const showShortestBtn = document.getElementById('show-shortest');
const sortBtn = document.getElementById('sort');
const calculateHeightBtn = document.getElementById('calculate-height');

let data = [];

for (let numUsers=0; numUsers<1; numUsers++){
    getRandomCharacter();
}



// getRandomUser();
// getRandomUser();
// getRandomUser();

// Fetch a random user from the API and add their wealth from the data
// returned from the API call
async function getRandomCharacter() {
    const res = await fetch('https://swapi.dev/api/people');
    const resData = await res.json();
    console.log(resData);
    console.log(resData.results);

        let characters = resData.results;
        try {
            const character = characters[ data.length ];
            console.log(character);
            let newCharacter = {
                name: character.name,
                height: character.height,
            }
            addData(newCharacter);
        } catch (e) {
            alert("There are no more characters to add")
        }

}

//Function that will double the money using the map method
function doubleHeight() {
    data = data.map((user) => {
        return{...user, height: user.height * 2}
    });
    updateDOM();
}

//Function that will sort users by richest using the sort method
function sortByTallest() {
    data.sort((a, b) => {
        return   b.height - a.height;
    });
    updateDOM();
}

//Function that will filter out the millionaires using the filter method
function showShortest() {
    data = data.filter((user) => {
        return user.height < 100
    });
    updateDOM();
}


//function that adds the total wealth using the reduce method
function totalHeight() {

    let totalHeight = 0;
    for (const user of data){
        totalHeight+= parseInt(user.height);
    }


    // const wealthEl = document.createElement('div');
    // wealthEl.innerHTML = `<h3>Total Wealth: <strong> ${formatMoney(wealth)}</strong></h3>`;
    // main.appendChild(wealthEl);

    main.innerHTML += `<div><h3>Total Height: <strong> ${totalHeight}</strong></h3></div>`;
}


//Add new obj to a data array
function addData(obj) {
    data.push(obj);

    updateDOM();
}


//updating the DOM forEach method
function updateDOM(providedData = data) {
    //Clear main div
    main.innerHTML = `<h2><strong>Person</strong>Height</h2>`;
    providedData.forEach((item) => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong>${(item.height)}`;
        main.appendChild(element);
    })
}




//Event Listener for add user button
addCharacterBtn.addEventListener('click', getRandomCharacter);
doubleBtn.addEventListener('click', doubleHeight);
sortBtn.addEventListener('click', sortByTallest);
showShortestBtn.addEventListener('click', showShortest);
calculateHeightBtn.addEventListener('click', totalHeight );
