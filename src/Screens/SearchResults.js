import React from 'react';
import { FlatList, View } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements'
import { createStackNavigator } from 'react-navigation';

const userList = [
    {
        name: 'Jeremy Southon',
        company: 'PWH',
        location: 'Durham, UK',
        bio: 'I make videos on my favourite technologies. Go Angular!',
        avatar_url: "https://avatars3.githubusercontent.com/u/20221621?v=4",
        email: ''
    },
    {
        name: 'Dan Ko',
        company: 'Koe and Co.',
        location: 'London, UK',
        bio: 'I love open source!',
        avatar_url: 'http://i.imgur.com/TzWcihb.png'
    }
]

export default class SearchResults extends React.Component {
    baseUrl = 'https://api.github.com/search/users?q=location:';

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Search Results',
            color: "#201E23"
        }
    };

    navigate;
    constructor(props) {
        super(props);
        this.state = {
            Users: [], //list of users from search result
            //filter parameters
            city: this.props.navigation.getParam('city', 'Wellington'),
            sortBy: this.props.navigation.getParam('sortBy', 'Followers'),
            numberResults: this.props.navigation.getParam('numberResults', 10)
        }
        this.navigate = this.props.navigation;
    }

    componentWillMount(props) {
        this.fetchData();
    }

    fetchData = async () => {
        // this.fetchUserData("southojere");

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
            <View>
                {
                    this.state.Users.map((l, i) => (
                        <ListItem
                            key={i}
                            leftAvatar={{ source: { uri: l.avatar_url } }}
                            title={l.login}
                            subtitle={l.id}
                            button onPress={
                                () => this.props.navigation.navigate('UserProfile', { username: l.login })
                            }
                        />
                    ))
                }
                {/* <List>
                    <FlatList
                        data={this.state.Users}
                        renderItem={this.renderRow}
                        keyExtractor={item => item.username}
                        key={key => item.username}
                    />
                </List> */}

            </View>
        );
    }

    renderRow({ item }) {
        console.log("check: " + this.navigate);
        return (
            <View>
                <ListItem
                    roundAvatar
                    title={item.login}
                    subtitle={item.id}
                    avatar={{ uri: item.avatar_url }}

                    button onPress={
                        () => this.props.navigation.navigate('UserProfile', { username: "southojere" })
                    }

                />
                {/* <Button
                    title='BUTTON'
                    onPress={()=>{
                        this.props.navigation.navigate('UserProfile', { username: "southojere" })
                    }}
                /> */}
            </View>
        )
    }

}
