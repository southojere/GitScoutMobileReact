import React from 'react';
import { View,ScrollView } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements'
import { addUser } from '../Model/firebase';
export default class SearchResults extends React.Component {
    baseUrl = 'https://api.github.com/search/users?q=location:';
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Search Results',
            color: "#201E23"
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            Users: [], //list of users from search result
            //filter parameters
            city: this.props.navigation.getParam('city', 'Wellington'),
            sortBy: this.props.navigation.getParam('sortBy', 'Followers'),
            numberResults: this.props.navigation.getParam('numberResults', 10)
        }

    }

    // Will call api to retrieve data on search
    componentWillMount(props) {
        this.fetchData();
    }

    fetchData = async () => {
        let sortedUsersUrl = this.baseUrl + this.state.city + "+sort:" + this.state.sortBy + "+&per_page=" + this.state.numberResults;
        const response = await fetch(sortedUsersUrl);
        const json = await response.json();
        const users = await json.items;

        let newUsersArray;
        //TODO: fetch Detailed users using fetechUserData method
        this.setState({
            Users: users
        });
    }

    async fetchUserData(username) {
        let url = 'https://api.github.com/users/' + username;
        const response = await fetch(url);
        const json = await response.json();
        return json;
    }

    render() {

        return (

            <ScrollView>
                <View>
                    {
                        this.state.Users.map((l, i) => (
                            <ListItem
                                key={i}
                                avatar={{uri:l.avatar_url}}
                                title={l.login}
                                subtitle={l.id}
                                button onPress={
                                    () => {
                                        this.props.navigation.navigate('UserProfile', { username: l.login })
                                    }
                                }
                            />
                        ))
                    }
                </View>
            </ScrollView>
        );
    }

}
