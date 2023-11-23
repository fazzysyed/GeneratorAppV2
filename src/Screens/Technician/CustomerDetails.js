import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Platform,
  Linking,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Layout from '../../components/Layout';
import Icon from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Email from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {useSelector} from 'react-redux';
import Button from '../../components/Button';
import IconC from 'react-native-vector-icons/AntDesign';
import {black} from 'react-native-paper/lib/typescript/styles/colors';
import Direction from 'react-native-vector-icons/Entypo';
import MobileLocation from '../../Helper/MobileLocation';

const CustomerDetails = ({navigation, route}) => {
  const scrollViewRef = useRef();

  const user = useSelector(state => state.Reducer.user);
  const [generators, setGenerators] = useState([]);
  const [loading, setLoading] = useState(false);
  const {item} = route.params;
  const [selected, setSelected] = useState(0);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const onSelection = item => {
    let selectedID = selected;
    if (selectedID === item.id) {
      setSelected(0);
    } else {
      setSelected(item.id);
    }
  };

  const getUsersLocation = async () => {
    let res = await MobileLocation.getCurrentLocation();
    console.log(res, 'IOS LOCATION');

    if (res === undefined) {
      setTimeout(async () => {
        res = await MobileLocation.getCurrentLocation();
        console.log(res, 'hello this is for thest');
        if (res) {
          setLat(res.coords.latitude);
          setLong(res.coords.longitude);
        }
      }, 1000);
    } else {
      setLat(res.coords.latitude);
      setLong(res.coords.longitude);
    }
  };

  useEffect(() => {
    getUsersLocation();
    if (item) {
      setLoading(true);
      var config = {
        method: 'get',
        url: `https://zacharydevworks.com/generator_app_backend/api/customer-generator/${item.id}`,
        headers: {
          Accept: 'application/json',

          Authorization: `Bearer ${user.access_token}`,
        },
      };
      axios(config)
        .then(function (response) {
          console.log(response.data);
          setGenerators(response.data.generators);

          if (response.data.generators) {
            onSelection(response.data.generators[0]);
          }

          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          setLoading(false);
        });
    }
  }, []);

  return (
    <Layout back navigation={navigation}>
      <View
        onPress={() => {
          navigation.navigate('CustomerDetial', {
            item: item,
          });
        }}
        style={styles.card}>
        <View style={{marginRight: 10}}>
          <View
            style={{
              height: 70,
              width: 70,
              marginTop: 20,
              borderRadius: 35,
              marginHorizontal: 10,
            }}>
            {item.profile ? (
              <Image
                source={require('../../Assets/Images/user.png')}
                style={{height: '100%', width: '100%'}}
              />
            ) : (
              <View
                style={{
                  backgroundColor: '#004890',
                  height: '100%',
                  width: '100%',
                  borderRadius: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    textTransform: 'capitalize',
                    color: 'white',
                  }}>
                  {Array.from(item.fname)[0]}
                </Text>
              </View>
            )}
          </View>
          <Text
            style={{
              color: '#222222',
              fontWeight: 'bold',
              marginVertical: 10,
              textAlign: 'center',
              fontSize: 17,
            }}>
            {item.fname}
          </Text>
        </View>
        <View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
            <Icon name="location-pin" color={'#004890'} size={25} />
            <Text style={{color: '#222222', width: 150, marginHorizontal: 10}}>
              {item.address ? item.address : 'not updated yet.'}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Feather name="phone-call" color={'#004890'} size={25} />
            <Text style={{color: '#222222', width: 150, marginHorizontal: 10}}>
              {item.phone ? item.phone : 'not updated yet.'}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Email name="email" color={'#004890'} size={25} />
            <Text
              style={{
                color: '#222222',
                width: 150,
                marginHorizontal: 10,
                marginVertical: 10,
              }}>
              {item.email ? item.email : 'not updated yet.'}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              let lat1 = parseFloat(item.latitude);
              let lon = parseFloat(item.longitude);

              console.warn(lat + `,` + long);
              if (Platform === 'android' || 'ios') {
                Linking.openURL(
                  `https://www.google.com/maps/dir/?api=1&origin=` +
                    lat +
                    `,` +
                    long +
                    `&destination=` +
                    lat1 +
                    `,` +
                    lon +
                    `&travelmode=driving`,
                );
              } else {
                console.log('Something Went Wrong?');
              }
            }}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Direction name="direction" color={'#004890'} size={25} />
            <Text
              style={{
                color: '#222222',
                width: 150,
                marginHorizontal: 10,
                marginVertical: 10,
              }}>
              Start Route
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-end',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {route.params.incompleted && (
          <Text
            style={{
              color: 'red',
              // width: 150,
              fontWeight: '600',
              marginHorizontal: 10,
              marginVertical: 10,
              fontSize: 18,
            }}>
            Has incomplete service call
          </Text>
        )}

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('History', {
              userId: item.id,
            });
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#004890',
            width: 200,
            alignSelf: 'flex-end',
            justifyContent: 'center',
            marginVertical: 10,
            borderRadius: 5,
          }}>
          <Text
            style={{
              color: '#FFFFFF',
              // width: 150,
              marginHorizontal: 10,
              marginVertical: 10,
            }}>
            History
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        ref={scrollViewRef}
        data={generators}
        ListFooterComponent={() => <View style={{height: 30}} />}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              onSelection(item);
              scrollViewRef.current.scrollToEnd({animated: true});
            }}
            style={styles.cardGen}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  color: '#222222',
                  fontWeight: 'bold',
                  marginVertical: 5,
                  fontSize: 17,
                }}>
                Generators
              </Text>
              <View
                style={{
                  backgroundColor: selected === item.id ? '#004890' : '#FFFFFF',
                  height: 30,
                  width: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: '#004890',
                }}>
                <IconC name="check" color={'#ffffff'} size={20} />
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: '#222222',
                  fontWeight: 'bold',
                  marginVertical: 5,
                  textAlign: 'center',
                  fontSize: 17,
                }}>
                Brand
              </Text>
              <Text
                style={{
                  color: '#222222',
                  fontWeight: '400',
                  marginVertical: 5,
                  textAlign: 'center',
                  fontSize: 17,
                  marginHorizontal: 10,
                }}>
                {item.brand}
              </Text>
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    color: '#222222',
                    fontWeight: 'bold',
                    marginVertical: 5,
                    textAlign: 'center',
                    fontSize: 17,
                  }}>
                  Serial#
                </Text>
                <Text
                  style={{
                    color: '#222222',
                    fontWeight: '400',
                    marginVertical: 5,
                    textAlign: 'center',
                    fontSize: 17,
                    marginHorizontal: 10,
                  }}>
                  {item.sno}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    color: '#222222',
                    fontWeight: 'bold',
                    marginVertical: 5,
                    textAlign: 'center',
                    fontSize: 17,
                  }}>
                  Model#
                </Text>
                <Text
                  style={{
                    color: '#222222',
                    fontWeight: '400',
                    marginVertical: 5,
                    textAlign: 'center',
                    fontSize: 17,
                    marginHorizontal: 10,
                  }}>
                  {item.model_no}
                </Text>
              </View>
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    color: '#222222',
                    fontWeight: 'bold',
                    marginVertical: 5,
                    textAlign: 'center',
                    fontSize: 17,
                  }}>
                  Installed Date:
                </Text>
                <Text
                  style={{
                    color: '#222222',
                    fontWeight: '400',
                    marginVertical: 5,
                    textAlign: 'center',
                    fontSize: 17,
                    marginHorizontal: 10,
                  }}>
                  {item.install_date}
                </Text>
              </View>
            </View>
            <Text
              style={{
                color: '#222222',
                fontWeight: 'bold',
                marginVertical: 5,

                fontSize: 17,
              }}>
              Location:
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: '#222222',
                  fontWeight: '400',
                  marginVertical: 5,
                  // textAlign: 'center',
                  fontSize: 17,
                  marginHorizontal: 5,
                }}>
                {item.location}
              </Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  color: 'red',
                  fontWeight: '400',
                  marginVertical: 5,
                  textAlign: 'center',
                  fontSize: 12,
                }}>
                Generator Under Warranty:
              </Text>
              <Text
                style={{
                  color: 'red',
                  fontWeight: '400',
                  marginVertical: 5,
                  textAlign: 'center',
                  fontSize: 12,
                  marginHorizontal: 5,
                }}>
                {item.warranty_sdate}
              </Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  color: 'red',
                  fontWeight: '400',
                  marginVertical: 5,
                  textAlign: 'center',
                  fontSize: 12,
                }}>
                Transfer Switch Under Warranty:
              </Text>
              <Text
                style={{
                  color: 'red',
                  fontWeight: '400',
                  marginVertical: 5,
                  textAlign: 'center',
                  fontSize: 12,
                  marginHorizontal: 5,
                }}>
                {item.warranty_sdate}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {selected ? (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Button
              title={'Start Spring Service'}
              onPress={() => {
                navigation.navigate('Reading', {
                  fromfirstScreen: {
                    service_type: 'Spring Service',
                    user_id: item.id,
                    generator_id: selected,
                  },
                });
              }}
              width={160}
            />
            <Button
              title={'Start Fall Service'}
              width={160}
              onPress={() => {
                navigation.navigate('Reading', {
                  fromfirstScreen: {
                    service_type: 'Fall Service',
                    user_id: item.id,
                    generator_id: selected,
                  },
                });
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Button
              title={'Start Service Call'}
              onPress={() => {
                navigation.navigate('Reading', {
                  fromfirstScreen: {
                    service_type: 'Service Call',
                    user_id: item.id,
                    generator_id: selected,
                  },
                });
              }}
              width={160}
            />
            <Button
              title={'Start Warranty Call'}
              width={160}
              onPress={() => {
                navigation.navigate('Reading', {
                  fromfirstScreen: {
                    service_type: 'Warranty Call',
                    user_id: item.id,
                    generator_id: selected,
                    sno: generators[0].sno,
                    model: generators[0].model_no,
                  },
                });
              }}
            />
          </View>
        </>
      ) : null}
    </Layout>
  );
};

export default CustomerDetails;

const styles = StyleSheet.create({
  card: {
    height: 200,
    backgroundColor: 'white',
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0048908F',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  cardGen: {
    // height:250,
    backgroundColor: 'white',
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0048908F',

    padding: 20,
    // alignItems:"center",
  },
});
