import React from 'react';
import { StyleSheet, Text, View, NativeModules, Alert } from 'react-native';
import { auth, db, strg } from '../config/fire';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
const username = '';
export default class home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: ''
        };
    }
    componentDidMount() {
        this.authListener();
        var userId = auth.currentUser.uid;
        const ref = db.ref('users')
        ref.on('value', gotData, errData);

        function gotData(data) {
            var users = data.val();
            var keys = Object.keys(users);
            console.log(keys);
            for (var i = 0; i < keys.length; i++) {
                var k = keys[i];
                if (k === userId) {
                    username = users[k].username;
                    var email = users[k].email;
                    console.log(email, username)
                    Alert.alert(username, email)
                }
            }
        }

        function errData(err) {
            console.log('Error!');
            console.log(err);
        }
    }

    authListener() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
            } else {
                this.setState({ user: null });
            }
        })
    }

    import() {
        var metadata = {
            contentType: 'image/jpeg',
        };
        const storageRef = strg.ref('uid/' + metadata);
        // Upload the file and metadata
        storageRef.child('images/mountains.jpg').put(file, metadata);
    }

    export() {
        // const uploader = document.getElementById('uploader');
        const fileButton = document.getElementById();
        if (fileButton !== null) {
            fileButton.addEventListener('change', function (e) {
                const file = e.target.files[0];
                const storageRef = strg.ref('uid/' + file.name);
                storageRef.put(file);
            })
        }
    }

    signOut() {
        auth.signOut().then(function () {
            Actions.signin()
        }).catch(function (error) {
        });
    }

    render() {

        return (
            console.log(username),
            <Container style={styles.container}>
                <Form>
                    <Text style={{ color: 'red' }}>{username}</Text>
                    <Button style={{ marginTop: 10 }}
                        full
                        rounded
                        primary
                        onPress={() => this.import()}
                    >
                        <Text style={{ color: 'white' }}>Import</Text>
                    </Button>
                    <Input type="file" onPress={this.import} ></Input>
                    <Button style={{ marginTop: 10 }}
                        full
                        rounded
                        primary
                        onPress={() => this.export()}
                    >
                        <Text style={{ color: 'white' }}>Export</Text>
                    </Button>

                    <Button style={{ marginTop: 10 }}
                        full
                        rounded
                        primary
                        onPress={() => this.signOut()}
                    >
                        <Text style={{ color: 'white' }}>SignOut</Text>
                    </Button>
                </Form>
            </Container>
        );

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 10
    },
});

