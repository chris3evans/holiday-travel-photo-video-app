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
  const generatePhotoID = +Math.floor(Math.random() * 9999999999);
  const photoObjectArr = [];
  photoData.forEach(function (photo) {
    const photoObject = {
      filePath: photo,
      notes: [],
      photoID: generatePhotoID,
    };

    photoObjectArr.push(photoObject);
  });
  console.log(photoObjectArr);
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
          photos: photoObjectArr,
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

// For initial photo add
export const getPhotoData1 = function (selector) {
  const fileObject = selector.files;
  const fileArr = Object.values(fileObject);
  console.log(fileArr);

  fileArr.forEach(function (file) {
    if (file.type === "image/jpeg" || file.type === "image/png") {
      filePathArr.push(file.webkitRelativePath);
      console.log(filePathArr);
    }
  });
};

// For adding more photos to current collection
export const getPhotoData2 = function (selector) {
  const fileObject = selector.files;
  const fileArr = Object.values(fileObject);
  console.log(fileArr);

  const generatePhotoID = +Math.floor(Math.random() * 9999999999);

  fileArr.forEach(function (file) {
    if (file.type === "image/jpeg" || file.type === "image/png") {
      console.log(file);
      const photoObject = {
        filePath: file.webkitRelativePath,
        notes: [],
        photoID: generatePhotoID,
      };
      filePathArr.push(photoObject);
    }
  });
  return filePathArr;
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

  const newPhotos = getPhotoData2(fileInput2);
  console.log(newPhotos);

  const pushTo = state
    .find(function (country) {
      return country.countryID === selectedCountryID;
    })
    .locations.find(function (location) {
      return location.locationID === selectedLocationID;
    }).photos;

  console.log(pushTo);

  newPhotos.forEach(function (imgFile) {
    console.log(imgFile.filePath);
    pushTo.push(imgFile);
  });

  // Save the data in the state
  setLocalStorage();
};

export const addNewNote = function () {
  const countriesNl = document.querySelectorAll(".country");
  const locationsNl = document.querySelectorAll(".location");
  const photoNoteInput = document.querySelector(".photo__note--input");
  const photosNl = document.querySelectorAll(".photo");

  const countriesArr = Array.from(countriesNl);

  const countryId = +countriesArr.find(function (country) {
    if (country.classList.contains("selected")) {
      return country;
    }
  }).id;

  const locationsArr = Array.from(locationsNl);

  const locationId = +locationsArr.find(function (location) {
    if (location.classList.contains("selected")) {
      return location;
    }
  }).id;

  /*const targetLocation = state
    .find(function (country) {
      return country.countryID === countryId;
    })
    .locations.find(function (location) {
      return location.locationID === locationId;
    });*/

  // Collection which contains the photo we want to add a note to
  const targetPhotoCollection = state
    .find(function (country) {
      return country.countryID === countryId;
    })
    .locations.find(function (location) {
      return location.locationID === locationId;
    }).photos;
  console.log(targetPhotoCollection);

  // Note stored in a variable
  const note = photoNoteInput.value;
  const photoArr = Array.from(photosNl);

  // ID of photo to add note to
  const targetPhotoID = +photoArr.find(function (photo) {
    return photo.classList.contains("selected");
  }).id;
  console.log(targetPhotoID);

  // Note array to push note value to
  const pushNoteTo = targetPhotoCollection.find(function (photo) {
    return photo.photoID === targetPhotoID;
  }).notes;
  console.log(pushNoteTo);

  // Note is now inside the notes array for that photo
  pushNoteTo.push(note);
  console.log(pushNoteTo);

  setLocalStorage();
};
