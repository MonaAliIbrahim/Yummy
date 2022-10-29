import { SEARCH_ENDPOINT } from './api_config.js';
import { renderCurrentMeals } from './shared.js';

export function renderSearchSection() {
  let sectionContent = `
    <section id="searchSection">
      <div class="fixed-search">
        <div class="container px-5">
          <div class="row p-5">
            <div class="col-md-6">
              <input type="text" id='nameSearch' placeholder='search by name ..' class="w-100"/>
            </div>
            <div class="col-md-6">
              <input type="text" id='letterSearch' placeholder='search by first letter ..' maxlength="1" class="w-100"/>
            </div>
          </div>
        </div> 
      </div>
      <div class="container">
        <div class="row p-5">
          <div class="row m-4 g-4 mt-5 pt-5" id="mealsContainer">
          </div>
        </div>
      </div>
    </section>
  `;
  document.querySelector('main').innerHTML = sectionContent;

  let nameInput = document.getElementById('nameSearch'),
      letterInput = document.getElementById('letterSearch');

  nameInput.addEventListener('keyup', () => {
    getMealByName(nameInput.value);
  }); 
  letterInput.addEventListener('keyup', () => {
    getMealByLetter(letterInput.value);
  }); 

}

// Filter Meals By Name
let getMealByName = async (name='') => {
  let response = await fetch(`${SEARCH_ENDPOINT}?s=${name}`);
  let data = await response.json();
  renderCurrentMeals(data.meals.slice(0,20),'search');
}

// Filter Meals By Letter
let getMealByLetter = async (letter='') => {
  let response = await fetch(`${SEARCH_ENDPOINT}?f=${letter}`);
  let data = await response.json();
  renderCurrentMeals(data.meals.slice(0,20),'search');
}
