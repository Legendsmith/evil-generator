// WebWorker to handle data load cleanly.
// This has zero access to the main state,
// so everything we do has to be passed to/from.
//
// This represents a point of complexity, but since
// the aim of this worker is to be minimal,
// this is a non-issue.

// Load.
importScripts('/app/gen/evil/_data/loader.js');

// Return.
postMessage(g_Data);