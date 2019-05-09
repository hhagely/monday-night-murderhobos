import React from 'react';
import PropTypes from 'prop-types';
import styles from './container.module.css';

const Container = ({ children }) => (
  <div className={styles.root}>{children}</div>
);

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

export default Container;
