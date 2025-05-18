import * as Linking from "expo-linking";

import {StripeProvider} from "@stripe/stripe-react-native";



export default function ExpoStripeProvider(
    props: Omit<
        React.ComponentProps<typeof StripeProvider>,
        "publishableKey" | "merchantIdentifier"
    >
) {
    return (
        <StripeProvider
            publishableKey="pk_test_51ROxpMCf4oaVDzHl263FbrmjLlWmz0qClB0X7QeijtmBMKwFwdLzFDfjZtlJGYJjlpGBq6jnerU3KHGppwhyys0U00AsBonRMy"
            merchantIdentifier=""
            urlScheme={Linking.createURL("/").split(":")[0]}
            {...props}
        />
    );
}