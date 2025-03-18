import { Image, Dimensions } from "react-native";
import React from "react";
import Animated, {
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

type CarouselItemProps = {
  imageUri: string;
  index: number;
  scrollX: SharedValue<number>;
};

const { width } = Dimensions.get("window");
const _itemSize = width * 0.23;
const _spacing = 12;

const CarouselItem = ({ imageUri, index, scrollX }: CarouselItemProps) => {
  const styles = useAnimatedStyle(() => {
    return {
      borderWidth: 3,
      borderColor: interpolateColor(
        scrollX.value,
        [
          (index - 1) * (_itemSize + _spacing),
          index * (_itemSize + _spacing),
          (index + 1) * (_itemSize + _spacing),
        ],
        ["transparent", "white", "transparent"]
      ),
      transform: [
        {
          translateY: interpolate(
            scrollX.value,
            [
              (index - 1) * (_itemSize + _spacing),
              index * (_itemSize + _spacing),
              (index + 1) * (_itemSize + _spacing),
            ],
            [_itemSize / 4, 0, _itemSize / 4]
          ),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: _itemSize,
          height: _itemSize,
          borderRadius: _itemSize / 2,
        },
        styles,
      ]}
    >
      <Image
        source={{ uri: imageUri }}
        style={{
          flex: 1,
          borderRadius: _itemSize / 2,
        }}
      />
    </Animated.View>
  );
};

export default CarouselItem;
