import { useState } from "react";
import { Alert, Dimensions, Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const ImagePicker = (): JSX.Element => {
    const [imgUrl, setImgUrl] = useState('https://hips.hearstapps.com/hmg-prod/images/labrador-puppy-royalty-free-image-1626252338.jpg?crop=0.667xw:1.00xh;0.173xw,0&resize=2048:*')


    const pressHandler = async () => {

        try {
            let result = await launchCamera({ mediaType: 'photo', cameraType: 'back', saveToPhotos: true, maxHeight: 500, maxWidth: 500 });
            let data: any = result?.assets[0]?.uri
            setImgUrl(data)
        } catch (err) {
            console.log(err)
        }

    }

    const openGlalleryHandler = async () => {

        // console.log('pressed.............');
        let result = await launchImageLibrary({ mediaType: 'photo', maxHeight: 500, maxWidth: 500 });
        if (result.didCancel !== true) {
            // console.log('result>>>>>>>>>>>>>', result)
            let data: any = result?.assets[0]?.uri
            // console.log('data>>>>>>>>>>>>>', data)
            setImgUrl(data)
            // console.log('imgUrl>>>>>>>>>>>>>>', imgUrl)
        }
    }

    return (
        <View style={styles.outerContainer}>

            <View style={styles.innetView}>
                <Image style={styles.img} source={{ uri: imgUrl }} />
                <TouchableOpacity style={styles.textBtnComp} onPress={pressHandler}>
                    <Text style={styles.text}>Open Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.textBtnComp} onPress={openGlalleryHandler}>
                    <Text style={styles.text}>Open Gallery</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ImagePicker;

const deviceWidth = Dimensions.get('screen').width

const styles = StyleSheet.create({
    outerContainer: {
        backgroundColor: '#d0d0d0',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    img: {
        height: 300,
        width: deviceWidth < 450 ? 300 : 350,
        borderRadius: 9
    },
    innetView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textBtnComp: {
        alignContent: 'center',
        justifyContent: 'center',
        width: 100,
        height: 40,
        borderRadius: 6,
        backgroundColor: 'green',
        marginVertical: 10
    },
    text: {
        color: '#fff',
        textAlign: 'center'
    }
})