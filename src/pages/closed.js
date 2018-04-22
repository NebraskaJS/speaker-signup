import React, { Fragment } from 'react';
import Helmet from 'react-helmet';

import { Issues } from '../components';

export default function Closed() {
  return (
    <Fragment>
      <Helmet
        title="Closed proposals"
        meta={[
          {
            name: 'description',
            content: `This PWA can be used to sign up for the Omaha & Lincoln area NebraskaJS meetups. Check out proposals previously given or ones that have been closed.`,
          },
        ]}
      />
      <Issues title="Closed proposals" state="CLOSED" />
    </Fragment>
  );
}
