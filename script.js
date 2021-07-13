const button = document.querySelector("button");
const textArea = document.querySelector("textarea");
const teksList = document.querySelector(".text-list");
console.log(teksList);

let valueElementHTML = [];


button.addEventListener("click",function () {
    const divList = document.createElement("div");
    divList.setAttribute("class","list");

    const divCheck = document.createElement("div");
    divCheck.setAttribute("class","check");

    const checkBox = document.createElement("input");
    checkBox.setAttribute("class","checkbox");
    checkBox.setAttribute("type","checkbox");

    divCheck.appendChild(checkBox);

    const divDesc = document.createElement("div");
    divDesc.setAttribute("class","desc");

    const textDesc = document.createElement("p");
    const teksDetail = document.createTextNode(textArea.value);
    textDesc.appendChild(teksDetail);

    divDesc.appendChild(textDesc);

    const divImage = document.createElement("div");
    divImage.setAttribute("class","delete");

    const imageDelete = document.createElement("img");
    imageDelete.setAttribute("src","delete.png");

    divImage.appendChild(imageDelete);

    divList.appendChild(divCheck);
    divList.appendChild(divDesc);
    divList.appendChild(divImage);

    teksList.appendChild(divList);


    let listValue = textArea.value;

    valueElementHTML.push(listValue);
    localStorage.setItem('myStorage', JSON.stringify(valueElementHTML));

});


teksList.addEventListener("click",function (event) {
    if (event.target.classList.contains("checkbox")) {
        const listText = event.target.parentElement.parentElement.children[1].children[0];
        const deleteList = event.target.parentElement.parentElement.children[2];
        if (event.target.checked) {
            listText.style.textDecoration = "line-through";
            deleteList.classList.add("animation");
        } else {
            listText.style.textDecoration = "none";
            if (deleteList.classList.contains("animation")) {
                deleteList.classList.add("animation-delete");
            }
            if (deleteList.classList.contains("animation") && deleteList.classList.contains("animation-delete")) {
                setTimeout(function () {
                    deleteList.classList.remove("animation");
                    deleteList.classList.remove("animation-delete");
                },1500)
            }
        }
    }
    if (event.target.hasAttribute("src")) {
        let valuelist = JSON.parse(localStorage.getItem('myStorage'));
        const getItem = event.target.parentElement.parentElement.children[1].children[0].textContent;
        if (valuelist.length <= 1 ) {
            event.target.parentElement.parentElement.remove();
            localStorage.removeItem('myStorage');
        } else {
            if (valuelist.indexOf(getItem,-1)) {
                let getIndex = valuelist.indexOf(getItem,0);
                valuelist.splice(getIndex,1);
                localStorage.setItem('myStorage',JSON.stringify(valuelist));
                event.target.parentElement.parentElement.remove();
            }
        }
    }
});


if (valueElementHTML.length === 0) {
    if (localStorage.getItem('myStorage')) {
        const getValue = JSON.parse(localStorage.getItem('myStorage'));
        for (const x of getValue) {
            valueElementHTML.push(x);
        }
    }
}


// SAAT DI REFRESH
if (localStorage.getItem('myStorage')) {
    const valueList = JSON.parse(localStorage.getItem('myStorage'));
    for (const x of valueList) {
        const divList = document.createElement("div");
        divList.setAttribute("class","list");

        const divCheck = document.createElement("div");
        divCheck.setAttribute("class","check");

        const checkBox = document.createElement("input");
        checkBox.setAttribute("class","checkbox");
        checkBox.setAttribute("type","checkbox");

        divCheck.appendChild(checkBox);

        const divDesc = document.createElement("div");
        divDesc.setAttribute("class","desc");

        const textDesc = document.createElement("p");
        const teksDetail = document.createTextNode(x);
        textDesc.appendChild(teksDetail);

        divDesc.appendChild(textDesc);

        const divImage = document.createElement("div");
        divImage.setAttribute("class","delete");

        const imageDelete = document.createElement("img");
        imageDelete.setAttribute("src","delete.png");

        divImage.appendChild(imageDelete);

        divList.appendChild(divCheck);
        divList.appendChild(divDesc);
        divList.appendChild(divImage);

        teksList.appendChild(divList);
    }
} else {
    console.log("HALLO");
}