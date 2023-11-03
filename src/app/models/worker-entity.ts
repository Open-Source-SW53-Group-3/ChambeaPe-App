import { Certificate } from "./certificate";
import { Review } from "./review";

export interface Worker {
    id: string;
    postId: string;
    image: string;
    status: boolean;
    name: string;
    description: string;
    speciality: string;
    skills: string[];
    portfolio: string[];
    certificates: Certificate[];
    reviews:Review[];
}
