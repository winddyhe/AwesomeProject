'use strict'

import React, {
    Component,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
    StatusBar,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class CustomTabBar extends Component {
    selectedTabIcons: [],
    unselectedTabIcons: [],

    PropTypes: {
        goToPage: React.PropTypes.func,
        activeTab: React.PropTypes.number,
        tabs: React.PropTypes.array,
    },

    componentDidMount() {
        this.setAnimationValue({ value: this.props.activeTab });
        this._listener = this.props.scrollValue.addListener(tis.setAnimationValue);
    }

    setAnimationValue({value}){
        var currentPage = this.props.activeTab;
    
        this.unselectedTabIcons.forEach((icon, i)=>{
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
            width: containerWidth / numberOfTabs;
            height: 3,
            backgroundColor: '#FF6600',
            bottom: 0,
        };

        var left = this.props.srcollValue.interpolate({
            inputRange: [0, 1], outputRange: [0, containerWidth / numberOfTabs]
        });

        return (
            <View>
                <StatusBar backgroundColor={'#d25500'} />
                <View style={styles.separator}/>
                <View style={styles.tabs}>
                    {this.props.tabs.map((tab, i)=>{ this.renderTabOption(tab, i) })}
                </View>
                <Animated.View style={[tabUnderLineStyle, {left}]}/>
            </View> 
        );
    }

    renderTabOption(valsString, page){
        var vals = valsString.split('!$#');
        var isTabActive = this.props.activeTab === page;
        return (
            <TouchableOpacity key = {valsString}
                              onPress={()=>{this.props.goToPage(page)}}
                              style={styles.tab}>
                <Icon name={vals[1]}
                      size={vals[parseInt(vals[2])]}
                      color={'gray'} 
                />
                <Text style={styles.labelText}>
                    {vals[0]}
                </Text>
            </TouchableOpacity>
        );
    }
};

var styles = StyleSheet.create({
    tab:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBattom: 6,
    },
    tabs:{
        height: 45,
        flexDirection: 'row',
        paddingTop: 5,
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomColor: 'rgba(0, 0, 0, 0.05)',
    },
    icon: {
        width: 30,
        height: 30,
        position: 'absolute',
        top: 0,
        left: 20,
    },
    labelText:{
        fontSize: 8,
    },
    separator:{
        height: 0.5,
        backgroundColor:'gray',
    }
});

export default CustomTabBar;