import { LIST_ENDPOINT, FILTER_ENDPOINT } from './api_config.js';
import { renderCurrentMeals } from './shared.js';

// Get Area List
export let getAreaList = async () => {
  let response = await fetch(`${LIST_ENDPOINT}?a=`);
  let data = await response.json();
  renderAreaSection(data.meals.slice(0,20));
}

export function renderAreaSection(areas) {
  let sectionContent = '',
      cards = '';

  // Render Area Cards
  areas.map((area) => {
    cards += 
      `<div class="col-md-6 col-lg-4 col-xl-3">
        <div class="item m-2 p-2" id="${area.strArea}">
          <i class="fa fa-city fa-2x m-3"></i>
          <h3 class="pt-3 text-white">${area.strArea}</h3>
        </div>
      </div>`          
    }); 

  // Append Cards to Doc
  sectionContent = `
    <section id="areaSection">
      <div class="container p-5">
        <div class="row py-5 g-4" id="mealsContainer">
          ${cards}
        </div>
      </div>
    </section>
  `;
  document.querySelector('main').innerHTML = sectionContent; 

  // Card Click Event 
  let items = Array.from(document.querySelectorAll('.item'));
  items.map((item) => {
    item.addEventListener('click', () => {
      filterByArea(item.id);
    })
  });
}

// Filter By Area
let filterByArea = async (area) => {
  let response = await fetch(`${FILTER_ENDPOINT}?a=${area}`);
  let data = await response.json();
  renderCurrentMeals(data.meals.slice(0,20));
}