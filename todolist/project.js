var placeHolder = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addButton = document.getElementById("addButton");
const removeButton = document.getElementById("removeButton");

// This function goes through and Appends the users input into the new list. It stores them as an Li element.
function buttonClick(){
    let li = document.createElement("li");

    let input = document.createElement("input");
    input.type = "checkbox";
    li.appendChild(input);

    // I had to add this so that the checked boxes would go on the other side of the users text in the list.
    let span = document.createElement("span");
    span.textContent = placeHolder.value;
    li.appendChild(span);

    input.onclick = (e) => {
        var checkedBox = e.target.checked;
        if (checkedBox){
            e.target.parentElement.classList.add("checked");
        }
        else{
            e.target.parentElement.classList.remove("checked");
        }
    }
    listContainer.appendChild(li);
    placeHolder.value = "";
}

// This goes through the checked boxes in the list and removes them from the website.
function removeItem(){
    const itemsRemoved = listContainer.querySelectorAll("li.checked");
    itemsRemoved.forEach(item =>{
        item.remove();
    })
}
// Event listeners for both the buttons on the to-do list
addButton.addEventListener("click", buttonClick);
removeButton.addEventListener("click", removeItem);
