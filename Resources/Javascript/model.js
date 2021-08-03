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

export const formatNewEntry = function (newEntry, photoData) {
  const photoObjectArr = [];
  photoData.forEach(function (photo) {
    const generatePhotoID = +Math.floor(Math.random() * 9999999999);
    const photoObject = {
      filePath: photo,
      notes: [],
      photoID: generatePhotoID,
    };

    photoObjectArr.push(photoObject);
  });

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

    // Total number photos in country
    let totalPhotosArr = [];

    newEntryFormat.locations.forEach(function (location) {
      totalPhotosArr.push(location.photos);
    });

    totalPhotosArr = totalPhotosArr.reduce(function (a, b) {
      return a.concat(b);
    });
    console.log(totalPhotosArr);
    newEntryFormat.totalPhotos = totalPhotosArr.length;

    // Times visited
    newEntryFormat.timesVisited = newEntryFormat.locations.length;
    newEntryFormat.countryID = generateCountryID;

    console.log(newEntryFormat);
    return newEntryFormat;
  }
};

const checkForCountry = function (newEntry, countryData) {
  // Does country exist
  const countryExist = countryData.some(function (country) {
    return country.country === newEntry.country;
  });

  if (countryExist === false) {
    return undefined;
  } else {
    const countryMatch = countryData.find(function (country) {
      return country.country === newEntry.country;
    });
    return countryMatch;
  }
};

const checkForNameTag = function (newEntry, existingCountry) {
  // If country already exists check for existing name tag
  if (existingCountry) {
    const nameTagExist = existingCountry.locations.some(function (location) {
      return location.nameTag === newEntry.locations[0].nameTag;
    });
    if (nameTagExist) {
      const nameTagMatch = existingCountry.locations.find(function (location) {
        return location.nameTag === newEntry.locations[0].nameTag;
      });
      return nameTagMatch;
    }

    // If country does not exist then push new object to state
  } else {
    state.push(newEntry);
  }
};

const checkForLocationAddress = function (newEntry, countryData) {
  const addressMatch = countryData
    .find(function (country) {
      return country.country === newEntry.country;
    })
    .locations.find(function (location) {
      return location.locationAddress === newEntry.locations[0].locationAddress;
    });
  return addressMatch;
};

export const addToExistingEntry = function (
  newEntry,
  countryMatch,
  nameTagMatch,
  locationAddressMatch
) {
  // If the country + nameTag + address already exist
  if (nameTagMatch && locationAddressMatch && countryMatch) {
    // New photos to be added to existing location
    const newPhotos = newEntry.locations[0].photos;

    // Push each of them into the existing photo array
    newPhotos.forEach(function (photo) {
      nameTagMatch.photos.push(photo);
    });

    // Save to local storage
    setLocalStorage();
  }
};

const formatForExistingCountry = function (newEntry) {
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

export const saveEntryData = function (
  newEntry,
  entry,
  countryData,
  photoData
) {
  // If no countries or locations at all
  if (state.length === 0) {
    const newEntryFormat = formatNewEntry(newEntry, photoData);
    state.push(newEntryFormat);
    setLocalStorage();
  } else {
    // Check if country exists
    const existingCountry = checkForCountry(newEntry, countryData);

    const existingNameTag = checkForNameTag(entry, existingCountry);
    const existingLocationAddress = checkForLocationAddress(entry, countryData);

    // If the country is new
    if (!existingCountry) {
      // Save state to local storage
      setLocalStorage();

      // If the country already exists but different location
    } else if (
      (existingCountry && !existingNameTag) ||
      !existingLocationAddress
    ) {
      // Location data to push
      const newLocationData = formatForExistingCountry(entry);

      // Push it to existing countries location array
      existingCountry.locations.push(newLocationData);

      // Update times visited value
      existingCountry.timesVisited = existingCountry.locations.length;

      // Update the total number photos in country
      let totalPhotosArr = [];

      existingCountry.locations.forEach(function (location) {
        totalPhotosArr.push(location.photos);
      });

      totalPhotosArr = totalPhotosArr.reduce(function (a, b) {
        return a.concat(b);
      });
      console.log(totalPhotosArr);
      existingCountry.totalPhotos = totalPhotosArr.length;
      console.log(existingCountry);

      // Save to local storage
      setLocalStorage();

      // If the country and location already exist
    } else {
      addToExistingEntry(
        entry,
        existingCountry,
        existingNameTag,
        existingLocationAddress
      );
    }
  }
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

  fileArr.forEach(function (file) {
    if (file.type === "image/jpeg" || file.type === "image/png") {
      filePathArr.push(file.webkitRelativePath);
    }
  });
};

// For adding more photos to current collection
export const getPhotoData2 = function (selector) {
  const fileObject = selector.files;
  const fileArr = Object.values(fileObject);

  fileArr.forEach(function (file) {
    if (file.type === "image/jpeg" || file.type === "image/png") {
      console.log(file);
      const generatePhotoID = +Math.floor(Math.random() * 9999999999);
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

  // Collection which contains the photo we want to add a note to
  const targetPhotoCollection = state
    .find(function (country) {
      return country.countryID === countryId;
    })
    .locations.find(function (location) {
      return location.locationID === locationId;
    }).photos;

  // Note stored in a variable
  const note = photoNoteInput.value;
  const photoArr = Array.from(photosNl);

  // ID of photo to add note to
  const targetPhotoID = +photoArr.find(function (photo) {
    return photo.classList.contains("selected");
  }).id;

  // Note array to push note value to
  const pushNoteTo = targetPhotoCollection.find(function (photo) {
    return photo.photoID === targetPhotoID;
  }).notes;

  // Note is now inside the notes array for that photo
  pushNoteTo.push(note);

  setLocalStorage();
};
