
import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
    StatusBar,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class CustomTabBar extends Component {

    constructor(props) {
        super(props);
        // this.selectedTabIcons = [];
        // this.unselectedTabIcons = [];
    }

    propTypes: {
        goToPage: React.PropTypes.func,
        activeTab: React.PropTypes.number,
        tabs: React.PropTypes.array,
    }

    componentDidMount() {
        //this.setAnimationValue({ value: this.props.activeTab });
        this.props.scrollValue.addListener(this.setAnimationValue);
    }

    setAnimationValue({value}){
        var currentPage = this.activeTab;

        console.log('-----------------', CustomTabBar.unselectedTabIcons);
        CustomTabBar.unselectedTabIcons.forEach((icon, i)=>{
            var iconRef = icon;
            if (!icon.setNativeProps && icon !== null){
                iconRef = icon.refs.icon_image;
            }

            if (value - i >= 0 && value - i <= 1){
                iconRef.setNativeProps({opacity: value - i});
            }
            if (i - value >= 0 && i - value <= 1){
                iconRef.setNativeProps({opacity: i - value});
            }
        });
    }
    
    render() {
        var containerWidth = this.props.containerWidth;
        var numberOfTabs = this.props.tabs.length;
        var tabUnderLineStyle = {
            position: 'absolute',
            width: containerWidth / numberOfTabs,
            height: 3,
            backgroundColor: '#FF6600',
            bottom: 0,
        };

        var left = this.props.scrollValue.interpolate({
            inputRange: [0, 1], outputRange: [0, containerWidth / numberOfTabs]
        });

        return (
            <View>
                <StatusBar backgroundColor={'#d25500'} />
                <View style={styles.separator}/>
                <View style={styles.tabs}>
                    {this.props.tabs.map((tab, i)=> this.renderTabOption(tab, i) )}
                </View>
                <Animated.View style={[tabUnderLineStyle, {left}]} />
            </View> 
        );
    }

    renderTabOption(valsString, page){
        var vals = valsString.split('!$#');
        var isTabActive = this.props.activeTab === page;
        const color = isTabActive ? "#6B8E23" : "#ADADAD";
        return (
            <TouchableOpacity key = {valsString} onPress={()=>this.props.goToPage(page)} style={styles.tab}>
                <View style={styles.tabItem}>
                    <Icon name={vals[1]}
                        size={parseInt(vals[2])}
                        color={color}
                    />
                    <Text style={styles.labelText}>
                        {vals[0]}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
};

CustomTabBar.unselectedTabIcons = [];

var styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 6,
    },
    tabs: {
        height: 60,
        flexDirection: 'row',
        paddingTop: 5,
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    icon: {
        width: 50,
        height: 50,
        position: 'absolute',
        top: 0,
        left: 20,
    },
    labelText: {
        fontSize:12,
    },
    separator: {
        height: 0.5,
        backgroundColor: 'gray'
    },
    tabItem: {
		flexDirection: 'column',
		alignItems: 'center',
	},
});

export default CustomTabBar;