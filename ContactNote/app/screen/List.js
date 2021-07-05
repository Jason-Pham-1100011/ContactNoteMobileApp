import React, { Component } from 'react';
import axios from 'axios';
import { 
    Text,
    View, 
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import UserContext from './../../UserContext';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {api_url} from './../../sv_api_url';

export default class List extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            DATA: [],
            user_id: ''        
        }
        this._focusHandle = this._focusHandle.bind(this);
        this._reloadData = this._reloadData.bind(this);
    }
    _reloadData(){
        UserContext.getUser((user)=>{
            this.setState({user_id: user.user_id});
            axios.post(api_url + '/list',{user_id: this.state.user_id})
            .then(res=>{ 
                this.state.DATA = res.data;
                this.setState(this.state);
            })
            .catch(err=> console.log(err));
        });
    }
    _focusHandle = ()=>{
        this.props.navigation.addListener('focus', () => {
            // 
            //http://192.168.162.2:3000/list
            this._reloadData();
          });     
    }

    componentDidMount(){
        this._focusHandle();
    
    }
    componentWillUnmount(){
        //this._unsubscribe();
    }

    selectItemHandle (item) {
        var dataToEdit = {
            item: item,
            user_id: this.state.user_id
        }
        this.props.navigation.navigate("Edit",dataToEdit);
    }

    deleteItemHandle(item){
        let {id} = item;
        axios.delete(api_url+ "/delete/"+id)
        .then(res => {
            console.log(res.data)
            })
        .catch(err =>console.log(err))
        this._reloadData()
    }

    btnAddHandle(){
        let user_id = this.state.user_id;
        this.props.navigation.navigate("Add",{user_id: user_id});
    }

    btnLogoutHandle(){
        UserContext.clearUser();
        this.props.navigation.popToTop();
    }

    render() {
        return(
        <SafeAreaView style={styles.container}>
            <FlatList
                data={this.state.DATA}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <View style= {styles.row}>
                            <TouchableOpacity onPress={this.selectItemHandle.bind(this,item)} style= {[styles.infoItem]}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.phone_number}>{item.phone_number}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.deleteItemHandle.bind(this,item)} style= {[styles.btnDelete]}>
                                <MCIcons name={'delete'} size={25} color={'red'}/>
                            </TouchableOpacity>
                    </View>
                    
                    
                )}/>
                <View style = {styles.buttonWrapper}>
                <TouchableOpacity
                    onPress={ this.btnLogoutHandle.bind(this) }
                    style = {styles.buttonContainer}
                >
                    <Text style={styles.buttonText}> <MCIcons name= {'logout'} size={30} color={'white'}/> </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.btnAddHandle.bind(this)}
                    style = {styles.buttonContainer}
                >
                    <Text style={styles.buttonText}> <MCIcons name= {'plus'} size={30} color={'white'}/> </Text>
                </TouchableOpacity>
                </View>
        </SafeAreaView>
    )
    };
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#b0e0e6'
    },
    row:{
        flex:1,
        flexDirection: 'row',
        borderBottomColor: "#fff",
        borderBottomWidth: 1,
    },
    infoItem: {
        flex: 1,
        backgroundColor: '#b0e0e6',
        padding: 10
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    number: {
        fontSize: 15,
    },
    btnDelete:{
        justifyContent: 'center',
        padding: 10
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
        fontSize: 20,
        fontWeight: 'bold'
    }
});