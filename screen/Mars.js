import React, {Component} from 'react';
import {Text,StyleSheet,View} from 'react-native';



class Mars extends Component
{

state = {
  temp:[],
  pres:[],
  wind:[],
  season:'',
  sol_keys:0,
}

  componentDidMount(){
    var url='https://api.nasa.gov/insight_weather/?api_key=mvIAWs1R9FXLxuUs7GKlknamPe8fL0ZnmbQGkzeX&feedtype=json&ver=1.0'

    fetch(url)
    .then(res => res.json())
    .then(resjsn => {
          this.setState({sol_keys:resjsn.sol_keys[5]})
          this.setState({temp:resjsn[this.state.sol_keys].AT});
          this.setState({pres:resjsn[this.state.sol_keys].PRE});
          this.setState({wind:resjsn[this.state.sol_keys].HWS});
          this.setState({season:resjsn[this.state.sol_keys].Season});
    })
  }


    render(){
        return(
          <View style={{height:'100%',width:'100%'}}>
            <View style={{height:'20%',width:'100%',backgroundColor:'rgba(0,0,0,0.8)',alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:'white',fontSize:12}}>Mars  Weather</Text>
            </View>

            <View style={{height:'80%',width:'100%',backgroundColor:'black'}}>
                <View style={styles.row}>
                      <View style={styles.col1}><Text style={styles.text}>temperature</Text></View>
                      <View style={styles.col}><Text style={styles.text} numberOfLines={1}>{this.state.temp.mn}(min)</Text></View>
                      <View style={styles.col}><Text style={styles.text} numberOfLines={1}>{this.state.temp.av}(avg)</Text></View>
                      <View style={styles.col}><Text style={styles.text} numberOfLines={1}>{this.state.temp.mx}(max)</Text></View>
                </View>

                <View style={styles.row}>
                      <View style={styles.col1}><Text style={styles.text}>pressure</Text></View>
                      <View style={styles.col}><Text style={styles.text} numberOfLines={1}>{this.state.pres.mn}</Text></View>
                      <View style={styles.col}><Text style={styles.text} numberOfLines={1}>{this.state.pres.av}</Text></View>
                      <View style={styles.col}><Text style={styles.text} numberOfLines={1}>{this.state.pres.mx}</Text></View>
                </View>
                <View style={styles.row}>
                      <View style={styles.col1}><Text style={styles.text}>wind speed</Text></View>
                      <View style={styles.col}><Text style={styles.text} numberOfLines={1}>{this.state.wind.mn}</Text></View>
                      <View style={styles.col}><Text style={styles.text} numberOfLines={1}>{this.state.wind.av}</Text></View>
                      <View style={styles.col}><Text style={styles.text} numberOfLines={1}>{this.state.wind.mx}</Text></View>
                </View>

                <View style={styles.season}><Text style={styles.text}>Season :    {this.state.season}</Text></View>
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({

row:{
  height:'25%',
  width:'100%',
  flexDirection:'row',
  marginBottom:1,
  justifyContent:'center',
},

col1:{
  height:'100%',
  width:'34%',
  backgroundColor:'orange',
  paddingLeft:5,
},

col:{
  height:'100%',
  width:'22%',
  borderLeftWidth:1,
  borderLeftColor:'gray',
  backgroundColor:'white',
  justifyContent:'center',
  alignItems:'center',
},

season:{
  height:'25%',
  width:'100%',
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:'white',
},

text:{
  fontSize:8,
  overflow:'hidden',
}

});

export default Mars;
