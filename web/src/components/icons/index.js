import React from 'react';
import PropTypes from 'prop-types';
import HamburgerIcon from './hamburger';

function Icon(props) {
  switch (props.symbol) {
    case 'hamburger':
      return <HamburgerIcon />;
    default:
      return <span>Unknown icon: {props.symbol}</span>;
  }
}

Icon.propTypes = {
  symbol: PropTypes.string,
};

export default Icon;
