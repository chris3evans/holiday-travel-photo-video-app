import * as viewForm from "./viewForm.js";
import * as model from "./model.js";
import * as viewResults from "./viewResults.js";
import * as viewMain from "./viewMain.js";
import * as viewPhotos from "./viewPhotos.js";

const fileInput = document.querySelector("#selectedFiles");

const controlSubmitEntry = function (newEntry) {
  // Format data from form and push to state and local storage
  model.formatNewEntry(newEntry, model.state, model.filePathArr);

  // Render new country with other results in results container
  viewResults.renderCountryResults(model.state);

  // Clear photo data selected
  model.clearSelectedPhotoData();
};

const controlLoadCountryEntries = function (data) {
  // Load data stored in local storage
  model.loadLocalStorage(data);

  // Immediately load these results in the results container
  viewResults.renderCountryResults(model.state);
};

const controlLoadLocationsEntries = function (targetCountryID) {
  viewResults.renderLocationResults(targetCountryID, model.state);
};

const controlClearStorage = function () {
  model.deleteLocalStorage();
};

const controlPhotoData = function () {
  model.getPhotoData(fileInput);
};

const controlDisplayPhotoView = function (target, country) {
  viewMain.hidePhotoInterface();

  viewPhotos.renderPhotoCollection(target, country, model.state);

  viewPhotos.renderPhotos(target, country, model.state);
  console.log(target);
  console.log(country);
};

const controlAddToCol = function (collectionID) {
  // Pushes additional photos and saves in local storage
  model.pushNewPhotoData(collectionID);

  // Re-render the photo view with new photo data
};

const controlCloseForm = function () {
  // Clear the photo data array
  model.clearSelectedPhotoData();

  // Reset the form itself
  viewForm.resetForm();
};

const init = function () {
  viewForm.addHandlerOpenForm(controlCloseForm);

  viewForm.addHandlerCloseForm(controlCloseForm);

  viewForm.addHandlerChooseImages(
    controlPhotoData,
    /*model.getPhotoData(fileInput)*/
    model.fileInput
  );

  viewPhotos.addHandlerAddToCol(controlAddToCol);

  viewPhotos.addHandlerLeavePhotoView();
  viewResults.addHandlerRevealPhotoView(controlDisplayPhotoView);

  viewForm.addHandlerSubmitNewFormClick(controlSubmitEntry);
  viewForm.addHandlerSubmitNewFormKey(controlSubmitEntry);
  viewResults.addHandlerPageLoad(controlLoadCountryEntries);

  viewMain.addHandlerClearStorage(controlClearStorage);
  viewResults.addHandlerLocationResults(controlLoadLocationsEntries);
  viewResults.addHandlerGoBack(controlLoadCountryEntries);
};
init();
