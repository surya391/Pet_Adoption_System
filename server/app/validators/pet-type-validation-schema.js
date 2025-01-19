import PetType from "../models/pet-type-model.js";
export const petTypeSchema = {
    petType: {
      isString: {
        errorMessage: 'Pet type must be a string.',
      },
      notEmpty: {
        errorMessage: 'Pet type is required.',
      },
      trim: true, 
      custom: {
        options: async function (value) {
            const pettype = await PetType.findOne({ petType: value })
            if (pettype) {
                throw new Error('name is already taken')
            } else {
                return true
            }
        }
    }
    },
  };
  