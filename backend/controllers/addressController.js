const User = require("../models/User");

exports.addAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const address = req.body;

    // Validate address fields
    const requiredFields = [
      "state",
      "city",
      "address",
      "zipcode",
      "transferee",
    ];
    const transfereeFields = ["full_name", "phone_number"];

    for (const field of requiredFields) {
      if (!address[field]) {
        return res
          .status(400)
          .json({ error: `Missing required field: ${field}` });
      }
    }

    for (const field of transfereeFields) {
      if (!address.transferee || !address.transferee[field]) {
        return res
          .status(400)
          .json({ error: `Missing required field: transferee.${field}` });
      }
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if user already has 15 addresses
    if (user.addresses.length >= 15) {
      return res
        .status(400)
        .json({ error: "Cannot add more than 15 addresses" });
    }

    // Check if zipcode already exists in user's addresses
    if (user.addresses.some((addr) => addr.zipcode === address.zipcode)) {
      return res
        .status(400)
        .json({ error: "Zipcode already exists in user's addresses" });
    }

    user.addresses.push(address);
    await user.save();

    res.status(200).json({ message: "Address added successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.removeAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const addressIndex = req.params.index;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.addresses.splice(addressIndex, 1);
    await user.save();

    res.status(200).json({ message: "Address removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.getAddresses = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user.addresses);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.editAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const addressIndex = parseInt(req.params.index);
    const newAddress = req.body;
    newAddress.zipcode = Number(newAddress.zipcode); // Convert zipcode to Number

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if zipcode already exists in user's other addresses
    if (
      user.addresses.some(
        (addr, index) =>
          index !== addressIndex && addr.zipcode === newAddress.zipcode
      )
    ) {
      return res
        .status(400)
        .json({ error: "Zipcode already exists in user's other addresses" });
    }

    user.addresses[addressIndex] = newAddress;
    await user.save();

    res.status(200).json({ message: "Address updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};
