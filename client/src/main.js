const display = document.getElementById('app')
const form = document.getElementById('form')
const baseURL = 'https://week4-assignment-client-ihk4.onrender.com'
//'http://localhost:4242'


async function fetchData() {
    const response = await fetch (`${baseURL}/food`)
    const foods = await response.json()

    console.log(foods)

    return foods
}


async function displayMessages() {
    const foods = await fetchData()

    foods.forEach((food) => {
        const div = document.createElement('div')
        const userName = document.createElement('p')
        const content = document.createElement('p')

        userName.textContent = `Name: ${food.name}`
        content.textContent = `Favourite food: ${food.favourite_food}`

        div.append(userName, content)

        display.appendChild(div)
    });
}

async function handleSubmit(e) {
    e.preventDefault()

    const formData = new FormData(form);
    const userInput = Object.fromEntries(formData);
    const userInputJSON = JSON.stringify(userInput);

    const response = await fetch (`${baseURL}/food`, {
        headers: {
            "Content-Type" :"application/json"
        },
        method : "POST",
        body : userInputJSON
    })
    
}

displayMessages();

form.addEventListener('submit', handleSubmit)
