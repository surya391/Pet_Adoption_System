import RequestType from "../models/request-type-model.js";
export const requestTypeSchema = {
    type: {
      isString: {
        errorMessage: 'Pet requst type must be a string.',
      },
      notEmpty: {
        errorMessage: 'Pet requst type is required.',
      },
      trim: true,
      custom: {
        options: async function (value) {
            const petrequestType = await RequestType.findOne({ type: value })
            if (petrequestType) {
                throw new Error('name is already taken')
            } else {
                return true
            }
        }
    }
    },
  };