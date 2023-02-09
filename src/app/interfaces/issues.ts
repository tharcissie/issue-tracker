import { Issue } from "./issue";

export interface Issues {
    "status": number,
    "message": string,
    "data": Issue[]
}