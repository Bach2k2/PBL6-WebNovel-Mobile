import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Payment } from '../../models/Payment';
import { User } from '../../models/User';
import { AuthContext } from '../../context/AuthContext';
import { getPaymentApi } from '../../hook/PaymentApi';

const Tab = createMaterialTopTabNavigator();

const PaymentHistory = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#3498db',
        inactiveTintColor: '#555',
        labelStyle: { fontSize: 16, fontWeight: 'bold' },
        style: { backgroundColor: '#f2f2f2' },
      }}>
      <Tab.Screen name="All" component={PaymentHistoryTab} />
      <Tab.Screen name="Success" component={PaymentHistoryTab} />
      <Tab.Screen name="Fail" component={PaymentHistoryTab} />
    </Tab.Navigator>
  );
};

const PaymentHistoryTab = () => {
  const [paymentData, setPaymentData] = useState<Payment[]>([])
  const [user, setUser] = useState<User | null>();
  const { authState, getUserData } = useContext(AuthContext);
  useEffect(() => {
    const userData = getUserData();
    setUser(userData);
    // const fetchPaymentData = async () => {

    //   await getPaymentApi(user?.id, authState.accessToken).then((data) => {
    //     setPaymentData(data);
    //     console.log('data', data);
    //   })
    // }
    const fetchPaymentData = async () => {
      try {
        const data = await getPaymentApi(user?.id, authState.accessToken);
        setPaymentData(data);
        console.log('data', data);
      } catch (error) {
        console.error('Error fetching payment data', error);
      }
    };
    if (user) {
      fetchPaymentData();
    }

  }, [user])
  if (paymentData.length > 0) {
    return (
      <ScrollView style={styles.container}>

        {paymentData.map((item, index) => (
          <>
            <View style={styles.header}>
              <Text style={styles.headerText}>{item.paymentDate.slice(0,10)}</Text>
            </View>
            <PaymentItem key={index} {...item} />
          </>
        ))}
      </ScrollView>
    );
  } else {
    return (
      <View>
        <Text>No records</Text>
      </View>
    );
  }

};

const PaymentItem = ({ orderId, price, coinAmount, paymentStatus }: any) => (
  <View style={styles.paymentItemContainer}>
    <View style={styles.row}>
      <Text style={styles.headerText}>OrderId: </Text>
      <Text style={styles.paymentItemText}>{orderId}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.headerText}>Coins: </Text>
      <Text style={styles.paymentItemText}> {coinAmount}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.headerText}>Price: </Text>
      <Text style={styles.paymentItemText}> {price} VND</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.headerText}>Status: </Text>
      <Text style={styles.paymentItemText}>{paymentStatus ? 'Successful' : 'Failed'}</Text>
    </View>
  </View>
);
export default PaymentHistory

const styles = StyleSheet.create({
  container: {
    width: '98%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignSelf: 'center'
  },
  row: {
    marginTop: 10,
    flexDirection: 'row',
    padding: 2,
    alignItems: 'center',
  },
  header: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    // backgroundColor: '#3498db',
    backgroundColor: '#EBEBEB',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    width: '98%',
    alignSelf: 'center'
  },
  headerText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentItemContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  paymentItemText: {
    fontSize: 16,
  },
  noRecordsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noRecordsText: {
    fontSize: 16,
    color: '#555',
  },
});