import React, { Component } from 'react';
import axios from 'axios';
import { 
    Text,
    View, 
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Alert,
} from 'react-native';

import UserContext from './../../UserContext';
import {api_url} from './../../sv_api_url';

class SignUpForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
        }
    }

    componentDidMount(){}

    btnSubmitHandle(username, password){
        if (username == '' || password == ''){
            alert("Please enter information is required!");
            return
        }
        let signUpData = {
            username: username,
            password: password
        }
        axios.post(api_url+'/signup',signUpData)
            .then(res =>{
                let result = res.data;
                if (result.message == "success"){
                    alert('Sign up success!');
                    this.props.navigation.goBack();
                }
                else{
                    alert(result.message + "!");
                }
            })
            .catch(err => console.log(err));
        
        
    }
    render(){
        return(
            <View style={styles.form}>
                <Text style={styles.header}> Register Form </Text>
                <TextInput 
                    style={styles.textinput}
                    placeholder="Enter username"
                    placeholderTextColor="#708090" 
                    underlineColorAndroid={'transparent'}
                    onChangeText= { username =>{
                        this.state.username = username;
                        this.setState(this.state)
                    }}
                    value = {this.state.username}
                />

                <TextInput 
                    style={styles.textinput}
                    placeholder="Enter password"
                    placeholderTextColor="#708090"
                    secureTextEntry = {true}
                    underlineColorAndroid={'transparent'}
                    onChangeText= { password =>{
                        this.state.password = password;
                        this.setState(this.state);
                    }}
                    value ={this.state.password}
                />

                <TouchableOpacity 
                    style={styles.button} 
                    onPress={this.btnSubmitHandle.bind(this, this.state.username, this.state.password)}> 
                    <Text style={styles.btnSubmit}> SignUp </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=>{this.props.navigation.goBack()}}>
                    <Text style= {styles.backLink}> Back </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default class SignUp extends Component{
    render(){
        return (
            <View style= {styles.container}>
                <SignUpForm 
                    navigation= {this.props.navigation} 
                    route={this.props.route}/>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#36485f',
        paddingHorizontal: 60,
    },

    form: {
        alignSelf: 'stretch',
    },

    header: {
        fontSize: 24,
        color: '#fff',
        paddingBottom: 10,
        marginBottom: 40,
        borderBottomColor: '#199187',
        borderBottomWidth: 1,
    },

    textinput: {
        alignSelf: 'stretch',
        height: 40,
        marginBottom: 30,
        color: '#fff',
        borderBottomColor: '#f8f8f8',
        borderBottomWidth: 1,

    },

    button: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#59cbbd',
        marginTop: 30,
        borderRadius: 5
    },

    btnSubmit: {
        color: '#fff',
        fontWeight: 'bold',
    },

    backLink:{
        color: '#fff',
        alignSelf: 'center',
        textDecorationLine: 'underline',
        marginTop: 10,
        fontStyle: 'italic'
    }
});
