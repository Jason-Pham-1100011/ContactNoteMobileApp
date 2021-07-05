import React, { Component } from 'react';
import axios from 'axios';
import { 
    Text,
    View, 
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import UserContext from './../../UserContext';
import {api_url} from './../../sv_api_url.js';

class LoginForm extends Component{
    constructor(props){
        super(props)

        this.state = {
            username: '',
            password: '',
        }
    }

    clearState(){
        this.state.username = '';
        this.state.password = '';
        this.state.user_id = '';
        this.setState(this.state);
    }

    btnLoginHandle(username,password){
        if(username !== '' && password !==''){
            axios.post(api_url+"/login",
                {
                    username: username,
                    password: password,
                }).then(res => {
                    let result = res.data.message;
                    let user_id = res.data.user_id;
                    if (result == 'success'){
                        this.clearState();
                        var user = {
                            username: username,
                            password: password,
                            user_id: user_id
                        }
                        UserContext.setUser(user);
                        this.props.navigation.navigate("Main");
                    }
                    else{
                        alert ("Your username or password is wrong!");
                    }
                }).catch(err => console.log(err));
        }
        else{
            alert("Your username or password is empty!");
        }

    }
    render(){
        return(
            <View style={styles.loginform}>
                <Text style={styles.header}> Login Form </Text>
                <TextInput 
                    style={styles.textinput}
                    placeholder="Username"
                    placeholderTextColor="#708090" 
                    underlineColorAndroid={'transparent'}
                    keyboardType = 'email-address'
                    onChangeText = { username =>{
                        this.state.username = username;
                        this.setState(this.state);
                    }}
                    value = {this.state.username}
                />

                <TextInput 
                    style={styles.textinput}
                    placeholder="Password"
                    placeholderTextColor="#708090" 
                    secureTextEntry = {true}
                    underlineColorAndroid={'transparent'}
                    onChangeText = { password =>{
                        this.state.password = password;
                        this.setState(this.state);
                    }}
                    value = {this.state.password}
                />

                <TouchableOpacity 
                    style={styles.button} 
                    onPress={this.btnLoginHandle.bind(this,this.state.username,this.state.password)}>
                        <Text style={styles.btnLogin}> Login </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=>{this.props.navigation.navigate("SignUp")}}>
                    <Text style= {styles.SignUp}> SignUp </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default class Login extends Component{
    render(){
        return (
            <View style= {styles.container}>
                <LoginForm navigation= {this.props.navigation}/>
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

    loginform: {
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
        borderRadius: 5,
    },

    btnLogin: {
        color: '#fff',
        fontWeight: 'bold',
    },

    SignUp:{
        color: '#fff',
        alignSelf: 'center',
        textDecorationLine: 'underline',
        marginTop: 10,
        fontStyle: 'italic'
    }
});
