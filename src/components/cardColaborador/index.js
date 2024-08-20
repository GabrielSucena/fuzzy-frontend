import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TimelineIcon from "@mui/icons-material/Timeline";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import { useNavigate, useParams } from "react-router-dom";

const typographyStyle = {
  base: {
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    marginTop: 1,
    color: "#9E9E9E",
  },
  subtitle: {
    fontSize: 10,
    color: "#D5D5D5",
    marginTop: 1,
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    color: "#9E9E9E",
    textAlign: "center",
  },
};

const personIconStyle = {
  base: {
    marginRight: 1,
    verticalAlign: "middle",
    color: "#7A00E6",
  },
  colored: {
    color: "violet",
  },
};

export default function CardColaborador({
  id,
  name,
  department,
  job,
  shortened_name_criticality,
  status,
}) {


  const navigate = useNavigate();

  const [isHovered, setIsHovered] = React.useState(false);

  // Function to handle mouse over event
  const handleMouseIn = () => {
    setIsHovered(true);
  };

  // Function to handle mouse out event
  const handleMouseOut = () => {
    setIsHovered(false);
  };

  // Function to handle card click
  const handleCardClick = () => {
    
    navigate(`/treinamentos/${id}`, {
      state: {
        id
      },
    });
  };

  return (
    <Card
      onClick={handleCardClick}
      onMouseOver={handleMouseIn}
      onMouseOut={handleMouseOut}
      sx={{
        border: isHovered ? "1px solid violet" : "1px solid #939393", // Border style conditionally applied
        borderRadius: "20px",
      }}
    >
      <CardContent
        sx={{ display: "flex", flexDirection: "column", alignItems: "right" }}
      >
        <Typography component="div" sx={{ ...typographyStyle.title }}>
          {name}
        </Typography>
        <Typography sx={{ ...typographyStyle.subtitle }}>{department}</Typography>

        <Typography sx={{ ...typographyStyle.base }}>
          <PersonIcon sx={{ ...personIconStyle.base }} /> {job}
        </Typography>

        <Typography sx={{ ...typographyStyle.base }}>
          <AccessTimeIcon sx={{ ...personIconStyle.base }} />
          {shortened_name_criticality}
        </Typography>

        <Typography sx={{ ...typographyStyle.base }}>
          <EventAvailableIcon sx={{ ...personIconStyle.base }} /> {status}
        </Typography>
      </CardContent>
    </Card>
  );
}
