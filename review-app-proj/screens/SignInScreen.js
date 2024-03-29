import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from '../components/context';
import Users from '../model/users';

const SignInScreen = ({navigation}) => {
    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });
    const { signIn } = React.useContext(AuthContext);

    // Function to handle text input change for the username field
    const textInputChange = (val) => {
        if(val.trim().length >= 4) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser : true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    // Function to handle password input change and validation
    const handlePasswordChange = (val) => {
        if(val.trim().length >= 8) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    // Function to toggle the secureTextEntry state for the password field
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    // Function to validate the username field after it loses focus
    const handleValidUser = (val) => {
        if(val.length >= 4){
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            })
        }
    }

    // Function to handle the sign-in process
    const loginHandle = (userName, password) => {
        const foundUser = Users.filter(item => {
            return userName == item.username && password == item.password;
        });
        if(data.username.length == 0 || data.password.length == 0) {
            Alert.alert('Wrong Input!', 'Username or Password field cannot be empty', [
                {text: 'Okay'}
            ]);
            return;
        }
        if(foundUser.length == 0) {
            Alert.alert('Invalid User!', 'Username or Password is incorrect.', [
                {text: 'Okay'}
            ]);
            return;
        }
        signIn(foundUser);
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle='light-conten' />
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome!</Text>
            </View>
            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.text_footer}>Username</Text>
                <View style={styles.action}>
                    {/* Icon */}
                    <FontAwesome
                        name='user-o'
                        color='#05375a'
                        size={20}
                    />
                    {/* Text Input */}
                    <TextInput
                        placeholder='Your Username'
                        style={styles.textInput}
                        autoCapitalize='none'
                        onChangeText={(val)=>textInputChange(val)}
                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                    />
                    {/* Checkmark Icon (Displayed when input is valid) */}
                    {data.check_textInputChange ? 
                    <Feather 
                        name='check-circle'
                        color='green'
                        size={20}
                    />
                    : null }
                </View>
                {/* Error message for invalid username */}
                {data.isValidUser ? null : 
                    <Text style={styles.errorMsg}>Username must be 4 characters long!</Text>
                }
    
                <Text style={[styles.text_footer, {marginTop: 35}]}>Password</Text>
                <View style={styles.action}>
                    {/* Lock Icon */}
                    <Feather
                        name='lock'
                        color='#05375a'
                        size={20}
                    />
                    {/* Password Input */}
                    <TextInput
                        placeholder='Your Password'
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize='none'
                        onChangeText={(val)=>handlePasswordChange(val)}
                    />
                    {/* Toggle Password Visibility Icon */}
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        {data.secureTextEntry ?
                        <Feather 
                            name='eye-off'
                            color='grey'
                            size={20}
                        />
                        :
                        <Feather 
                            name='eye'
                            color='grey'
                            size={20}
                        />
                        }
                    </TouchableOpacity>
                </View>
                {/* Error message for invalid password */}
                {data.isValidPassword ? null :
                    <Text style={styles.errorMsg}>Password must be 8 characters long!</Text>
                }
                <View style={styles.button}>
                    {/* Sign In Button */}
                    <TouchableOpacity style={styles.signIn}
                        onPress={() => {loginHandle(data.username, data.password)}}> 
                    <LinearGradient colors={['#08d4c4', '#01ab9d']} 
                        style={styles.signIn} >
                        <Text style={[styles.textSign, {color:'#fff'}]}>
                            Sign In</Text>
                    </LinearGradient>
                    </TouchableOpacity>
                    {/* Sign Up Button */}
                    <TouchableOpacity onPress={()=>navigation.navigate('SignUpScreen')}
                        style={[styles.signIn, {borderColor:'#009387', borderWidth: 1, marginTop: 15}]}
                    >
                        <Text st={[styles.textSign, {color: '#009387'}]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );    
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
