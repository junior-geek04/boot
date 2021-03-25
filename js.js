require('dotenv').config();
console.log(process.env);
let app_id = process.env.app_id;
let app_key = process.env.app_key;
let b = false;
let count = 0;
let o = false;

let spinner =  `<div class="spinner-border text-primary" 
id="spinner" role="status">
<span class="sr-only"></span>
</div>`

document.querySelector("#content").innerHTML = spinner;

let modal = document.querySelector("#staticBackdrop");

const button = document.getElementById("search");

let counter = 0;
const quantity = 10;

button.addEventListener("click", ()=>
{
    b = true;
    console.log(document.getElementById('inp').value);
    document.querySelector("#content").innerHTML = spinner;
    counter = 0;
    getData();

})


function onl(){

    const start = counter;
    const end = start + quantity;
    counter = end+1;

    let app_id = "ae9ec6b9";
    let app_key = "14b9a265b9446d71415e30308065834f";
    fetch(`https://api.edamam.com/search?app_id=${app_id}&app_key=${app_key}&q&cuisineType=indian&from=${start}&to=${end}`)
    .then(response => response.json())
    .then(data =>{
        console.log(data);
        d(data);
    });

}

function getData()
{
    const start = counter;
    const end = start + quantity;
    counter = end+1;
    let inp = document.getElementById("inp").value;
    fetch(`https://api.edamam.com/search?app_id=${app_id}&app_key=${app_key}&q=${inp}&from=${start}&to=${end}`)
    .then(response => response.json())
    .then(data =>{
        console.log(data);
        d(data);
    })
}

function md(recipe)
{
    console.log(recipe.label);
    console.log(recipe.ingredients)
}

function d(data)
{
    for(let i = 0;i<data.hits.length;i++)
    {
        let rec = JSON.stringify(data.hits[i].recipe);
        document.getElementById('spinner').style.display = 'none';
        let toAdd = document.createElement('div');
        toAdd.className = "col";
        toAdd.innerHTML =`
            <div class="card" style="width:18rem;">
                <img class="card-img-top" src="${data.hits[i].recipe.image}" alt="Card image cap">
                <div class="card-body">
                    <h6 class="card-title">${data.hits[i].recipe.label}</h6>
                </div>
                <div><button id='but' onclick='md(${rec})' type='button' data-toggle='modal' data-target='#exampleModalScrollable'>Recipe</button></div>
           </div>`
      ;
        document.querySelector("#content").appendChild(toAdd);
    }
    if(b & !count){
        console.log("yes")
        document.querySelector("#content").scrollIntoView(true);

    }

    o = true;

}

window.onscroll = () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight && o)
    {
        if(!b)
        {
            onl();
        }
        else
        {
            count+=1;
            getData();
        }
    }
}

