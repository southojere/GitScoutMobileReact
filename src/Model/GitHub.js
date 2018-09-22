import React from 'react';

export default class GitHub {

    /** 
     * Helper method gets full users profile object
     * @param username Github users, username.
     * @returns user object.
     */
    static fetchUserData = async () => {
        const response = await fetch('https://api.github.com/users/' + username);
        const json = await response.json();
        console.log("At GitHub provider: "+json);
        return json;
    }
}