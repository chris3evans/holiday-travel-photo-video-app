export let state = [];

export const getLocalStorage = function () {
  const storage = localStorage.getItem('Country Entries')
  if (storage) state = JSON.parse(storage);
}

export const setLocalStorage = function () {
  localStorage.setItem('Country Entries', JSON.stringify(state))
}

export const loadLocalStorage = function () {
  getLocalStorage();
}

export const deleteLocalStorage = function () {
  localStorage.removeItem('Country Entries');
}

export const formatNewEntry = function (newEntry, countryData) {
  // Formats form data object
  let newEntryFormat = {
    country: newEntry.country,
    locations: [{
      nameTag: newEntry.nameTag,
        locationAddress: newEntry.address,
        startDate: newEntry.startDate,
        endDate: newEntry.endDate,
    }],
  }

  newEntryFormat.timesVisited = newEntryFormat.locations.length;

  // Check if country entry already exists
  const match = countryData.find(function (country) {
    return country.country === newEntryFormat.country;
  });

  // If country entry does exist and there is data in the state
  if (match && state.length !== 0) {
      // Nested object containing specific location data
      const newData = formatForExistingEntry(newEntryFormat);

      // Push this data to the country's location array
      match.locations.push(newData);

      // Update times visited value
      match.timesVisited = match.locations.length;
      
      // Save to local storage
      setLocalStorage();

  // If country entry does NOT exist
    } else {
      // Push entire new country object to state
      state.push(newEntryFormat);

      // Save to local storage
      setLocalStorage();
    }
    console.log(state);
}

const formatForExistingEntry = function (newEntry) {
  const location = Object.entries(newEntry).filter(function(entry) {
    if (entry[0].startsWith('locations')) {
      return entry
    }
  }).shift();

  const locationDataArr = location.pop();
  const [locationData] = locationDataArr
  return locationData;
}