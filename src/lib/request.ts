import { MetricConfig } from './tracker';

type MetricEventPayload = {
    readonly n: string;
    readonly i: Location['hostname'];
    readonly u: Location['href'];
    readonly p: string;
};

export type MetricEventOptions = {
    /**
     * Callback called when the metric is successfully sent.
     */
    readonly callback?: () => void;
};

/**
 * @internal
 * Sends a metric event to DatCite Repository Analytics API
 *
 * @param data - Event data to send
 * @param options - Event options
 */
export function sendMetricEvent(
    metricName: string,
    data: Required<MetricConfig>,
    eventOptions?: MetricEventOptions
): void {
    // Create flag to determine if running on localhost
    const isLocalhost =
        /^localhost$|^127(?:\.[0-9]+){0,2}\.[0-9]+$|^(?:0*:)*?:?0*1$/.test(
            location.hostname
        ) || location.protocol === 'file:';

    // If running on localhost, don't send the event
    if (!data.trackLocalhost && isLocalhost) {
        return console.warn(
            '[DataCiteTracker] Ignoring metric event request because site running locally'
        );
    }

    const payload: MetricEventPayload = {
        n: metricName,
        u: data.url,
        i: data.repoId,
        p: data.doi,
    };

    const r = new XMLHttpRequest();
    r.open('POST', `${data.apiHost}/api/metric`, true);
    r.setRequestHeader('Content-Type', 'application/json');
    r.send(JSON.stringify(payload));

    r.onreadystatechange = () => {
        if (r.readyState !== 4) return;
        if (r.status !== 200) {
            console.error(
                r.responseText
            );
        }

        if (eventOptions && eventOptions.callback) {
            eventOptions.callback();
        }
    };
}