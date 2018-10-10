import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { auth} from '../config/fire';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';

const INITIAL_STATE = {
  email: '',
  password: ''
}

export default class signIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...INITIAL_STATE
    };
  }

  signUpUser() {
    Actions.signup()
  }

  loginUser = (email, password) => {
    try {
      auth.signInWithEmailAndPassword(email, password)
        .then(function (user) {
          Actions.home()
          console.log(user)
        })
        .catch(error => {
          switch (error.code) {
            case "auth/user-disabled":
              Alert.alert("The user corresponding to the given email has been disabled. ")
              break;

            case "auth/invalid-email":
              Alert.alert("The email address is not valid.")
              break;

            case "auth/user-not-found":
              Alert.alert("There is no user corresponding to the given email.")
              break;

            case "auth/wrong-password":
              Alert.alert("The password is invalid for the given email," +
                " or the account corresponding to the email does not have a password set.")
              break;
          }
        })
    } catch (error) {
    }
  }
  render() {
    const {
      email,
      password
    } = this.state

    const isInvalid =
      email === '' ||
      password === '';

    return (
      console.log('RENDER'),
      <Container style={styles.container}>
        <Form>
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
              style={{ flex: 1 }}
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(password) => this.setState({ password })}
              onSubmitEditing={() => this.loginUser(this.state.email, this.state.password)}
            />
          </Item>
          <Button style={{ marginTop: 10 }}
            disabled={isInvalid}
            full
            rounded
            success
            onPress={() => this.loginUser(this.state.email, this.state.password)}
          >
            <Text style={{ color: 'white' }}>Login</Text>
          </Button>
          <Button style={{ marginTop: 10 }}
            full
            rounded
            primary
            onPress={() => this.signUpUser(this.state.email, this.state.password)}
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
});
