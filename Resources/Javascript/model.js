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
  // Checks data was actually entered
  if (newEntry.country === '' || newEntry.nameTag === '' || newEntry.address === '') {
    console.log('Please fill out all form fields');
  } else {
    // Checks input data is correct
    const newEntryNormal = normalizeFormInputs(newEntry);

    // Formats form data object
    let newEntryFormat = {
      country: newEntryNormal.country,
      locations: [{
        nameTag: newEntryNormal.nameTag,
        locationAddress: newEntryNormal.address,
        startDate: newEntryNormal.startDate,
        endDate: newEntryNormal.endDate,
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

const normalizeFormInputs = function (inputData) {
  // inputData = initial object from form data
  if (inputData.country.length !== 0 && inputData.nameTag.length !== 0) {
    // Normalize country name input
    const countryCapitalised = capitalise(inputData.country)
    const nameTagCapitalised = capitalise(inputData.nameTag);
    inputData.nameTag = nameTagCapitalised;
    inputData.country = countryCapitalised;
    return inputData;
  }
}

// Capitalisation functionality
const capitalise = function (string) {
  const words = string.split(' ');
  return words.map(function(word) {
    return word[0].toUpperCase() + word.toLowerCase().slice(1);
  })
  .join(' ');
}
