import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = '@user_id_key';

const UserStorage = {
    setUser: async (user) =>{ 
        try {
            await AsyncStorage.setItem( USER_KEY, JSON.stringify(user));
        }
        catch (e) {
        // saving error
        console.log(e);
        }
        console.log("Save user storage done!");
    },

    getUser: async (callback) =>{
        try{
            var val = await AsyncStorage.getItem(USER_KEY)
            callback(JSON.parse(val));
            return
        }
        catch(e){
            console.log(e);
        }
        console.log("Get user storage done!");
    },

    clearUser: async (callback) =>{
        try{
            await AsyncStorage.clear();
        }
        catch(e){
            console.log(e);
        }
        console.log("Clear user storage done!");
    }
} 

module.exports = UserStorage;