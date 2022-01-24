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


	//  ------------- Gestion des selects avec des boucles for --------------- 

	// Liste des ingredients dans tableau des recettes
	selectIngredientsList(){
		const ingOptions = []
		for (let index = 0; index < this.list.length; index++) {
			for (let i = 0; i < this.list[index].ingredients.length; i++) {
				ingOptions.push(this.list[index].ingredients[i].ingredient)
			}
		};
		return [...new Set(ingOptions)] 
	} // TO DO fait le 24.01.2022 - sup les doublons et trier par ordre alphabetique .sort()

	// Liste des appliances dans tableau des recettes
	selectAppliancesList() {
		const appOptions = []
		for (let index = 0; index < this.list.length; index++) {
			appOptions.push(this.list[index].appliance)
		}
		return [...new Set(appOptions)]
	} // TO DO fait le 24.01.2022 - sup les doublons et trier par ordre alphabetique .sort()

	// Liste des ustensiles dans tableau des recettes
	selectUstensilsList() {
	const ustOptions = []
	for (let index = 0; index < this.list.length; index++) {
		for (let i = 0; i < this.list[index].ustensils.length; i++) {
            ustOptions.push(this.list[index].ustensils[i])
        }
	}
	return [...new Set(ustOptions)]
	} // TO DO fait le 24.01.2022 - sup les doublons et trier par ordre alphabetique .sort()


	// --------------- Algorithme de recherche avec des boucles for -----------------

	// recherche via la search bar (titres, ustensils, ingredients, appliances)

    filterGlobalRecipe(value, recipe) {
		if (recipe.name.toLowerCase().includes(value) || recipe.description.toLowerCase().includes(value)) {
			return true
		}
		for (let index = 0; index < recipe.ingredients.length; index++) {
			const element = recipe.ingredients[index]
			if (element.ingredient.toLowerCase().includes(value)) {
				return true
			}
		} 
		// recipe.appliance.toLowerCase().includes(value.toLowerCase()) ||
		// recipe.ustensils.filter((u) => {
		// 	return u.toLowerCase().includes(value.toLowerCase())
		// }).length > 0
		return false
    } // fait le 24.01.2022 

	// recherche par ingredient
	filterByIngredient(ingredients, recipe){ 
		if(ingredients.length == 0) {
			return true
		}
		return recipe.ingredients.filter((i) => {
			return ingredients.includes(i.ingredient)
		}).length == ingredients.length
	} // TO DO 

	// recherche par ustensile
	filterByUstensils(ustensils, recipe){
		if(ustensils.length == 0) {
			return true
		}
		return recipe.ustensils.filter((u) => {
			return ustensils.includes(u)
		}).length == ustensils.length
	} // TO DO 

	// recherche par appliance
	filterByAppliance (appliances, recipe) {
		if(appliances.length == 0) {
			return true
		}
		return appliances.includes(recipe.appliance)
	} // TO DO 

	// recherche globale
	filterRecipes() {
		this.filteredRecipes = this.list.filter((recipe) => {
			return this.filterGlobalRecipe(this.query, recipe)
			&& this.filterByIngredient(this.ingredients, recipe) 
			&& this.filterByUstensils(this.ustensils, recipe)
			&& this.filterByAppliance (this.appliances, recipe)
		})
	} // TO DO 

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

