const button = document.querySelector('button')

window.onload = function buttonDisabled() {
    button.disabled = true
}
button.addEventListener('click', buttonDisabled)



function proceedUnlock() {
    const checkbox = document.querySelector('input')
    if(checkbox.checked) {
        button.disabled = false
    } else{
        button.disabled = true
    }
}
button.addEventListener('click', proceedUnlock)