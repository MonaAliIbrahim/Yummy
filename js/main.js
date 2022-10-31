import { SEARCH_ENDPOINT } from './api_config.js';
import { renderCurrentMeals } from './shared.js';
import { renderSearchSection } from './searchModule.js';
import { getCategoryList } from './categoryModule.js';
import { getAreaList } from './areaModule.js';
import { getIngredientList } from './ingrediantModule.js';
import { rendeContatSection } from './contactModule.js';

$(document).ready(function() {

  // Firing Wow.js Library
  new WOW().init();

  // Hide Loading Screen
  $('#loading').fadeOut(1000, function() {
    $('body').css('overflow', 'visible');
  });

  // Toggle Aside Menu
  $('.aside-menu .toggle-btn').click(function() {

    $('.aside-menu .nav-item').removeClass('fadeOutLeftBig').removeClass('fadeInUpBig');
    let toggleStatus = $(this).attr('menu-expanded');

    if(toggleStatus === 'false') {
      $('.aside-menu').animate({left: '0'}, 500);
      $('.aside-menu .nav-item').addClass('fadeInUpBig');
      $(this).attr('menu-expanded','true');
    }
    else {
      closeMenu.call(this);
    }
  });

  // Handle Click NavItem - Current View
  $('.aside-menu .nav-item').click(function() {
    let navigate = $(this).text().trim();

    $('#loading').fadeIn(500, function() {
      switch(navigate) {
        case 'search':
          renderSearchSection();
          break;
        case 'categories':
          getCategoryList();
          break;
        case 'area':
          getAreaList();
          break;
        case 'ingredients':
          getIngredientList();
          break;
        default:
          rendeContatSection();
      }
    }).fadeOut(500, function() {
        closeMenu.apply($('.toggle-btn'));
    });
  });

  function closeMenu() {
    $('.aside-menu .nav-item').addClass('fadeOutLeftBig');
    setTimeout(() => {
      $('.aside-menu').animate({left: '-250px'}, 500);
      $(this).attr('menu-expanded', 'false');
    },300);
  }

  // Get Default Meals
  let getMeals = async (name = '') => {
    let response = await fetch(`${SEARCH_ENDPOINT}?s=${name}`);
    let data = await response.json();
    let meals = data.meals;
    // Show Meal Cards
    renderCurrentMeals(meals);
  }
  getMeals();

});