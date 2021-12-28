function getAndUpdate() {
    console.log("Updating list...");
    title = document.getElementById("title").value;
    desc = document.getElementById("description").value;
    if (localStorage.getItem("itemJSON") == null) {
        itemJSONArray = [];
        itemJSONArray.push([title, desc]);
        localStorage.setItem("itemJSON", JSON.stringify(itemJSONArray));
    }
    else {
        itemJSONArray = JSON.parse(localStorage.getItem("itemJSON"));
        itemJSONArray.push([title, desc]);
        localStorage.setItem("itemJSON", JSON.stringify(itemJSONArray));
    }
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    update();
}

function update() {
    if (localStorage.getItem("itemJSON") == null) {
        itemJSONArray = [];
        localStorage.setItem("itemJSON", JSON.stringify(itemJSONArray));
    }
    else {
        itemJSONArray = JSON.parse(localStorage.getItem("itemJSON"));
    }

    // populate the table
    let tableBody = document.getElementById("tableBody");
    let str = "";
    itemJSONArray.forEach((element, index) => {
        str += `
        <tr>
        <th scope="row">${index + 1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete</button></td>
    </tr>
        `
    });
    tableBody.innerHTML = str;
}

add = document.getElementById("add");
add.addEventListener("click", getAndUpdate);
update();

function deleted(indexItem) {
    console.log("Deleting items...");
    itemJSONArray = JSON.parse(localStorage.getItem("itemJSON"));
    itemJSONArray.splice(indexItem, 1);
    localStorage.setItem("itemJSON", JSON.stringify(itemJSONArray));
    update();
}

function clearStorage() {
    if (confirm("Are you sure you want to clear the list?")) {
        console.log("Clearing storage...");
        localStorage.clear();
        update();
    }
}