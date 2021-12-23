class Select {
    constructor( id, options ){
        this.id = id
        this.options = options
    }

    render(){
       console.log(this.id)

        let value = '';
        this.options.map(option => {
            console.log(option)
            value += "<li>" + '<a href="#">' + option + '</a>' + "</li>"
        
        })

        return(`
            <div class="dropdown">
                <button id="dLabel" class="btn btn-info dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    ${this.id}
                    <span class="caret"></span>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenu2" id='${this.id}'>
                    ${value}
                </ul>
            </div>
             
        `)
    }
}

export default Select;