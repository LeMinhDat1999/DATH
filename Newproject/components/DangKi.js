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
import { Host as host } from '../app.json';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

class DangKy extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formData: {
				idAccount: '',
				MK: '',
			},
			confirmMK: '',
		}
	}
	_dangKy = async () => {
		if (!this.state.formData.idAccount)
			return Alert.alert('', 'Email không để trống');
		else if (!this.state.formData.MK)
			return Alert.alert('', 'Mật khẩu không để trống');
		else if (this.state.formData.MK != this.state.confirmMK)
			return Alert.alert('', 'Mật khẩu nhập lại không đúng');

		await fetch(host + '/DKTaiKhoan/RegisterAccount.php', {
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
					return Alert.alert('', 'Đăng ký thành công');
				else if (JSON.stringify(json) == 2)
					return Alert.alert('', 'Đăng ký thất bại');
			})
			.catch((error) => {
				console.error(error);
				return Alert.alert('', 'Không thể kết nối tới máy chủ :(');
			});
	}
	render() {
		const { idAccount, MK } = this.state.formData;
		const { confirmMK } = this.state;
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
                    <Text style={styles.cardHeader}>Đăng Kí</Text>
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
                    <FontAwesome5 name="unlock" size={20} />
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
					<View style={styles.action}>
                    <FontAwesome5 name="lock" size={20} />
                    <TextInput
                        placeholder="Nhập Lại Mật Khẩu"
                        placeholderTextColor="#666666"
                        style={[
                          styles.textInput,
                        ]}
                        onChangeText={confirmMK => this.setState({confirmMK})}
                        secureTextEntry={true}
                        value={confirmMK}
                    />
                    </View>
                    <View style={{ paddingTop: 10, }}></View>
                    <TouchableOpacity onPress={this._dangKy}>
                        <Text style={styles.button}>Đăng Kí</Text>
                    </TouchableOpacity>
                    <View style={{ paddingTop: 10, }}></View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('DangNhap')}>
                        <Text style={styles.button} >Trở Về Trang Đăng Nhập</Text>
                    </TouchableOpacity>
                </View>
			</>
		);
	}
};

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

export default DangKy;