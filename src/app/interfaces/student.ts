export interface StudentI {
    id?: string;
    email: string;
    name: string;
    lastname: string;
    sex: string;
    courseSelected?: string;
    courses?: Array<String>
}