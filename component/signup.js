import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { auth, db } from '../config/fire';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';



const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: ''
}
function writeUserData(userId, name, email) {
    db.ref('users/' + userId).set({
        email: email,
        username: name
    });
}

export default class signUp extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            ...INITIAL_STATE
        };
    }

    signUpUser = (email, passwordOne) => {
        try {
            if (this.state.passwordOne.length < 6) {
                alert("Please enter atleast 6 characters")
                return;
            }
            auth.createUserWithEmailAndPassword(email, passwordOne)
                .then(authUser => {
                    writeUserData(authUser.user.uid, this.state.username, email)
                })
            Actions.pop()
                .catch(error => {
                    switch (error.code) {
                        case "auth/email-already-in-use":
                            Alert.alert("There already exists an account with the given email address.")
                            break;

                        case "auth/invalid-email":
                            Alert.alert("The email address is not valid.")
                            break;

                        case "auth/operation-not-allowed":
                            Alert.alert("Thrown if email/password accounts are not enabled. " +
                                "Enable email/password accounts in the Firebase Console, under the Auth tab.")
                            break;

                        case "auth/weak-password":
                            Alert.alert("Thrown if the password is not strong enough.")
                            break;
                    }
                })
        } catch (error) {
            console.log(error.toString())
        }
    }


    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
        } = this.state

        const isInvalid =
            passwordOne !== passwordTwo ||
            username === '' ||
            email === '';
        return (

            <Container style={styles.container}>
                <Form>
                    <Item floatingLabel>
                        <Label>Username</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(username) => this.setState({ username })}
                        />
                    </Item>

                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            onChangeText={(email) => this.setState({ email })}
                        />
                    </Item>

                    <Item floatingLabel>
                        <Label>Password</Label>
                        <Input
                            secureTextEntry={true}
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(passwordOne) => this.setState({ passwordOne })}
                        />
                    </Item>

                    <Item floatingLabel>
                        <Label>Repeat Password</Label>
                        <Input
                            secureTextEntry={true}
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(passwordTwo) => this.setState({ passwordTwo })}
                            onSubmitEditing={() => this.signUpUser(this.state.email, this.state.passwordOne)}
                        />
                    </Item>

                    <Button style={{ marginTop: 10 }}
                        disabled={isInvalid}
                        full
                        rounded
                        primary
                        onPress={() => this.signUpUser(this.state.email, this.state.passwordOne)}
                    >
                        <Text style={{ color: 'white' }}>Sign Up</Text>
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
    signupTextCont: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingVertical: 16,
        flexDirection: 'row'
    },
    signupText: {
        color: 'black',
        fontSize: 16
    },
    signupButton: {
        color: 'red',
        fontSize: 18,
        fontWeight: '500'
    }
});

