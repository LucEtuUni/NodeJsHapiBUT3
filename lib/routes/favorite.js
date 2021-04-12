'use strict';

const Joi = require('joi')

module.exports = [ 

    {
        method: 'post',
        path: '/favorites',
        options: {
            auth : {
                scope: [ 'user' ]
            },
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    userId: Joi.number().integer().required().min(1),
                    filmId: Joi.number().integer().required().min(1)
                })
            }
        },
        handler: async (request, h) => {
            const { favoriteService } = request.services();

                return favoriteService.add(request.payload.userId, request.payload.filmId);
             
        },
        

    },

{
    method: 'get',
    path: '/favorites/{id}',
    options: {
        auth : {
            scope: [ 'user' ]
        },
         tags: ['api'],
         validate: {
            params: Joi.object({
                id: Joi.number().integer().required().min(1)
            }),
            
         }
     },
    handler: async (request, h) => {
        const { favoriteService } = request.services();
        
           return favoriteService.get(request.params.id);
          
    }
}
,

{
    method: 'delete',
    path: '/favorites/{id}',
    options: {
        auth : {
            scope: [ 'user' ]
        },
         tags: ['api'],
         validate: {
            params: Joi.object({
                id: Joi.number().integer().required().min(1)
            }),payload: Joi.object({
                filmId: Joi.number().integer().required().min(1)
            })
            
         }
     },
    handler: async (request, h) => {
        const { favoriteService } = request.services();
       return favoriteService.delete(request.params.id,request.payload.filmId);
         
    }
}




]