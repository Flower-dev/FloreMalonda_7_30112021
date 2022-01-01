class Select {
    constructor( id, options, filterRecipes ){
        this.id = id
        this.options = options
        this.filterRecipes = filterRecipes
    }

    
    renderOption(option) {
        return `<option value="${option}"></option>`
    }

    renderDataFilter(option) {
        return `${option}`
    }


    render(){

        document.addEventListener('select', (event) => {
            if(event.target.dataset['filter']){
                this.filterByTags(event.target.dataset['filter'])
            }
            console.log(this.filterByTags(event.target.dataset['filter']))
        })

        return(`
            <div>
                <input list='${this.id}'>
                <datalist class='datalist-search' data-filter='${this.options.map(option => this.renderDataFilter(option))}' id='${this.id}'>${this.options.map(option => this.renderOption(option))}</datalist> 
            </div>   
        `)
    }
}

export default Select;

// A FAIRE TEST : Mettre un datalist aussi dans les cartes comme dans les selects