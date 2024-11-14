import React, { useState } from "react";
import {
  TextField,
  Grid,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
const Characteristic = ({ product, handleChange }) => {
  const [characteristic, setCharacteristic] = useState([
    { key: "Brand", value: "Coca-Cola", errors: "" },
    { key: "Country", value: "Ukraine", errors: "" },
    { key: "View", value: "Strong carbonated", errors: "" },
    { key: "Weight", value: "1 kg", errors: "" },
  ]);

  const handleCharacteristicChange = (key, value, index) => {
    let characteristicCopy = Array.isArray(product.characteristic)
      ? [...product.characteristic]
      : [];

    if (key === "" && value === "") {
      characteristicCopy.splice(index, 1);
    } else {
      characteristicCopy[index] = { key, value };

      if (index === product.characteristic.length - 1) {
        characteristicCopy.push({ key: "", value: "" });
      }
    }
    handleChange("characteristic", characteristicCopy);
  };

  const validateCharacteristic = (characteristic) => {
    for (let i = 0; i < characteristic.length - 1; i++) {
      for (let j = 0; j < characteristic.length - 1; j++) {
        if (i !== j && characteristic[i].key === characteristic[j].key) {
          console.log("characteristic[i].key", characteristic[i].key);
          characteristic[i].error = "The key is duplicated";
          characteristic[j].error = "The key is duplicated";
        }
      }
      if (characteristic.key === "" || characteristic.value === "") {
        characteristic[i].error = "The field cannot be empty";
      } else {
        characteristic[i].error = "";
      }
      console.log("characteristic.error", characteristic[i].error);
    }

    // return characteristic;
  };

  return (
    <Grid item xs={12}>
      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
        Characteristic
      </Typography>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Key</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {product.characteristic.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <TextField
                  fullWidth
                  value={item.key}
                  onChange={(e) =>
                    handleCharacteristicChange(
                      e.target.value,
                      item.value,
                      index
                    )
                  }
                  variant="outlined"
                  error={!!item.errors}
                  helperText={item.errors}
                />
              </TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  value={item.value}
                  onChange={(e) =>
                    handleCharacteristicChange(item.key, e.target.value, index)
                  }
                  variant="outlined"
                  error={!!item.errors}
                  helperText={item.errors}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Grid>
  );
};

export default Characteristic;
