import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '../../components/Layout';
import {TextInput} from 'react-native-paper';
import Button from '../../components/Button';
import {useSelector} from 'react-redux';
import axios from 'axios';
import SimpleToast from 'react-native-simple-toast';
const ServiceDetail = ({navigation, route}) => {
  const user = useSelector(state => state.Reducer.user);

  const {id} = route.params;
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [note, setNote] = useState('');
  const [data, setData] = useState([]);
  const [call, setCall] = useState({});
  const [reading, setReading] = useState(null);

  useEffect(() => {
    if (id) {
      var data = new FormData();

      var config = {
        method: 'get',
        url: `https://zacharydevworks.com/generator_app_backend/api/customer-call-history-detail/${id}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${user.access_token}`,
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          if (user.user.user_role === 'technician') {
            if (response.data.service_call_history.status === 'incomplete') {
              setStatus(true);
            }
          }
          setData(response.data.materials);
          setNote(response.data.service_call_history.notes);
          setReading(response.data.reading);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);

  const completethiscall = () => {
    if (id) {
      setLoading(true);
      var data = new FormData();

      var config = {
        method: 'get',
        url: `https://zacharydevworks.com/generator_app_backend/api/updatestatus/${id}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${user.access_token}`,
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          SimpleToast.show('Status updated.');
          navigation.goBack();
          setLoading(false);
        })
        .catch(function (error) {
          setLoading(false);
          console.log(error);
        });
    }
  };
  return (
    <>
      <Layout back={true} navigation={navigation}>
        <Text
          style={{
            color: '#222222',
            fontWeight: 'bold',
            marginVertical: 10,
            alignSelf: 'center',
            marginHorizontal: 30,
            textAlign: 'center',
          }}>
          {user.user.fname}
          {user.user.lname} - General Service Call
        </Text>
        <Text
          style={{
            color: '#222222',
            fontWeight: 'bold',
            marginVertical: 5,
            alignSelf: 'center',
            marginHorizontal: 30,
            textAlign: 'center',
          }}>
          {call.date}
        </Text>

        <View
          style={{
            height: 250,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            borderWidth: 1,
            borderColor: '#0048908F',
            padding: 10,
            backgroundColor: '#FFFFFF',
            marginBottom: 50,
          }}>
          <TextInput
            activeUnderlineColor="transparent"
            numberOfLines={4}
            multiline={true}
            editable={false}
            value={note}
            onChangeText={text => setNote(text)}
            underlineColor="tranparent" // add this
            outlineColor="tranparent"
            style={{
              backgroundColor: 'white',
              textAlign: 'center',
              color: '#222222',
            }}
          />
        </View>
        {data.length ? (
          <View
            style={{
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              borderWidth: 1,
              borderColor: '#0048908F',
              padding: 10,
              backgroundColor: '#FFFFFF',
              marginBottom: 30,
            }}>
            <FlatList
              data={data.reverse()}
              renderItem={({item}) => (
                <View style={{padding: 4}}>
                  <Text style={{color: '#000'}}>{item.material}</Text>
                </View>
              )}
            />
          </View>
        ) : null}

        {reading ? (
          <View
            style={{
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              borderWidth: 1,
              borderColor: '#0048908F',
              padding: 10,
              backgroundColor: '#FFFFFF',
              marginBottom: 50,
            }}>
            <View style={{width: 400, alignSelf: 'center'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 5,
                }}>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: '#000'}}>
                  Voltage Reading:
                </Text>
                <Text style={{fontSize: 18, color: '#000'}}>
                  {reading.voltage_reading}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 5,
                }}>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: '#000'}}>
                  L1:
                </Text>
                <Text style={{color: '#000'}}>{reading.l1}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 5,
                }}>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: '#000'}}>
                  L2:
                </Text>
                <Text style={{color: '#000'}}>{reading.l2}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 5,
                }}>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: '#000'}}>
                  3:
                </Text>
                <Text style={{color: '#000'}}>{reading.l3}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 5,
                }}>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: '#000'}}>
                  Phase:
                </Text>
                <Text style={{color: '#000'}}>{reading.phase}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 5,
                }}>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: '#000'}}>
                  Frequency:
                </Text>
                <Text style={{color: '#000'}}>{reading.frequency}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 5,
                }}>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: '#000'}}>
                  Battery Voltage:
                </Text>
                <Text style={{color: '#000'}}>{reading.battery_voltage}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 5,
                }}>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: '#000'}}>
                  Generator Hours:
                </Text>
                <Text style={{color: '#000'}}>{reading.hours}</Text>
              </View>
            </View>
          </View>
        ) : null}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          {user.user.user_role === 'technician' && status ? (
            <Button
              title={'Complete this call'}
              width={'50%'}
              onPress={completethiscall}
            />
          ) : (
            <View />
          )}
          <Text
            style={{
              color: '#222222',
              fontWeight: '400',
              marginVertical: 5,
              alignSelf: 'flex-end',
              textAlign: 'center',
            }}
            onPress={() => {
              navigation.navigate('ServiceImages', {
                id: id,
              });
            }}>
            View Images
          </Text>
        </View>
      </Layout>
      {loading && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            backgroundColor: '#000',
            opacity: 0.8,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              height: '30%',
              width: '80%',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator color={'#000'} size="large" />
            <Text style={{color: '#000', marginVertical: 10, fontSize: 18}}>
              Please wait...
            </Text>
          </View>
        </View>
      )}
    </>
  );
};

export default ServiceDetail;

const styles = StyleSheet.create({});
