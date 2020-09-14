export interface MediaImage {
    Id: number,
    MediaId: number,
    Guid: string,
    PlatformCode: string,
    PlatformDisplayName: string,
    ImageTypeCode: string,
    ImageTypeDisplayName: string,
    Url: string,
    Width: number,
    Height: number
}

export interface MediaListVideo {
    Id: number,
    Guid: string,
    MediaTypeCode: string,
    MediaTypeDisplayName: string,
    MediaAgeRestrictionValueMin: number,
    MediaAgeRestrictionImageUrl:
        string,
    Title: string,
    Description: string,
    Year: string,
    Duration: number,
    Images: MediaImage[]
}

export interface MediaListResponse {
    CacheDataValidTo: string,
    SourceType: "MediaList",
    Entities: MediaListVideo[];
}