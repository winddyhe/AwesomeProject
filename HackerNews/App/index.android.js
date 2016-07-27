import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Navigator,
    View,
    WebView,
    BackAndroid
} from 'react-native';

//import ToolbarAndroid from 'ToolbarAndroid';

import Dashboard from './Views/Dashboard/index.android.js';

import Icon from 'react-native-vector-icons/FontAwesome';


class HackNews extends Component {

    componentDidMount() {
        var navigator = HackNews._navigator;
        BackAndroid.addEventListener('hardwareBackPress', () => {
            console.log("------------", navigator.getCurrentRoutes().Length);
            if (navigator.getCurrentRoutes().Length === 1) {
                return false;
            }
            navigator.pop();
            return true;
        });
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress');
    }

    render() {
        return (
            <Navigator
                style={styles.container}
                tintColor='#FF6600'
                initialRoute={{ id: 'Dashboard' }}
                renderScene={this.navigatorRenderScene.bind(this)}
                />
        );
    }

    navigatorRenderScene(router, navigator) {
        var Component = null;
        HackNews._navigator = navigator;
        switch (router.id) {
            case 'Dashboard':
                return (<Dashboard navigator={navigator}/>);
            case 'Post':
                return null;
            case 'Web':
                return null;
        }
    }
};

HackNews._navigator = null;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F6EF',
    },
    toolbar: {
        height: 56,
        backgroundColor: '#FF6600',
    }
});

export default HackNews;
