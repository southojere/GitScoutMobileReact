import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FormLabel, FormInput, Header } from 'react-native-elements'
  

export default class SearchResults extends React.Component {
    constructor(props){
        super(props);
        this.state= {
             User:[{}]
        }
    }
    render() {
        return (
            <View>
                 <Header
                    backgroundColor="#201E23"
                    centerComponent={{ text: 'Search Results', style: { color: '#fff' } }}
                />
                
             </View>
        );
    }


    componentWillMount(){
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
  