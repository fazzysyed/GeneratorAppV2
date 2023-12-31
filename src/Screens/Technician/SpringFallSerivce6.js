import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import mime from 'mime';

import React, {useState, useEffect} from 'react';
import Layout from '../../components/Layout';
import Camera from 'react-native-vector-icons/Feather';
import {launchCamera} from 'react-native-image-picker';
import Button from '../../components/Button';
import SimpleToast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import axios from 'axios';
let width = Dimensions.get('window').width / 2.7;
let height = Dimensions.get('window').height / 7;
const SpringFallSerivce6 = ({navigation, route}) => {
  const {fromSixthScreen} = route.params;
  const [selectedIndex, setSelectedIndex] = useState('');
  const [selected, setSelected] = useState(false);
  const user = useSelector(state => state.Reducer.user);

  const [image, setImage] = useState([
    {
      id: 1,
      image: null,
    },
    {
      id: 2,
      image: null,
    },
    {
      id: 3,
      image: null,
    },
    {
      id: 4,
      image: null,
    },
    {
      id: 5,
      image: null,
    },
    {
      id: 6,
      image: null,
    },
    {
      id: 7,
      image: null,
    },
    {
      id: 8,
      image: null,
    },
  ]);

  useEffect(() => {
    if (fromSixthScreen) {
      setSelected(
        fromSixthScreen.incompleted ? fromSixthScreen.incompleted : false,
      );
    }
  }, []);
  const getImage = index => {
    launchCamera({noData: true, quality: 0.6}, response => {
      console.log(response, 'HHHHHH');

      if (response.assets) {
        setSelectedIndex(index);
        var newImage = {
          uri:
            Platform.OS === 'android'
              ? response.assets[0].uri
              : response.assets[0].uri.replace('file://', ''),
          type: mime.getType(response.assets[0].uri),
          name: response.assets[0].fileName,
        };
      } else {
        setSelectedIndex('index');
      }

      var data = new FormData();

      data.append('photo', newImage);

      var config = {
        method: 'post',
        url: 'https://zacharydevworks.com/generator_app_backend/api/service-call-photo',
        headers: {
          'Content-Type': 'multipart/form-data',

          Authorization: `Bearer ${user.access_token}`,
        },
        data: data,
      };

      axios(config)
        .then(function (res) {
          let newArray = [...image];
          newArray[index].image = response.assets[0];
          newArray[index].photo_id = res.data.photo_id;
          setSelectedIndex('');
          console.log(newArray, 'FJAJFAJFAJF');
          setImage(newArray);
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
          setSelectedIndex('');
        });
    });
  };
  return (
    <Layout back navigation={navigation}>
      <View style={{justifyContent: 'space-between', flex: 1}}>
        <Text
          style={{
            color: '#222222',
            fontWeight: 'bold',
            marginVertical: 10,
            alignSelf: 'center',
            marginHorizontal: 30,
            textAlign: 'center',
          }}>
          If you need take extra pictures
        </Text>

        <FlatList
          data={image}
          numColumns={2}
          renderItem={({item, index}) => (
            <View>
              {!item.image ? (
                <TouchableOpacity
                  onPress={() => getImage(index)}
                  style={{
                    backgroundColor: 'white',
                    marginVertical: 10,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: '#0048908F',
                    height: height,
                    width: width,
                    marginHorizontal: 10,
                    justifyContent: 'center',
                    padding: 20,

                    alignItems: 'center',
                  }}>
                  {selectedIndex === index ? (
                    <ActivityIndicator color={'#0048908F'} size={'large'} />
                  ) : (
                    <Camera color={'#004890'} name="camera" size={40} />
                  )}
                </TouchableOpacity>
              ) : (
                <View
                  style={{
                    backgroundColor: 'white',
                    marginVertical: 10,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: '#0048908F',
                    height: height,
                    width: width,
                    marginHorizontal: 10,
                  }}>
                  <Image
                    source={{uri: item.image.uri}}
                    style={{height: '100%', width: '100%'}}
                  />
                </View>
              )}
            </View>
          )}
        />

        <TouchableOpacity
          onPress={() => {
            setSelected(!selected);
          }}
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <Text
            style={{
              color: '#000',
              fontWeight: 'bold',
              marginVertical: 10,
              marginRight: 15,
              fontSize: 17,
            }}>
            Incomplete Job
          </Text>
          <View
            style={{
              backgroundColor: selected ? '#004890' : '#FFFFFF',
              height: 30,
              width: 30,

              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#004890',
            }}>
            <Icon
              name="check"
              color={selected ? '#FFFFFF' : '#FFFFFF'}
              size={20}
            />
          </View>
        </TouchableOpacity>
        <View style={{marginVertical: 30}}>
          <Button
            title={'Next'}
            width={160}
            onPress={() => {
              // if (image.some(e => e.image != null)) {
              let newData = {
                ...fromSixthScreen,
                extraImages: image,
                incompleted: selected,
              };
              console.log(newData);
              navigation.navigate('SpringFallSerivce7', {
                fromSeventhScreen: newData,
              });
              // } else {
              //   SimpleToast.show('Image is required.');
              // }
            }}
          />
        </View>
      </View>
    </Layout>
  );
};

export default SpringFallSerivce6;

const styles = StyleSheet.create({});
