'use strict';

const { Service } = require('@hapipal/schmervice'); 
const bcrypt = require('bcrypt');
const Jwt = require('@hapi/jwt');

module.exports = class UserService extends Service {
    
        create(user){

             const { User } = this.server.models();
   
             return User.query().insertAndFetch(user);
        }    
        get(){
            const { User } = this.server.models();

            return User.query();
        }  
        delete(user){
            const { User } = this.server.models();

            return User.query().deleteById(user);
        }  
        modify(user,userId){
            const { User } = this.server.models();

            return User.query().patchAndFetchById(userId, user);
        }
        async login(user){
            const { User } = this.server.models();
            const  mail = user.mail;
            const password = user.password;
            try {
                // Fetch user by email
                const user = await User.query().findOne({ mail });
    
                // Check if the user exists
                if (!user) {
                    return { login: 'failed', message: 'User not found' };
                }
    
                // Compare the provided password with the hashed password in the database
                const passwordMatch = await bcrypt.compare(password, user.password);
    
                if (passwordMatch) {
                    const token = Jwt.token.generate(
                        {
                            aud: 'urn:audience:iut',
                            iss: 'urn:issuer:iut',
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.mail,
                            scope: user.scope //Le scope du user
                        },
                        {
                            key: 'random_string', // La clé qui est définit dans lib/auth/strategies/jwt.js
                            algorithm: 'HS512'
                        },
                        {
                            ttlSec: 14400 // 4 hours
                        })
                    return token;
                } else {
                    // Incorrect password
                    return { login: 'failed', message: 'Incorrect' };
                }
            } catch (error) {
                console.error('Login error:', error);
                return { login: 'failed', message: 'An error occurred during login' };
            }
        }
        }


