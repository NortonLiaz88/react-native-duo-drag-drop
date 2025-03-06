import { useContext } from "react";
import { View, Text, StyleSheet, type StyleProp, type ViewStyle, type TextStyle } from "react-native";
import WordContext from "./WordContext";
import { colors } from "./colors";

export interface WordProps {
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  isErrored?: boolean; // Adicionando a propriedade isErrored
  isCorrect?: boolean; // Adicionando a propriedade isErrored
}

const textColor = '#fff'

export default function Word({ containerStyle, textStyle, isErrored, isCorrect}: WordProps) {
  const { wordHeight, text, wordGap, wordsOfKnowledge } = useContext(WordContext);

  // Define a cor do texto com base na propriedade isErrored

  return (
    <View
      style={[{ height: wordHeight, margin: wordGap, marginBottom: wordGap * 2 }, styles.container, containerStyle]}
    >
      {(text.startsWith("*") || text.endsWith("*")) || text.includes("*") ||
        (wordsOfKnowledge?.some(word => word === text.replace(/\*/g, ''))) ? (
        <Text style={[{ color: isErrored || isCorrect ? textColor : '#1EA0E7' }, styles.text]} allowFontScaling={false} numberOfLines={1}>
          {text.replace(/\*/g, '')}
        </Text> 
      ):(
        <Text style={[styles.text, textStyle, { color:  textColor}]} allowFontScaling={false} numberOfLines={1}>
          {text}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    backgroundColor: colors.white,
    borderColor: colors.grey,
    borderWidth: 2,
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 16,
  },
});