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

    const generateCountryID = Math.floor(Math.random() * 9999999999);
    const generateLocationID = Math.floor(Math.random() * 9999999999);

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
          locationID: generateLocationID,
        },
      ],
    };

    newEntryFormat.timesVisited = newEntryFormat.locations.length;
    newEntryFormat.countryID = generateCountryID;

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
};

export const clearSelectedPhotoData = function () {
  filePathArr = [];
  const newForm = document.querySelector(".new--form");
  newForm.reset();
};

export const pushNewPhotoData = function () {
  filePathArr = [];
  const countryResults = Array.from(document.querySelectorAll(".country"));
  const locationResults = Array.from(document.querySelectorAll(".location"));
  const [selectedCountry] = countryResults.filter(function (country) {
    return country.classList.contains("selected");
  });
  const [selectedLocation] = locationResults.filter(function (location) {
    return location.classList.contains("selected");
  });

  // Country ID of the country that has "selected" class
  const selectedCountryID = Number(selectedCountry.id);

  // Location ID of the location that has "selected" class
  const selectedLocationID = Number(selectedLocation.id);
  const fileInput2 = document.querySelector(".files2");

  const newPhotos = getPhotoData(fileInput2);

  const pushTo = state
    .find(function (country) {
      return country.countryID === selectedCountryID;
    })
    .locations.find(function (location) {
      return location.locationID === selectedLocationID;
    }).photos;

  newPhotos.forEach(function (imgFile) {
    pushTo.push(imgFile);
  });

  // Save the data in the state
  setLocalStorage();
};
