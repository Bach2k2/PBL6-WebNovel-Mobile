// Import necessary components and icons
import { LinkingOptions } from '@react-navigation/native';
import { Linking } from 'react-native';
import dynamicLinks from '@react-native-firebase/dynamic-links'
import {firebase} from '@react-native-firebase/dynamic-links'
import { utils } from '@react-native-firebase/app';

// const RNfirebaseConfig = {
//     apiKey: "",
//     authDomain: "pbl6-webnovel.firebaseapp.com",
//     projectId: "pbl6-web",
//     storageBucket: "pbl6-webnovel.appspot.com",
//     messagingSenderId: "",
//     appId: "1:964321595460:android:9a2d8244ef8602542eac11"
// };

// let app;
// if (firebase.apps.length === 0) {
//     app = firebase.initializeApp(RNfirebaseConfig)
// } else {
//     app = firebase.app()
// }

const linking = {
    prefixes: ['myapp://webnovelmobile/', 'https://example.com', 'myapp://'],
    // async getInitialURL() {
    //     // First, you would need to get the initial URL from your third-party integration
    //     // The exact usage depend on the third-party SDK you use
    //     // For example, to get the initial URL for Firebase Dynamic Links:
    //     const { isAvailable } = utils().playServicesAvailability;

    //     if (isAvailable) {
    //         const initialLink = await dynamicLinks().getInitialLink();

    //         if (initialLink) {
    //             return initialLink.url;
    //         }
    //     }

    //     // As a fallback, you may want to do the default deep link handling
    //     const url = await Linking.getInitialURL();

    //     return url;
    // },

    // // Custom function to subscribe to incoming links
    // subscribe(listener: any) {
    //     // Listen to incoming links from Firebase Dynamic Links
    //     const unsubscribeFirebase = dynamicLinks().onLink(({ url }) => {
    //         listener(url);
    //     });

    //     // Listen to incoming links from deep linking
    //     const linkingSubscription = Linking.addEventListener('url', ({ url }) => {
    //         listener(url);
    //     });

    //     return () => {
    //         // Clean up the event listeners
    //         unsubscribeFirebase();
    //         linkingSubscription.remove();
    //     };
    // },

    config: {
        screens: {
            Welcome: 'welcome',
            Home: {
                screens: {
                    Account: {
                        path: 'account'
                    }
                }
            },
            Search: 'search',
            NovelDetail: {
                path: 'novel/:title',
                parse: {
                    title: (title: any) => decodeURIComponent(title),
                },
            },
            CommentList: 'comments',
            ChapterList: 'content',
            CreateNovel: 'create-novel',
            UserNovelDetail: 'user-novel-detail',
            CreateChapter: 'create-chapter',
            EditChapter: 'edit-chapter',
            Login: 'login',
            Register: 'register',
            CoinExchange: 'coin-exchange',
            LoginByEmail: 'login-by-email',
            Profile: 'profile',
            EditProfile: 'edit-profile',
            SettingAccount: 'setting-account',
            EmailBox: 'email-box',
            PaymentHistory: 'payment-history',
            FAQ: 'faq',
            PreferenceEdit: 'preference-edit',
            BookmarkEdit: 'bookmark-edit',
            NotFound: '*',
        },
    },

};

export default linking;
