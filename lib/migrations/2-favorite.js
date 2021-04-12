'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.createTable('user_favorite_films', (table) => {

            table.increments('id').primary();
            table.integer('user_id').unsigned().references('id').inTable('user').onDelete('CASCADE');
            table.integer('film_id').unsigned().references('id').inTable('film').onDelete('CASCADE');
            table.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
            table.dateTime('updatedAt').notNull().defaultTo(knex.fn.now());
            
            table.unique(['user_id', 'film_id']);
        });
    },

    async down(knex) {

        await knex.schema.dropTableIfExists('user_favorite_films');
    }
};
