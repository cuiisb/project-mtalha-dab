import React from 'react'
import { StyleSheet, Text, View ,Image} from 'react-native'

const PostDetail = ({route,navigation}) => {

    const {itemData} = route.params;
    console.log(itemData)
    return (
        <View style={styles.containerImage} >
<Text>{itemData.caption}</Text>
        <Image source={{ uri: itemData.image }} style={styles.image} />
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
