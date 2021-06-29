import * as viewForm from './viewForm.js';

/*import '/.core-js/stable'
import '/.regenerator-runtime/runtime'*/

/*if (module.hot) {
    module.hot.accept();
}*/

const controlAddEntry = async function (newEntry) {
    try {
        // Upload new entry

        // Render new entry
        
    }
    catch  (err) {
        console.error(err.message);
    }
}

const init = function () {
    viewForm.addHandlerOpenForm();
    viewForm.addHandlerCloseForm();
    viewForm.addHandlerSwitchForm()
}
init();