import GeneralButton from "@/components/GeneralButton";
import {AuthContext} from "@/utils/authContext";
import {useContext, useState} from "react";
import {Dimensions, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {emailValidator} from "@/helper/emailValidator";
import {passwordValidator} from "@/helper/passwordValidator";
import Background from "@/components/generic/Background";
import Logo from "@/components/Logo";
import TextInput from "@/components/TextInput";
import Header from "@/components/Header";
import {useRouter} from "expo-router";
import {Text, useTheme} from "react-native-paper";

const {height} = Dimensions.get("window");

export default function LoginScreen() {
    const authContext = useContext(AuthContext);
    const router = useRouter();
    const theme = useTheme();
    const styles = makeStyles(theme);

    const [email, setEmail] = useState({value: "", error: ""});
    const [password, setPassword] = useState({value: "", error: ""});

    const onRegisterPressed = () => {
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
                    label="Last Name"
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
                <TextInput
                    label="Re-Enter Password"
                    returnKeyType="done"
                    value={password.value}
                    onChangeText={(text: string) => setPassword({value: text, error: ""})}
                    error={!!password.error}
                    errorText={password.error}
                    secureTextEntry
                    description="Password"
                />

                <TextInput
                    label="Phone"
                    returnKeyType="done"
                    value={password.value}
                    onChangeText={(text: string) => setPassword({value: text, error: ""})}
                    error={!!password.error}
                    errorText={password.error}
                    secureTextEntry
                    description="Password"
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



        // <View className="flex-1 justify-center p-4">
        //     <AppText size="heading" center>
        //         Login Screen
        //     </AppText>
        //     <Button title="Log in!" onPress={authContext.logIn}/>
        // </View>
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
        fontSize: 16
    },
    link: {
        fontWeight: "bold",
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
