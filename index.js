// Add Note Items
let tit, desc;
let itemJsonArray = [];

let ad = document.getElementById('addNote');
let del = document.getElementById('delNote');

function updateS(){
    // Display notes
    if(!localStorage.getItem('itemsJson')){
        itemJsonArray = []
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }else{
        itemJsonArrayStr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }
    let tb = document.getElementById('tableBody');
    let str = "";

    itemJsonArray.forEach((element, index) => {
        let dat = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        str += `
        <tr>
        <th scope="row">${index + 1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td>
            <button type="button" class="btn btn-sm btn-info" onclick="updElement(${index})"><i class="far fa-edit"></i></button> 
            <button type="button" class="btn btn-sm btn-danger" onclick="delElement(${index})"><i class="fas fa-trash"></i></button></td>
            <td><i>Added in ${dat.toLocaleDateString(undefined, options)}</i></td>
        </tr>`
    });
    tb.innerHTML = str;
}

function getAndUpdate(){
    console.log("Note Added Successfully...");
    tit = document.getElementById('noteTitle').value;
    desc = document.getElementById('noteDesc').value;

    if(!localStorage.getItem('itemsJson')){
        itemJsonArray.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }else{
        itemJsonArrayStr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }

    updateS();
}

updateS();
function delElement(itemIndex){
    console.log("Element Deleted...", itemIndex+1);
    itemJsonArrayStr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    updateS();
}

function delAll(){
    console.log("All Element Deleted...");
    itemJsonArrayStr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    itemJsonArray.splice(0, itemJsonArray.length);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    updateS();
}

// Adding Notes
ad.addEventListener('click', getAndUpdate);

// Delete all notes
del.addEventListener('click', delAll);