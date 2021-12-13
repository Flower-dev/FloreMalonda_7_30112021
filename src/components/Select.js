class Select {
    constructor(list){
        this.list = list
    }

    // refactorisation
    // utilisation de type
    // remonter au parent le type et l'element

    render(){

        // Liste des ingredients

        let ingredientsList = [];
        this.list.map(function(item) {
            let tmp = item.ingredients.map(function(subItem){
                return subItem.ingredient
            });
            ingredientsList = ingredientsList.concat(tmp)
        });
        ingredientsList = new Set(ingredientsList)
        ingredientsList = [...ingredientsList]
        console.log(ingredientsList);
        // TODO : revoir code + recherche sur l'utilisation de SET en JS

        // Liste des appliances

        let appliancesList = [];
        let tmp = this.list.map(function(item) {
                return item.appliance
        });
        appliancesList = appliancesList.concat(tmp)
        appliancesList = new Set(appliancesList)
        appliancesList = [...appliancesList]
        console.log(appliancesList);

        // Liste des ustensiles 

        let ustensilsList = [];
        let tmp2 = this.list.map(function(item) {
            return item.ustensils
        });
        ustensilsList = ustensilsList.concat(tmp2)
        ustensilsList = new Set(ustensilsList)
        ustensilsList = [...ustensilsList]
        console.log(ustensilsList);

        // Options des datalists
        let optionsIngredients = '';
        for (let i = 0; i < ingredientsList.length; i++) {
            optionsIngredients += '<option value="' + ingredientsList[i] + '" />';
        }

        let optionsAppliance = '';
        for (let i = 0; i < appliancesList.length; i++) {
            optionsAppliance += '<option value="' + appliancesList[i] + '" />';
        }

        let optionsUstensils = '';
        for (let i = 0; i < ustensilsList.length; i++) {
            optionsUstensils += '<option value="' + ustensilsList[i] + '" />'
        }

        return(`
            <div class='container_select'>
                <div class='select1'>
                    <input class='ingredients' placeholder='ingredients' list='ingredients'>
                    <datalist id='ingredients'>${optionsIngredients}</datalist> 
                </div>
                <div class='select2'>
                    <input class='appliance' placeholder='appliance' list='appliance'>
                    <datalist id='appliance'>${optionsAppliance}</datalist>
                </div>
                <div class='select3'>
                    <input class='ustensils' placeholder='ustensils' list='ustensils'>
                    <datalist id='ustensils'>${optionsUstensils}</datalist>
                </div>
            </div>
        `)
    }
}

export default Select;
