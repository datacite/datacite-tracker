import { sendMetricEvent, MetricEventOptions } from "./request";

/**
 * Config used when initializing the tracker.
 */
export type InitConfig = {
    /**
     * Set to true if you want metric events to be tracked when running the site locally.
     */
    readonly trackLocalhost?: boolean;
    /**
     * The repoId to bind the metric to.
     * Defaults to `location.hostname`
     */
    readonly repoId?: Location['hostname'];
    /**
     * The API host where the metric events will be sent.
     * Defaults to `'https://analytics.datacite.org'`
     */
    readonly apiHost?: string;
};

/**
 * Data passed to DataCite repository analytics as metric events.
 */
export type MetricEventData = {
    /**
     * The URL to bind the event to.
     * Defaults to `location.href`.
     */
    readonly url?: Location['href'];
    /**
     * The DOI for the event.
     * Defaults to `location.href`.
     */
    readonly doi?: string;
};

/**
 * Combined metric event config that is used when sending metric events
 */
export type MetricConfig = InitConfig & MetricEventData;

export enum MetricType {
    View = 'view',
    Download = 'download',
}

/**
 * Tracks a usage metric
 *
 * Use it to track a usage request for a DOI for a specific metric.
 *
 * @param config - Metric config with optional data to send
 */
type TrackMetric = (
    metric: MetricType,
    config?: MetricConfig,
    eventOptions?: MetricEventOptions
) => void;


export function iDontDoAnything(): string {
    return 'I do nothing';
}

export function Tracker(
    defaults?: InitConfig
): {
    readonly trackMetric: TrackMetric;
} {
    const getConfig = (): Required<MetricConfig> => ({
        trackLocalhost: false,
        url: location.href,
        doi: "",
        repoId: location.hostname,
        apiHost: 'https://analytics.datacite.org',
        ...defaults,
    });


    const trackMetric: TrackMetric = (metric, config, eventOptions) => {
        sendMetricEvent(metric, { ...getConfig(), ...config }, eventOptions);
        if (config !== undefined) {
            console.log(`Tracking metric ${metric} for ${config.doi}`);
        }
    };

    return {
        trackMetric
    };
}