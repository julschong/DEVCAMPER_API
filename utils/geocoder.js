import NodeGeocoder from 'node-geocoder'
import dotenv from 'dotenv'
dotenv.config({ path: './config/.env' })

const options = {
    provider: process.env.GEOCODER_PROVIDER,
    // Optional depending on the providers
    apiKey: process.env.GEOCODER_API_KEY, // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
}

const geocoder = NodeGeocoder(options)

export default geocoder
