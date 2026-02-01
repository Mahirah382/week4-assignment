const display = document.getElementById('app')
const form = document.getElementById('form')
const baseURL = 'http://localhost:4242'


async function fetchData() {
    const response = await fetch (`${baseURL}/foods`)
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

        userName.textContent = food.msg_name
        content.textContent = food.content

        div.append(userName, content)

        display.appendChild(div)
    });
}

//displayMessages();

async function handleSubmit(e) {
    e.preventDefault()

    const formData = new FormData(form);
    const userInput = Object.fromEntries(formData);
    const userInputJSON = JSON.stringify(userInput);

    const response = await fetch (`${baseURL}/foods`, {
        headers: {
            "Content-Type" :"application/json"
        },
        method : "POST",
        body : userInputJSON
    })
    window.location.reload()
}

displayMessages();

form.addEventListener('submit', handleSubmit)
