import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { GiftedChat } from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore';

const ChatScreen = ({ route }: any) => {
    const [messages, setMessages] = useState<any>([]);


    useEffect(() => {
        const subscriber: any = firestore().collection("chats").doc(route.params.id + route.params.data.email).collection("messages").orderBy("createdAt", "desc");

        subscriber.onSnapshot((querysnapshot: any) => {
            const allmessages = querysnapshot.docs.map((item: any) => {
                const newDate:any = new Date();
                return { ...item._data, createdAt: Date.parse(newDate) }
            })
            setMessages(allmessages)
        })
        return () => subscriber();
    }, [])

    const onSend = useCallback((messages = []) => {
// console.log('messages========>>', messages)
        let msg:any = messages[0];
        const myMsg = {
            ...msg, sendBy: route.params.id, sendTo: route.params.data.email, createdAt: Date.parse(msg.createdAt)
        }
        setMessages((previousMessages: any) =>
            GiftedChat.append(previousMessages, myMsg),
        );
        firestore().collection("chats").doc('' + route.params.id + route.params.data.email).collection('messages').add(myMsg)
        firestore().collection("chats").doc('' + route.params.data.email + route.params.id).collection('messages').add(myMsg)
    }, [])

    // console.log('route--------->>', route.params)
    return (
        <GiftedChat
            messages={messages}
            onSend={(messages:any) => onSend(messages)}
            user={{
                _id: route.params.id,
            }}
        />
    )
}

export default ChatScreen;