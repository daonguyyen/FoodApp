import React, { Component } from 'react';
import { Text,
    FlatList,
    Image,
    StyleSheet,
    Dimensions,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity
} from 'react-native';


import Swiper from 'react-native-swiper'

var { width, height } = Dimensions.get('window');

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataBanner : [],
            dataCategories : [],
            selectCatg : 0,
            dataFood : []
        };
    }

    componentDidMount = () => {
      const url = "https://tutofox.com/foodapp/api.json"
      return fetch(url).then(res => res.json())
      .then(resJson => {
          this.setState({
              isLoading : false,
              dataBanner : resJson.banner,
              dataCategories : resJson.categories,
              dataFood : resJson.food
          })
      })
      .catch(err => {
          console.log(err)
      })
     };
    
     _renderItem = (item) => {
         return (
            <TouchableOpacity style={[styles.divCategorie,{backgroundColor:item.color}]}
            onPress={()=>this.setState({selectCatg:item.id})}>
                <Image
                style={{width:100,height:80}}
                resizeMode="contain"
                source={{uri : item.image}} />
                <Text style={{fontWeight:'bold',fontSize:22}}>{item.name}</Text>
            </TouchableOpacity>
         )
     }

     _renderItemFood = (item) => {
         let catg = this.state.selectCatg
         if(catg == 0 || catg == item.categorie) {
             return (
                <TouchableOpacity style={styles.divFood}>
                <Image
                  style={styles.imageFood}
                  resizeMode="contain"
                  source={{uri:item.image}} />
                  <View style={{height:((width/2)-20)-90, backgroundColor:'transparent', width:((width/2)-20)-10}} />
                  <Text style={{fontWeight:'bold',fontSize:22,textAlign:'center'}}>
                    {item.name}
                  </Text>
                  <Text>Descp Food and Details</Text>
                  <Text style={{fontSize:20,color:"green"}}>${item.price}</Text>
                </TouchableOpacity>
             )
         }
     }


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
                        <View style={{width:width, borderRadius:20, paddingVertical:20, backgroundColor:'white'}}>
                            <Text style={styles.titleCatg}>Categories {this.state.selectCatg}</Text>
                            <FlatList
                            horizontal={true}
                            data={this.state.dataCategories}
                            renderItem={({ item }) => this._renderItem(item)}
                            keyExtractor = { (item,index) => index.toString() }
                            />
                            <FlatList 
                            data={this.state.dataFood}
                            renderItem={({item})=> this._renderItemFood(item)}
                            keyExtractor={(item,index) => index.toString()}
                            numColumns={2}
                            />
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
    divCategorie:{
      backgroundColor:'red',
      margin:5, alignItems:'center',
      borderRadius:10,
      padding:10
    },
    titleCatg:{
      fontSize:30,
      fontWeight:'bold',
      textAlign:'center',
      marginBottom:10
    },
    imageFood:{
      width:((width/2)-20)-10,
      height:((width/2)-20)-30,
      backgroundColor:'transparent',
      position:'absolute',
      top:-45
    },
    divFood:{
      width:(width/2)-20,
      padding:10,
      borderRadius:10,
      marginTop:55,
      marginBottom:5,
      marginLeft:10,
      alignItems:'center',
      elevation:8,
      shadowOpacity:0.3,
      shadowRadius:50,
      backgroundColor:'white',
    }
  });