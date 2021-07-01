export let state = [];

export const getLocalStorage = function () {
  const storage = localStorage.getItem('Country Entries')
  if (storage) state = JSON.parse(storage);
}

export const setLocalStorage = function () {
  localStorage.setItem('Country Entries', JSON.stringify(state))
}

export const deleteLocalStorage = function () {
  localStorage.removeItem('Country Entries');
}

export const formatNewEntry = function (newEntry) {
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
  console.log(newEntryFormat);

  // Moves new country to state
  state.push(newEntryFormat);
  console.log(state);

 // Stores this data in the browsers local storage
  setLocalStorage();
}

export const loadLocalStorage = function () {
  getLocalStorage();
  console.log(state);
}