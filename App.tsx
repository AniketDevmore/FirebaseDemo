/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { AppRegistry, StatusBar } from 'react-native';
import { name as tasksNAtive } from './app.json';

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SkeletonComponents from './components/SkelatonComponents';
// import PackageSkeleton from './components/PackageSkeleton';
import ImagePicker from './components/ImagePicker';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import MapPicker from './components/MapPicker';
import MainPage from './components/MainPage';
import AccessContacts from './components/AccessContacts';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ApiCall from './components/AliCall';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Cart from './components/Cart';
import fromToDestination from './components/FromToDestination';
import LoginScreen from './components/LoginScreen';
import analytics from '@react-native-firebase/analytics';
import { addEventListener } from "@react-native-community/netinfo";

AppRegistry.registerComponent(tasksNAtive, () => App);

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator()

function App(): JSX.Element {

  const [isLoading, setIsLoading] = useState(false);
  const [login,  setLogin] = useState(false)

  useEffect(() => {
    let timer = setTimeout(() => setIsLoading(true), 3000)

    if (isLoading) {
      setIsLoading(false)
    }

  }, [])

  useEffect(() => {
    unsubscribe();
  }, [])

  const unsubscribe = addEventListener(async (state) => {
    await analytics().logEvent('NetworkType', {
      content_type: 'NetWorkType',
      item_id: 'nettype_123',
      state: state.type
    });
    console.log("Connection type", state.type);
    await analytics().logEvent('Network', {
      content_type: 'NetWork',
      item_id: 'net_321',
      state: state.isConnected
    });
    console.log("Is connected?", state.isConnected);
  });

  const DrawerNavigator = () =>{
    return (
      <Drawer.Navigator screenOptions={{headerStyle:{backgroundColor:'#a0a0a0'}, headerTintColor:'#fff', sceneContainerStyle:{backgroundColor:'#c0c0c0'}, drawerContentStyle:{backgroundColor:'#b0b0b0'}, drawerActiveBackgroundColor:'#d0d0d0', drawerActiveTintColor:'red', drawerInactiveTintColor:'#fff'}}>
        <Drawer.Screen name='landingPage' component={MainPage} options={{title:'All Categories'}}/>
        <Drawer.Screen name='All Products' component={ApiCall}/>
        <Drawer.Screen name='Cart' component={Cart}/>
      </Drawer.Navigator>
    )
  }

  return (
    <>
    <StatusBar barStyle={'light-content'} backgroundColor={'gray'}/>
    <Provider store={store}>
    <NavigationContainer >
      {/* { */}
        {/* isLoading ? */}
        {login ?
         <Stack.Navigator screenOptions={{headerStyle:{backgroundColor:'gray'}, headerTintColor: '#fff'}}>
          <Stack.Screen name='mainPage' component={MainPage}/>
          <Stack.Screen name='ImagePicker' component={ImagePicker} />
          <Stack.Screen name='MapPicker' component={MapPicker} />
          <Stack.Screen name='AccessContact' component={AccessContacts}/>
          {/* <Stack.Screen name='SourceToDestination' component={fromToDestination}/> */}
        </Stack.Navigator>
        : <LoginScreen setLogin={setLogin}/>
        }
      {/* //     :
      //     <SkeletonComponents /> */}
      {/* // } */}
    </NavigationContainer>
    </Provider>
    </>
  );
}

const styles = StyleSheet.create({

});

export default App;
