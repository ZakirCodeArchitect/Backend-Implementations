const { default: mongoose } = require("mongoose");
const path = require('path')
const fs  = require('fs')
const { format } = require('date-fns');
const Products = require('../model/productsSchema') // Model
// processing Data:
// const countryUniversities = async (req, res) => {
//     const  { country } = req.params;

//     try{
//         const url = await axios.get(`http://universities.hipolabs.com/search?country=${country}`)
//         const universities = url.data;

//         if(!universities.length){
//             return res.status(204).json({
//                 message: `No university found for this country : ${country}`
//             })
//         }

//         const processedData = universities.map((university, index) => ({
//             id: index + 1,
//             name: university.name,
//             state_province: university['state-province'] || 'N/A',
//             country: university.country,
//             website: university.web_pages.join(', '),
//             domains: university.domains.join(', ')

//         }));

//         const numOfUniversities = universities.length;

//         res.json({message: ` Universities in this ${country} : ${numOfUniversities}`, data: processedData});

//     } catch(error){
//         console.log("Error Getting Data", error.message);
//         res.status(500).json({message:"Failed to fetch data of the universities"});
//     }

    
// }

const getProducts = async (req, res) => {
    try{
        const products = await Products.find();
        res.status(200).json(products)
    }catch(err)
    {
        res.status(404).json({
            message: "Failed to retrieve Data"
        })
    }
}
const insertProducts = async (req, res) => {
    try{
        const filePath = path.join(__dirname,'../productsInformation.json' )
        const productsData = fs.readFileSync(filePath, 'utf-8')
        const products = JSON.parse(productsData);

        await Products.insertMany(products);
        res.status(200).json({
            message:"Data inserted successfully",
            data: products
        })

    } catch(error){
        console.log("Error inserting  Data", error.message);
        res.status(500).json({message:"Failed to insert data in collection"});
    }

    
}

const certainProduct = async (req, res) => {
    const {min, max} = req.query;
    if(min ===undefined || max === undefined)
    {
        res.status(404).send("Both Min and Max are required!")
    }

    try{
        const products = await Products.find(
            {price: {$gte: min, $lte:max}},
        );
        res.status(200).json(products)
    }catch(err)
    {
        res.status(404).json({
            message: "Failed to retrieve Data"
        })
    }
}

const expiredProducts = async (req, res) => {

    const currentDate = new Date();
    const formatted = format(currentDate, 'yyyy-MM-dd')
    console.log(formatted);

    try{
        const expiredproducts = await Products.find(
            {expiry_date: {$lt: currentDate }}, // less than current date
        );
        res.status(200).json(expiredproducts)
    }catch(err)
    {
        res.status(404).json({
            message: "Failed to retrieve Data"
        })
    }
}

const certainQuantity = async (req, res) => {
    const {productQuantity} = req.query;

    try{
        const products = await Products.find(
            {quantity: { $lte:productQuantity}},
        );
        res.status(200).json(products)
    }catch(err)
    {
        res.status(404).json({
            message: "Failed to retrieve Data"
        })
    }
}

const certainFirm = async (req, res) => {
    const {firmName} = req.query;
    console.log("Firm Name: ",firmName);
    try{
        const products = await Products.find({
            firm_name: { $in: firmName} 
        });
        res.status(200).json(products)
    }catch(err)
    {
        res.status(404).json({
            message: "Failed to retrieve Data"
        })
    }
}

const removeExpiredProducts = async (req, res) => {
    const currentDate = new Date();

    try{
        const expiredproducts = await Products.deleteMany(
            {expiry_date: {$lt: currentDate }}, // less than current date
        );
        res.status(200).json({
            message:" Expired Products are deleted"
        })
    }catch(err)
    {
        res.status(404).json({
            message: "Failed to retrieve Data"
        })
    }
}

const updateFirmDetails = async (req, res) => {
    const {firmName, updatedPrice} = req.query;
    console.log(`Updated Price: ${updatedPrice} of this Firm: ${firmName}`)

    try{
        const products = await Products.updateMany(
            {firm_name: { $in: firmName}},
            {price: updatedPrice}
        );
        res.status(200).json({
            message:"Price Updated!",
            products
        })
    }catch(err)
    {
        res.status(404).json({
            message: "Failed to retrieve Data"
        })
    }
}

module.exports = {
    insertProducts,
    getProducts,
    certainProduct,
    expiredProducts,
    certainQuantity,
    certainFirm,
    removeExpiredProducts,
    updateFirmDetails
};

