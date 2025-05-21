import GeneralButton from "@/components/generic/GeneralButton";
import {AuthContext} from "@/utils/authContext";
import {useContext, useState} from "react";
import {Dimensions, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {emailValidator} from "@/helper/emailValidator";
import {passwordValidator} from "@/helper/passwordValidator";
import {requiredValidator} from "@/helper/requiredValidator";
import Background from "@/components/generic/Background";
import Logo from "@/components/Logo";
import TextInput from "@/components/generic/TextInput";
import Header from "@/components/Header";
import {useRouter} from "expo-router";
import {Text, useTheme} from "react-native-paper";
import {LoginService} from "@/service/LoginService";

const {height} = Dimensions.get("window");

export default function LoginScreen() {
    const authContext = useContext(AuthContext);
    const router = useRouter();
    const theme = useTheme();
    const styles = makeStyles(theme);

    const [firstName, setFirstName] = useState({value: "", error: ""});
    const [lastName, setLastName] = useState({value: "", error: ""});
    const [email, setEmail] = useState({value: "", error: ""});
    const [password, setPassword] = useState({value: "", error: ""});
    const [secondPassword, setSecondPassword] = useState({value: "", error: ""});
    const [phone, setPhone] = useState({value: "", error: ""});

    const onRegisterPressed = () => {
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);
        const firstNameError = requiredValidator(firstName.value)
        const lastNameError = requiredValidator(lastName.value);

        if (emailError || passwordError) {
            setEmail({...email, error: emailError});
            setPassword({...password, error: passwordError});
            setFirstName({...firstName, error: firstNameError});
            setLastName({...lastName, error: lastNameError});
            return;
        }
        LoginService.register(email.value, firstName.value, lastName.value, password.value, phone.value)
            .catch((err: Error) => {
                console.log("Error calling Login API", err);
            })
            .then(async res => {
                if (res != undefined && res.status === 201) {
                    router.replace({
                        pathname: '/login',
                        params: {greet: "Y"},
                    })

                } else {
                    alert();
                }
            });
    };


    // @ts-ignore
    return (

        <Background>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
                <Logo/>
                <Header>Let's get started!</Header>
                <TextInput
                    label="Email"
                    returnKeyType="next"
                    value={email.value}
                    onChangeText={(text: string) => setEmail({value: text, error: ""})}
                    error={!!email.error}
                    errorText={email.error}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    description="Email"
                />
                <TextInput
                    label="First Name"
                    returnKeyType="next"
                    value={firstName.value}
                    onChangeText={(text: string) => setFirstName({value: text, error: ""})}
                    error={!!firstName.error}
                    errorText={firstName.error}
                    autoCapitalize="words"
                    textContentType="givenName"
                    keyboardType="default"
                    description="First name"
                />
                <TextInput
                    label="Last Name"
                    returnKeyType="next"
                    value={lastName.value}
                    onChangeText={(text: string) => setLastName({value: text, error: ""})}
                    error={!!lastName.error}
                    errorText={lastName.error}
                    autoCapitalize="words"
                    textContentType="familyName"
                    keyboardType="default"
                    description="Last name"
                />
                <TextInput
                    label="Password"
                    returnKeyType="done"
                    value={password.value}
                    onChangeText={(text: string) => setPassword({value: text, error: ""})}
                    error={!!password.error}
                    errorText={password.error}
                    secureTextEntry
                    description="Password"
                />
                <TextInput
                    label="Re-Enter Password"
                    returnKeyType="done"
                    value={secondPassword.value}
                    onChangeText={(text: string) => setSecondPassword({value: text, error: ""})}
                    error={!!secondPassword.error}
                    errorText={secondPassword.error}
                    keyboardType="default"
                    secureTextEntry
                    description="Re-Enter password"
                />

                <TextInput
                    label="Phone"
                    returnKeyType="done"
                    value={phone.value}
                    onChangeText={(text: string) => setPhone({value: text, error: ""})}
                    error={!!phone.error}
                    errorText={phone.error}
                    textContentType="telephoneNumber"
                    keyboardType="phone-pad"
                    description="Phone number"
                />

                <GeneralButton mode="contained" onPressFunction={onRegisterPressed} text={"Register"} style=""/>

                <View style={styles.row}>
                    <Text style={styles.account}>Already have an account ?</Text>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity
                        onPress={() => router.replace("/login")}
                    >
                        <Text style={styles.link}>Log In !</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Background>
    );
}
const makeStyles = (theme) => StyleSheet.create({
    forgotPassword: {
        width: "100%",
        alignItems: "flex-end",
        marginBottom: 10,
    },
    row: {
        flexDirection: "row",
        marginTop: 4,
    },
    forgot: {
        fontSize: 13,
        color: theme.colors.secondary,
    },
    account: {
        fontSize: 16,
        fontFamily: 'AutourOne-Regular',
    },
    link: {
        fontWeight: "bold",
        fontFamily: 'AutourOne-Regular',
        color: theme.colors.primary,
        fontSize: 18,
        paddingBottom: 40
    },
    container: {
        flexGrow: 1,          // Ensures ScrollView can grow and center properly
        flexDirection: "column",
        alignItems: 'center', // Horizontally center children
        justifyContent: 'center', // Vertically center if needed
        paddingBottom: height * 0.1
    }
});
