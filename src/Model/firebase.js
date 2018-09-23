export const addUserToHistory = async (userObject) => {
    const response = await fetch("https://gitsearch-ff7bc.firebaseio.com/history.json", {
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
        avatar_url:favouriteUsers[key].avatar_url
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
        avatar_url:historyUsers[key].avatar_url
    }));
    return await history;
}