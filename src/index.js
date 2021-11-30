// components
import NavHome from './components/NavHome.js';
//import Card from './components/Card.js';


class Index {
    constructor(){
        // this.list = [];
        // (async () => {
        //   await this.loadData();
        // })() //Immediate function
    }
  
    /**
     * Chargement des données
     */
    // loadData(){
    //   return fetch('database.json')
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     this.list = data.list;
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
    //    }


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
    }
};

new Index();