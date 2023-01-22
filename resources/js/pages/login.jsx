import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import AuthValidationErrors from '@/components/AuthValidationErrors'
//import Button from '@/components/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Input from '@/components/Input'
import Label from '@/components/Label'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import { Link, NavLink} from 'react-router-dom';
import '#/App.css';
import {
  Container, 
  CssBaseline,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link as LinkMui,
  Grid,
  Box,
  Typography,
  Avatar,
  FormHelperText,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


const Login = () => {

  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard'
  })

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(null)

  const submitForm = async event => {
    event.preventDefault()
    login({ remember, email, password, setErrors, setStatus })
  }

  const theme = createTheme();

  return (

    <GuestLayout>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xs" component="main">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Authentification
          </Typography>
          <Box component="form" onSubmit={submitForm} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              label="Adresse email"
              name="email"
              autoComplete="email"
              error={Boolean(errors.length)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              error={Boolean(errors.length)}
              value={password}
              onChange={event => setPassword(event.target.value)}
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Se souvenir de moi"
              onChange={event => setRemember(event.target.checked)}
            />
            <FormHelperText error={Boolean(errors.length)}>
              <ul>
                {errors.map(error => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </FormHelperText>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Connection
            </Button>
            <Grid container>
              <Grid item xs>
                <LinkMui href="#" variant="body2">
                  Mot de passe oublié ?
                </LinkMui>
              </Grid>
            </Grid>
            
          </Box>
          </Box>
        </Container>
      </ThemeProvider>
        {/* Session Status */}
        <AuthSessionStatus className="mb-4" status={status} />
     
    </GuestLayout>
  )
}

export default Login
