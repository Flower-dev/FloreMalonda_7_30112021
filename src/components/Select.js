class Select {
    constructor(list){
        this.list = list
    }

    render(){

        // pour récupérer la liste de l'ensemble des ingredients
        // créer une variable avec un tableau vide
        // 
        // parcourir l'ensemble des ingredients et pour chacun le mettre dans le tableau sauf si existants
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
                        <option value='test'>
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