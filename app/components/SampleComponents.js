'use strict'

import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  ListView
} from 'react-native';

class Bananas extends Component {
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <Image source={pic} style={{ width: 193, height: 110 }}/>
    );
  }
}

class Blink extends Component{
  constructor(props){
    super(props);
    this.state = { showText: true };

    setInterval(()=>{
      this.setState({ showText: !this.state.showText });
    }, 1000);
  }
  render(){
    let display = this.state.showText ? this.props.text : ' ';
    return (<Text style={styles.bigblue}>{display}</Text>);
  }
}

class PizzaTranslator extends Component{
  constructor(props){
    super(props);
    this.state = { text: '' };
  }

  render(){
    return (
      <View style={{padding:10}}>
        <TextInput 
          style={{height:40}} 
          placeholder="Type here to translate!"
          onChangeText={(text)=>{ this.setState({text}) }}
        />
        <Text style={{padding: 10, fontSize: 42, width:400, height:50}}>
          { this.state.text.split(' ').map((word) => word && '🍕').join(' ') }
        </Text>
      </View>
    );
  }
}

class IScrolledDownAndWhatHappenedNextShockedMe extends Component {
  render() {
      return(
        <ScrollView>
          <Text style={{fontSize:36}}>Scroll me plz</Text>
          <Image source={require('./img/favicon.png')} />
          <Image source={require('./img/favicon.png')} />
          <Image source={require('./img/favicon.png')} />
          <Image source={require('./img/favicon.png')} />
          <Image source={require('./img/favicon.png')} />
          <Text style={{fontSize:36}}>If you like</Text>
          <Image source={require('./img/favicon.png')} />
          <Image source={require('./img/favicon.png')} />
          <Image source={require('./img/favicon.png')} />
          <Image source={require('./img/favicon.png')} />
          <Image source={require('./img/favicon.png')} />
          <Text style={{fontSize:36}}>Scrolling down</Text>
          <Image source={require('./img/favicon.png')} />
          <Image source={require('./img/favicon.png')} />
          <Image source={require('./img/favicon.png')} />
          <Image source={require('./img/favicon.png')} />
          <Image source={require('./img/favicon.png')} />
          <Text style={{fontSize:36}}>'What\'s the best'</Text>
          <Image source={require('./img/favicon.png')} />
          <Image source={require('./img/favicon.png')} />
          <Image source={require('./img/favicon.png')} />
          <Image source={require('./img/favicon.png')} />
          <Image source={require('./img/favicon.png')} />
          <Text style={{fontSize:36}}>Framework around?</Text>
          <Image source={require('./img/favicon.png')} />
          <Image source={require('./img/favicon.png')} />
          <Image source={require('./img/favicon.png')} />
          <Image source={require('./img/favicon.png')} />
          <Image source={require('./img/favicon.png')} />
          <Text style={{fontSize:30}}>React Native</Text>
        </ScrollView>
    );
  }
}

class ListViewBasics extends Component{
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged:(r1, r2)=> r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
      ])
    };
  }
  render() {
    return (
      <View style={{paddingTop: 22}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData)=><Text>{rowData}</Text>} 
        />
      </View>
    );
  }
}

class SampleComponentsTest extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Shake or press menu button for dev menu
        </Text>
        <Blink text='I love to blink' />
        <Blink text='Yes blinking is so great' />
        <Blink text='Why did they ever take this out of HTML' />
        <Blink text='Look at me look at me look at me' />
        <Bananas />
        <PizzaTranslator />
        <IScrolledDownAndWhatHappenedNextShockedMe />
        <ListViewBasics />
        <View style={{flex: 1, flexDirection: 'column', alignItems:'center'}}>
          <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}}/>
          <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}}/>
          <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  bigblue:{
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30
  }
});

module.exports = SampleComponentsTest;