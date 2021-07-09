import * as viewForm from "./viewForm.js";
import * as model from "./model.js";
import * as viewResults from "./viewResults.js";
import * as viewMain from "./viewMain.js";
import * as viewPhotos from "./viewPhotos.js";

const controlSubmitEntry = function (newEntry) {
  // Format data from form and push to state and local storage
  model.formatNewEntry(newEntry, model.state, model.filePathArr);

  // Render new country with other results in results container
  viewResults.renderCountryResults(model.state);
};

const controlLoadCountryEntries = function (data) {
  // Load data stored in local storage
  model.loadLocalStorage(data);

  // Immediately load these results in the results container
  viewResults.renderCountryResults(model.state);
};

const controlLoadLocationsEntries = function () {
  viewResults.renderLocationResults(model.state);
};

const controlClearStorage = function () {
  model.deleteLocalStorage();
};

const controlPhotoData = function () {
  model.getPhotoData();
};

const controlDisplayPhotoView = function (target, country) {
  viewMain.hidePhotoInterface();

  viewPhotos.renderPhotoCollection(target, country);

  viewPhotos.renderPhotos(target, country);
};

const init = function () {
  viewForm.addHandlerOpenForm();
  viewForm.addHandlerCloseForm();
  viewForm.addHandlerSwitchForm();

  viewForm.addHandlerChooseImages(controlPhotoData);

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
