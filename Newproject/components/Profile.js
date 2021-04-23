import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert,
    RefreshControl
} from 'react-native';
import  AsyncStorage  from '@react-native-community/async-storage';
import { Host as host } from '../app.json';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            isLoading: false,
            dataProfile: [],
            fromData: {
                idAccount: '',
            }
        };
    }
    _DangXuat = async () => {
		await AsyncStorage.clear();
		this.props.navigation.replace('DangNhap');
	}
    componentDidMount = async () => {
        await AsyncStorage.getItem('@Log',(err, result)=>{
            this.setState({fromData:{...this.state.fromData, idAccount: result}})
        });
        fetch(host + '/Profile/Profile.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idAccount: this.state.fromData.idAccount })
        })
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    isLoading: false,
                    dataProfile: json
                })
            })
            .catch((error) => {
                console.error(error);
                return Alert.alert('', 'Không thể kết nối tới máy chủ :(');
            });
        }
        _onRefresh() {
            this.setState({ isLoading: true, }, () => { this.componentDidMount(); });
        }

    render(){
        let { isLoading } = this.state;
        let HoTen,Avata, Phone, DiaChi, Email;
        this.state.dataProfile.map((item) => {
            HoTen = item.HoTen;
            Avata=item.Image;
            Phone = item.Phone;
            DiaChi = item.DiaChi;
            Email = item.idAccount;
        });
        return(
            <>
                <SafeAreaView style={styles.container}>
                    <ScrollView 
                    refreshControl={
                        <RefreshControl
                        refreshing={isLoading}
                        onRefresh={this._onRefresh.bind(this)}/>
                        }>
                    <View style={styles.Body}>
                    <View style={styles.userInfoAvata}>
                        <View style={{flexDirection:'row'}}>
                            <Image style={styles.avata}
                               source={{ uri: Avata,}}
                                
                                />
                                <View style={{marginLeft: 20}}>
                                <Text style={{marginTop:40, marginBottom:20, fontSize: 20 ,fontWeight: 'bold',color: 'red'}}>
                                    {HoTen}
                                </Text>
                                </View>
                        </View>
                    </View>
                    </View>

                    <View style={styles.Body}>
                    <View style={styles.userInfo}>
                        <View style={styles.row}>
                                <FontAwesome5 name="envelope" size={20}/>
                                <Text style={{marginLeft:20, fontSize: 17,fontWeight: 'bold',}}>{Email}</Text>
                        </View>
                    </View>

                    <View style={styles.userInfo}>
                        <View style={styles.row}>
                                <FontAwesome5 name="phone" size={20}/>
                                <Text style={{marginLeft:20, fontSize: 17,fontWeight: 'bold'}}>{Phone}</Text>
                        </View>
                    </View>
                    <View style={styles.userInfo}>
                        <View style={styles.row}>
                                <FontAwesome5 name="map-marker-alt" size={20}/>
                                <Text style={{marginLeft:20, fontSize: 17,fontWeight: 'bold'}}>{DiaChi}</Text>
                        </View>
                    </View>
                    </View>

                    <View style={styles.Body}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('DSDangTuyen')}>
                        <View style={styles.menuItem}>
                            <FontAwesome5 name="list-alt" size={32}/>
                            <Text style={styles.menuItemText}>Danh Sách Đăng Tuyển Của Bạn</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('DSUngTuyen')}>
                        <View style={styles.menuItem}>
                            <FontAwesome5 name="list-alt" size={32}/>
                            <Text style={styles.menuItemText}>Danh Sách Ứng Tuyển Của Bạn</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Update', {idAccount: Email})}>
                        <View style={styles.menuItem}>
                            <FontAwesome5 name="pen-square" size={32}/>
                            <Text style={styles.menuItemText}>Cập Nhật Thông Tin</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._DangXuat}>
                        <View style={styles.menuItem}>
                            <FontAwesome5 name="sign-out-alt" size={32}/>
                            <Text style={styles.menuItemText}>Đăng Xuất</Text>
                        </View>
                    </TouchableOpacity>
                    </View>
                    </ScrollView>
                </SafeAreaView>
                
            </>
        );
    };
};

export default Profile;
const styles=StyleSheet.create({
    Body:{
        padding:5,
        backgroundColor:'#ffffff',
        margin:5,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderRadius: 20,
        shadowColor:'#000',
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.2,
        shadowRadius:4,
    },
    container:{
        flex:1,
        backgroundColor: '#f0ffff',
        paddingTop:20
    },
    userInfoAvata:{
        paddingHorizontal: 20,
        paddingTop: 5,
        marginBottom: 10,
    },
    userInfo:{
        paddingHorizontal: 20,
        paddingTop: 5,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    row:{
        flexDirection: 'row',
        height: 35,
        paddingTop:5,
    },
    menuItem:{
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 5,
        marginBottom: 15,
    },
    menuItemText:{
        paddingLeft: 10,
        paddingTop: 5,
        fontSize: 17,
        fontWeight: 'bold',
    },
    avata:{
        height:100,
        width:100,
        backgroundColor: 'gray',
        borderRadius: 50,
    }
});