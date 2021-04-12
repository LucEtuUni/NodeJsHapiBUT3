'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');
const bcrypt = require('bcrypt'); 



module.exports = class User extends Model {

    static get tableName() {

        return 'user';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
            lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
            username: Joi.string().min(3).example('JohnDoe').description('Username of the user'),
            scope: Joi.string().valid('admin', 'user').default('user').description('Role of the user'),
            password: Joi.string().min(8).example('JohnJohnJohn').description('Password of the user'),
            mail: Joi.string().email().example('johndoe@email.fr').description('Mail of the user'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
        
    }

    async $beforeInsert(queryContext) {

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;

        this.password = await this.hashPassword(this.password);

    }

    async $beforeUpdate(opt, queryContext) {

        this.updatedAt = new Date();
        if (this.password) {
            this.password = await this.hashPassword(this.password);
        }
    }
    async hashPassword(password) {
        const saltRounds = 10; 
        return bcrypt.hash(password, saltRounds);
    }

};