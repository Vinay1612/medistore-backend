
const db = require('./model/index');
const fs = require("fs");
const csv = require("fast-csv");
const { Op } = require("sequelize");
const Medicine = db.medicine;
const Order = db.order;

exports.uploadCSV = async (req, res) => {
    try {
        if (req.file == undefined) {
            return res.status(400).send("Please upload a CSV file!");
        }

        let medicines = [];
        let path = __basedir + "/tmp/uploads/" + req.file.filename;

        fs.createReadStream(path)
        .pipe(csv.parse({ headers: true }))
        .on("error", (error) => {
            throw error.message;
        })
        .on("data", (row) => {
            medicines.push(row);
        })
        .on("end", () => {
            Medicine.bulkCreate(medicines)
            .then(() => {
                res.status(200).send({
                message:
                    "Uploaded the file successfully: " + req.file.originalname,
                });
            })
            .catch((error) => {
                res.status(500).send({
                message: "Fail to import data into database!",
                error: error.message,
                });
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Could not upload the file: " + req.file.originalname,
        });
    }
};

exports.findMedicine = async (req,res) => {
    const { keyword } = req.query;
    if(keyword){
        try {
            //fetch the cart for the incoming cart id from db
            const medicines = await Medicine.findAll({
                where: {
                    c_name: {
                        [Op.like]: `${keyword}%`
                    } 
                }
            });
            if(medicines){
                
                return res.status(200).send(medicines);
            }
        } catch (error) {
            res.status(500).send({
                message:
                  err.message || "Some error occurred while retrieving medicines.",
            });
        }
    }
    else {
        return res.status(400).send("Invalid input");
    }
};

exports.findMedicineById = async (req, res) => {
    const {id} = req.query;
    if(id){
        try {
            //find medicine for given  id
            const medicine = await Medicine.findOne({
                where: {
                    c_unique_code: id
                }
            });
            return res.status(200).send(medicine);
        } catch (error) {
            console.log(error);
        }
    }
    else {
        return res.status(400).send("medicine id not provided");
    }
};
exports.placeOrder = async (req, res) => {
    if(req.body){
        try {
            const order = await Order.create();
            return res.status(200).send(order);
        } catch (error) {
            console.log(error);
        }
    }
    else {
        return res.status(400).send("Not items present in Order");
    }
};