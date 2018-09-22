import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FormLabel, FormInput, Header, Button } from 'react-native-elements'
export default class Favourites extends React.Component {
    render() {
        return (
            <View>
                 <Header
                    backgroundColor="#201E23"
                    centerComponent={{ text: 'Favourites', style: { color: '#fff' } }}
                />
                 <Button
                            buttonStyle={{
                                backgroundColor: "rgba(92, 99,216, 1)",
                                width: 300,
                                height: 45,
                                borderColor: "transparent",
                                borderWidth: 0,
                                borderRadius: 5
                            }}
                            onPress={() => {
                                this.props.navigation.navigate('Search')
                            }}
                            title="search"
                        />
             </View>
        );
    }
  }
  