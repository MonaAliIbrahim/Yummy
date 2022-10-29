import { CATEGORY_ENDPOINT, FILTER_ENDPOINT } from './api_config.js';
import { renderCurrentMeals } from './shared.js';

// Get Category List
export let getCategoryList = async () => {
  let response = await fetch(`${CATEGORY_ENDPOINT}?`);
  let data = await response.json();
  renderCategorySection(data.categories);
}

export function renderCategorySection(meals) {
  let sectionContent = '',
      cards = '';

  // Render Category Cards
  meals.map((meal) => {
  cards += 
    `<div class="col-md-6 col-lg-4 col-xl-3">
      <div class="item m-2" id="${meal.strCategory}">
        <img src="${meal.strCategoryThumb}" class="h-auto" alt="Category Thumbnail"/>
        <div class="item-overlay flex-column text-center p-3">
          <h3 class="pt-3">${meal.strCategory}</h3>
          <p class="px-4 pd-2">${meal.strCategoryDescription.slice(0,100)} ...</p>
        </div>
      </div>
    </div>`          
  }); 
 
  // Append Cards to Doc
  sectionContent = 
    `<section id="categorySection">
      <div class="container py-5">
        <div class="row py-5 m-4 g-4" id="mealsContainer">
          ${cards}
        </div>
      </div>
    </section>`;
  document.querySelector('main').innerHTML = sectionContent; 

  // Card Click Event 
  let items = Array.from(document.querySelectorAll('.item'));
  items.map((item) => {
    item.addEventListener('click', () => {
      filterByCategory(item.id);
    })
  });
}

// Filter By Category
let filterByCategory = async (category) => {
  let response = await fetch(`${FILTER_ENDPOINT}?c=${category}`);
  let data = await response.json();
  renderCurrentMeals(data.meals.slice(0,20));
}
