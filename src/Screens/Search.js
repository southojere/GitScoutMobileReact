import React from 'react';
import { View, StyleSheet, Picker, Button, Modal, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import { FormLabel, FormInput, Icon } from 'react-native-elements'

//components
const styles = StyleSheet.create({
    container: {
        flex: -1,
        backgroundColor: '#ecf0f1',
    },
    searchButton: {
        padding: 20
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
        padding: 100

    },
    optionInput: {

    }
});

export default class Search extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            city: "",
            sortBy: "Followers",
            numberResults: 20,
            //displaying modal
            showModel: false,
            username: ""
        };
    }


    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Search',
            color: "#201E23",
            // User Search Button
            headerRight: (
                <View style={styles.searchButton}>
                    <Icon
                        onPress={navigation.getParam('showModel')}
                        name='search' />

                </View>
            ),
        }

    };

    componentWillMount() {
        this.props.navigation.setParams({ showModel: this._toggleModel });
    }
    /**
     * Method is for toggling on/off the modal for searching for a github user
     */
    _toggleModel = () => {
        this.setState({ showModel: !this.state.showModel });
    };

    render() {
        return (

            <View style={styles.container}>
                <Modal
                    animationType={"slide"}
                    visible={this.state.showModel}
                    onRequestClose={() => { this._toggleModel }}>
                    <View style={styles.modal}>
                        <FormLabel>Username</FormLabel>
                        <FormInput onChangeText={
                            (e) => {
                                this.setState({ username: e })
                            }

                        } />
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
                                this.props.navigation.navigate('UserProfile', {
                                    username: this.state.username
                                })
                            }}
                            title="search"
                        />
                        <TouchableOpacity onPress={this._toggleModel}>
                            <Icon name="close" />
                        </TouchableOpacity>
                    </View>
                </Modal>

                <FormLabel>Region</FormLabel>
                <FormInput autoCorrect={true} onChangeText={
                    (e) => {
                        this.setState({ city: e })
                    }

                } />

                <FormLabel>Filter by</FormLabel>
                <Picker
                    placeholder="Filter Results"
                    selectedValue={this.state.sortBy}
                    style={{
                        marginLeft: 10
                    }}
                    onValueChange={
                        (itemValue, itemIndex) => {
                            this.setState({ sortBy: itemValue })
                        }
                    }>
                    {/* <Picker.Item label="Gists" value="gists" /> */}
                    <Picker.Item label="Repositories" value="repos" />
                    <Picker.Item label="Followers" value="followers" />
                    {/* <Picker.Item label="Contributions" value="contribution" /> */}
                </Picker>

                <FormLabel>Number of results</FormLabel>
                <Picker

                    selectedValue={this.state.numberResults}
                    style={{
                        marginLeft: 10
                    }}
                    onValueChange={
                        (itemValue, itemIndex) => {
                            this.setState({ numberResults: itemValue })
                        }
                    }>
                    <Picker.Item label="1" value={1} />
                    <Picker.Item label="5" value={5} />
                    <Picker.Item label="10" value={10} />
                    <Picker.Item label="20" value={20} />
                    <Picker.Item label="30" value={30} />
                </Picker>
                <Button
                    onPress={() => {
                        this.props.navigation.navigate('SearchResults', {
                            city: this.state.city,
                            sortBy: this.state.sortBy,
                            numberResults: this.state.numberResults
                        });
                        // GitHub.getUser();
                    }}
                    title="Search"
                    color="#448CFF"
                    style={{ 
                        // width: 300,
                        marginLeft:10
                     }}
                />
            </View >
        );
    }
}
