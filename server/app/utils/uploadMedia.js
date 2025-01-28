import cloudinary from "../../config/cloudinary/cloudinaryConfig.js"
const uploadMedia =  async ( file ) => {
    try {
        const uploadStream = ( fileBuffer ) => {
            return new Promise( ( resolve, reject ) => {
                const upload = cloudinary.v2.uploader.upload_stream({ resource_type :"auto"}, ( error, result ) =>{
                    if( error ){
                        reject( error );
                    } else {
                        resolve( result );
                    }
                })
                upload.end( fileBuffer );
            })
        }
        const result = await uploadStream(file.buffer);
        // console.log(result)
        return result;
    } catch (error) {
        throw new Error ( error.message );
    }
}
export default uploadMedia