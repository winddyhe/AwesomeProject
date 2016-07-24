'use strict'

import React, {
    AppRegistry,
    StyleSheet,
    Component,
    Navigator,
    View,
    WebView,
    BackAndroid
} from 'react-native';

//import ToolbarAndroid from 'ToolbarAndroid';


class HackNews extends Component {

    componentDidMount() {
        var navigator = this._navigator;
        BackAndroid.addEventListener('hardwareBackPress', () => {
            if (_navigator.getCurrentRoutes().Length === 1) {
                return false;
            }
            _navigator.pop();
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
        this._navigator = navigator;
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

module.exports = HackNews;
