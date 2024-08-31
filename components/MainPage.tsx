
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from '@react-native-firebase/firestore';

const MainPage = () => {

    const navigation:any = useNavigation()
    // const [enabled, setEnabled] = useState(crashlytics().isCrashlyticsCollectionEnabled);
    const imageclickHandle = async () => {
         await analytics().logEvent('ImageCaptureClick',{
            content_type: 'Image',
            item_id: 'image_123',
          });
        navigation.navigate('ImagePicker')
    }

    const mapclickHandle = async() => {
        await analytics().logEvent('MapPickerClick',{
            content_type: 'Map',
            item_id: 'map_123',
          });
        navigation.navigate('MapPicker')
    }

    const fomToDestinationClickHandler = async () =>{
        navigation.navigate('SourceToDestination')
    }

    const contactClickHandler = () =>{
        crashlytics().crash();
        navigation.navigate('AccessContact')
    }
    
    const SensSMSClickHandler = () =>{
        navigation.navigate('SendSMS')
    }

    const chatClickHandler = () => {
        console.log('chatClickHandler------------>>')
        navigation.navigate('ChatList')
    }

     return (
        <View style={styles.outerContainer}>
           <View style={styles.innetView}> 
           <TouchableOpacity style={styles.textBtnComp} onPress={imageclickHandle}>
                <Text style={styles.text}>Capture Image</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.textBtnComp} onPress={mapclickHandle}>
                <Text style={styles.text}>Access Map</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity style={styles.textBtnComp} onPress={fomToDestinationClickHandler}>
                <Text style={styles.text}>From To Map</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.textBtnComp} onPress={contactClickHandler}>
                <Text style={styles.text}>Access Contact</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.textBtnComp} onPress={chatClickHandler}>
                <Text style={styles.text}>Chat</Text>
            </TouchableOpacity>
           
           </View>
        </View>
    )
}

export default MainPage;

const styles = StyleSheet.create({
    outerContainer: {
        backgroundColor: '#d0d0d0',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    innetView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textBtnComp: {
        alignContent: 'center',
        justifyContent: 'center',
        width: 150,
        height: 50,
        borderRadius: 6,
        backgroundColor: 'green',
        marginVertical: 10,
    },
    text: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18
    }
})