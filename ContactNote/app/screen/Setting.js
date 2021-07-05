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

class SettingForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            user_id: '',
        }
    }

    componentDidMount(){
        UserContext.getUser((user)=>{
            this.state.user_id = user.user_id;
            this.state.username = user.username;
            this.state.password = user.password;
            this.state.cf_password = '';
            this.setState(this.state);
            
        });

    }

    btnSubmitHandle(username, password, cf_password){
        if (username == '' || password == '' || cf_password ==''){
            alert("Please enter information is required!");
            return
        }
        else if (password != cf_password){
            alert("Password and confirm password are not match!");
            return
        }
        let {user_id} = this.state;
        let settingData = {
            username: username,
            password: password
        }
        axios.put(api_url+'/setting/'+ user_id,settingData)
            .then(res =>{
                let result = res.data;
                if (result.message == "success"){
                    alert('Setting success!')
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
                <Text style={styles.header}> Setting Form </Text>
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

                <TextInput 
                    style={styles.textinput}
                    placeholder="Confirm password"
                    placeholderTextColor="#708090"
                    secureTextEntry = {true}
                    underlineColorAndroid={'transparent'}
                    onChangeText= { cf_password =>{
                        this.state.cf_password = cf_password;
                        this.setState(this.state);
                    }}
                />

                <TouchableOpacity 
                    style={styles.button} 
                    onPress={this.btnSubmitHandle.bind(this, this.state.username, this.state.password, this.state.cf_password)}> 
                    <Text style={styles.btnSubmit}> Save </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default class Setting extends Component{
    render(){
        return (
            <View style= {styles.container}>
                <SettingForm 
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
    }
});
