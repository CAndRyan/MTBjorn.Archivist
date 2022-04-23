# Archivist

A tool for archiving web links

## Getting Started

This tool is really a high-level component to be rendered within a full application. As such, rendering can be tested from separate build scripts that work on the `ui` directory rather than `src`:

````powershell
npm run build:dev:server    # to build the ui test project (static files only)
npm run start:ui            # to build the ui test project & host through webpack-dev-server
````
