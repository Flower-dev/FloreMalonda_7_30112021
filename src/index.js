// components
import NavHome from './components/NavHome.js';
import Card from './components/Card.js';


class Index {
    constructor(){
        this.list = [];
        (async () => {
          await this.loadData();
            this.renderDOM()
        })() //Immediate function
    }
  
    /**
     * Chargement des données
     */
    loadData(){
      return fetch('database.json')
      .then((resp) => resp.json())
      .then((data) => {
        this.list = data.list;
      })
      .catch(function(error) {
        console.log(error);
      });
    }

    renderCards(list){
        return list.map(function(list) {
          const card = new Card(
            list.name, 
            list.time, 
            list.ingredients,
            list.description
          );
          return `${card.render()}`;
        });
      }

    renderRecipeDOM(list){
        const $list = document.querySelector('#cooking')
        $list.innerHTML = this.renderCards(list).join('')
    }


    /**
    * Création du DOM physique
    */
    renderDOM(){
      const navhome= new NavHome();
      const $header = document.querySelector('#header');
      $header.innerHTML = `
        <div class='container-profil-view'>
          <div class='header'>
            ${navhome.render()}
          </div>
        </div>
      `
      this.renderRecipeDOM(this.list);
    }
};

new Index();