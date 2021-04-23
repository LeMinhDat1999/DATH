import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert,
    FlatList,
    RefreshControl
} from 'react-native';
import { Host as host } from '../app.json';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import  AsyncStorage  from '@react-native-community/async-storage';

class ViewProfile extends React.Component {
    constructor(props) {
        super(props);
        const { idAccountTuyenDung, idTuyenDung, TieuDe, HinhThuc, ThoiGian, Luong, DiaChi, NoiDung } = this.props.route.params;
        this.state = {
            isLoading: false,
            dataProfile: [],
            dataSource: [],
            fromData: {
                idAccount:'',
                idTuyenDung: idTuyenDung,
                idAccountTuyenDung: idAccountTuyenDung,
                TieuDe: TieuDe,
                HinhThuc: HinhThuc,
                ThoiGian: ThoiGian,
                Luong: Luong,
                DiaChi: DiaChi,
                NoiDung: NoiDung,
            }
        }
    }
    componentDidMount = async () => {
        await AsyncStorage.getItem('@Log',(err, result)=>{
            this.setState({fromData:{...this.state.fromData, idAccount: result}})
        });
        await this._ViewProfile()
        await this._loadDeXuatProFile()
    }

    _ViewProfile = async () => {
        await fetch(host + '/ViewProfile/ViewProfile.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idAccountTuyenDung: this.state.fromData.idAccountTuyenDung })
        })
            .then((response) => response.json())
            .then((json) => {
                this.setState({ 
                    isLoading: false,
                    dataProfile: json });
            })
            .catch((error) => {
                console.error(error);
                return Alert.alert('', 'Không thể kết nối tới máy chủ :(');
            });
    }
    _loadDeXuatProFile = async () => {
        await fetch(host + '/DanhSach/DeXuatProFile.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.fromData)
        })
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    isLoading: false,
                    dataSource: json
                })
            })
            .catch((error) => {
                console.error(error);
                return Alert.alert('', 'Không thể kết nối tới máy chủ :(');
            });
    }

    _Apply = async () => {
        await fetch(host + '/Apply/Apply.php', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.fromData)
          })
            .then((response) => response.json())
            .then((json) => {
              if (JSON.stringify(json) == 1)
                return Alert.alert('', 'Apply thành công');
              else if (JSON.stringify(json) == 2)
                return Alert.alert('', 'Apply thất bại');
            }) 
            .catch((error) => {
              console.error(error);
              return Alert.alert('', 'Không thể kết nối tới máy chủ :(');
            });
    }
    _onRefresh() {
        this.setState({ isLoading: true, }, () => { this.componentDidMount(); });
    }
    renderItem = ({ item, index }) => {
        return (
            <View >
                <TouchableOpacity onPress={() => {
                    this.props.navigation.replace('ViewProfile', {
                        idTuyenDung: item.idTuyenDung,
                        idAccountTuyenDung: item.idAccount,
                        TieuDe: item.TieuDe,
                        HinhThuc: item.TenHinhThuc,
                        ThoiGian: item.ThoiGian,
                        Luong: item.Luong,
                        DiaChi: item.DiaChi,
                        NoiDung: item.NoiDung,
                    })
                }}>
                    <View style={styles.cardBody}>
                        <Image style={styles.avataList}
                            source={{
                                uri: item.Image,
                            }}
                        />
                        <View style={styles.cardLeft}>
                            <Text style={styles.cardName}>{item.TieuDe}</Text>
                            <View style={styles.cardRow}>
                                <FontAwesome5 name="business-time" style={{ paddingTop: 3 }} size={16} />
                                <Text style={styles.cardText}>{item.ThoiGian}</Text>
                            </View>
                            <View style={styles.cardRow}>
                                <FontAwesome5 name="dollar-sign" style={{ paddingTop: 3, paddingLeft: 3, }} size={16} />
                                <Text style={styles.cardText}>{item.Luong}</Text>
                            </View>
                            <View style={styles.cardRow}>
                                <FontAwesome5 name="map-marker-alt" style={{ paddingTop: 3, paddingLeft: 2 }} size={16} />
                                <Text style={styles.cardText}>{item.DiaChi}</Text>
                            </View>
                        </View>

                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    render = () => {
        let { dataSource, isLoading } = this.state;
        let HoTen, Avata, Phone, DiaChi, Email;
        this.state.dataProfile.map((item) => {
            HoTen = item.HoTen;
            Avata = item.Image;
            Phone = item.Phone;
            DiaChi = item.DiaChi;
            Email = item.idAccount;
        });
        const getHeader = () => {
        return (
                <View style={styles.container}>
                  
                    <View style={styles.Body}>
                        <View style={styles.userInfo}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={styles.avata}
                                    source={{
                                        uri: Avata,
                                    }}
                                />
                                <View style={{ marginLeft: 20 }}>
                                    <Text style={{ marginTop: 40, marginBottom: 20, fontSize: 20, fontWeight: 'bold', color: 'red'}}>
                                        {HoTen}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.userInfo}>
                            <View style={styles.row}>
                                <FontAwesome5 name="envelope" size={20} />
                                <Text style={{ marginLeft: 20,fontSize: 17, fontWeight: 'bold', }}>{Email}</Text>
                            </View>
                        </View>
                    
                        <View style={styles.userInfo}>
                            <View style={styles.row}>
                                <FontAwesome5 name="phone" size={20} />
                                <Text style={{ marginLeft: 20,fontSize: 17, fontWeight: 'bold', }}>{Phone}</Text>
                            </View>
                        </View>  
                        <View style={styles.userInfo}>
                            <View style={styles.row}>
                                <FontAwesome5 name="map-marker-alt" size={20} />
                                <Text style={{ marginLeft: 20,fontSize: 17, fontWeight: 'bold', }}>{DiaChi}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.Body}>
                        <View style={styles.cardHeaderContainer}>
                            <Text style={styles.cardHeader}>Chi Tiết Công Việc</Text>
                        </View>

                        <View style={styles.userInfo}>
                            <View style={styles.row}>
                                <FontAwesome5 name="bookmark" size={20} />
                                <Text style={{ marginLeft: 20,fontSize: 17, fontWeight: 'bold', fontSize: 15 }}>{this.state.fromData.TieuDe}</Text>
                            </View>
                        </View>

                        <View style={styles.userInfo}>
                            <View style={styles.row}>
                                <FontAwesome5 name="user-clock" size={20} />
                                <Text style={{ marginLeft: 20,fontSize: 17, fontWeight: 'bold', }}>{this.state.fromData.HinhThuc}</Text>
                            </View>
                        </View>

                        <View style={styles.userInfo}>
                            <View style={styles.row}>
                                <FontAwesome5 name="clock" size={20} />
                                <Text style={{ marginLeft: 20,fontSize: 17, fontWeight: 'bold', }}>{this.state.fromData.ThoiGian}</Text>
                            </View>
                        </View>

                        <View style={styles.userInfo}>
                            <View style={styles.row}>
                                <FontAwesome5 name="dollar-sign" size={20} />
                                <Text style={{ marginLeft: 20,fontSize: 17, fontWeight: 'bold', }}>{this.state.fromData.Luong}</Text>
                            </View>
                        </View>

                        <View style={styles.userInfo}>
                            <View style={styles.row}>
                                <FontAwesome5 name="map-marker-alt" size={20} />
                                <Text style={{ marginLeft: 20,fontSize: 17, fontWeight: 'bold', }}>{this.state.fromData.DiaChi}</Text>
                            </View>
                        </View>

                        <View style={styles.userInfo}>
                            <View style={styles.row}>
                                <FontAwesome5 name="align-justify" size={20} />
                                <Text style={{ marginLeft: 20,fontSize: 17, fontWeight: 'bold', }}>{this.state.fromData.NoiDung}</Text>
                            </View>
                        </View>
                    </View>
                     <View style={styles.cardHeaderContainer}>
                    <Text style={styles.cardHeader}>Đề Xuất</Text>
                </View>
                </View>
                    
        );
    }    
     return (       
        <View style={styles.container}>                    
                <FlatList 
                    data={dataSource}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    onRefresh={() => this._onRefresh()}
                    refreshing={isLoading}
                    ListHeaderComponent={getHeader}
                />
            <TouchableOpacity style={styles.commandButton} onPress={this._Apply}>
                <Text style={styles.panelButtonTitle}>Apply</Text>
              </TouchableOpacity>
        </View>
          
        );
    }
}

export default ViewProfile;
const styles = StyleSheet.create({
    panelButtonTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
      },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom:10,
      },
    Body: {
        padding: 10,
        backgroundColor: '#fff',
        margin: 5,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    container: {
        flex: 1,
        backgroundColor: '#f0ffff',
    },
    userInfo: {
        paddingHorizontal: 20,
        paddingTop: 5,
        paddingBottom: 5,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'black',

    },
    row: {
        flexDirection: 'row',
        height: 25,
    },
    menuItem: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 5,
        marginBottom: 15,
    },
    menuItemText: {
        paddingLeft: 10,
        paddingTop: 10,

    },
    avata: {
        height: 100,
        width: 100,
        backgroundColor: 'gray',
        borderRadius: 50,
    },
    avataList: {
        marginTop: 10,
        height: 100,
        width: 100,
        backgroundColor: 'gray',
    },
    cardHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    cardHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color:'red'
    },
    cardRow: {
        flexDirection: 'row',
    },
    cardBody: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#ffffff',
        margin: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderRadius: 20,
    },
    cardLeft: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 5,
    },
    cardName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red'
    },
    cardText: {
        paddingLeft: 10,
        fontSize: 17,
        fontWeight: 'bold',
    },
});