import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Alert,
    FlatList
} from 'react-native';
import { Host as host } from '../app.json';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


class DSApply extends React.Component {
    constructor(props) {
        super(props);
        const { idTuyenDung } = this.props.route.params;
        this.state = {
            isLoading: false,
            dataProfile: [],
            fromData: {
                idTuyenDung: idTuyenDung,
            }
        }

    }
    componentDidMount = async () => {
        await fetch(host + '/DanhSach/DSApply.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idTuyenDung: this.state.fromData.idTuyenDung })
        })
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    isLoading: false,
                    dataProfile: json
                });
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
                <View style={styles.Body}>
                    <View style={styles.userInfo}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={styles.avata}
                                source={{
                                    uri: item.Image,
                                }}

                            />
                            <View style={{ marginLeft: 20 }}>
                                <Text style={{ marginTop: 40, marginBottom: 20, fontSize: 20, fontWeight: 'bold', color: 'red' }}>
                                    {item.HoTen}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.userInfo}>
                        <View style={styles.row}>
                            <FontAwesome5 name="envelope" size={20} />
                            <Text style={{ marginLeft: 20, fontSize: 17, fontWeight: 'bold' }}>{item.idAccount}</Text>
                        </View>
                    </View>
                    <View style={styles.userInfo}>
                        <View style={styles.row}>
                            <FontAwesome5 name="phone" size={20} />
                            <Text style={{ marginLeft: 20, fontSize: 17, fontWeight: 'bold' }}>{item.Phone}</Text>
                        </View>
                    </View>


                    <View style={styles.userInfo}>
                        <View style={styles.row}>
                            <FontAwesome5 name="map-marker-alt" size={20} />
                            <Text style={{ marginLeft: 20, fontSize: 17, fontWeight: 'bold' }}>{item.DiaChi}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    render() {
        let { dataProfile, isLoading } = this.state
        return (

            <View style={styles.Container}>
                <View style={styles.cardHeaderContainer}>
                    <Text style={styles.cardHeader}>Danh Sách Ứng Viên Đã Apply</Text>
                </View>
                <FlatList
                    data={dataProfile}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    onRefresh={() => this.onRefresh()}
                    refreshing={isLoading}
                />
            </View>
        )
    }
}

export default DSApply;

const styles = StyleSheet.create({
    Body: {
        padding: 5,
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
    Container: {
        flex: 1,
        backgroundColor: '#f0ffff',
    },
    userInfo: {
        paddingHorizontal: 20,
        paddingTop: 5,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    row: {
        flexDirection: 'row',
        height: 35,
        paddingTop: 5,
    },
    avata: {
        height: 100,
        width: 100,
        backgroundColor: 'gray',
        borderRadius: 50,
    },
    cardHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    cardHeader: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});