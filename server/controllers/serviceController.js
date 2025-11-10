import Service from "../models/Service.js";

export const getServices = async (req, res) => {
  try {
    const { q, active } = req.query;
    const filter = {};
    if (active === "true") filter.isActive = true;
    if (q) filter.title = { $regex: q, $options: "i" };

    const services = await Service.find(filter).sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch services" });
  }
};

export const getService = async (req, res) => {
  try {
    const s =
      (await Service.findOne({ slug: req.params.slug })) ||
      (await Service.findById(req.params.slug));
    if (!s) return res.status(404).json({ message: "Service not found" });
    res.json(s);
  } catch {
    res.status(400).json({ message: "Invalid service ID/slug" });
  }
};

export const createService = async (req, res) => {
  try {
    const { title, description, icon, image, isActive } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const service = await Service.create({
      title,
      description,
      icon,
      image,
      isActive,
    });
    res.status(201).json(service);
  } catch (err) {
    res
      .status(400)
      .json({ message: err.message || "Could not create service" });
  }
};

export const updateService = async (req, res) => {
  try {
    const s = await Service.findById(req.params.id);
    if (!s) return res.status(404).json({ message: "Service not found" });

    s.set(req.body);
    await s.save();
    res.json(s);
  } catch (err) {
    res
      .status(400)
      .json({ message: err.message || "Could not update service" });
  }
};

export const deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service removed" });
  } catch {
    res.status(400).json({ message: "Could not delete service" });
  }
};
