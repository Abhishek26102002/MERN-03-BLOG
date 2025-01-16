import * as React from 'react';
import DarkModeIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightModeRounded';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useColorScheme } from '@mui/material/styles';

export default function ColorModeToggle(props) {
  const { mode, systemMode, setMode } = useColorScheme();

  if (!mode) {
    return (
      <Box
        data-screenshot="toggle-mode"
        sx={(theme) => ({
          verticalAlign: 'bottom',
          display: 'inline-flex',
          width: '2.25rem',
          height: '2.25rem',
          borderRadius: (theme.vars || theme).shape.borderRadius,
          border: '1px solid',
          borderColor: (theme.vars || theme).palette.divider,
        })}
      />
    );
  }

  // Resolved mode: Either the explicit mode or the system mode
  const resolvedMode = systemMode || mode;

  // Determine next mode: Cycle through "light", "dark", and "system"
  const getNextMode = () => {
    switch (resolvedMode) {
      case 'light':
        return 'dark';
      case 'dark':
        return 'system';
      default:
        return 'light';
    }
  };

  const handleToggle = () => {
    const nextMode = getNextMode();
    setMode(nextMode);
  };

  const icon = {
    light: <LightModeIcon />,
    dark: <DarkModeIcon />,
    system: resolvedMode === 'light' ? <LightModeIcon /> : <DarkModeIcon />,
  }[resolvedMode];

  return (
    <IconButton
      data-screenshot="toggle-mode"
      onClick={handleToggle}
      disableRipple
      size="small"
      aria-label="Toggle color mode"
      {...props}
    >
      {icon}
    </IconButton>
  );
}
