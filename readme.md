# DataCite Tracker

Typescript/Javascript library that tracks usage events

This package can be used in the browser or as node package, the former requires less configuration, but the latter can be useful if including as part of a SPA.

## Installation and Usage

### Include
The tracking script can be included directly using a CDN, by default it tracks views.
Include it in your page tag for the dataset landing page.

The script can be configured with various options using data attribute tags.

- data-repoid - required - This is the unique identifier for tracking your usage analytics - This will be provided by DataCite
- data-doi - optional - The DOI you want to track - This can be optionally removed and the code will scan for the DOI in schema.org, DC metadata, URL
- data-metric - optional - Type of metric to track, either 'view' or 'download' - Defaults to 'view'
- data-autotrack - optional - Advanced usage to stop the auto tracking, this is for manual set up, i.e. custom javascript calling the trackMetric as required.
- data-endpoint - optional - Advanced usage to specify a different API endpoint where events are sent - defaults to https://analytics.datacite.org


```html

<!-- Track View -->
<script defer data-doi="10.5072/1234"
        data-repoid="example.com"
        src="https://cdn.jsdelivr.net/npm/@datacite/datacite-tracker"></script>

<!-- Track Download -->
<script defer data-doi="10.5072/1234"
        data-repoid="example.com"
        data-metric="download"
        src="https://cdn.jsdelivr.net/npm/@datacite/datacite-tracker"></script>

```

## Development

### Build

- npm run build - Builds the TS package and puts in dist
- npm run rollup - Builds minified JS version for inclusion in pages
- npm ci - For CI usage generally but runs both of the above
