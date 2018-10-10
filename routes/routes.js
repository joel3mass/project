import React, { Component } from 'react';
import { Router, Stack, Scene, CustomNavBar, Actions } from 'react-native-router-flux';
import signUp from '../component/signup';
import home from '../component/home';
import signIn from '../component/signin';

export default class Routes extends Component {

    render() {
        return (
            <Router>
                <Stack key="root" hideNavBar={false} headerLayoutPreset="center">
                    <Scene key="signin" component={signIn} title="MEMOSIM" initial={true} />
                    <Scene key="home" component={home} title="Welcome" />
                    <Scene key="signup" component={signUp} title="Register" onBack />
                </Stack>
            </Router>
        )
    }
}