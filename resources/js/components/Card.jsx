import { 
    Typography,
    Card as Carrd,
    CardContent,
    CardActions,
    Button,

} from '@mui/material';

export default function Card({Firsttext, Title, Subtitle, Description, Actions }) {
  return (
    <Carrd elevation={8}>
        <CardContent>
            {
                Firsttext !== undefined ? (
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {Firsttext}
                </Typography>) : ''
            }
            
            <Typography variant="h5" component="div">
                {Title}
            </Typography>
            {
                Subtitle !== undefined ? (
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {Subtitle}
                </Typography>) : ''
            }
            {
                Description !== undefined ? (
                <Typography variant="body2">
                {Description}
                </Typography>) : ''
            }
        </CardContent>
        {
                Actions !== undefined ? (
                <CardActions>
                {Actions}
                </CardActions>) : ''
        }
    </Carrd>
    
  )
}
