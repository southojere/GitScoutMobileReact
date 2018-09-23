import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { FormLabel, ListItem, Header } from 'react-native-elements'

//firebase get
import { getHistory } from '../Model/firebase';
export default class Favourites extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
        this.getHistory();
    }

    /**
     * Method waits retrieved favourited users from firebase.
     * 
     */
    getHistory = async () => {
        let histUsers = await getHistory();
        this.setState({
            users: histUsers
        });
    }

    render() {
        this.getHistory();
        return (
            <View>
                <Header
                    backgroundColor="#201E23"
                    centerComponent={{ text: 'History', style: { color: '#fff' } }}
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
