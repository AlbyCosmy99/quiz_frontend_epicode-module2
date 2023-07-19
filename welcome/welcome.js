const button = document.querySelector('button')

window.onload = function buttonDisabled() {
    button.disabled = true
}

function proceedUnlock() {
  

    const checkbox = document.querySelector('input')
    if(checkbox.checked) {
        button.disabled = false
    } else{
        button.disabled = true
    }
}
