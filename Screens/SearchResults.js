import React from 'react';
import { FlatList, View } from 'react-native';
import { List, ListItem, Header } from 'react-native-elements'
import GitHub from '../Interfaces/User'

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


    static navigationOptions = {
        title: 'Search Results',
        color:"#201E23"
      };
    

    constructor(props) {
        super(props);
        this.state = {
            User: userList
        }
    }
    render() {
        return (
            <View>
                <List containerStyle={{ marginBottom: 20 }}>
                    {
                        // this.state.User.map((l) => (
                        //     <ListItem
                        //         roundAvatar
                        //         avatar={{ uri: l.avatar_url }}
                        //         key={l.name}
                        //         title={l.name}
                        //     />
                        // ))
                    }
                    <FlatList
                        data={this.state.User}
                        renderItem={({ item }) => (
                            <ListItem
                                roundAvatar
                                title={item.name} 
                                subtitle={item.bio}
                                avatar={{uri:item.avatar_url}}
                                />
                        )}
                        keyExtractor={(item)=>{item.name}}
                    />
                </List>
            </View>
        );
    }


    componentWillMount() {
        fetch('https://api.github.com/users/southojere')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                console.log(JSON.stringify(myJson));
                // this.setState({
                //     User:myJson
                // })
            });
    }
}
