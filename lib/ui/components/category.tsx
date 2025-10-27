// lib/ui/components/category.tsx
import React from "react"
import { Platform, View, Text, Pressable, Image as RNImage, StyleSheet, useWindowDimensions } from "react-native"
import { CategoryProps } from "../types"
import { CATEGORY_TOKENS, COLORS, FONTS } from "../styleTokens"

const Category = ({
    displayText,
    imageFilePath,
    size = 'big',
    onPress,
    accessibilityLabel,
    testID,
    style
}: CategoryProps) => {
    const { width: screenWidth } = useWindowDimensions();
    const rnSource = typeof imageFilePath === 'string' ? { uri: imageFilePath } : (imageFilePath as any);
    const isSmall = size === 'small' 
    const tokens = isSmall ? CATEGORY_TOKENS.small : CATEGORY_TOKENS.big;
    const horizontalLayout = size === 'big' ? screenWidth > 600 : screenWidth > 300;

    const isMobile = Platform.OS !== 'web';

    const containerWidth = isMobile
        ? isSmall
            ? screenWidth * 0.45
            : screenWidth * 0.9
        : isSmall
            ? Math.min(screenWidth * 0.22, tokens.maxContainerWidth) 
            : Math.min(screenWidth * 0.7, tokens.maxContainerWidth);

    const containerHeight = isMobile
        ? isSmall
            ? Math.max(containerWidth * 0.8, 100)
            : Math.max(containerWidth * 0.5, 140)
        : isSmall
            ? tokens.maxContainerHeight * 0.8
            : horizontalLayout
            ? tokens.maxContainerHeight * 0.4
            : tokens.maxContainerHeight * 0.7;

    const layoutDirection = isMobile 
        ? isSmall
            ? 'column'
            : 'row'
        : isSmall
            ? 'column'
            : horizontalLayout 
                ? 'row' 
                : 'column-reverse';

    return (
        <Pressable
            onPress={onPress}
            accessibilityLabel={accessibilityLabel ?? displayText}
            testID={testID}
            style={({ pressed }) => [
                styles.container,
                { 
                    width: containerWidth,
                    height: containerHeight,
                    flexDirection: layoutDirection,
                },
                pressed && styles.pressed,
                style
            ]}
        >
            <View 
                style={[
                    styles.textContainer,
                    layoutDirection === 'row' ? styles.textLeft : styles.textTop,
                    isSmall ? { marginBottom: 6 } : null,
                ]}
            >
                <Text
                    style={[
                        styles.text,
                        {
                            fontSize: Math.min(
                                tokens.fontSize, 
                                isMobile ? 16 : screenWidth * 0.04
                            ),
                            textAlign: !isSmall && (!isMobile || horizontalLayout) ? 'left' : 'center',
                            fontFamily: `${tokens.fontFamily}, sans-serif`,
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

            {Platform.OS === 'web' ? (
                <img
                    src={imageFilePath as string}
                    alt={displayText}
                    style={{ 
                        width: !isSmall && horizontalLayout ? '40%' : '70%',
                        height: 'auto',
                        aspectRatio: 1,
                        objectFit: 'contain',
                        marginLeft: !isSmall && horizontalLayout ? 'auto' : 0,
                        marginTop: isSmall ? 6 : 0,
                    }}
                />
            ) : (
                <RNImage
                    source={rnSource}
                    style={{ 
                        width: isSmall ? '70%' : undefined,
                        flex: isSmall ? undefined : 1, 
                        height: isSmall ? undefined : '100%',
                        resizeMode: 'contain',
                        marginTop: isSmall ? 6 : 0,
                    }}
                />
            )}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.cardBg,
        borderWidth: 4,
        borderRadius: 16,
        borderColor: COLORS.cardBorder,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    textContainer: {
        justifyContent: 'center',
    },
    textTop: {
        width: '100%',
        marginBottom: 6,
    },
    textLeft: {
        flex: 1,
        paddingRight: 12,
    },
    textBottom: {
        width: '100%',
        marginTop: 6,
    },
    text: {
        fontWeight: '600',
        color: COLORS.text,
        flexShrink: 1,
        flexWrap: 'wrap',
    },
    pressed: {
        opacity: 0.9,
    }
});

export default Category;