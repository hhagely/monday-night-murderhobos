import BaseBlockContent from '@sanity/block-content-to-react';
import React from 'react';
import PropTypes from 'prop-types';

import typography from './typography.module.css';

const serializers = {
  types: {
    block(props) {
      // eslint-disable-next-line react/prop-types
      const { children } = props;
      // eslint-disable-next-line react/prop-types
      switch (props.node.style) {
        default:
          return <p className={typography.paragraph}>{children}</p>;
      }
    },
  },
};

const BlockText = ({ blocks }) => (
  <BaseBlockContent blocks={blocks} serializers={serializers} />
);

BlockText.propTypes = {
  blocks: PropTypes.array,
};

export default BlockText;
