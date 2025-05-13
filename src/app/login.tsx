import GeneralButton from "@/components/GeneralButton";
import {AuthContext} from "@/utils/authContext";
import {useContext, useState} from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {emailValidator} from "@/helper/emailValidator";
import {passwordValidator} from "@/helper/passwordValidator";
import Background from "@/components/Background";
import Logo from "@/components/Logo";
import TextInput from "@/components/TextInput";
import {Text} from "react-native-paper";
import {theme} from "@/theme/theme";
import Header from "@/components/Header";

export default function LoginScreen() {
    const authContext = useContext(AuthContext);

    const [email, setEmail] = useState({value: "", error: ""});
    const [password, setPassword] = useState({value: "", error: ""});

    const onLoginPressed = () => {
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);
        if (emailError || passwordError) {
            setEmail({...email, error: emailError});
            setPassword({...password, error: passwordError});
            return;
        }
        authContext.logIn(email.value, password.value)
    };


    // @ts-ignore
    return (

        <Background>
            <Logo/>
            <Header>Hello.</Header>
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
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text: string) => setPassword({value: text, error: ""})}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
                description="Password"
            />
            <View style={styles.forgotPassword}>
                <TouchableOpacity
                    // onPress={() => navigation.navigate("ResetPasswordScreen")}
                >
                    <Text style={styles.forgot}>Forgot your password ?</Text>
                </TouchableOpacity>
            </View>
            <GeneralButton mode="contained" onPressFunction={onLoginPressed} text={"Login"} style=""/>

            <View style={styles.row}>
                <Text>You do not have an account yet ?</Text>
            </View>
            <View style={styles.row}>
                <TouchableOpacity
                    // onPress={() => navigation.replace("RegisterScreen")}
                >
                    <Text style={styles.link}>Create !</Text>
                </TouchableOpacity>
            </View>
        </Background>


        // <View className="flex-1 justify-center p-4">
        //     <AppText size="heading" center>
        //         Login Screen
        //     </AppText>
        //     <Button title="Log in!" onPress={authContext.logIn}/>
        // </View>
    );
}

const styles = StyleSheet.create({
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
    link: {
        fontWeight: "bold",
        color: theme.colors.primary,
    },
});
