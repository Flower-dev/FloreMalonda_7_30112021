class Select {
    constructor( id, options ){
        this.id = id
        this.options = options
    }

    renderOption(option){
        return `<option value="${option}"></option>`
    }

    render(){

        return(`

            <div>
                <input list='${this.id}'>
                <datalist id='${this.id}'>${this.options.map(option => this.renderOption(option))}</datalist> 
            </div>
             
        `)
    }
}

export default Select;
