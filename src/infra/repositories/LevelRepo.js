const levelRepoImp = (levelModel) => {
  const Create = async (Level) => {
    try {
      const createdLevel = await levelModel.create(Level);
      return createdLevel.toObject();
    } catch (error) {
      console.log(error.message);
    }
  };
  const updatelevel = async (Id, level) => {
    console.log(Id, "repo");
    const id = Id.levelId;
    const { name, description, image } = level;
    try {
      const updatedlevel = await levelModel.findByIdAndUpdate(
        { _id: id },
        { name, description, image }
      );
      return updatedlevel.toObject();
    } catch (error) {
      console.log(error.message);
    }
  };
  const listLevel = async () => {
    try {
      const allLevel = await levelModel.find();
      return allLevel;
    } catch (error) {
      console.log(error.message);
    }
  };
  const leveldelete = async (levelId) => {
    try {
      id = levelId.levelId;
      const deleteLevel = await levelModel.findByIdAndDelete({ _id: id });
      return deleteLevel;
    } catch (error) {
      console.log(error.message);
    }
  };
  const findById = async (levelId) => {
    try {
      id = levelId.levelId;
      const fechdata = await levelModel.findById({ _id: id });
      return fechdata;
    } catch (error) {
      console.log(error.message);
    }
  };
  return {
    Create,
    updatelevel,
    listLevel,
    leveldelete,
    findById,
  };
};

module.exports = {
  levelRepoImp,
};
