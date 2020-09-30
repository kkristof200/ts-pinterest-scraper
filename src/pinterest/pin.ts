export class Pin {
    readonly title?: string
    readonly description?: string
    readonly originalTitle?: string
    readonly originalDescription?: string
    readonly domain?: string
    readonly id: string
    readonly originalId?: string
    readonly repinCount: number
    readonly commentCount: number
    readonly dominantColorHex: string
    readonly tags?: string[]
    readonly type: string

    readonly image: {
        url: string,
        extension: string,
        size: {
            width: number,
            height: number
        },
        ratio: number
    }

    constructor(obj: any) {
        if (obj.rich_metadata) {
            if (obj.rich_metadata.title && obj.rich_metadata.title.trim().length > 0) this.originalTitle = obj.rich_metadata.title.trim()
            if (obj.rich_metadata.description && obj.rich_metadata.description.trim().length > 0) this.originalDescription = obj.rich_metadata.description.trim()
            this.originalId = obj.rich_metadata.id
        }

        if (obj.title && obj.title.trim().length > 0) this.title = obj.title.trim()
        if (obj.description && obj.description.trim().length > 0) this.description = obj.description.trim()

        if ((!this.originalTitle && this.title) || this.originalTitle == this.title) {
            this.originalTitle = this.title
            this.title = null
        }

        if ((!this.originalDescription && this.description) || this.originalDescription == this.description) {
            this.originalDescription = this.title
            this.description = null
        }

        this.domain = obj.domain
        this.id = obj.id
        this.repinCount = obj.repin_count
        this.commentCount = obj.comment_count

        let imgComps = obj.images.orig.url.split('.')

        this.image = {
            url: obj.images.orig.url,
            size: {
                width: obj.images.orig.width,
                height: obj.images.orig.height
            },
            extension: imgComps[imgComps.length - 1].toLowerCase(),
            ratio: obj.images.orig.width / obj.images.orig.height
        }

        this.tags = obj.pin_join.visual_annotation
        this.type = obj.type
    }

    get ids(): string[] {
        return this.originalId ? [this.id, this.originalId] : [this.id]
    }
}