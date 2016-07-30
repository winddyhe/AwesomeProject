import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Navigator,
    View,
    WebView,
    BackAndroid
} from 'react-native';


import Dashboard from './Views/Dashboard/index.android.js';
import Post from './Views/Post/index.android.js';

import ToolbarAndroid from 'ToolbarAndroid';
import Icon from 'react-native-vector-icons/FontAwesome';


class HackNews extends Component {

    componentDidMount() {
        var navigator = HackNews._navigator;
        BackAndroid.addEventListener('hardwareBackPress', () => {
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
                return (<Post navigator={navigator}
                              title={router.title}
                              post={router.post}/>);
            case 'Web':
                return (
                    <View style={{flex:1}}>
                        <ToolbarAndroid style={styles.toolbar}
                                        title={router.title}
                                        navIcon={{uri: "ic_arrow_back_white_24dp", isStatic: true}}
                                        onIconClicked={navigator.pop}
                                        titleColor={'#FFFFFF'}/>
                        <WebView source={{uri: router.url}}
                                 javaScriptEnabledAndroid={true}/>
                    </View>
                );
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
