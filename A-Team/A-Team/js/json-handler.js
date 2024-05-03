const $ = (x) => {
  return document.querySelector(x);
};

async function retrieve(url) {
  const response = await fetch(url);
  return await response.json();
}

function filter(data, key, value) {
  // ol' bessy
  if (value == "") {
    // no value specified by user, no filtering to be done
    return data;
  }
  for (var i = 0; i < data.length; i++) {
    var dataArray = data[i][key];
    if (!value.some((e) => dataArray.includes(e))) {
      data.splice(i, 1);
      i--;
    }
  }
  return data;
}

function populateCheckbox(data, type, target, label = "element", start = 0) {
  for (var i = start; i < data.length; i++) {
    var newElem = document.createElement("input");
    newElem.type = type;
    newElem.value = data[i].name;
    newElem.name = label;
    newElem.id = label + i;
    var newLabel = document.createElement("label");
    newLabel.setAttribute("for", newElem.id);
    newLabel.innerText = data[i].name;

    let checkboxParent = document.createElement("span");
    checkboxParent.classList.add("cat-selection");
    // checkboxParent.style = "background-color: " + data[i].color;
    checkboxParent.append(newElem, newLabel);
    target.append(checkboxParent);
  }
}

function populateResults(values, target) {
  for (let i = 0; i < values.length; i++) {
    let resultCategories = [...categories];
    resultCategories = filter(resultCategories, "name", values[i].categories);

    let newCard = document.createElement("div");
    newCard.classList.add("activity-card");

    let newImg = document.createElement("img");
    newImg.src = values[i].icon;
    newImg.alt = values[i].name + " icon";

    let newInfo = document.createElement("div");
    newInfo.classList.add("activity-card__info");

    let newTitle = document.createElement("h2");
    let newDlLink = document.createElement("a");
    newDlLink.href = values[i].file;
    newDlLink.target = "_blank";
    newDlLink.innerText = values[i].name;
    newTitle.append(newDlLink);

    let newCardInfo = document.createElement("div");
    newCardInfo.classList.add("activity-card__info__category");

    for (let j = 0; j < resultCategories.length; j++) {
      let newTag = document.createElement("span");
      newTag.classList.add("pricetag");
      newTag.innerText = resultCategories[j].name;
      newTag.style = "background-color: " + resultCategories[j].color;
      newCardInfo.append(newTag);
    }

    let newDesc = document.createElement("p");
    newDesc.innerText = values[i].description;

    newInfo.append(newTitle, newCardInfo, newDesc);

    newCard.append(newImg, newInfo);
    values[i].DOMref = newCard;
    target.append(newCard);
  }
}

let inputs = {};
let games;
let categories;

retrieve("data/categories.json").then((result) => {
  categories = result;

  result.forEach((i) => {
    inputs[i["name"]] = false;
  });
  populateCheckbox(categories, "checkbox", $("#form__categories"), "category");
});

retrieve("data/activities.json").then((result) => {
  populateResults(result, $("#activities"));
  games = result;
});

function hideTagsFrom(target, selected) {
  for (let i = 0; i < target.length; i++) {
    target[i].DOMref.style.display = selected.some(
      (e) => !target[i].categories.includes(e)
    )
      ? "none"
      : "block";
  }
}

$("#categories-form").oninput = (e) => {
  let selected = e.target.value;
  let newVal = e.target.checked;
  inputs[selected] = newVal;
  let selectedTags = [];
  for (let i = 0; i < Object.keys(inputs).length; i++) {
    if (Object.values(inputs)[i]) {
      selectedTags.push(Object.keys(inputs)[i]);
    }
  }
  hideTagsFrom(games, selectedTags);
};
