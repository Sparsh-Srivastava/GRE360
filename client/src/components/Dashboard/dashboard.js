import React, { useState, useEffect } from "react";
import styles from "./dashboard.module.css";
import axios from "axios";
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  Radar,
  PolarRadiusAxis,
  PolarAngleAxis,
  RadarChart,
  PolarGrid,
  Cell,
} from "recharts";

const Dashboard = () => {
  const [data, setData] = useState("");
  const [ml_predict, set_ml_Predict] = useState("");
  const [score, setScore] = useState(0);
  const [score_2, setScore_2] = useState(0);

  const COLORS = ["#7A4069", "#CA4E79", "#FFC18E"];

  const data01 = [
    {
      name: "Verbal",
      value: (score / 5) * 120,
    },
    {
      name: "Math",
      value: (score_2 / 5) * 120,
    },
    {
      name: "Writing",
      value: 5,
    },
  ];

  let cal_score = score * 24;
  let calc_score_2 = score_2 * 24;
  let cal_score_3 = 3 * 24;

  const data_radar = [
    {
      subject: "Verbal",
      A: 120,
      B: cal_score,
      fullMark: 120,
    },
    {
      subject: "Math",
      A: 120,
      B: calc_score_2,
      fullMark: 120,
    },
    {
      subject: "Writing",
      A: 120,
      B: cal_score_3,
      fullMark: 120,
    },
  ];

  useEffect(() => {
    const getUserData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/user/userDetails/${localStorage.getItem(
            "userId"
          )}`,
          config
        );
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, []);

  // set_ml_Predict(localStorage.getItem("Chance"));
  // console.log(ml_predict);
  let predicted = localStorage.getItem("Chance");
  let newpred = predicted.split(" ");
  let result1 = parseFloat(newpred[0].replace("[", "").replace("]", ""));
  let result2 = parseFloat(newpred[1].replace("[", "").replace("]", ""));
  let result3 = parseFloat(newpred[2].replace("[", "").replace("]", ""));
  let result4 = parseFloat(newpred[3].replace("[", "").replace("]", ""));
  let result5 = parseFloat(newpred[4].replace("[", "").replace("]", ""));

  return (
    <>
      <div className={styles.container}>
        <div className={styles.profile}>
          <div className={styles.dashHeading}>
            <div className={styles.heading_content_img}>
              <i className="fa fa-bars" aria-hidden="true"></i>
            </div>
            <div className={styles.heading_content}>
              <h3>DASHBOARD</h3>
            </div>
          </div>
          <div className={styles.dashContent}>
            <div className={styles.item1}>
              <div className={styles.fa1}>
                <i className="fa fa-home" aria-hidden="true"></i>
              </div>
              <div className={styles.content1}>
                <h4>Home</h4>
              </div>
            </div>
            <div className={styles.item1}>
              <div className={styles.fa1}>
                <i className="fa fa-user" aria-hidden="true"></i>
              </div>
              <div className={styles.content1}>
                <h4>Profile</h4>
              </div>
            </div>
            <div className={styles.item1}>
              <div className={styles.fa1}>
                <i className="fa fa-bar-chart" aria-hidden="true"></i>
              </div>
              <div className={styles.content1}>
                <h4>Analytics</h4>
              </div>
            </div>
            <div className={styles.item1}>
              <div className={styles.fa1}>
                <i className="fa fa-list-ul" aria-hidden="true"></i>
              </div>
              <div className={styles.content1}>
                <h4>Tasks</h4>
              </div>
            </div>
            <div className={styles.item1}>
              <div className={styles.fa1}>
                <i className="fa fa-cog" aria-hidden="true"></i>
              </div>
              <div className={styles.content1}>
                <h4>Settings</h4>
              </div>
            </div>
            <div className={styles.item1}>
              <div className={styles.fa1}>
                <i className="fa fa-question-circle" aria-hidden="true"></i>
              </div>
              <div className={styles.content1}>
                <h4>Help</h4>
              </div>
            </div>
            <div className={styles.item2}>
              <div className={styles.fa2}>
                <i className="fa fa-sign-out" aria-hidden="true"></i>
              </div>
              <div className={styles.content2}>
                <h4>Log Out</h4>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.main_item1_heading}>
            <div className={styles.skills_heading}>
              <h2>Skills</h2>
            </div>
            <div className={styles.help_heading}>
              <i className="fa fa-cogs" aria-hidden="true"></i>
            </div>
          </div>
          <div className={styles.main_item1_content}>
            <div className={styles.box1}>
              {data ? (
                <>
                  <h3>Name: {data.data.name} </h3>
                  <h3>Toefl Score: {data.data.toefl} </h3>
                  <h3>LOR's: {data.data.lor} </h3>
                  <h3>SOP Rating: {data.data.rating} </h3>
                  <h3>CGPA: {data.data.cgpa} </h3>
                  <h3>Research Papers: {data.data.research} </h3>
                </>
              ) : null}
            </div>
            <div className={styles.box2}>
              <PieChart className={`${styles.pie}`} width={400} height={200}>
                <Legend />
                <Tooltip />
                <Pie
                  data={data01}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={50}
                  fill="#8884d8"
                >
                  {data01.map((entry, index) => (
                    <Cell fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </div>
            <div className={styles.box3}>
              <RadarChart
                outerRadius={100}
                width={500}
                height={250}
                className={`${styles.radar}`}
                data={data_radar}
              >
                <Tooltip />
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 120]} />
                <Radar
                  name="Total"
                  dataKey="A"
                  stroke="#FFC18E"
                  fill="#FFC18E"
                  fillOpacity={0.6}
                />
                <Radar
                  name="Score"
                  dataKey="B"
                  stroke="#CA4E79"
                  fill="#CA4E79"
                  fillOpacity={0.6}
                />
                <Legend />
              </RadarChart>
            </div>
            <div className={styles.box4}>
              <div className={styles.box4_content} style={{ color: "white" }}>
                Next Test{" "}
                <i
                  className="fas fa-arrow-right"
                  style={{ color: "white" }}
                ></i>
              </div>
            </div>
          </div>
          <div className={styles.main_item2_heading}>
            <h2>My Courses</h2>
          </div>
          <div className={styles.main_item2_content}>
            <div className={styles.box2}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
