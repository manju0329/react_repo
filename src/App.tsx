import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import { getIssue } from './api/issueApi';
import { issueState, Issue } from './recoil/issueAtoms';
import { useRecoilState } from 'recoil';


function App() {
  const [issues, setIssues] = useRecoilState(issueState);
  const [page, setPage] = useState(1); // 시작 페이지 1
  useEffect(() => {
    const loadIssue = async () => {
      const data = await getIssue(page);
      if(!data){
        alert("불러올 이슈가 없습니다");
      }else{
        setIssues(data);
      }
    }
    loadIssue();
    console.log("issue : ");
    console.log(issues);
  }, [page]);

  return (
    <div className='content'>
      <h1>GitHub Issues</h1>
        <div className='issueList'>
          <ul>
            {issues.map((issue) => (
              <li key={issue.number}>
                <h2><a href={issue.url}>{issue.title}</a></h2>
                <p>#{issue.number}</p>
                <p>Date : {issue.date}</p>
                <p>Comments : {issue.comment}</p>
              </li>
            ))}
          </ul>
        </div>
      <div className='pageNo'>
          <p onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>이전 페이지</p>
          <p>{page}</p>
          <p onClick={() => setPage((prev) => prev + 1)}>다음 페이지</p>
      </div>
    </div>
  );
}

export default App;
