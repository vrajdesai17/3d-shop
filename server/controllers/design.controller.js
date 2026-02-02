import Design from '../models/Design.model.js';
import User from '../models/User.model.js';

export const saveDesign = async (req, res) => {
  try {
    const { name, productType, color, isLogoTexture, isFullTexture, logoDecal, fullDecal, thumbnail } = req.body;

    const design = await Design.create({
      user: req.user._id,
      name,
      productType,
      color,
      isLogoTexture,
      isFullTexture,
      logoDecal,
      fullDecal,
      thumbnail
    });

    await User.findByIdAndUpdate(req.user._id, {
      $push: { savedDesigns: design._id }
    });

    res.status(201).json(design);
  } catch (error) {
    res.status(500).json({ message: 'Error saving design', error: error.message });
  }
};

export const getUserDesigns = async (req, res) => {
  try {
    const designs = await Design.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(designs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching designs' });
  }
};

export const getDesignById = async (req, res) => {
  try {
    const design = await Design.findById(req.params.id);

    if (!design) {
      return res.status(404).json({ message: 'Design not found' });
    }

    if (design.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(design);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching design' });
  }
};

export const updateDesign = async (req, res) => {
  try {
    const design = await Design.findById(req.params.id);

    if (!design || design.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Design not found or unauthorized' });
    }

    Object.assign(design, req.body);
    await design.save();

    res.json(design);
  } catch (error) {
    res.status(500).json({ message: 'Error updating design' });
  }
};

export const deleteDesign = async (req, res) => {
  try {
    const design = await Design.findById(req.params.id);

    if (!design || design.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Design not found or unauthorized' });
    }

    await design.deleteOne();
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { savedDesigns: design._id }
    });

    res.json({ message: 'Design deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting design' });
  }
};
