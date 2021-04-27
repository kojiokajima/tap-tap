import React, { useState, useEffect } from "react";
import { TextField, Icon, Grid } from "@material-ui/core";
import { PersonOutline, MailOutline, LockOutlined } from "@material-ui/icons";
import styled from "styled-components";

const PrimaryTextInput = ({ icon = "", label, name, type = "", disabled=false, value="", rows=1 }) => {
  const [iconComponent, setIconComponent] = useState(<></>);

  useEffect(() => {
    switch (icon) {
      case "name":
        setIconComponent(<PersonOutline style={{ color: "#d2a708" }} />);
        break;
      case "email":
        setIconComponent(<MailOutline style={{ color: "#d2a708" }} />);
        break;
      case "password":
        setIconComponent(<LockOutlined style={{ color: "#d2a708" }} />);
        break;
      default:
        break;
    }
  }, []);

  return (
    <Grid container spacing={1} alignItems="flex-end" justify="center">
      <Grid item>{iconComponent}</Grid>
      <Grid item style={{ width: "70%" }}>
        {
          disabled ?
          <MyTextField label={label} name={name} type={type} value={value} rows={rows} disabled />
          :
          <MyTextField label={label} name={name} type={type} rows={rows} />
        }
      </Grid>
    </Grid>
  );
};

export default PrimaryTextInput;

const MyTextField = styled(TextField)`
  width: 100%;
  & .MuiFormLabel-root.Mui-focused {
    color: #d2a708;
  }
  & > .MuiInput-underline {
    &:after {
      border-bottom: 2px solid #d2a708;
    }
    &:hover:not(.Mui-disabled)::before {
      border-bottom: 2px solid #d2a708;
    }
    &::before {
      border-bottom: 1px solid #d2a708;
    }
    & > input {
    }
  }
`;

// inputのiconに使うのは、、、
// AccountCircle or Person or PersonOutlineIcon
// MailOutlineIcon
// VpnKeyIcon
