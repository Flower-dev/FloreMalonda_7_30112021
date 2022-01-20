// components
import NavHome from './components/NavHome.js';
import Card from './components/Card.js';
import Search from './components/Search.js';
import Select from './components/Select.js';
import Tags from './components/Tags.js'

// ------------------------------------------

class Index {
	constructor(){
		this.list = [];
		this.cards = [];
		this.ingredients = [];
		this.ustensils = [];
		this.appliances = [];
		this.query = '';
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


	//  ------------- Gestion des selects --------------- 

	// Liste des ingredients dans tableau des recettes
	selectIngredientsList(){

		// TODO si this.ingredients est vide alors on cherche dans la bdd
		// if(ingredients = []){
			let ingredientsList = this.list.map(function(item) {
				let tmp = item.ingredients.map(function(subItem){
					return subItem.ingredient
				});
			return tmp;

		// TODO sinon on cherche dans la bdd, mais on filtre uniquement 
		// else ....
		// sur les recettes qui matchent les ingredients dans this.ingredients
		// recipe = this.list
	    // this.ingredients.map(ingredient)
	    // 		recipe = filterByIngredient(ingredient, recipe)
		// ici recipe contient les recipes filtrées

		// TODO maintenant on cherche à récupérer la liste des ingr de ces recipes
		// let ingredientsList = this.recipe.map(function(item) {
		// 	let tmp = item.ingredients.map(function(subItem){
		// 		return subItem.ingredient
		// 	});
		// return tmp;


		// TODO: en dehors de cette fonction
		// faire une fonction qui réécrit le dom du select avec uniquement
		// la liste ci-dessous

	}).flat();
	return [...new Set(ingredientsList)] //sup doublons
	}

	// Liste des appliances dans tableau des recettes
	selectAppliancesList() {
		const appliances = this.list.map(function(item) {
			return item.appliance
		});
		return [...new Set(appliances)]
	}

	// Liste des ustensiles dans tableau des recettes
	selectUstensilsList() {
	let ustensilsList = this.list.map(function(item) {
		let tmp = item.ustensils.map(function(subItem){
			return subItem
		});
		return tmp;
	}).flat();

	return [...new Set(ustensilsList)]
	}


	// --------------- Algorithme de recherche -----------------

	// recherche via la search bar (titres, ustensils, ingredients, appliances)

    filterGlobalRecipe(value, recipe) {
        if (value === '' || value.length < 3) {
            return true
        } 
		return recipe.name.toLowerCase().trim().includes(value) ||
		recipe.ingredients.filter((i) => {
			return i.ingredient.toLowerCase().includes(value.toLowerCase())
		}).length > 0 ||
		recipe.appliance.toLowerCase().includes(value.toLowerCase()) ||
		recipe.ustensils.filter((u) => {
			return u.toLowerCase().includes(value.toLowerCase())
		}).length > 0
    }

	// recherche par ingredient
	filterByIngredient(ingredients, recipe){ 
		if(ingredients.length == 0) {
			return true
		}
		return recipe.ingredients.filter((i) => {
			return ingredients.includes(i.ingredient)
		}).length == ingredients.length
	}

	// recherche par ustensile
	filterByUstensils(ustensils, recipe){
		if(ustensils.length == 0) {
			return true
		}
		return recipe.ustensils.filter((u) => {
			return ustensils.includes(u)
		}).length == ustensils.length
	}

	// recherche par appliance
	filterByAppliance (appliances, recipe) {
		if(appliances.length == 0) {
			return true
		}
		return appliances.includes(recipe.appliance)
	}

	// recherche globale
	filterRecipes() {
		this.filteredRecipes = this.list.filter((recipe) => {
			return this.filterGlobalRecipe(this.query, recipe)
			&& this.filterByIngredient(this.ingredients, recipe) 
			&& this.filterByUstensils(this.ustensils, recipe)
			&& this.filterByAppliance (this.appliances, recipe)
		})
	}

	// ---------------------- affichage et suppression des tags -------------------------

	// option selectionnée select ingredients
	selectIngredient(ingredient) {
		this.ingredients.push(ingredient)
		this.filterRecipes()
		this.renderRecipeDOM(this.filteredRecipes)
		const tag = new Tags('', ingredient, 'ingredient', (tagElement, ingredient) => this.deleteIngredientTag(tagElement, ingredient))
		document.querySelector('#tags').appendChild(tag.render())
	}


	// sup tag ingredients
	deleteIngredientTag(tagElement, ingredient) {
		document.querySelector('#tags').removeChild(tagElement)
		this.ingredients = this.ingredients.filter((i) => {
			return i != ingredient
		})
		this.filterRecipes()
		this.renderRecipeDOM(this.filteredRecipes)
	}

	// option selectionnée select appliances
	selectAppliance(appliance) {
		this.appliances.push(appliance)
		this.filterRecipes()
		this.renderRecipeDOM(this.filteredRecipes)
		const tag = new Tags('', appliance, 'appliance', (tagElement, appliance) => this.deleteApplianceTag(tagElement, appliance))
		document.querySelector('#tags').appendChild(tag.render())
	}

	// sup tag appliances
	deleteApplianceTag(tagElement, appliance) {
		document.querySelector('#tags').removeChild(tagElement)
		this.appliances = this.appliances.filter((a) => {
			return a != appliance
		})
		this.filterRecipes()
		this.renderRecipeDOM(this.filteredRecipes)
	}

	// option selectionnée select ustensils
	selectUstensil(ustensil) {
		this.ustensils.push(ustensil)
		this.filterRecipes()
		this.renderRecipeDOM(this.filteredRecipes)
		const tag = new Tags('', ustensil, 'ustensil', (tagElement, ustensil) => this.deleteUstensilTag(tagElement, ustensil))
		document.querySelector('#tags').appendChild(tag.render())
	}

	// sup tag ustensils
	deleteUstensilTag(tagElement, ustensil) {
		document.querySelector('#tags').removeChild(tagElement)
		this.ustensils = this.ustensils.filter((u) => {
			return u != ustensil
		})
		this.filterRecipes()
		this.renderRecipeDOM(this.filteredRecipes)
	}

	
	// ----------------------- render des éléments du DOM -------------------------------

	renderSearchDOM(){
		const search = new Search((value) => {
			this.query = value
			this.filterRecipes()
			this.renderRecipeDOM(this.filteredRecipes)
			console.log(value)
		});
		const $search = document.querySelector('#search');
		$search.innerHTML = `
			${search.render()}
		`
		search.initEvent()
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

