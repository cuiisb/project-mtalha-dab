import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View ,Image} from 'react-native'




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
        <View style={styles.containerImage} >
<Text>{itemData.caption}</Text>
        <Image source={{ uri: itemData.image }} style={styles.image} />
        <Text>{date}{" - "}{month}{" - "}{year} </Text>
        </View>
    )
}

export default PostDetail

const styles = StyleSheet.create({
    containerImage: {
        flex: 1 / 3,
      },
    image:{
        flex: 1,
        aspectRatio: 1 / 1,
        marginHorizontal: 1,
        marginVertical: 1,
    }
})
