"use strict";
const express = require("express");
const app = express();
app.use(express.json());

const candidates = {
  "1df4b623-49dc-4897-869e-a9d118229c6e": {
    id: "1df4b623-49dc-4897-869e-a9d118229c6e",
    name: "Anuj",
    skills: ["javascript", "java", "react", "node", "express", "graphql"]
  },

  "2df4b623-49dc-4897-869e-a9d118229c6e": {
    id: "2df4b623-49dc-4897-869e-a9d118229c6e",
    name: "Tejas",
    skills: ["java", "kafka", "aws", "react"]
  },

  "3df4b623-49dc-4897-869e-a9d118229c6e": {
    id: "3df4b623-49dc-4897-869e-a9d118229c6e",
    name: "Rohini",
    skills: ["java", "php", "react", "node", "python"]
  },

  "4df4b623-49dc-4897-869e-a9d118229c6e": {
    id: "4df4b623-49dc-4897-869e-a9d118229c6e",
    name: "Maulik",
    skills: ["javascript", "react", "scala", "angular"]
  },

  "5df4b623-49dc-4897-869e-a9d118229c6e": {
    id: "5df4b623-49dc-4897-869e-a9d118229c6e",
    name: "Abdul",
    skills: ["java", "kafka", "akka"]
  },

  "6df4b623-49dc-4897-869e-a9d118229c6e": {
    id: "6df4b623-49dc-4897-869e-a9d118229c6e",
    name: "Palak",
    skills: ["accounting", "income tax"]
  }
};
let skills = {};

app.post("/candidates", function(req, res) {
  if (JSON.stringify(req.body) === JSON.stringify({})) {
    res.status(400).end("Bad Request");
  }
  let id = req.body.id;
  candidates[id] = req.body;
  for (let i = 0; i < req.body.skills.length; i++) {
    let skill = req.body.skills[i];
    if (skill in skills) {
      skills[skill].push(id);
    } else {
      skills[skill] = [];
      skills[skill].push(id);
    }
  }
  res.send({ status: "Successfully added" });
});

app.get("/candidates/search", function(req, res) {
  if (
    JSON.stringify(req.query) === JSON.stringify({}) ||
    req.query.skills === ""
  ) {
    res.status(400).end("Bad Request");
    return;
  }
  if (!Object.keys(candidates).length || candidates.size === 0) {
    res.status(404).end("no candidates");
    return;
  }
  let searchList = req.query.skills.split(",");
  let filterList = [];
  for (let i = 0; i < searchList.length; i++) {
    filterList = filterList.concat(skills[searchList[i]]);
  }

  let map = {};
  let max = 0;
  let id;
  for (let i = 0; i < filterList.length; i++) {
    if (filterList[i] in map) {
      map[filterList[i]] = map[filterList[i]] + 1;
    } else {
      if (filterList[i] !== undefined) map[filterList[i]] = 1;
    }
    if (max < map[filterList[i]] && filterList[i] !== undefined) {
      max = map[filterList[i]];
      id = filterList[i];
    }
  }
  if (max === 0) {
    res.status(404).send("not found");
  } else {
    res.send(candidates[id]);
  }
});

app.listen(process.env.HTTP_PORT || 3000);
