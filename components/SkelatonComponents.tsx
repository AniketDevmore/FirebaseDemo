import { useEffect } from "react";
import { Animated, Dimensions, Easing, StyleSheet, Text, View } from "react-native"

const { width } = Dimensions.get("window");
import { LinearGradient } from 'react-native-linear-gradient';


const AnimatedLG = Animated.createAnimatedComponent(LinearGradient)
const newStylesheet: any = StyleSheet.absoluteFill;
const SkeletonComponents = ({ props }: any): JSX.Element => {

    const animatedValue = new Animated.Value(0);

    //  to run animation and to run in loop
    useEffect(() => {
        Animated.loop(
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true
            })
        ).start()
    }, [])

    // translate for animation 
    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-width, width]
    })

    const circleTranslate = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-100, 100]
    })

    return (
        <View style={styles.outerContainer}>
            <View style={styles.container}>
                <AnimatedLG colors={['#a0a0a0', '#b0b0b0', '#a0a0a0']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ ...newStylesheet, transform: [{ translateX: translateX }] }} />
                <View style={styles.circleView}>
                    <AnimatedLG colors={['#c0c0c0', '#d0d0d0', '#c0c0c0']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ ...newStylesheet, transform: [{ translateX: circleTranslate }] }} />
                </View>
                <View style={styles.listInnerView}>
                    <AnimatedLG colors={['#c0c0c0', '#d0d0d0', '#c0c0c0']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ ...newStylesheet, transform: [{ translateX: circleTranslate }] }} />
                </View>
                <View style={styles.listInnerView}>
                    <AnimatedLG colors={['#c0c0c0', '#d0d0d0', '#c0c0c0']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ ...newStylesheet, transform: [{ translateX: circleTranslate }] }} />
                </View>
                <View style={styles.listInnerView}>
                    <AnimatedLG colors={['#c0c0c0', '#d0d0d0', '#c0c0c0']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ ...newStylesheet, transform: [{ translateX: circleTranslate }] }} />
                </View>
            </View>
        </View>
    )
}

export default SkeletonComponents;

const styles = StyleSheet.create({
    outerContainer: {
        backgroundColor: '#d0d0d0',
    },
    container: {
        backgroundColor: '#a0a0a0',
        borderColor: '#b0b0b0',
        height: 350,
        width: width,
        alignItems: 'center',
        marginVertical: 160
    },
    circleView: {
        height: 90,
        width: 90,
        backgroundColor: '#c0c0c0',
        marginVertical: 25,
        borderRadius: 90,
        overflow: 'hidden'
    },
    listInnerView: {
        backgroundColor: '#c0c0c0',
        width: 300,
        height: 20,
        borderRadius: 50,
        marginVertical: 10,
        overflow: 'hidden'
    }
})