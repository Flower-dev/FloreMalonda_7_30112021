// components
import NavHome from './components/NavHome.js';
import Card from './components/Card.js';
import Search from './components/Search.js';
import Select from './components/Select.js';

// ------------------------------------------

class Index {
	constructor(){
		this.list = [];
		this.cards = [];
		this.ingredients = [];
		this.ustensils = [];
		this.appliances = [];
		(async () => {
		await this.loadData();
			this.renderDOM();
			this.filterRecipes()
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
			this.filterRecipes();
	})
		.catch(function(error) {
			console.log(error);
		});
	}

	// Gestion des selects

	// Liste des ingredients
	selectIngredientsList(){
		let ingredientsList = this.list.map(function(item) {
			let tmp = item.ingredients.map(function(subItem){
				return subItem.ingredient
			});
		return tmp;
	});

		return ingredientsList.reduce((acc, cur)=>{
			return acc.concat(cur)
		}, [])
	}

	// Liste des appliances
	selectAppliancesList() {
		return this.list.map(function(item) {
			return item.appliance
		});
	}

	// Liste des ustensiles 
	selectUstensilsList() {
	let ustensilsList = this.list.map(function(item) {
		let tmp = item.ustensils.map(function(subItem){
			return subItem
		});
		return tmp;
	});

	return ustensilsList.reduce((acc, cur)=>{
		return acc.concat(cur)
	}, [])
	}


	filterByIngredient(ingredients, recipe){
		if(ingredients.length == 0) {
			return true
		}
		return recipe.ingredients.filter((i) => {
			return ingredients.includes(i.ingredient)
		}).length == ingredients.length
	}

	filterByUstensils(ustensils, recipe){
		if(ustensils.length == 0) {
			return true
		}
		return recipe.ustensils.filter((u) => {
			return ustensils.includes(u)
		}).length == ustensils.length
	}

	filterByAppliance (appliances, recipe) {
		if(appliances.length == 0) {
			return true
		}
		return appliances.includes(recipe.appliance)
	}

	filterRecipes() {
		this.filteredRecipes = this.list.filter((recipe) => {
			return this.filterByIngredient(this.ingredients, recipe) 
			&& this.filterByUstensils(this.ustensils, recipe)
			&& this.filterByAppliance (this.appliances, recipe)
		})
	}

	selectIngredient(ingredient) {
		this.ingredients.push(ingredient)
		this.filterRecipes()
		this.renderRecipeDOM(this.filteredRecipes)
	}

	selectAppliance(appliance) {
		this.appliances.push(appliance)
		this.filterRecipes()
		this.renderRecipeDOM(this.filteredRecipes)
	}

	selectUstensil(ustensil) {
		this.ustensils.push(ustensil)
		this.filterRecipes()
		this.renderRecipeDOM(this.filteredRecipes)
	}

	// sup tags
	deleteIngredientTag(ingredient) {
		this.ustensils.filter(ingredient)
		this.filterRecipes()
		this.renderRecipeDOM(this.filteredRecipes)
	}

	


	// render des éléments du DOM 

	renderSearchDOM(){
		const search = new Search();
		const $search = document.querySelector('#search');
		$search.innerHTML = `
			${search.render()}
		`
	}

	renderSelectDOM(){
		const $select = document.querySelector('#select');
	
		const selectIngredients = new Select('select-ingredient', 'ingredients', this.selectIngredientsList(), (ingredient) => (this.selectIngredient(ingredient)), (ingredient) => (this.deleteIngredientTag(ingredient))) ;
		const selectAppliances = new Select('select-appliance', 'appliances', this.selectAppliancesList(), (appliance) => this.selectAppliance(appliance));
		const selectUstensils = new Select('select-ustensil', 'ustensils', this.selectUstensilsList(), (ustensil) => this.selectUstensil(ustensil));

		$select.appendChild(selectIngredients.render());
		$select.appendChild(selectAppliances.render());
		$select.appendChild(selectUstensils.render());
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
		this.renderSelectDOM();
		this.renderRecipeDOM(this.filteredRecipes);
	}
};

new Index();