/* eslint-disable react/prop-types */
import BaseBlockContent from '@sanity/block-content-to-react';
import React from 'react';
import Figure from './figure';
import Slideshow from './slideshow';

import typography from '../typography.module.css';

const serializers = {
  types: {
    block({ children, node }) {
      switch (node.style) {
        case 'h1':
          return <h1 className={typography.responsiveTitle1}>{children}</h1>;

        case 'h2':
          return <h2 className={typography.responsiveTitle2}>{children}</h2>;

        case 'h3':
          return <h3 className={typography.responsiveTitle3}>{children}</h3>;

        case 'h4':
          return <h4 className={typography.responsiveTitle4}>{children}</h4>;

        case 'blockquote':
          return (
            <blockquote className={typography.blockQuote}>
              {children}
            </blockquote>
          );

        default:
          return <p className={typography.paragraph}>{children}</p>;
      }
    },
    figure({ node }) {
      return <Figure {...node} />;
    },
    slideshow({ node }) {
      return <Slideshow {...node} />;
    },
  },
};

const BlockContent = ({ blocks }) => (
  <BaseBlockContent blocks={blocks} serializers={serializers} />
);

export default BlockContent;
