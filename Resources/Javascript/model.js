export let state = [];
export let filePathArr = [];

export const getLocalStorage = function () {
  const storage = localStorage.getItem("Country Entries");
  if (storage) state = JSON.parse(storage);
};

export const setLocalStorage = function () {
  localStorage.setItem("Country Entries", JSON.stringify(state));
};

export const loadLocalStorage = function () {
  getLocalStorage();
};

export const deleteLocalStorage = function () {
  localStorage.removeItem("Country Entries");
};

export const formatNewEntry = function (newEntry, countryData, photoData) {
  // Checks data was actually entered
  if (
    newEntry.country === "" ||
    newEntry.nameTag === "" ||
    newEntry.address === ""
  ) {
    console.log("Please fill out all form fields");
  } else {
    // Checks input data is correct
    const newEntryNormal = normalizeFormInputs(newEntry);

    // Formats form data object
    let newEntryFormat = {
      country: newEntryNormal.country,
      locations: [
        {
          nameTag: newEntryNormal.nameTag,
          locationAddress: newEntryNormal.address,
          startDate: newEntryNormal.startDate,
          endDate: newEntryNormal.endDate,
          photos: photoData,
        },
      ],
    };

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
      console.log(newEntryFormat);
      console.log(state);

      // Save to local storage
      setLocalStorage();
    }
    console.log(state);
  }
};

const formatForExistingEntry = function (newEntry) {
  const location = Object.entries(newEntry)
    .filter(function (entry) {
      if (entry[0].startsWith("locations")) {
        return entry;
      }
    })
    .shift();

  const locationDataArr = location.pop();
  const [locationData] = locationDataArr;
  console.log(locationData);
  return locationData;
};

const normalizeFormInputs = function (inputData) {
  // inputData = initial object from form data
  if (inputData.country.length !== 0 && inputData.nameTag.length !== 0) {
    // Normalize country name input
    const countryCapitalised = capitalise(inputData.country);
    const nameTagCapitalised = capitalise(inputData.nameTag);
    inputData.nameTag = nameTagCapitalised;
    inputData.country = countryCapitalised;
    return inputData;
  }
};

// Capitalisation functionality
const capitalise = function (string) {
  const words = string.split(" ");
  return words
    .map(function (word) {
      return word[0].toUpperCase() + word.toLowerCase().slice(1);
    })
    .join(" ");
};

// Results in an array of photo file paths
export const getPhotoData = function (selector) {
  const fileObject = selector.files;
  const fileArr = Object.values(fileObject);

  fileArr.forEach(function (file) {
    if (file.type === "image/jpeg" || file.type === "image/png") {
      filePathArr.push(file.webkitRelativePath);
    }
  });
  return filePathArr;
};

// Need to write a function that will add the new photo URL elements to the array that currently exists in the target location data object

export const pushNewPhotoData = function (targetLocationID) {
  const countryID = targetLocationID.slice(22);
  const fileInput2 = document.querySelector(".files2");

  // Image file path array now stored in a variable
  const newData = getPhotoData(fileInput2);

  // Find the location entry who's start+end date matches the targetLocationID
  // Country containing location we want to add photos to
  const [pushToCountry] = state.filter(function (country) {
    const countryFormat = country.country.replaceAll(" ", "-");

    // Find the country who matches the ID
    if (countryFormat === countryID) {
      return country;
    }
  });

  // Location containing collection we want to add photos to
  const [pushToLocation] = pushToCountry.locations.filter(function (location) {
    const locationFormat = targetLocationID.slice(0, 21);
    if (locationFormat === `${location.startDate}-${location.endDate}`) {
      return location;
    }
  });

  // Location we want to add photos to
  const pushToPhotosArr = pushToLocation.photos;

  // Push these photos to the correct photo collection array
  filePathArr.forEach(function (file) {
    pushToPhotosArr.push(file);
  });
  console.log(pushToPhotosArr);

  // Replace old photo array with new one in the state
  console.log(state);
  /*state
    .find(function (country) {
      const countryFormat = country.country.replaceAll(" ", "-");
      return countryFormat === countryID;
    })
    .locations.find(function (location) {
      const locationFormat = targetLocationID.slice(0, 21);
      return locationFormat === `${location.startDate}-${location.endDate}`;
    }).photos;*/

  // Save the data in the state
  setLocalStorage();
};
