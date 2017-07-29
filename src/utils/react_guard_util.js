import React from 'react';
import reactGuard from 'react-guard';
import get from 'lodash/get';

import log from '../services/logger_service';
import Error from '../views/containers/pages/error_page/error_page';

export default function(env) {
  // Catch and process component render exceptions.
  reactGuard(React, function handleError(err, componentInfo) {
    // Print stacktrace to the console
    log.fatal(`Error rendering: ${get(err, 'message')}`);
    log.fatal(get(err, 'stack'));
    // Replace failed component with "Failed to render".
    // Use `return null` to render nothing.
    return <Error env={env} componentInfo={componentInfo} err={err} />;
  });
}
