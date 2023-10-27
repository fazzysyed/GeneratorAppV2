import {View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Layout from '../../components/Layout';
import {TextInput} from 'react-native-paper';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import Button from '../../components/Button';

import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-simple-toast';
import {add} from 'react-native-reanimated';
import {FlatList} from 'react-native-gesture-handler';
import SimpleToast from 'react-native-simple-toast';

const AddGenerator = ({route, navigation}) => {
  const {data} = route.params;
  const dispatch = useDispatch();
  const [brandName, setBrandName] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [modelNumber, setModelNumber] = useState('');
  const [installDate, setInstallDate] = useState('');
  const [lastServiceDate, setLastServiceDate] = useState('');
  const [location, setLocation] = useState('');
  const [warrantyStartDate, setWarrantyStartDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [techloading, setTechloading] = useState(false);
  const [secure, setSecure] = useState(false);
  const [date, setDate] = useState('');
  const [pickDate, setPickDate] = useState(new Date());
  const [pickDate2, setPickDate2] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [type, setType] = useState('');
  const [warrantyPeriod, setWarrantyPeriod] = useState('');

  const user = useSelector(state => state.Reducer.user);

  const [generatorTypes, setGeneratorTypes] = useState([
    {
      name: 'A',
      value: 'A',
    },
    {
      name: 'B',
      value: 'B',
    },
    {
      name: 'C',
      value: 'C',
    },
  ]);

  const warranty = [
    {
      name: '6 Months',
      value: '6 Months',
    },
    {
      name: '1 Year',
      value: '1 Year',
    },
    {
      name: '2 Year',
      value: '2 Year',
    },
    {
      name: '3 Year',
      value: '3 Year',
    },
  ];

  const formatDate = date => {
    const d = new Date(date);
    const year = d.getFullYear().toString().slice(2);
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${year}`;
  };

  const handleInstallDateChange = text => {
    if (formatDate.length <= 8) {
      const formattedDate = formatDate(text);
      setInstallDate(formattedDate);

      // Format the date as the user types
    }
    // Format the date as the user types
  };

  const technicianLogin = () => {
    if (
      brandName.length &&
      serialNumber.length &&
      modelNumber.length &&
      installDate.length &&
      location.length &&
      warrantyStartDate.length &&
      warrantyPeriod.length &&
      type.length
    ) {
      let newData = {
        ...data,
        brand: brandName,
        sno: serialNumber,
        model_no: modelNumber,
        location: location,
        generator_type: type,
        warranty_period: warrantyPeriod,
        install_date: installDate,
        warranty_sdate: warrantyStartDate,
      };
      setLoading(true);
      var config = {
        method: 'post',
        url: `https://zacharydevworks.com/generator_app_backend/api/add-customer-generator`,
        headers: {
          Accept: 'application/json',

          Authorization: `Bearer ${user.access_token}`,
        },
        data: newData,
      };
      axios(config)
        .then(function (response) {
          SimpleToast.show('Added Successfully!');
          navigation.navigate('TechnicalMain');

          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          setLoading(false);
        });
      // You can add the logic to send this information to the server or perform other actions here.
    } else {
      Toast.show('All fields are required.');
    }
  };
  const getParsedDate = strDate => {
    var strSplitDate = String(strDate).split('/');

    // alert(date);
    var dd = strSplitDate[0];
    var mm = strSplitDate[1];
    var yyyy = strSplitDate[2]; //January is 0!
    //January is 0!

    let date = dd + '-' + mm + '-' + yyyy;
    return date.toString();
  };
  return (
    <>
      <Layout>
        <Text
          style={{
            color: '#222222',
            fontWeight: 'bold',
            marginVertical: 5,
            fontSize: 20,
          }}>
          Add Generator
        </Text>

        {/* Brand Name */}
        <Text
          style={{color: '#222222', fontWeight: 'bold', marginVertical: 10}}>
          Brand Name
        </Text>
        <TextInput
          value={brandName}
          onChangeText={text => setBrandName(text)}
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

        {/* Serial Number */}
        <Text
          style={{color: '#222222', fontWeight: 'bold', marginVertical: 10}}>
          Serial Number
        </Text>
        <TextInput
          value={serialNumber}
          onChangeText={text => setSerialNumber(text)}
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

        {/* Model Number */}
        <Text
          style={{color: '#222222', fontWeight: 'bold', marginVertical: 10}}>
          Model Number
        </Text>
        <TextInput
          value={modelNumber}
          onChangeText={text => setModelNumber(text)}
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
        <Text
          style={{color: '#222222', fontWeight: 'bold', marginVertical: 10}}>
          Generator Type
        </Text>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'space-between',
            // marginHorizontal: 50,
          }}>
          {generatorTypes.map(item => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 50,
              }}>
              <Text
                style={{
                  color: '#222222',
                  fontWeight: 'bold',
                  marginVertical: 10,
                  fontSize: 18,

                  marginHorizontal: 10,
                }}>
                {item.name}
              </Text>
              <TouchableOpacity
                onPress={() => setType(item.value)}
                style={{
                  backgroundColor: type === item.value ? '#004890' : '#FFFFFF',
                  height: 25,
                  width: 25,

                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: '#004890',
                }}>
                <Icon name="check" color={'#FFFFFF'} size={20} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Install Date */}
        <Text
          style={{color: '#222222', fontWeight: 'bold', marginVertical: 10}}>
          Install Date
        </Text>

        <TouchableOpacity
          style={{
            height: 50,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            borderWidth: 1,
            borderColor: '#0048908F',
            marginVertical: 10,
            backgroundColor: '#ffffff',
            justifyContent: 'center',
          }}
          onPress={() => setOpen(true)}>
          <Text style={{color: '#000', marginLeft: 10}}>{installDate}</Text>
        </TouchableOpacity>

        {/* Last Service Date */}
        {/* <Text style={{color: '#222222', fontWeight: 'bold', marginVertical: 10}}>
        Last Service Date
      </Text>
      <TextInput
        value={lastServiceDate}
        onChangeText={text => setLastServiceDate(text)}
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
      /> */}

        {/* Location */}
        <Text
          style={{color: '#222222', fontWeight: 'bold', marginVertical: 10}}>
          Location
        </Text>
        <TextInput
          value={location}
          onChangeText={text => setLocation(text)}
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

        {/* Warranty Start Date */}
        <Text
          style={{color: '#222222', fontWeight: 'bold', marginVertical: 10}}>
          Warranty Start Date
        </Text>
        <TouchableOpacity
          style={{
            height: 50,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            borderWidth: 1,
            borderColor: '#0048908F',
            marginVertical: 10,
            backgroundColor: '#ffffff',
            justifyContent: 'center',
          }}
          onPress={() => setOpen2(true)}>
          <Text style={{color: '#000', marginLeft: 10}}>
            {warrantyStartDate}
          </Text>
        </TouchableOpacity>

        <Text
          style={{color: '#222222', fontWeight: 'bold', marginVertical: 10}}>
          Warranty Period
        </Text>

        <FlatList
          style={{marginBottom: 30}}
          data={warranty}
          horizontal
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 50,
              }}>
              <Text
                style={{
                  color: '#222222',
                  fontWeight: 'bold',
                  marginVertical: 10,
                  fontSize: 18,

                  marginHorizontal: 10,
                }}>
                {item.name}
              </Text>
              <TouchableOpacity
                onPress={() => setWarrantyPeriod(item.value)}
                style={{
                  backgroundColor:
                    warrantyPeriod === item.value ? '#004890' : '#FFFFFF',
                  height: 25,
                  width: 25,

                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: '#004890',
                }}>
                <Icon name="check" color={'#FFFFFF'} size={20} />
              </TouchableOpacity>
            </View>
          )}
        />

        <View style={{marginVertical: 30}}>
          <Button
            title={'Create'}
            width={160}
            onPress={() => technicianLogin()}
            loading={techloading}
          />
        </View>

        <DatePicker
          modal
          open={open2}
          date={pickDate2}
          onConfirm={date => {
            let newDAta = date.toLocaleDateString();
            setWarrantyStartDate(getParsedDate(newDAta));

            setOpen2(false);
          }}
          onCancel={() => {
            setOpen2(false);
          }}
        />

        <DatePicker
          modal
          open={open}
          date={pickDate}
          onConfirm={date => {
            let newDAta = date.toLocaleDateString();
            setInstallDate(getParsedDate(newDAta));

            setOpen(false);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />

        {/* The rest of your component remains unchanged */}
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

export default AddGenerator;
