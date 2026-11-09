import { Text } from "react-native";

type WelcomeProps = {
    name: string;       //THAT'S typescript telling us name must be string
};

export default function Welcome({ name }: WelcomeProps) { //our component now recieves a name
    return (
        <Text>Welcome, {name}</Text>
    );
}