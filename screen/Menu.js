import React, {Component} from 'react';

import {Text,ImageBackground,StyleSheet,View,Image} from 'react-native';



class Menu extends Component
{

  state = {
    name:this.props.name,
    img:require('./images/rover.jpeg'),
  }

componentDidMount(){

  var name = this.props.name;

  if(name == 'Air Purity')
    this.setState({img:require('./images/air.jpeg')});

}

    render(){
        return(

                <View style={{height:'100%',width:'100%',flexDirection:'row',alignItems:'center'}}>
                    <View style={styles.img}>
                        <Image source={this.state.img} style={{height:'100%',width:'100%',resizeMode:'cover'}} />
                    </View>

                    <View style={styles.text}><Text>{this.state.name}</Text></View>
                </View>

        );
    }
}

const styles = StyleSheet.create({

img:{
  height:'45%',
  width:'12%',
  backgroundColor:'blue',
  marginLeft:17,
  marginRight:10,
  borderRadius:5,
  borderWidth:1,
  borderColor:'white',
  overflow:'hidden',
},

});

export default Menu;
