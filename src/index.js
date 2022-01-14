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

	// Gestion du search 

// partie à retravailler
    // filterGlobalRecipe(value) {
    //     if (value === '' || value.length < 3) {
    //         this.filteredGlogalRecipe = this.recipes
    //         return
    //     }
    //     this.filteredGlogalRecipe = this.recipes.filter((o) => o.toLowerCase().trim().includes(value))
    // }

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


	// ----------------------------------------
	
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

// Scénario nominal
// 1.​ ​Le cas d’utilisation commence lorsque​ l’utilisateur​ entre au moins ​3 caractères​ dans la
// 	  barre de recherche principale.
// 2.​ ​​Le système ​recherche des recettes correspondant à l’entrée utilisateur dans :​le titre de
//     la recette, la liste des ingrédients de la recette, la description de la recette.
// 3.​ ​ ​L’interface​ est actualisée avec les résultats de recherche
// 4.​ ​Les champs de recherche avancée sont actualisés avec les informations ​ingrédients​, ustensiles​, ​appareil​ des différentes recettes restantes
// 5.​ ​​L’utilisateur​précisesarecherchegrâceàl’undeschamps:​ingrédients​,​ustensiles​, appareil​.
// 6.​ ​Au fur et à mesure du remplissage les mots clés ne correspondant pas à la frappe 
//    dans le champ disparaissent. Par exemple, si l’utilisateur entre “coco” dans la liste d’ingrédients, seuls vont rester “noix de coco” et “lait de coco”.
// 7.​ ​L’utilisateur​ choisit un mot clé dans le champ
// 8.​ ​Le mot clé apparaît sous forme de ​tag​ sous la recherche principale
// 9.​ ​Les résultats de recherche sont actualisés, ainsi que les éléments disponibles dans les champs de recherche avancée
// 10.​ ​L’utilisateur sélectionne une recette
          