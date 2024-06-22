import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import { addQtyInCart, reduceQtyInCart, removeCart } from "../store/products";

const Cart = (): JSX.Element => {
    const dispatch = useDispatch()
    const cartData = useSelector((store: any) => store.cartProducts.cart)

    // remove from cart function 
    const removeFromCart = (item: any) => {
        // console.log('remove item <<<<<<<<<',item)
        dispatch(removeCart(item))
    }

    // reduce from cart product quantity
    const reduceCartQty = (item:any) =>{
        dispatch(reduceQtyInCart(item))
    }

    const addCartQty = (item:any)=>{
        dispatch(addQtyInCart(item))
    }

    return (
        <View style={{flex:1}}>
            {
                cartData.length === 0 ? <View style={styles.emptyContainer}><Text style={styles.emptyText}>Cart is Empty!</Text></View> :
                    <FlatList data={cartData} keyExtractor={(item) => item.id} renderItem={(item: any) =>
                        <View style={styles.container}>
                            <Text style={styles.category}>{item.item.category}</Text>
                            <Image style={styles.img} source={{ uri: item.item.image }} />
                            <Text style={styles.titleText}>{item.item.title}</Text>
                            <Text style={styles.price}>$ {item.item.price}</Text>
                            <View style={styles.cartBtnsContainer}>
                                <TouchableOpacity onPress={() => reduceCartQty(item.item)}><Text style={styles.reduceAddBtn}>-</Text></TouchableOpacity>
                                <Text style={styles.cartQtyText}>{item.item.qty}</Text>
                                <TouchableOpacity onPress={() => addCartQty(item.item)}><Text style={styles.reduceAddBtn}>+</Text></TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity style={styles.button} onPress={() => removeFromCart(item.item)}><Text style={styles.buttonText}>Remove</Text></TouchableOpacity>
                            </View>
                        </View>
                    } />
            }
        </View>
    )
}

export default Cart;

const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('screen').height

const styles = StyleSheet.create({
    emptyContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    emptyText:{
        color:'#000',
        fontSize: 20,
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        width: deviceWidth - 40,
        padding: 15,
        marginVertical: 10,
        marginHorizontal: '5%',
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
    cartBtnsContainer:{
        borderWidth: 1,
        borderColor: 'gray',
        marginVertical: 5,
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    reduceAddBtn:{
        color:'#000',
        paddingHorizontal: 10,
        fontSize: 20,
        fontWeight:'bold',
        backgroundColor:'#f0f0f0',
    },
    cartQtyText:{
        paddingHorizontal: 10,
        fontSize: 18,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: 'red',
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