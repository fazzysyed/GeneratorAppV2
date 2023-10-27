import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import Layout from '../../components/Layout';
import Camera from 'react-native-vector-icons/Feather';
import {launchCamera} from 'react-native-image-picker';
import Button from '../../components/Button';
import SimpleToast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/AntDesign';

const SpringFallSerivce4 = ({navigation, route}) => {
  const {fromFourthScreen} = route.params;
  const [selected, setSelected] = useState(false);
  const [image, setImage] = useState(null);

  const getImage = () => {
    launchCamera({noData: true, quality: 1}, response => {
      console.log(response, 'HHHHHH');

      if (response.assets) {
        setImage(response.assets[0]);
      }
    });
  };

  useEffect(() => {
    if (fromFourthScreen) {
      setSelected(
        fromFourthScreen.incompleted ? fromFourthScreen.incompleted : false,
      );
    }
  }, []);
  return (
    <Layout back navigation={navigation}>
      <View style={{justifyContent: 'space-between', flex: 1}}>
        <View>
          <Text
            style={{
              color: '#222222',
              fontWeight: 'bold',
              marginVertical: 10,
              alignSelf: 'center',
              marginHorizontal: 30,
              textAlign: 'center',
            }}>
            Image of inside of generator
          </Text>
          {!image ? (
            <TouchableOpacity
              onPress={getImage}
              style={{
                backgroundColor: 'white',
                marginVertical: 10,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#0048908F',
                height: 300,

                padding: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Camera color={'#004890'} name="camera" size={100} />
            </TouchableOpacity>
          ) : (
            <View
              style={{
                backgroundColor: 'white',
                marginVertical: 10,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#0048908F',
                height: 300,
              }}>
              <Image
                source={{uri: image.uri}}
                style={{height: '100%', width: '100%'}}
              />
            </View>
          )}
        </View>

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
        <View style={{marginVertical: 200}}>
          <Button
            title={'Next'}
            width={160}
            onPress={() => {
              if (image) {
                let newData = {
                  ...fromFourthScreen,
                  inside_generator: image,
                  incompleted: selected,
                };
                navigation.replace('SpringFallSerivce5', {
                  fromFifthScreen: newData,
                });
              } else {
                SimpleToast.show('Image is required.');
              }
            }}
          />
        </View>
      </View>
    </Layout>
  );
};

export default SpringFallSerivce4;

const styles = StyleSheet.create({});
