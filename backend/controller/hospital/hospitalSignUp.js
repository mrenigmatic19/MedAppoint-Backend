const hospitalModel = require("../../models/hospitalModel");
const bcrypt = require('bcryptjs');
const Web3 = require('web3');
const { abi, bytecode } = require("../../contracts/HospitalRegistry.json");

async function hospitalSignUpController(req, res) {
    try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            throw new Error("Please provide all required fields.");
        }

        // Check if hospital already exists
        const existingHospital = await hospitalModel.findOne({ email });
        if (existingHospital) {
            throw new Error("Hospital already exists.");
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Save initial hospital data (without smartContractAddress)
        const hospitalData = new hospitalModel({
            name,
            password: hashedPassword,
        });
        const savedHospital = await hospitalData.save();

        // Initialize Web3 and admin account
        const web3 = new Web3("https://rpc-mumbai.maticvigil.com");
        const adminAccount = web3.eth.accounts.privateKeyToAccount(process.env.ADMIN_PRIVATE_KEY);
        web3.eth.accounts.wallet.add(adminAccount);

        // Deploy Smart Contract
        const contract = new web3.eth.Contract(abi);
        const deploy = contract.deploy({ data: bytecode });
        const gas = await deploy.estimateGas();

        const instance = await deploy.send({
            from: adminAccount.address,
            gas,
        });

        // Call contract method to register hospital
        await instance.methods.registerHospital(name, email).send({
            from: adminAccount.address
        });

        // Update hospital record with deployed smart contract address
        savedHospital.smartContractAddress = instance.options.address;
        await savedHospital.save();

        res.status(201).json({
            message: "Hospital registered successfully and smart contract deployed.",
            data: savedHospital,
            success: true,
            error: false
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || "An error occurred.",
            error: true,
            success: false
        });
    }
}

module.exports = hospitalSignUpController;
