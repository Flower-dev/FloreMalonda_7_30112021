class Select {
    constructor( id, options ){
        this.id = id
        this.options = options
    }

    render(){
       console.log(this.id)

        let toto = "";
        this.options.map(option => {
            console.log(option)
            toto += "<li>" + option + "</li>"
        
        })

        return(`
            <div class="dropdown">
                <button id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    ${this.id}
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenu2" id='${this.id}'>
                    ${toto}
                </ul>
            </div>
             
        `)
    }
}

export default Select;