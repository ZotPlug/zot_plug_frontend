// lib/ui/components/category.tsx
import React from "react"
import { Platform, View, Text, Pressable, Image as RNImage, StyleSheet } from "react-native"
import { CategoryProps } from "../types"
import { CATEGORY_TOKENS, COLORS } from "../styleTokens"

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
    const isSmall = size === 'small' ? <View style={{ height: 8 }} /> : null;

    const rnSource = typeof imageFilePath === 'string' ? { uri: imageFilePath } : (imageFilePath as any);

    return (
        <Pressable
            onPress={onPress}
            accessibilityLabel={accessibilityLabel ?? displayText}
            testID={testID}
            style={({ pressed }: { pressed: boolean }) => [
                styles.container,
                { width: tokens.containerSize, height: tokens.containerSize },
                pressed && styles.pressed,
                style
            ]}
        >
            <View style={styles.inner}>
                {Platform.OS === 'web' ? (
                    <img
                        src={imageFilePath as string}
                        alt={displayText}
                        style={{ 
                            width: '70%', 
                            height: 'auto',
                            aspectRatio: 1,
                            objectFit: 'contain' 
                        }}
                    />
                ) : (
                    <RNImage
                    source={rnSource as any}
                    style={[styles.image, { width: tokens.imageSize, height: tokens.imageSize }]}
                    resizeMode="contain"
                />
                )}

                <Text style={[styles.text, { fontSize: tokens.fontSize }]} numberOfLines={2}>
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
        borderWidth: 3,
        borderRadius: 20,
        padding: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 4,
        borderColor: COLORS.cardBorder,
        transition: 'background-color 0.15s',
    },
    inner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column-reverse',
        width : '100%',
        paddingVertical: 8,
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
        flexShrink: 0,
    },
    pressed: {
        opacity: 0.85
    }
});

export default Category;