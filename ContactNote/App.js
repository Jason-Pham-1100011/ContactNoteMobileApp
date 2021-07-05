/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    FlatList,
    TouchableOpacity,
} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Login from './app/screen/Login';
import List from './app/screen/List';
import Add from './app/screen/Add';
import Edit from './app/screen/Edit';
import Home from './app/screen/Home';
import Setting from './app/screen/Setting';
import Main from './app/screen/Main';
import SignUp from './app/screen/SignUp';

import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class App extends Component{
    render(){
        return(
            <View style={styles.container}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Login" headerMode="none">
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="SignUp" component={SignUp} />
                        <Stack.Screen name="Main" component={Main} />   
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
            
        );
    }
} 

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#b0e0e6'
    },

    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    buttonContainer: {
        margin: 10,
        height: 50,
        width: 50,
        borderRadius: 60,
        backgroundColor: '#5d57ff',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        fontSize: 20
    }

});