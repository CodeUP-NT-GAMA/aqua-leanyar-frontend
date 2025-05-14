import AsyncStorage from "@react-native-async-storage/async-storage";
import {SplashScreen, useRouter} from "expo-router";
import {createContext, PropsWithChildren, useEffect, useState} from "react";
import {LoginService} from "@/service/LoginService"
import {Alert} from "react-native";

SplashScreen.preventAutoHideAsync();

type AuthState = {
    isLoggedIn: boolean;
    isReady: boolean;
    logIn: (email: string, password: string) => void;
    logOut: () => void;
};

const authStorageKey = "auth-key";

// Function to display an alert dialog
const alert = () => {
    Alert.alert( // Display an alert dialog
        "Oops!", // Title of the alert
        "That password didn't work.", // Message of the alert
        [
            {
                text: "Try Again", // Button with try again text
            }
        ]
    );
}

export const AuthContext = createContext<AuthState>({
    isLoggedIn: false,
    isReady: false,
    logIn: (email: string, password: string) => {
    },
    logOut: () => {
    },
});

export function AuthProvider({children}: PropsWithChildren) {
    const [isReady, setIsReady] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    const storeAuthState = async (newState: { isLoggedIn: boolean }) => {
        try {
            const jsonValue = JSON.stringify(newState);
            await AsyncStorage.setItem(authStorageKey, jsonValue);
        } catch (error) {
            console.log("Error saving", error);
        }
    };

    const logIn = (email: string, password: string) => {

        setIsLoggedIn(true);
                    storeAuthState({isLoggedIn: true});
                    router.replace("/");

        // LoginService.login(email, password)
        //     .catch((err: Error) => {
        //         console.log("Error calling Login API", err);
        //     })
        //     .then(token => {
        //         console.log(token);
        //         if (token != undefined) {
        //             setIsLoggedIn(true);
        //             storeAuthState({isLoggedIn: true});
        //             router.replace("/");
        //         } else {
        //             alert();
        //         }
        //     });

    };

    const logOut = () => {
        setIsLoggedIn(false);
        storeAuthState({isLoggedIn: false});
        // @ts-ignore
        router.replace("/login");
    };

    useEffect(() => {
        const getAuthFromStorage = async () => {
            // simulate a delay, e.g. for an API request
            await new Promise((res) => setTimeout(() => res(null), 1000));
            try {
                const value = await AsyncStorage.getItem(authStorageKey);
                if (value !== null) {
                    const auth = JSON.parse(value);
                    setIsLoggedIn(auth.isLoggedIn);
                }
            } catch (error) {
                console.log("Error fetching from storage", error);
            }
            setIsReady(true);
        };
        getAuthFromStorage();
    }, []);

    useEffect(() => {
        if (isReady) {
            SplashScreen.hideAsync();
        }
    }, [isReady]);

    return (
        <AuthContext.Provider
            value={{
                isReady,
                isLoggedIn,
                logIn,
                logOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
