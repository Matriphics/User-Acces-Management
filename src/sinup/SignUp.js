import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import InputLabel from '@mui/material/InputLabel';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../shared-theme/AppTheme';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import { useNavigate } from 'react-router-dom';
import { Select, MenuItem } from '@mui/material';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  maxHeight: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  position: 'relative',
  height: '100vh',
  padding: theme.spacing(2),
  overflowY: 'auto',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignUp(props) {
  const navigate = useNavigate();
  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [ssn, setSSN] = React.useState('');
  const [roleId, setRoleId] = React.useState('');
  const [roleName, setRoleName] = React.useState(''); // Added state for role_name
  const [reason, setReason] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // Error states
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

  // Add error states for new fields if needed
  // const [roleNameError, setRoleNameError] = React.useState(false);
  // const [roleNameErrorMessage, setRoleNameErrorMessage] = React.useState('');

  const validateInputs = () => {
    let isValid = true;

    // Email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    // Password validation
    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    // First name validation
    if (!firstname) {
      // Add validation if needed
      isValid = false;
    }

    // Role Name validation
    if (!roleName) {
      // Add validation if needed
      isValid = false;
    }

    // Add similar validation for lastname, ssn, roleId, reason

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const payload = {
      first_name: firstname,
      last_name: lastname,
      email_id: email,
      pwd: password,
      role_id: roleId,
      role_name: roleName, // Added role_name to payload
      ssn: ssn,
      reason: reason,
    };

    try {
      const response = await axios.post('http://127.0.0.1:8082/auth/register', payload);

      if (response.status === 201) {
        // Registration successful
        alert('Registration successful! Please sign in.');
        navigate('/');
      } else {
        // Handle registration failure
        alert(response.data.message || 'Registration failed.');
      }
    } catch (error) {
      // Handle errors
      if (error.response) {
        console.error('Server Error:', error.response.data);
        alert(error.response.data.message || 'Registration failed.');
      } else if (error.request) {
        console.error('Network Error:', error.request);
        alert('Network error. Please try again.');
      } else {
        console.error('Error:', error.message);
        alert('An error occurred. Please try again.');
      }
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              flexGrow: 1,
              overflowY: 'auto',
            }}
          >
            {/* Email Field */}
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={emailError ? 'error' : 'primary'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            {/* First Name Field */}
            <FormControl fullWidth margin="normal">
              <FormLabel htmlFor="firstname">First Name</FormLabel>
              <TextField
                required
                id="firstname"
                placeholder="First Name"
                name="firstname"
                variant="outlined"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </FormControl>

            {/* Last Name Field */}
            <FormControl fullWidth margin="normal">
              <FormLabel htmlFor="lastname">Last Name</FormLabel>
              <TextField
                required
                id="lastname"
                placeholder="Last Name"
                name="lastname"
                variant="outlined"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </FormControl>

            {/* SSN Field */}
            <FormControl fullWidth margin="normal">
              <FormLabel htmlFor="ssn">SSN</FormLabel>
              <TextField
                required
                id="ssn"
                placeholder="Social Security Number"
                name="ssn"
                variant="outlined"
                value={ssn}
                onChange={(e) => setSSN(e.target.value)}
              />
            </FormControl>

            {/* Role ID Field */}
            <FormControl fullWidth margin="normal">
              <Box display="flex" alignItems="center">
                <FormLabel htmlFor="role_id" sx={{ marginRight: '8px' }}>
                  Role ID
                </FormLabel>
                <Tooltip
                  title="Select a Role ID that matches your user type. Roles determine your access level within the system."
                  placement="top"
                  arrow
                >
                  <InfoOutlinedIcon
                    fontSize="small"
                    sx={{ cursor: 'pointer', color: 'action.active' }}
                    aria-label="Role ID information"
                    tabIndex={0}
                  />
                </Tooltip>
              </Box>
              <Select
                required
                id="role_id"
                name="role_id"
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
              >
                <MenuItem value="">
                  <em>Select a Role ID</em>
                </MenuItem>
                <MenuItem value={1}>1 - CISO</MenuItem>
                <MenuItem value={2}>2 - Standard User</MenuItem>
                <MenuItem value={3}>3 - Public User</MenuItem>
                <MenuItem value={4}>4 - AO</MenuItem>
                <MenuItem value={5}>5 - SO</MenuItem>
              </Select>
            </FormControl>

            {/* Role Name Field */}
            <FormControl fullWidth margin="normal">
  <Box display="flex" alignItems="center" mb={1}>
    <FormLabel htmlFor="role_name" sx={{ marginRight: '4px' }}>
      Role Name
    </FormLabel>
    <Tooltip
      title={
        <React.Fragment>
          <Typography variant="body2" component="div">
            Select the Role Name that corresponds to your Role ID:
          </Typography>
          <Typography variant="body2" component="div">
            1 - CISO
          </Typography>
          <Typography variant="body2" component="div">
            2 - Standard User
          </Typography>
          <Typography variant="body2" component="div">
            3 - Public User
          </Typography>
          <Typography variant="body2" component="div">
            4 - AO
          </Typography>
          <Typography variant="body2" component="div">
            5 - SO
          </Typography>
        </React.Fragment>
      }
      placement="top"
      arrow
    >
      <InfoOutlinedIcon
        fontSize="small"
        sx={{ cursor: 'pointer', color: 'action.active', marginTop: '2px' }}
        aria-label="Role Name information"
        tabIndex={0}
      />
    </Tooltip>
  </Box>
  <Select
    required
    id="role_name"
    name="role_name"
    value={roleName}
    onChange={(e) => setRoleName(e.target.value)}
  >
    <MenuItem value="">
      <em>Select a Role Name</em>
    </MenuItem>
    <MenuItem value="CISO">CISO</MenuItem>
    <MenuItem value="Standard User">Standard User</MenuItem>
    <MenuItem value="Public User">Public User</MenuItem>
    <MenuItem value="AO">AO</MenuItem>
    <MenuItem value="SO">SO</MenuItem>
  </Select>
</FormControl>


            {/* Reason Field */}
            <FormControl fullWidth margin="normal">
              <FormLabel htmlFor="reason">Reason</FormLabel>
              <TextField
                required
                id="reason"
                placeholder="Reason"
                name="reason"
                variant="outlined"
                multiline
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </FormControl>

            {/* Password Field */}
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? 'error' : 'primary'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive updates via email."
            />
            <Button type="submit" fullWidth variant="contained">
              Sign up
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <span>
                <Link href="/" variant="body2" sx={{ alignSelf: 'center' }}>
                  Sign in
                </Link>
              </span>
            </Typography>
          </Box>
          <Divider>
            <Typography sx={{ color: 'text.secondary' }}>or</Typography>
          </Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign up with Google')}
              startIcon={<GoogleIcon />}
            >
              Sign up with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign up with Facebook')}
              startIcon={<FacebookIcon />}
            >
              Sign up with Facebook
            </Button>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
