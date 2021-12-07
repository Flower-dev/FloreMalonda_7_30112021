class Select {
    constructor(){}

    render(){

        return(`
            <div class='container_select'>
                <div class='select1'>
                    <input placeholder= 'ingredients' list='browsers' name='browser' id='browser'>
                    <datalist id='ingredients'>
                        <option value='Edge'>
                        <option value='Firefox'>
                        <option value='Chrome'>
                        <option value='Opera'>
                        <option value='Safari'>
                    </datalist>
                </div>
                <div class='select2'>
                    <input placeholder= 'appliance' list='browsers' name='browser' id='browser'>
                    <datalist id='appliance'>
                        <option value='Edge'>
                        <option value='Firefox'>
                        <option value='Chrome'>
                        <option value='Opera'>
                        <option value='Safari'>
                    </datalist>
                </div>
                <div class='select3'>
                    <input placeholder= 'ustensils' list='browsers' name='browser' id='browser'>
                    <datalist id='ustensils'>
                        <option value='Edge'>
                        <option value='Firefox'>
                        <option value='Chrome'>
                        <option value='Opera'>
                        <option value='Safari'>
                    </datalist>
                </div>
            </div>
        `)
    }
}

export default Select;