import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { messages } from "./config/Config";
import { getStoriesList } from "./helper/APIhandler";

function App() {
  const [stories, setStories] = useState([]);
  const [latestStories, setLatestStories] = useState([]);
  const [printContent, setPrintContent] = useState("");

  const isAuthenticated = useRef(true);
  const numberOfStoriesToShow = useRef(5);

  useEffect(async () => {
    let listOfStories = [];

    try {
      listOfStories = await getStoriesList(isAuthenticated.current);

      let response_data = await listOfStories.data;
      let response_status = listOfStories.status;

      if (response_status === 200) {
        setStories(response_data);
      } else {
        console.log(messages.DEFAULT_ERROR_MESSAGE);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (stories?.length > 0) {
      setLatestStories(stories.slice(-5).sort((a, b) => b.id - a.id));
    }
  }, [stories]);

  // useEffect(() => {
  //   if(latestStories?.length > 0){
  //     setPrintContent(latestStories.map())
  //   }
  // }, [latestStories])

  return (
    <React.Fragment>
      <div className="App">
        <h2>GET latest 5 stories test</h2>
      </div>
      <div className="show-latest-data">
        [
        {latestStories.map((story, index) => (
          <div className="margin-left" key={index}>
            <pre className="margin-left">
              {"{" +
                "\n" +
                "id: " +
                story.id +
                ",\nstory: " +
                story.title +
                "\ndescription: " +
                story.body +
                "\nuserID: " +
                story.userId +
                "\n}"}
              ,
            </pre>
          </div>
        ))}
        ]
      </div>
    </React.Fragment>
  );
}

export default App;
