import { DETAILS_ENDPOINT } from './api_config.js';

// Show Meal Cards
export let renderCurrentMeals = (meals, route) => {
  let sectionContent = '',
      cards = '';

  // Render Meal Cards
  meals.map((meal) => {
    cards += 
      `<div class="col-sm-6 col-md-4 col-lg-3">
        <div class="item m-2" id="${meal.idMeal}">
          <img src="${meal.strMealThumb}" alt="Meal Thumbnail"/>
          <div class="item-overlay">
            <h3>${meal.strMeal}</h3>
          </div>
        </div>
      </div>`          
  }); 
 
  // Append Cards to Doc
  if(route === 'search') {
    document.querySelector('#mealsContainer').innerHTML = cards;
  }else {
    sectionContent = 
      `<section id="homeSection">
        <div class="container py-5">
          <div class="row py-5 m-4 g-4" id="mealsContainer">
            ${cards}
          </div>
        </div>
      </section>`;
    document.querySelector('main').innerHTML = sectionContent;
  }

  // Card Click Event 
  let items = Array.from(document.querySelectorAll('.item'));
  items.map((item) => {
    item.addEventListener('click', () => {
      getMealDetails(item.id);
    })
  });
};

// Get Meal Details
export let getMealDetails = async (id) => {
  let response = await fetch(`${DETAILS_ENDPOINT}?i=${id}`);
  let data = await response.json();
  renderDetailsCard(data.meals[0]);
};

// Render Meal Details Card
let renderDetailsCard = (meal) => {
  let tags = '',
      tagLabels = '',
      measureArr = [],
      ingredientsArr = [],
      recipeLabels = '';

  // Render Recipes Label
  Object.keys(meal).map((mealKey) => {
    if(mealKey.includes('strMeasure')) {
      measureArr.push(mealKey);
    }else if(mealKey.includes('strIngredient')) {
      ingredientsArr.push(mealKey);
    }
  });

  for(let i = 0 ; i < measureArr.length ; i++) {
    if(meal[measureArr[i]] && meal[measureArr[i]].trim().length > 0) {
      recipeLabels += 
        `<span class="badge my-3 mx-1 p-2 rounded-1">
          ${meal[measureArr[i]]} ${meal[ingredientsArr[i]]}
        </span>`;
    }
  };

  // Render Tags Label
  if(meal.strTags) {
    tags = meal.strTags.split(',');
    tags.map((tag) => {
      tagLabels += 
        `<span class="badge badge my-3 mx-1 p-2 rounded-1">
          ${tag}
        </span>`
    });
  }

  // Render Meal Details Card 
  let mealCard = `
    <section id="detailsSection">
      <div class="container py-5">
        <div class="row py-5 m-4" id="detailsContainer">
          <div class="col-md-6 mb-4">
            <div class="meal-title">
              <img src="${meal.strMealThumb}" class="img-fluid px-0 px-md-4" alt="Meal Image">
              <h1 class="text-center my-3">${meal.strMeal}</h1>
            </div>
          </div>
          <div class="col-md-6">
            <div class="meal-info">
              <h2 class="mb-3">Instructions</h2>
              <p>${meal.strInstructions}</p>
              <p>
                <span class="text-bold">Area</span> : ${meal.strArea}
              </p>
              <p>
                <span class="text-bold">Category</span> : ${meal.strCategory}
              </p>
              <div class="my-3">
                <h2>Recipes :</h2>
                <div class="recipes">
                  ${recipeLabels}
                </div>
              </div>
              <div class="my-3">
                <h2>Tages :</h2>
                <div class="tags">
                  ${tagLabels}
                </div>
              </div>
              <div class="links d-flex">
                <a href="${meal.strSource}" target="_blank" class="btn btn-success m-2 ms-0">Source</a>
                <a href="${meal.strYoutube}" target="_blank" class="btn btn-danger my-2">Youtube</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>`;

  document.querySelector('main').innerHTML = mealCard;
};