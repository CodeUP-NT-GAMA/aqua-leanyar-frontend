import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Card, Divider, IconButton, TouchableRipple} from 'react-native-paper';
import AppBackground from "@/components/generic/AppBackground";


interface Item {
    itemNumber: string;
    description: string;
    quantity: number;
    value: number;
}

interface Order {
    orderNumber: string;
    items: Item[];
    timestamp: string;
}

const testOrders: Order[] = [
    {
        orderNumber: 'ORD1234',
        timestamp: '2025-05-01 14:23:45',
        items: [
            {itemNumber: 'ITEM001', description: 'Water Bottle', quantity: 2, value: 15},
            {itemNumber: 'ITEM002', description: 'Swimming Goggles', quantity: 1, value: 25},
        ],
    },
    {
        orderNumber: 'ORD1235',
        timestamp: '2025-05-05 09:12:30',
        items: [
            {itemNumber: 'ITEM003', description: 'Diving Fins', quantity: 1, value: 40},
            {itemNumber: 'ITEM004', description: 'Snorkel Set', quantity: 1, value: 30},
        ],
    },
    {
        orderNumber: 'ORD1236',
        timestamp: '2025-05-10 18:45:10',
        items: [
            {itemNumber: 'ITEM005', description: 'Swim Cap', quantity: 3, value: 10},
            {itemNumber: 'ITEM006', description: 'Beach Towel', quantity: 2, value: 20},
        ],
    },
];

const PurchaseHistory: React.FC = () => {
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

    const calculateTotal = (items: Item[]) => {
        return items.reduce((total, item) => total + item.value * item.quantity, 0);
    };

    const toggleOrderDetails = (orderNumber: string) => {
        setExpandedOrder(expandedOrder === orderNumber ? null : orderNumber);
    };

    return (
        <AppBackground>
            <ScrollView style={{}}>
                {testOrders.map((order) => (
                    <Card key={order.orderNumber} style={{}}>
                        <TouchableRipple onPress={() => toggleOrderDetails(order.orderNumber)}
                                         rippleColor="rgba(0, 0, 0, 0.2)">
                            <Card.Title
                                title={`Order Number: ${order.orderNumber}`}
                                subtitle={`Purchased on: ${order.timestamp}`}
                                right={(props) => (
                                    <IconButton {...props}
                                                icon={expandedOrder === order.orderNumber ? "chevron-up" : "chevron-down"}/>
                                )}
                            />
                        </TouchableRipple>
                        {expandedOrder === order.orderNumber && (
                            <Card.Content>
                                <Divider/>
                                {order.items.map((item) => (
                                    <View key={item.itemNumber} style={styles.itemContainer}>
                                        <Text>Item No: {item.itemNumber}</Text>
                                        <Text>Description: {item.description}</Text>
                                        <Text>Quantity: {item.quantity}</Text>
                                        <Text>Value: ${item.value}</Text>
                                    </View>
                                ))}
                                <Text style={styles.total}>Total: ${calculateTotal(order.items)}</Text>
                            </Card.Content>
                        )}
                    </Card>
                ))}
            </ScrollView>
        </AppBackground>
    );
};

export default PurchaseHistory;

const styles = StyleSheet.create({
    itemContainer: {marginBottom: 10, backgroundColor: '#f0f0f0', padding: 10, borderRadius: 5},
    total: {fontSize: 16, fontWeight: 'bold', marginTop: 10, textAlign: 'right', color: '#555'},
});
