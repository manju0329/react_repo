import React, {useState, useEffect} from 'react';
import './App.css';
import { getIssue } from './api/issueAPI';
import { issueState, Issue } from './recoil/issueAtoms';
import { useRecoilState } from 'recoil';


function App() {
  const [issues, setIssues] = useRecoilState(issueState);
  const [page, setPage] = useState(1); // 시작 페이지 1
  const [state, setState] = useState("open");

  const clickHandler = (url : string) => {
    window.open(url, '_blank');
  }

  const changeState = (state : string) => { // 조회 상태 변경 시 첫 페이지부터 다시 조회
    setState(state);
    setPage(1);
  }

  const prePage = (prev : number) => {
    if(prev == 1){
      alert("첫 페이지입니다.");
    }else{
      setPage((prev) => Math.max(prev - 1, 1)); // 최소 페이지 수 1
    }
  }

  useEffect(() => {
    const loadIssue = async () => {
      const data = await getIssue(page, state);
      if(data.length == 0){
        alert("마지막 페이지입니다.");
      }else{
        setIssues(data);
      }
    }
    loadIssue();
  }, [page, state]); // 페이지, 상태 변경될 때마다 실행

  return (
    <div className='content-area'>
      <p className='font-bold text-4xl mb-6'>GitHub Issues</p>
      <div className='select-area'>
        <select
          className='border mb-3'
          onChange={(event) => changeState(event.target.value)}
          value={state}
          >
          <option value="all">ALL</option>
          <option value="open">OPEN</option>
          <option value="closed">CLOSED</option>
        </select>
      </div>
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
                  <td className='pl-2' >#{issue.number}</td>
                  <td><a href={issue.url} target='_blank'>{issue.title}</a></td>
                  <td>{issue.date}</td>
                  <td>{issue.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      <div className='pageNo flex justify-center mt-2'>
          <button className='mx-3' onClick={() => prePage(page)}>이전 페이지</button>
          <p className='font-semibold'>{page}</p>
          <button className='mx-3' onClick={() => setPage((prev) => prev + 1)}>다음 페이지</button>
      </div>
    </div>
  );
}

export default App;
