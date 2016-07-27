'use strict'

import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';

import ToolbarAndroid from 'ToolbarAndroid';
import TabBar from '../../Components/TabBar/index.js';
import RefreshableListView from '../../Components/RefreshableListView/index.js';
var api = require('../../Network/api.js');

class Dashboard extends Component {

    constructor(props){
        super(props);
        this.state = {
            topStroyIDs: null,
            lastIndex: 0,
        };
    }

    render() {
        return (
            <TabBar _structure={[
            {
                title: 'Ask HN',
                iconName: 'comment',
                renderContent: () => {
                    return (
                    <View style={{flex:1}}>
                        <ToolbarAndroid style={styles.toolBar}
                                        title={'Ask HN'}
                                        titleColor={'#FFFFFF'}/>
                        <RefreshableListView renderRow={(row)=> this.renderListViewRow(row, 'Ask Stroy')}
                                             _onRefresh={(page, callback)=>this.listViewOnRefresh(page, callback, api.HN_ASK_STORIES_ENDPOINT)}
                                             backgroundColor={'#F6F6EF'}/>
                    </View>
                );}
            },
	        {
                title: 'Show HN',
                iconName: 'eye',
                renderContent: () => {
                    return(
                    <View style={{flex:1}}>
                        <ToolbarAndroid style={styles.toolBar}
                                        title={'Show HN'}
                                        titleColor={'#FFFFFF'}/>
	                    <RefreshableListView renderRow={(row)=>this.renderListViewRow(row, 'Show Story')}
                                             _onRefresh={(page, callback)=>this.listViewOnRefresh(page, callback, api.HN_SHOW_STORIES_ENDPOINT)}
                                             backgroundColor={'#F6F6EF'}/>
                    </View>
                );}
            },
	        {
                title: 'Front Page',
                iconName: 'star',
                renderContent: () => {
                    return(
                    <View style={{flex:1}}>
                        <ToolbarAndroid style={styles.toolBar}
                                        title={'Top Stories'}
                                        titleColor={'#FFFFFF'}/>
	                    <RefreshableListView renderRow={(row)=>this.renderListViewRow(row, 'Top Story')}
                        	                 _onRefresh={(page, callback)=>this.listViewOnRefresh(page, callback, api.HN_TOP_STORIES_ENDPOINT)}
                                             backgroundColor={'#F6F6EF'}/>
	                </View>
                );}
            },
	        {
                title: 'New',
                iconName: 'level-up',
                renderContent: () => {
                    return(
                    <View style={{flex:1}}>
                        <ToolbarAndroid style={styles.toolBar}
                        	            title={'New Stories'}
                                        titleColor={'#FFFFFF'}/>
	                    <RefreshableListView renderRow={(row)=>this.renderListViewRow(row, 'New Story')}
                                             _onRefresh={(page, callback)=>this.listViewOnRefresh(page, callback, api.HN_NEW_STORIES_ENDPOINT)}
                                             backgroundColor={'#F6F6EF'}/>
                    </View>
                );}
            },
            {
	            title: 'Jobs',
                iconName: 'suitcase',
                renderContent: () => {
                    return(
                    <View style={{flex:1}}>
                        <ToolbarAndroid style={styles.toolBar}
                                        title={'Jobs'}
                                        titleColor={'#FFFFFF'}/>
	                    <RefreshableListView renderRow={(row)=>this.renderListViewRow(row, 'Job Post')}
                        	                 _onRefresh={(page, callback)=>this.listViewOnRefresh(page, callback, api.HN_JOB_STORIES_ENDPOINT)}
                                             backgroundColor={'#F6F6EF'}/>
	                </View>
                );}
            },
            ]}
            _selectedTab={2}
            activeTintColor={'#FF8533'}
            iconSize={20}
            />
        );
    }

    renderListViewRow(row, pushNavBarTitle) {
        return (
            <TouchableHighlight underlayColor={'#f3f3f2'}
                                onPress={()=>this.selectRow(row, pushNavBarTitle)}>
                <View style={styles,rowContainer}>
                    <Text style={styles.rowCount}>
                        {row.count}
                    </Text>
                    <View style={style.rowDetailsContainer}>
                        <Text style={styles.rowTitle}>
                            {row.title}
                        </Text>
                        <Text style={styles.rowDetailsLine}>
                            Posted by {row.by} | {row.score} Points | { row.descendants } Comments
                        </Text>
                        <View style={styles.separator}/>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    listViewOnRefresh(page, callback, api_endpoint) {
        if (page != 1 && this.state.topStroyIDs) {
            this.fetchStoriesUsingTopStoryIDs(this.state.topStroyIDs, this.state.lastIndex, 5, callback);
        } else {
            fetch(api_endpoint)
                .then((response) => response.json())
                .then((topStoryIDs) => {
                    this.fetchStoriesUsingTopStoryIDs(topStoryIDs, 0, 12, callback);
                    this.setState({ topStoryIDs: topStoryIDs });
                })
                .done();
        }
    }

    fetchStoriesUsingTopStoryIDs(topStroyIDs, startIndex, amountToAdd, callback) {
        var rowsData = [];
        var endIndex = (startIndex + amountToAdd) < topStroyIDs.length ? (startIndex + amountToAdd) : topStroyIDs.length;

        function iterateAndFetch(){
            if (startInde < endIndex){
	            fetch(api.HN_ITEM_ENDPOINT+topStoryIDs[startIndex]+".json")
                .then((response) => response.json())
                .then((topStory) => {
                    topStory.count = startIndex+1;
                    rowsData.push(topStory);
                    startIndex++;
                    iterateAndFetch();
                })
                .done();
            } else {
                callback(rowsData);
                return;
            }
        }
        iterateAndFetch();
        this.setState({lastIndex: endIndex});
    }

    selectRow(row, pushNavBarTitle){
        this.props.navigator.push({
            id: 'Post',
            title: pushNavBarTitle + ' #' + row.count,
            post: row,
        });
    }
}

var styles = StyleSheet.create({
    container: {
        flex:1,
    },
    toolBar:{
        height: 56,
        backgroundColor:'#FF6600'
    },
    rowContainer:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
    },
    rowCount:{
        fontSize: 20,
        textAlign:'right',
        color:'gray',
        margin:10,
        marginLeft:15,
    },
    rowDetailsContainer:{
        flex:1,
    },
    rowTitle:{
        fontSize:15,
        textAlign:'left',
        marginTop:10,
        marginBottom:4,
        marginRight:10,
        color:'#FF6600',
    },
    rowDetailsLine:{
        fontSize: 12,
        marginBottom: 10,
        color: 'gray',
    },
    separator:{
        height:1,
        backgroundColor: '#CCCCCC'
    }
});

export default Dashboard;