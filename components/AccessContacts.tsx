import { FlatList, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { request, PERMISSIONS } from 'react-native-permissions';
import Contacts from "react-native-contacts";
import { useState } from "react";


const AccessContacts = (): JSX.Element => {

    const [contacts, setContacts] = useState([])

    const storeContactInfo = (data: any) => {
        let newData: any = [];
        data.map((ele: any) => {
            let newCont = { ['displayName']: ele.displayName, ['number']: ele.phoneNumbers[0].number };
            newData.push(newCont)
        })

        setContacts(newData)
        // return newData
    }

    const askForPermission = (permission: any) => {
        request(permission).then((result) => {
            // console.log('result>>>>>>>', result);
            if (result === 'granted') {
                Contacts.getAll()
                    .then((contacts) => {
                        // work with contacts
                        storeContactInfo(contacts)
                        // console.log('contacts>>>>>>>>',contacts);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }
        });
    }
    return (
        <View style={styles.outerContainer}>
            {contacts.length > 0 ? <FlatList style={styles.flatist} data={contacts} keyExtractor={(keys: any) => keys.displayName} renderItem={(ele: any) => (
                <View style={styles.listView}>
                    <Text>Name: {ele.item.displayName}</Text>
                    <Text>Number: {ele.item.number}</Text>
                </View>
            )} /> : <></>}
            <TouchableOpacity style={styles.textBtnComp} onPress={() => {
                if (Platform.OS === 'ios') {
                    askForPermission(PERMISSIONS.IOS.CONTACTS)
                } else {
                    askForPermission(PERMISSIONS.ANDROID.READ_CONTACTS)
                }
            }}>
                <Text style={styles.text}>Access Contact</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AccessContacts;

const styles = StyleSheet.create({
    outerContainer: {
        flex:1,
        backgroundColor: '#d0d0d0',
        justifyContent: 'center',
        alignItems: 'center',
        // height: 610
    },
    flatist:{
        flex: 2
    },
    listView:{
       backgroundColor:'#b0b0b0',
       marginVertical:5,
       padding: 10,
    },
    textBtnComp: {
        alignContent: 'center',
        justifyContent: 'center',
        width: 150,
        height: 50,
        borderRadius: 6,
        backgroundColor: 'green',
        marginVertical: 100,
    },
    text: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18
    }
})
