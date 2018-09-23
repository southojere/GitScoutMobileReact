import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { addUserToHistory } from '../Model/firebase';

export default class UserProfile extends React.Component {
    baseUrl = 'https://api.github.com/users/';

    static navigationOptions = {
        title: 'Profile',
        color: "#201E23"
    };


    //Is passed the username to search for and display.
    constructor(props) {
        super(props);
        this.state = {
            userObject:{},
            username: this.props.navigation.getParam('username', ''),
            name: "",
            bio: "",
            location: "",
            followers:""
        }
        this.loadUser();
    }
    //look at how tutorials pull from a api then display it to screen
    //also adds this profile to our history of viewed profiles
    loadUser = async () => { 
        let sortedUsersUrl = this.baseUrl + this.props.navigation.getParam('username', '');
        const response = await fetch(sortedUsersUrl);
        const json = await response.json();

        let newUsersArray;
        //TODO: fetch Detailed users using fetechUserData method
        this.setState({
            userObject:json,
            name: json.name,
            bio:json.bio,
            location:json.location,
            followers:json.followers
        });
        addUserToHistory(json);
    }

    render() {
        return (
            <View>
                <Text style={{
                    fontSize:20
                }}>{this.state.name}</Text>
                <Text h2>{this.state.bio}</Text>
                <Text h3>{this.state.location}</Text>
                <Text>Followers: {this.state.followers}</Text>
            </View>
        );
    }

}
