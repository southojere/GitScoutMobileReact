
/**
 * Method will add the user to our history if the user isnt already.
 * @param userObject Github users json object to add to firebase history
 */
export const addUserToHistory = async (userObject) => {
    //contains user?
    let currentHistory = await getHistory();
    for(var i =0 ; i< currentHistory.length;i++){
        if(currentHistory[i].login == userObject.login){
            return;
        }
    }
    const response = await fetch("https://gitsearch-ff7bc.firebaseio.com/history.json", {
        method: "POST",
        body: JSON.stringify(userObject)
    }).catch(err => console.log(err));

}


/**
 * Method will add the user to our favourites if the user isnt already.
 * @param userObject Github users json object to add to firebase favourites
 */
export const addToFavourites = async (userObject) => {
    //contains user?
    let currentFavourites = await getFavourites();
    for(var i =0 ; i< currentFavourites.length;i++){
        if(currentFavourites[i].login == userObject.login){
            return;
        }
    }
    const response = await fetch("https://gitsearch-ff7bc.firebaseio.com/favourites.json", {
        method: "POST",
        body: JSON.stringify(userObject)
    }).catch(err => console.log(err));

}

/**
 * Function gets the users stored in favourites in our firebase
 * @returns array of objects representing the users
 * 
 */
export const getFavourites = async () => {
    const favouriteUsers = await fetch('https://gitsearch-ff7bc.firebaseio.com/favourites.json?print=pretty').then(res => res.json())
    const keys = await Object.keys(favouriteUsers);
    const favourites = await keys.map(key => ({
        login:favouriteUsers[key].login,
        name: favouriteUsers[key].name,
        bio: favouriteUsers[key].bio,
        location: favouriteUsers[key].location,
        avatar_url:favouriteUsers[key].avatar_url,
        littleMessage:favouriteUsers[key].littleMessage
    }));
    return await favourites;
}

export const getHistory = async () => {
    const historyUsers = await fetch('https://gitsearch-ff7bc.firebaseio.com/history.json?print=pretty').then(res => res.json())
    const keys = await Object.keys(historyUsers);
    const history = await keys.map(key => ({
        login:historyUsers[key].login,
        name: historyUsers[key].name,
        bio: historyUsers[key].bio,
        location: historyUsers[key].location,
        avatar_url:historyUsers[key].avatar_url,
        blog:historyUsers[key].blog,
        hireable:historyUsers[key].hireable
    }));
    return await history;
}

/**
 * Function determines if a user is already stored in the list
 * @param userObject GitHub users json object
 * @param list string name of which list to check ['favourites','history']
 * @returns true if the user is in the list o.w false
 */
const checkContainsUser = async (userObject,list) => {
    let currentlyStored = []
    list == 'favourites' ? currentlyStored = await getFavourites() : currentlyStored = await getHistory();
    for(var i =0 ; i< currentFavourites.length;i++){
        if(currentFavourites[i].login == userObject.login){
            return true;
        }
    }
    return false;
}

