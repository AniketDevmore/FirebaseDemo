import { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet, Platform } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS } from 'react-native-permissions';
import openMap from 'react-native-open-maps';

const MapPicker = (): JSX.Element => {

    const [mapLat, setMapLat] = useState(0);
    const [mapLog, setMapLog] = useState(0);

    const onClickHandle = (permission: any) => {

        request(permission).then((data) => {
            // console.log(data)
            if (data === 'granted') {
                // console.log('>>>>>>>>>>>>>>>>>>>>>>>>')
                Geolocation.getCurrentPosition((position)=>{
                    // console.log(position)
                    openMap({latitude: position.coords.latitude, longitude: position.coords.longitude})
                })
            }

        }).catch((err) => {
            console.log('err>>>>>>>',err)
        })
    }

    return (
        <View style={styles.outerContainer}>
            {/* <MapView style={styles.map} initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }} onRegionChange={x => {
                console.log(x)
            }}>
                <Marker coordinate={{ latitude: mapLat, longitude: mapLog }} />
            </MapView> */}
            <TouchableOpacity style={styles.textBtnComp} onPress={() => {
                if (Platform.OS === 'ios') {
                    onClickHandle(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
                } else {
                    onClickHandle(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
                }
            }}>
                <Text style={styles.text}>Get Location</Text>
            </TouchableOpacity>

        </View>
    )
}

export default MapPicker;

const styles = StyleSheet.create({
    outerContainer: {
        backgroundColor: '#d0d0d0',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    map: {
        width: '90%',
        height: '70%'
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