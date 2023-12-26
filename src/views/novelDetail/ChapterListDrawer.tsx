// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { Chapter } from '../../models/Chapter';
// import ChapterDetail from './ChapterDetail';
// import { ActivityIndicator, Text, View } from 'react-native';
// const Drawer = createDrawerNavigator();
// export const ChapterListDrawer = ({ chapters, novel }: { chapters: Chapter[]; novel: any }) => {
//     if (chapters.length === 0) {
//         return (
//             <View>
//                 <ActivityIndicator />
//             </View>
//         );
//     }
//     console.log('chapter',chapters);
//     return (
//         <Drawer.Navigator>
//             {/* {chapters.map((chapter, index) => (
//                 <Drawer.Screen
//                     key={index}
//                     name={`ChapterDetail_${chapter.id}`}
//                     component={ChapterDetail}
//                     initialParams={{ chapterId: chapter.id, novel: novel }}
//                 />
//             ))} */}
//         </Drawer.Navigator>
//     );
// };