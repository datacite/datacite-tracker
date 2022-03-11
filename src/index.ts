import { doi_from_schema_org_json, doi_from_url, doi_from_url_path } from "./lib/doi";
import { Tracker, MetricType } from "./lib/tracker";

// Logic to handle being included in a page (DOM access)
if (typeof window === "object") {

    var scriptEl = document.currentScript;

    if (scriptEl) {
        // Find the DOI
        let doi: string = ""

        // Get DOI from the dataset tag always as preferred
        doi = scriptEl.dataset.doi || "";
        if (doi == "") {
            // Look for DOI in schema.org element
            // Then in DC metadata
            // Finally check the URL path
            var element;
            if (element = document.querySelector('script[type="application/ld+json"]')?.innerHTML) {
                doi = doi_from_schema_org_json(element)
            } else if (element = document.querySelector('meta[name="DC.Identifier"]')?.getAttribute('content')) {
                doi = doi_from_url(element)
            } else {
                doi = doi_from_url_path(window.location.href)
            }
        }

        if (doi == "") {
            console.log("[DataCiteTracker] You need to add the DOI name into your tracking snippet")
        } else {
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
}

// Exports
export { Tracker, MetricType };
Object.assign(module.exports, Tracker, MetricType);