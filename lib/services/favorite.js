'use strict';

const { Service } = require('@hapipal/schmervice'); 

module.exports = class FavoriteService extends Service {
    
    add(userId,filmId){

        const { Favorite } = this.server.models();

        return Favorite.query().insertAndFetch({ user_id: userId, film_id: filmId });
    }    
   get(id){
    const { Favorite } = this.server.models();  

    return Favorite.query().where({user_id: id});
   }
   
   delete(userId,filmId){
    const { Favorite } = this.server.models();

    return Favorite.query()
    .where('user_id', userId)
    .andWhere('film_id', filmId)
    .delete();
   }



}