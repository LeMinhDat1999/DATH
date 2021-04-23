import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  ScrollView,
  TextInput
} from 'react-native';
import { Host as host } from '../app.json';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { Picker } from '@react-native-picker/picker';
// import ImagePicker from 'react-native-image-crop-picker';



class Update extends React.Component {
  constructor(props) {
    super(props);
    const { idAccount } = this.props.route.params;
    this.state = {
      dataProfile: [],
      dataNganh: [],
      formData: {
        idAccount: idAccount,
        HoTen: '',
        idNganh: '',
        Phone: '',
        CMND: '',
        idGioiTinh: '',
        DiaChi: '',
      },
      image: '',
    }
  }

  async componentDidMount() {
    await this._LoaddataProfile();
    await this._LoaddataNganh();
  }

  _LoaddataProfile = async () => {
    await fetch(host + '/Profile/Profile.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ idAccount: this.state.formData.idAccount })
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

  _LoaddataNganh = async () => {
    await fetch(host + '/Update/DataNganh.php', {
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
          dataNganh: json
        })
      })
      .catch((error) => {
        console.error(error);
        return Alert.alert('', 'Không thể kết nối tới máy chủ :(');
      });
  }

  _CapNhat = async () => {
    if (!this.state.formData.HoTen)
      return Alert.alert('', 'Họ tên không để trống');
    if (!this.state.formData.Phone)
      return Alert.alert('', 'Phone không để trống');
    if (!this.state.formData.CMND)
      return Alert.alert('', 'CMND không để trống');
    if (!this.state.formData.DiaChi)
      return Alert.alert('', 'Địa chỉ không để trống');

    await fetch(host + '/Update/Updateprofile.php', {
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
          return Alert.alert('', 'Cập Nhật thành công');
        else if (JSON.stringify(json) == 2)
          return Alert.alert('', 'Cập Nhật thất bại');
      })
      .catch((error) => {
        console.error(error);
        return Alert.alert('', 'Không thể kết nối tới máy chủ :(');
      });
  }


  // takePhotoFromCamera = () => {
  //   ImagePicker.openCamera({
  //     compressImageMaxWidth: 300,
  //     compressImageMaxHeight: 300,
  //     cropping: true,
  //     compressImageQuality: 0.7
  //   }).then(image => {
  //     console.log(image);
  //     this.setState({
  //       image: { uri: image.path, width: image.width, height: image.height, mime: image.mime },
  //       images: null
  //     });
  //     this.bs.current.snapTo(1);
  //   });
  // }

  // choosePhotoFromLibrary = () => {
  //   ImagePicker.openPicker({
  //     width: 300,
  //     height: 300,
  //     cropping: true,
  //     compressImageQuality: 0.7
  //   }).then(image => {
  //     console.log(image);
  //     this.setState({
  //       image: { uri: image.path, width: image.width, height: image.height, mime: image.mime },
  //       images: null
  //     });
  //     this.bs.current.snapTo(1);
  //   });
  // }

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

  render() {
    const { HoTen, Phone, CMND, DiaChi } = this.state.formData;
    let Avata;
    this.state.dataProfile.map((item) => {
      Avata = item.Image;
    });
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
          <Animated.View style={{
            margin: 20,
            opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
          }}>
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
                <View
                  style={{
                    height: 200,
                    width: 100,
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ImageBackground
                    source={{
                      uri: Avata,
                    }}
                    style={{ height: 200, width: 200 }}
                    imageStyle={{ borderRadius: 15 }}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                      }}>
                      <Icon
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
              <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>
                {this.state.formData.idAccount}
              </Text>
            </View>

            <ScrollView>

              <View style={styles.action}>
                <FontAwesome name="user-o" size={20} />
                <TextInput
                  placeholder="Họ Tên"
                  placeholderTextColor="#666666"
                  autoCorrect={false}
                  style={[
                    styles.textInput,

                  ]}
                  onChangeText={HoTen => this.setState({
                    formData: { ...this.state.formData, HoTen }
                  })}
                  value={HoTen}
                />
              </View>
              <View style={styles.action}>
                <FontAwesome name="graduation-cap" size={20} />
                <Picker

                  selectedValue={this.state.formData.idNganh}
                  style={styles.Picker}
                  onValueChange={idNganh =>
                    this.setState({
                      formData: { ...this.state.formData, idNganh }
                    })}>
                  {
                    this.state.dataNganh.map((item, index) =>
                        <Picker.Item key={item.idNganh} label={item.TenNganh} value={item.idNganh} />
                    )
                  }
                </Picker>
              </View>
              <View style={styles.action}>
                <FontAwesome name="phone" size={20} />
                <TextInput
                  placeholder="Phone"
                  placeholderTextColor="#666666"
                  keyboardType="number-pad"
                  autoCorrect={false}
                  style={[
                    styles.textInput,

                  ]}
                  onChangeText={Phone => this.setState({
                    formData: { ...this.state.formData, Phone }
                  })}
                  value={Phone}
                />
              </View>
              <View style={styles.action}>
                <FontAwesome name="address-card" size={20} />
                <TextInput
                  placeholder="CMND"
                  placeholderTextColor="#666666"
                  autoCorrect={false}
                  style={[
                    styles.textInput,

                  ]}
                  onChangeText={CMND => this.setState({
                    formData: { ...this.state.formData, CMND }
                  })}
                  value={CMND}
                />
              </View>

              <View style={styles.action}>
                <FontAwesome name="venus-mars" size={20} />
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
                <Icon name="map-marker-outline" size={20} />
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

            </ScrollView>
            <TouchableOpacity style={styles.commandButton} onPress={this._CapNhat}>
              <Text style={styles.panelButtonTitle}>Cập Nhật</Text>
            </TouchableOpacity>
          </Animated.View>

        </View>
      </>
    );
  }
};

export default Update;

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
    borderRadius: 30,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    fontSize: 17,
    fontWeight: 'bold',
    color: 'red',
  },
  Picker: {
    height: 40,
    width: 100,
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    fontSize: 17,
    fontWeight: 'bold',
    color: 'red',
  }
});
