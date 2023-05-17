// eslint-disable-next-line no-unused-vars
import React from "react";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Text,
  Tooltip,
  Flex,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import {
  SearchMinPrice,
  SearchMaxPrice,
} from "../../stateManagement/searchReqInfos";

const PriceRange = (data) => {
  const [searchMinPrice, setSearchMinPrice] = useAtom(SearchMinPrice);
  const [searchMaxPrice, setSearchMaxPrice] = useAtom(SearchMaxPrice);
  const [sliderValue, setSliderValue] = React.useState(undefined);
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <Flex>
      <Text textAlign={"center"}>Min Price</Text>
      <RangeSlider
        minW={"13rem"}
        aria-label={["min", "max"]}
        defaultValue={[0, data.fetchMaxPrice]}
        min={0}
        max={data.fetchMaxPrice}
        onChangeEnd={(val) => {
          setSearchMinPrice(val[0]);
          setSearchMaxPrice(val[1]);
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onChange={(v) => {
          setSliderValue(v);
        }}
      >
        <RangeSliderTrack bg="red.100">
          <RangeSliderFilledTrack bg="tomato" />
        </RangeSliderTrack>
        <Tooltip
          hasArrow
          bg="teal.500"
          color="white"
          placement="top"
          isOpen={showTooltip}
          label={sliderValue === undefined ? "0" : `${sliderValue[0]}`}
        >
          <RangeSliderThumb index={0} />
        </Tooltip>
        <Tooltip
          hasArrow
          bg="teal.500"
          color="white"
          placement="top"
          isOpen={showTooltip}
          label={
            sliderValue === undefined ? data.fetchMaxPrice : `${sliderValue[1]}`
          }
        >
          <RangeSliderThumb index={1} />
        </Tooltip>
      </RangeSlider>
      <Text textAlign={"center"}>Max Price</Text>
    </Flex>
  );
};

export default PriceRange;
