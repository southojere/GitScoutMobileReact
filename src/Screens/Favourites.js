import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { Card, Avatar, Header, ListItem } from 'react-native-elements'
//firebase get
import { getFavourites } from '../Model/firebase';
export default class Favourites extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
        this.getFavourites();
    }

    /**
     * Method waits retrieved favourited users from firebase.
     * 
     */
    getFavourites = async () => {
        let favUsers = await getFavourites();
        this.setState({
            users: favUsers
        });
    }

    render() {
        return (
            <View>
                <Header
                    backgroundColor="#201E23"
                    centerComponent={{ text: 'Favourites', style: { color: '#fff' } }}
                />
                <ScrollView>
                    <View>
                        {
                            this.state.users.map((l, i) => (
                                // <ListItem
                                //     key={i}
                                //     // leftAvatar={{ source: { uri: l.avatar_url } }}
                                //     title={l.name}
                                //     avatar={{uri:l.avatar_url}}
                                //     subtitle={l.bio}

                                // button onPress={
                                //     () => {
                                //         this.props.navigation.navigate('UserProfile', { username: l.login })
                                //     }
                                // }
                                // />
                                <Card
                                    key={i}
                                >
                                    <Avatar
                                        medium
                                        rounded
                                        source={{ uri: l.avatar_url }}
                                        activeOpacity={0.7}
                                        button onPress={
                                            () => {
                                                this.props.navigation.navigate('UserProfile', { username: l.login })
                                            }
                                        }
                                    />
                                    <Text>{l.name}</Text>
                                    <Text>{l.bio}</Text>
                                    <Text>My note: {l.littleMessage}</Text>
                                </Card>
                            ))
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
}
