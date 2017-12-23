const handleError = response => {
  console.log(`Status ${response.status}`)
  return response
    .json()
    .then(data =>
      data.errors.forEach((e, i) => console.log(`Error ${i}: ${e}`))
    )
}

export const fetchPVWatts = (
  system_capacity,
  tilt,
  azimuth,
  array_type = 1,
  losses = 14,
  lat = 41.68,
  lon = -69.96,
  module_type = 0
) => {
  const params = {
    system_capacity,
    tilt,
    azimuth,
    losses,
    lat,
    lon,
    module_type,
    array_type
  }

  console.log(
    `Fetching data from PVWatts with these params: 
    ${JSON.stringify(params, null, 2)}`
  )
  const apiKey = "iN1jnldIv9Eojvl9q9nByGdRGQMsxUddk00pWub3"

  return fetch(
    `https://developer.nrel.gov/api/pvwatts/v5.json?api_key=${apiKey}&${Object.entries(
      params
    )
      .map(e => `${e[0]}=${e[1]}`)
      .join("&")}`
  )
    .then(
      response =>
        response.status === 200 ? response.json() : handleError(response)
    )
    .then(data => data.outputs.ac_monthly)
    .catch(console.log)
}
