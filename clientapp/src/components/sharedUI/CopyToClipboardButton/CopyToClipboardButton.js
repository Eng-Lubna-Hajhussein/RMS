import { ContentCopy } from '@mui/icons-material'
import { Button, InputAdornment, Snackbar, TextField } from '@mui/material'
import { useState } from 'react'

const CopyToClipboardButton = ({label,value}) => {
    const [open, setOpen] = useState(false)
    const handleClick = () => {
      setOpen(true)
      navigator.clipboard.writeText(value.toString());
    }
    
    return (
        <>
          <TextField aria-readonly fullWidth value={value}
          sx={{
            cursor:"pointer"
          }}
          label={label}
          variant='filled'
          inputMode="url"
           InputProps={{
            endAdornment: (
              <InputAdornment position="start" >
              <ContentCopy sx={{curser:"pointer"}} onClick={handleClick} />
              </InputAdornment>
            ),
          }}
          />
          
          <Snackbar
            open={open}
            onClose={() => setOpen(false)}
            autoHideDuration={2000}
            message="Copied to clipboard"
          />
        </>
    )
}

export default CopyToClipboardButton;