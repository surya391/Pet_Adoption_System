import OpenCageApi from 'opencage-api-client'

const { geocode } = OpenCageApi

const geoCoordinates = async ( address ) => {
    try {
        const fullAddress = `${address.buildingNo}, ${address.street}, ${address.city}, ${address.state}, ${address.country}`;
        const apiKey = process.env.OPEN_CAGE_API;
        const response = await geocode( { q : fullAddress, key : apiKey } );
        if( response.status.code === 200 && response.results.length > 0 ){
            const result = response.results[0];
            const latitude = result.geometry.lat;
            const longitude = result.geometry.lng;
            return { latitude, longitude };
        } else{
            throw new Error("No result found this address")
        }
    } catch (error) {
        throw error;
    }
}

export default geoCoordinates