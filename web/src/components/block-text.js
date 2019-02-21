import BaseBlockContent from '@sanity/block-content-to-react';
import React from 'react';

import typography from './typography.module.css';

const serializers = {
  types: {
    block(props) {
      const { children } = props;
      switch (props.node.style) {
        default:
          return <p className={typography.paragraph}>{children}</p>;
      }
    },
  },
};

// eslint-disable-next-line react/prop-types
const BlockText = ({ blocks }) => (
  <BaseBlockContent blocks={blocks} serializers={serializers} />
);

export default BlockText;
