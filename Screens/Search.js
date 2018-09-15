import React from 'react';
import { Text, StatusBar, TextInput, View, StyleSheet, Picker, Button } from 'react-native';
import { Constants } from 'expo';
export default class Search extends React.Component {

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
                <TextInput
                    style={styles.input}
                    value={this.state.name}
                    onChangeText={city => this.setState({ city })}
                    ref={ref => { this._nameInput = ref }}
                    placeholder="Region"
                    autoFocus={true}
                    autoCapitalize="words"
                    autoCorrect={true}
                    keyboardType="default"
                    returnKeyType="next"
                    onSubmitEditing={this._next}
                    blurOnSubmit={false}
                />
                <Picker
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
                    onPress={ ()=>{alert("//TODO")}}
                    title="Search"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
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