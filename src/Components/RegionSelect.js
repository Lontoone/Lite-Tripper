import { ListItem, ListSubheader, MenuItem, Select } from "@material-ui/core";
import React from "react";

const regionData = [
  
];

function RegionSelect() {
  return (
    <ListItem>
      <ListSubheader component="div" id="nested-list-subheader">
        區域
      </ListSubheader>
      <Select>
        {/**TODO: https://material-ui.com/zh/components/selects/ */}
        {regionData.map((data)=>(
            <MenuItem value={data.value}>
                {data.county}
            </MenuItem>
        ))}
      </Select>
    </ListItem>
  );
}

export default RegionSelect;
