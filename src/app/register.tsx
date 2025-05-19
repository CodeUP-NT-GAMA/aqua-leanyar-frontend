import React, {memo, useContext, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Background from '../components/general/Background';
import Logo from '../components/general/Logo';
import Header from '../components/general/Header';
import Button from '../components/general/Button';
import TextInput from '../components/general/TextInput';
import {theme} from '@/theme/theme';
import {emailValidator} from "@/helper/emailValidator";
import {passwordValidator} from "@/helper/passwordValidator";
import {nameValidator} from "@/helper/nameValidator";
import {AuthContext} from "@/utils/authContext";
import {useRouter} from "expo-router";
import {LoginService} from "@/service/LoginService";


// @ts-ignore
const RegisterScreen = ({navigation}: Props) => {
    const authContext = useContext(AuthContext);
    const router = useRouter();
    const [fname, setFname] = useState({value: '', error: ''});
    const [lname, setLname] = useState({value: '', error: ''});
    const [email, setEmail] = useState({value: '', error: ''});
    const [password, setPassword] = useState({value: '', error: ''});

    const _onSignUpPressed = async () => {
        const fNameError = nameValidator(fname.value);
        const lNameError = nameValidator(lname.value);
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);

        if (emailError || passwordError || fNameError || lNameError) {
            setFname({...fname, error: fNameError});
            setLname({...lname, error: lNameError});
            setEmail({...email, error: emailError});
            setPassword({...password, error: passwordError});
            return;
        }

        await LoginService.register(fname.value, lname.value, email.value, password.value);

        authContext.logIn(email.value, password.value);
    };

    return (
        <Background>

            <Logo/>

            <Header>Adventure begins here!</Header>

            <TextInput
                label="First Name"
                returnKeyType="next"
                value={fname.value}
                onChangeText={text => setFname({value: text, error: ''})}
                error={!!fname.error}
                errorText={fname.error}
            />

            <TextInput
                label="Last Name"
                returnKeyType="next"
                value={lname.value}
                onChangeText={text => setLname({value: text, error: ''})}
                error={!!lname.error}
                errorText={lname.error}
            />

            <TextInput
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={text => setEmail({value: text, error: ''})}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                textContentType="emailAddress"
                keyboardType="email-address"
            />

            <TextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={text => setPassword({value: text, error: ''})}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />

            <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
                Sign Up
            </Button>

            <View style={styles.row}>
                <Text style={styles.label}>Already have an account? </Text>
                <TouchableOpacity onPress={() => router.replace("/login")}>
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>
        </Background>
    );
};

const styles = StyleSheet.create({
    label: {
        color: theme.colors.secondary,
    },
    button: {
        marginTop: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
});

export default memo(RegisterScreen);
