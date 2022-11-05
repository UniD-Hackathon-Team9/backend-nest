import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { RecommendDto } from './dto/recommend.dto';
import { RecommendInfo } from './interface/recommend.interface';
import { RecommendPayload } from './payload/recommend.payload';

@Injectable()
export class RecommendService {
    constructor(private readonly prisma: PrismaService){}

  async recommend(input: RecommendPayload):Promise<RecommendDto>{
    const places:RecommendInfo[] = await this.prisma.travelapp_place.findMany({
      select: {
        id: true,
        name: true,
        address: true,
        placeType: true,
        latitude: true,
        longtitude: true,
        travelapp_region: {
            select: {
                region_small: true,
                region_large: true,
                position: true
            }
        },
        travelapp_tagtoplace: {
            select: {
                travelapp_placetag: {
                    select: {
                        name: true
                    }
                }
            }
        }
      },
      where: {
        travelapp_region: {
          position: {
            in: this.getPositions(input.personality)
          }
        },
        travelapp_tagtoplace: {
          some: {
            travelapp_placetag: {
              id: {
                in: this.getTags(input) // preference도 추가할 것
              }
            }
          }
        }
      }
    })

    return RecommendDto.of(places)
  }
  
  private getPositions(personality: string): string[]{
    const positions = personality === "b" 
      ? [
        [1, 2], [2, 3], [3, 4], [4, 1]
      ][1 + Math.floor(Math.random() * 4)]
      : [2 + Math.floor(Math.random() * 3)]
    return positions.map(String)
  }

    // 1	힐링
    // 2	체험
    // 3	감성
    // 4	맛집
    // 5	가성비
    // 6	호화
    // 7	흑돼지
    // 8	회
    // 9	고기국수
    // 10	전복
    // 11	술
    // 12	오션뷰
    // 13	가든뷰
  private getTags({personality, preferences}: RecommendPayload):number[]{
    const TARGET_TAGS = {
      a: [1],
      b: [2],
      c: [3],
      d: [4],
      e: [1,2,3,4],
      1: [13],
      2: [12],
      3: [3],
      4: [4],
      5: [11],
      6: [1, 3],
      7: [2],
      8: [1, 3],
      9: [8, 10],
      10: [7, 9],
    };
    return [
      ...(TARGET_TAGS[personality] ?? []),
      ...preferences.flatMap(p => TARGET_TAGS[p] || [])
    ]
  }
}
