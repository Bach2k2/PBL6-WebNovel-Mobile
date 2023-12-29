// Import your screens and components here

const config = {
    screens: {
        Welcome: 'welcome', // Replace 'Welcome' with the correct screen name
        Home: {
            screens: {
                Account: 'account',
            },
        },
        Search: 'search',
        NovelDetail: {
            path: 'novel/:title', // Use the dynamic path for NovelDetail
            parse: {
                title: (title: any) => decodeURIComponent(title),
            },
        },
        CommentList: 'comments',
        ChapterList: 'content',
        ChapterDetail: 'chapter-detail',
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
    },
};

const linking = {
    prefixes: ['deepLink://app'],
    config,
};

export default linking;
