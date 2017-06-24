import React from 'react';
import reactGuard from 'react-guard';
import log from '../services/logger_service';
import Error from '../views/containers/pages/error_page/error_page';

export default function(env) {
  // Catch and process component render exceptions.
  reactGuard(React, function handleError(err, componentInfo) {
    // Print stacktrace to the console
    log.fatal(
      `Error rendering: ${err.message}, in ${componentInfo.displayName}`
    );
    log.info(componentInfo.state, 'Component State');
    log.info(componentInfo.props, 'Component Props');
    log.fatal(err.stack);

    // Replace failed component with "Failed to render".
    // Use `return null` to render nothing.
    return <Error env={env} componentInfo={componentInfo} err={err} />;
  });
}
