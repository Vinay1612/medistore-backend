module.exports = function (app) {
  
    const controller = require("./controller.js");

    const upload = require("./upload.middleware");
  
    // upload medicine records via csv
    app.post("/api/uploadCSV",upload.single("file"), controller.uploadCSV);

    //return list of medicines matching given keyword
    app.get("/api/searchMedicine", controller.findMedicine);

    //show medicine for given id
    app.get("/api/getMedicineDetails", controller.findMedicineById);

    //place order for a list of medicines
    app.post("/api/placeOrder", controller.placeOrder);

};