import { Issue } from "../recoil/issueAtoms";
import axios from "axios";

export const getIssue = async (page : number) : Promise<Issue[]> => {
    const response = await axios.get<Issue[]>("https://api.github.com/repos/facebook/create-react-app/issues?sort=comments", {
        params : {
            sort : 'comments',
            page : page,
            per_page : 10,
        },
    });
    const data = response.data;
    console.log("read data : ")
    console.log(data);
    const issueData : Issue[] = data.map((issue : any) => ({
        number : issue.number,
        title : issue.title,
        date : issue.created_at,
        comment : issue.comments,
        url : issue.html_url,
    }));

    return issueData;
}