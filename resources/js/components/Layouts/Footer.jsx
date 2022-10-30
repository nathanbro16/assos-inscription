import { 
  Typography,
  Link

} from "@mui/material";

export default function Footer() {
  return (

    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://judoclub-ploermel.fr/">
        Judo Club de Ploërmel
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
