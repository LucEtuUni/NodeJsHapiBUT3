'use strict';

const Joi = require('joi')

module.exports = [

    {
        method: 'post',
        path: '/film',
        options: {
            auth : {
                scope: [ 'admin' ]
            },
            tags: ['api'],
            validate: {
              payload: Joi.object({
                title: Joi.string().min(1).required().example('Inception').description('Title of the film'),
                description: Joi.string().min(1).required().example('A thriller about dreams within dreams.').description('Description of the film'),
                releaseDate: Joi.date().required().example('2010-07-16').description('Release date of the film'),
                director: Joi.string().min(1).required().example('Christopher Nolan').description('Director of the film'),
              })
            }
        }, 
        handler: async (request, h) => {
    
            const { filmService } = request.services();
            const { mailService } = request.services();
            const { userService } = request.services();
            const users = await userService.get(); // Adapter cette fonction pour récupérer les utilisateurs à notifier


            const createdFilm =  await filmService.create(request.payload);

            mailService.sendNewFilmNotification(users,createdFilm);

            return createdFilm;
        }
    },
    {
        method: 'patch',
        path: '/film/{id}',
        options: {
            auth : {
                scope: [ 'admin' ]
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().min(1)
                }),
              payload: Joi.object({
                title: Joi.string().min(1).required().example('Inception').description('Title of the film'),
                description: Joi.string().min(1).required().example('A thriller about dreams within dreams.').description('Description of the film'),
                releaseDate: Joi.date().required().example('2010-07-16').description('Release date of the film'),
                director: Joi.string().min(1).required().example('Christopher Nolan').description('Director of the film'),
              })
            }
        }, 
        handler: async (request, h) => {
            const id = request.params.id;
            const { filmService } = request.services();
         
            return await filmService.modify(request.payload,id);
        }
    },
    {
        method: 'delete',
         path: '/film/{id}', 
         options: {
            auth : {
                scope: [ 'admin' ]
            },
             tags: ['api'],
             validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().min(1)
                }),
                
             }
         },
         handler: async (request, h) => {
            const { filmService } = request.services();
            return filmService.delete(request.params.id);
    
            }
        }


];