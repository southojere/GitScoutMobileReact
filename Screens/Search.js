import React from 'react';
import { View, StyleSheet, Picker, Button } from 'react-native';
import { FormLabel, FormInput, Header } from 'react-native-elements'
import { Constants } from 'expo';
import {GitHub} from '../Model/GitHub'

export default class Search extends React.Component {

    static navigationOptions = {
        title: 'Search',
        color:"#201E23"
      };
    

    constructor(props) {
        super(props);
        this.state = {
            city: "",
            sortBy: "Followers",
            numberResults: 20
        };
    }

    render() {
        return (

            <View style={styles.container}>
                <FormLabel>Region</FormLabel>
                <FormInput onChangeText={(e) => { this.setState({ city: e }) }} />
                <Picker
                    style={{ width: 500 }}
                    placeholder="Filter Results"
                    selectedValue={this.state.sortBy}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(itemValue, itemIndex) => this.setState({ sortBy: itemValue })}>
                    <Picker.Item label="Gists" value="gists" />
                    <Picker.Item label="Repositories" value="repos" />
                    <Picker.Item label="Followers" value="followers" />
                    <Picker.Item label="Contributions" value="contribution" />
                </Picker>
                <Picker
                    selectedValue={this.state.numberResults}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(itemValue, itemIndex) => this.setState({ numberResults: itemValue })}>
                    <Picker.Item label="1" value={1} />
                    <Picker.Item label="5" value={2} />
                    <Picker.Item label="10" value={10} />
                    <Picker.Item label="20" value={20} />
                    <Picker.Item label="30" value={30} />
                </Picker>
                <Button
                    onPress={() => { 
                        this.props.navigation.navigate('SearchResults');
                        // GitHub.getUser();
                    }}
                    title="Search"
                    color="#448CFF"
                    style={{width:300}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
    header: {
        paddingTop: 20 + Constants.statusBarHeight,
        padding: 20,
        backgroundColor: '#336699',
    },
    description: {
        fontSize: 14,
        color: 'white',
    },
    picker: {
        width: 200
    },
    input: {
        margin: 20,
        marginBottom: 0,
        height: 34,
        paddingHorizontal: 10,
        borderRadius: 4,
        borderColor: '#ccc',
        borderWidth: 1,
        fontSize: 16,
    },
});