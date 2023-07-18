let button = document.querySelector('button')

window.onload = function btnDisabled() {
    button.disabled = true
}

function proceedUnlock() {
    let input = document.querySelector('input')
    if(input.checked) {
        button.disabled = false
    } else {
        button.disabled = true
    }
}