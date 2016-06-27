import React, { Component, PropTypes } from 'react'
import cn from 'classnames';

import dates from './utils/dates';

export default class BusinessHoursSlots extends Component {
  static propTypes = {
    start: PropTypes.instanceOf(Date).isRequired,
    end: PropTypes.instanceOf(Date).isRequired,
    dow: PropTypes.arrayOf(PropTypes.number),
    min: PropTypes.instanceOf(Date),
    max: PropTypes.instanceOf(Date)
  }

  static defaultProps = {
    start: new Date(1970, 1, 1, 9),
    end: new Date(1970, 1, 1, 18),
    dow: [1, 2, 3, 4, 5]
  }

  render() {
    const { start, end, min, max } = this.props;
    const totalMillis = dates.diffIgnoreDST(max, min);
    const topMillis = dates.diffIgnoreDST(dates.merge(min, start), min);
    const bottomMillis = dates.diffIgnoreDST(max, dates.merge(max, end));

    return (
      <div
        className={cn(this.props.className, 'rbc-businesshours-container')}
        style={this.props.style}
      >
        { topMillis > 0 &&
          (<div
            className="rbc-businesshours-block"
            style={{ top: 0, height: `${topMillis/totalMillis*100}%` }}
          />) }
        { bottomMillis > 0 &&
          (<div
            className="rbc-businesshours-block"
            style={{ bottom: 0, height: `${bottomMillis/totalMillis*100}%` }}
          />) }
      </div>
    )
  }
}
