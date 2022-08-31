import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import config from "../../../config/config";

const Qna = (props) => {
  let { data } = props;
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const submitHandler = (id) => {
    data[question]["answer"] = answer;
    axios
      .put(
        `${config.SERVER_URL}/api/admin/products/answer-qna/${id}`,
        { answer: answer },
        config.headers
      )
      .then((res) => {})
      .catch((error) => {});
    setQuestion("");
    setAnswer("");
  };
  // console.log(answer);
  return (
    <div className=" text-gray-900 space-y-1 font-medium">
      <h2>QnA</h2>
      <div className="p-2 border rounded">
        <div className="h-52 overflow-y-auto space-y-3 scrollbar-reviews ">
          {data.map((item, indx) => {
            return (
              <div
                key={"qna_" + indx}
                className="w-full border-dashed border rounded p-3 space-y-3"
              >
                <div className="flex justify-between">
                  <div className="flex space-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div className="flex flex-col">
                      <h2 className="font-medium text-blue-500">
                        <Link to={`/customers/${item.user._id}`}>
                          {" "}
                          {item.user.name}
                        </Link>
                      </h2>
                      <p>{item.question}</p>
                    </div>
                  </div>
                  <h2 className="text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </h2>
                </div>
                <div className="flex space-x-2 justify-between">
                  <div className="flex space-x-2 grow">
                    <div className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                        />
                      </svg>
                    </div>
                    {question !== indx ? (
                      <p className="text-sm">{item.answer || "No reply"}</p>
                    ) : (
                      <input
                        onChange={(e) => setAnswer(e.target.value)}
                        className="border grow"
                        type="text"
                        value={answer}
                      />
                    )}
                  </div>
                  {question === indx ? (
                    <button
                      onClick={() => submitHandler(item._id)}
                      className="bg-indigo-600 font-medium text-white px-6 py-0.5 rounded text-sm"
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setQuestion(indx);
                        setAnswer(item.answer);
                      }}
                      className="bg-indigo-600 font-medium text-white px-6 py-0.5 rounded text-sm"
                    >
                      {item.answer ? "Edit" : "Reply"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Qna;
