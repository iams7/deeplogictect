import React from "react";
import { apiConfigs } from "../config/Config";

const API_URL = apiConfigs.API_URL;

export const getStoriesList = async (authenticated = true) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  try {
    const getPostResponse = await fetch(API_URL + "/posts", requestOptions);
    return { data: await getPostResponse.json(), status: getPostResponse.status };
  } catch (error) {
    return error;
  }
};
