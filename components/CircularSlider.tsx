import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import CarouselItem from "./CarouselItem";
import Animated, {
  FadeIn,
  FadeOut,
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

const images = [
  "https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/804605/pexels-photo-804605.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/137140/pexels-photo-137140.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/31192625/pexels-photo-31192625/free-photo-of-historic-european-street-view-featuring-clock-tower.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/31150620/pexels-photo-31150620/free-photo-of-scenic-view-of-lush-green-hills-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/31125539/pexels-photo-31125539/free-photo-of-skyward-view-of-old-and-modern-hong-kong-architecture.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/31182462/pexels-photo-31182462/free-photo-of-abandoned-building-overgrown-with-ivy-against-skyscrapers.jpeg?auto=compress&cs=tinysrgb&w=1200",
];
const { width } = Dimensions.get("window");
const _itemSize = width * 0.23;
const _spacing = 12;
const snapToInterval = _itemSize + _spacing;

const CircularSlider = () => {
  const scrollX = useSharedValue(0);
  const [activeIndex, setActiveIndex] = React.useState(1);

  const onScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x;
    const newActiveIndex = Math.round(e.contentOffset.x / snapToInterval);
    if (activeIndex !== newActiveIndex) {
      runOnJS(setActiveIndex)(newActiveIndex);
    }
  });

  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <View style={[StyleSheet.absoluteFillObject]}>
        <Animated.Image
          source={{ uri: images[activeIndex] }}
          style={{ flex: 1 }}
          resizeMode="cover"
          entering={FadeIn.duration(500)}
          exiting={FadeOut.duration(500)}
          key={`images${activeIndex}`}
        />
      </View>
      <Animated.FlatList
        style={{ flexGrow: 0, paddingBottom: _itemSize }}
        contentContainerStyle={{
          paddingHorizontal: (width - _itemSize) / 2,
          gap: _spacing,
        }}
        data={images}
        renderItem={({ item, index }) => {
          return (
            <CarouselItem index={index} imageUri={item} scrollX={scrollX} />
          );
        }}
        keyExtractor={(_, item) => String(item)}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={1000 / 60}
        snapToInterval={_spacing + _itemSize}
        decelerationRate={"fast"}
      />
    </View>
  );
};

export default CircularSlider;
