// It will create an URI to search coffee shop using params url

export async function shopLocator() {
    const searchUrl: string = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates'
    const params: any = { // TODO: need to tackle with proper type
        f: 'json',
		category: 'Coffee Shop',
		location: [-117.2887949, 34.0594601],
		outFields: ['Place_addr', 'PlaceName'],
		maxLocations: 10,
    }

    const paramVals = []
    for (const k in params) {
        const val = encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
        paramVals.push(val)
    }

    const url = `${searchUrl}?${paramVals.join('&')}`
    const data = await fetch(url)
    const { candidates } = await data.json()
    return candidates
}
