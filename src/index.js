import React, { Component } from 'react';
import { Text,
    FlatList,
    Image,
    StyleSheet,
    Dimensions,
    View,
    ScrollView,
    TextInput
} from 'react-native';


import Swiper from 'react-native-swiper'

var { width, height } = Dimensions.get('window');

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataBanner : []
        };
    }

    componentDidMount = () => {
      const url = "https://tutofox.com/foodapp/api.json"
      return fetch(url).then(res => res.json())
      .then(resJson => {
          this.setState({
              isLoading : false,
              dataBanner : resJson.banner
          })
      })
      .catch(err => {
          console.log(err)
      })
     };
    

    render() {
        return (
            <ScrollView>
                <View style={{ flex: 1,backgroundColor:"#f2f2f2" }}>
                <View style={{width: width, alignItems:'center'}} >
                    <Image style={{height:60,width:width/2,margin:10 }} resizeMode="contain" source={require("./image/foodapp.png")}  />
                    <Swiper style={{height:width/2}}  showsButtons={false} autoplay={true} autoplayTimeout={2}>
                        {
                        this.state.dataBanner.map((itemBanner, index)=>{
                            return(
                            <Image style={styles.imageBanner} resizeMode="contain" source={{uri:itemBanner}} key={index}/>
                            )
                        })
                        }
                    </Swiper>
                    <View style={{height:20}} />
                </View>
                </View>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    imageBanner: {
      height:width/2,
      width:width-40,
      borderRadius:10,
      marginHorizontal:20
    }, 
  });