import * as viewForm from './viewForm.js';
import * as model from './model.js';
import * as viewResults from './viewResults.js';
/*import '/.core-js/stable'
import '/.regenerator-runtime/runtime'*/

/*if (module.hot) {
    module.hot.accept();
}*/

const controlSubmitEntry = function (newEntry) {
    // Upload new country entry (newEntry = newData object from view)
    model.formatNewEntry(newEntry);
    // Render new country entry
    viewResults.renderCountryResults(model.state) 
}

const controlLoadEntries = function (data) {
    model.loadLocalStorage(data);
    
    viewResults.renderCountryResults(model.state) 
}

const init = function () {
    viewForm.addHandlerOpenForm();
    viewForm.addHandlerCloseForm();
    viewForm.addHandlerSwitchForm();
    viewForm.addHandlerSubmitNewForm(controlSubmitEntry);
    viewResults.addHandlerPageLoad(controlLoadEntries);
}
init();