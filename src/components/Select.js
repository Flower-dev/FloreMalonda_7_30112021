class Select {
    constructor(list){
        this.list = list
    }

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



        return(`
            <div class='container_select'>
                <div class='select1'>
                    <input placeholder= 'ingredients' list='ingredients'>
                    <datalist id='ingredients'>
                        <option value=${ingredientsList}>
                    </datalist>
                </div>
                <div class='select2'>
                    <input placeholder= 'appliance' list='appliance'>
                    <datalist id='appliance'>
                        <option value=${appliancesList}>
                    </datalist>
                </div>
                <div class='select3'>
                    <input placeholder= 'ustensils' list='ustensils'>
                    <datalist id='ustensils'>
                        <option value='test'>
                    </datalist>
                </div>
            </div>
        `)
    }
}

export default Select;

// <option value=${listIngredients}>