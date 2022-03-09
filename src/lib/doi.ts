

export function doi_from_url(url: string) {
    // Derived from https://github.com/datacite/bolognese/blob/0f3b1d1f3830399a24e69d0f2262e7ff7c0190c9/lib/bolognese/doi_utils.rb
    var ret = "";
    var doi;

    if (url &&
        (doi = url.match(/^(?:(http|https):\/(\/)?(dx\.)?(doi.org|handle.stage.datacite.org|handle.test.datacite.org)\/)?(doi:)?(10\.\d{4,5}\/.+)$/)) &&
        (doi = doi[6]) &&
        (doi = decodeURIComponent(doi).toLowerCase()) &&
        (doi = doi.replace(/\/+$/, ""))
    ) {
        ret = doi
    }

    return ret;
}

export function doi_from_url_path(url: string) {
    var ret = "";
    var path, text, doi, url_t;

    if (url &&
        (url = decodeURIComponent(url)) &&
        (url_t = new URL(url)) &&
        (path = url_t.pathname) &&
        (text = path.match(/(10\.\d{4,5}\/.+)$/)) &&
        (doi = text[1].replace(/\/$/, '').toLowerCase()) &&
        (validate_doi(doi))) {
        ret = doi;
    }

    return ret;
}

export function validate_doi(doi: string) {
    var ret = "";
    var doi_r;

    if (doi &&
        (doi_r = doi.match(/^(10\.\d{4,5}\/.+)$/)) &&
        (doi_r[1])) {
        ret = doi_r[1];
    }

    return ret;
}
