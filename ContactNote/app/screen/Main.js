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


import Home from './Home';
import Setting from './Setting';


import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserContext from './../../UserContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator ();

export default class Main extends Component{
    componentDidMount(){
    }
    render(){
        return(
            <View style={styles.container}>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === 'Home') {
                                iconName = focused? 'list': 'list-outline';
                            } else if (route.name === 'Setting') {
                                iconName = focused ? 'settings' : 'settings-outline';
                            }
                        // You can return any component that you like here!
                            return <Ionicons name={iconName} color={color} size ={size} />;
                        },
                    })}
                    tabBarOptions={{
                        activeTintColor: 'blue',
                        inactiveTintColor: 'gray',
                    }}
      >
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="Setting" component={Setting} />                        
                    </Tab.Navigator>
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