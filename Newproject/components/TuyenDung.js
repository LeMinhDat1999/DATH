import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  ImageBackground,
  ScrollView
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Host as host } from '../app.json';
import AsyncStorage from '@react-native-community/async-storage';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { Picker } from '@react-native-picker/picker';

class TuyenDung extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataHinhThuc: [],
      formData: {
        idAccount: '',
        TieuDe: '',
        idHinhThuc: '',
        idGioiTinh:'',
        ThoiGian: '',
        Luong: '',
        DiaChi: '',
        NoiDung: '',
      }
    }
  }
  componentDidMount = async () => {
    await AsyncStorage.getItem('@Log', (err, result) => {
      this.setState({ formData: { ...this.state.formData, idAccount: result } });
    });

    await fetch(host + '/TuyenDung/DataHinhThuc.php', {
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
          dataHinhThuc: json
        })
      })
      .catch((error) => {
        console.error(error);
        return Alert.alert('', 'Không thể kết nối tới máy chủ :(');
      });
  }


  renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} /*onPress={this.takePhotoFromCamera.bind(this)}*/>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} /*onPress={this.choosePhotoFromLibrary.bind(this)}*/>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => this.bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  )

  bs = React.createRef();
  fall = new Animated.Value(1);

  _DangTuyen = async () => {
    if (!this.state.formData.TieuDe)
      return Alert.alert('', 'Tiêu đề không để trống');
    if (!this.state.formData.ThoiGian)
      return Alert.alert('', 'Thời gian không để trống');
    if (!this.state.formData.DiaChi)
      return Alert.alert('', 'Địa chỉ không để trống');

    await fetch(host + '/TuyenDung/TuyenDung.php', {
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
          return Alert.alert('', 'Đăng tuyển thành công');
        else if (JSON.stringify(json) == 2)
          return Alert.alert('', 'Đăng tuyển thất bại');
      })
      .catch((error) => {
        console.error(error);
        return Alert.alert('', 'Không thể kết nối tới máy chủ :(');
      });
  }
  render() {
    const { TieuDe, ThoiGian, Luong, DiaChi, NoiDung } = this.state.formData;
    return (
      <>
        <View style={styles.container}>
          <BottomSheet
            ref={this.bs}
            snapPoints={[330, 0]}
            renderContent={this.renderInner}
            renderHeader={this.renderHeader}
            initialSnap={1}
            callbackNode={this.fall}
            enabledGestureInteraction={true}
          />
          <ScrollView>
            <Animated.View style={{
              margin: 20,
              opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
            }}>
              <View style={{ alignItems: 'center' }}>
                <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
                  <View
                    style={{
                      height: 150,
                      width: 250,
                      borderRadius: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <ImageBackground
                      source={require('../image/Findjob.png')}
                      style={{ height: 150, width: 350 }}
                      imageStyle={{ borderRadius: 15 }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                        }}>
                        <FontAwesome5
                          name="camera"
                          size={35}
                          color="black"
                          style={{
                            opacity: 0.7,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 1,
                            borderColor: '#fff',
                            borderRadius: 10,
                          }}
                        />
                      </View>
                    </ImageBackground>
                  </View>
                </TouchableOpacity>
                <Text style={{ marginTop: 10, fontSize: 15, fontWeight: 'bold' }}>
                  Thêm Hình Ảnh Mô Tả Công Việc
          </Text>
              </View>
              <View style={styles.action}>
                <FontAwesome5 name="bookmark" size={20} />
                <TextInput
                  placeholder="Tiêu đề"
                  placeholderTextColor="#666666"
                  autoCorrect={false}
                  style={[
                    styles.textInput,
                  ]}
                  onChangeText={TieuDe => this.setState({
                    formData: { ...this.state.formData, TieuDe }
                  })}
                  value={TieuDe}
                />
              </View>
              <View style={styles.action}>
                <FontAwesome5 name="user-clock" size={20} />
                <Picker

                  selectedValue={this.state.formData.idHinhThuc}
                  style={styles.Picker}
                  onValueChange={idHinhThuc =>
                    this.setState({
                      formData: { ...this.state.formData, idHinhThuc }
                    })}>
                  {
                    this.state.dataHinhThuc.map((item, index) =>
                      <Picker.Item key={item.idHinhThuc} label={item.TenHinhThuc} value={item.idHinhThuc} />
                    )
                  }
                </Picker>
              </View>
              <View style={styles.action}>
                <FontAwesome5 name="venus-mars" size={20} />
                <Picker
                  selectedValue={this.state.formData.idGioiTinh}
                  style={styles.Picker}
                  onValueChange={(idGioiTinh) => this.setState({
                    formData: { ...this.state.formData, idGioiTinh }
                  })}>
                  <Picker.Item label="Nam" value="0" />
                  <Picker.Item label="Nữ" value="1" />
                </Picker>
              </View>
              <View style={styles.action}>
                <FontAwesome5 name="clock" size={20} />
                <TextInput
                  placeholder="Thời Gian"
                  placeholderTextColor="#666666"
                  autoCorrect={false}
                  style={[
                    styles.textInput,

                  ]}
                  onChangeText={ThoiGian => this.setState({
                    formData: { ...this.state.formData, ThoiGian }
                  })}
                  value={ThoiGian}
                />
              </View>
              <View style={styles.action}>
                <FontAwesome5 name="dollar-sign" size={20} />
                <TextInput
                  placeholder="Lương"
                  placeholderTextColor="#666666"
                  keyboardType="number-pad"
                  autoCorrect={false}
                  style={[
                    styles.textInput,

                  ]}
                  onChangeText={Luong => this.setState({
                    formData: { ...this.state.formData, Luong }
                  })}
                  value={Luong}
                />
              </View>
              <View style={styles.action}>
                <FontAwesome5 name="map-marker-alt" size={20} />
                <TextInput
                  placeholder="Địa Chỉ"
                  placeholderTextColor="#666666"
                  autoCorrect={false}
                  style={[
                    styles.textInput,

                  ]}
                  onChangeText={DiaChi => this.setState({
                    formData: { ...this.state.formData, DiaChi }
                  })}
                  value={DiaChi}
                />
              </View>
              <View style={styles.action}>
                <FontAwesome5 name="align-justify" size={20} />
                <TextInput
                  placeholder="Nội Dung"
                  placeholderTextColor="#666666"
                  autoCorrect={false}
                  style={[
                    styles.textInput,

                  ]}
                  onChangeText={NoiDung => this.setState({
                    formData: { ...this.state.formData, NoiDung }
                  })}
                  value={NoiDung}
                />
              </View>
              <TouchableOpacity style={styles.commandButton} onPress={this._DangTuyen}>
                <Text style={styles.panelButtonTitle}>Đăng Tuyển</Text>
              </TouchableOpacity>
            </Animated.View>
          </ScrollView>
        </View>

      </>

    )
  }
};
export default TuyenDung;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0ffff',
  },
  commandButton: {
    padding: 15,
    borderRadius: 30,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },

  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingTop: 5,
    paddingLeft: 10
  },

  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    fontSize: 17,
    fontWeight: 'bold',
    color: 'red',
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 30,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    borderRadius: 30,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  Picker: {
    height: 45,
    width: 100,
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    fontSize: 17,
    fontWeight: 'bold',
    color: 'red',
  }
});



