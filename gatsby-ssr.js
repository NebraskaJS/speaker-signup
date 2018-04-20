import React from 'react';
import { renderToString } from 'react-dom/server';
import { extractCritical } from 'emotion-server';

import { Router } from 'react-router-dom';

import { ApolloAuthenticationProvider } from './src/client';

/*
 * This wraps both gatsby-plugin-emotion and ApolloProvider for SSR
 * Wish we could use two renderers, but oh well!
 */
exports.replaceRenderer = ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents,
}) => {
  const Container = () => bodyComponent;
  const { html, ids, css } = extractCritical(
    renderToString(
      <ApolloAuthenticationProvider>
        {bodyComponent}
      </ApolloAuthenticationProvider>
    )
  );

  const criticalStyle = <style dangerouslySetInnerHTML={{ __html: css }} />;
  const criticalIds = (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.__EMOTION_CRITICAL_CSS_IDS__ = ${JSON.stringify(ids)};`,
      }}
    />
  );

  setHeadComponents([criticalIds, criticalStyle]);
  replaceBodyHTMLString(html);
};
