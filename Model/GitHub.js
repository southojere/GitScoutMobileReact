import React from 'react';

export default class GitHub {

    getUser() {
        s:string = "";
        fetch('https://api.github.com/users/southojere')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                console.log(JSON.stringify(myJson));
            });
    }
}