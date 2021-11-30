class Card {
    
    constructor(name, time, ingredients, description) {
        this.name = name
        this.time = time
        this.ingredients = ingredients
        this.description = description
    }


    render() {


        return (`
            <div class='card_main'>
                <div class='img_card'></div>
                <div class='content_card'>
                    <div class='header_card'>
                        <div class='title_card'>
                            <p>${this.name}</p>
                        </div>
                        <div class='time_card'>
                            <p>${this.time} min</p>
                        </div>
                    </div>
                    <div class='description_card'>
                        <div class='ingredients_content'>
                        <li><span>${this.ingredients.ingredient}</span>${this.ingredients.quantity}${this.ingredients.unit}</li>
                        </div>
                        <div class='description_content'>
                            <p>${this.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        `)
    }
}

export default Card;



        // {this.ingredients}.forEach(one => {
        //     (one.ingredient != undefined) ? ingredient = one.ingredient : ingredient = '';
        //     (one.quantity != undefined) ? quantity = `: ${one.quantity}` : quantity = '';
        //     (one.unit != undefined) ? unit = one.unit : unit = '';
        //     const li = `<li><span>${ingredient}</span>${quantity}${unit}</li>`;
        //     listElt.innerHTML += li;
        
        //     ingredientsArray.push(ingredient)
        // })