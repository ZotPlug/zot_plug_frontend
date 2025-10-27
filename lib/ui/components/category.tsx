// lib/ui/components/category.tsx
import React from "react"
import { Platform, View, Text, Pressable, Image as RNImage, StyleSheet, Dimensions } from "react-native"
import { CategoryProps } from "../types"
import { CATEGORY_TOKENS, COLORS } from "../styleTokens"

const screenWidth = Dimensions.get('window').width;

const Category = ({
    displayText,
    imageFilePath,
    size = 'big',
    onPress,
    accessibilityLabel,
    testID,
    style
}: CategoryProps) => {
    const tokens = size === 'big' ? CATEGORY_TOKENS.big : CATEGORY_TOKENS.small;
    const rnSource = typeof imageFilePath === 'string' ? { uri: imageFilePath } : (imageFilePath as any);
    const isSmall = size === 'small' 

    const dynamicWidth = Math.min(
        isSmall ? screenWidth * 0.3 : screenWidth * 0.45,
        tokens.maxContainerWidth
    );

    const imageScale = Platform.OS === 'web' 
        ? (isSmall ? '65%' : '75%')
        : (isSmall ? '70%' : '80%');

    return (
        <Pressable
            onPress={onPress}
            accessibilityLabel={accessibilityLabel ?? displayText}
            testID={testID}
            style={({ pressed }) => [
                styles.container,
                { 
                    width: dynamicWidth,
                    aspectRatio: 1,
                },
                pressed && styles.pressed,
                style
            ]}
        >
            <View 
                style={[
                    styles.inner,
                    {
                        paddingVertical: isSmall ? (Platform.OS === 'web' ? 4 : 8) : 8,
                        gap: isSmall ? (Platform.OS === 'web' ? 2 : 5) : 5,
                        paddingBottom: isSmall ? 6 : 8,
                    },
                ]}
            >
                {Platform.OS === 'web' ? (
                    <img
                        src={imageFilePath as string}
                        alt={displayText}
                        style={{ 
                            width: imageScale,
                            height: 'auto',
                            aspectRatio: 1,
                            objectFit: 'contain' 
                        }}
                    />
                ) : (
                    <RNImage
                    source={rnSource as any}
                    style={{ 
                        width: isSmall ? '55%' : '65%',
                        aspectRatio: 1,
                        resizeMode: 'contain',
                    }}
                />
                )}

                <Text 
                    style={[
                        styles.text, 
                        { 
                            fontSize: isSmall ? 12 : 16,
                            maxWidth: '85%', 
                        },
                    ]} 
                    numberOfLines={2}
                    adjustsFontSizeToFit
                    minimumFontScale={0.85}
                    allowFontScaling={false}
                >
                    {displayText}
                </Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.cardBg,
        borderWidth: 2,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        borderColor: COLORS.cardBorder,
    },
    inner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'column-reverse',
        width : '100%',
    },
    image: {
        flexShrink: 0,
        flexGrow: 0,
        maxWidth: '80%',
        height: 'auto',
        aspectRatio: 1,
        objectFit: 'contain',
    },
    text: {
        fontWeight: '600',
        color: COLORS.text,
        textAlign: 'center',
        marginTop: 4,
        flexShrink: 1,
        flexWrap: 'wrap',
    },
    pressed: {
        opacity: 0.85
    }
});

export default Category;