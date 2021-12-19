class Select {
    constructor(selectIngredientsList, selectAppliancesList, selectUstensilsList){
        this.selectIngredientsList = selectIngredientsList
        this.selectAppliancesList = selectAppliancesList
        this.selectUstensilsList = selectUstensilsList
    }

    render(){

        let KeyData = [
            {
                placeholder: 'Ingredients',
                option: `${this.selectIngredientsList}`,
            },
            {
                placeholder: 'Appareils',
                option: `${this.selectOptionsAppliance}`,
            },
            {
                placeholder: 'Ustensiles',
                option: `${this.selectUstensilsList}`,
            },
        ];

        let container = `<div class='container_select'>` 
        {KeyData.map((item) => (
            `<div class='select'>
                <input class='ingredients' placeholder=${item.placeholder} list=${item.placeholder}>
                <datalist id='ingredients'>${item.option}</datalist> 
            </div>`
        ))} 
        
        container += '</div>'

        return(`

           ${container}
             
        `)
    }
}

export default Select;
