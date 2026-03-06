// const allChars = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
// "/"];

const upperChars = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
const lowerChars = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
const numbers =  ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
const symbols = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"]

const firstPasswordEl = document.getElementById("first-password")
const secondPasswordEl = document.getElementById("second-password")

const firstNotificationEl = document.getElementById("first-pass-not")
const secondNotificationEl = document.getElementById("second-pass-not")

const numbersBox = document.getElementById("numbers-box")
const symbolsBox = document.getElementById("symbols-box")
const uppercaseBox = document.getElementById("uppercase-box")
const lowercaseBox = document.getElementById("lowercase-box")
const alertEl = document.getElementById("alert")

const generateBtn = document.getElementById("gen-btn")

generateBtn.addEventListener("click", function() {
    createPasswords()
})

function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length) ]
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1) )
        ;[arr[i], arr[j] ] = [arr[j], arr[i] ]
    }
    return arr
}

// PASSWORD GENERATION

function generateSinglePassword(allEnabledChars, length) {
let passwordChars = []

    // guarantees inclusion of one of each character
    if (numbersBox.checked) passwordChars.push(randomFrom(numbers) )
    if (symbolsBox.checked) passwordChars.push(randomFrom(symbols) )
    if (uppercaseBox.checked) passwordChars.push(randomFrom(upperChars) )
    if (lowercaseBox.checked) passwordChars.push(randomFrom(lowerChars) )
    // guarantees inclusion of one of each character

    while (passwordChars.length < length) { // fills the rest of the array
        passwordChars.push(randomFrom(allEnabledChars) ) 
    }

    return shuffleArray(passwordChars).join("") // shuffles the array
}

function createPasswords() {
    let allEnabledChars = []
    const length = Number(sliderEl.value)

    if (numbersBox.checked) allEnabledChars = allEnabledChars.concat(numbers) 
    if (symbolsBox.checked) allEnabledChars = allEnabledChars.concat(symbols)
    if (uppercaseBox.checked) allEnabledChars = allEnabledChars.concat(upperChars)
    if (lowercaseBox.checked) allEnabledChars = allEnabledChars.concat(lowerChars)

    if (allEnabledChars.length === 0) {
        alertEl.textContent = "Please select at least one character type"
        alertEl.classList.remove("hide")
        alertEl.classList.add("show")
        return
    }

    alertEl.textContent = ""
    alertEl.classList.remove("show")
    alertEl.classList.add("hide")

    firstPasswordEl.value = generateSinglePassword(allEnabledChars, length)
    secondPasswordEl.value = generateSinglePassword(allEnabledChars, length)
}


// PASSWORD LENGTH CONTROLS
const sliderEl = document.getElementById("slider")
let sliderCounter = document.getElementById("slider-count")

const sliderMin = 6
let sliderValue = 14
const sliderMax = 22

sliderCounter.textContent = `${sliderEl.value} characters`

const decrementBtn = document.getElementById("decrement-btn")
const incrementBtn = document.getElementById("increment-btn")

sliderEl.addEventListener("input", () => {
    sliderCounter.textContent = `${sliderEl.value} characters`
    //createPasswords()
})

decrementBtn.addEventListener("click", function() {
    sliderEl.stepDown()
    sliderCounter.textContent = `${sliderEl.value} characters`

    if (sliderValue <= sliderMin) {
        sliderValue = sliderMin + 1
    }
    //createPasswords()
})

incrementBtn.addEventListener("click", function() {
    sliderEl.stepUp()
    sliderCounter.textContent = `${sliderEl.value} characters`

    if (sliderValue >= sliderMax) {
        sliderValue = sliderMax - 1
    }
    //createPasswords()
})
// PASSWORD LENGTH CONTROLS

// COPY PASSWORD
function copyPassword(inputEl) {
    inputEl.select()
    inputEl.setSelectionRange(inputEl.value.length, inputEl.value.length)
    navigator.clipboard.writeText(inputEl.value)
}

function handleCopy(passwordEl, notificationEl) {
    copyPassword(passwordEl)

    if (!passwordEl.value) return

    notificationEl.classList.add("active")
    setTimeout(() => {
        notificationEl.classList.remove("active")
    }, 2000)
}

firstPasswordEl.addEventListener("click", () => {
    handleCopy(firstPasswordEl, firstNotificationEl)
})

secondPasswordEl.addEventListener("click", () => {
    handleCopy(secondPasswordEl, secondNotificationEl)
})
// COPY PASSWORD