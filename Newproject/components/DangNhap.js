import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import  AsyncStorage  from '@react-native-community/async-storage';
import { Host as host } from '../app.json';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


class DangNhap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formData: {
                idAccount: '',
                MK: '',
            }
        }
        AsyncStorage.getItem('@Log',(err, result)=>{
           if(result != null) return this.props.navigation.replace('TrangChu');
        });
    }

    _checkLogin = async () => {
        if (!this.state.formData.idAccount)
            return Alert.alert('', 'Email không để trống');
        else if (!this.state.formData.MK)
            return Alert.alert('', 'Mật khẩu không để trống');

        await fetch(host + '/login/checkLogin.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.formData)
        })
            .then((response) => response.json())
            .then((json) => {
                if (JSON.stringify(json) == 1)
                    Alert.alert('', 'Sai thông tin đăng nhập');
                else {
                    AsyncStorage.setItem('@Log', this.state.formData.idAccount)
                    this.props.navigation.replace("TrangChu");
                }
            })
            .catch((error) => {
                console.error(error);
                return Alert.alert('', 'Không thể kết nối tới máy chủ :(');
            });
    }

    render() {
        const { idAccount, MK } = this.state.formData;
        return (
            <>
                <View style={styles.body}>
                <ImageBackground
                    source={require('../image/Findjob.png')}
                    style={{ height: 250, marginBottom: 30 }}
                    imageStyle={{ 
                        borderRadius: 30, 
                        marginTop: 10,}}>
                  </ImageBackground>
                  <View style={styles.cardHeaderContainer}>
                    <Text style={styles.cardHeader}>Đăng Nhập</Text>
                </View>
                  <View style={styles.action}>
                  <FontAwesome5 name="user" size={20} />
                    <TextInput
                         placeholder="Tên Đăng Nhập (Email)"
                         placeholderTextColor="#666666"
                         autoCorrect={true}
                         style={[
                            styles.textInput,
            
                          ]}
                        onChangeText={idAccount => this.setState({
                            formData: { ...this.state.formData, idAccount }
                        })}
                        value={idAccount}
                    />
                    </View>
                    <View style={styles.action}>
                    <FontAwesome5 name="lock" size={20} />
                    <TextInput
                        placeholder="Mật Khẩu"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={[
                          styles.textInput,
          
                        ]}
                        onChangeText={MK => this.setState({
                            formData: { ...this.state.formData, MK }
                        })}
                        secureTextEntry={true}
                        value={MK}
                    />
                    </View>
                    <View style={{ paddingTop: 10, }}></View>
                    <TouchableOpacity onPress={this._checkLogin}>
                        <Text style={styles.button}>Đăng nhập</Text>
                    </TouchableOpacity>
                    <View style={{ paddingTop: 10, }}></View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('DangKi')}>
                        <Text style={styles.button} >Đăng Kí</Text>
                    </TouchableOpacity>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#FF6347",
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        borderRadius: 20,
        height: 40,
        textAlign: "center",
        paddingTop: 5,
    },
    title: {
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        color: "red",
        paddingBottom: 10,
    },
    body: {
        flex: 1,
        backgroundColor: '#f0ffff',
        padding: 15,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        fontSize: 17,
        fontWeight: 'bold',
        color: 'red',
      },
      action: {
		backgroundColor: "#ffffff",
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 5,
        borderTopWidth:1,
        borderBottomWidth: 1,
        borderRightWidth:1,
        borderLeftWidth:1,
        borderRadius:15,
        borderColor: 'red',
        paddingTop: 10,
        paddingLeft: 10
      },
      cardHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    cardHeader: {
        fontSize: 25,
		fontWeight: 'bold',
		color:'red',
    },
});

export default DangNhap;