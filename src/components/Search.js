class Search {
    constructor(){}

    render(){

        return (`
            <div class="searchbar">
                <input type="text" class="searchTerm" placeholder="Search">
                <button type="submit" class="searchButton">
                    <i class="fa fa-search"></i>
                </button>
            </div>
        `)
    }
}

export default Search;