class Select {
    constructor( id, options ){
        this.id = id
        this.options = options
    }

    renderOption(option){
        return `<li><button class="dropdown-item" type="button">${option}</button></li>`
    }

    render(){

        return(`

            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                ${this.id}
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                    ${this.options.map(option => this.renderOption(option))}
                </ul>
            </div>
             
        `)
    }
}

export default Select;
