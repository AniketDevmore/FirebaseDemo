import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { getApiData } from "./http";
import { useEffect, useState } from "react";
import ProductList from "./ProductsList";
import { useDispatch } from "react-redux";
import { addCart } from "../store/products";
// import { showTostMsg } from "..";

const ApiCall = (): JSX.Element => {
    const dispatch = useDispatch()
    const [apiData, setApiData] = useState([])
    const [flag, setFlag] = useState(true);
    const [cartQtyData, setCartQtyData] = useState<any>(null)

    const pressed = () => {
        setFlag(!flag)
    }

    const storeModifiedData = (item: any) => {
        // console.log('item......',item)
        let newData = item.map((ele: any) => {
            return { ...ele, 'qty': 1 }
        })
        // console.log('newData>>>>>>>>>>', newData)
        return newData
    }

    const addToCartHandle = (item: any) => {
        if (cartQtyData === null) {
            dispatch(addCart(item))
        } else {
            dispatch(addCart(cartQtyData))
            setCartQtyData(null)
            // showTostMsg('Product successfully added to cart!')
        }
    }

    const increseQty = (item: any) => {
        if (cartQtyData === null) {
            let newData = item
            newData.qty += 1
            setCartQtyData({ ...newData });
        } else {
            let newData = item
            newData.qty += 1
            setCartQtyData({ ...newData });
        }
    }

    const decreaseQty = (item:any)=>{
        if (cartQtyData === null) {
            let newData = item
            newData.qty -= 1
            setCartQtyData({ ...newData });
        }else if(cartQtyData !== null && cartQtyData.qty > 1){
            let newData = item
            newData.qty -= 1
            setCartQtyData({ ...newData });
        }
    }

    useEffect(() => {
        async function getdata() {
            const data = await getApiData();

            setApiData(storeModifiedData(data))
        }

        getdata()
    }, [])

    return (
        <View style={styles.container}>
            {/* <TouchableOpacity onPress={pressed} style={styles.pressContainer}><Text style={styles.font}>Reload</Text></TouchableOpacity> */}
            
            <FlatList data={apiData} keyExtractor={(item: any) => item.id} renderItem={(item) => <ProductList data={item.item} increseQty={increseQty} addToCartHandle={addToCartHandle} decreaseQty={decreaseQty}/>} />
        </View>
    )
}

export default ApiCall;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 5,
        marginHorizontal: 8
    },
    pressContainer: {
        backgroundColor: 'green',
        width: 100,
        padding: 15,
        marginLeft: 299,
        borderRadius: 10
    },
    font: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        letterSpacing: 1
    }
})