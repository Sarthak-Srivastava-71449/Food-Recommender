const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const randomMeal = document.getElementById('random-dish');

// event listeners

searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
randomMeal.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchInputTxt}`)
    .then(response => response.json())
    .then((data) => {
        console.log(data.meals)
        let result = data.meals;
        let html = "";
        if(result){
            result.forEach((meal) => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img class="item" src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Ingredients</a>
                           
                        </div>
                    </div>
                `;});
            } else{
            html = "Sorry, we didn't find any meal matching your Category!";
            mealList.classList.add('ifNotFound');
        }

        mealList.innerHTML = html;
    });
}


axios.get("https://www.themealdb.com/api/json/v1/1/random.php").then((res)=>{
  console.log(res.data.meals[0])
  let resul = res.data.meals[0];
        let htm = "";
        
            
                htm += `
                    <div class = "meal-item" data-id = "${resul.idMeal}">
                   
                        <div class = "meal-img">
                            <img id="random-dish-image" src = "${resul.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3 id="random-dish-name">${resul.strMeal}</h3>
                            <br>
                            <a href = "#" class = "recipe-btn">Get Ingredients</a>
                        </div>
                    </div>
                `;
                 document.getElementById('random-dish').innerHTML = htm;
            

                





// fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
// .then(res=>res.json())
// .then(data=>{
    // let meal=data.meals[0];
    // let ingredients=[]
    // for(let i=1;i<=20;i++){
    //     let ing=resul[`strIngredient${i}`]
    //     if(ing&&ing!=""){
    //         ingredients.push(ing)
            
    //     }
    //   }
    //   console.log(ingredients)
    //     ingredients.forEach((elt) => {
    //         let $li = document.createElement("li");
    //         $li.innerText = elt;
    //         document.getElementById('modal-content').append($li);
    //     });
    
    

      document.getElementById('name').innerHTML = resul.strMeal
    })

    function getMealRecipe(e){
        e.preventDefault();
        if(e.target.classList.contains('recipe-btn')){
            let mealItem = e.target.parentElement.parentElement;
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => mealRecipeModal(data.meals));
        }
    }
    
    // create a modal
    function mealRecipeModal(meal){
        console.log(meal);
        meal = meal[0];
        let ingredients=[]
        for(let i=1;i<=20;i++){
            let ing=meal[`strIngredient${i}`]
            if(ing&&ing!=""){
                ingredients.push(ing)
                
            }
          }
          console.log(ingredients)
          let a = '';
            ingredients.forEach((elt) => {
                ;
                a+= 
                `
                <ul>
                <li>${elt}</li>
                </ul>`
                mealDetailsContent.innerHTML = a;
                document.getElementById('name').innerText = meal.strMeal
               
            });
            
        mealDetailsContent.parentElement.classList.add('showRecipe');
    }