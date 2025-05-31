import React from 'react';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Divider, Text} from 'react-native-paper';

const PrivacyPolicyScreen = () => {
    return (
        <SafeAreaView style={{flex: 1, padding: 16}}>
            <ScrollView>
                <Text variant="titleLarge" style={{marginBottom: 8, fontSize: 25}}>Privacy Policy</Text>

                <Text variant="bodyMedium">
                    This Privacy Policy outlines how we handle your data in accordance with the General Data Protection
                    Regulation (GDPR).
                </Text>

                <Divider style={{marginVertical: 16}}/>

                <Text variant="titleLarge" style={{fontSize: 18}}>1. Data Collection</Text>
                <Text variant="bodyMedium">
                    We collect anonymized data to improve our services. This includes analytics information such as
                    usage frequency, device type, and feature interactions. None of this data is linked to personally
                    identifiable information.
                </Text>

                <Text variant="titleLarge" style={{fontSize: 18, marginTop: 16}}>2. Data Usage</Text>
                <Text variant="bodyMedium">
                    The anonymized data we collect is used solely for analytical purposes to enhance user experience and
                    app performance. We do not use this data to profile users or make automated decisions.
                </Text>

                <Text variant="titleLarge" style={{fontSize: 18, marginTop: 16}}>3. Third-Party Sharing</Text>
                <Text variant="bodyMedium">
                    We do not share your data with any third parties. All information collected stays within our
                    infrastructure and is used strictly for internal improvements.
                </Text>

                <Text variant="titleLarge" style={{fontSize: 18, marginTop: 16}}>4. GDPR Compliance</Text>
                <Text variant="bodyMedium">
                    We adhere to the GDPR principles of data protection. Users have the right to access, rectify, or
                    erase any personal data stored by us. Since we collect only anonymized data, no personal information
                    is stored or processed.
                </Text>

                <Text variant="titleLarge" style={{fontSize: 18, marginTop: 16}}>5. Contact</Text>
                <Text variant="bodyMedium">
                    If you have any questions about this privacy policy or want to exercise your data rights, please
                    contact us at: privacy@example.com
                </Text>

                <Text variant="bodyMedium" style={{marginTop: 24, fontStyle: 'italic', color: '#777'}}>
                    Last updated: May 28, 2025
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export default PrivacyPolicyScreen;