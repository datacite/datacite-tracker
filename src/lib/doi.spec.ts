import { doi_from_url, validate_doi, doi_from_url_path, doi_from_schema_org_json } from './doi';

// Test get DOI from a DOI style proxy URL i.e. httpos://doi.org/10.1234/56789
test("DOI from doi proxy URL", () => {
    expect(doi_from_url("https://doi.org/10.5072/EXAMPLE.12345")).toBe("10.5072/example.12345");
    expect(doi_from_url("https://doi.org/10.5072/EXAMPLE.12345/")).toBe("10.5072/example.12345");
    expect(doi_from_url("https://doi.org/10.5072/EXAMPLE.12345/1")).toBe("10.5072/example.12345/1");
    expect(doi_from_url("https://doi.org/10.5072/EXAMPLE.12345/1/")).toBe("10.5072/example.12345/1");
    expect(doi_from_url("https://doi.org/10.5072/EXAMPLE.12345/1/2")).toBe("10.5072/example.12345/1/2");
    expect(doi_from_url("https://doi.org/10.5072/EXAMPLE.12345/1/2/")).toBe("10.5072/example.12345/1/2");
});

// Test validate DOI
test("Validate DOI", () => {
    expect(validate_doi("10.5072/example.12345")).toBe("10.5072/example.12345");
});

// DOI from URL path
test("DOI from URL path", () => {
    expect(doi_from_url_path("https://example.com/dataset/10.5072/EXAMPLE.12345/")).toBe("10.5072/example.12345");
    expect(doi_from_url_path("https://example.com/dataset/doi:10.5072/EXAMPLE.12345/")).toBe("10.5072/example.12345");
    expect(doi_from_url_path("https://example.com/dataset/doi:10.5072%2FEXAMPLE.12345/")).toBe("10.5072/example.12345");
});

// DOI from schema.org json ld
test("DOI from schema.org json ld", () => {
    expect(doi_from_schema_org_json('{"@context":"http://schema.org","@id":"https://doi.org/10.5072/EXAMPLE.12345"}')).toBe("10.5072/example.12345");
    expect(doi_from_schema_org_json('{"@context":"http://schema.org","identifier":"10.5072/EXAMPLE.12345"}')).toBe("10.5072/example.12345");
    expect(doi_from_schema_org_json('{"@context":"http://schema.org","@id":"https://doi.org/10.5072/EXAMPLE.12345","identifier":"10.5072/EXAMPLE.12345"}')).toBe("10.5072/example.12345");
});