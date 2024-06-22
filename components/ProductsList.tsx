import { Dimensions, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native"


const ProductList = ({ data, increseQty, addToCartHandle, decreaseQty }: any): JSX.Element => {


    return (
        <View style={styles.container}>
            <Text style={styles.category}>{data.category}</Text>
            <Image style={styles.img} source={{ uri: data.image }} />
            <Text style={styles.titleText}>{data.title}</Text>
            <Text style={styles.price}>$ {data.price}</Text>
            <View style={styles.cartBtnsContainer}>
                <TouchableOpacity onPress={()=>decreaseQty(data)}><Text style={styles.reduceAddBtn}>-</Text></TouchableOpacity>
                <Text style={styles.cartQtyText}>{data.qty}</Text>
                <TouchableOpacity onPress={() => increseQty(data)}><Text style={styles.reduceAddBtn}>+</Text></TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.button} onPress={()=>addToCartHandle(data)}><Text style={styles.buttonText}>Add To Cart</Text></TouchableOpacity>
            </View>
        </View>
    )
}

export default ProductList;

const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('screen').height

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        width: deviceWidth - 40,
        padding: 15,
        marginVertical: 10,
        marginHorizontal: '3%',
        backgroundColor: '#fff',
        borderRadius: 15
    },
    category: {
        color: '#000',
        fontSize: 21
    },
    img: {
        width: deviceWidth - 260,
        height: deviceHeight - 500,
        marginVertical: 10,
    },
    titleText: {
        width: deviceWidth - 200,
        textAlign: 'center',
        color: '#000',
        marginVertical: 10,
        fontSize: 17
    },
    price: {
        color: '#000',
        fontSize: 18
    },
    cartBtnsContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        marginVertical: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    reduceAddBtn: {
        color: '#000',
        paddingHorizontal: 10,
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: '#f0f0f0',
    },
    cartQtyText: {
        paddingHorizontal: 10,
        fontSize: 18,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 10,
        marginVertical: 13
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '800',
        letterSpacing: 1
    }

})

// {"category": "men's clothing", "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday", "id": 1, "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", "price": 109.95, "rating": {"count": 120, "rate": 3.9}, "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"}, "separators": {"highlight": [Function highlight], "unhighlight": [Function unhighlight], "updateProps": [Function updateProps]}}
