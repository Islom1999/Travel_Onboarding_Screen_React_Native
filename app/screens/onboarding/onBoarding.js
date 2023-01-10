import React from "react";
import { SafeAreaView, View, StyleSheet, Text, Animated, Image, TouchableOpacity} from 'react-native'

import { images, theme } from "../../constants";
const {onBoarding1, onBoarding2, onBoarding3 } = images

const {COLORS, FONTS, SIZES} = theme

const onBoardings = [
    {
        title: 'Lets Traveling',
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam natus asperiores blanditiis',
        image: onBoarding1
    },
    {
        title: 'Lets Traveling',
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam natus asperiores blanditiis',
        image: onBoarding2
    },
    {
        title: 'Lets Traveling',
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam natus asperiores blanditiis',
        image: onBoarding3
    },
]

const OnBoarding = () => {

    const scrollX = new Animated.Value(0)

    const dotPosition = Animated.divide(scrollX, SIZES.width)

    const [complated, setComplated] = React.useState(false)

    React.useEffect( () => {
        scrollX.addListener(({value}) => {
            if(Math.floor(value/ SIZES.width === onBoardings.length - 1)){
                setComplated(true)
            }
        })
        return () => scrollX.removeListener()
    }, [])

    return(
        <SafeAreaView>

            <View>
                <Animated.ScrollView
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    decelerationRate={0}
                    scrollEventThrottle={16}
                    snapToAlignment={'center'}
                    onScroll={Animated.event([
                        {nativeEvent: {contentOffset: {x: scrollX}}}
                    ], {useNativeDriver: false})}
                >
                    {onBoardings.map( (item, index) => (
                        <View key={index}
                            style={{width: SIZES.width, backgroundColor: COLORS.white,}}
                        > 
                            <View style={{
                                
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Image source={item.image} resizeMode='cover' style={{
                                    width: "100%",
                                    height: "100%",
                                }}/>
                                
                            </View>
                            <View style={{
                                position: 'absolute',
                                bottom: '15%',
                                left: 40,
                                right: 40,
                            }}>
                                <Text style={{
                                    ...FONTS.h1,
                                    color: COLORS.gray,
                                    textAlign: 'center',
                                }}>{item.title}</Text>
                                <Text style={{
                                    ...FONTS.body3,
                                    color: COLORS.gray,
                                    textAlign: 'center',
                                    marginTop: SIZES.base
                                }}>{item.description}</Text>

                            </View>

                            <TouchableOpacity
                                style={{
                                    backgroundColor: COLORS.blue,
                                    position: 'absolute',
                                    right: 0,
                                    bottom: 0,
                                    width: 150,
                                    height: 60,
                                    paddingLeft: 20,
                                    justifyContent: 'center',
                                    borderTopLeftRadius: 30,
                                    borderBottomLeftRadius: 30,
                                }}
                                onPress={() => {console.log('Button Pressed')}}
                            >

                                <Text style={{...FONTS.h1, color: COLORS.white}} >
                                    {complated ? "Lets Go" : 'Skip'}
                                </Text>
                            </TouchableOpacity>

                        </View>
                    ) )}
                </Animated.ScrollView>
            </View>

            <View style={styles.dotRootContainer}>
                <View style={styles.dotContainer}>
                    
                    {
                    onBoardings.map( (item, index) => {

                        const opacity = dotPosition.interpolate({
                            inputRange: [index-1, index, index+1],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: 'clamp'
                        })

                        const dotSize = dotPosition.interpolate({
                            inputRange: [index-1, index, index+1],
                            outputRange: [SIZES.base, 17 ,SIZES.base],
                            extrapolate: 'clamp'
                        })


                        return(
                            <Animated.View  
                                key={`dot-${index}`}
                                opacity={opacity}
                                style={[styles.dot, {width:dotSize, height: dotSize}]}
                            >
                            </Animated.View>
                        )
                        } )
                    }
                </View>
            </View>
            

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white
    },
    dotRootContainer: {
        position: 'absolute',
        bottom: SIZES.height > 700 ? '10%' : '10%' ,
    },
    dotContainer: {
        flexDirection: 'row',
        width: SIZES.width,
        justifyContent: 'center',
        alignItems: 'center',
        height: SIZES.padding
    },
    dot: {
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.blue,
        marginHorizontal: SIZES.radius / 2
    },
})

export default OnBoarding

