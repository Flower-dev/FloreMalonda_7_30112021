class Select {
    constructor( id, options ){
        this.id = id
        this.options = options
    }

    
    // typeStyle() {
    //     this.id === 'ingredients' ? 
    //         'btn btn-info dropdown-toggle'
    //      : this.id === 'appliances' ? 
    //         'btn btn-warning dropdown-toggle'
    //      : this.id === 'ustensils' ? 
    //         'btn btn-success dropdown-toggle'
    // }


    render(){
      
        let value = '';
        this.options.map(option => {
            value += "<li>" + '<a href="#">' + option + '</a>' + "</li>"
        })

        return(`
            <div class="dropdown">
                <button id="dLabel" class='btn btn-info dropdown-toggle' type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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