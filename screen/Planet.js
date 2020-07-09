import React, {Component} from 'react';
import {Text,ImageBackground,StyleSheet,View,Image,ScrollView} from 'react-native';
import {AdMobBanner} from 'react-native-admob';


class Planet extends Component
{

  state = {

    uri:require('./images/naptune.jpeg'),
    data:[],
    moons:0,
  }

componentDidMount(){

var img = this.props.navigation.state.params.Planet ;

  if(img == 'terre')
    this.setState({uri:require('./images/terre.jpeg')});
    else if(img == 'mercure')
      this.setState({uri:require('./images/mercure.jpeg')});
      else if(img == 'venus')
        this.setState({uri:require('./images/venus.jpeg')});
        else if(img == 'soleil')
          this.setState({uri:require('./images/soleil.jpeg')});
          else if(img == 'mars')
            this.setState({uri:require('./images/mars.jpeg')});
            else if(img == 'saturne')
              this.setState({uri:require('./images/saturne.jpeg')});
              else if(img == 'naptune')
                this.setState({uri:require('./images/naptune.jpeg')});
                else if(img == 'pluton')
                  this.setState({uri:require('./images/pluton.jpeg')});
                  else if(img == 'lune')
                    this.setState({uri:require('./images/lune.jpeg')});
                    else if(img == 'jupiter')
                      this.setState({uri:require('./images/jupiter.jpeg')});


  var url = 'https://api.le-systeme-solaire.net/rest/bodies/' + this.props.navigation.state.params.Planet ;

  fetch(url)
  .then(res => res.json())
  .then(resjsn => {this.setState({data:resjsn});
                      if(resjsn.moons != null)
                        this.setState({moons:resjsn.moons.length});
                  })
}



static navigationOptions = () => ({
  headerTitle : () => (<Text style={{fontSize:20,color:'white',paddingLeft:10,fontWeight:'bold'}}>Info</Text>),
  headerStyle:{
    backgroundColor:'rgba(25,25,112,0.9)',
  },
})



    render(){
        return(
          <ImageBackground source={require('./images/space3.png')} style={styles.img_background} >

          <ScrollView style={styles.scroll}>

              <View style={styles.img_container}>
              <Image source={this.state.uri} style={{width:'100%',height:'100%',resizeMode:'cover'}}/>
              </View>

                      <View style={styles.content}>

                          <View style={styles.text_container}><Text style={styles.text}>{this.state.data.englishName}</Text></View>
                          <View style={styles.text_container}><Text style={styles.text}>Semimajor Axis : {this.state.data.semimajorAxis} km</Text></View>
                          <View style={styles.text_container}><Text style={styles.text}>Perihelion : {this.state.data.perihelion} km</Text></View>
                          <View style={styles.text_container}><Text style={styles.text}>Aphelion : {this.state.data.aphelion} km</Text></View>
                          <View style={styles.text_container}><Text style={styles.text}>Eccentricity : {this.state.data.eccentricity}</Text></View>
                          <View style={styles.text_container}><Text style={styles.text}>Inclination : {this.state.data.inclination} deg</Text></View>
                          <View style={styles.text_container}><Text style={styles.text}>Density : {this.state.data.density} g/cm3</Text></View>
                          <View style={styles.text_container}><Text style={styles.text}>Gravity : {this.state.data.gravity} m/s2</Text></View>
                          <View style={styles.text_container}><Text style={styles.text}>Escape Velocity : {this.state.data.escape} m/s</Text></View>
                          <View style={styles.text_container}><Text style={styles.text}>Equatorial Radius : {this.state.data.equaRadius} km</Text></View>
                          <View style={styles.text_container}><Text style={styles.text}>Polar Radius : {this.state.data.polarRadius} km</Text></View>
                          <View style={styles.text_container}><Text style={styles.text}>Sideral Orbit : {this.state.data.sideralOrbit} earth day</Text></View>
                          <View style={styles.text_container}><Text style={styles.text}>Sideral Rotation : {this.state.data.sideralRotation} earth hour</Text></View>
                          <View style={styles.text_container}><Text style={styles.text}>Discovered By : {this.state.data.discoveredBy}</Text></View>
                          <View style={styles.text_container}><Text style={styles.text}>Discovery Date : {this.state.data.discoveryDate}</Text></View>
                          <View style={styles.text_container}><Text style={styles.text}>Number Of Moons : {this.state.moons}</Text></View>
                      </View>

          </ScrollView>

 <AdMobBanner
  adSize="fullBanner"
  adUnitID="ca-app-pub-1889245236113302/2236742069"
  testDevices={[AdMobBanner.simulatorId]}
  onAdFailedToLoad={error => console.error(error)}
/>
          </ImageBackground>

        );
    }
}

const styles = StyleSheet.create({

scroll:{
  width:'100%',
},

img_container:{
  height:250,
  width:'100%',
  elevation:2,
  alignItems:'center',
  borderWidth:2,
  borderColor:'white',
  marginTop:5,
  marginBottom:2,
},

content:{
  height:'auto',
  width:'100%',
  alignItems:'center',
  paddingBottom:15,
},

img_background:{
  height:'100%',
  width:'100%',
},

text_container:{
height:50,
backgroundColor:'black',
justifyContent:'center',
alignItems:'center',
marginBottom:2,
paddingRight:40,
paddingLeft:40,
borderRadius:25,
},

text:{
color:'white',
},

});

export default Planet;
