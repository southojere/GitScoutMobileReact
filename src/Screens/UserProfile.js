import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { addUserToHistory, addToFavourites } from '../Model/firebase';
import { Card, Avatar, Icon } from 'react-native-elements'
import DialogInput from 'react-native-dialog-input';

//components
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
    favouriteButton: {
        padding: 20
    }
});


export default class UserProfile extends React.Component {
    baseUrl = 'https://api.github.com/users/';


    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Profile',
            color: "#201E23",
            // User Search Button
            headerRight: (
                <View style={styles.favouriteButton}>
                    <Icon
                        onPress={navigation.getParam('addToFavourites')}
                        name='star' />

                </View>
            ),
        }

    };

    //Is passed the username to search for and display.
    constructor(props) {
        super(props);
        this.state = {
            userObject: {},
            username: this.props.navigation.getParam('username', ''),
            name: "",
            bio: "",
            location: "",
            followers: "",
            blog: "",
            hirable: "",
            //repository 
            repos_url: "",
            repositorys: [],
            //for display input box
            dialogIsVisible: false

        }
        this.loadUser();
        this.loadUsersRepos();
    }

    //Method called on creation
    //Loads users information
    loadUser = async () => {
        let sortedUsersUrl = this.baseUrl + this.props.navigation.getParam('username', '');
        const response = await fetch(sortedUsersUrl);
        const json = await response.json();

        //TODO: fetch Detailed users using fetechUserData method
        this.setState({
            userObject: json,
            name: json.name,
            bio: json.bio,
            location: json.location,
            followers: json.followers,
            blog: json.blog,
            hirable: json.hirable,
            repos_url: json.repos_url
        });
        addUserToHistory(json);
    }

    //Method loads users repositorys 
    loadUsersRepos = async () => {
        let username = this.props.navigation.getParam('username', '');
        let urlForRepo = "https://api.github.com/users/" + username + "/repos";
        const response = await fetch(urlForRepo);
        const json = await response.json();

        //
        let usersRepositorys = [];
        for (var i = 0; i < json.length; i++) {
            let repoName = json[i].name;
            usersRepositorys.push({
                repo_name: repoName,
                repo_url: json[i].url,
                repo_language: json[i].language,
                repo_forks: json[i].forks,
                repo_watchers: json[i].watchers,
                repo_forked: json[i].fork,
                repo_language: json[i].language,
                repo_desc: json[i].description
            });
        }
        this.setState({
            repositorys: usersRepositorys,
        });
    }

    componentWillMount() {
        this.props.navigation.setParams({ addToFavourites: this._addUserToFavourites });
    }

    //Attempts to add the user to favourite list in firebase
    _addUserToFavourites = () => {

        //Show dialog input box to allow user to enter message about this developer
        this.setState({
            dialogIsVisible: true
        });

    }

    /**
     * Method is called once user finalizes request to favourite this user.
     * 
     */
    addedNewFavourite(message) {
        //unshow dialog box
        newUserObject = this.state.userObject['littleMessage'] = message;
        this.setState({
            dialogIsVisible: false,
            userObject:newUserObject
        })
        //add to firebase favourites list
        if (this.state.userObject) {
            addToFavourites(this.state.userObject);
        }
    }

    render() {
        return (
            <View>

                <ScrollView>
                    <Card>
                        <Avatar
                            medium
                            rounded
                            source={{ uri: this.state.userObject.avatar_url }}
                            activeOpacity={0.7}
                        // onPress={this.state.userObject.url}
                        />
                        <Text h1>{this.state.name}</Text>
                        <Text h1>{this.state.location}</Text>
                        <Text h1>{this.state.blog}</Text>
                        <Text style={{ marginBottom: 10 }}>
                            {this.state.bio}
                        </Text>
                        <Icon></Icon>
                    </Card>
                    <View>
                        {
                            this.state.repositorys.map((i, key) => (
                                <Card
                                    key={key}
                                    title={i.repo_name}
                                >
                                    <Text>{i.repo_desc}</Text>
                                    <Text>language used: {i.repo_language}</Text>
                                    <Text>Repo forked: {i.repo_forked == true ? "true" : "false"}</Text>
                                    <Text>Number of watchers: {i.repo_watchers}</Text>
                                </Card>
                            ))
                        }
                    </View>
                    <DialogInput isDialogVisible={this.state.dialogIsVisible}
                        title={"Adding To Favourites"}
                        message={"Feel free to leave a note along side this favourite"}
                        hintInput={"Javascript/AI guy"}
                        submitText={"Add"}
                        submitInput={(inputText) => { this.addedNewFavourite(inputText)}}
                        closeDialog={() => { this.setState({ dialogIsVisible: false }) }}>
                    </DialogInput>
                </ScrollView>

            </View>
        );
    }

}
