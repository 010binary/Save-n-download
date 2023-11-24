// Declaring Variables
const inputfield = document.getElementById('input-el');
const button = document.getElementById('input-btn');
const deleteAll = document.getElementById('delete-all');
const saveTab = document.getElementById('save-tab');
const ulEl = document.getElementById('unorderedList');
const empty = document.querySelector('.nothing');
let links = [];
let linksFromLocalStorage = JSON.parse(localStorage.getItem('Savings'))

const tabs = [
    {
        url: 'https://github.com/010binary'
    }
]

// Function to toggle visibility of empty element
const hideToggler = () => {
    if (links.length > 0) {
        empty.classList.add('hide');
    } else {
        empty.classList.remove('hide');
    }
}

//Function to a Handle Rendering the element
const render = () => {

    let lists = '';

    for (let i = 0; i < links.length; i++) {
        lists = `<li>
                    <a href="${links[i]}" target="_blank" >
                        ${links[i]}
                    </a>
                </li>`
    }
    // rendering the list element

    ulEl.innerHTML += lists;

    //removeing the hide class from the display
    hideToggler();
}

//Local Storage
if (linksFromLocalStorage) {
    links = linksFromLocalStorage
    render()

}
// The Button Reaction function
function buttonAction() {

    if (inputfield.value === '') {
        alert('Please Input a Link');
    } else {
        links.push(inputfield.value);
        inputfield.value = '';
        render()
        localStorage.setItem('Savings', JSON.stringify(links))
    }
}

// Event Listener for the Button
button.addEventListener('click', () => buttonAction());

// This is to ensure the values added last are rendered to the container
render()

// To show the empty div when the code starts
hideToggler();

// To Clear all the add
deleteAll.addEventListener('click', () => {
    localStorage.clear()
    location.reload()
})

saveTab.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

    }) //tring to get the current chrome tab

    let tabb = tabs[0].url
    links.push(tabb)
    localStorage.setItem('Savings', JSON.stringify(links))
    render()
})