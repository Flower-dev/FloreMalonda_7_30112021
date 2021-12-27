class Select {
    constructor( id, options, filterRecipes ){
        this.id = id
        this.options = options
        this.filterRecipes = filterRecipes
    }

    
    renderOption(option){
        return `<option value="${option}"></option>`
    }


    render(){

        document.addEventListener('change', (e) => {
            if(e.target.classList[0] == 'datalist-search') {
                this.filterRecipes(e.target.value)
            }
        })
      
        return(`
            <div>
                <input list='${this.id}'>
                <datalist class='datalist-search' id='${this.id}'>${this.options.map(option => this.renderOption(option))}</datalist> 
            </div>   
        `)
    }
}

export default Select;