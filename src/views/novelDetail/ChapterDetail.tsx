import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions ,ScrollView} from "react-native";
import { WebView } from 'react-native-webview';
import Pdf from 'react-native-pdf';
function ChapterDetail({ route }: any) {
    // const [html, setHtml] = useState('');

    // useEffect(() => {
    //     fetch('https://v2.convertapi.com/convert/pdf/to/html?Secret=3X8foVPTkze1ALke&File=https://webnovel2023.s3-ap-southeast-1.amazonaws.com/be608a5c-3e80-4fc7-818b-8b6993348bde/3a01b7ae-0522-49a9-a2fb-a73e947a3add/text.pdf')
    //         .then((response) => response.text())
    //         .then((html) => {
    //             setHtml(html);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }, []); // The empty dependency array ensures that the effect runs once when the component mounts

    // return (
    //     <View style={{ flex: 1 }}>
    //         {html && <Text>{html}</Text>}
    //     </View>
    // );
    const [chapter, setChapter] = useState();
    const source = { uri: 'https://webnovel2023.s3-ap-southeast-1.amazonaws.com/be608a5c-3e80-4fc7-818b-8b6993348bde/3a01b7ae-0522-49a9-a2fb-a73e947a3add/text.pdf', cache: true };
    return (

        <View style={styles.container} >
            <ScrollView>
            <Pdf
                trustAllCerts={false}
                source={source}
                onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                }}
                onError={(error) => {
                    console.log(error);
                }}
                onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                }}
                 // Tự động điều chỉnh kích thước để vừa với chiều rộng màn hình
                minScale={1.0} // Khoảng giá trị tối thiểu của tỷ lệ phóng to
                maxScale={3.0} // Khoảng giá trị tối đa của tỷ lệ phóng to
                singlePage={false}
                style={styles.pdf} />
            </ScrollView>
            
        </View>


    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width: '300%',
        height: '300%',
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width*1.5,
        height: Dimensions.get('window').height*1.5,
    },


});

export default ChapterDetail;
