import React, {useState, useEffect} from 'react';
import './App.css';
import { getIssue } from './api/issueAPI';
import { issueState, Issue } from './recoil/issueAtoms';
import { useRecoilState } from 'recoil';


function App() {
  const [issues, setIssues] = useRecoilState(issueState);
  const [page, setPage] = useState(1); // 시작 페이지 1

  const clickHandler = (url) => {
    window.open(url, '_blank');
  }

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
      <p className='font-bold text-4xl mb-6'>GitHub Issues</p>
        {/* <div className='issueList'>
          <ul>
            {issues.map((issue) => (
              <li key={issue.number}>
                <h2><a href={issue.url} target='_blank'>{issue.title}</a></h2>
                <p>#{issue.number}</p>
                <p>Date : {issue.date}</p>
                <p>Comments : {issue.comment}</p>
              </li>
            ))}
          </ul>
        </div> */}
        <div className='table-area w-full items-center justify-center'>
          <table className=" w-5/6 items-center h-64 border border-spacing-8 outline outline-gray-300 rounded-lg overflow-auto mx-auto">
            <thead className='bg-gray-200'>
              <tr>
                <th className='p-2'>No.</th>
                <th>Title</th>
                <th>Date</th>
                <th>Comments</th>
              </tr>  
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr key={issue.number} className='hover:bg-gray-300' onClick={() => clickHandler(issue.url)}>
                  <td className='' >#{issue.number}</td>
                  <td><a href={issue.url} target='_blank'>{issue.title}</a></td>
                  <td>{issue.date}</td>
                  <td>{issue.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      <div className='pageNo'>
          <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>이전 페이지</button>
          <p>{page}</p>
          <button onClick={() => setPage((prev) => prev + 1)}>다음 페이지</button>
      </div>
    </div>
  );
}

export default App;
