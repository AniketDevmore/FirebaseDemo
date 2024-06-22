import axios from "axios"

export const getApiData = async () => {
    // axios.get('https://fakestoreapi.com/products').then(data=>{
    //     console.log(data.data);
    // }).catch(err=>{
    //     console.log(err)
    // })

    try {
        const response = await axios.get('https://fakestoreapi.com/products')
        // console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const postApiData = (data: any) => {
    axios.post('https://fakestoreapi.com/productss', data)
}

export const putApiData = () => {
    axios.put('https://fakestoreapi.com/productss')
}

export const deleteApiData = () => {
    axios.delete('https://fakestoreapi.com/productss')
}