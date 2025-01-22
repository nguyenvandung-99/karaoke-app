import { Box, Button, ButtonProps, Menu, MenuProps, styled } from "@mui/material"
import { useState } from "react"

interface IStyledMenuProps {
  children: React.ReactNode
  menuButtonContent: React.ReactNode
  menuPosition?: 'center' | 'right' | 'left'
  closeOnClick?: boolean
  slotProps?: {
    menuButton?: ButtonProps
    menuProps?: MenuProps
  }
}

const MenuButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#333',
  borderRadius: theme.shape.borderRadius,
  width: 'fit-content',
  overflow: 'hidden',
  cursor: 'pointer',
  fontSize: '0.875rem',
  fontWeight: 500,
  gap: theme.spacing(1),
  textTransform: 'none',
}))

export const StyledMenu = ({
  children,
  menuButtonContent,
  slotProps,
  closeOnClick = false,
  menuPosition = 'center',
}: IStyledMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <MenuButton
        id="display-dropdown-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        {...slotProps?.menuButton}
      >
        {menuButtonContent}
      </MenuButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        {...(closeOnClick && { onClick: handleClose })}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: menuPosition,
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: menuPosition,
        }}
        {...slotProps?.menuProps}
        sx={{
          boxShadow: '0px 12px 16px -4px #10182814, 0px 4px 6px -2px #10182808',
          borderRadius: theme => theme.shape.borderRadius,
          '& ul': {
            padding: 0,
            borderRadius: '8px',
          },
          ...slotProps?.menuProps?.sx,
        }}
      >
        {children}
      </Menu>
    </Box>
  )
}
