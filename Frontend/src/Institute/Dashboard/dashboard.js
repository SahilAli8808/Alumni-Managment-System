import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { base_url } from "../../Endpoint/endpoint";
import { notifyError_with_msg } from "../Utils/Message";
import { Line } from "react-chartjs-2";
import split from "./Utils/data";
import "../Style/toStyleChart.css";
import NoticeComponent from "../Notice/Notices";
import "../Style/toStyleDashboard.css";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      all: null,
      loading: true,
      data: null,
      error: false,
      ticketCount: "",
    };
  }

  componentDidMount = async () => {
    const values = {
      method: "GET",
      headers: {
        "x-auth": this.props.token,
      },
    };
    try {
      const response = await fetch(
        `${base_url}/${this.props.user}/stats`,
        values
      );
      console.log(response);
      const json = await response.json();
      if (!response.ok) {
        notifyError_with_msg(json.err);
      }
      if (response.ok) {
        console.log(json);
        this.setState({ all: json });
      }
    } catch (error) {
      notifyError_with_msg("Unable to Fetch");
    }
  };

  render() {
    return (
      <div>
        {this.props.user !== "alumni" && this.props.user !== "student" ? (
          <div className="container is-fluid dashboard-container">
            <div
              id="block-remove"
              className="notification quick-links-container"
            >
              <ul id="horizontal-list">
                <li>Quick Links</li>
                <li>
                  <span class="tag is-success is-light">
                    <Link style={{ textDecoration: "none" }} to="/addevent">
                      Add Event
                    </Link>
                  </span>
                </li>
                {this.props.user === "college" ? (
                  <li>
                    <span class="tag is-success is-light">
                      <Link style={{ textDecoration: "none" }} to="/addfund">
                        Add Fund
                      </Link>
                    </span>
                  </li>
                ) : null}
                <li>
                  <span class="tag is-success is-light">
                    <Link
                      style={{ textDecoration: "none" }}
                      to="/addnewsletter"
                    >
                      Add Newsletter
                    </Link>
                  </span>
                </li>
                {this.props.user === "college" ? (
                  <li>
                    <span class="tag is-success is-light">
                      <Link
                        style={{ textDecoration: "none" }}
                        to="/createchat-college"
                      >
                        Create Chat
                      </Link>
                    </span>
                  </li>
                ) : null}
                {this.props.user === "college" ? (
                  <li>
                    <span class="tag is-success is-light">
                      <Link style={{ textDecoration: "none" }} to="/import">
                        Import Alumni
                      </Link>
                    </span>
                  </li>
                ) : null}
                {this.props.user === "admin" ? (
                  <li>
                    <span class="tag is-success is-light">
                      <Link
                        style={{ textDecoration: "none" }}
                        to="/createcollege"
                      >
                        Create College
                      </Link>
                    </span>
                  </li>
                ) : null}
                <li>
                  <span class="tag is-success is-light">
                    <Link style={{ textDecoration: "none" }} to="/createnotice">
                      Post Notice
                    </Link>
                  </span>
                </li>
                {this.props.user === "college" ? (
                  <li>
                    <span class="tag is-success is-light">
                      <Link
                        style={{ textDecoration: "none" }}
                        to="/add-faculty"
                      >
                        Add Faculty
                      </Link>
                    </span>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        ) : null}
        {this.props.user === "alumni" || this.props.user === "student" ? (
          <div className="container is-fluid dashboard-container">
            <div
              id="block-remove"
              className="notification quick-links-container"
            >
              <ul id="horizontal-list">
                <li>Quick Links</li>
                <li>
                  <span class="tag is-success is-light">
                    <Link style={{ textDecoration: "none" }} to="/raiseticket">
                      Raise Ticket
                    </Link>
                  </span>
                </li>
                <li>
                  <span class="tag is-success is-light">
                    <Link style={{ textDecoration: "none" }} to="/chat">
                      Chat
                    </Link>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        ) : null}
        <br />
        <br />
        {this.state.all !== null ? (
          <div className="statistics-container">
            <nav className="level">
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">Upcoming Events</p>
                  <p className="title">{this.state.all.upcomingEvents}</p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">Past Events</p>
                  <p className="title">{this.state.all.pastEvents}</p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">Student Count</p>
                  <p className="title">{this.state.all.studentsCount}</p>
                </div>
              </div>
            </nav>
          </div>
        ) : null}
        <br />
        <br />
        <br />
        <br />

        <div class="columns charts-container">
          <div class="column">
            <div class="columns">
              <div class="column">
                <NoticeComponent />
              </div>
              <div class="column is-half">
                {this.state.all !== null ? (
                  <div id="alumni-chart">
                    <Line
                      data={split(this.state.all.alumni, "Alumni")}
                      options={{
                        scales: {
                          yAxes: [
                            {
                              ticks: {
                                beginAtZero: true,
                                userCallback: function (label, index, labels) {
                                  // when the floored value is the same as the value we have a whole number
                                  if (Math.floor(label) === label) {
                                    return label;
                                  }
                                },
                              },
                            },
                          ],
                          xAxes: [
                            {
                              gridLines: {
                                color: "#aaa",
                                borderDash: [1, 3],
                              },
                              display: false, // this will hide vertical lines
                            },
                          ],
                        },
                        title: {
                          display: true,
                          text: "No of Alumni",
                          fontSize: 20,
                        },
                        legend: {
                          display: true,
                          position: "right",
                        },
                      }}
                    />
                  </div>
                ) : null}
              </div>
              <div class="column">
                {this.state.all !== null ? (
                  <div id="size-corner">
                    <Line
                      data={split(this.state.all.jobs, "Jobs")}
                      options={{
                        scales: {
                          yAxes: [
                            {
                              ticks: {
                                beginAtZero: true,
                                userCallback: function (label, index, labels) {
                                  // when the floored value is the same as the value we have a whole number
                                  if (Math.floor(label) === label) {
                                    return label;
                                  }
                                },
                              },
                            },
                          ],
                          xAxes: [
                            {
                              gridLines: {
                                color: "#aaa",
                                borderDash: [1, 3],
                              },
                              display: false, // this will hide vertical lines
                            },
                          ],
                        },
                        title: {
                          display: true,
                          text: "Jobs",
                          fontSize: 20,
                        },
                        legend: {
                          display: true,
                          position: "right",
                        },
                      }}
                    />
                  </div>
                ) : null}
              </div>
            </div>
            <div class="column">
              {this.state.all !== null ? (
                <div id="interview-chart">
                  <Line
                    data={split(this.state.all.interviews, "Interviews")}
                    options={{
                      scales: {
                        yAxes: [
                          {
                            ticks: {
                              beginAtZero: true,
                              userCallback: function (label, index, labels) {
                                // when the floored value is the same as the value we have a whole number
                                if (Math.floor(label) === label) {
                                  return label;
                                }
                              },
                            },
                          },
                        ],
                        xAxes: [
                          {
                            gridLines: {
                              color: "#aaa",
                              borderDash: [1, 3],
                            },
                            display: false, // this will hide vertical lines
                          },
                        ],
                      },
                      title: {
                        display: true,
                        text: "Experience",
                        fontSize: 20,
                      },
                      legend: {
                        display: true,
                        position: "right",
                      },
                    }}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <br />
        <br />
        <br />

        {this.state.all !== null ? (
          <div className="ticket-info-container">
            <nav className="level">
              {/* <div className="level-item has-text-centered">
                            <div>
                            <p className="heading">Open Tickets</p>
                            <p className="title">{this.state.all.tickets[0].count}</p>
                            </div>
                        </div> */}
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">Open Tickets</p>
                  {this.state.all.tickets &&
                  this.state.all.tickets.length > 0 ? (
                    <p className="title">{this.state.all.tickets[0].count}</p>
                  ) : (
                    <p className="title">N/A</p>
                  )}
                </div>
              </div>

              {/* <div className="level-item has-text-centered">
                            <div>
                            <p className="heading">On Progress Tickets</p>
                            <p className="title">{this.state.all.tickets[0].count}</p>
                            </div>
                        </div> */}
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">On Progress Tickets</p>
                  {this.state.all.tickets &&
                  this.state.all.tickets.length > 0 ? (
                    <p className="title">
                      {this.state.all.tickets[0].count || 0}
                    </p>
                  ) : (
                    <p className="title">N/A</p>
                  )}
                </div>
              </div>

              {/* <div className="level-item has-text-centered">
                            <div>
                            <p className="heading">Closed Tickets</p>
                            <p className="title">{this.state.all.tickets[0].count}</p>
                            </div>
                        </div> */}
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">Closed Tickets</p>
                  {this.state.all.tickets &&
                  this.state.all.tickets.length > 0 ? (
                    <p className="title">
                      {this.state.all.tickets[0]?.count || 0}
                    </p>
                  ) : (
                    <p className="title">N/A</p>
                  )}
                </div>
              </div>
            </nav>
          </div>
        ) : null}

        <br />
        <br />
        <br />
      </div>
    );
  }
}

const mapStatesToProps = (state) => {
  return {
    token: state.Auth_token,
    user: state.Auth_user,
  };
};

export default connect(mapStatesToProps, null)(Dashboard);
