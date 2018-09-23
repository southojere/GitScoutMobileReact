import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { FormLabel, FormInput, Header, ListItem } from 'react-native-elements'
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
                                <ListItem
                                    key={i}
                                    // leftAvatar={{ source: { uri: l.avatar_url } }}
                                    title={l.name}
                                    subtitle={l.bio}
                                    button onLongPress={
                                        () => {
                                            this.props.navigation.navigate('UserProfile', { username: l.login })
                                        }
                                    }
                                />
                            ))
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
}
