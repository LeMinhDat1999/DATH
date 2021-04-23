import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    Alert,
    FlatList
} from 'react-native';
import { Host as host } from '../app.json';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';

class DSDangTuyen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            dataSource: [],
            fromData: {
                idAccount: '',
            }
        }
    }
    componentDidMount = async () => {
        await AsyncStorage.getItem('@Log', (err, result) => {
            this.setState({ fromData: { ...this.state.fromData, idAccount: result } })
        });
        await fetch(host + '/DanhSach/DSDangTuyen.php', {
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
                    dataSource: json
                })
            })
            .catch((error) => {
                console.error(error);
                return Alert.alert('', 'Không thể kết nối tới máy chủ :(');
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
                <TouchableOpacity style={styles.commandButton} onPress={() => {
                    this.props.navigation.navigate('DSApply', {
                        idTuyenDung: item.idTuyenDung,
                    })
                }}>
                    <Text style={styles.panelButtonTitle}>Xem Danh Sách Ứng Viên Apply</Text>
                </TouchableOpacity>
            </View>

        )
    }
    render() {
        let { dataSource, isLoading } = this.state
        return (

            <View style={styles.Container}>
                <View style={styles.cardHeaderContainer}>
                    <Text style={styles.cardHeader}>Danh Sách Đăng Tuyển Của Bạn</Text>
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

export default DSDangTuyen;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#f0ffff',
    },
    cardRow: {
        flexDirection: 'row',
    },
    commandButton: {
        padding: 15,
        borderRadius: 30,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 1,
        marginLeft: 10,
        marginRight: 10,
    },
    cardBody: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#ffffff',
        marginTop: 15,
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
    cardLeft: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 5,
    },
    avata: {
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
    cardHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    cardHeader: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardMore: {
        fontWeight: 'bold',
    },
    panelButtonTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
      },
});