const teamModel = require("../models/teamModel");

const createUser = async (req, res) => {
  try {
    const { name, designation, linkedin_url } = req.body;

    // const newName = name.toLowerCase().replace(/ /g, "");

    const userExists = await teamModel.findOne({ name });

    if (userExists) {
      return res.status(400).json({
        message: "This user already exists. Try adding user with another name",
      });
    }

    // Check if the file is uploaded correctly
    // console.log("Uploaded file:", req.file);

    // Get the filename of the uploaded image from the request
    const uploadedImagePath = req.file.path;
    const uploadedImageName = req.file.originalname;

    // console.log("Uploaded Image URL:", uploadedImage);

    // Get the total number of existing users
    const totalUsers = await teamModel.countDocuments();

    const newUser = new teamModel({
      name,
      designation,
      linkedin_url,
      image: {
        name: uploadedImageName,
        path: uploadedImagePath,
      },
      sequence: totalUsers + 1, // Assign a sequence value based on the total number of existing users
    });

    await newUser.save();

    res.status(200).json({
      message: "User created successfully.",
      newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in adding user due to ${error.message}`,
    });
  }
};

const updateUser = async (req, res) => {
  // try {
  //   const { name, designation, linkedin_url } = req.body;
  //   let image = req.body.image;

  //   if (req.file) {
  //       // If a new image file is uploaded, update the image
  //       image = req.file.path;
  //     }

  //   const updatedUser = await teamModel.findOneAndUpdate(
  //     {
  //       _id: req.params._id,
  //     },
  //     {
  //       name,
  //       designation,
  //       linkedin_url,
  //       image
  //     },{ new: true }
  //   );

  //   if (!updatedUser) {
  //     return res.status(400).json({
  //       message: "No user found to update.",
  //     });
  //   }

  //   return res.status(200).json({
  //     message: "User updated successfully.",
  //     updatedUser,
  //   });
  // } catch (error) {
  //   return res.status(500).json({
  //     message: `Error in updating user due to ${error.message}`,
  //   });
  // }
  try {
    const { name, designation, linkedin_url, sequence } = req.body;
    // let image = req.body.image;
    let image = req.body.image;

    // Check if a new image file is uploaded
    // const uploadedImagePath = req.file.path;
    // const uploadedImageName = req.file.originalname;

    // Check if a new image file is uploaded
    if (req.file) {
      // If a new image file is uploaded, update the image
      image = {
        name: req.file.originalname,
        path: req.file.path,
      };
    }

    // Get the current sequence of the user
    // const currentSequence = user.sequence;

    // // Update the sequence field of the user
    // user.sequence = newSequence;

    // // Save the updated user
    // await user.save();

    // // Update the sequence of other users if necessary
    // if (currentSequence !== newSequence) {
    //   const otherUsers = await teamModel.find({ name: { $ne: userName } });
    //   for (const otherUser of otherUsers) {
    //     if (otherUser.sequence === newSequence) {
    //       otherUser.sequence = currentSequence;
    //       await otherUser.save();
    //     }
    //   }
    // }

    // // Sort users by sequence field
    // const sortedUsers = await teamModel.find().sort({ sequence: 1 });

    const updatedUser = await teamModel.findByIdAndUpdate(
      req.params._id,
      {
        name,
        designation,
        linkedin_url,
        image,
        // sequence: sortedUsers,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(400).json({
        message: "No user found to update.",
      });
    }

    return res.status(200).json({
      message: "User updated successfully.",
      updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating user due to ${error.message}`,
    });
  }
};

const getUser = async (req, res) => {
  //   try {
  //     const user = await teamModel.findById(
  //     //   {
  //     //   _id: req.params._id
  //     // }
  //     req.params._id
  //     );

  //     // console.log(req.params._id)
  //     if (!user) {
  //       return res.status(400).json({
  //         message: "No user is created with this id. ",
  //       });
  //     }

  //     return res.status(200).json({
  //       message: "User fetched successfully.",
  //       user,
  //     });
  //   } catch (error) {
  //     return res.status(500).json({
  //       message: `Error in fetching user due to ${error.message}`,
  //     });
  //   }

  try {
    const user = await teamModel.findById(req.params._id);
    console.log(req.params._id);
    if (!user) {
      return res.status(400).json({
        message: "No user is created with this id.",
      });
    }

    return res.status(200).json({
      message: "User fetched successfully.",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching user due to ${error.message}`,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await teamModel.find();
    // console.log(users)

    if (users.length === 0) {
      return res.status(400).json({
        message: "No users are created. Kindly create one.",
      });
    }

    return res.status(200).json({
      message: "All user fetched successfully.",

      users,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching users due to ${error.message}`,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userExists = await teamModel.findById({
      _id: req.params.id,
    });

    if (userExists.length === 0) {
      return res.status(400).json({
        message: "No users are created. Kindly create one.",
      });
    }

    const deleteuser = await teamModel.findOneAndDelete({
      _id: req.params._id,
    });

    return res.status(200).json({
      message: "User deleted successfully.",
      deleteuser,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting user due to ${error.message}`,
    });
  }
};

const sequenceUser = async (req, res) => {
  try {
    const userName = req.params.name;
    const newSequence = req.body.sequence;

    // Find the user by name
    const user = await teamModel.findOne({ name: userName });

    // Check if the user exists
    if (!user) {
      return res.status(400).json({
        message: "User not found.",
      });
    }

    // Get the current sequence of the user
    const currentSequence = user.sequence;

    // Update the sequence field of the user
    user.sequence = newSequence;

    // Save the updated user
    await user.save();

    // Update the sequence of other users if necessary
    if (currentSequence !== newSequence) {
      const otherUsers = await teamModel.find({ name: { $ne: userName } });
      for (const otherUser of otherUsers) {
        if (otherUser.sequence === newSequence) {
          otherUser.sequence = currentSequence;
          await otherUser.save();
        }
      }
    }

    // Sort users by sequence field
    const sortedUsers = await teamModel.find().sort({ sequence: 1 });

    return res.status(200).json({
      message: "User sequenced successfully.",
      users: sortedUsers,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in sequencing user due to ${error.message}`,
    });
  }
};

module.exports = {
  createUser,
  updateUser,
  getUser,
  getUsers,
  deleteUser,
  sequenceUser,
};
