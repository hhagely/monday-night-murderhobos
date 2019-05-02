import React from 'react';

import styles from './container.module.css';

// eslint-disable-next-line react/prop-types
const Container = ({ children }) => (
  <div className={styles.root}>{children}</div>
);

export default Container;
