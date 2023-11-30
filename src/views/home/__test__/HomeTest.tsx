 // const renderSkeleton1 = () => {
    //     return (
    //         <View style={styles.gridContainer}>
    //             {[...Array(2)].map((_, rowIndex) => (
    //                 <View style={styles.row} key={rowIndex}>
    //                     {[...Array(4)].map((__, columnIndex) => (
    //                         <View style={styles.column} key={columnIndex}>
    //                             <Skeleton height={100} width={70} style={styles.image} />
    //                             <Skeleton height={20} width={50} style={styles.text} />
    //                         </View>
    //                     ))}
    //                 </View>
    //             ))}
    //         </View>
    //     );
    // };

   //  function ImageRow({ novelData }: { novelData: Novel[] }) {
   //    return (
   //      <>
   //        <View style={{
   //          backgroundColor: 'lightblue',
   //          padding: 12,
   //        }}>
   //          <Text style={{ color: "black", fontSize: 24, }}>From your Reading Preference</Text>
   //        </View>
    
   //        <ScrollView horizontal={true} contentContainerStyle={styles.imageRow}>
   //          {novelData.map((item, index) => (
   //            <View key={index}>
   //              {item.imagesURL ? (<Image source={{ uri: item.imagesURL }} defaultSource={require('../../assets/img/waiting_img.jpg')} style={styles.prefer_image} />) :
   //                (<Image source={require('../../assets/img/waiting_img.jpg')} defaultSource={require('../../assets/img/waiting_img.jpg')} style={styles.prefer_image} />)}
   //              <View style={styles.textContainer}>
   //                <Text numberOfLines={2} style={styles.text_imgrow}>{item.name}</Text>
   //              </View>
   //            </View>
   //          ))}
   //        </ScrollView>
   //      </>
   //    );
   //  }