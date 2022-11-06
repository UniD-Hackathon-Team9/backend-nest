import { RecommendInfo } from "../interface/recommend.interface"

class Region {
    small!: string
    large!: string
    position!: string
}
class PlaceDto {
    id!: number
    name!: string
    address!: string
    latitude!: number
    longtitude!: number
    region!: Region
    tags!: string[]
}

export class RecommendDto {
    food!: PlaceDto[]
    cafe!: PlaceDto[]
    spots!: PlaceDto[]

    static of(infos: RecommendInfo[]):RecommendDto{
        const getPlaces = (type: string):PlaceDto[] => infos
            .filter(info => info.placeType === type)
            .map(info => ({
                id: Number(info.id),
                name: info.name,
                placeType: info.placeType,
                latitude: info.latitude,
                longtitude: info.longtitude,
                address: info.address || "제주 제주시",
                region: {
                    small: info.travelapp_region.region_small,
                    large: info.travelapp_region.region_large,
                    position: info.travelapp_region.position
                },
                tags: info.travelapp_tagtoplace.map(tToP => tToP.travelapp_placetag.name)
            }))
            .slice(0, 15);
            
        return {
            food: getPlaces("FOOD"),
            cafe: getPlaces("CAFE"),
            spots: getPlaces("SPOT")
        }
    }
}