'use strict';

const Joi = require('joi')

module.exports = [
    {
        method: 'patch',
        path: '/user/{userId}',
        options: {
            auth : {
                scope: [ 'admin' ]
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    userId: Joi.number().integer().required().min(1)
                }),
              payload: Joi.object({
                firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
                username: Joi.string().min(3).example('JohnDoe').description('Username of the user'),
                password: Joi.string().min(8).example('JohnJohnJohn').description('Password of the user'),
                mail: Joi.string().email().example('johndoe@email.fr').description('Mail of the user'),
              })
            }
        },
        handler: async (request, h) => {
            const userId = request.params.userId;
            const { userService } = request.services();
         
            return await userService.modify(request.payload,userId);
        }
    },
    {
        method: 'post',
        path: '/user/login',
        options: {
            auth: false,
            tags: ['api'],
            validate: {
              payload: Joi.object({
                firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
                mail: Joi.string().email().example('johndoe@email.fr').description('Mail of the user'),
                password: Joi.string().min(8).example('JohnJohnJohn').description('Password of the user'),
              })
            }
        },
        handler: async (request, h) => {
    
            const { userService } = request.services();
            
            return await userService.login(request.payload);
        }
    },
    {
        method: 'post',
        path: '/user',
        options: {
            auth: false
,
            tags: ['api'],
            validate: {
              payload: Joi.object({
                firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
                username: Joi.string().min(3).example('JohnDoe').description('Username of the user'),
                scope: Joi.string().valid('admin', 'user').default('user').description('Role of the user'),
                password: Joi.string().min(8).example('JohnJohnJohn').description('Password of the user'),
                mail: Joi.string().email().example('johndoe@email.fr').description('Mail of the user'),
              })
            }
        }, 
        handler: async (request, h) => {
    
            const { userService } = request.services();
            const { mailService } = request.services();

            mailService.sendWelcomeEmail(request.payload.mail)
            return await userService.create(request.payload);
        }
    },
    {
    method: 'get',
    path: '/users',
    options: {
        auth: false

        ,
        tags: ['api']
    },
    handler: async (request, h) => {
        const { userService } = request.services();
        // Objection renvoie des promesses, n'oubliez pas de les attendre.

        return await userService.get();
    }
},
{
    method: 'delete',
     path: '/user/{userId}', // Assuming you want to retrieve a user by ID, update the path accordingly
     options: {
        auth : {
            scope: [ 'admin' ]
        },
         tags: ['api'],
         validate: {
            params: Joi.object({
                userId: Joi.number().integer().required().min(1)
            }),
            
         }
     },
     handler: async (request, h) => {
        const { userService } = request.services();
        return userService.delete(request.params.userId);

        }
    }
 
];
