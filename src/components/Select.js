class Select {
    constructor(selectUstensilsList){
        // this.selectOptionsIngredients = selectOptionsIngredients
        // this.selectOptionsAppliance = selectOptionsAppliance
        this.selectUstensilsList = selectUstensilsList
    }

    render(){

        return(`
            <div class='container_select'>
                <div class='select1'>
                    <input class='ingredients' placeholder='ingredients' list='ingredients'>
                    <datalist id='ingredients'></datalist> 
                </div>
                <div class='select2'>
                    <input class='appliance' placeholder='appliance' list='appliance'>
                    <datalist id='appliance'>
                        <option value='toto'/>
                    </datalist>
                </div>
                <div class='select3'>
                    <input class='ustensils' placeholder='ustensils' list='ustensils'>
                    <datalist id='ustensils'>${this.selectUstensilsList}</datalist>
                </div>
            </div>
        `)
    }
}

export default Select;
