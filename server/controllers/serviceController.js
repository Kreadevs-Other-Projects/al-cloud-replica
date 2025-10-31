import Service from "../models/Service.js";

export const getServices = async (req, res) => {
  const services = await Service.find().sort({ createdAt: -1 });
  res.json(services);
};

export const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(service);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteService = async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: "Service removed" });
};
