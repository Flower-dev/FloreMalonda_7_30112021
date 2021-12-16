// components
import NavHome from './components/NavHome.js';
import Card from './components/Card.js';
import Search from './components/Search.js';
import Select from './components/Select.js';


class Index {
  constructor(){
    this.list = [];
    this.cards = [];
    (async () => {
      await this.loadData();
        this.renderDOM()
    })() //Immediate function
  }

  /**
   * Chargement des données
   */
  loadData(){
    return fetch('database.json')
    .then((resp) => resp.json())
    .then((data) => {
      this.list = data.list;
    })
    .catch(function(error) {
      console.log(error);
    });
  }

// Gestion des selects

  displayCards() {
    let divCards = document.querySelector('.cards');
    divCards.innerHTML = '';
    this.renderCardsDOM();
  }

  // Liste des ingredients
  selectIngredientsList(){
    let ingredientsList = [];
    this.list.map(function(item) {
      let tmp = item.ingredients.map(function(subItem){
          return subItem.ingredient
      });
      ingredientsList = ingredientsList.concat(tmp)
    });
    this.ingredientsList = new Set(ingredientsList)
    this.ingredientsList = [...ingredientsList]
  }

  selectOptionsIngredients() {
    let optionsIngredients = '';
    for (let i = 0; i < ingredientsList.length; i++) {
        optionsIngredients += '<option value="' + ingredientsList[i] + '" />';
    }
  }

  // Liste des appliances
  selectAppliancesList() {
    let appliancesList = [];
    let arr = this.list.map(function(item) {
          return item.appliance
    });
    appliancesList = appliancesList.concat(arr)
    appliancesList = new Set(appliancesList)
    appliancesList = [...appliancesList]
  }

  selectOptionsAppliance() {
    let optionsAppliance = '';
    for (let i = 0; i < appliancesList.length; i++) {
      optionsAppliance += '<option value="' + appliancesList[i] + '" />';
    }
  }
  // Liste des ustensiles 
  selectUstensilsList(list) {
    let ustensilsList = [];
    let arr2 = list.map(function(item) {
        return item.ustensils
    });
    ustensilsList = ustensilsList.concat(arr2)
    ustensilsList = new Set(ustensilsList)
    ustensilsList = [...ustensilsList]
  }

  selectOptionsUstensils() {
    let optionsUstensils = '';
    for (let i = 0; i < ustensilsList.length; i++) {
      optionsUstensils += '<option value="' + ustensilsList[i] + '" />'
    }
    return optionsUstensils;
  }

  renderSearchDOM(){
    const search = new Search();
    const $search = document.querySelector('#search');
    $search.innerHTML = `
      ${search.render()}
    `
  }

  // renderSelect() {
  //   const select = new Select((list) => this.selectList(list));
  //   return `${select.render()}`;
  // }

  renderSelectDOM(){
    const select = new Select(
      console.log(this.selectUstensilsList),
      this.selectOptionsIngredients,
      this.selectOptionsAppliance,
      this.selectOptionsUstensils
    );
    const $select = document.querySelector('#select');
    $select.innerHTML = `${select.render()}`;
  }

  renderCards(list){
    return list.map(function(list) {
      const card = new Card(
        list.name, 
        list.time, 
        list.ingredients,
        list.description
      );
      return `${card.render()}`;
    });
  }

  renderRecipeDOM(list){
    const $list = document.querySelector('#cooking')
    $list.innerHTML = this.renderCards(list).join('')
  }

  /**
  * Création du DOM physique
  */
  renderDOM(){
    const navhome = new NavHome();
    const $header = document.querySelector('#header');
    $header.innerHTML = `
      ${navhome.render()}
    `
    this.renderSearchDOM();
    this.renderSelectDOM(this.list);
    this.renderRecipeDOM(this.list);
  }
};

new Index();