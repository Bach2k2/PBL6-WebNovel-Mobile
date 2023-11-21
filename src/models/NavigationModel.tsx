import { NavigationProp, RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
    Home: undefined;
    NovelDetail: { novelId: string }; // You can adjust the parameter type as needed
    ChapterList: undefined;
    ChapterDetail: { chapterId: string }; // You can adjust the parameter type as needed
    CreateNovel: undefined;
    Login: undefined;
    Register: undefined;
    CoinExchange: undefined;
    LoginByEmail: undefined;
    Profile: undefined;
    EditProfile: undefined;
    SettingAccount: undefined;
    WriteDashboard: undefined;
};

export type HomeStackParamList = {
    Home: undefined;
};

export type AppNavigatorProps<T extends keyof RootStackParamList> = {
    navigation: NavigationProp<RootStackParamList,T>;
    route: RouteProp<RootStackParamList,T>;
};