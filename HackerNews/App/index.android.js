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

class HackNews extends Component {

    constructor(){
        super();
    }

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
                renderScene={this.navigatorRenderScene}
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
                return (<Dashboard navigator={navigator}/>);
            case 'Web':
                return (<Dashboard navigator={navigator}/>);
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
