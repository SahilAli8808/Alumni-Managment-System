import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default class Eventcard extends React.Component {
  render() {
    let date_convert = new Date(this.props.date);
    let date = date_convert.toDateString();

    const backgroundImageUrl =
      "url('https://www.pexels.com/photo/white-mercedes-benz-cars-120049/')";
    return (
      <div>
        <Card
          className="shadow mb-4"
          style={{
            width: "20rem",
            backgroundImage: backgroundImageUrl,
            backgroundSize: "cover", // Adjust as needed
            color: "white", // Set text color for better readability
          }}
        >
          <Card.Body>
            <Card.Title className="text-primary">{this.props.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {date} | {this.props.time}
            </Card.Subtitle>
            <Card.Text className="text-secondary">
              {this.props.subtitle}
            </Card.Text>
            <Link
              className="btn btn-secondary text-white"
              to={`/events/${this.props.id}`}
            >
              More Details
            </Link>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
