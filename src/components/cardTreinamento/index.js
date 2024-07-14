import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import { TbTimeDuration10 } from "react-icons/tb";

/**
 * Arrumar o theme, colocar as cores do figma
 * Deixar o css (sx) certinho igual do figma
 *      - Icones coloridos
 *      - Fontes corretas
 *  Arrumar a barra de pesquisa e os selects
 *
 * Para os selects criar um css em treinamentos e passar para os dois
 */

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function BasicCard({
  procedimento,
  cod,
  nome,
  duration,
  dataInicio,
  dataFinal,
  versao,
}) {
  const [isHovered, setIsHovered] = React.useState(false);

  // Function to handle mouse over event
  const handleMouseIn = () => {
    setIsHovered(true);
  };

  // Function to handle mouse out event
  const handleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <Card
      onMouseOver={handleMouseIn}
      onMouseOut={handleMouseOut}
      sx={{
        border: isHovered ? "1px solid violet" : "1px solid transparent", // Border style conditionally applied
        borderRadius: "20px",
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div" sx={{ color: "#9E9E9E" }}>
          {procedimento}
        </Typography>
        <Typography sx={{ fontSize: 10 }} variant="h5" color="text.secondary">
          {cod}
        </Typography>

        <Typography sx={{ fontSize: 14 }}>
          <PersonIcon color="violet" /> {nome}
        </Typography>

        <Typography sx={{ fontSize: 14 }}>
          <PersonIcon></PersonIcon> {duration} minutos
        </Typography>

        <Typography sx={{ fontSize: 14 }}>
          <PersonIcon></PersonIcon> {dataInicio}
        </Typography>

        <Typography sx={{ fontSize: 14 }}>
          <PersonIcon></PersonIcon> {dataFinal}
        </Typography>

        <Typography sx={{ fontSize: 14 }}>
          <PersonIcon></PersonIcon> {versao}
        </Typography>
      </CardContent>
    </Card>
  );
}
