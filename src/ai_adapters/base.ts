export type ResponseContent = {
    text: string
}

export interface BaseAdapter {
    generateContent(text: string): Promise<ResponseContent>
}
