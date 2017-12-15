import React, { Component } from 'react';
import { Animated, View, Text, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';

const { width:WIDTH, height:HEIGHT } = Dimensions.get('window');
const BAR_MARGIN = 30;
const RATIO = (WIDTH - (BAR_MARGIN * 2)) / 110;

const styles = StyleSheet.create({
  bar: {
    alignItems: 'center',
    marginTop: 20
  },

  line: {
    position: 'absolute',
    width: WIDTH - 60,
    top: 17,
    borderWidth: 1,
    borderColor: '#eeeeee',
    alignSelf: 'flex-end',
  }
});

export default class IconicBar extends Component {
  static propTypes = {
    progress: PropTypes.number,
    initialProgress: PropTypes.number,
    icon: PropTypes.string,
    iconSize: PropTypes.number,
    iconColor: PropTypes.string,
    additionalStyles: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number
    ])
  }

  state = {
    activeSegmentAnim: new Animated.Value(this.props.initialProgress || 0),
    iconAnim: new Animated.Value(this.props.initialProgress || 0)
  }

  componentDidMount() {
    this.animate(this.props.progress);
  }

  componentWillReceiveProps(nextProps) {
    this.animate(nextProps.progress);
  }

  animate(progress) {
    const { activeSegmentAnim, iconAnim } = this.state;
    const activeSegmentWidth = RATIO * progress;

    Animated.parallel([
      Animated.timing(activeSegmentAnim, {
        toValue: activeSegmentWidth,
        duration: 1000
      }),
      Animated.timing(iconAnim, {
        toValue: activeSegmentWidth,
        duration: 1000
      })
    ]).start();
  }

  render() {
    const { progress, additionalStyles } = this.props;
    const { activeSegmentAnim, iconAnim } = this.state;

    const lineActive = {
      position: 'absolute',
      top: 17,
      borderWidth: 1,
      borderColor: '#9ed3c7',
      alignSelf: 'flex-start',
      transform: [{'translate':[0,0,1]}]
    };

    const iconStyles = {
      position: 'absolute',
      top: 0,
      transform: [{'translate':[0,0,1]}]
    };

    return (
      <View style={[styles.bar, {
        marginLeft: BAR_MARGIN,
        marginRight: BAR_MARGIN,
        width: WIDTH
      }, additionalStyles]}>

        <Animated.View style={{
          ...lineActive,
          width: activeSegmentAnim
        }}></Animated.View>

        <Animated.View style={{
          ...iconStyles,
          left: iconAnim
        }}>
          <Icon name={this.props.icon} size={this.props.iconSize} color={this.props.iconColor} />
        </Animated.View>

        <View style={styles.line}></View>

      </View>
    );
  }
}
