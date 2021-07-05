import React, {Component} from 'react';
import axios from 'axios';
import { 
    Text,
    View, 
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Alert,
} from 'react-native';



import List from './List';
import Edit from './Edit';
import Add from './Add';
import Setting from './Setting';

import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator ();

class Home extends Component {
    render(){
        return(
            <View style={styles.container}>
                <Stack.Navigator initialRouteName="List" >
                        <Stack.Screen name="List" component={List} />
                        <Stack.Screen name="Add" component={Add} />
                        <Stack.Screen name="Edit" component={Edit} /> 
                </Stack.Navigator>
            </View>
        )
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

module.exports = Home;