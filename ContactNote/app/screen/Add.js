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
import {api_url} from './../../sv_api_url';

class AddForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            phone_number: '',
        }
    }

    btnSubmitHandle(name, phone_number){
        if (name =='' || phone_number ==''){
            alert('Please enter information is requied');
            return;
        }

        axios.post(api_url+'/add',{
            name: name,
            phone_number: phone_number,
            user_id: this.props.route.params.user_id
        })
        .then(res => {
            let result = res.data;
            if (result.message == 'success'){
                alert('Add success!');
                this.props.navigation.goBack();
            }
            else{
                alert('Some thing wrong!');
            }
        })
        .catch(err => console.log(err)) 
    }
    render(){
        return(
            <View style={styles.form}>
                <Text style={styles.header}> Add Form </Text>
                <TextInput 
                    style={styles.textinput}
                    placeholder="Your name"
                    placeholderTextColor="#708090" 
                    underlineColorAndroid={'transparent'}
                    onChangeText = { name =>{
                        this.state.name = name;
                        this.setState(this.state);
                    }}
                />

                <TextInput 
                    style={styles.textinput}
                    placeholder="Your number"
                    placeholderTextColor="#708090" 
                    underlineColorAndroid={'transparent'}
                    onChangeText = { phone_number =>{
                        this.state.phone_number = phone_number;
                        this.setState(this.state);
                    }}
                />

                <TouchableOpacity 
                    style={styles.button}
                    onPress={()=>{
                        let name = this.state.name;
                        let phone_number = this.state.phone_number;
                        this.btnSubmitHandle(name, phone_number);
                        }}>
                        <Text style={styles.btnSubmit}> Add </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default class Add extends Component{
    render(){
        return (
            <View style= {styles.container}>
                <AddForm 
                    navigation= {this.props.navigation}
                    route={this.props.route}
                    />
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
