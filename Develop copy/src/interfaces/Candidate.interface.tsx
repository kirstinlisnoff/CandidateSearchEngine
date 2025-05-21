// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate {
    id: number;
    login: string;
    name?: string;
    location?: string;
    email?: string;
    html_url: string;
    company?: string;
    bio?: string;
    avatar_url: string;
}

export default Candidate;