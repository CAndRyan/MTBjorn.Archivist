# Archivist

A tool for archiving web links

## Getting Started

This tool is really a high-level component to be rendered within a full application. As such, rendering can be tested from separate build scripts that work on the `ui` directory rather than `src`:

````powershell
npm run build:dev:server    # to build the ui test project (static files only)
npm run start:ui            # to build the ui test project & host through webpack-dev-server
````

## Local Development (including dependencies)

Since `@mtbjorn/archivist` is developed alongside other packages, the `Install-LocalDependencies.ps1` script was created to simplify side-by-side development. The script expects the dependent repositories be cloned as siblings of `@mtbjorn/archivist`, in it's parent directory.
