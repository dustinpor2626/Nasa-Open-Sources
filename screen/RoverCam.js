import React, {Component} from 'react';
import {AdMobBanner} from 'react-native-admob';

import {Text,ImageBackground,StyleSheet,View,TextInput,TouchableOpacity,Picker} from 'react-native';


class StudentDatabase extends Component{

  state = {
    sol:1000,
    selected_sol:1000,
    placeholder:'',
    rover:'curiosity',
    data:[],
  }


componentDidMount(){
  var url="https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1&camera=navcam&api_key=mvIAWs1R9FXLxuUs7GKlknamPe8fL0ZnmbQGkzeX";

  fetch(url)
  .then(res => res.json())
  .then(resjsn => this.setState({data:resjsn.photos}))
  .then(() => {
      this.setState({sol:this.state.data[0].rover.max_sol});
      this.setState({placeholder:this.state.sol.toString()});
  })


}

static navigationOptions = () => ({
  headerTitle : () => (<Text style={{fontSize:18,color:'white',paddingLeft:10,fontWeight:'bold'}}>Choose  Rover , Cam and Sols</Text>),
  headerStyle:{
    backgroundColor:'rgba(25,25,112,0.9)',
  },
})



select = (rovers,index) =>{

this.setState({rover:rovers});

  if(index == 0)
  var url="https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1&camera=navcam&api_key=mvIAWs1R9FXLxuUs7GKlknamPe8fL0ZnmbQGkzeX";
  if(index == 1)
  var url="https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?sol=1&camera=navcam&api_key=mvIAWs1R9FXLxuUs7GKlknamPe8fL0ZnmbQGkzeX";
  if(index ==2)
  var url="https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?sol=1&camera=navcam&api_key=mvIAWs1R9FXLxuUs7GKlknamPe8fL0ZnmbQGkzeX";


  fetch(url)
  .then(res => res.json())
  .then(resjsn => this.setState({data:resjsn.photos}))
  .then(() => {
    this.setState({sol:this.state.data[0].rover.max_sol});
    this.setState({placeholder:this.state.sol.toString()});
  })
}

  render(){
    return(
      <ImageBackground source={require('./images/space.jpg')} style={{height:'100%',width:'100%'}} blurRadius={1} >

      <View style={styles.container}>

      <View style={styles.header}>
          <Text style={{fontWeight:'bold',fontSize:15}}>Enter Sols : </Text>
          <TextInput
            style = {styles.text_input}
            placeholder = {"max -" + this.state.placeholder}
            maxLength = {4}
            keyboardType = 'numeric'
            textAlign = {'center'}
            onChangeText = {(Text) => this.setState({selected_sol:Text})}
          />

          <Picker
            selectedValue = {this.state.rover}
            style={{height:50,width:100,marginLeft:30}}
            onValueChange = {(rover,i) => this.select(rover,i)}
          >
            <Picker.Item label="Curiosity" value='curiosity' />
            <Picker.Item label="Opportunity" value='opportunity' />
            <Picker.Item label="Spirit" value='spirit' />
          </Picker>
      </View>

          <View style={styles.subcontainer}>

                <TouchableOpacity
                    style={styles.touchopacity}
                  onPress = {() => this.props.navigation.navigate('RoverImage',{
                                    rover:this.state.rover,
                                    sol:this.state.selected_sol,
                                    camera:'fhaz',
                                  })}>
                <View style={styles.camera}><Text style={styles.text}>FHAZ</Text></View>
              </TouchableOpacity>



                <TouchableOpacity
                    style={styles.touchopacity}
                    onPress = {() => this.props.navigation.navigate('RoverImage',{
                                      rover:this.state.rover,
                                      sol:this.state.selected_sol,
                                      camera:'rhaz',
                                    })}>
                <View style={styles.camera}><Text style={styles.text}>RHAZ</Text></View>
                </TouchableOpacity>

          </View>

          <View style={styles.subcontainer}>
                <TouchableOpacity
                    style={styles.touchopacity}
                    onPress = {() => this.props.navigation.navigate('RoverImage',{
                                      rover:this.state.rover,
                                      sol:this.state.selected_sol,
                                      camera:'mast',
                                    })}>
                <View style={styles.camera}><Text style={styles.text}>MAST</Text></View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.touchopacity}
                    onPress = {() => this.props.navigation.navigate('RoverImage',{
                                      rover:this.state.rover,
                                      sol:this.state.selected_sol,
                                      camera:'chemcam',
                                    })}>
                <View style={styles.camera}><Text style={styles.text}>CHEMCAM</Text></View>
                </TouchableOpacity>

          </View>

          <View style={styles.subcontainer}>
                <TouchableOpacity
                    style={styles.touchopacity}
                    onPress = {() => this.props.navigation.navigate('RoverImage',{
                                      rover:this.state.rover,
                                      sol:this.state.selected_sol,
                                      camera:'mahli',
                                    })}>
                <View style={styles.camera}><Text style={styles.text}>MAHLI</Text></View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.touchopacity}
                    onPress = {() => this.props.navigation.navigate('RoverImage',{
                                      rover:this.state.rover,
                                      sol:this.state.selected_sol,
                                      camera:'mardi',
                                    })}>
                <View style={styles.camera}><Text style={styles.text}>MARDI</Text></View>
                </TouchableOpacity>

