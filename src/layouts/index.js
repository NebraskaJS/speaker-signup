import React from 'react';
import Helmet from 'react-helmet';

import { AuthenticationProvider, Header } from '../components';
import '../style/global';
import 'normalize.css';

export default function IndexLayout({ children, data }) {
  const { meta } = data;
  const { description, keywords, title } = meta;
  return (
    <div>
      <Helmet
        title="Proposals"
        titleTemplate={`%s | ${title}`}
        meta={[
          { name: 'description', content: meta.description },
          { name: 'keywords', content: keywords.join(', ') },
          { name: 'twitter:site', content: '@nebraskajs' },
          { name: 'og:type', content: 'website' },
          { name: 'og:site_name', content: title },
        ]}
      />
      <Header />
      <div
        style={{
          margin: '0 auto',
          maxWidth: 960,
          padding: '0px 1.0875rem 1.45rem',
          paddingTop: 0,
        }}
      >
        <AuthenticationProvider>{children()}</AuthenticationProvider>
      </div>
    </div>
  );
}

export const indexQuery = graphql`
  query IndexLayoutQuery {
    meta: contentYaml {
      description
      keywords
      title
    }
  }
`;
