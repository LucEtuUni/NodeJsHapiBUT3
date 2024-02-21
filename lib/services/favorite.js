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
   async getFavoriteMail(filmId) {
    const { Favorite } = this.server.models();

    try {
        // Perform a query to get users who have favorited the movie with the specified ID
        const users = await Favorite.query()
            .where('film_id', filmId)
            .join('user', 'user_favorite_films.user_id', 'user.id')
            .select('user.mail');

        return users.map(user => user.mail);
    } catch (error) {
        console.error('Error fetching favorite users:', error);
        throw new Error('Failed to fetch favorite users');
    }
}
   
   delete(userId,filmId){
    const { Favorite } = this.server.models();

    return Favorite.query()
    .where('user_id', userId)
    .andWhere('film_id', filmId)
    .delete();
   }



}