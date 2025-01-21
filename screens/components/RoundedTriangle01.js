import React from 'react';
import Svg, { Path } from 'react-native-svg';


const RoundedTriangle = ({ size = 100, colour = 'orange', style}) => {

  const onPress = () => {
    console.log(`${colour} trianlge pressed`);
  }

  return (
      <Svg style={[style, {backgroundColor: 'transparent'}]}  width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Path
        onPress={onPress}
          d="M50 5
          Q55 5, 57 7
          L92 85
          Q94 90, 89 92
          L11 92
          Q6 90, 8 85
          L43 7
          Q45 5, 50 5
          Z"
          fill={colour}
        />
      </Svg>
  );
};

export default RoundedTriangle;