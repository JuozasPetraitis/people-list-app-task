import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import { people as peopleAtom } from './helper/atoms';

import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Layout from './components/Layout';

export default function App() {
  const [people, setPeople] = useRecoilState(peopleAtom);

  useEffect(() => {
    const fetchPeople = async () => {
      const url = 'https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole';
      const response = await fetch(url);
      const body = await response.json();
      setPeople(body);
    };

    fetchPeople();
  }, [setPeople]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route index element={<Dashboard />} />
        <Route path="/:userId" element={<Profile />} />
      </Routes>
    </div>
  );
}
