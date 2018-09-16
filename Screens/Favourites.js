import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FormLabel, FormInput, Header } from 'react-native-elements'
export default class Favourites extends React.Component {
    render() {
        return (
            <View>
                 <Header
                    backgroundColor="#201E23"
                    centerComponent={{ text: 'Favourites', style: { color: '#fff' } }}
                />
             </View>
        );
    }
  }
  