import React, { useState, useEffect } from "react";
import { TextField, Icon, Grid } from "@material-ui/core";
import { PersonOutline, MailOutline, LockOutlined } from "@material-ui/icons";
import styled from "styled-components";

const PrimaryTextInput = ({ icon = "", label = "hello" }) => {
  const [iconComponent, setIconComponent] = useState(<></>);

  useEffect(() => {
    switch (icon) {
      case "name":
        setIconComponent(<PersonOutline style={{ color: "#D77A61" }} />);
        break;
      case "email":
        setIconComponent(<MailOutline style={{ color: "#D77A61" }} />);
        break;
      case "password":
        setIconComponent(<LockOutlined style={{ color: "#D77A61" }} />);
        break;
      default:
        break;
    }
  }, []);

  return (
    <Grid container spacing={1} alignItems="flex-end" justify="center" >
      <Grid item>{iconComponent}</Grid>
      <Grid item style={{width: '70%'}}>
        <MyTextField label={label} />
      </Grid>
    </Grid>
  );
};

export default PrimaryTextInput;

const MyTextField = styled(TextField)`
  width: 100%;
  & .MuiFormLabel-root.Mui-focused {
    color: #d77a61;
  }
  & > .MuiInput-underline {
    &:after {
      border-bottom: 2px solid #d77a61;
    }
    &:hover:not(.Mui-disabled)::before {
      border-bottom: 2px solid #d77a61;
    }
    &::before {
      border-bottom: 1px solid #d77a61;
    }
    & > input {
    }
  }
`;

// inputのiconに使うのは、、、
// AccountCircle or Person or PersonOutlineIcon
// MailOutlineIcon
// VpnKeyIcon
