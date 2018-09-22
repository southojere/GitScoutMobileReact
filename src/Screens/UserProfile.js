import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
            username: this.props.navigation.getParam('username', ''),
            name: "",
            bio: "",
            location: ""
        }
        this.loadUser();
    }
    //look at how tutorials pull from a api then display it to screen
    loadUser = async () => { 
        let sortedUsersUrl = this.baseUrl + this.props.navigation.getParam('username', '');
        const response = await fetch(sortedUsersUrl);
        const json = await response.json();

        let newUsersArray;
        //TODO: fetch Detailed users using fetechUserData method
        this.setState({
            name: json.name,
            bio:json.bio,
            location:json.location
        });
    }

    render() {
        return (
            <View>
                <Text>{this.state.name}</Text>
                <Text>{this.state.location}</Text>
                <Text>{this.state.bio}</Text>
            </View>
        );
    }

}
