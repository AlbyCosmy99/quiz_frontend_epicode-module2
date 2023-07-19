// const button = document.querySelector('.cta')

window.onload = function buttonDisabled() {
    const button = document.querySelector('.cta')
    button.disabled = true
}

function proceedUnlock() {
    const button = document.querySelector('.cta')
    const checkbox = document.querySelector('input')
    if(checkbox.checked) {
        button.disabled = false
    } else{
        button.disabled = true
    }
}
