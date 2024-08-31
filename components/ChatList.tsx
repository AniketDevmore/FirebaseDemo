import { FlatList, Text, TouchableOpacity, View } from "react-native";
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const ChatList = ({ navigation }: any) => {

    // const navigation = useNavigation()

    const [userDetails, setUserDetails] = useState<any>()

    useEffect(() => {
        function getLoginData() {
            let loginData: any = AsyncStorage.getItem('login').then((res: any) => {
                console.log('res------__>>', JSON.parse(res).email)
                // if (res.email !== '') {
                const usersCollection = firestore().collection('users').where('email', '!=', JSON.parse(res).email).get().then(resData => {
                    console.log('usersCollection----------->>>', resData.docs)
                    setUserDetails(resData.docs);
                }).catch(error => {
                    console.log('chat error===========>>', error)
                });

                // }
            });
        }
        getLoginData();

    }, [])

    const openChatHandler = async (data: any) => {
        console.log('nav data=============>>>', data)
        let loginData: any = await AsyncStorage.getItem('login')
        navigation.navigate('ChatScreen', { data: data, id: JSON.parse(loginData).email })
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={userDetails}
                // style={{alignItems:'center'}}
                keyExtractor={(item) => item._data.email}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => openChatHandler(item._data)} style={{ backgroundColor: '#cccccc', borderRadius: 15, marginHorizontal: 10, marginVertical: 5, alignItems: 'flex-start', justifyContent: 'center', }}>
                        <Text style={{ color: '#000000', fontSize: 20, paddingLeft: 10, paddingVertical: 10 }}>{item._data.email}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default ChatList;