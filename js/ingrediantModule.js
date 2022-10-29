import { LIST_ENDPOINT, FILTER_ENDPOINT } from './api_config.js';
import { renderCurrentMeals } from './shared.js';

// Get Ingredients List
export let getIngredientList = async () => {
  let response = await fetch(`${LIST_ENDPOINT}?i=`);
  let data = await response.json();
  renderIngredientSection(data.meals.slice(0,20));
}

export function renderIngredientSection(list) {
  let sectionContent = '',
      cards = '';

  // Render Ingredients Cards
  list.map((item) => {
    cards += 
      `<div class="col-md-6 col-lg-4 col-xl-3">
        <div class="item m-2 p-2" id="${item.strIngredient}">
          <i class="fa fa-city fa-2x m-3"></i>
          <h3 class="pt-2 mb-0 text-white">${item.strIngredient}</h3>
          <p class="p-3 text-white">${item.strDescription.slice(0,100)}..</p>
        </div>
      </div>`          
    }); 

  // Append Cards to Doc
  sectionContent = 
    `<section id="ingredSection">
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
      filterByIngredients(item.id);
    })
  });
}

// Filter By Ingrediants
let filterByIngredients = async (name) => {
  let response = await fetch(`${FILTER_ENDPOINT}?i=${name}`);
  let data = await response.json();
  renderCurrentMeals(data.meals.slice(0,20));
}