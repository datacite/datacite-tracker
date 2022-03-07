import { Tracker, MetricType, MetricConfig } from "./lib/tracker";

// Logic to handle being included in a page (DOM access)
if (typeof window === "object") {

    var scriptEl = document.currentScript;

    if (scriptEl) {
        // Find the DOI
        let doi = scriptEl.dataset.doi || "";

        let repoid = scriptEl.dataset.repoid || location.hostname;
        let metric = scriptEl.dataset.metric || "view";
        let auto_track = JSON.parse(scriptEl.dataset.autotrack || "true");
        let localhost = JSON.parse(scriptEl.dataset.localhost || "false");
        let endpoint = scriptEl.dataset.endpoint || "https://analytics.datacite.org";

        // Setup the tracker
        const { trackMetric } = Tracker({
            repoId: repoid,
            trackLocalhost: localhost,
            apiHost: endpoint,
        })

        // Default usage tracking
        if (auto_track) {
            switch (metric) {
                case "view":
                    trackMetric(MetricType.View, { doi: doi });
                    break;
                case "download":
                    trackMetric(MetricType.Download, { doi: doi });
                    break;
                default:
                    console.log(`[DataCiteTracker] Unknown metric type ${metric}`);
            }
        }
    }
}

// Exports
export { Tracker, MetricType };
Object.assign(module.exports, Tracker, MetricType);