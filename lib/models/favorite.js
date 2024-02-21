'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Favorite extends Model {

    static get tableName() {
        return 'user_favorite_films';
    }

    static get joiSchema() {
        return Joi.object({
            id: Joi.number().integer().greater(0),
            user_id: Joi.number().integer().greater(0).description('ID of the user'),
            film_id: Joi.number().integer().greater(0).description('ID of the film'),
            createdAt: Joi.date()
        });
    }
    async $beforeInsert(queryContext) {
        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    async $beforeUpdate(opt, queryContext) {
        this.updatedAt = new Date();
    }
}