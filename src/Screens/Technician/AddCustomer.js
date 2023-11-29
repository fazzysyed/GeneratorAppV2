import {View, Text, Image, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '../../components/Layout';
import {TextInput} from 'react-native-paper';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import Button from '../../components/Button';

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import {useDispatch} from 'react-redux';

import Toast from 'react-native-simple-toast';
import {add} from 'react-native-reanimated';
import MobileLocation from '../../Helper/MobileLocation';
const AddCustomer = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAdddress] = useState('');
  const [city, setCity] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [techloading, setTechloading] = useState(false);
  const [secure, setSecure] = useState(false);
  const [homephone, setHomePhone] = useState('');
  const [mobile, setMobile] = useState('');

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

  // useEffect(() => {
  //   getUsersLocation();
  // }, []);

  const technicianLogin = () => {
    if (
      email.length &&
      homephone.length &&
      mobile.length &&
      // password.length &&
      name.length &&
      address.length &&
      zip.length &&
      city.length &&
      address.length
    ) {
      navigation.navigate('AddGenerator', {
        data: {
          email: email,
          // password: password,
          fname: name,
          address: address,
          home_phone: homephone,
          mobile: mobile,
          // latitude: lat,
          // longitude: long,
          zip: zip,
          customeraddress: address,
          state: state,
        },
      });
    } else {
      Toast.show('All fields are required.');
    }
  };
  return (
    <Layout navigation={navigation} back>
      <Text
        style={{
          color: '#222222',
          fontWeight: 'bold',
          marginVertical: 5,
          fontSize: 20,
        }}>
        Add New Customer
      </Text>

      <Text style={{color: '#222222', fontWeight: 'bold', marginVertical: 10}}>
        Customer Name
      </Text>
      <TextInput
        value={name}
        onChangeText={text => setName(text)}
        activeUnderlineColor="#000"
        underlineColor="tranparent" // add this
        outlineColor="#000"
        style={{
          height: 50,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          borderWidth: 1,
          borderColor: '#0048908F',
          marginVertical: 10,
        }}
      />

      <Text style={{color: '#222222', fontWeight: 'bold', marginVertical: 10}}>
        Email
      </Text>
      <TextInput
        value={email}
        onChangeText={text => setEmail(text)}
        activeUnderlineColor="#000"
        underlineColor="tranparent" // add this
        outlineColor="#000"
        style={{
          height: 50,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          borderWidth: 1,
          borderColor: '#0048908F',
          marginVertical: 10,
        }}
      />
      {/* <Text style={{color: '#222222', fontWeight: 'bold', marginVertical: 10}}>
        Password
      </Text>

      <TextInput
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={secure}
        activeUnderlineColor="#000"
        underlineColor="tranparent" // add this
        outlineColor="#transparent"
        style={{
          height: 45,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          borderWidth: 1,
          borderColor: '#0048908F',
        }}
        right={
          <TextInput.Icon
            name="eye"
            onPress={() => {
              setSecure(!secure);
            }}
          />
        }
      /> */}
      <Text style={{color: '#222222', fontWeight: 'bold', marginVertical: 10}}>
        Address
      </Text>

      <TextInput
        value={address}
        onChangeText={text => setAdddress(text)}
        activeUnderlineColor="#000"
        underlineColor="tranparent" // add this
        outlineColor="#transparent"
        style={{
          height: 45,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          borderWidth: 1,
          borderColor: '#0048908F',
        }}
      />

      <Text style={{color: '#222222', fontWeight: 'bold', marginVertical: 10}}>
        Home Phone
      </Text>

      <TextInput
        value={homephone}
        onChangeText={text => setHomePhone(text)}
        activeUnderlineColor="#000"
        underlineColor="tranparent" // add this
        outlineColor="#transparent"
        keyboardType="number-pad"
        style={{
          height: 45,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          borderWidth: 1,
          borderColor: '#0048908F',
        }}
      />
      <Text style={{color: '#222222', fontWeight: 'bold', marginVertical: 10}}>
        Mobile Phone
      </Text>

      <TextInput
        value={mobile}
        onChangeText={text => setMobile(text)}
        activeUnderlineColor="#000"
        underlineColor="tranparent" // add this
        outlineColor="#transparent"
        keyboardType="number-pad"
        style={{
          height: 45,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          borderWidth: 1,
          borderColor: '#0048908F',
        }}
      />

      <Text style={{color: '#222222', fontWeight: 'bold', marginVertical: 10}}>
        City
      </Text>

      <TextInput
        value={city}
        onChangeText={text => setCity(text)}
        activeUnderlineColor="#000"
        underlineColor="tranparent" // add this
        outlineColor="#transparent"
        style={{
          height: 45,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          borderWidth: 1,
          borderColor: '#0048908F',
        }}
      />
      {/* <Text style={{color: '#222222', fontWeight: 'bold', marginVertical: 10}}>
        Latitude
      </Text>

      <TextInput
        value={lat.toString()}
        editable={false}
        activeUnderlineColor="#000"
        underlineColor="tranparent" // add this
        outlineColor="#transparent"
        style={{
          height: 45,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          borderWidth: 1,
          borderColor: '#0048908F',
        }}
      />
      <Text style={{color: '#222222', fontWeight: 'bold', marginVertical: 10}}>
        Longitude
      </Text>

      <TextInput
        value={long.toString()}
        editable={false}
        activeUnderlineColor="#000"
        underlineColor="tranparent" // add this
        outlineColor="#transparent"
        style={{
          height: 45,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          borderWidth: 1,
          borderColor: '#0048908F',
        }}
      /> */}
      <Text style={{color: '#222222', fontWeight: 'bold', marginVertical: 10}}>
        State
      </Text>

      <TextInput
        value={state}
        onChangeText={e => setState(e)}
        activeUnderlineColor="#000"
        underlineColor="tranparent" // add this
        outlineColor="#transparent"
        style={{
          height: 45,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          borderWidth: 1,
          borderColor: '#0048908F',
        }}
      />
      <Text style={{color: '#222222', fontWeight: 'bold', marginVertical: 10}}>
        Zip
      </Text>

      <TextInput
        value={zip}
        onChangeText={e => setZip(e)}
        keyboardType="number-pad"
        activeUnderlineColor="#000"
        underlineColor="tranparent" // add this
        outlineColor="#transparent"
        style={{
          height: 45,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          borderWidth: 1,
          borderColor: '#0048908F',
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button
          title={'Create'}
          width={160}
          onPress={() => technicianLogin()}
          loading={techloading}
        />
        {/* <Button
          title={'Customer Log In'}
          width={160}
          onPress={() => customerLogin()}
          loading={loading}
        /> */}
      </View>
    </Layout>
  );
};

export default AddCustomer;