          </View>

          <View style={styles.subcontainer}>
                <TouchableOpacity
                    style={styles.touchopacity}
                    onPress = {() => this.props.navigation.navigate('RoverImage',{
                                      rover:this.state.rover,
                                      sol:this.state.selected_sol,
                                      camera:'navcam',
                                    })}>
                    <View style={styles.camera}><Text style={styles.text}>NAVCAM</Text></View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.touchopacity}
                    onPress = {() => this.props.navigation.navigate('RoverImage',{
                                      rover:this.state.rover,
                                      sol:this.state.selected_sol,
                                      camera:'pancam',
                                    })}>
                  <View style={styles.camera}><Text style={styles.text}>PANCAM</Text></View>
                </TouchableOpacity>

          </View>

          <View style={styles.subcontainer}>
            <TouchableOpacity
                style={styles.touchopacity}
              onPress = {() => this.props.navigation.navigate('RoverImage',{
                                rover:this.state.rover,
                                sol:this.state.selected_sol,
                                camera:'minites',
                              })}>
            <View style={styles.camera}><Text style={styles.text}>MINITES</Text></View>
            </TouchableOpacity>

          </View>

              
    <AdMobBanner
  adSize="fullBanner"
  adUnitID="ca-app-pub-1889245236113302/2236742069"
  testDevices={[AdMobBanner.simulatorId]}
  onAdFailedToLoad={error => console.error(error)}
/>

      </View>
      </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({

camera:{
  height:'45%',
  width:'100%',
  backgroundColor:'black',
  borderRadius:10,
  borderColor:'white',
  borderWidth:2,
  marginLeft:15,
  marginRight:15,
  paddingLeft:5,
  paddingRight:5,
  alignItems:'center',
  justifyContent:'center'
},

container:{
  height:'100%',
  width:'100%',
  paddingBottom:30,
  alignItems:'center',
},

subcontainer:{
  flexDirection:'row',
  height:'15%',
  width:'100%',
  justifyContent:'center',
  alignItems:'center',
},

text_input:{
    borderBottomWidth:1,
    borderColor:'green',
    width:80,
    borderRadius:5,
    color:'black',
    marginRight:15,
},

text:{
  color:'white',

},

touchopacity:{
  marginRight:15,
  marginLeft:15,
},

header:{
  height:'15%',
  width:'100%',
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'center',
  backgroundColor:'rgb(230,230,250)',
  borderBottomWidth:1,
  borderBottomColor:'white',
  elevation:2,
}

});

export default StudentDatabase;
