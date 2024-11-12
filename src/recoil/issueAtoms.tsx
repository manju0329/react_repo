import { atom } from "recoil";

// 필요 데이터 : 이슈 번호, 제목, 작성일(YYYY-MM-DD hh:mm:ss), 코멘트 수
export interface Issue {
    number : number;
    title : string;
    date : string;
    comment : number;
    url : string;
}

export const issueState = atom<Issue[]>({
    key : 'issueState',
    default : [],
});