import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    Alert,
    ImageBackground,
    TextInput
} from 'react-native';
import { Host as host } from '../app.json';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import  AsyncStorage  from '@react-native-community/async-storage';

class DanhSach extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            dataSource: [],
            fromData: {
                idAccount: '',
                Search: '',
                GioiTinh:'',
                TenNganh:'',
                DiaChi:'',
            }
          

        }
    }
    async componentDidMount() {
        await AsyncStorage.getItem('@Log',(err, result)=>{
            this.setState({fromData:{...this.state.fromData, idAccount: result}})
        });
        await this._loadProfileDeXuat()
        await this._loadDeXuat()
    }
    _loadProfileDeXuat = async () => {
        await fetch(host + '/Profile/ProfileDeXuat.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idAccount: this.state.fromData.idAccount })
        })
            .then((response) => response.json())
            .then((json) => {
                json.map((item)=>{
                    this.setState({
                        isLoading: false,
                        fromData: {
                            ...this.state.fromData,
                            GioiTinh: item.GioiTinh,
                            TenNganh: item.TenNganh,
                            DiaChi: item.DiaChi,  
                        }
                });
                })
            })
            .catch((error) => {
               
                return Alert.alert('', 'Cập Nhật Thông Tin Cá Nhân Để Nhận Đề Xuất Cho Bạn :)');
            });
    }
    _loadShowAll = async () => {
        await fetch(host + '/DanhSach/DanhSach.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
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

    _loadDeXuat = async () => {
        await fetch(host + '/DanhSach/DSDeXuat.php', {
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

    _loadSearch = async () => {
        await fetch(host + '/DanhSach/DanhSach.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Search: this.state.fromData.Search })
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
                return Alert.alert('', 'Không tìm thấy kết quả :(');
            });
    }

    onRefresh() {
        this.setState({ isLoading: true, }, () => { this.componentDidMount(); });
    }

    renderItem = ({ item, index }) => {
        return (
            <View >
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('ViewProfile', {
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
                        <Image style={styles.avata}
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
    render() {
        const { Search } = this.state.fromData;
        let { dataSource, isLoading } = this.state
        return (

            <View style={styles.Container}>
                <ImageBackground source={require('../image/Findjob.png')}
                    style={styles.search}
                    imageStyle={{ borderRadius: 50, }}>
                    <View style={styles.action}>
                        <View style={styles.searchContainer}>
                            <FontAwesome5 name="pencil-alt" size={20} />
                            <TextInput
                                placeholder="Search..."
                                placeholderTextColor="red"
                                style={[
                                    styles.textInput,
                                ]}
                                onChangeText={Search => this.setState({
                                    fromData: { ...this.state.fromData, Search }
                                  })}
                                value={Search}
                            />
                            <View>
                                <TouchableOpacity onPress={this._loadSearch}>
                                    <FontAwesome5 name="search" size={20} />
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </ImageBackground>
                <View style={styles.cardHeaderContainer}>
                    <Text style={styles.cardHeader}>Đề Xuất Cho Bạn</Text>
                    <TouchableOpacity style={styles.cardHeaderContainershowall} onPress={this._loadShowAll}>
                        <Text style={styles.cardHeader}>Tất Cả</Text>
                        <FontAwesome5  name="list" size={25} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={dataSource}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    onRefresh={() => this.onRefresh()}
                    refreshing={isLoading}
                />
            </View>
        )
    }
}

export default DanhSach;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#f0ffff',
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
    avata: {
        marginTop: 10,
        height: 100,
        width: 100,
        backgroundColor: 'gray',
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
    search: {
        margin: 5,
        height: 250,
        marginTop: -40,
        marginBottom: 10,
    },
    action: {
        padding: 160,
        paddingHorizontal: 30,
    },
    searchContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: "#f0ffff",
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderRightWidth: 2,
        borderLeftWidth: 2,
        borderRadius: 20,
        borderColor: 'red',
    },
    textInput: {
        flex: 1,
        padding: -70,
        marginTop: Platform.OS === 'ios' ? 0 : 0,
        paddingLeft: 10,
        fontSize: 17,
        fontWeight: 'bold',
        color: 'red',
    },
    cardHeaderContainer: {
        flexDirection: 'row',
        marginLeft: 10,
        justifyContent: 'space-between',
        borderBottomWidth: 2,
    },
    cardHeaderContainershowall: {
        flexDirection: 'row',
        marginRight: 10,
    },
    cardHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginRight:10,
    },
});