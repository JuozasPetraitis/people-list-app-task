import React, { useState, useEffect } from 'react';
import { people as peopleAtom, comments as commentAtom } from '../helper/atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useParams, useNavigate } from 'react-router-dom';

export default function Profile() {
  let { userId } = useParams();
  let navigate = useNavigate();

  const [commentSubmit, setCommentSubmit] = useState('');
  const [thisProfileInfo, setthisProfileInfo] = useState(null);

  const setComment = useSetRecoilState(commentAtom);
  const [people, setPeople] = useRecoilState(peopleAtom);
  const [comments, setComments] = useRecoilState(commentAtom);

  const addComment = () => {
    setComment((oldComment) => [
      ...oldComment,
      {
        userId: userId,
        text: commentSubmit,
        time:
          new Date().getFullYear() +
          '-' +
          new Date().getMonth() +
          '-' +
          new Date().getDate() +
          ' ' +
          new Date().getHours() +
          ':' +
          new Date().getMinutes() +
          ':' +
          new Date().getSeconds(),
      },
    ]);
    setCommentSubmit('');
  };

  useEffect(() => {
    setthisProfileInfo(people[userId]);
  }, [people, userId]);

  let thisProfileComments = [];

  comments.forEach((item) => {
    if (item.userId === userId) {
      thisProfileComments.push(item);
    }
  });

  return (
    <div className="w-4/5 m-auto 2xl:max-w-full bg-white mt-20">
      <button
        onClick={() => navigate(-1)}
        className="text-black border border-black rounded-sm py-2 px-6 mt-2 ml-2 bg-cyan-700/40 hover:bg-cyan-700/80 hover:text-white"
      >
        Go back to dashboard
      </button>
      <p className="text-4xl font-bold text-center pb-8">Profile</p>

      {thisProfileInfo ? (
        <div className="flex flex-col gap-4 ">
          <div className="grid grid-cols-2 w-2/5 m-auto">
            <p className="font-semibold text-lg">First name</p>
            <p>{thisProfileInfo.first}</p>
            <p className="font-semibold text-lg">Last name</p>
            <p>{thisProfileInfo.last}</p>
            <p className="font-semibold text-lg">Email</p>
            <p>{thisProfileInfo.email}</p>
            <p className="font-semibold text-lg">Address</p>
            <p>{thisProfileInfo.address}</p>
            <p className="font-semibold text-lg">Balance</p>
            <p>{thisProfileInfo.balance}</p>
            <p className="font-semibold text-lg">Created At</p>
            <p>{thisProfileInfo.created}</p>
          </div>

          <div>
            <p className="text-2xl font-bold text-center">Comments</p>
            <div className="flex flex-col">
              {thisProfileComments.map((item, index) => (
                <div key={index} className="bg-white border-b border-black">
                  <p>Anonymous {item.time}</p>
                  <p className="font-semibold">
                    Commented: <span className="text-xl pl-2">{item.text}</span>
                  </p>
                </div>
              ))}
            </div>

            <div className="flex m-auto w-full">
              <input
                type="text"
                placeholder="Write a comment"
                onChange={(e) => setCommentSubmit(e.target.value)}
                value={commentSubmit}
                className="w-3/4 bg-slate-200 text-black pl-2"
              />
              <button
                onClick={addComment}
                className={` py-2 px-6 tracking-widest grow ${commentSubmit ? 'bg-cyan-700/80 text-white' : 'bg-cyan-700/40 cursor-not-allowed'}`}
                disabled={!commentSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}
