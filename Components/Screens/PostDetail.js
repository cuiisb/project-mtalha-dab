import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View ,Image,ImageBackground} from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import backHome from "../../Design/backgroundHome.png";



const PostDetail = ({route,navigation}) => {
const [date,setDate] = useState(0)
const [month,setMonth] = useState("")
const [year,setYear] = useState(0)

const {itemData} = route.params;


const calculateYear = ()=>{

setDate(itemData.date.getDate())

switch(itemData.date.getMonth()+1){
case 1: setMonth("January"); break;
case 2: setMonth("February"); break;
case 3: setMonth("March"); break;
case 4: setMonth("April"); break;
case 5: setMonth("May"); break;
case 6: setMonth("June"); break;
case 7: setMonth("July"); break;
case 8: setMonth("August"); break;
case 9: setMonth("September"); break;
case 10: setMonth("October"); break;
case 11: setMonth("November"); break;
case 12: setMonth("December"); break;

}

setYear(itemData.date.getUTCFullYear())
}


useEffect(()=>{
calculateYear()
},[])

    return (
        <ImageBackground source={backHome} resizeMode="cover" style={styles.imageBg}>
<Ionicons name="arrow-back-outline" size={40} 
    color={"#00d3d5"} style={{marginTop:10,marginLeft:10}}
    onPress={() => navigation.goBack()} />
        <View style={styles.containerImage} >
        
        <Text style={{fontSize:25, color:"white", }}>Post</Text>

        <Image source={{ uri: itemData.image }} style={styles.image} />
        <Text style={{fontSize:18, color:"white", marginTop: 18}}>{itemData.caption}</Text>
        <Text style={{marginTop:15, color:"#808080"}}>{date}{" - "}{month}{" - "}{year} </Text>
        </View>
        </ImageBackground>

    )
}

export default PostDetail

const styles = StyleSheet.create({
    containerImage: {
        flex: 1/3 ,
       marginTop: 10,
        marginHorizontal:10
      },
    image:{
        width: 360,
        height:300,
marginTop: 20  ,
  },
    imageBg: {
        flex: 1,
      },
})
