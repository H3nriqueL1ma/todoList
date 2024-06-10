/* eslint-disable import/no-anonymous-default-export */
export function setButtonClasses (activeButton, inactiveButtons) {
    activeButton.classList.add("selected");
    inactiveButtons.forEach(button => button.classList.remove("selected"));
}

export default setButtonClasses; 