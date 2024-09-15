import ServiceModel from "../models/service";

// ('90352520-b0d1-41a1-88a4-962ef4314f93', 'Cloud Storage', 3600), -- 1 hour
// ('95f76d93-c98d-471a-ad04-b718338f80ca', 'Email Hosting', 2880),  -- 48 minutes
// ('96f5327b-6920-4b3e-93eb-74acc85f60a7', 'Domain Registration', 1440),  -- 24 minutes
// ('a363be49-6a58-46a8-a74f-36e0e7dde7f', 'SSL Certificate', 2160),  -- 36 minutes
// ('f1ed962f-1140-4892-afa1-870474d162e3', 'Website Hosting', 720); -- 12 minutes


const initialServices = [
    { serviceName : 'Website Hosting', duration : 720},
    { serviceName : 'Domain Registration', duration : 1440},
    { serviceName : 'SSL Certificate', duration : 2160},
    { serviceName : 'Email Hosting', duration : 2880},
    { serviceName : 'Cloud Storage', duration : 3600}
];

export default async function insertServices(): Promise<void> {
    const count : number = await ServiceModel.count();
    if(count === 0){
        await ServiceModel.bulkCreate(initialServices);
        console.log('Initial Services have been added.');
    }
}