const loadProduct =(src)=>{
    fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${src}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data.meals)
        document.getElementById("details-container").innerHTML="";
        if(data.meals == null ){
            const container = document.getElementById("card-container");
            container.innerHTML ="";
            document.getElementById("error").innerText = "Not found";
        }
        else{
            document.getElementById("error").innerText = "";
            displayProduct(data.meals)
        }
    })
};

const displayProduct =(products)=>{
    const container = document.getElementById("card-container");
    container.innerHTML ="";

    products?.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.classList.add("col-md-3");
        div.classList.add("g-3");

        div.innerHTML = `
        <div onclick="productDetails('${product.idMeal}')">
            <img src=${product.strMealThumb} class="card-img-top" alt="...">
            <div class="card-body text-center">
                <h3>${product.strMeal}</h3>
            </div>
        </div>
        `;
        container.appendChild(div);
    });
};

const productDetails= (id)=>{
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => {
        let idt = data.meals[0];
        const container2 = document.getElementById("details-container");
        container2.innerHTML ="";

        console.log(idt.strMeal);
        const div = document.createElement("div");

        div.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src=${idt.strMealThumb} class="card-img-top" alt="...">
                <div class="card-body">
                  <h3 class="card-title">${idt.strMeal}</h3>
                  <h6>Ingredients</h6>
                  <ul>
                    <li>${idt.strIngredient1}</li>
                    <li>${idt.strIngredient2}</li>
                    <li>${idt.strIngredient3}</li>
                    <li>${idt.strIngredient4}</li>
                    <li>${idt.strIngredient5}</li>
                    <li>${idt.strIngredient6}</li>
                  </ul>
                </div>
              </div>
        `;
        container2.appendChild(div);
    })
};

const Searchitem =()=>{
    const inputValue = document.getElementById("src-input").value;

    loadProduct(inputValue);
    document.getElementById("src-input").value ="";
}

loadProduct("");