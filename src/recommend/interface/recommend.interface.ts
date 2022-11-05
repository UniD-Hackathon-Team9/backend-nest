export interface RecommendInfo {
    id: bigint;
    name: string;
    address: string;
    travelapp_tagtoplace: {
        travelapp_placetag: {
            name: string;
        };
    }[];
    placeType: string;
    latitude: number;
    longtitude: number;
    travelapp_region: {
        region_small: string;
        region_large: string;
        position: string;
    };
}