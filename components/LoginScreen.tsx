import { getAnalytics } from "@react-native-firebase/analytics";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import auth from '@react-native-firebase/auth';

const LoginScreen = (props: any) => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const signUpHander = () => {
        if (email.length > 0 && password.length > 0) {
            console.log(email, password)
            auth().createUserWithEmailAndPassword(email, password).then(async (res:any) => {
                await getAnalytics().logEvent('signup', {
                    content_type: 'sinup',
                    item_id: 'log_321',
                });
                console.log('signup===========>>', res)
            }).catch(error => {
                console.log('error===========>>', error)
            })
        }
    }

    const loginHandler = async () => {
        if (email.length > 0 && password.length > 0) {
            auth().signInWithEmailAndPassword(email, password).then(async (res:any) => {
                console.log('signin========>>', res)
                await getAnalytics().logEvent('login', {
                    content_type: 'login',
                    item_id: 'log_123',
                });
                props.setLogin(true)
            }).catch(error => {
                console.log('error========>>', error)
            })
        }
    }
    return (
        <View style={styles.safeAreaViewcontainer}>
            <View style={styles.signInContainer}>
                <View style={styles.textInputView}>

                    <TextInput
                        style={styles.input}
                        onChangeText={email => setEmail(email)}
                        value={email}
                        placeholder="Email"
                        keyboardType="email-address"
                        placeholderTextColor="#818181"
                    />
                </View>
                <View style={styles.textInputView}>

                    <TextInput
                        style={styles.input}
                        onChangeText={password => setPassword(password)}
                        value={password}
                        placeholder="Password"
                        secureTextEntry={true}
                        placeholderTextColor="#818181"
                    />
                </View>
            </View>
            <TouchableOpacity delayPressIn={0} onPress={() => loginHandler()}>
                <View style={styles.signBtn}>
                    <Text style={styles.signBtnText}>Sign In</Text>
                </View>

            </TouchableOpacity>
            <TouchableOpacity delayPressIn={0} onPress={() => signUpHander()}>
                <View style={styles.signBtn}>
                    <Text style={styles.signBtnText}>Sign Up</Text>
                </View>

            </TouchableOpacity>
        </View>
    )
}

export default LoginScreen;


const styles = StyleSheet.create({
    safeAreaViewcontainer: {
        flex: 1,
        position: 'relative',
        backgroundColor: 'skyblue',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        // paddingHorizontal:(20),
        alignItems: 'center',
        justifyContent: 'center'

    },
    logo: {
        width: (220),
        height: (70),
        resizeMode: 'contain',
        marginBottom: (25),
    },
    signInContainer: {
        width: '100%',
    },
    textInputView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#dedede',
        borderBottomWidth: 0.5,
        paddingHorizontal: (50),
        paddingVertical: (6),
        width: '90%',
        marginHorizontal: '5%',
        backgroundColor: '#fff',
        marginVertical: 10

    },
    textInputIcon: {
        width: (40),
        height: (30),
        resizeMode: 'contain',
        marginRight: (30),
    },
    input: {
        fontSize: (16),
        lineHeight: (18),
        color: "red",
        fontFamily: 'Roboto-Regular',
        width: '80%'
    },
    signBtn: {
        width: 250,
        borderRadius: 5,
        backgroundColor: "#FFFFFF",
        marginTop: (30),
        marginBottom: (55)
    },
    signBtnText: {
        fontSize: (16),
        lineHeight: (18),
        color: '#000',
        fontFamily: 'Roboto-Regular',
        textAlign: "center",
        paddingVertical: (20),
    },
    signInText: {
        fontSize: (14),
        lineHeight: (17),
        color: "#818181",
        fontFamily: 'Roboto-Regular',
        textAlign: 'center',
        paddingVertical: (10)
    },
    signInFooter: {
        backgroundColor: "#1b5c92",
        height: (45),
        width: '100%',
        position: 'absolute',
        bottom: 0
    },
    signInFooterIcon: {
        width: 15,
        height: (15),

    },
    signInFooterIconView: {
        padding: (13),
        backgroundColor: "#fff",
        borderRadius: 17,
        position: 'absolute',
        bottom: (30),
        flexDirection: "row",
        alignSelf: 'center',
    },
    signUpText: {
        fontWeight: "bold",
    }
})

