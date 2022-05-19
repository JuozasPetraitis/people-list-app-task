import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { people as peopleAtom } from '../helper/atoms';

export default function Dashboard() {
  let navigate = useNavigate();
  const [people] = useRecoilState(peopleAtom);
  const [filteredPeople, setFilteredPeople] = useState('');

  const searchHandler = (e) => {
    setFilteredPeople(people.filter((item) => item.first.includes(e.target.value)));
  };

  return (
    <div className="w-4/5 m-auto 2xl:max-w-full bg-white my-20 px-2 py-4">
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search by name"
        onChange={(e) => searchHandler(e)}
        className="py-2 pl-2 bg-slate-300 float-right my-2 mr-2"
      />
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Balance</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {filteredPeople
            ? filteredPeople.map((item, index) => (
                <tr
                  className="border-b-slate-400 border-b my-2 hover:bg-cyan-700/80 hover:cursor-pointer hover:text-white"
                  onClick={() => navigate(`/${index}`)}
                  key={index}
                >
                  <td>{item.first}</td>
                  <td>{item.last}</td>
                  <td> {item.email}</td>
                  <td> {item.address}</td>
                  <td> {item.balance}</td>
                  <td> {item.created}</td>
                </tr>
              ))
            : people.map((item, index) => (
                <tr
                  className="border-b-slate-400 border-b my-2 hover:bg-cyan-700/80 hover:cursor-pointer hover:text-white"
                  onClick={() => navigate(`/${index}`)}
                  key={index}
                >
                  <td>{item.first}</td>
                  <td>{item.last}</td>
                  <td> {item.email}</td>
                  <td> {item.address}</td>
                  <td> {item.balance}</td>
                  <td> {item.created}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}
