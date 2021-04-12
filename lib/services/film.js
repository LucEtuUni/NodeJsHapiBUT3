'use strict';

const { Service } = require('@hapipal/schmervice'); 
const bcrypt = require('bcrypt');

module.exports = class FilmService extends Service {
    
        create(film){

             const { Film } = this.server.models();
   
             return Film.query().insertAndFetch(film);
        }    
        modify(film,filmId){
            const { Film } = this.server.models();

            return Film.query().patchAndFetchById(filmId, film);
        }
        delete(filmId){
            const { Film } = this.server.models();

            return Film.query().deleteById(filmId);
        }

    }